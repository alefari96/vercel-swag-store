import { Suspense } from 'react'
import { CopyrightYear } from '@/components/footer/copyright-year'

export default async function Footer() {
  'use cache'
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-neutral-500">
        © <Suspense fallback="2026"><CopyrightYear /></Suspense> Vercel Swag Store. All rights reserved.
      </div>
    </footer>
  )
}
