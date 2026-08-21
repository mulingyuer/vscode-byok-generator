/*
 * @Author: mulingyuer
 * @Date: 2026-08-21 10:10:08
 * @LastEditTime: 2026-08-21 10:10:08
 * @LastEditors: mulingyuer
 * @Description:
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\doubao.ts
 * 怎么可能会有bug！！！
 */
/*
 * @Author: mulingyuer
 * @Date: 2026-08-21 10:00:00
 * @LastEditTime: 2026-08-21 10:00:00
 * @LastEditors: mulingyuer
 * @Description: 豆包（火山方舟）模型预设（来源：docs.volcengine.com/docs/82379/1330310 模型列表）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\providers\doubao.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset } from "@/types/wizard";
import { preset } from "../modelPresetFactory";

// TODO: 火山方舟官方模型列表仅标注「深度思考」能力（thinking 可开关），未公布 reasoning_effort 档位参数，
// 故各条目暂不填写 supportsReasoningEffort，待官方文档补充后更新
export const DOUBAO_PRESETS: ModelPreset[] = [
	preset("doubao", "doubao-seed-2-0-pro-260215", "Doubao Seed 2.0 Pro", {
		// 官方：256K 上下文，最大输入 224K，最大回答 128K，支持深度思考/多模态理解/工具调用
		maxInputTokens: 224000,
		maxOutputTokens: 128000,
		contextWindow: 256000,
		toolCalling: true,
		vision: true,
		thinking: true,
		patterns: [
			"doubao-seed-2-0-pro-260215",
			"doubaoseed20pro260215",
			"doubao-seed-2.0-pro-260215",
			"doubao-seed-2-0-pro"
		]
	}),
	preset("doubao", "doubao-seed-2-0-lite-260215", "Doubao Seed 2.0 Lite", {
		// 官方：256K 上下文，最大输入 224K，最大回答 128K，支持深度思考/多模态理解/工具调用
		maxInputTokens: 224000,
		maxOutputTokens: 128000,
		contextWindow: 256000,
		toolCalling: true,
		vision: true,
		thinking: true,
		patterns: [
			"doubao-seed-2-0-lite-260215",
			"doubaoseed20lite260215",
			"doubao-seed-2.0-lite-260215",
			"doubao-seed-2-0-lite"
		]
	}),
	preset("doubao", "doubao-seed-1-8-251228", "Doubao Seed 1.8", {
		// 官方：256K 上下文，最大输入 224K，最大回答 32K，支持深度思考/多模态理解/工具调用
		maxInputTokens: 224000,
		maxOutputTokens: 32000,
		contextWindow: 256000,
		toolCalling: true,
		vision: true,
		thinking: true,
		patterns: [
			"doubao-seed-1-8-251228",
			"doubaoseed18251228",
			"doubao-seed-1.8-251228",
			"doubao-seed-1-8"
		]
	}),
	preset("doubao", "doubao-seed-1-6-251015", "Doubao Seed 1.6 (251015)", {
		// 官方：256K 上下文，最大输入 224K，最大回答 32K，支持深度思考/多模态理解/工具调用
		maxInputTokens: 224000,
		maxOutputTokens: 32000,
		contextWindow: 256000,
		toolCalling: true,
		vision: true,
		thinking: true,
		patterns: ["doubao-seed-1-6-251015", "doubaoseed16251015", "doubao-seed-1.6-251015"]
	}),
	preset("doubao", "doubao-seed-1-6-250615", "Doubao Seed 1.6 (250615)", {
		// 官方：256K 上下文，最大输入 224K，最大回答 32K，支持深度思考/多模态理解/工具调用
		maxInputTokens: 224000,
		maxOutputTokens: 32000,
		contextWindow: 256000,
		toolCalling: true,
		vision: true,
		thinking: true,
		patterns: [
			"doubao-seed-1-6-250615",
			"doubaoseed16250615",
			"doubao-seed-1.6-250615",
			"doubao-seed-1-6"
		]
	})
];
