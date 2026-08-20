/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-08-20 18:03:27
 * @LastEditors: mulingyuer
 * @Description: 月之暗面 Kimi 模型预设（来源：platform.kimi.ai/docs）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\moonshot.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";
import { MOONSHOT_K3_REASONING, STANDARD_REASONING, preset } from "../modelPresetFactory";

// TODO: kimi-k2.x 各模型 maxOutputTokens 官方未逐项公布，当前为保守值 8192，待官方文档补充后更新
export const MOONSHOT_PRESETS: ModelPreset[] = [
	preset("moonshot", "kimi-k3", "Kimi K3", {
		// 官方：1M 上下文，max_completion_tokens 默认 131072，thinking 常开(Preserved Thinking)，effort low/high/max(默认 max)
		maxInputTokens: 1000000,
		maxOutputTokens: 131072,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: MOONSHOT_K3_REASONING,
		patterns: ["kimi-k3", "kimik3", "kimi-k-3"]
	}),
	preset("moonshot", "kimi-k2.7-code", "Kimi K2.7 Code", {
		// 官方：thinking 常开不可关，keep="all" 固定
		maxInputTokens: 256000,
		maxOutputTokens: 8192,
		contextWindow: 256000,
		toolCalling: true,
		vision: true,
		thinking: true,
		patterns: ["kimi-k2.7-code", "kimik27code", "kimi-k2-7-code", "kimi-k2.7-code-highspeed"]
	}),
	preset("moonshot", "kimi-k2.6", "Kimi K2.6", {
		maxInputTokens: 256000,
		maxOutputTokens: 8192,
		contextWindow: 256000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["kimi-k2.6", "kimik26", "kimi-k2-6"]
	}),
	preset("moonshot", "kimi-k2.5", "Kimi K2.5", {
		maxInputTokens: 256000,
		maxOutputTokens: 8192,
		contextWindow: 256000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["kimi-k2.5", "kimik25", "kimi-k2-5"]
	})
];
