/*
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:07:09
 * @LastEditTime: 2026-08-20 09:30:00
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
			return key.startsWith(entry.key) && isVersionSuffix(key.slice(entry.key.length));
		})?.preset ?? null
	);
}
