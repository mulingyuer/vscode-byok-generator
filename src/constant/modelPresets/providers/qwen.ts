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

// TODO: Qwen 各模型 maxOutputTokens 官方未逐项公布，当前为保守值 8192，待官方文档补充后更新
export const QWEN_PRESETS: ModelPreset[] = [
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
