/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-08-20 18:03:33
 * @LastEditors: mulingyuer
 * @Description: OpenAI 模型预设（来源：developers.openai.com/api/docs/models）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\openai.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";
import {
	OPENAI_CODEX_REASONING,
	OPENAI_REASONING,
	OPENAI_REASONING_WITH_MAX,
	preset
} from "../modelPresetFactory";

export const OPENAI_PRESETS: ModelPreset[] = [
	preset("openai", "gpt-5.6-sol", "GPT-5.6 Sol", {
		maxInputTokens: 1050000,
		maxOutputTokens: 128000,
		contextWindow: 1050000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_WITH_MAX,
		patterns: ["gpt-5.6-sol", "gpt56sol", "gpt-5.6sol"]
	}),
	preset("openai", "gpt-5.6-terra", "GPT-5.6 Terra", {
		maxInputTokens: 1050000,
		maxOutputTokens: 128000,
		contextWindow: 1050000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_WITH_MAX,
		patterns: ["gpt-5.6-terra", "gpt56terra", "gpt-5.6terra"]
	}),
	preset("openai", "gpt-5.6-luna", "GPT-5.6 Luna", {
		maxInputTokens: 1050000,
		maxOutputTokens: 128000,
		contextWindow: 1050000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_WITH_MAX,
		patterns: ["gpt-5.6-luna", "gpt56luna", "gpt-5.6luna"]
	}),
	preset("openai", "gpt-5.5", "GPT-5.5", {
		maxInputTokens: 1050000,
		maxOutputTokens: 128000,
		contextWindow: 1050000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING,
		patterns: ["gpt-5.5", "gpt55"]
	}),
	preset("openai", "gpt-5.4", "GPT-5.4", {
		maxInputTokens: 1050000,
		maxOutputTokens: 128000,
		contextWindow: 1050000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING,
		patterns: ["gpt-5.4", "gpt54"]
	}),
	preset("openai", "gpt-5.4-mini", "GPT-5.4 mini", {
		// 官方：400K 上下文，其中最大输入 272K
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING,
		patterns: ["gpt-5.4-mini", "gpt54mini"]
	}),
	preset("openai", "gpt-5.3-codex", "GPT-5.3 Codex", {
		// 官方：仅 Responses API，无 chat-completions；档位无 none
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_CODEX_REASONING,
		apiType: "responses",
		patterns: ["gpt-5.3-codex", "gpt53codex", "gpt-5.3codex"]
	}),
	preset("openai", "gpt-5.3", "GPT-5.3", {
		maxInputTokens: 400000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING,
		patterns: ["gpt-5.3", "gpt53"]
	}),
	preset("openai", "gpt-5.2", "GPT-5.2", {
		maxInputTokens: 400000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING,
		patterns: ["gpt-5.2", "gpt52"]
	}),
	preset("openai", "gpt-4o", "GPT-4o", {
		maxInputTokens: 128000,
		maxOutputTokens: 16384,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["gpt-4o", "chatgpt-4o", "gpt4o"]
	})
];
