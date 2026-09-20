/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-09-20 00:00:00
 * @LastEditors: mulingyuer
 * @Description: DeepSeek 模型预设（来源：api-docs.deepseek.com）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\deepseek.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";
import { STANDARD_REASONING, preset } from "../modelPresetFactory";

export const DEEPSEEK_PRESETS: ModelPreset[] = [
	preset("deepseek", "deepseek-v4.1-flash", "DeepSeek V4.1 Flash", {
		// 官方：1M 上下文，384K 最大输出，thinking 默认开可关，支持视觉
		maxInputTokens: 1000000,
		maxOutputTokens: 384000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: [
			"deepseek-v4.1-flash",
			"deepseek-v4-1-flash",
			"deepseekv41flash",
			"deepseek-v4.1flash",
			"deepseek-flash",
			"deepseekflash"
		]
	}),
	preset("deepseek", "deepseek-v4-flash", "DeepSeek V4 Flash", {
		// 官方：1M 上下文，384K 最大输出，thinking 默认开可关，纯文本
		maxInputTokens: 1000000,
		maxOutputTokens: 384000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: false,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["deepseek-v4-flash", "deepseekv4flash", "deepseek-v4flash"]
	}),
	preset("deepseek", "deepseek-v4-pro", "DeepSeek V4 Pro", {
		maxInputTokens: 1000000,
		maxOutputTokens: 384000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: false,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["deepseek-v4-pro", "deepseekv4pro", "deepseek-v4pro"]
	})
];
