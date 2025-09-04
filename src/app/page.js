import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 p-6">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-4 text-center">
        Welcome to <span className="text-blue-900">MyShop</span>
      </h1>
      <p className="mb-8 text-lg text-gray-700 text-center max-w-md">
        Discover amazing products, great deals, and a seamless shopping experience. Start exploring our dashboard now!
      </p>
      <Link href="/dashboard">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
          Go to Dashboard
        </Button>
      </Link>
    </main>
  )
}
