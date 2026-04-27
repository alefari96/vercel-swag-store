import { cookies } from 'next/headers'
const CART_TOKEN = 'cart_token'
const COOKIE_OPTIONS = {
  httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 30, // 30 days
}

export async function getCartToken(): Promise<string | undefined> {
  const store = await cookies()
  return store.get(CART_TOKEN)?.value
}

export async function setCartToken(token: string): Promise<void> {
  const store = await cookies()
  store.set(CART_TOKEN, token, COOKIE_OPTIONS)
}

export async function clearCartToken(): Promise<void> {
  const store = await cookies()
  store.delete(CART_TOKEN)
}