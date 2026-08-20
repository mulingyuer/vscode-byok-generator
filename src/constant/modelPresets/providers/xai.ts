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

// TODO: grok-4.x 各模型 maxOutputTokens / thinking 档位官方未逐项公布，当前为保守值，待官方文档补充后更新
export const XAI_PRESETS: ModelPreset[] = [
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
