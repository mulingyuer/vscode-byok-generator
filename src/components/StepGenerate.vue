<!--
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:44
 * @LastEditTime: 2026-08-19 15:09:45
 * @LastEditors: mulingyuer
 * @Description:
 * @FilePath: \vscode-byok-generator\src\components\StepGenerate.vue
 * 怎么可能会有bug！！！
-->
<script setup lang="ts">
import { useMessage } from "naive-ui";
import { useWizardStore } from "@/stores/wizard";
import type { OutputMode } from "@/types";
import JsonEditor from "@/components/JsonEditor.vue";

const store = useWizardStore();
const message = useMessage();

const modeOptions = [
	{ label: "全新添加", value: "full" },
	{ label: "追加", value: "append" }
];

function handleModeChange(value: OutputMode) {
	store.outputMode = value;
	store.generateConfig();
}

function handleFormat() {
	try {
		store.generatedConfig = `${JSON.stringify(JSON.parse(store.generatedConfig), null, 2)}\n`;
		message.success("已格式化");
	} catch {
		message.error("当前内容不是合法 JSON，无法格式化");
	}
}

async function handleCopy() {
	try {
		await navigator.clipboard.writeText(store.generatedConfig);
		message.success("已复制到剪贴板");
	} catch {
		message.error("复制失败，请手动选择文本复制");
	}
}

function handleRestart() {
	store.reset();
}
</script>

<template>
	<div class="step">
		<n-alert type="info" :bordered="false">
			VS Code 首次使用时会弹出输入框，要求填入 ApiKey。生成结果里不会写入真实密钥。
		</n-alert>

		<div class="toolbar">
			<n-radio-group :value="store.outputMode" @update:value="handleModeChange">
				<n-radio-button v-for="item in modeOptions" :key="item.value" :value="item.value">
					{{ item.label }}
				</n-radio-button>
			</n-radio-group>
			<div class="actions">
				<n-button @click="handleFormat">格式化</n-button>
				<n-button type="primary" @click="handleCopy">复制</n-button>
			</div>
		</div>

		<p class="hint">
			{{
				store.outputMode === "full"
					? "全新添加：输出带 [...] 的完整配置，适合首次写入 chatLanguageModels.json。"
					: "追加：只输出单个对象，适合已有数组配置时插入一项。"
			}}
		</p>

		<JsonEditor v-model="store.generatedConfig" />

		<div class="footer">
			<n-button @click="store.prevStep()">上一步</n-button>
			<n-button @click="handleRestart">重新开始</n-button>
		</div>
	</div>
</template>

<style scoped>
.step {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.toolbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	flex-wrap: wrap;
}

.actions,
.footer {
	display: flex;
	justify-content: flex-end;
	gap: 8px;
}

.hint {
	margin: 0;
	color: var(--n-text-color-3, #8b8b8b);
	font-size: 12px;
	line-height: 1.6;
}
</style>
