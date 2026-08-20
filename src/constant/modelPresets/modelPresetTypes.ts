/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-08-20 18:02:53
 * @LastEditors: mulingyuer
 * @Description: 模型预设专用的细化类型（厂商、推理等级），仅用于预设数据编写阶段的类型约束
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\modelPresetTypes.ts
 * 怎么可能会有bug！！！
 */

/** OpenAI 推理等级（5.x 系列，官方 reasoning_effort 枚举） */
export type OpenAIReasoningEffort = "none" | "low" | "medium" | "high" | "xhigh" | "max";

/** Anthropic 推理等级（按模型分 5 级或 4 级） */
export type AnthropicReasoningEffort = "low" | "medium" | "high" | "xhigh" | "max";

/** Google 推理等级（thinking_level 参数） */
export type GoogleReasoningEffort = "minimal" | "low" | "medium" | "high";

/** 标准推理等级（其余厂商通用） */
export type StandardReasoningEffort = "low" | "medium" | "high";

/** 智谱 GLM 推理等级（5.3 仅 low/high/max） */
export type ZhipuReasoningEffort = "low" | "high" | "max";

/** 月之暗面 Kimi 推理等级（k3 仅 low/high/max） */
export type MoonshotReasoningEffort = "low" | "high" | "max";
