/*
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:07:09
 * @LastEditTime: 2026-08-21 00:00:00
 * @LastEditors: mulingyuer
 * @Description: 模型匹配器：用于根据模型 ID 匹配预设模型
 * @FilePath: \vscode-byok-generator\src\utils\modelMatcher.ts
 * 怎么可能会有bug！！！
 */

import { MODEL_PRESETS } from "@/constant/modelPresets";
import type { ModelPreset } from "@/types/wizard";

/** 规范化模型 ID（小写、去除分隔符） */
export function normalizeId(id: string): string {
	return id.toLowerCase().replace(/[-_.\s]+/g, "");
}

const PRESET_INDEX = new Map<string, ModelPreset>();
const NORMALIZED_PRESETS: Array<{ key: string; preset: ModelPreset }> = [];

for (const preset of MODEL_PRESETS) {
	const canonicalKey = normalizeId(preset.canonicalId);
	PRESET_INDEX.set(canonicalKey, preset);
	NORMALIZED_PRESETS.push({ key: canonicalKey, preset });
	for (const pattern of preset.patterns) {
		const key = normalizeId(pattern);
		if (key && !PRESET_INDEX.has(key)) {
			PRESET_INDEX.set(key, preset);
			NORMALIZED_PRESETS.push({ key, preset });
		}
	}
}

NORMALIZED_PRESETS.sort((left, right) => right.key.length - left.key.length);

/** 判断剩余部分是否像日期/数字版本后缀，避免 gpt-4o-mini 误配 gpt-4o */
function isVersionSuffix(suffix: string): boolean {
	return /^\d{4,}$/.test(suffix);
}

/** 代表真实模型系列的后缀保留词，命中则不视为网关变体 */
const RESERVED_MODEL_SUFFIXES = new Set([
	"mini",
	"plus",
	"flash",
	"pro",
	"turbo",
	"preview",
	"code",
	"instruct",
	"vision",
	"audio"
]);

/** 判断剩余后缀是否是网关渠道/路由变体（如 anti、ent、high、aws、or、kiro） */
function isGatewayVariantSuffix(suffix: string): boolean {
	return /^[a-z][a-z0-9]*$/.test(suffix) && !RESERVED_MODEL_SUFFIXES.has(suffix);
}

/** 根据模型 ID 查找匹配的预设配置 */
export function matchPreset(modelId: string): ModelPreset | null {
	const key = normalizeId(modelId);
	if (!key) {
		return null;
	}
	const exactMatch = PRESET_INDEX.get(key);
	if (exactMatch) {
		return exactMatch;
	}
	return (
		NORMALIZED_PRESETS.find((entry) => {
			const suffix = key.slice(entry.key.length);
			return (
				key.startsWith(entry.key) && (isVersionSuffix(suffix) || isGatewayVariantSuffix(suffix))
			);
		})?.preset ?? null
	);
}
