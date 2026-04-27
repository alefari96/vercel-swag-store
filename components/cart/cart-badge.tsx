import { getCartToken } from '@/lib/cookie'
import { getCart } from '@/lib/api'
import { Badge } from '../ui/badge'

export default async function CartBadge() {
  const token = await getCartToken()
  if (!token) return null

  let cart
  try {
    const { data } = await getCart(token)
    cart = data
  } catch {
    return null
  }

  if (cart.totalItems === 0) return null

  return (
    <Badge className="absolute -bottom-1 -right-1 h-4 w-4 justify-center px-0">
      {cart.totalItems}
    </Badge>
  )
}

export function CartBadgeSkeleton() {
  return <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-muted animate-pulse" />
}