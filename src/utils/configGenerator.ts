/*
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:07:09
 * @LastEditTime: 2026-08-20 09:30:00
 * @LastEditors: mulingyuer
 * @Description: 配置生成器工具函数
 * @FilePath: \vscode-byok-generator\src\utils\configGenerator.ts
 * 怎么可能会有bug！！！
 */

import type {
	ApiType,
	GenerateConfigInput,
	GeneratedModelConfig,
	GeneratedProviderConfig,
	ModelItem
} from "@/types/wizard";
import { FALLBACK_MODEL_DEFAULTS } from "@/constant/modelPresets";
import { matchPreset } from "@/utils/modelMatcher";

/** 模型默认值（未匹配预设时的兜底，来源统一收敛到 modelPresets/defaults.ts） */
export const DEFAULT_MODEL_LIMITS = FALLBACK_MODEL_DEFAULTS;

const API_PATHS: Record<ApiType, string> = {
	"chat-completions": "/chat/completions",
	responses: "/responses",
	messages: "/messages"
};

const EXPLICIT_API_PATH = /\/(chat\/completions|responses|messages)$/i;
const VERSION_SEGMENT = /\/v\d+$/i;

/** 将分组名称转换为 input 变量 slug */
export function toInputSlug(groupName: string): string {
	const slug = groupName
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "")
		.replace(/[^a-z0-9]/g, "");
	return slug || "apikey";
}

/** 根据 baseUrl 和协议类型解析完整的模型 API 地址 */
export function resolveModelUrl(baseUrl: string, apiType: ApiType): string {
	const trimmed = baseUrl.trim().replace(/\/+$/, "");
	if (!trimmed) {
		return trimmed;
	}
	if (EXPLICIT_API_PATH.test(trimmed)) {
		return trimmed;
	}
	const withVersion = VERSION_SEGMENT.test(trimmed) ? trimmed : `${trimmed}/v1`;
	return `${withVersion}${API_PATHS[apiType]}`;
}

/** 标准化 SDK 用的 baseUrl（去掉 API 路径，保留版本段） */
export function normalizeSdkBaseUrl(baseUrl: string): string {
	const trimmed = baseUrl.trim().replace(/\/+$/, "");
	if (!trimmed) {
		return trimmed;
	}
	if (EXPLICIT_API_PATH.test(trimmed)) {
		return trimmed.replace(EXPLICIT_API_PATH, "");
	}
	if (VERSION_SEGMENT.test(trimmed)) {
		return trimmed;
	}
	return `${trimmed}/v1`;
}

/** 构建单个模型的配置对象 */
function buildModelConfig(
	model: ModelItem,
	baseUrl: string,
	providerApiType: ApiType
): GeneratedModelConfig {
	const preset = matchPreset(model.id);
	const modelApiType = preset?.apiType ?? providerApiType;
	const config: GeneratedModelConfig = {
		id: model.id,
		name: model.name || preset?.displayName || model.id,
		url: resolveModelUrl(baseUrl, modelApiType),
		apiType: preset?.apiType,
		toolCalling: preset?.toolCalling ?? DEFAULT_MODEL_LIMITS.toolCalling,
		vision: preset?.vision ?? DEFAULT_MODEL_LIMITS.vision,
		maxInputTokens: preset?.maxInputTokens ?? DEFAULT_MODEL_LIMITS.maxInputTokens,
		maxOutputTokens: preset?.maxOutputTokens ?? DEFAULT_MODEL_LIMITS.maxOutputTokens
	};

	const contextWindow = preset?.contextWindow ?? DEFAULT_MODEL_LIMITS.contextWindow;
	if (contextWindow) {
		config.contextWindow = contextWindow;
	}
	if (preset?.thinking) {
		config.thinking = true;
	}
	if (preset?.supportsReasoningEffort?.length) {
		config.supportsReasoningEffort = [...preset.supportsReasoningEffort];
		config.reasoningEffortFormat = modelApiType;
	}

	return config;
}

/** 为支持 reasoning 的模型自动生成默认 settings */
function generateDefaultSettings(
	models: ModelItem[]
): Record<string, Record<string, unknown>> | undefined {
	const settings: Record<string, Record<string, unknown>> = {};
	let hasSettings = false;

	for (const model of models) {
		const preset = matchPreset(model.id);
		if (preset?.thinking && preset.supportsReasoningEffort?.length) {
			settings[model.id] = {
				reasoningEffort: "medium"
			};
			hasSettings = true;
		}
	}

	return hasSettings ? settings : undefined;
}

/** 生成完整的 Provider 配置对象 */
export function generateProviderConfig(input: GenerateConfigInput): GeneratedProviderConfig {
	const slug = toInputSlug(input.groupName);

	const config: GeneratedProviderConfig = {
		name: input.groupName.trim() || "Custom Endpoint",
		vendor: "customendpoint",
		apiKey: `\${input:${slug}}`,
		apiType: input.apiType,
		models: input.selectedModels.map((model) =>
			buildModelConfig(model, input.baseUrl, input.apiType)
		)
	};

	// 优先使用用户提供的 settings，否则自动生成
	if (input.modelSettings) {
		const settings = parseModelSettings(input.modelSettings);
		if (settings) {
			config.settings = settings;
		}
	} else {
		const defaultSettings = generateDefaultSettings(input.selectedModels);
		if (defaultSettings) {
			config.settings = defaultSettings;
		}
	}

	return config;
}

/** 解析模型设置 JSON 字符串，返回 Record<modelId, config> 或 undefined */
function parseModelSettings(json: string): Record<string, Record<string, unknown>> | undefined {
	const trimmed = json.trim();
	if (!trimmed) {
		return undefined;
	}
	try {
		const parsed = JSON.parse(trimmed);
		if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
			return parsed as Record<string, Record<string, unknown>>;
		}
	} catch {
		// 解析失败时忽略 settings
	}
	return undefined;
}

/** 将配置对象序列化为 JSON 字符串 */
export function serializeConfig(
	provider: GeneratedProviderConfig,
	mode: "full" | "append"
): string {
	const payload = mode === "full" ? [provider] : provider;
	return `${JSON.stringify(payload, null, 2)}\n`;
}
