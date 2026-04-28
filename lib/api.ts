import { cacheLife, cacheTag } from 'next/cache'
import { apiFetch } from './fetch'
import type {
  CategoryListResponse,
  CartResponse,
  ProductListResponse,
  ProductsParams,
  ProductResponse,
  PromotionResponse,
  StockResponse,
} from '@/types'


/**
 * Cached functions
 * All api functions that use cache
 */

export async function getProducts(params: ProductsParams = {}): Promise<ProductListResponse> {
  'use cache'
  cacheTag('products')
  cacheLife('hours')

  const qs = new URLSearchParams()
  if (params.search) qs.set('search', params.search)
  if (params.category) qs.set('category', params.category)
  if (params.featured !== undefined) qs.set('featured', String(params.featured))
  if (params.page) qs.set('page', String(params.page))
  if (params.limit) qs.set('limit', String(params.limit))

  const query = qs.toString()
  return apiFetch<ProductListResponse>(`/products${query ? `?${query}` : ''}`)
}

export async function getProduct(slug: string): Promise<ProductResponse> {
  'use cache'
  cacheTag(`product-${slug}`)
  cacheLife('hours')

  return apiFetch<ProductResponse>(`/products/${slug}`)
}

export async function getCategories(): Promise<CategoryListResponse> {
  'use cache'
  cacheTag('categories')
  cacheLife('days')

  return apiFetch<CategoryListResponse>('/categories')
}

export async function getPromotions(): Promise<PromotionResponse> {
  'use cache'
  cacheTag('promotions')
  cacheLife('minutes')

  return apiFetch<PromotionResponse>('/promotions')
}

/**
 * Uncached functions
 * All api functions that don't use cache
 */

export async function getStock(productId: string): Promise<StockResponse> {
  return apiFetch<StockResponse>(`/products/${productId}/stock`)
}

export async function getCart(cartToken: string): Promise<CartResponse> {
  return apiFetch<CartResponse>('/cart', {
    headers: { 'x-cart-token': cartToken },
  })
}
