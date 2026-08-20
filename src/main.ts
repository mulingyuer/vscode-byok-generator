/*
 * @Author: mulingyuer
 * @Date: 2026-08-19 15:09:41
 * @LastEditTime: 2026-08-20 09:30:00
 * @LastEditors: mulingyuer
 * @Description: 应用入口
 * @FilePath: \vscode-byok-generator\src\main.ts
 * 怎么可能会有bug！！！
 */
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

// style
import "@/styles/index.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
