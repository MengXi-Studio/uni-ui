/**
 * Vue SFC 模块声明
 * 让 TypeScript 认识 `*.vue` 文件导入（否则 tsc 报 TS2307: Cannot find module '...vue'）
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}
