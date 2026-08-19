<!--
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:41
 * @LastEditTime: 2026-08-19 15:09:42
 * @LastEditors: mulingyuer
 * @Description:
 * @FilePath: \vscode-byok-generator\src\components\StepModelSelect.vue
 * 怎么可能会有bug！！！
-->
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useMessage } from "naive-ui";
import { VENDOR_LABELS, VENDOR_ORDER, presetsToModelItems } from "@/data/modelPresets";
import { useWizardStore } from "@/stores/wizard";
import type { FetchMode } from "@/types";
import { describeFetchError, fetchRemoteModels } from "@/utils/fetchModels";

const store = useWizardStore();
const message = useMessage();
const keyword = ref("");
const loading = ref(false);
const fetchError = ref("");

const modeOptions = [
	{ label: "自动获取", value: "auto" },
	{ label: "预设模型", value: "preset" }
];

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

function handleNext() {
	if (store.selectedCount === 0) {
		message.warning("请至少选择一个模型");
		return;
	}
	store.nextStep();
}
</script>

<template>
	<div class="step">
		<n-radio-group :value="store.fetchMode" @update:value="handleModeChange">
			<n-radio-button v-for="item in modeOptions" :key="item.value" :value="item.value">
				{{ item.label }}
			</n-radio-button>
		</n-radio-group>

		<n-alert v-if="store.fetchMode === 'auto'" type="info" :bordered="false">
			浏览器会直接请求网关的 /v1/models。若网关未开放 CORS，请求会失败，请改用预设模型。
		</n-alert>

		<div v-if="store.fetchMode === 'auto'" class="toolbar">
			<n-button type="primary" :loading="loading" @click="handleFetch">获取模型</n-button>
		</div>

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
			<div class="actions">
				<n-button @click="store.prevStep()">上一步</n-button>
				<n-button type="primary" @click="handleNext">下一步</n-button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.step {
	display: flex;
	flex-direction: column;
	gap: 16px;
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
	justify-content: space-between;
	gap: 12px;
}

.actions {
	display: flex;
	gap: 8px;
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
