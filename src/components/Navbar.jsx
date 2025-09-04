"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { useCart } from "@/context/CartContext"
import { LucideMenu, LucideX } from "lucide-react" // for hamburger icon

export default function Navbar() {
  const { totalItems } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* 🔹 Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold text-blue-600 hover:text-blue-800 transition-all duration-300"
        >
          MyShop
        </Link>

        {/* 🔹 Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-8">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link className="hover:text-blue-600 font-medium transition duration-200" href="/">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/dashboard"
                    className="hover:text-blue-600 font-medium transition duration-200"
                  >
                    Dashboard
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/cart"
                    className="relative flex items-center hover:text-blue-600 font-medium transition duration-200"
                  >
                    Cart 🛒
                    {totalItems > 0 && (
                      <span className="ml-1 absolute -top-2 -right-4 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Button asChild variant="outline" className="hover:bg-blue-50">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>

        {/* 🔹 Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <LucideX size={24} /> : <LucideMenu size={24} />}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Menu */}
{mobileOpen && (
  <div className="md:hidden bg-white shadow-lg border-t border-gray-200 animate-slide-down">
    <div className="flex flex-col px-6 py-4 space-y-4">
      <Link 
        href="/" 
        className="hover:text-blue-600 font-medium"
        onClick={() => setMobileOpen(false)}
      >
        Home
      </Link>
      <Link 
        href="/dashboard" 
        className="hover:text-blue-600 font-medium"
        onClick={() => setMobileOpen(false)}
      >
        Dashboard
      </Link>
      <Link 
        href="/cart" 
        className="relative hover:text-blue-600 font-medium"
        onClick={() => setMobileOpen(false)}
      >
        Cart 🛒
        {totalItems > 0 && (
          <span className="ml-1 absolute -top-2 -right-4 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full shadow-lg animate-pulse">
            {totalItems}
          </span>
        )}
      </Link>
      <Link 
        href="/auth/login" 
        className="hover:text-blue-600 font-medium"
        onClick={() => setMobileOpen(false)}
      >
        Login
      </Link>
      <Link 
        href="/auth/signup" 
        className="hover:text-blue-600 font-medium"
        onClick={() => setMobileOpen(false)}
      >
        Sign Up
      </Link>
    </div>
  </div>
)}

    </nav>
  )
}
