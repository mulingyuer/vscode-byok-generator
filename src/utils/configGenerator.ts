/*
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:07:09
 * @LastEditTime: 2026-08-19 15:07:10
 * @LastEditors: mulingyuer
 * @Description:
 * @FilePath: \vscode-byok-generator\src\utils\configGenerator.ts
 * 怎么可能会有bug！！！
 */
import type {
	ApiType,
	GenerateConfigInput,
	GeneratedModelConfig,
	GeneratedProviderConfig,
	ModelItem
} from "@/types";
import { matchPreset } from "@/utils/modelMatcher";

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

export function toInputSlug(groupName: string): string {
	const slug = groupName
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "")
		.replace(/[^a-z0-9]/g, "");
	return slug || "apikey";
}

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

export function serializeConfig(
	provider: GeneratedProviderConfig,
	mode: "full" | "append"
): string {
	const payload = mode === "full" ? [provider] : provider;
	return `${JSON.stringify(payload, null, 2)}\n`;
}
