import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <main className="container mx-auto py-10">
      <Card className="p-6 max-w-3xl mx-auto shadow-lg animate-pulse">
        <CardHeader>
          <CardTitle className="h-6 bg-gray-300 rounded w-1/2"></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </CardContent>
      </Card>
    </main>
  )
}
