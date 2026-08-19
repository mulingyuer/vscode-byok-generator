<!--
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:41
 * @LastEditTime: 2026-08-19 15:09:41
 * @LastEditors: mulingyuer
 * @Description:
 * @FilePath: \vscode-byok-generator\src\components\StepCredentials.vue
 * 怎么可能会有bug！！！
-->
<script setup lang="ts">
import { computed, ref } from "vue";
import type { FormInst, FormRules } from "naive-ui";
import { useWizardStore } from "@/stores/wizard";

const store = useWizardStore();
const formRef = ref<FormInst | null>(null);

const formValue = computed(() => ({
	groupName: store.groupName,
	baseUrl: store.baseUrl,
	apiKey: store.apiKey
}));

function isValidHttpUrl(value: string): boolean {
	try {
		const url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}

const rules: FormRules = {
	groupName: {
		required: true,
		message: "请输入分组名称",
		trigger: ["blur", "input"]
	},
	baseUrl: [
		{
			required: true,
			message: "请输入 BaseUrl",
			trigger: ["blur", "input"]
		},
		{
			validator(_rule, value: string) {
				if (!value || isValidHttpUrl(value)) {
					return true;
				}
				return new Error("请输入合法的 HTTP/HTTPS 地址");
			},
			trigger: ["blur", "input"]
		}
	],
	apiKey: {
		required: true,
		message: "请输入 ApiKey",
		trigger: ["blur", "input"]
	}
};

async function handleNext() {
	try {
		await formRef.value?.validate();
		store.nextStep();
	} catch {
		// 校验失败时表单项会自行展示错误
	}
}
</script>

<template>
	<div class="step">
		<n-form
			ref="formRef"
			:model="formValue"
			:rules="rules"
			label-placement="top"
			require-mark-placement="right-hanging"
		>
			<n-form-item label="Group Name" path="groupName">
				<n-input v-model:value="store.groupName" placeholder="例如 My Gateway" clearable />
			</n-form-item>
			<p class="field-hint">显示在 VS Code 模型选择器中的分组名称</p>

			<n-form-item label="BaseUrl" path="baseUrl">
				<n-input
					v-model:value="store.baseUrl"
					placeholder="https://gateway.example.com/v1"
					clearable
				/>
			</n-form-item>

			<n-form-item label="ApiKey" path="apiKey">
				<n-input
					v-model:value="store.apiKey"
					type="password"
					show-password-on="click"
					placeholder="仅用于本地拉取模型列表"
					clearable
				/>
			</n-form-item>
		</n-form>

		<p class="hint">
			ApiKey 仅在浏览器本地使用，不会上传至任何服务器。生成配置时会写成 ${input:...} 变量。
		</p>

		<div class="actions">
			<n-button type="primary" @click="handleNext">下一步</n-button>
		</div>
	</div>
</template>

<style scoped>
.step {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.field-hint,
.hint {
	margin: -8px 0 8px;
	color: var(--n-text-color-3, #8b8b8b);
	font-size: 12px;
	line-height: 1.6;
}

.hint {
	margin: 0;
}

.actions {
	display: flex;
	justify-content: flex-end;
	margin-top: 8px;
}
</style>
