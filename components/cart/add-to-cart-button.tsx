'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useCart } from '@/components/providers/cart-provider'
import { addToCart } from '@/lib/actions'

type Props = { productId: string; quantity?: number; disabled?: boolean; className?: string }

export function AddToCartButton({ productId, quantity = 1, disabled, className }: Props) {
  const { open } = useCart()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleAdd() {
    startTransition(async () => {
      try {
        await addToCart(productId, quantity)
        router.refresh()
        open()
        toast.success('Added to cart')
      } catch {
        toast.error('Failed to add to cart. Try again.')
      }
    })
  }

  return (
    <Button disabled={disabled || isPending} onClick={handleAdd} className={className} size={'lg'}>
      {isPending ? <Spinner /> : <ShoppingCart className="h-4 w-4" />}
      {isPending ? 'Adding…' : 'Add to Cart'}
    </Button>
  )
}
