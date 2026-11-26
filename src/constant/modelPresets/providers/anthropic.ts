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
	// 官方：1M 上下文，128K 输出；adaptive thinking 常开不可关，effort 五档（low/medium/high/xhigh/max），默认 high
	preset("anthropic", "claude-fable-5-2", "Claude Fable 5.2", {
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: ANTHROPIC_REASONING_5,
		patterns: ["claude-fable-5-2", "claudefable52", "claude-fable52"]
	}),
	// 官方（legacy）：1M 上下文，128K 输出；adaptive thinking 常开不可关，官方 effort 文档明确「supports all five effort levels」，默认 high
	preset("anthropic", "claude-fable-5-1", "Claude Fable 5.1", {
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: ANTHROPIC_REASONING_5,
		patterns: ["claude-fable-5-1", "claudefable51", "claude-fable51"]
	}),
	// 官方：1M 上下文，128K 输出；adaptive thinking 默认开启，effort 五档，默认 medium
	preset("anthropic", "claude-opus-5-5", "Claude Opus 5.5", {
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: ANTHROPIC_REASONING_5,
		patterns: ["claude-opus-5-5", "claudeopus55", "claude-opus55"]
	}),
	// 官方：1M 上下文，128K 输出；adaptive thinking 默认开启，effort 五档，默认 high
	preset("anthropic", "claude-sonnet-5-5", "Claude Sonnet 5.5", {
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: ANTHROPIC_REASONING_5,
		patterns: ["claude-sonnet-5-5", "claudesonnet55", "claude-sonnet55"]
	}),
	// 官方：1M 上下文，128K 输出；adaptive thinking 可由用户在高及以下的档位关闭，effort 五档，默认 medium
	preset("anthropic", "claude-haiku-5-5", "Claude Haiku 5.5", {
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: ANTHROPIC_REASONING_5,
		patterns: ["claude-haiku-5-5", "claudehaiku55", "claude-haiku55"]
	}),
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
