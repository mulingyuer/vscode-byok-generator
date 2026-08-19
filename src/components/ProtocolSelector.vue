<!--
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:42
 * @LastEditTime: 2026-08-19 17:44:58
 * @LastEditors: mulingyuer
 * @Description: 协议选择器，以卡片形式单选 API 类型（Chat Completions / Responses / Messages）
 * @FilePath: \vscode-byok-generator\src\components\ProtocolSelector.vue
 * 怎么可能会有bug！！！
-->
<script setup lang="ts">
import { PROTOCOL_OPTIONS } from "@/data/protocols";
import { useWizardStore } from "@/stores/wizard";
import type { ApiType } from "@/types/wizard";

const store = useWizardStore();

function handleSelect(value: ApiType) {
	store.apiType = value;
}
</script>

<template>
	<n-radio-group :value="store.apiType" class="cards" @update:value="handleSelect">
		<label
			v-for="option in PROTOCOL_OPTIONS"
			:key="option.value"
			class="card"
			:class="{ active: store.apiType === option.value }"
		>
			<n-radio :value="option.value">
				<div class="title">{{ option.title }}</div>
			</n-radio>
			<div class="subtitle">{{ option.subtitle }}</div>
			<p>{{ option.description }}</p>
			<span>{{ option.hint }}</span>
		</label>
	</n-radio-group>
</template>

<style scoped>
.cards {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 12px;
	width: 100%;
}

.card {
	display: flex;
	flex-direction: column;
	gap: 6px;
	padding: 14px 16px;
	border: 1px solid var(--n-border-color, #e0e0e6);
	border-radius: 10px;
	cursor: pointer;
	transition: box-shadow 0.2s ease;
}

.card:hover {
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card.active {
	border-color: var(--n-color-target, #18a058);
	box-shadow: 0 0 0 1px var(--n-color-target, #18a058) inset;
}

.card .title {
	font-size: 15px;
	font-weight: 600;
	color: var(--n-text-color-1);
}

.card.active .title {
	color: var(--n-color-target, #18a058);
}

.subtitle,
.card span {
	color: var(--n-text-color-3, #8b8b8b);
	font-size: 12px;
}

.card p {
	margin: 0;
	font-size: 13px;
	line-height: 1.6;
}

@media (max-width: 720px) {
	.cards {
		grid-template-columns: 1fr;
	}
}
</style>
