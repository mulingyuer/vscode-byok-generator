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
import {
	GOOGLE_REASONING,
	GOOGLE_REASONING_WITH_MINIMAL,
	GOOGLE_REASONING_WITH_XHIGH,
	preset
} from "../modelPresetFactory";

export const GOOGLE_PRESETS: ModelPreset[] = [
	// 官方：1M 统一上下文（输入/思考/输出共享），单次输出上限 65,536；thinking_level 仅 low/medium/high，默认 medium；原生多模态 + 内置工具
	preset("google", "gemini-4-neon", "Gemini 4 Neon", {
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: GOOGLE_REASONING_WITH_XHIGH,
		patterns: ["gemini-4-neon", "gemini4neon"]
	}),
	// 官方：1M 统一上下文，thinking_level 仅 low/medium/high（默认 high），另支持 xhigh
	preset("google", "gemini-4-hydrogen", "Gemini 4 Hydrogen", {
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: GOOGLE_REASONING_WITH_XHIGH,
		patterns: ["gemini-4-hydrogen", "gemini4hydrogen"]
	}),
	// 官方：1M 统一上下文，thinking_level 仅 low/medium/high，默认 medium，无 xhigh
	preset("google", "gemini-4-carbon", "Gemini 4 Carbon", {
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: GOOGLE_REASONING,
		patterns: ["gemini-4-carbon", "gemini4carbon"]
	}),
	// 官方：1M 统一上下文，thinking_level 仅 low/medium/high，默认 medium，无 xhigh
	preset("google", "gemini-4-argon", "Gemini 4 Argon", {
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: GOOGLE_REASONING,
		patterns: ["gemini-4-argon", "gemini4argon"]
	}),
	// 官方：1M 上下文窗口，最大输出 65,536；官方明确 minimal 不可用，thinking_level 仅 low/medium/high，默认 medium
	preset("google", "gemini-3.8-flash", "Gemini 3.8 Flash", {
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: GOOGLE_REASONING,
		patterns: ["gemini-3.8-flash", "gemini38flash", "gemini-3.8flash"]
	}),
	// 官方（已废弃，请求自动路由到 gemini-3.8-flash）：1M 上下文，最大输出 65,536；
	// thinking_level 仅 low/medium/high（明确禁 minimal），默认 medium
	preset("google", "gemini-3.7-flash", "Gemini 3.7 Flash", {
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: GOOGLE_REASONING,
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
	preset("google", "gemini-3-flash-preview", "Gemini 3 Flash Preview", {
		// 官方：1M 输入 / 65K 输出，支持思考（thinking 默认开启），与 3.x Flash 系列一致支持 minimal 档
		maxInputTokens: 1048576,
		maxOutputTokens: 65536,
		contextWindow: 1048576,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: GOOGLE_REASONING_WITH_MINIMAL,
		patterns: ["gemini-3-flash-preview", "gemini3flashpreview", "gemini-3-flash"]
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
