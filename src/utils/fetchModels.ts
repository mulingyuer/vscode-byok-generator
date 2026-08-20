/*
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:40
 * @LastEditTime: 2026-08-20 09:30:00
 * @LastEditors: mulingyuer
 * @Description: 获取模型列表
 * @FilePath: \vscode-byok-generator\src\utils\fetchModels.ts
 * 怎么可能会有bug！！！
 */

import OpenAI from "openai";
import { normalizeSdkBaseUrl } from "@/utils/configGenerator";
import type { ModelItem } from "@/types/wizard";

/** 通过 OpenAI SDK 从网关拉取模型列表 */
export async function fetchRemoteModels(baseUrl: string, apiKey: string): Promise<ModelItem[]> {
	const client = new OpenAI({
		apiKey,
		baseURL: normalizeSdkBaseUrl(baseUrl),
		dangerouslyAllowBrowser: true
	});

	const models: ModelItem[] = [];
	const seen = new Set<string>();

	for await (const item of client.models.list()) {
		if (!item.id || seen.has(item.id)) {
			continue;
		}
		seen.add(item.id);
		models.push({
			id: item.id,
			name: item.id
		});
	}

	return models.sort((a, b) => a.id.localeCompare(b.id));
}

/** 将获取模型时的错误转换为可读提示 */
export function describeFetchError(error: unknown): string {
	if (error instanceof OpenAI.APIError) {
		return error.message || `请求失败（${error.status ?? "unknown"}）`;
	}
	if (error instanceof TypeError) {
		return "请求被浏览器拦截，可能是跨域（CORS）问题。请改用预设模型，或让网关允许浏览器访问。";
	}
	if (error instanceof Error) {
		return error.message;
	}
	return "获取模型列表失败，请稍后重试。";
}
