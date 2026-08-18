# Plan: VSCode BYOK Config Generator

## TL;DR

构建一个 Vue3 + TS + Vite 的多步骤向导 Web 应用，引导用户输入 BaseUrl/ApiKey、选择模型、选择协议，最终生成可直接粘贴到 VSCode `chatLanguageModels.json` 的 BYOK 配置。

---

## 阶段一：项目初始化

1. `npm create vite@latest vscode-byok-generator -- --template vue-ts`
2. 安装依赖：
   - UI 库：**Naive UI**（Vue3 原生，TS 支持最佳）
   - 状态管理：**Pinia**
   - AI SDK：**openai**（用于调用 /v1/models）
   - JSON 编辑器：**CodeMirror 6** + `@codemirror/lang-json` + `@codemirror/lint`（比 Monaco 轻量，满足高亮+报错+格式化需求）
   - 图标：`@vicons/ionicons5`（Naive UI 配套）

---

## 阶段二：核心数据层（可与阶段三 UI 骨架并行）

3. **模型预设数据库** `src/data/modelPresets.ts`
   - 数据结构：`ModelPreset` 类型含 `canonicalId`, `displayName`, `maxInputTokens`, `maxOutputTokens`, `contextWindow?`, `toolCalling`, `vision`, `thinking`, `supportsReasoningEffort?`, `reasoningEffortFormat?`, `apiType?`
   - 预设收录：GPT-4o/4.1/5, Claude 3.5/4, Gemini 2.5, Qwen3, DeepSeek V3/R1 等主流模型
   - 每个预设包含一个 `patterns: string[]`（各种大小写/分隔符变体），用于模糊匹配网关返回的 model id

4. **模型匹配逻辑** `src/utils/modelMatcher.ts`
   - `normalizeId(id)`: 统一转小写，去除 `-_. ` 分隔符
   - `matchPreset(modelId)`: 对 patterns 做 normalize 后精确匹配；匹配失败返回 `null`（使用默认配置）

5. **配置生成逻辑** `src/utils/configGenerator.ts`
   - 输入：`{ groupName, apiKey, apiType, baseUrl, selectedModels[] }`
   - 对每个 model 尝试 `matchPreset` 获取预设属性，未命中则用最小默认值
   - URL 规则：用户给的 baseUrl + apiType 路径拼接，遵照文档的 URL 解析规则
   - apiKey 固定使用 `${input:xxx}` 格式，xxx 基于 groupName 生成唯一 slug
   - 输出一个完整 provider 对象（包含 `vendor: "customendpoint"`）

6. **状态管理** `src/stores/wizard.ts`（Pinia）
   - `step`: 1-4
   - `baseUrl`, `apiKey`, `groupName`
   - `fetchMode`: `'auto' | 'preset'`
   - `availableModels: ModelItem[]`, `selectedModelIds: string[]`
   - `apiType: 'chat-completions' | 'responses' | 'messages'`
   - `generatedConfig: string`（最终 JSON 字符串）

---

## 阶段三：UI 组件层

7. **应用骨架** `src/App.vue`
   - 固定步骤条（NSteps），4步：凭证 → 模型 → 协议 → 生成
   - 响应式布局，最大宽度 800px 居中

8. **Step 1 - 凭证输入** `src/components/StepCredentials.vue`
   - 三个输入：Group Name（提示：显示在 VSCode 模型选择器中）、BaseUrl、ApiKey（password 类型）
   - 表单校验：BaseUrl 必须是合法 HTTP URL，ApiKey 非空

9. **Step 2 - 模型选择** `src/components/StepModelSelect.vue`
   - 顶部 Radio Group 切换 `auto` / `preset` 两种模式
   - **Auto 模式**：按下「获取模型」按钮，调用 `openai` SDK 的 `client.models.list()`；loading 状态 + 错误提示
   - **Preset 模式**：按厂商分组展示预设模型列表
   - 公共部分（两种模式共用）：
     - 搜索框（实时过滤 model id / display name）
     - 全选 / 反选按钮
     - 多列 Checkbox 网格（每行 2-3 列）
     - 底部显示「已选 N 个」

10. **Step 3 - 协议选择** `src/components/StepProtocol.vue`
    - 三张卡片式 Radio，每张包含协议名、适用场景描述、兼容性提示
    - 协议说明：
      - `chat-completions`：目前用的最多，基本所有网关都支持
      - `responses`：新的 OpenAI 标准协议，面向未来，支持多模态，部分网关兼容不佳
      - `messages`：Anthropic 协议，Claude 系列模型支持，需看网关兼容情况
    - 默认选中 `chat-completions`

11. **Step 4 - 生成配置** `src/components/StepGenerate.vue`
    - 顶部两个 Segment 按钮：「全新添加」（带 `[...]`） / 「追加」（仅对象）
    - CodeMirror 6 编辑器：JSON 语法高亮 + lint 报错 + 格式化按钮
    - 复制按钮（使用 Clipboard API，带成功 toast）
    - 底部「重新开始」按钮（重置 store 回 Step 1）

---

## 阶段四：细节完善

12. **CORS 处理**：`/v1/models` 请求由浏览器直接发出，若用户的网关不支持 CORS，在 Step 2 Auto 模式下提示用户可能遇到跨域问题，建议切换 Preset 模式。无需后端代理（纯前端项目）。

13. **apiKey 安全提示**：在 Step 1 下方添加小字说明「ApiKey 仅在浏览器本地使用，不会上传至任何服务器」。生成的配置中 apiKey 字段使用 `${input:...}` 变量形式，不直接写入 JSON。

14. **生成配置的 apiKey 字段策略**：
    - 生成的 JSON 中写入 `"${input:<slug>}"`，slug 由 groupName 转小写+去空格生成
    - 在 Step 4 顶部提示：「VSCode 首次使用时会弹出输入框要求填入 ApiKey」

---

## 关键文件列表

```
src/
├── data/
│   └── modelPresets.ts       # 模型预设数据库（核心维护资产）
├── utils/
│   ├── modelMatcher.ts       # normalizeId + matchPreset
│   └── configGenerator.ts    # 生成最终 JSON 对象
├── stores/
│   └── wizard.ts             # 全局向导状态（Pinia）
├── components/
│   ├── StepCredentials.vue
│   ├── StepModelSelect.vue
│   ├── StepProtocol.vue
│   └── StepGenerate.vue
└── App.vue
```

---

## 输出 JSON 结构（参考官方文档）

```json
[
  {
    "name": "My Gateway",
    "vendor": "customendpoint",
    "apiKey": "${input:mygateway}",
    "apiType": "chat-completions",
    "models": [
      {
        "id": "gpt-4o",
        "name": "GPT-4o",
        "url": "https://gateway.example.com/v1/chat/completions",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 120000,
        "maxOutputTokens": 8000
      }
    ]
  }
]
```

---

## 验证步骤

1. `npm run dev` 正常启动
2. 走完完整向导流程（Auto 模式 + Preset 模式各一遍）
3. 生成的 JSON 粘贴到 VSCode `chatLanguageModels.json` 后模型出现在 picker 中
4. CodeMirror 编辑器：故意输入错误 JSON，验证 lint 报错
5. 复制按钮两种模式（全新/追加）输出格式正确

---

## 待确认决策

- UI 库：推荐 Naive UI，如有偏好可换 Element Plus / Ant Design Vue
- JSON 编辑器：推荐 CodeMirror 6，如需更强功能可换 Monaco Editor（体积更大）
- 部署：纯静态站，可部署到 GitHub Pages / Vercel
