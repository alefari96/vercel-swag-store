import { getStock } from '@/lib/api'
import { QuantitySelector } from './quantity-selector'
import { AddToCartButton } from '@/components/cart/add-to-cart-button'
import { Badge } from '@/components/ui/badge'

export async function ProductActions({ productId }: { productId: string }) {
  const { data: stock } = await getStock(productId)

  if (!stock.inStock) {
    return (
      <div className="flex flex-col gap-4">
        <Badge variant="destructive" className="w-fit">Out of stock</Badge>
        <AddToCartButton productId={productId} disabled className="w-full" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Badge
        variant="outline"
        className={`w-fit ${stock.lowStock
          ? 'border-amber-500 text-amber-600 dark:text-amber-400'
          : 'border-green-500 text-green-600 dark:text-green-400'
        }`}
      >
        {stock.lowStock ? `Only ${stock.stock} left` : `In stock (${stock.stock})`}
      </Badge>
      <QuantitySelector max={stock.stock} productId={productId} />
    </div>
  )
}