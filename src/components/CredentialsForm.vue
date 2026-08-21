<!--
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:41
 * @LastEditTime: 2026-08-21 10:17:07
 * @LastEditors: mulingyuer
 * @Description: 凭证表单（分组名称 / BaseUrl / ApiKey），暴露 validate 供父组件触发生成
 * @FilePath: \vscode-byok-generator\src\components\CredentialsForm.vue
 * 怎么可能会有bug！！！
-->
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

			<div class="cache-switch">
				<n-switch
					:value="store.credentialsCacheEnabled"
					size="small"
					@update:value="handleCacheToggle"
				/>
				<span class="cache-switch-label">
					记住凭证（仅保存在本地浏览器）【每次调试都要重新输，好烦的，搞这个省点事】
				</span>
			</div>
		</n-form>

		<p class="hint">
			ApiKey 仅在浏览器本地使用，不会上传至任何服务器。生成配置时会写成 ${input:...}
			变量。开启「记住凭证」后 ApiKey 将以明文存储在浏览器 localStorage 中，公共设备上请谨慎开启。
		</p>
	</div>
</template>

<script setup lang="ts">
import type { FormInst, FormRules } from "naive-ui";
import { EyeOffOutline, EyeOutline } from "@vicons/ionicons5";
import { useWizardStore } from "@/stores/wizard";

const store = useWizardStore();
const formRef = ref<FormInst | null>(null);

const formValue = computed(() => ({
	groupName: store.groupName,
	baseUrl: store.baseUrl,
	apiKey: store.apiKey
}));

/** 校验是否为合法的 HTTP/HTTPS 地址 */
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

// 进入页面时若缓存开启则自动填充
onMounted(() => {
	if (store.credentialsCacheEnabled) {
		store.loadCredentials();
	}
});

/** 防抖写入缓存，避免每个按键都写 localStorage */
let saveTimer: ReturnType<typeof setTimeout> | null = null;

watch(
	() => [store.groupName, store.baseUrl, store.apiKey],
	() => {
		if (!store.credentialsCacheEnabled) {
			return;
		}
		if (saveTimer !== null) {
			clearTimeout(saveTimer);
		}
		saveTimer = setTimeout(() => {
			saveTimer = null;
			store.saveCredentials();
		}, 300);
	}
);

onBeforeUnmount(() => {
	if (saveTimer !== null) {
		clearTimeout(saveTimer);
		saveTimer = null;
	}
});

/** 切换缓存开关：持久化开关状态，关闭时立即清除缓存 */
function handleCacheToggle(enabled: boolean) {
	store.credentialsCacheEnabled = enabled;
	try {
		localStorage.setItem("byok:credentials-enabled", String(enabled));
	} catch {
		// localStorage 不可用时静默失败
	}
	if (!enabled) {
		if (saveTimer !== null) {
			clearTimeout(saveTimer);
			saveTimer = null;
		}
		store.clearCredentials();
	}
}

// 供父组件在点击"生成"时统一触发校验
defineExpose({
	validate: () => formRef.value?.validate()
});
</script>

<style lang="scss" scoped>
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

// 用 CSS 遮罩代替 type="password"，绕过浏览器密码管理器
:deep(.masked-input) {
	-webkit-text-security: disc;
	text-security: disc;
}

.cache-switch {
	display: flex;
	align-items: center;
	gap: 8px;
}

.cache-switch-label {
	font-size: 13px;
	color: var(--n-text-color-2);
}

.hint {
	margin: 0;
}
</style>
