"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { type CartContextValue } from "@/types"

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => {
    setIsOpen(false)
    router.refresh()
  }

  const value = { isOpen, open, close }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

const noopCart: CartContextValue = { isOpen: false, open: () => {}, close: () => {} }

export function useCart(): CartContextValue {
  return useContext(CartContext) ?? noopCart
}