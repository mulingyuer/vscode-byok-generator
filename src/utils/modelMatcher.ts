/*
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:07:09
 * @LastEditTime: 2026-08-19 17:46:20
 * @LastEditors: mulingyuer
 * @Description: 模型匹配器：用于根据模型 ID 匹配预设模型
 * @FilePath: \vscode-byok-generator\src\utils\modelMatcher.ts
 * 怎么可能会有bug！！！
 */

import { MODEL_PRESETS } from "@/data/modelPresets";
import type { ModelPreset } from "@/types/wizard";

export function normalizeId(id: string): string {
	return id.toLowerCase().replace(/[-_.\s]+/g, "");
}

const PRESET_INDEX = new Map<string, ModelPreset>();

for (const preset of MODEL_PRESETS) {
	PRESET_INDEX.set(normalizeId(preset.canonicalId), preset);
	for (const pattern of preset.patterns) {
		const key = normalizeId(pattern);
		if (key && !PRESET_INDEX.has(key)) {
			PRESET_INDEX.set(key, preset);
		}
	}
}

export function matchPreset(modelId: string): ModelPreset | null {
	const key = normalizeId(modelId);
	if (!key) {
		return null;
	}
	return PRESET_INDEX.get(key) ?? null;
}
