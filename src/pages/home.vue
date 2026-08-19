<!--
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:41
 * @LastEditTime: 2026-08-19 17:45:46
 * @LastEditors: mulingyuer
 * @Description: 首页：单页布局，依次排列凭证表单、模型选择、协议选择、操作区与 JSON 编辑器
 * @FilePath: \vscode-byok-generator\src\pages\home.vue
 * 怎么可能会有bug！！！
-->
<script setup lang="ts">
import { ref } from "vue";
import { useMessage } from "naive-ui";
import CredentialsForm from "@/components/CredentialsForm.vue";
import ModelSelector from "@/components/ModelSelector.vue";
import ProtocolSelector from "@/components/ProtocolSelector.vue";
import OutputToolbar from "@/components/OutputToolbar.vue";
import JsonEditor from "@/components/JsonEditor.vue";
import { useWizardStore } from "@/stores/wizard";

const store = useWizardStore();
const message = useMessage();

// 凭证表单实例，用于点击"生成"前统一校验
const credentialsRef = ref<InstanceType<typeof CredentialsForm> | null>(null);
const generating = ref(false);

async function handleGenerate() {
	try {
		await credentialsRef.value?.validate();
	} catch {
		// 校验失败时表单项会自行展示错误
		return;
	}
	if (store.selectedCount === 0) {
		message.warning("请至少选择一个模型");
		return;
	}
	generating.value = true;
	try {
		store.generateConfig();
		message.success("配置已生成");
	} finally {
		generating.value = false;
	}
}

function handleReset() {
	store.reset();
}
</script>

<template>
	<div class="page">
		<header class="header">
			<h1>VS Code BYOK 配置生成器</h1>
			<p>在一个页面内完成所有配置，生成可粘贴到 chatLanguageModels.json 的 Custom Endpoint。</p>
		</header>

		<n-card class="card" title="凭证">
			<CredentialsForm ref="credentialsRef" />
		</n-card>

		<n-card class="card" title="模型选择">
			<ModelSelector />
		</n-card>

		<n-card class="card" title="协议选择">
			<ProtocolSelector />
		</n-card>

		<n-card class="card">
			<div class="action-bar">
				<n-button @click="handleReset">重置</n-button>
				<n-button type="primary" :loading="generating" @click="handleGenerate"> 生成配置 </n-button>
			</div>
		</n-card>

		<n-card class="card" title="输出">
			<div class="output">
				<n-alert type="info" :bordered="false">
					VS Code 首次使用时会弹出输入框，要求填入 ApiKey。生成结果里不会写入真实密钥。
				</n-alert>
				<OutputToolbar />
				<JsonEditor v-model="store.generatedConfig" />
			</div>
		</n-card>
	</div>
</template>

<style scoped>
.page {
	box-sizing: border-box;
	max-width: 800px;
	margin: 0 auto;
	padding: 32px 16px 48px;
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.header h1 {
	margin: 0 0 8px;
	font-size: 24px;
	line-height: 1.3;
}

.header p {
	margin: 0;
	color: #6b7280;
	font-size: 14px;
}

.card {
	border-radius: 12px;
}

.action-bar {
	display: flex;
	justify-content: flex-end;
	gap: 8px;
}

.output {
	display: flex;
	flex-direction: column;
	gap: 12px;
}
</style>
