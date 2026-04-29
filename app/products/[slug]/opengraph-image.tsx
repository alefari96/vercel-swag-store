import { ImageResponse } from 'next/og'
import { getProduct } from '@/lib/api'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  const { data: product } = await getProduct(slug).catch(() => ({ data: null }))

  const name = product?.name ?? 'Vercel Swag Store'
  const category = product?.category ?? ''
  const imageUrl = product?.images[0]
  const price = product
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: product.currency }).format(product.price)
    : null

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#0a0a0a',
          padding: '48px',
          gap: '48px',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '534px',
            height: '534px',
            flexShrink: 0,
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: '#f5f5f5',
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#e5e5e5',
                color: '#999',
                fontSize: 20,
              }}
            >
              No image
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-between',
            color: '#ffffff',
            paddingTop: '4px',
            paddingBottom: '4px',
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            Vercel Swag Store
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {category ? (
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {category}
              </div>
            ) : null}

            <div
              style={{
                fontSize: name.length > 30 ? 44 : 52,
                fontWeight: 800,
                lineHeight: 1.05,
                color: '#ffffff',
              }}
            >
              {name}
            </div>

            {price ? (
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                {price}
              </div>
            ) : null}
          </div>

          <div
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.03em',
            }}
          >
            vercel-swag-store.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
