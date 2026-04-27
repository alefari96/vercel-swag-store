'use client'

import Image from 'next/image'
import { useTransition } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Spinner } from '@/components/ui/spinner'
import { updateCartItem, removeCartItem } from '@/lib/actions'
import type { CartItemWithProduct } from '@/types'

type Props = { item: CartItemWithProduct }

export default function CartItem({ item }: Props) {
  const [isPending, startTransition] = useTransition()
  const { product, quantity, lineTotal, productId } = item

  function handleUpdate(newQty: number) {
    startTransition(async () => {
      try {
        await updateCartItem(productId, newQty)
      } catch {
        toast.error('Failed to update quantity.')
      }
    })
  }

  function handleDecrement() {
    if (quantity <= 1) {
      startTransition(async () => {
        try {
          await removeCartItem(productId)
          toast.success('Item removed.')
        } catch {
          toast.error('Failed to remove item.')
        }
      })
    } else {
      handleUpdate(quantity - 1)
    }
  }

  function handleRemove() {
    startTransition(async () => {
      try {
        await removeCartItem(productId)
        toast.success('Item removed.')
      } catch {
        toast.error('Failed to remove item.')
      }
    })
  }

  return (
    <li className="flex gap-4 py-6">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-neutral-100">
        {product.images[0] && (
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <p className="font-medium">{product.name}</p>
          <p className="font-medium">
            {Intl.NumberFormat('en-US', { style: 'currency', currency: product.currency }).format(lineTotal)}
          </p>
        </div>

        <div className="flex items-center justify-between">
            <ButtonGroup>
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={isPending}
                aria-label="Decrease quantity"
              >
                {isPending ? <Spinner /> : <Minus className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" disabled className="cursor-default opacity-100">
                <span className="text-sm">{quantity}</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleUpdate(quantity + 1)}
                disabled={isPending}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </ButtonGroup>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              disabled={isPending}
              aria-label="Remove item"
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
      </div>
    </li>
  )
}