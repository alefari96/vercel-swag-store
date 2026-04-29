'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: Props) {
  const router = useRouter()

  function handleReset() {
    router.refresh()
    reset()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-24 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="size-10 text-destructive" />
      </div>

      <Typography variant="h2" className="border-0 mb-4">
        Something went wrong
      </Typography>

      <Typography variant="lead" className="max-w-md mb-2 text-muted-foreground">
        An unexpected error occurred. You can try again or go back home.
      </Typography>

      {error.digest && (
        <Typography variant="muted" className="mb-10 font-mono">
          Error ID: {error.digest}
        </Typography>
      )}

      {!error.digest && <div className="mb-10" />}

      <div className="flex gap-4 flex-wrap justify-center">
        <Button onClick={handleReset} size="lg">
          Try again
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  )
}
