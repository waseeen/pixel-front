const env = {
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  wsUrl: import.meta.env.VITE_WS_URL,
  vkAppId: import.meta.env.VITE_VK_APP_ID,
  redirectUrl: import.meta.env.VITE_REDIRECT_URL,
  width: Number(import.meta.env.VITE_WIDTH),
  height: Number(import.meta.env.VITE_HEIGHT),
  pixelSize: Number(import.meta.env.VITE_PIXEL_SIZE),
} as const;
export default env;
