import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "../components/Navbar.jsx"
import { CartProvider } from "@/context/CartContext"

// 🔹 Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// 🔹 Metadata for SEO
export const metadata = {
  title: "My Shop",
  description: "A simple e-commerce store with cart",
}

// 🔹 Root Layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
        {/* ✅ Navbar appears on every page */}
        <Navbar />

        {/* ✅ Page content */}
        <main className="container mx-auto px-4">{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
