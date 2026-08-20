<!--
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:43
 * @LastEditTime: 2026-08-20 09:30:00
 * @LastEditors: mulingyuer
 * @Description: JSON 编辑器，基于 CodeMirror 6，支持 JSON 语法高亮与 lint
 * @FilePath: \vscode-byok-generator\src\components\JsonEditor.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div ref="hostRef" class="editor" />
</template>

<script setup lang="ts">
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { lintGutter, linter } from "@codemirror/lint";
import { EditorView, basicSetup } from "codemirror";

const props = defineProps<{
	modelValue: string;
}>();

const emit = defineEmits<{
	"update:modelValue": [value: string];
}>();

const hostRef = ref<HTMLDivElement | null>(null);
let view: EditorView | null = null;
let syncing = false;

/** 创建 CodeMirror 编辑器实例 */
function createEditor() {
	if (!hostRef.value) {
		return;
	}

	view = new EditorView({
		doc: props.modelValue,
		extensions: [
			basicSetup,
			json(),
			lintGutter(),
			linter(jsonParseLinter()),
			EditorView.updateListener.of((update) => {
				if (!update.docChanged || syncing) {
					return;
				}
				emit("update:modelValue", update.state.doc.toString());
			})
		],
		parent: hostRef.value
	});
}

onMounted(createEditor);

watch(
	() => props.modelValue,
	(value) => {
		if (!view || view.state.doc.toString() === value) {
			return;
		}
		syncing = true;
		view.dispatch({
			changes: {
				from: 0,
				to: view.state.doc.length,
				insert: value
			}
		});
		syncing = false;
	}
);

onBeforeUnmount(() => {
	view?.destroy();
	view = null;
});
</script>

<style lang="scss" scoped>
.editor {
	overflow: hidden;
	min-height: 360px;
	border: 1px solid var(--n-border-color, #e0e0e6);
	border-radius: 8px;
}

.editor :deep(.cm-editor) {
	height: 360px;
}

.editor :deep(.cm-scroller) {
	font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
	font-size: 13px;
}
</style>
