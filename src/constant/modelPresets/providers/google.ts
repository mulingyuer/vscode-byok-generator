/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-08-20 18:03:12
 * @LastEditors: mulingyuer
 * @Description: Google Gemini 模型预设（来源：ai.google.dev/gemini-api/docs/models + /docs/thinking）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\google.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";
import { GOOGLE_REASONING, GOOGLE_REASONING_WITH_MINIMAL, preset } from "../modelPresetFactory";

export const GOOGLE_PRESETS: ModelPreset[] = [
	preset("google", "gemini-3.7-flash", "Gemini 3.7 Flash", {
		// TODO: 官方文档暂未查到 gemini-3.7-flash，参数沿用 3.x Flash 保守值，待官方资料补充后复核
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: false,
		patterns: ["gemini-3.7-flash", "gemini37flash", "gemini-3.7flash"]
	}),
	preset("google", "gemini-3.6-flash", "Gemini 3.6 Flash", {
		// 官方 thinking 表：默认中，支持 minimal/low/medium/high
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: GOOGLE_REASONING_WITH_MINIMAL,
		patterns: ["gemini-3.6-flash", "gemini36flash", "gemini-3.6flash"]
	}),
	preset("google", "gemini-3.5-flash", "Gemini 3.5 Flash", {
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: GOOGLE_REASONING_WITH_MINIMAL,
		patterns: ["gemini-3.5-flash", "gemini35flash", "gemini-3.5flash"]
	}),
	preset("google", "gemini-3.1-pro-preview", "Gemini 3.1 Pro Preview", {
		// 官方 thinking 表：默认高，仅 low/medium/high
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: GOOGLE_REASONING,
		patterns: ["gemini-3.1-pro-preview", "gemini31propreview", "gemini-3.1-pro"]
	}),
	preset("google", "gemini-3.1-flash", "Gemini 3.1 Flash", {
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: GOOGLE_REASONING_WITH_MINIMAL,
		patterns: ["gemini-3.1-flash", "gemini31flash", "gemini-3.1-flash-lite", "gemini31flashlite"]
	}),
	preset("google", "gemini-2.5-flash", "Gemini 2.5 Flash", {
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: GOOGLE_REASONING,
		patterns: ["gemini-2.5-flash", "gemini25flash"]
	}),
	preset("google", "gemini-2.5-pro", "Gemini 2.5 Pro", {
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: GOOGLE_REASONING,
		patterns: ["gemini-2.5-pro", "gemini25pro"]
	})
];
