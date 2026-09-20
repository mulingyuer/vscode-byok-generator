/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-09-20 00:00:00
 * @LastEditors: mulingyuer
 * @Description: 腾讯混元模型预设（来源：cloud.tencent.com/document/product/1729、hunyuan.tencent.com/research/hy4-preview、OpenRouter API）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\tencent.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";
import { TENCENT_HY4_REASONING, preset } from "../modelPresetFactory";

// TODO: 腾讯混元平台正迁移至 TokenHub，hy3 官方上下文/输出上限未完整公布，
// 当前 maxInputTokens 参考 hunyuan-standard-256K 升级代取保守值，待 TokenHub 文档完善后更新
export const TENCENT_PRESETS: ModelPreset[] = [
	preset("tencent", "hy3", "Hunyuan 3.0", {
		// HY3-Preview 为同一模型的另一种官方写法，归入本条目 patterns
		maxInputTokens: 256000,
		maxOutputTokens: 8192,
		contextWindow: 256000,
		toolCalling: true,
		vision: false,
		thinking: false,
		patterns: [
			"hy3",
			"hy3-preview",
			"hy3preview",
			"hunyuan-3.0",
			"hunyuan3",
			"hunyuan-3",
			"hunyuan-3.0-preview"
		]
	}),
	preset("tencent", "hy4-preview", "Hunyuan 4.0 Preview", {
		// 官方（OpenRouter / TokenHub）：1M 上下文，最大输出 64K，纯文本，支持工具调用，
		// thinking 默认开启，effort 仅 low/high（none 为关闭思考），默认 high
		maxInputTokens: 984576,
		maxOutputTokens: 64000,
		contextWindow: 1048576,
		toolCalling: true,
		vision: false,
		thinking: true,
		supportsReasoningEffort: TENCENT_HY4_REASONING,
		patterns: [
			"hy4-preview",
			"hy4preview",
			"hy4",
			"hunyuan-4",
			"hunyuan4",
			"hunyuan-4.0",
			"hunyuan-4.0-preview"
		]
	})
];
