/*
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:39
 * @LastEditTime: 2026-08-19 15:09:40
 * @LastEditors: mulingyuer
 * @Description:
 * @FilePath: \vscode-byok-generator\src\stores\wizard.ts
 * 怎么可能会有bug！！！
 */
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { ApiType, FetchMode, ModelItem, OutputMode } from "@/types";
import { generateProviderConfig, serializeConfig } from "@/utils/configGenerator";

const INITIAL_STEP = 1;
const LAST_STEP = 4;

export const useWizardStore = defineStore("wizard", () => {
	const step = ref(INITIAL_STEP);
	const groupName = ref("");
	const baseUrl = ref("");
	const apiKey = ref("");
	const fetchMode = ref<FetchMode>("auto");
	const availableModels = ref<ModelItem[]>([]);
	const selectedModelIds = ref<string[]>([]);
	const apiType = ref<ApiType>("chat-completions");
	const generatedConfig = ref("");
	const outputMode = ref<OutputMode>("full");

	const selectedModels = computed(() => {
		const selected = new Set(selectedModelIds.value);
		return availableModels.value.filter((model) => selected.has(model.id));
	});

	const selectedCount = computed(() => selectedModelIds.value.length);

	function setStep(next: number) {
		step.value = Math.min(LAST_STEP, Math.max(INITIAL_STEP, next));
	}

	function nextStep() {
		setStep(step.value + 1);
	}

	function prevStep() {
		setStep(step.value - 1);
	}

	function toggleModel(id: string) {
		const index = selectedModelIds.value.indexOf(id);
		if (index >= 0) {
			selectedModelIds.value.splice(index, 1);
			return;
		}
		selectedModelIds.value.push(id);
	}

	function selectAll(ids: string[]) {
		const next = new Set(selectedModelIds.value);
		for (const id of ids) {
			next.add(id);
		}
		selectedModelIds.value = [...next];
	}

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

	function generateConfig() {
		const provider = generateProviderConfig({
			groupName: groupName.value,
			apiType: apiType.value,
			baseUrl: baseUrl.value,
			selectedModels: selectedModels.value
		});
		generatedConfig.value = serializeConfig(provider, outputMode.value);
		return generatedConfig.value;
	}

	function reset() {
		step.value = INITIAL_STEP;
		groupName.value = "";
		baseUrl.value = "";
		apiKey.value = "";
		fetchMode.value = "auto";
		availableModels.value = [];
		selectedModelIds.value = [];
		apiType.value = "chat-completions";
		generatedConfig.value = "";
		outputMode.value = "full";
	}

	return {
		step,
		groupName,
		baseUrl,
		apiKey,
		fetchMode,
		availableModels,
		selectedModelIds,
		selectedModels,
		selectedCount,
		apiType,
		generatedConfig,
		outputMode,
		setStep,
		nextStep,
		prevStep,
		toggleModel,
		selectAll,
		invertSelection,
		generateConfig,
		reset
	};
});
