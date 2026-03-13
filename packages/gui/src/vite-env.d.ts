/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_TITLE: string;
  readonly APP_TITLE_SHORT: string;
  readonly APP_DESC: string;
  readonly APP_PORT: string;
  readonly SERVER: string;
  readonly NODE_ENV: 'development' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
