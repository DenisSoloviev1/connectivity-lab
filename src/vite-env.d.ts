/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_API_URL: string;
  readonly VITE_PUBLIC_API_SOCKET_URL: string;
  readonly VITE_PUBLIC_API_SSE_URL: string;
  readonly VITE_PUBLIC_API_WEBRTC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
