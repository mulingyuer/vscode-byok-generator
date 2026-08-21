/*
 * @Author: mulingyuer
 * @Date: 2026-08-20 15:00:00
 * @LastEditTime: 2026-08-20 18:02:36
 * @LastEditors: mulingyuer
 * @Description: 模型预设聚合入口（按厂商合并 + 厂商展示配置 + 兜底默认值）
 * @FilePath: \vscode-byok-generator\src\constant\modelPresets\index.ts
 * 怎么可能会有bug！！！
 */
import type { ModelItem, ModelPreset, ModelVendor } from "@/types/wizard";
import { ANTHROPIC_PRESETS } from "./providers/anthropic";
import { DEEPSEEK_PRESETS } from "./providers/deepseek";
import { DOUBAO_PRESETS } from "./providers/doubao";
import { GOOGLE_PRESETS } from "./providers/google";
import { MEITUAN_PRESETS } from "./providers/meituan";
import { MINIMAX_PRESETS } from "./providers/minimax";
import { MOONSHOT_PRESETS } from "./providers/moonshot";
import { OPENAI_PRESETS } from "./providers/openai";
import { QWEN_PRESETS } from "./providers/qwen";
import { TENCENT_PRESETS } from "./providers/tencent";
import { XAI_PRESETS } from "./providers/xai";
import { XIAOMI_PRESETS } from "./providers/xiaomi";
import { ZHIPU_PRESETS } from "./providers/zhipu";

export { FALLBACK_MODEL_DEFAULTS } from "./fallbackDefaults";

/** 厂商展示顺序 */
export const VENDOR_ORDER: ModelVendor[] = [
	"openai",
	"anthropic",
	"google",
	"qwen",
	"deepseek",
	"xai",
	"zhipu",
	"moonshot",
	"minimax",
	"xiaomi",
	"doubao",
	"tencent",
	"meituan"
];

/** 厂商显示名 */
export const VENDOR_LABELS: Record<ModelVendor, string> = {
	openai: "OpenAI",
	anthropic: "Anthropic",
	google: "Google",
	qwen: "Qwen",
	deepseek: "DeepSeek",
	xai: "xAI",
	zhipu: "智谱",
	moonshot: "Moonshot",
	minimax: "MiniMax",
	xiaomi: "小米",
	doubao: "豆包",
	tencent: "腾讯",
	meituan: "美团"
};

/** 各厂商预设映射（按 VENDOR_ORDER 合并） */
const VENDOR_PRESETS_MAP: Record<ModelVendor, ModelPreset[]> = {
	openai: OPENAI_PRESETS,
	anthropic: ANTHROPIC_PRESETS,
	google: GOOGLE_PRESETS,
	qwen: QWEN_PRESETS,
	deepseek: DEEPSEEK_PRESETS,
	xai: XAI_PRESETS,
	zhipu: ZHIPU_PRESETS,
	moonshot: MOONSHOT_PRESETS,
	minimax: MINIMAX_PRESETS,
	xiaomi: XIAOMI_PRESETS,
	doubao: DOUBAO_PRESETS,
	tencent: TENCENT_PRESETS,
	meituan: MEITUAN_PRESETS
};

/** 全部模型预设（按 VENDOR_ORDER 顺序合并） */
export const MODEL_PRESETS: ModelPreset[] = VENDOR_ORDER.flatMap(
	(vendor) => VENDOR_PRESETS_MAP[vendor]
);

/** 将预设转换为模型选择器可用的模型项列表 */
export function presetsToModelItems(): ModelItem[] {
	return MODEL_PRESETS.map((presetItem) => ({
		id: presetItem.canonicalId,
		name: presetItem.displayName,
		vendor: presetItem.vendor
	}));
}
