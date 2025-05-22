const envs = {
  BASE_URL:
    process.env.NEXT_PUBLIC_BASE_URL ??
    'https://58e6-189-112-9-69.ngrok-free.app/v1',
  COOKIES_PREFIX: process.env.NEXT_PUBLIC_COOKIES_PREFIX ?? 'libera-ai-web',
  TOKEN_ALIAS: process.env.NEXT_PUBLIC_TOKEN_ALIAS ?? 'token',
  SUPABASE_URL:
    process.env.SUPABASE_URL ?? 'https://kvvydsryyldfaugqkkhx.supabase.co',
  SUPABASE_ANON_KEY:
    process.env.SUPABASE_ANON_KEY ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dnlkc3J5eWxkZmF1Z3Fra2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMzM4ODcsImV4cCI6MjA1ODYwOTg4N30.R07DEocInprZ57OIRVlIhx2f0mKlSKfJg9g0kiVpUGo',
}

export default envs
