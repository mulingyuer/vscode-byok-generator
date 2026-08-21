/*
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:39
 * @LastEditTime: 2026-08-20 09:30:00
 * @LastEditors: mulingyuer
 * @Description: 配置生成器的全局状态（凭证、模型、协议、输出）
 * @FilePath: \vscode-byok-generator\src\stores\wizard.ts
 * 怎么可能会有bug！！！
 */
import type { ApiType, FetchMode, ModelItem, OutputMode } from "@/types/wizard";

/** 凭证缓存 localStorage key */
const CREDENTIALS_STORAGE_KEY = "byok:credentials";
/** 凭证缓存开关 localStorage key */
const CREDENTIALS_ENABLED_STORAGE_KEY = "byok:credentials-enabled";

/** 读取开关初始值（默认开启） */
function readCredentialsCacheEnabled(): boolean {
	try {
		return localStorage.getItem(CREDENTIALS_ENABLED_STORAGE_KEY) !== "false";
	} catch {
		return true;
	}
}

export const useWizardStore = defineStore("wizard", () => {
	/** 分组名称 */
	const groupName = ref("");
	/** 网关地址 */
	const baseUrl = ref("");
	/** 密钥 */
	const apiKey = ref("");
	/** 凭证本地缓存开关（默认开启，开关状态本身也持久化） */
	const credentialsCacheEnabled = ref(readCredentialsCacheEnabled());
	/** 模型获取方式 */
	const fetchMode = ref<FetchMode>("auto");
	/** 可选模型列表 */
	const availableModels = ref<ModelItem[]>([]);
	/** 已勾选的模型 id 列表 */
	const selectedModelIds = ref<string[]>([]);
	/** API 协议类型 */
	const apiType = ref<ApiType>("chat-completions");
	/** 输出模式 */
	const outputMode = ref<OutputMode>("full");
	/** 模型额外设置（JSON 字符串，格式为 Record<modelId, config>） */
	const modelSettings = ref("");

	/** 已勾选的完整模型对象列表 */
	const selectedModels = computed(() => {
		const selected = new Set(selectedModelIds.value);
		return availableModels.value.filter((model) => selected.has(model.id));
	});

	/** 已勾选数量 */
	const selectedCount = computed(() => selectedModelIds.value.length);

	/** 切换单个模型的勾选状态 */
	function toggleModel(id: string) {
		const index = selectedModelIds.value.indexOf(id);
		if (index >= 0) {
			selectedModelIds.value.splice(index, 1);
			return;
		}
		selectedModelIds.value.push(id);
	}

	/** 全选指定 id 列表 */
	function selectAll(ids: string[]) {
		const next = new Set(selectedModelIds.value);
		for (const id of ids) {
			next.add(id);
		}
		selectedModelIds.value = [...next];
	}

	/** 反选指定 id 列表 */
	function invertSelection(ids: string[]) {
		const current = new Set(selectedModelIds.value);
		for (const id of ids) {
			if (current.has(id)) {
				current.delete(id);
			} else {
				current.add(id);
			}
		}
		selectedModelIds.value = [...current];
	}

	/** 将凭证写入 localStorage（仅在缓存开启时调用） */
	function saveCredentials() {
		try {
			localStorage.setItem(
				CREDENTIALS_STORAGE_KEY,
				JSON.stringify({
					groupName: groupName.value,
					baseUrl: baseUrl.value,
					apiKey: apiKey.value
				})
			);
		} catch {
			// localStorage 不可用时静默失败
		}
	}

	/** 从 localStorage 读取凭证并填充（仅在缓存开启时调用） */
	function loadCredentials() {
		try {
			const raw = localStorage.getItem(CREDENTIALS_STORAGE_KEY);
			if (!raw) {
				return;
			}
			const cached = JSON.parse(raw) as Partial<{
				groupName: string;
				baseUrl: string;
				apiKey: string;
			}>;
			if (typeof cached.groupName === "string") {
				groupName.value = cached.groupName;
			}
			if (typeof cached.baseUrl === "string") {
				baseUrl.value = cached.baseUrl;
			}
			if (typeof cached.apiKey === "string") {
				apiKey.value = cached.apiKey;
			}
		} catch {
			// 缓存损坏时静默失败
		}
	}

	/** 清除 localStorage 中的凭证缓存 */
	function clearCredentials() {
		try {
			localStorage.removeItem(CREDENTIALS_STORAGE_KEY);
		} catch {
			// localStorage 不可用时静默失败
		}
	}

	/** 重置所有状态（缓存开启时同步清除已缓存凭证） */
	function reset() {
		groupName.value = "";
		baseUrl.value = "";
		apiKey.value = "";
		fetchMode.value = "auto";
		availableModels.value = [];
		selectedModelIds.value = [];
		apiType.value = "chat-completions";
		outputMode.value = "full";
		modelSettings.value = "";
		if (credentialsCacheEnabled.value) {
			clearCredentials();
		}
	}

	return {
		groupName,
		baseUrl,
		apiKey,
		credentialsCacheEnabled,
		fetchMode,
		availableModels,
		selectedModelIds,
		selectedModels,
		selectedCount,
		apiType,
		outputMode,
		modelSettings,
		toggleModel,
		selectAll,
		invertSelection,
		saveCredentials,
		loadCredentials,
		clearCredentials,
		reset
	};
});
