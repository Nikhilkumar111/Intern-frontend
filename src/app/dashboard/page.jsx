"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function DashboardPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) 

  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const [categories, setCategories] = useState([])

  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  // ✅ Fetch products with error handling
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null) // reset previous errors
      try {
        const res = await fetch("https://fakestoreapi.com/products")
        if (!res.ok) throw new Error("Failed to fetch products")
        const data = await res.json()
        setProducts(data)
        setFilteredProducts(data)
        setCategories(["all", ...new Set(data.map((p) => p.category))])
      } catch (err) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // ✅ Filter products
  useEffect(() => {
    let filtered = [...products]
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category)
    }
    setFilteredProducts(filtered)
    setPage(1)
  }, [searchTerm, category, products])

  // ✅ Pagination logic
  const startIndex = (page - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)
  const hasMore = startIndex + itemsPerPage < filteredProducts.length

  // ✅ Loading state with skeleton
  if (loading) {
    return (
      <main className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Product Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: itemsPerPage }).map((_, idx) => (
            <div key={idx} className="p-6 border rounded-lg shadow animate-pulse h-64 bg-gray-100" />
          ))}
        </div>
      </main>
    )
  }

  // ✅ Error state
  if (error) {
    return (
      <main className="container mx-auto py-10 text-center">
        <p className="text-red-500 text-xl">{error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </main>
    )
  }

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Product Dashboard</h1>

      {/* 🔎 Search + Filter */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2 md:w-[200px]"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.map((product) => (
          <Card
            key={product.id}
            className="shadow-md hover:shadow-lg transition border rounded-lg"
          >
            <CardHeader>
              <CardTitle className="line-clamp-2">{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mb-3 rounded-md bg-gray-100"
              />
              <p className="text-xl font-semibold">${product.price}</p>
              <p className="text-sm text-muted-foreground">
                Category: {product.category}
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/product/${product.id}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-4">
        {page > 1 && (
          <Button variant="outline" onClick={() => setPage(page - 1)}>
            Previous
          </Button>
        )}
        {hasMore && (
          <Button variant="outline" onClick={() => setPage(page + 1)}>
            Next
          </Button>
        )}
      </div>
    </main>
  )
}
