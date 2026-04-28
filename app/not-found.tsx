import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-24 text-center">
      <Typography
        variant="h1"
        className="text-8xl font-extrabold text-zinc-200 dark:text-zinc-800 select-none mb-6"
      >
        404
      </Typography>

      <Typography variant="h2" className="border-0 mb-4">
        Page not found
      </Typography>

      <Typography variant="lead" className="max-w-md mb-10 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Typography>

      <div className="flex gap-4 flex-wrap justify-center">
        <Button asChild size="lg">
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/search">Browse products</Link>
        </Button>
      </div>
    </div>
  )
}
