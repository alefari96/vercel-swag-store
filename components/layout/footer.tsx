export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Vercel Swag Store. All rights reserved.
      </div>
    </footer>
  )
}
