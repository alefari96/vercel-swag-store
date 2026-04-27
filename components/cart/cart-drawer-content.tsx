import { getCartToken } from '@/lib/cookie'
import { getCart } from '@/lib/api'
import CartItem from '@/components/cart/cart-item'
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
    <div className="flex h-full flex-col">
      <div className="flex-1 px-4 py-4">
        <ul className="divide-y divide-neutral-200">
          {cart.items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </ul>
      </div>

      <div className="border-t px-4 py-4">
        <div className="flex items-center justify-between text-base font-semibold">
          <span>Subtotal</span>
          <span>
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: cart.currency,
            }).format(cart.subtotal)}
          </span>
        </div>
      </div>
    </div>
  )
}

function EmptyCart() {
  return (
    <div className="flex h-full items-center justify-center px-4 py-12 text-center">
      <Typography variant="p">Your cart is empty.</Typography>
    </div>
  )
}