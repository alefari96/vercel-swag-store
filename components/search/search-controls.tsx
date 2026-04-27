'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import type { Category } from '@/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

export function SearchControls({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [q, setQ] = useState(searchParams.get('q') ?? '')
  const currentCategory = searchParams.get('category') ?? ''

  function navigate(query: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (query.trim()) params.set('q', query.trim())
    else params.delete('q')
    router.replace(`${pathname}?${params.toString()}`)
  }

  // Auto-trigger after 3+ chars or on clear, debounced 300ms
  useEffect(() => {
    if (q.length === 0 || q.length >= 3) {
      const timer = setTimeout(() => navigate(q), 300)
      return () => clearTimeout(timer)
    }
  }, [q])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate(q)
  }

  function handleCategory(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') params.set('category', value)
    else params.delete('category')
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
        <Input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="flex-1"
        />
        <Button type="submit" size="icon" aria-label="Search">
          <Search />
        </Button>
      </form>
      <Select value={currentCategory || 'all'} onValueChange={handleCategory}>
        <SelectTrigger className="sm:w-48">
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
