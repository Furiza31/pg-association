/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_MAX_HISTORY_SIZE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
