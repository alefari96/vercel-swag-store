'use server'
import { revalidatePath } from 'next/cache'
import { getCartToken, setCartToken, clearCartToken } from './cookie'
import type { CartResponse } from '@/types'

const BASE_URL = process.env.SWAG_API_URL!
const TOKEN = process.env.SWAG_API_TOKEN!

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'x-vercel-protection-bypass': TOKEN,
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })
  if (!res.ok) throw new Error(`API error ${res.status} on ${path}`)
  return res.json()
}

async function ensureCart(): Promise<string> {
  const existing = await getCartToken()
  if (existing) return existing

  const { data } = await apiFetch<CartResponse>('/cart/create', { method: 'POST' })
  await setCartToken(data.token)
  return data.token
}

export async function addToCart(productId: string, quantity: number = 1) {
  let token = await ensureCart()
  try {
    await apiFetch('/cart', {
      method: 'POST',
      headers: { 'x-cart-token': token },
      body: JSON.stringify({ productId, quantity }),
    })
  } catch {
    // Token stale — clear, create new cart, retry once
    await clearCartToken()
    token = await ensureCart()
    await apiFetch('/cart', {
      method: 'POST',
      headers: { 'x-cart-token': token },
      body: JSON.stringify({ productId, quantity }),
    })
  }
  revalidatePath('/', 'layout')
}

export async function updateCartItem(itemId: string, quantity: number) {
  const token = await getCartToken()
  if (!token) throw new Error('No cart')
  await apiFetch(`/cart/${itemId}`, {
    method: 'PATCH',
    headers: { 'x-cart-token': token },
    body: JSON.stringify({ quantity }),
  })
  revalidatePath('/', 'layout')
}

export async function removeCartItem(itemId: string) {
  const token = await getCartToken()
  if (!token) throw new Error('No cart')
  await apiFetch(`/cart/${itemId}`, {
    method: 'DELETE',
    headers: { 'x-cart-token': token },
  })
  revalidatePath('/', 'layout')
}