import { getCartToken } from '@/lib/cookie'
import { getCart } from '@/lib/api'
import { CartItemList } from '@/components/cart/cart-item-list'
import { Typography } from '../ui/typography'

export default async function CartDrawerContent() {
  const token = await getCartToken()

  if (!token) return <EmptyCart />

  let cart
  try {
    const { data } = await getCart(token)
    cart = data
  } catch {
    return <EmptyCart />
  }

  if (cart.items.length === 0) return <EmptyCart />

  return (
    <CartItemList items={cart.items} currency={cart.currency} />
  )
}

function EmptyCart() {
  return (
    <div className="flex h-full items-center justify-center px-4 py-12 text-center">
      <Typography variant="p">Your cart is empty.</Typography>
    </div>
  )
}
