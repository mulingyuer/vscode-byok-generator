/*
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:07:06
 * @LastEditTime: 2026-08-19 15:07:07
 * @LastEditors: mulingyuer
 * @Description: 向导功能相关的全部类型定义（模型、协议、配置生成等）
 * @FilePath: \vscode-byok-generator\src\types\wizard.ts
 * 怎么可能会有bug！！！
 */
export type ApiType = "chat-completions" | "responses" | "messages";

export type FetchMode = "auto" | "preset";

export type OutputMode = "full" | "append";

export type ReasoningEffortFormat = ApiType;

export type ModelVendor = "openai" | "anthropic" | "google" | "qwen" | "deepseek";

export interface ModelPreset {
	canonicalId: string;
	displayName: string;
	vendor: ModelVendor;
	maxInputTokens: number;
	maxOutputTokens: number;
	contextWindow?: number;
	toolCalling: boolean;
	vision: boolean;
	thinking: boolean;
	supportsReasoningEffort?: string[];
	reasoningEffortFormat?: ReasoningEffortFormat;
	apiType?: ApiType;
	patterns: string[];
}

export interface ModelItem {
	id: string;
	name: string;
	vendor?: ModelVendor;
}

export interface GeneratedModelConfig {
	id: string;
	name: string;
	url: string;
	toolCalling: boolean;
	vision: boolean;
	maxInputTokens: number;
	maxOutputTokens: number;
	contextWindow?: number;
	thinking?: boolean;
	supportsReasoningEffort?: string[];
	reasoningEffortFormat?: ReasoningEffortFormat;
	apiType?: ApiType;
}

export interface GeneratedProviderConfig {
	name: string;
	vendor: "customendpoint";
	apiKey: string;
	apiType: ApiType;
	models: GeneratedModelConfig[];
}

export interface GenerateConfigInput {
	groupName: string;
	apiType: ApiType;
	baseUrl: string;
	selectedModels: ModelItem[];
}

export interface ProtocolOption {
	value: ApiType;
	title: string;
	subtitle: string;
	description: string;
	hint: string;
}
