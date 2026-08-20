/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-08-20 18:02:30
 * @LastEditors: mulingyuer
 * @Description: 未匹配预设模型的兜底默认值
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\fallbackDefaults.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";

/**
 * 未匹配模型的默认配置。
 * 保守策略：thinking 关闭、vision 关闭，避免为非推理/非多模态模型误配能力标记。
 */
export const FALLBACK_MODEL_DEFAULTS = {
	maxInputTokens: 128000,
	maxOutputTokens: 8192,
	contextWindow: 128000,
	toolCalling: true,
	vision: false,
	thinking: false,
	supportsReasoningEffort: undefined
} as const satisfies Partial<ModelPreset>;
