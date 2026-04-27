import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface HeroBannerProps {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  backgroundImage: string
  className?: string
}

export function HeroBanner({
  title,
  subtitle,
  ctaText,
  ctaHref,
  backgroundImage,
  className,
}: HeroBannerProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[600px] w-full items-center justify-center overflow-hidden bg-zinc-900 px-6 py-24 text-white md:px-12",
        className
      )}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          className="object-cover opacity-40 transition-opacity duration-700"
          priority
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <Typography
          variant="h1"
          className="mb-6 text-balance font-extrabold tracking-tight md:text-6xl lg:text-7xl"
        >
          {title}
        </Typography>
        <Typography
          variant="lead"
          className="mb-10 max-w-2xl text-zinc-300 md:text-2xl"
        >
          {subtitle}
        </Typography>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild className="h-12 px-8 text-base font-semibold">
            <a href={ctaHref}>{ctaText}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
