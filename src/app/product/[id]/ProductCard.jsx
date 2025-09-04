"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext"; // Import your cart context

export default function ProductCard({ product }) {
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Check if product is already in cart
  const isInCart = cartItems.some((item) => item.id === product.id);

  // Handle add/remove from cart
  const handleCart = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <Card className="p-6 max-w-3xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle>{product.title || "Product Name"}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={product.image || "/placeholder.png"}
          alt={product.title || "Product image"}
          className="w-full h-64 object-contain mb-6 bg-gray-100 rounded-lg"
        />
        <p className="text-2xl font-bold mb-2">${product.price ?? "N/A"}</p>
        <p className="text-gray-500 mb-4">{product.category || "Category"}</p>
        <p className="mb-6">{product.description || "No description available."}</p>

        <Button onClick={handleCart} className="w-full">
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
}
