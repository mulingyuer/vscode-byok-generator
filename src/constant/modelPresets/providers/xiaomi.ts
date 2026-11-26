/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-08-20 18:03:53
 * @LastEditors: mulingyuer
 * @Description: 小米 MiMo 模型预设（来源：mimo.mi.com/docs）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\xiaomi.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";
import { preset } from "../modelPresetFactory";

// TODO: MiMo 推理档位名称官方未公布，当前不写 supportsReasoningEffort，待官方文档补充后更新
export const XIAOMI_PRESETS: ModelPreset[] = [
	// 官方（mimo.mi.com/docs/quick-start/model）：1M 上下文，最大输出 128K（thinking 内容与最终回答共享）；
	// 全模态理解（文本/图片/音频/视频）、深度思考默认开启且可关闭、函数调用、结构化输出、联网搜索
	// 官方 reasoning.effort 仅区分 none（关闭思考）与其余取值（均开启且强度无差异），故不设置 supportsReasoningEffort
	preset("xiaomi", "mimo-v2.6-pro", "MiMo V2.6 Pro", {
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		patterns: ["mimo-v2.6-pro", "mimov26pro", "mimo-v2-6-pro"]
	}),
	preset("xiaomi", "mimo-v2.6-flash", "MiMo V2.6 Flash", {
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		patterns: ["mimo-v2.6-flash", "mimov26flash", "mimo-v2-6-flash"]
	}),
	preset("xiaomi", "mimo-v2.5-pro", "MiMo V2.5 Pro", {
		// 官方：1M 上下文，128K 输出，深度思考，FC/结构化输出/联网
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: false,
		thinking: true,
		patterns: ["mimo-v2.5-pro", "mimov25pro", "mimo-v2-5-pro"]
	}),
	preset("xiaomi", "mimo-v2.5", "MiMo V2.5", {
		// 官方：1M 上下文，128K 输出，全模态理解（图/视频/音频/文本），深度思考
		maxInputTokens: 1000000,
		maxOutputTokens: 128000,
		contextWindow: 1000000,
		toolCalling: true,
		vision: true,
		thinking: true,
		patterns: ["mimo-v2.5", "mimov25", "mimo-v2-5"]
	})
];
