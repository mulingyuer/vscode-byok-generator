import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { defineConfig, loadEnv } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	// 加载对应 mode 的环境变量文件（如 .env.github-preview），用于配置部署 base 路径
	const env = loadEnv(mode, process.cwd());

	return {
		base: env.VITE_BASE || "/",
		plugins: [
			vue(),
			vueDevTools(),
			AutoImport({
				imports: [
					"vue",
					"vue-router",
					"pinia",
					{
						"naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"]
					}
				],
				dts: "src/types/auto-imports.d.ts"
			}),
			Components({
				resolvers: [NaiveUiResolver()],
				dts: "src/types/components.d.ts"
			})
		],
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url))
			}
		},
		server: {
			host: true
		}
	};
});
