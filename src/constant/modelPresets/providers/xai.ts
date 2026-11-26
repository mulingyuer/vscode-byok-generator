/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-08-20 18:03:49
 * @LastEditors: mulingyuer
 * @Description: xAI Grok 模型预设（来源：docs.x.ai）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\xai.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";
import { preset } from "../modelPresetFactory";

// 说明：grok-4.6 / 4.5 的输出上限与 thinking 档位官方仍未逐项公布，保持既有保守值；grok-4.7 已按官方补齐
export const XAI_PRESETS: ModelPreset[] = [
	// 官方（docs.x.ai/developers/grok-4-7）：500K 共享上下文（输入与输出共用），最大输入 500K；
	// 可见输出 max_output_tokens / max_completion_tokens 默认上限 128,000（推理 token 不计入该可见上限，另受整数安全上限约束）；
	// thinking 默认常开，effort low/medium/high/xhigh，默认 high；支持 Chat Completions / Responses / Messages
	preset("xai", "grok-4.7", "Grok 4.7", {
		maxInputTokens: 500000,
		maxOutputTokens: 128000,
		contextWindow: 500000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: ["low", "medium", "high", "xhigh"],
		patterns: ["grok-4.7", "grok47", "grok-4-7"]
	}),
	preset("xai", "grok-4.6", "Grok 4.6", {
		maxInputTokens: 500000,
		maxOutputTokens: 8192,
		contextWindow: 500000,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["grok-4.6", "grok46", "grok-4-6"]
	}),
	preset("xai", "grok-4.5", "Grok 4.5", {
		maxInputTokens: 500000,
		maxOutputTokens: 8192,
		contextWindow: 500000,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["grok-4.5", "grok45", "grok-4-5"]
	}),
	preset("xai", "grok-4.3", "Grok 4.3", {
		maxInputTokens: 1000000,
		maxOutputTokens: 8192,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["grok-4.3", "grok43", "grok-4-3"]
	})
];
