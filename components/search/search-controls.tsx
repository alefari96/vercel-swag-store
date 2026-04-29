'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useRef, useTransition } from 'react'
import { Search, Loader2 } from 'lucide-react'
import type { Category } from '@/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

export function SearchControls({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [q, setQ] = useState(searchParams.get('q') ?? '')

  function pushParams(newQ: string, newCategory?: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (newQ.trim()) params.set('q', newQ.trim())
    else params.delete('q')
    if (newCategory !== undefined) {
      if (newCategory && newCategory !== 'all') params.set('category', newCategory)
      else params.delete('category')
    }
    startTransition(() => router.replace(`${pathname}?${params.toString()}`))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setQ(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (val.length >= 3 || val.length === 0) {
      debounceRef.current = setTimeout(() => pushParams(val), 300)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (debounceRef.current) clearTimeout(debounceRef.current)
    pushParams(q)
  }

  function handleCategory(value: string) {
    pushParams(q, value)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
        <Input
          type="search"
          value={q}
          onChange={handleChange}
          placeholder="Search products..."
          className="flex-1"
        />
        <Button type="submit" disabled={isPending} className="gap-2 min-w-32 shrink-0">
          {isPending
            ? <><Loader2 className="size-4 animate-spin" />Searching...</>
            : <><Search className="size-4" />Search</>
          }
        </Button>
      </form>
      <Select
        value={searchParams.get('category') || 'all'}
        onValueChange={handleCategory}
        disabled={isPending}
      >
        <SelectTrigger className="w-full sm:w-48 shrink-0">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
