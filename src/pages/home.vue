<!--
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:41
 * @LastEditTime: 2026-08-20 09:30:00
 * @LastEditors: mulingyuer
 * @Description: 首页：单页布局，依次排列凭证表单、模型选择、协议选择、操作区与 JSON 编辑器
 * @FilePath: \vscode-byok-generator\src\pages\home.vue
 * 怎么可能会有bug！！！
-->
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
				<n-button size="large" @click="handleReset">重置</n-button>
				<n-button
					size="large"
					type="primary"
					:loading="isGenerating"
					style="min-width: 120px"
					@click="handleGenerate"
				>
					生成配置
				</n-button>
			</div>
		</n-card>

		<n-card class="card" title="输出">
			<div class="output">
				<n-alert type="info" :bordered="false">
					VS Code 首次使用时会弹出输入框，要求填入 ApiKey。生成结果里不会写入真实密钥。
				</n-alert>
				<OutputToolbar />
				<JsonEditor v-model="generatedConfig" />
			</div>
		</n-card>
	</div>
</template>

<script setup lang="ts">
import CredentialsForm from "@/components/CredentialsForm.vue";
import JsonEditor from "@/components/JsonEditor.vue";
import ModelSelector from "@/components/ModelSelector.vue";
import OutputToolbar from "@/components/OutputToolbar.vue";
import ProtocolSelector from "@/components/ProtocolSelector.vue";
import { useConfigGenerator } from "@/hooks/useConfigGenerator";
import { useWizardStore } from "@/stores/wizard";

const store = useWizardStore();
const { generatedConfig, isGenerating, generateConfig, resetGenerated } = useConfigGenerator();
const message = useMessage();

/** 凭证表单实例，用于点击"生成"前统一校验 */
const credentialsRef = ref<InstanceType<typeof CredentialsForm> | null>(null);

/** 校验表单并生成配置 */
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
	try {
		await generateConfig();
		message.success("配置已生成");
	} catch {
		message.error("配置生成失败");
	}
}

/** 重置所有配置 */
function handleReset() {
	store.reset();
	resetGenerated();
}
</script>

<style lang="scss" scoped>
.page {
	box-sizing: border-box;
	max-width: 800px;
	margin: 0 auto;
	padding: 32px 16px 48px;
	display: flex;
	flex-direction: column;
	gap: 16px;
}

@media (min-width: 1024px) {
	.page {
		max-width: 960px;
		padding: 48px 24px 64px;
		gap: 24px;
	}
}

@media (min-width: 1600px) {
	.page {
		max-width: 1200px;
	}
}

@media (max-width: 639px) {
	.page {
		padding-left: 12px;
		padding-right: 12px;
	}
}

.header h1 {
	margin: 0 0 8px;
	font-size: 32px;
	font-weight: 700;
	letter-spacing: 0.01em;
	line-height: 1.3;
}

@media (min-width: 1600px) {
	.header h1 {
		font-size: 36px;
	}
}

.header p {
	margin: 0;
	color: #6b7280;
	font-size: 15px;
}

.card {
	border-radius: 12px;
	transition: box-shadow 0.2s ease;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.card:hover {
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
