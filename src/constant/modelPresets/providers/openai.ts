/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-09-20 00:00:00
 * @LastEditors: mulingyuer
 * @Description: OpenAI 模型预设（来源：developers.openai.com/api/docs/models）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\openai.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";
import {
	OPENAI_CODEX_REASONING,
	OPENAI_REASONING,
	OPENAI_REASONING_GPT5,
	OPENAI_REASONING_GPT51,
	OPENAI_REASONING_HIGH_ONLY,
	OPENAI_REASONING_NO_NONE,
	OPENAI_REASONING_PRO_52,
	OPENAI_REASONING_WITH_MAX,
	OPENAI_REASONING_WITH_NONE_MAX,
	preset
} from "../modelPresetFactory";

export const OPENAI_PRESETS: ModelPreset[] = [
	// 官方：gpt-5.6 是 gpt-5.6-sol 的别名路由；1,050,000 上下文（最大输入 922,000），128K 输出，effort 含 none/max，未限定仅 Responses API
	preset("openai", "gpt-5.6", "GPT-5.6", {
		maxInputTokens: 922000,
		maxOutputTokens: 128000,
		contextWindow: 1050000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_WITH_NONE_MAX,
		patterns: ["gpt-5.6", "gpt56"]
	}),
	preset("openai", "gpt-6-sol", "GPT-6 Sol", {
		// 官方：1,050,000 上下文，最大输入 922,000，档位含 none/max
		maxInputTokens: 922000,
		maxOutputTokens: 128000,
		contextWindow: 1050000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_WITH_NONE_MAX,
		patterns: ["gpt-6-sol", "gpt6sol", "gpt-6sol"]
	}),
	preset("openai", "gpt-6-astra", "GPT-6 Astra", {
		maxInputTokens: 922000,
		maxOutputTokens: 128000,
		contextWindow: 1050000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_NO_NONE,
		patterns: ["gpt-6-astra", "gpt6astra", "gpt-6astra", "gpt-6", "gpt6"]
	}),
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
	preset("openai", "gpt-5.4-pro", "GPT-5.4 Pro", {
		// 官方：仅 Responses API，1,050,000 上下文，档位 medium/high/xhigh
		maxInputTokens: 922000,
		maxOutputTokens: 128000,
		contextWindow: 1050000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_PRO_52,
		apiType: "responses",
		patterns: ["gpt-5.4-pro", "gpt54pro", "gpt-5.4pro"]
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
	preset("openai", "gpt-5.4-nano", "GPT-5.4 nano", {
		// 官方：400K 上下文，其中最大输入 272K
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING,
		patterns: ["gpt-5.4-nano", "gpt54nano", "gpt-5.4nano"]
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
	preset("openai", "gpt-6.2-astra", "GPT-6.2 Astra", {
		maxInputTokens: 922000,
		maxOutputTokens: 128000,
		contextWindow: 1050000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_NO_NONE,
		apiType: "responses",
		patterns: ["gpt-6.2-astra", "gpt62astra", "gpt-6.2astra"]
	}),
	preset("openai", "gpt-6.2-sol", "GPT-6.2 Sol", {
		maxInputTokens: 922000,
		maxOutputTokens: 128000,
		contextWindow: 1050000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_NO_NONE,
		apiType: "responses",
		patterns: ["gpt-6.2-sol", "gpt62sol", "gpt-6.2sol"]
	}),
	preset("openai", "gpt-6.1-sol", "GPT-6.1 Sol", {
		maxInputTokens: 922000,
		maxOutputTokens: 128000,
		contextWindow: 1050000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_NO_NONE,
		apiType: "responses",
		patterns: ["gpt-6.1-sol", "gpt61sol", "gpt-6.1sol"]
	}),
	preset("openai", "gpt-6.1-terra", "GPT-6.1 Terra", {
		maxInputTokens: 922000,
		maxOutputTokens: 128000,
		contextWindow: 1050000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_WITH_NONE_MAX,
		apiType: "responses",
		patterns: ["gpt-6.1-terra", "gpt61terra", "gpt-6.1terra"]
	}),
	preset("openai", "gpt-5.5-pro", "GPT-5.5 Pro", {
		maxInputTokens: 922000,
		maxOutputTokens: 128000,
		contextWindow: 1050000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_PRO_52,
		apiType: "responses",
		patterns: ["gpt-5.5-pro", "gpt55pro", "gpt-5.5pro"]
	}),
	preset("openai", "gpt-5.2-pro", "GPT-5.2 Pro", {
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_PRO_52,
		apiType: "responses",
		patterns: ["gpt-5.2-pro", "gpt52pro", "gpt-5.2pro"]
	}),
	preset("openai", "gpt-5-pro", "GPT-5 Pro", {
		maxInputTokens: 128000,
		maxOutputTokens: 272000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_HIGH_ONLY,
		apiType: "responses",
		patterns: ["gpt-5-pro", "gpt5pro", "gpt-5pro"]
	}),
	preset("openai", "gpt-5-mini", "GPT-5 mini", {
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_GPT5,
		patterns: ["gpt-5-mini", "gpt5mini", "gpt-5mini"]
	}),
	preset("openai", "gpt-5-nano", "GPT-5 nano", {
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_GPT5,
		patterns: ["gpt-5-nano", "gpt5nano", "gpt-5nano"]
	}),
	preset("openai", "gpt-5.2", "GPT-5.2", {
		// 官方：400K 上下文，其中最大输入 272K
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING,
		patterns: ["gpt-5.2", "gpt52"]
	}),
	preset("openai", "gpt-5.1", "GPT-5.1", {
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_GPT51,
		patterns: ["gpt-5.1", "gpt51"]
	}),
	preset("openai", "gpt-5", "GPT-5", {
		maxInputTokens: 272000,
		maxOutputTokens: 128000,
		contextWindow: 400000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: OPENAI_REASONING_GPT5,
		patterns: ["gpt-5", "gpt5"]
	}),
	preset("openai", "gpt-4.1-mini", "GPT-4.1 mini", {
		// 官方：1,047,576 总上下文，32,768 输出
		maxInputTokens: 1014808,
		maxOutputTokens: 32768,
		contextWindow: 1047576,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["gpt-4.1-mini", "gpt41mini", "gpt-4.1mini"]
	}),
	preset("openai", "gpt-4.1", "GPT-4.1", {
		maxInputTokens: 1014808,
		maxOutputTokens: 32768,
		contextWindow: 1047576,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["gpt-4.1", "gpt41"]
	}),
	preset("openai", "gpt-4o-mini", "GPT-4o mini", {
		// 官方：128,000 上下文，16,384 输出，无推理步骤
		maxInputTokens: 128000,
		maxOutputTokens: 16384,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["gpt-4o-mini", "gpt4omini", "gpt-4omini"]
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
