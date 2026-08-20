/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-08-20 18:02:43
 * @LastEditors: mulingyuer
 * @Description: 模型预设工厂函数与各厂商推理等级常量
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\modelPresetFactory.ts
 * 怎么可能会有bug！！！
 */
import type { ModelPreset, ModelVendor } from "@/types/wizard";
import type {
	AnthropicReasoningEffort,
	GoogleReasoningEffort,
	MoonshotReasoningEffort,
	OpenAIReasoningEffort,
	StandardReasoningEffort,
	ZhipuReasoningEffort
} from "./modelPresetTypes";

/** OpenAI 推理等级常量（5.6 系列含 max，5.x 其余不含 max） */
export const OPENAI_REASONING: OpenAIReasoningEffort[] = ["none", "low", "medium", "high", "xhigh"];
export const OPENAI_REASONING_WITH_MAX: OpenAIReasoningEffort[] = [
	"none",
	"low",
	"medium",
	"high",
	"xhigh",
	"max"
];
/** gpt-5.3-codex 专用（无 none，仅 Responses API） */
export const OPENAI_CODEX_REASONING: OpenAIReasoningEffort[] = ["low", "medium", "high", "xhigh"];

/** Anthropic 5 级（含 xhigh+max）与 4 级（无 xhigh） */
export const ANTHROPIC_REASONING_5: AnthropicReasoningEffort[] = [
	"low",
	"medium",
	"high",
	"xhigh",
	"max"
];
export const ANTHROPIC_REASONING_4: AnthropicReasoningEffort[] = ["low", "medium", "high", "max"];

/** Google thinking_level 档位 */
export const GOOGLE_REASONING_WITH_MINIMAL: GoogleReasoningEffort[] = [
	"minimal",
	"low",
	"medium",
	"high"
];
export const GOOGLE_REASONING: GoogleReasoningEffort[] = ["low", "medium", "high"];

/** 标准推理等级（Qwen/DeepSeek/xAI/MiniMax/MiMo/腾讯/美团等） */
export const STANDARD_REASONING: StandardReasoningEffort[] = ["low", "medium", "high"];

/** 智谱 GLM-5.3 档位（无 medium） */
export const ZHIPU_GLM53_REASONING: ZhipuReasoningEffort[] = ["low", "high", "max"];

/** 月之暗面 Kimi k3 档位（无 medium） */
export const MOONSHOT_K3_REASONING: MoonshotReasoningEffort[] = ["low", "high", "max"];

/** 创建一条模型预设 */
export function preset(
	vendor: ModelVendor,
	canonicalId: string,
	displayName: string,
	options: Omit<ModelPreset, "vendor" | "canonicalId" | "displayName" | "patterns"> & {
		patterns?: string[];
	}
): ModelPreset {
	return {
		vendor,
		canonicalId,
		displayName,
		patterns: options.patterns ?? [canonicalId],
		maxInputTokens: options.maxInputTokens,
		maxOutputTokens: options.maxOutputTokens,
		contextWindow: options.contextWindow,
		toolCalling: options.toolCalling,
		vision: options.vision,
		thinking: options.thinking,
		supportsReasoningEffort: options.supportsReasoningEffort,
		reasoningEffortFormat: options.reasoningEffortFormat,
		apiType: options.apiType
	};
}
