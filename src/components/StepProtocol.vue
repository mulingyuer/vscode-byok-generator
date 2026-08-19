<!--
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:42
 * @LastEditTime: 2026-08-19 15:09:43
 * @LastEditors: mulingyuer
 * @Description:
 * @FilePath: \vscode-byok-generator\src\components\StepProtocol.vue
 * 怎么可能会有bug！！！
-->
<script setup lang="ts">
import { PROTOCOL_OPTIONS } from "@/data/protocols";
import { useWizardStore } from "@/stores/wizard";
import type { ApiType } from "@/types";

const store = useWizardStore();

function handleSelect(value: ApiType) {
	store.apiType = value;
}

function handleNext() {
	store.generateConfig();
	store.nextStep();
}
</script>

<template>
	<div class="step">
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

		<div class="actions">
			<n-button @click="store.prevStep()">上一步</n-button>
			<n-button type="primary" @click="handleNext">生成配置</n-button>
		</div>
	</div>
</template>

<style scoped>
.step {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.cards {
	display: grid;
	grid-template-columns: 1fr;
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
}

.card.active {
	border-color: var(--n-color-target, #18a058);
	box-shadow: 0 0 0 1px var(--n-color-target, #18a058) inset;
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

.actions {
	display: flex;
	justify-content: flex-end;
	gap: 8px;
}
</style>
