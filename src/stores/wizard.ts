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

export const useWizardStore = defineStore("wizard", () => {
	/** 分组名称 */
	const groupName = ref("");
	/** 网关地址 */
	const baseUrl = ref("");
	/** 密钥 */
	const apiKey = ref("");
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

	/** 重置所有状态 */
	function reset() {
		groupName.value = "";
		baseUrl.value = "";
		apiKey.value = "";
		fetchMode.value = "auto";
		availableModels.value = [];
		selectedModelIds.value = [];
		apiType.value = "chat-completions";
		outputMode.value = "full";
	}

	return {
		groupName,
		baseUrl,
		apiKey,
		fetchMode,
		availableModels,
		selectedModelIds,
		selectedModels,
		selectedCount,
		apiType,
		outputMode,
		toggleModel,
		selectAll,
		invertSelection,
		reset
	};
});
