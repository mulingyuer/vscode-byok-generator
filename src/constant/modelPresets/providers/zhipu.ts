/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-08-20 18:03:59
 * @LastEditors: mulingyuer
 * @Description: 智谱 GLM 模型预设（来源：docs.bigmodel.cn/cn/guide/models/text/glm-x.y）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\zhipu.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";
import { STANDARD_REASONING, ZHIPU_GLM53_REASONING, preset } from "../modelPresetFactory";

// 官方：glm-5.x 三款输入模态均为「文本」，vision 全部为 false
export const ZHIPU_PRESETS: ModelPreset[] = [
	preset("zhipu", "glm-5.3", "GLM-5.3", {
		// 官方：thinking 常开不可关，effort 仅 low/high/max（默认 max）
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: false,
		thinking: true,
		supportsReasoningEffort: ZHIPU_GLM53_REASONING,
		patterns: ["glm-5.3", "glm53", "glm-53"]
	}),
	preset("zhipu", "glm-5.2", "GLM-5.2", {
		// 官方：thinking 可开关（thinking:{"type":"enabled"}），reasoning_effort 支持 max
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: false,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["glm-5.2", "glm52", "glm-52"]
	}),
	preset("zhipu", "glm-5.1", "GLM-5.1", {
		// 官方：200K 上下文，thinking 可开关
		maxInputTokens: 200000,
		maxOutputTokens: 128000,
		contextWindow: 200000,
		toolCalling: true,
		vision: false,
		thinking: true,
		supportsReasoningEffort: STANDARD_REASONING,
		patterns: ["glm-5.1", "glm51", "glm-51"]
	})
];
