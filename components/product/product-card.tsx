import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { Product } from '@/types'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency || 'USD',
  }).format(product.price)

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <Card className="overflow-hidden h-full flex flex-col transition-shadow hover:shadow-lg">
        {/* Image area — aspect-square keeps all cards the same height */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
        </div>

        <CardContent className="flex-1 p-4 pb-2">
          {/* Category badge */}
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {product.category}
          </p>
          {/* Product name — line-clamp prevents overflow with long names */}
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
            {product.name}
          </h3>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <span className="text-base font-bold">{price}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
