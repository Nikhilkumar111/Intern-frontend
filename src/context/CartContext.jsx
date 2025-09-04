// src/context/CartContext.jsx
"use client"

import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        // increase quantity if already in cart
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
