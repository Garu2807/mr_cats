/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  // Добавьте другие переменные окружения, если нужно
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
