import { Suspense } from 'react'
import Image from 'next/image'                                                                                                          
import { notFound } from 'next/navigation'                                                                                              
import { getProduct, getProducts } from '@/lib/api'
import { ProductActions } from '@/components/product/product-actions'                                                                   
import { ProductActionsSkeleton } from '@/components/product/product-actions-skeleton'                                                  
import { Typography } from '@/components/ui/typography'

export async function generateStaticParams() {
  const { data } = await getProducts({ limit: 100 })
  return data.map((p) => ({ slug: p.slug }))
}

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const { data: product } = await getProduct(slug).catch(() => ({ data: null }))
  if (!product) return { title: 'Product Not Found' }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0], alt: product.name }],
    },
  }
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params
  const { data: product } = await getProduct(slug).catch(() => ({ data: null }))
  if (!product) notFound()

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency,
  }).format(product.price)

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 grid gap-12 md:grid-cols-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-6">
        <Typography variant="h1">{product.name}</Typography>
        <Typography variant="p" className="text-2xl font-semibold">{price}</Typography>
        <Typography variant="p" className="text-muted-foreground">{product.description}</Typography>

        <Suspense fallback={<ProductActionsSkeleton />}>
          <ProductActions productId={product.id} />
        </Suspense>
      </div>
    </main>
  )
}