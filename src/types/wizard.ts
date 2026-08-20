/*
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:07:06
 * @LastEditTime: 2026-08-19 15:07:07
 * @LastEditors: mulingyuer
 * @Description: 向导功能相关的全部类型定义（模型、协议、配置生成等）
 * @FilePath: \vscode-byok-generator\src\types\wizard.ts
 * 怎么可能会有bug！！！
 */

/** API 协议类型 */
export type ApiType = "chat-completions" | "responses" | "messages";

/** 模型获取方式 */
export type FetchMode = "auto" | "preset";

/** 输出模式 */
export type OutputMode = "full" | "append";

/** 推理级别的格式类型 */
export type ReasoningEffortFormat = ApiType;

/** 模型厂商 */
export type ModelVendor =
	| "openai"
	| "anthropic"
	| "google"
	| "qwen"
	| "deepseek"
	| "xai"
	| "zhipu"
	| "moonshot"
	| "minimax"
	| "xiaomi"
	| "tencent"
	| "meituan";

/** 模型预设配置 */
export interface ModelPreset {
	/** 规范化模型 ID */
	canonicalId: string;
	/** 显示名称 */
	displayName: string;
	/** 厂商 */
	vendor: ModelVendor;
	/** 最大输入 token 数 */
	maxInputTokens: number;
	/** 最大输出 token 数 */
	maxOutputTokens: number;
	/** 上下文窗口大小 */
	contextWindow?: number;
	/** 是否支持工具调用 */
	toolCalling: boolean;
	/** 是否支持视觉 */
	vision: boolean;
	/** 是否支持思考模式 */
	thinking: boolean;
	/** 支持的推理级别列表 */
	supportsReasoningEffort?: string[];
	/** 推理级别格式 */
	reasoningEffortFormat?: ReasoningEffortFormat;
	/** API 协议类型 */
	apiType?: ApiType;
	/** 模型 ID 匹配模式 */
	patterns: string[];
}

/** 模型项 */
export interface ModelItem {
	/** 模型 ID */
	id: string;
	/** 模型名称 */
	name: string;
	/** 厂商 */
	vendor?: ModelVendor;
}

/** 生成的模型配置 */
export interface GeneratedModelConfig {
	/** 模型 ID */
	id: string;
	/** 模型名称 */
	name: string;
	/** API 地址 */
	url: string;
	/** 是否支持工具调用 */
	toolCalling: boolean;
	/** 是否支持视觉 */
	vision: boolean;
	/** 最大输入 token 数 */
	maxInputTokens: number;
	/** 最大输出 token 数 */
	maxOutputTokens: number;
	/** 上下文窗口大小 */
	contextWindow?: number;
	/** 是否支持思考模式 */
	thinking?: boolean;
	/** 支持的推理级别列表 */
	supportsReasoningEffort?: string[];
	/** 推理级别格式 */
	reasoningEffortFormat?: ReasoningEffortFormat;
	/** API 协议类型 */
	apiType?: ApiType;
}

/** 生成的 Provider 配置 */
export interface GeneratedProviderConfig {
	/** 分组名称 */
	name: string;
	/** 固定为 customendpoint */
	vendor: "customendpoint";
	/** API 密钥（input 变量引用） */
	apiKey: string;
	/** API 协议类型 */
	apiType: ApiType;
	/** 模型列表 */
	models: GeneratedModelConfig[];
	/** 每个模型的额外配置（key 为模型 ID，value 为该模型的配置参数） */
	settings?: Record<string, Record<string, unknown>>;
}

/** 生成配置的输入参数 */
export interface GenerateConfigInput {
	/** 分组名称 */
	groupName: string;
	/** API 协议类型 */
	apiType: ApiType;
	/** 网关地址 */
	baseUrl: string;
	/** 已选中的模型列表 */
	selectedModels: ModelItem[];
	/** 模型额外设置（JSON 字符串，格式为 Record<modelId, config>） */
	modelSettings?: string;
}

/** 协议选项 */
export interface ProtocolOption {
	/** 协议类型值 */
	value: ApiType;
	/** 标题 */
	title: string;
	/** 副标题 */
	subtitle: string;
	/** 详细描述 */
	description: string;
	/** 提示信息 */
	hint: string;
}
