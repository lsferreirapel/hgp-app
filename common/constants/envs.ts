const envs = {
  BASE_URL:
    process.env.NEXT_PUBLIC_BASE_URL ??
    'https://58e6-189-112-9-69.ngrok-free.app/v1',
  COOKIES_PREFIX: process.env.NEXT_PUBLIC_COOKIES_PREFIX ?? 'libera-ai-web',
  TOKEN_ALIAS: process.env.NEXT_PUBLIC_TOKEN_ALIAS ?? 'token',
}

export default envs
