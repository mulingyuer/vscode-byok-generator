/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-08-20 18:03:23
 * @LastEditors: mulingyuer
 * @Description: MiniMax 模型预设（来源：platform.minimax.io/docs）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\minimax.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";
import { STANDARD_REASONING, preset } from "../modelPresetFactory";

// TODO: MiniMax 各模型 maxOutputTokens 官方未逐项公布（M2 系列已知 128K 含 CoT），当前为保守值，待官方文档补充后更新
export const MINIMAX_PRESETS: ModelPreset[] = [
	preset("minimax", "minimax-m3", "MiniMax M3", {
		// 官方：1M 上下文，thinking 默认关，thinking:{"type":"adaptive"} 开启；多模态（图≤10MB/视频≤50MB）
		maxInputTokens: 1000000,
		maxOutputTokens: 8192,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["minimax-m3", "minimaxm3", "minimax-m-3", "abab-m3"]
	}),
	preset("minimax", "minimax-m2.7", "MiniMax M2.7", {
		// 官方：204800 上下文，thinking 常开不可关，纯文本
		maxInputTokens: 204800,
		maxOutputTokens: 8192,
		contextWindow: 204800,
		toolCalling: true,
		vision: false,
		thinking: true,
		patterns: ["minimax-m2.7", "minimaxm27", "minimax-m2-7", "minimax-m2.7-highspeed"]
	}),
	preset("minimax", "minimax-m2.5", "MiniMax M2.5", {
		maxInputTokens: 204800,
		maxOutputTokens: 8192,
		contextWindow: 204800,
		toolCalling: true,
		vision: false,
		thinking: true,
		patterns: ["minimax-m2.5", "minimaxm25", "minimax-m2-5", "minimax-m2.5-highspeed"]
	})
];
