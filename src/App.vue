<!--
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:41
 * @LastEditTime: 2026-08-19 15:09:41
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

<style>
html,
body,
#app {
	margin: 0;
	min-height: 100%;
}

body {
	background: linear-gradient(180deg, #f8fafc 0%, #f5f7fa 40%);
	color: #1f2225;
	font-family:
		Inter,
		"Segoe UI",
		system-ui,
		-apple-system,
		sans-serif;
}
</style>
