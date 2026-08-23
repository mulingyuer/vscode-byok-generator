/*
 * @Author: mulingyuer
 * @Date: 2026-08-23 09:51:01
 * @LastEditTime: 2026-08-23 09:53:19
 * @LastEditors: mulingyuer
 * @Description:
 * @FilePath: \vscode-byok-generator\src\types\env.d.ts
 * 怎么可能会有bug！！！
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE?: string
  readonly VITE_CORS_PROXY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
