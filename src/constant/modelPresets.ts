/*
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:07:08
 * @LastEditTime: 2026-08-20 14:48:04
 * @LastEditors: mulingyuer
 * @Description: 模型预设的静态数据
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets.ts
 * 怎么可能会有bug！！！
 */
import type { ModelItem, ModelPreset, ModelVendor } from "@/types/wizard";

const OPENAI_REASONING = ["minimal", "low", "medium", "high"];
const STANDARD_REASONING = ["low", "medium", "high"];

function preset(
	vendor: ModelVendor,
	canonicalId: string,
	displayName: string,
	options: Omit<ModelPreset, "vendor" | "canonicalId" | "displayName" | "patterns"> & {
		patterns?: string[];
	}
): ModelPreset {
	return {
		vendor,
		canonicalId,
		displayName,
		patterns: options.patterns ?? [canonicalId],
		maxInputTokens: options.maxInputTokens,
		maxOutputTokens: options.maxOutputTokens,
		contextWindow: options.contextWindow,
		toolCalling: options.toolCalling,
		vision: options.vision,
		thinking: options.thinking,
		supportsReasoningEffort: options.supportsReasoningEffort,
		reasoningEffortFormat: options.reasoningEffortFormat,
		apiType: options.apiType
	};
}

export const MODEL_PRESETS: ModelPreset[] = [
	preset("openai", "gpt-4o", "GPT-4o", {
		maxInputTokens: 128000,
		maxOutputTokens: 16384,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["gpt-4o", "chatgpt-4o", "gpt4o"]
	}),
	preset("openai", "gpt-4o-mini", "GPT-4o mini", {
		maxInputTokens: 128000,
		maxOutputTokens: 16384,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["gpt-4o-mini", "gpt4omini", "chatgpt-4o-mini"]
	}),
	preset("openai", "gpt-4.1", "GPT-4.1", {
		maxInputTokens: 1047576,
		maxOutputTokens: 32768,
		contextWindow: 1047576,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["gpt-4.1", "gpt4.1", "gpt41"]
	}),
	preset("openai", "gpt-4.1-mini", "GPT-4.1 mini", {
		maxInputTokens: 1047576,
		maxOutputTokens: 32768,
		contextWindow: 1047576,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["gpt-4.1-mini", "gpt41mini"]
	}),
	preset("openai", "gpt-4.1-nano", "GPT-4.1 nano", {
		maxInputTokens: 1047576,
		maxOutputTokens: 32768,
		contextWindow: 1047576,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["gpt-4.1-nano", "gpt41nano"]
	}),
	preset("openai", "gpt-5", "GPT-5", {
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING,
		patterns: ["gpt-5", "gpt5"]
	}),
	preset("openai", "gpt-5-mini", "GPT-5 mini", {
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING,
		patterns: ["gpt-5-mini", "gpt5mini"]
	}),
	preset("openai", "gpt-5-nano", "GPT-5 nano", {
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING,
		patterns: ["gpt-5-nano", "gpt5nano"]
	}),
	preset("openai", "gpt-5.1", "GPT-5.1", {
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING,
		patterns: ["gpt-5.1", "gpt5.1", "gpt51"]
	}),
	preset("openai", "gpt-5.2", "GPT-5.2", {
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING,
		patterns: ["gpt-5.2", "gpt5.2", "gpt52"]
	}),
	preset("openai", "gpt-5.5", "GPT-5.5", {
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING,
		patterns: ["gpt-5.5", "gpt5.5", "gpt55"]
	}),
	preset("openai", "o3", "o3", {
		maxInputTokens: 200000,
		maxOutputTokens: 100000,
		contextWindow: 200000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["o3"]
	}),
	preset("openai", "o4-mini", "o4-mini", {
		maxInputTokens: 200000,
		maxOutputTokens: 100000,
		contextWindow: 200000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["o4-mini", "o4mini"]
	}),

	preset("anthropic", "claude-3-5-sonnet", "Claude 3.5 Sonnet", {
		maxInputTokens: 200000,
		maxOutputTokens: 8192,
		contextWindow: 200000,
		toolCalling: true,
		vision: true,
		thinking: false,
		apiType: "messages",
		patterns: ["claude-3-5-sonnet", "claude-3.5-sonnet", "claude35sonnet"]
	}),
	preset("anthropic", "claude-3-5-haiku", "Claude 3.5 Haiku", {
		maxInputTokens: 200000,
		maxOutputTokens: 8192,
		contextWindow: 200000,
		toolCalling: true,
		vision: true,
		thinking: false,
		apiType: "messages",
		patterns: ["claude-3-5-haiku", "claude-3.5-haiku", "claude35haiku"]
	}),
	preset("anthropic", "claude-3-7-sonnet", "Claude 3.7 Sonnet", {
		maxInputTokens: 200000,
		maxOutputTokens: 64000,
		contextWindow: 200000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		apiType: "messages",
		patterns: ["claude-3-7-sonnet", "claude-3.7-sonnet", "claude37sonnet"]
	}),
	preset("anthropic", "claude-sonnet-4", "Claude Sonnet 4", {
		maxInputTokens: 200000,
		maxOutputTokens: 64000,
		contextWindow: 200000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		apiType: "messages",
		patterns: ["claude-sonnet-4", "claude-4-sonnet", "claudesonnet4"]
	}),
	preset("anthropic", "claude-opus-4", "Claude Opus 4", {
		maxInputTokens: 200000,
		maxOutputTokens: 32000,
		contextWindow: 200000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		apiType: "messages",
		patterns: ["claude-opus-4", "claude-4-opus", "claudeopus4"]
	}),
	preset("anthropic", "claude-sonnet-4-5", "Claude Sonnet 4.5", {
		maxInputTokens: 200000,
		maxOutputTokens: 64000,
		contextWindow: 200000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		apiType: "messages",
		patterns: ["claude-sonnet-4-5", "claude-4-5-sonnet", "claudesonnet45"]
	}),
	preset("anthropic", "claude-opus-4-5", "Claude Opus 4.5", {
		maxInputTokens: 200000,
		maxOutputTokens: 64000,
		contextWindow: 200000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		apiType: "messages",
		patterns: ["claude-opus-4-5", "claude-4-5-opus", "claudeopus45"]
	}),
	preset("anthropic", "claude-haiku-4-5", "Claude Haiku 4.5", {
		maxInputTokens: 200000,
		maxOutputTokens: 64000,
		contextWindow: 200000,
		toolCalling: true,
		vision: true,
		thinking: false,
		apiType: "messages",
		patterns: ["claude-haiku-4-5", "claude-4-5-haiku", "claudehaiku45"]
	}),
	preset("anthropic", "claude-sonnet-4-6", "Claude Sonnet 4.6", {
		maxInputTokens: 200000,
		maxOutputTokens: 64000,
		contextWindow: 200000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		apiType: "messages",
		patterns: ["claude-sonnet-4-6", "claude-4-6-sonnet", "claudesonnet46"]
	}),
	preset("anthropic", "claude-opus-4-6", "Claude Opus 4.6", {
		maxInputTokens: 200000,
		maxOutputTokens: 64000,
		contextWindow: 200000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		apiType: "messages",
		patterns: ["claude-opus-4-6", "claude-4-6-opus", "claudeopus46"]
	}),

	preset("google", "gemini-2.5-pro", "Gemini 2.5 Pro", {
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["gemini-2.5-pro", "gemini25pro"]
	}),
	preset("google", "gemini-2.5-flash", "Gemini 2.5 Flash", {
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["gemini-2.5-flash", "gemini25flash"]
	}),
	preset("google", "gemini-2.5-flash-lite", "Gemini 2.5 Flash-Lite", {
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["gemini-2.5-flash-lite", "gemini25flashlite"]
	}),
	preset("google", "gemini-2.0-flash", "Gemini 2.0 Flash", {
		maxInputTokens: 1048576,
		maxOutputTokens: 8192,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["gemini-2.0-flash", "gemini20flash"]
	}),

	preset("qwen", "qwen3", "Qwen3", {
		maxInputTokens: 131072,
		maxOutputTokens: 8192,
		contextWindow: 131072,
		toolCalling: true,
		vision: false,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["qwen3", "qwen-3"]
	}),
	preset("qwen", "qwen3-max", "Qwen3 Max", {
		maxInputTokens: 262144,
		maxOutputTokens: 32768,
		contextWindow: 262144,
		toolCalling: true,
		vision: false,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["qwen3-max", "qwen-3-max", "qwen3max"]
	}),
	preset("qwen", "qwen3-plus", "Qwen3 Plus", {
		maxInputTokens: 131072,
		maxOutputTokens: 16384,
		contextWindow: 131072,
		toolCalling: true,
		vision: false,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["qwen3-plus", "qwen-3-plus", "qwen3plus"]
	}),
	preset("qwen", "qwen3-coder", "Qwen3 Coder", {
		maxInputTokens: 262144,
		maxOutputTokens: 65536,
		contextWindow: 262144,
		toolCalling: true,
		vision: false,
		thinking: false,
		patterns: ["qwen3-coder", "qwen-3-coder", "qwen3coder"]
	}),
	preset("qwen", "qwen3-235b", "Qwen3 235B", {
		maxInputTokens: 131072,
		maxOutputTokens: 16384,
		contextWindow: 131072,
		toolCalling: true,
		vision: false,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["qwen3-235b", "qwen3-235b-a22b", "qwen3235b"]
	}),
	preset("qwen", "qwq-32b", "QwQ-32B", {
		maxInputTokens: 131072,
		maxOutputTokens: 16384,
		contextWindow: 131072,
		toolCalling: true,
		vision: false,
		thinking: true,
		patterns: ["qwq-32b", "qwq32b"]
	}),

	preset("deepseek", "deepseek-v3", "DeepSeek V3", {
		maxInputTokens: 128000,
		maxOutputTokens: 8192,
		contextWindow: 128000,
		toolCalling: true,
		vision: false,
		thinking: false,
		patterns: ["deepseek-v3", "deepseek-chat", "deepseekv3", "deepseekchat"]
	}),
	preset("deepseek", "deepseek-r1", "DeepSeek R1", {
		maxInputTokens: 128000,
		maxOutputTokens: 32768,
		contextWindow: 128000,
		toolCalling: true,
		vision: false,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["deepseek-r1", "deepseek-reasoner", "deepseekr1", "deepseekreasoner"]
	}),
	preset("deepseek", "deepseek-v3.1", "DeepSeek V3.1", {
		maxInputTokens: 128000,
		maxOutputTokens: 8192,
		contextWindow: 128000,
		toolCalling: true,
		vision: false,
		thinking: false,
		patterns: ["deepseek-v3.1", "deepseekv31"]
	}),
	preset("deepseek", "deepseek-v3.2", "DeepSeek V3.2", {
		maxInputTokens: 128000,
		maxOutputTokens: 8192,
		contextWindow: 128000,
		toolCalling: true,
		vision: false,
		thinking: false,
		patterns: ["deepseek-v3.2", "deepseekv32"]
	})
];

export const VENDOR_LABELS: Record<ModelVendor, string> = {
	openai: "OpenAI",
	anthropic: "Anthropic",
	google: "Google",
	qwen: "Qwen",
	deepseek: "DeepSeek"
};

export const VENDOR_ORDER: ModelVendor[] = ["openai", "anthropic", "google", "qwen", "deepseek"];

export function presetsToModelItems(): ModelItem[] {
	return MODEL_PRESETS.map((presetItem) => ({
		id: presetItem.canonicalId,
		name: presetItem.displayName,
		vendor: presetItem.vendor
	}));
}
