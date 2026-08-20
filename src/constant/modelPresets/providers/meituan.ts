/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-08-20 18:03:19
 * @LastEditors: mulingyuer
 * @Description: 美团 LongCat 模型预设（来源：longcat.chat/platform/docs）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\meituan.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";
import { preset } from "../modelPresetFactory";

// TODO: LongCat-2.0 推理档位与视觉能力官方未公布，thinking/vision 保守置 false，待官方文档补充后更新
export const MEITUAN_PRESETS: ModelPreset[] = [
	preset("meituan", "longcat-2.0", "LongCat 2.0", {
		// 官方：1M 上下文，128K 最大输出，OpenAI + Anthropic 双协议
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: false,
		thinking: false,
		patterns: ["longcat-2.0", "longcat20", "longcat-2", "longcat2", "longcat-2.0-preview"]
	})
];
