<template>
	<n-config-provider>
		<n-message-provider>
			<div class="page">
				<header class="header">
					<h1>VS Code BYOK 配置生成器</h1>
					<p>引导生成可粘贴到 chatLanguageModels.json 的 Custom Endpoint 配置。</p>
				</header>

				<n-card class="card">
					<n-steps :current="currentStatus" size="small">
						<n-step
							v-for="item in steps"
							:key="item.title"
							:title="item.title"
							:description="item.description"
						/>
					</n-steps>

					<div class="content">
						<StepCredentials v-if="store.step === 1" />
						<StepModelSelect v-else-if="store.step === 2" />
						<StepProtocol v-else-if="store.step === 3" />
						<StepGenerate v-else />
					</div>
				</n-card>
			</div>
		</n-message-provider>
	</n-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import StepCredentials from "@/components/StepCredentials.vue";
import StepGenerate from "@/components/StepGenerate.vue";
import StepModelSelect from "@/components/StepModelSelect.vue";
import StepProtocol from "@/components/StepProtocol.vue";
import { useWizardStore } from "@/stores/wizard";

const store = useWizardStore();

const steps = [
	{ title: "凭证", description: "分组与接口信息" },
	{ title: "模型", description: "选择要接入的模型" },
	{ title: "协议", description: "选择 API 类型" },
	{ title: "生成", description: "复制配置到 VS Code" }
];

const currentStatus = computed(() => store.step);
</script>

<style>
html,
body,
#app {
	margin: 0;
	min-height: 100%;
}

body {
	background: #f5f7fa;
	color: #1f2225;
	font-family:
		Inter,
		"Segoe UI",
		system-ui,
		-apple-system,
		sans-serif;
}
</style>

<style scoped>
.page {
	box-sizing: border-box;
	max-width: 800px;
	margin: 0 auto;
	padding: 32px 16px 48px;
}

.header {
	margin-bottom: 20px;
}

.header h1 {
	margin: 0 0 8px;
	font-size: 24px;
	line-height: 1.3;
}

.header p {
	margin: 0;
	color: #6b7280;
	font-size: 14px;
}

.card {
	border-radius: 12px;
}

.content {
	margin-top: 24px;
}
</style>
