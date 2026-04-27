import { cn } from "@/lib/utils"
import * as React from "react"

const typographyVariants = {
  h1: "scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight",
  h3: "scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-lg md:text-xl font-semibold tracking-tight",
  p: "leading-7",
  span: "text-sm font-medium leading-none",
  blockquote: "mt-6 border-l-2 pl-6 italic",
  list: "my-6 ml-6 list-disc [&>li]:mt-2",
  inlineCode: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
}

type TypographyVariant = keyof typeof typographyVariants

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant
  as?: React.ElementType
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "p", as, ...props }, ref) => {
    const Comp = (as || (variant.startsWith("h") ? variant : variant === "inlineCode" ? "code" : variant === "list" ? "ul" : variant === "blockquote" ? "blockquote" : "p")) as React.ElementType

    return (
      <Comp
        ref={ref}
        className={cn(typographyVariants[variant], className)}
        {...props}
      />
    )
  }
)
Typography.displayName = "Typography"

export { Typography }
