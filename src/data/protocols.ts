/*
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:07:07
 * @LastEditTime: 2026-08-19 15:07:08
 * @LastEditors: mulingyuer
 * @Description:
 * @FilePath: \vscode-byok-generator\src\data\protocols.ts
 * 怎么可能会有bug！！！
 */
import type { ApiType } from "@/types";

export interface ProtocolOption {
	value: ApiType;
	title: string;
	subtitle: string;
	description: string;
	hint: string;
}

export const PROTOCOL_OPTIONS: ProtocolOption[] = [
	{
		value: "chat-completions",
		title: "Chat Completions",
		subtitle: "chat-completions",
		description: "目前使用最多的协议，基本所有网关和兼容接口都支持。",
		hint: "不确定时优先选这个"
	},
	{
		value: "responses",
		title: "Responses",
		subtitle: "responses",
		description: "新的 OpenAI 标准协议，面向未来，对多模态更友好。",
		hint: "部分网关兼容不佳，请先确认网关支持"
	},
	{
		value: "messages",
		title: "Messages",
		subtitle: "messages",
		description: "Anthropic 协议，适合 Claude 系列模型。",
		hint: "需要网关提供 Anthropic Messages 兼容接口"
	}
];
