import Link from 'next/link'
import { Suspense } from 'react'
import CartButton from '@/components/cart/cart-button'
import CartBadge, { CartBadgeSkeleton } from '@/components/cart/cart-badge'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 h-[var(--header-height)] border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-neutral-900">
          Vercel Swag Store
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/search" className="text-sm text-neutral-600 hover:text-neutral-900">
            Search
          </Link>
          <CartButton>
            <Suspense fallback={<CartBadgeSkeleton />}>
              <CartBadge />
            </Suspense>
          </CartButton>
        </nav>
      </div>
    </header>
  )
}
