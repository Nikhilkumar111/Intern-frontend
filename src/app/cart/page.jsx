"use client"

import { useCart } from "@/context/CartContext";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CartPage() {
  const { cartItems, removeFromCart, totalItems, totalPrice } = useCart()

  if (cartItems.length === 0) {
    return (
      <main className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      </main>
    )
  }

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item) => (
          <Card key={item.id} className="shadow-md hover:shadow-lg transition border rounded-lg">
            <CardHeader>
              <CardTitle className="line-clamp-2">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-contain mb-3 rounded-md bg-gray-100"
              />
              <p className="text-xl font-semibold">${item.price}</p>
              <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
              <p className="text-sm text-muted-foreground">
                Subtotal: ${(item.price * item.qty).toFixed(2)}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-10 p-6 max-w-3xl mx-auto border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
        <p className="text-lg">Total Items: {totalItems}</p>
        <p className="text-lg mb-4">Total Price: ${totalPrice.toFixed(2)}</p>
        <Button className="w-full">Proceed to Checkout</Button>
      </div>
    </main>
  )
}
