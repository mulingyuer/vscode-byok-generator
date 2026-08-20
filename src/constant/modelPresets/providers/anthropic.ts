/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-08-20 18:03:02
 * @LastEditors: mulingyuer
 * @Description: Anthropic 模型预设（来源：platform.claude.com/docs/en/about-claude/models/overview）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\anthropic.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";
import { ANTHROPIC_REASONING_4, ANTHROPIC_REASONING_5, preset } from "../modelPresetFactory";

export const ANTHROPIC_PRESETS: ModelPreset[] = [
	preset("anthropic", "claude-sonnet-5", "Claude Sonnet 5", {
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: ANTHROPIC_REASONING_5,
		patterns: ["claude-sonnet-5", "claudesonnet5", "claude-sonnet5"]
	}),
	preset("anthropic", "claude-opus-5", "Claude Opus 5", {
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: ANTHROPIC_REASONING_5,
		patterns: ["claude-opus-5", "claudeopus5", "claude-opus5"]
	}),
	preset("anthropic", "claude-fable-5", "Claude Fable 5", {
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: ANTHROPIC_REASONING_5,
		patterns: ["claude-fable-5", "claudefable5", "claude-fable5"]
	}),
	preset("anthropic", "claude-opus-4-8", "Claude Opus 4.8", {
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: ANTHROPIC_REASONING_5,
		patterns: ["claude-opus-4-8", "claudeopus48", "claude-opus-48"]
	}),
	preset("anthropic", "claude-opus-4-7", "Claude Opus 4.7", {
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: ANTHROPIC_REASONING_5,
		patterns: ["claude-opus-4-7", "claudeopus47", "claude-opus-47"]
	}),
	preset("anthropic", "claude-opus-4-6", "Claude Opus 4.6", {
		// 官方：effort 4 级（low/medium/high/max，无 xhigh）
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: ANTHROPIC_REASONING_4,
		patterns: ["claude-opus-4-6", "claudeopus46", "claude-opus-46"]
	}),
	preset("anthropic", "claude-sonnet-4-6", "Claude Sonnet 4.6", {
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: ANTHROPIC_REASONING_4,
		patterns: ["claude-sonnet-4-6", "claudesonnet46", "claude-sonnet-46"]
	}),
	preset("anthropic", "claude-haiku-4-5", "Claude Haiku 4.5", {
		// 官方：extended thinking，无 effort 参数
		maxInputTokens: 200000,
		maxOutputTokens: 64000,
		contextWindow: 200000,
		toolCalling: true,
		vision: true,
		thinking: true,
		patterns: ["claude-haiku-4-5", "claudehaiku45", "claude-haiku-45"]
	})
];
