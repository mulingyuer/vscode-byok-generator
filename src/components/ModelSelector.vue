<!--
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:41
 * @LastEditTime: 2026-08-19 15:09:42
 * @LastEditors: mulingyuer
 * @Description: 模型选择器，Tab 切换"自动获取"与"预设模型"，支持搜索、全选、反选
 * @FilePath: \vscode-byok-generator\src\components\ModelSelector.vue
 * 怎么可能会有bug！！！
-->
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useMessage } from "naive-ui";
import { VENDOR_LABELS, VENDOR_ORDER, presetsToModelItems } from "@/data/modelPresets";
import { useWizardStore } from "@/stores/wizard";
import type { FetchMode } from "@/types/wizard";
import { describeFetchError, fetchRemoteModels } from "@/utils/fetchModels";

const store = useWizardStore();
const message = useMessage();
const keyword = ref("");
const loading = ref(false);
const fetchError = ref("");

const filteredModels = computed(() => {
	const query = keyword.value.trim().toLowerCase();
	if (!query) {
		return store.availableModels;
	}
	return store.availableModels.filter((model) => {
		return model.id.toLowerCase().includes(query) || model.name.toLowerCase().includes(query);
	});
});

const groupedModels = computed(() => {
	if (store.fetchMode !== "preset") {
		return [];
	}
	return VENDOR_ORDER.map((vendor) => ({
		vendor,
		label: VENDOR_LABELS[vendor],
		models: filteredModels.value.filter((model) => model.vendor === vendor)
	})).filter((group) => group.models.length > 0);
});

const visibleIds = computed(() => filteredModels.value.map((model) => model.id));

function applyPresetModels() {
	store.availableModels = presetsToModelItems();
	store.selectedModelIds = store.selectedModelIds.filter((id) =>
		store.availableModels.some((model) => model.id === id)
	);
}

watch(
	() => store.fetchMode,
	(mode) => {
		fetchError.value = "";
		if (mode === "preset") {
			applyPresetModels();
		}
	},
	{ immediate: true }
);

function handleModeChange(value: FetchMode) {
	store.fetchMode = value;
	if (value === "auto") {
		store.availableModels = [];
		store.selectedModelIds = [];
	}
}

async function handleFetch() {
	loading.value = true;
	fetchError.value = "";
	try {
		const models = await fetchRemoteModels(store.baseUrl, store.apiKey);
		store.availableModels = models;
		store.selectedModelIds = store.selectedModelIds.filter((id) =>
			models.some((model) => model.id === id)
		);
		if (models.length === 0) {
			message.warning("未获取到任何模型");
		} else {
			message.success(`已获取 ${models.length} 个模型`);
		}
	} catch (error) {
		fetchError.value = describeFetchError(error);
		store.availableModels = [];
	} finally {
		loading.value = false;
	}
}

function isChecked(id: string) {
	return store.selectedModelIds.includes(id);
}

function handleToggle(id: string, checked: boolean) {
	const selected = isChecked(id);
	if (checked === selected) {
		return;
	}
	store.toggleModel(id);
}

function handleSelectAll() {
	store.selectAll(visibleIds.value);
}

function handleInvert() {
	store.invertSelection(visibleIds.value);
}
</script>

<template>
	<div class="model-selector">
		<n-tabs type="segment" :value="store.fetchMode" animated @update:value="handleModeChange">
			<n-tab-pane name="auto" tab="自动获取">
				<n-alert type="info" :bordered="false" class="pane-tip">
					浏览器会直接请求网关的 /v1/models。若网关未开放 CORS，请求会失败，请改用预设模型。
				</n-alert>
				<div class="toolbar">
					<n-button type="primary" :loading="loading" @click="handleFetch">获取模型</n-button>
				</div>
			</n-tab-pane>
			<!--
				naive-ui 2.45.0 的 Tabs 会把 tab prop 的字符串文本转换为 Text vnode 后
				经 normalizeVNode cloneIfMounted 处理，无内容的 tab-pane 会导致其变成 Comment 节点，
				从而丢失 tab 文本。给 tab-pane 加任意子内容即可规避。
			-->
			<n-tab-pane name="preset" tab="预设模型">
				<span class="sr-only" aria-hidden="true" />
			</n-tab-pane>
		</n-tabs>

		<n-alert v-if="fetchError" type="error" :bordered="false">
			{{ fetchError }}
		</n-alert>

		<div class="toolbar">
			<n-input v-model:value="keyword" clearable placeholder="搜索 model id / 显示名" />
			<n-button :disabled="visibleIds.length === 0" @click="handleSelectAll">全选</n-button>
			<n-button :disabled="visibleIds.length === 0" @click="handleInvert">反选</n-button>
		</div>

		<div v-if="store.fetchMode === 'preset'" class="groups">
			<section v-for="group in groupedModels" :key="group.vendor" class="group">
				<h3>{{ group.label }}</h3>
				<div class="grid">
					<n-checkbox
						v-for="model in group.models"
						:key="model.id"
						:checked="isChecked(model.id)"
						@update:checked="(checked: boolean) => handleToggle(model.id, checked)"
					>
						<div class="model">
							<span class="name">{{ model.name }}</span>
							<span class="id">{{ model.id }}</span>
						</div>
					</n-checkbox>
				</div>
			</section>
		</div>

		<div v-else class="grid">
			<n-checkbox
				v-for="model in filteredModels"
				:key="model.id"
				:checked="isChecked(model.id)"
				@update:checked="(checked: boolean) => handleToggle(model.id, checked)"
			>
				<div class="model">
					<span class="name">{{ model.name }}</span>
					<span class="id">{{ model.id }}</span>
				</div>
			</n-checkbox>
		</div>

		<p v-if="filteredModels.length === 0" class="empty">
			{{ store.fetchMode === "auto" ? "请先获取模型列表" : "没有匹配的预设模型" }}
		</p>

		<div class="footer">
			<span>已选 {{ store.selectedCount }} 个</span>
		</div>
	</div>
</template>

<style scoped>
.model-selector {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.pane-tip {
	margin-bottom: 12px;
}

.toolbar {
	display: flex;
	gap: 8px;
	align-items: center;
}

.groups {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.group h3 {
	margin: 0 0 8px;
	font-size: 14px;
	font-weight: 600;
}

.grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 10px 16px;
}

.model {
	display: flex;
	flex-direction: column;
	line-height: 1.3;
}

.name {
	font-size: 13px;
}

.id {
	color: var(--n-text-color-3, #8b8b8b);
	font-size: 12px;
}

.empty {
	margin: 0;
	color: var(--n-text-color-3, #8b8b8b);
	font-size: 13px;
}

.footer {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 12px;
	color: var(--n-text-color-3, #8b8b8b);
	font-size: 13px;
}

@media (max-width: 640px) {
	.grid {
		grid-template-columns: 1fr;
	}

	.toolbar {
		flex-wrap: wrap;
	}
}
</style>
