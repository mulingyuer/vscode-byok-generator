/*
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:41
 * @LastEditTime: 2026-08-20 09:30:00
 * @LastEditors: mulingyuer
 * @Description: 路由配置，当前仅有首页
 * @FilePath: \vscode-byok-generator\src\router\index.ts
 * 怎么可能会有bug！！！
 */
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("@/pages/home.vue")
		}
	]
});

export default router;
