import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from '@/components/providers/cart-provider'
import CartDrawer from '@/components/cart/cart-drawer'
import CartDrawerContent from '@/components/cart/cart-drawer-content'
import { CartDrawerSkeleton } from '@/components/cart/cart-drawer-skeleton'
import { PromotionBanner } from '@/components/sections/promotion-banner'
import { PromotionBannerSkeleton } from '@/components/sections/promotion-banner-skeleton'
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Vercel Swag Store',
    template: '%s | Vercel Swag Store',
  },
  description: 'Official Vercel merchandise. Premium developer apparel, accessories, and gear.',
  openGraph: {
    siteName: 'Vercel Swag Store',
    type: 'website',
    title: {
      default: 'Vercel Swag Store',
      template: '%s | Vercel Swag Store',
    },
    description: 'Official Vercel merchandise. Premium developer apparel, accessories, and gear.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SpeedInsights />
        <CartProvider>
          <Header />
          <div className="sticky top-[var(--header-height)] z-30">
            <Suspense fallback={<PromotionBannerSkeleton />}>
              <PromotionBanner />
            </Suspense>
          </div>
          <CartDrawer>
            <Suspense fallback={<CartDrawerSkeleton />}>
              <CartDrawerContent />
            </Suspense>
          </CartDrawer>
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
