'use client'

import { useOptimistic, useTransition } from 'react'
import { toast } from 'sonner'
import { removeCartItem, updateCartItem } from '@/lib/actions'
import CartItem from './cart-item'
import { Typography } from '@/components/ui/typography'
import type { CartItemWithProduct } from '@/types'

type Action =
  | { type: 'remove'; productId: string }
  | { type: 'update'; productId: string; quantity: number }

function reducer(state: CartItemWithProduct[], action: Action): CartItemWithProduct[] {
  switch (action.type) {
    case 'remove':
      return state.filter((item) => item.productId !== action.productId)
    case 'update':
      return state.map((item) =>
        item.productId === action.productId
          ? { ...item, quantity: action.quantity, lineTotal: item.product.price * action.quantity }
          : item
      )
  }
}

type Props = {
  items: CartItemWithProduct[]
  currency: string
}

export function CartItemList({ items, currency }: Props) {
  const [optimisticItems, dispatch] = useOptimistic(items, reducer)
  const [, startTransition] = useTransition()

  function handleRemove(productId: string) {
    startTransition(async () => {
      dispatch({ type: 'remove', productId })
      try {
        await removeCartItem(productId)
      } catch {
        toast.error('Failed to remove item.')
      }
    })
  }

  function handleUpdate(productId: string, quantity: number) {
    if (quantity <= 0) {
      handleRemove(productId)
      return
    }
    startTransition(async () => {
      dispatch({ type: 'update', productId, quantity })
      try {
        await updateCartItem(productId, quantity)
      } catch {
        toast.error('Failed to update quantity.')
      }
    })
  }

  const optimisticSubtotal = optimisticItems.reduce((sum, item) => sum + item.lineTotal, 0)

  if (optimisticItems.length === 0) {
    return (
      <div className="flex h-full items-center justify-center px-4 py-12 text-center">
        <Typography variant="p">Your cart is empty.</Typography>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <ul className="divide-y divide-neutral-200">
          {optimisticItems.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              onRemove={() => handleRemove(item.productId)}
              onUpdate={(qty) => handleUpdate(item.productId, qty)}
            />
          ))}
        </ul>
      </div>

      <div className="border-t px-4 py-4">
        <div className="flex items-center justify-between text-base font-semibold">
          <span>Subtotal</span>
          <span>
            {Intl.NumberFormat('en-US', { style: 'currency', currency }).format(optimisticSubtotal)}
          </span>
        </div>
      </div>
    </div>
  )
}
