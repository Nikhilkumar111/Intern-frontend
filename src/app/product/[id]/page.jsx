// app/product/[id]/page.jsx
import Link from "next/link";
import ProductCard from "./ProductCard.jsx"; // client component

// Server-side fetch
async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store", // always fresh
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

// Server Component
export default async function ProductDetailsPage({ params }) {
  // ✅ Await params in Next 15+
  const awaitedParams = await params;
  const product = await getProduct(awaitedParams.id);

  return (
    <main className="container mx-auto py-10">
      <Link
        href="/dashboard"
        className="mb-6 inline-block text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </Link>

      {/* Client component handles interactivity like Add to Cart */}
      <ProductCard product={product} />
    </main>
  );
}
