/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-08-20 18:03:37
 * @LastEditors: mulingyuer
 * @Description: 阿里 Qwen 模型预设（来源：阿里云百炼 help.aliyun.com 模型列表）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\qwen.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";
import { STANDARD_REASONING, preset } from "../modelPresetFactory";

// 说明：qwen4 / qwen3.8 系列官方已给出逐项长度上限（见各条目注释）；老款各型仍沿用保守值 8192，待官方补充
export const QWEN_PRESETS: ModelPreset[] = [
	// 官方（alibabacloud model-studio qwen4-max）：上下文 1M；最大输入 983,616（思考模式）/ 991,808（非思考模式）；
	// 最大输出思考模式 262,144、非思考模式 131,072（max_tokens 限「思考＋回答」总量）；原生文本/图片/视频输入
	preset("qwen", "qwen4-max", "Qwen4 Max", {
		maxInputTokens: 983616,
		maxOutputTokens: 262144,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		// 官方 reasoning_effort 有效档位 low/high/xhigh（minimal→low、medium→high、max→xhigh），默认 high
		supportsReasoningEffort: ["low", "high", "xhigh"],
		patterns: ["qwen4-max", "qwen4max"]
	}),
	// 官方：qwen4-max 的预览版标识，与正式版同能力（同代 Qwen4-Max 参数体系），输入模态含文本/图片/视频
	preset("qwen", "qwen4-max-preview", "Qwen4 Max Preview", {
		maxInputTokens: 983616,
		maxOutputTokens: 262144,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: ["low", "high", "xhigh"],
		patterns: ["qwen4-max-preview", "qwen4maxpreview", "qwen4-maxpreview"]
	}),
	// 官方（alibabacloud model-studio qwen3-8-max）：上下文 1M；最大输入 983,616（思考）/ 991,808（非思考）；
	// 最大输出 131,072，最大思维链 262,144；文本/图片/视频输入
	preset("qwen", "qwen3.8-max-preview", "Qwen3.8 Max Preview", {
		maxInputTokens: 983616,
		maxOutputTokens: 131072,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		patterns: ["qwen3.8-max-preview", "qwen38maxpreview", "qwen3.8-maxpreview"]
	}),
	preset("qwen", "qwen3.8-flash", "Qwen3.8 Flash", {
		maxInputTokens: 983616,
		maxOutputTokens: 131072,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		patterns: ["qwen3.8-flash", "qwen38flash", "qwen-3.8-flash"]
	}),
	preset("qwen", "qwen3.8-max", "Qwen3.8 Max", {
		maxInputTokens: 1000000,
		maxOutputTokens: 8192,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["qwen3.8-max", "qwen38max", "qwen-3.8-max"]
	}),
	preset("qwen", "qwen3.7-max", "Qwen3.7 Max", {
		maxInputTokens: 1000000,
		maxOutputTokens: 8192,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["qwen3.7-max", "qwen37max", "qwen-3.7-max"]
	}),
	preset("qwen", "qwen3.7-plus", "Qwen3.7 Plus", {
		maxInputTokens: 1000000,
		maxOutputTokens: 8192,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["qwen3.7-plus", "qwen37plus", "qwen-3.7-plus"]
	}),
	preset("qwen", "qwen3.6-flash", "Qwen3.6 Flash", {
		maxInputTokens: 1000000,
		maxOutputTokens: 8192,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["qwen3.6-flash", "qwen36flash", "qwen-3.6-flash"]
	}),
	preset("qwen", "qwen3.6-plus", "Qwen3.6 Plus", {
		maxInputTokens: 1000000,
		maxOutputTokens: 8192,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["qwen3.6-plus", "qwen36plus", "qwen-3.6-plus"]
	}),
	preset("qwen", "qwen3.5-flash", "Qwen3.5 Flash", {
		maxInputTokens: 1000000,
		maxOutputTokens: 8192,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["qwen3.5-flash", "qwen35flash", "qwen-3.5-flash"]
	}),
	preset("qwen", "qwen3.5-plus", "Qwen3.5 Plus", {
		maxInputTokens: 1000000,
		maxOutputTokens: 8192,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["qwen3.5-plus", "qwen35plus", "qwen-3.5-plus"]
	})
];
