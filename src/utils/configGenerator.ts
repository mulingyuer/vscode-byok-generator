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
import { matchPreset } from "@/utils/modelMatcher";

/** 模型默认值 */
export const DEFAULT_MODEL_LIMITS = {
	maxInputTokens: 128000,
	maxOutputTokens: 8192,
	toolCalling: true,
	vision: false
} as const;

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
function buildModelConfig(model: ModelItem, url: string, apiType: ApiType): GeneratedModelConfig {
	const preset = matchPreset(model.id);
	const config: GeneratedModelConfig = {
		id: model.id,
		name: model.name || preset?.displayName || model.id,
		url,
		toolCalling: preset?.toolCalling ?? DEFAULT_MODEL_LIMITS.toolCalling,
		vision: preset?.vision ?? DEFAULT_MODEL_LIMITS.vision,
		maxInputTokens: preset?.maxInputTokens ?? DEFAULT_MODEL_LIMITS.maxInputTokens,
		maxOutputTokens: preset?.maxOutputTokens ?? DEFAULT_MODEL_LIMITS.maxOutputTokens
	};

	if (preset?.contextWindow) {
		config.contextWindow = preset.contextWindow;
	}
	if (preset?.thinking) {
		config.thinking = true;
	}
	if (preset?.supportsReasoningEffort?.length) {
		config.supportsReasoningEffort = [...preset.supportsReasoningEffort];
		config.reasoningEffortFormat = apiType;
	}

	return config;
}

/** 生成完整的 Provider 配置对象 */
export function generateProviderConfig(input: GenerateConfigInput): GeneratedProviderConfig {
	const url = resolveModelUrl(input.baseUrl, input.apiType);
	const slug = toInputSlug(input.groupName);

	return {
		name: input.groupName.trim() || "Custom Endpoint",
		vendor: "customendpoint",
		apiKey: `\${input:${slug}}`,
		apiType: input.apiType,
		models: input.selectedModels.map((model) => buildModelConfig(model, url, input.apiType))
	};
}

/** 将配置对象序列化为 JSON 字符串 */
export function serializeConfig(
	provider: GeneratedProviderConfig,
	mode: "full" | "append"
): string {
	const payload = mode === "full" ? [provider] : provider;
	return `${JSON.stringify(payload, null, 2)}\n`;
}
