import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-neutral-900">
          Vercel Swag Store
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900">
            Home
          </Link>
          <Link href="/search" className="text-sm text-neutral-600 hover:text-neutral-900">
            Search
          </Link>
        </nav>
      </div>
    </header>
  )
}
