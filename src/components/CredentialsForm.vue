<!--
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:41
 * @LastEditTime: 2026-08-19 17:45:18
 * @LastEditors: mulingyuer
 * @Description: 凭证表单（分组名称 / BaseUrl / ApiKey），暴露 validate 供父组件触发生成
 * @FilePath: \vscode-byok-generator\src\components\CredentialsForm.vue
 * 怎么可能会有bug！！！
-->
<script setup lang="ts">
import { computed, ref } from "vue";
import type { FormInst, FormRules } from "naive-ui";
import { EyeOutline, EyeOffOutline } from "@vicons/ionicons5";
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

const apiKeyVisible = ref(false);

// 供父组件在点击"生成"时统一触发校验
defineExpose({
	validate: () => formRef.value?.validate()
});
</script>

<template>
	<div class="credentials-form">
		<n-form
			ref="formRef"
			:model="formValue"
			:rules="rules"
			label-placement="top"
			require-mark-placement="right-hanging"
			autocomplete="off"
		>
			<n-form-item label="Group Name" path="groupName">
				<n-input
					v-model:value="store.groupName"
					placeholder="例如 My Gateway"
					clearable
					:input-props="{ autocomplete: 'off' }"
				/>
			</n-form-item>
			<p class="field-hint">显示在 VS Code 模型选择器中的分组名称</p>

			<n-form-item label="BaseUrl" path="baseUrl">
				<n-input
					v-model:value="store.baseUrl"
					placeholder="https://gateway.example.com/v1"
					clearable
					:input-props="{ autocomplete: 'off' }"
				/>
			</n-form-item>

			<n-form-item label="ApiKey" path="apiKey">
				<n-input
					v-model:value="store.apiKey"
					type="text"
					placeholder="仅用于本地拉取模型列表"
					clearable
					:input-props="{ autocomplete: 'off', class: apiKeyVisible ? '' : 'masked-input' }"
				>
					<template #suffix>
						<n-icon
							:component="apiKeyVisible ? EyeOutline : EyeOffOutline"
							style="cursor: pointer"
							@click="apiKeyVisible = !apiKeyVisible"
						/>
					</template>
				</n-input>
			</n-form-item>
		</n-form>

		<p class="hint">
			ApiKey 仅在浏览器本地使用，不会上传至任何服务器。生成配置时会写成 ${input:...} 变量。
		</p>
	</div>
</template>

<style scoped>
.credentials-form {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

:deep(.n-form-item-label) {
	font-weight: 600;
	font-size: 14px;
	color: var(--n-text-color-1);
}

.field-hint,
.hint {
	margin: -8px 0 8px;
	color: var(--n-text-color-3, #8b8b8b);
	font-size: 12px;
	line-height: 1.6;
}

/* 用 CSS 遮罩代替 type="password"，绕过浏览器密码管理器 */
:deep(.masked-input) {
	-webkit-text-security: disc;
	text-security: disc;
}

.hint {
	margin: 0;
}
</style>
