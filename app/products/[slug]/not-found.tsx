import Link from 'next/link'
import { PackageX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-24 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
        <PackageX className="size-10 text-zinc-400" />
      </div>

      <Typography variant="h2" className="border-0 mb-4">
        Product not found
      </Typography>

      <Typography variant="lead" className="max-w-md mb-10 text-muted-foreground">
        This product doesn&apos;t exist or may have been removed from our catalog.
      </Typography>

      <div className="flex gap-4 flex-wrap justify-center">
        <Button asChild size="lg">
          <Link href="/search">Browse all products</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  )
}
