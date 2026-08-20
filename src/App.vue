<!--
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:41
 * @LastEditTime: 2026-08-20 09:30:00
 * @LastEditors: mulingyuer
 * @Description: 应用壳组件，仅承载全局 Provider 与路由出口
 * @FilePath: \vscode-byok-generator\src\App.vue
 * 怎么可能会有bug！！！
-->
<template>
	<n-config-provider>
		<n-message-provider>
			<router-view />
		</n-message-provider>
	</n-config-provider>
</template>

<script setup lang="ts"></script>

<style lang="scss">
// 全局样式已迁移至 src/styles/index.scss
</style>
