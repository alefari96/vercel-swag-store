'use client'

import { useCart } from '@/components/providers/cart-provider'
import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'

export default function CartButton({ children }: { children?: React.ReactNode }) {
  const { open } = useCart()

  return (
    <Button onClick={open} variant="ghost" size="icon" className="relative">
      <ShoppingBag className="h-5 w-5" />
      {children}
    </Button>
  )
}
