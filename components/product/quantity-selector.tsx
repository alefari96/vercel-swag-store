'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { AddToCartButton } from '@/components/cart/add-to-cart-button'

export function QuantitySelector({ productId, max }: { productId: string; max: number }) {
  const [qty, setQty] = useState(1)

  return (
    <div className="flex items-center gap-3">
      <ButtonGroup>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={qty <= 1}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" disabled className="cursor-default opacity-100">
          <span className="text-sm">{qty}</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQty((q) => Math.min(max, q + 1))}
          disabled={qty >= max}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </ButtonGroup>
      <AddToCartButton productId={productId} quantity={qty} />
    </div>
  )
}
