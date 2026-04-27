import { getStock } from '@/lib/api'
import { QuantitySelector } from './quantity-selector'
import { AddToCartButton } from '@/components/cart/add-to-cart-button'
import { Typography } from '@/components/ui/typography'

export async function ProductActions({ productId }: { productId: string }) {
  const { data: stock } = await getStock(productId)

  if (!stock.inStock) {
    return (
      <div className="flex flex-col gap-3">
        <Typography variant="p" className="text-destructive font-medium">Out of stock</Typography>
        <AddToCartButton productId={productId} disabled />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="p" className={stock.lowStock ? 'text-amber-600' : 'text-green-600'}>
        {stock.lowStock ? `Only ${stock.stock} left` : `In stock (${stock.stock})`}
      </Typography>
      <QuantitySelector max={stock.stock} productId={productId} />
    </div>
  )
}