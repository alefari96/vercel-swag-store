'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/components/providers/cart-provider'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import type { CartItemWithProduct } from '@/types'

type Props = {
  item: CartItemWithProduct
  onRemove: () => void
  onUpdate: (quantity: number) => void
}

export default function CartItem({ item, onRemove, onUpdate }: Props) {
  const { close } = useCart()
  const { product, quantity, lineTotal } = item

  const price = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency,
  }).format(lineTotal)

  return (
    <li className="flex gap-4 py-6">
      <Link
        href={`/products/${product.slug}`}
        onClick={close}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-neutral-100 block"
      >
        {product.images[0] && (
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-2">
          <Link
            href={`/products/${product.slug}`}
            onClick={close}
            className="font-medium leading-snug hover:underline underline-offset-2"
          >
            {product.name}
          </Link>
          <p className="font-medium shrink-0">{price}</p>
        </div>

        <div className="flex items-center justify-between">
          <ButtonGroup>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onUpdate(quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" disabled className="cursor-default opacity-100">
              <span className="text-sm">{quantity}</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onUpdate(quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </ButtonGroup>

          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
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
