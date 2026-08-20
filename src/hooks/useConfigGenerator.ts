/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:15:21
 * @LastEditTime: 2026-08-20 15:15:21
 * @LastEditors: mulingyuer
 * @Description:
 * @FilePath: \vscode-byok-generator\src\hooks\useConfigGenerator.ts
 * 怎么可能会有bug！！！
 */
/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 10:00:00
 * @LastEditTime: 2026-08-20 10:00:00
 * @LastEditors: mulingyuer
 * @Description: 配置生成 composable：聚合生成逻辑、加载状态与错误信息（模块级共享生成结果）
 * @FilePath: \vscode-byok-generator\src\hooks\useConfigGenerator.ts
 * 怎么可能会有bug！！！
 */
import { useWizardStore } from "@/stores/wizard";
import { generateProviderConfig, serializeConfig } from "@/utils/configGenerator";

/** 生成结果 JSON 字符串（模块级共享，供 JsonEditor / OutputToolbar 等组件访问） */
const generatedConfig = ref("");
/** 是否正在生成 */
const isGenerating = ref(false);
/** 最近一次生成的错误信息 */
const error = ref<string>("");

/** 配置生成 hook：组合 configGenerator 纯函数与 wizard store 状态 */
export function useConfigGenerator() {
	const store = useWizardStore();

	/** 生成配置 JSON，返回生成结果；失败时抛出异常并写入 error */
	async function generateConfig(): Promise<string> {
		isGenerating.value = true;
		error.value = "";
		try {
			const provider = generateProviderConfig({
				groupName: store.groupName,
				apiType: store.apiType,
				baseUrl: store.baseUrl,
				selectedModels: store.selectedModels,
				modelSettings: store.modelSettings
			});
			generatedConfig.value = serializeConfig(provider, store.outputMode);
			return generatedConfig.value;
		} catch (err) {
			error.value = err instanceof Error ? err.message : String(err);
			throw err;
		} finally {
			isGenerating.value = false;
		}
	}

	/** 重置生成结果与错误状态 */
	function resetGenerated() {
		generatedConfig.value = "";
		error.value = "";
	}

	return {
		generatedConfig,
		isGenerating,
		error,
		generateConfig,
		resetGenerated
	};
}
