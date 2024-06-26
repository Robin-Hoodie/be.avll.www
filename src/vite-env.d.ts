/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_BASE_URL_CONTENT: string
  readonly URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}