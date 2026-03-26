"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, ShoppingCart, ArrowLeft, Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  slug: string;
  name: string;
  category: "hardware" | "software" | "bundle";
  type: "one_off" | "subscription";
  price: number;
  priceInterval?: "month" | "year";
  shortDescription: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  badge?: string;
  popular?: boolean;
}

function formatPrice(price: number, type: string, interval?: string) {
  const pounds = price / 100;
  if (type === "subscription") {
    return `£${pounds}/${interval}`;
  }
  return `£${pounds.toLocaleString()}`;
}

function addToCart(product: Product, quantity: number) {
  try {
    const raw = localStorage.getItem("cs_cart");
    const cart: { items: { productId: string; quantity: number; name: string; price: number; type: string }[] } = raw
      ? JSON.parse(raw)
      : { items: [] };
    const existing = cart.items.find((i) => i.productId === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({
        productId: product.id,
        quantity,
        name: product.name,
        price: product.price,
        type: product.type,
      });
    }
    localStorage.setItem("cs_cart", JSON.stringify(cart));
    alert(`${product.name} (×${quantity}) added to cart!`);
  } catch {
    // ignore
  }
}

const categoryColors: Record<string, string> = {
  hardware: "bg-blue-600",
  software: "bg-indigo-600",
  bundle: "bg-emerald-600",
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/products/${slug}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true);
          setLoading(false);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) {
          setProduct(data.product);
          setRelated(data.related ?? []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Skeleton className="h-6 w-32 mb-8" />
        <div className="grid md:grid-cols-2 gap-12">
          <Skeleton className="h-80 rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-8">
          This product doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-900">Products</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div>
          <div
            className={`${categoryColors[product.category] ?? "bg-gray-500"} rounded-2xl h-80 flex items-center justify-center relative`}
          >
            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className="bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-full shadow">
                  {product.badge}
                </span>
              </div>
            )}
            <div className="w-28 h-28 rounded-2xl bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-5xl">
                {product.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Badge
              variant={
                product.category === "hardware"
                  ? "default"
                  : product.category === "software"
                  ? "secondary"
                  : "success"
              }
            >
              {product.category}
            </Badge>
            {product.popular && (
              <Badge variant="warning">Popular</Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-4">{product.shortDescription}</p>

          <div className="text-3xl font-bold text-blue-600 mb-6">
            {formatPrice(product.price, product.type, product.priceInterval)}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Quantity selector (hardware/bundle only) */}
          {product.type === "one_off" && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-500" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          )}

          {/* Add to cart */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={() => addToCart(product, quantity)}
              className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-lg text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <Link
              href="/checkout"
              onClick={() => addToCart(product, quantity)}
              className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-lg text-base font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
            >
              Buy Now
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Free UK delivery
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              30-day returns
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              UK phone support
            </span>
          </div>
        </div>
      </div>

      {/* Features & Specs */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Features */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Key Features</h2>
          <ul className="space-y-3">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Specs */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Specifications</h2>
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs).map(([key, value], i) => (
                  <tr
                    key={key}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 font-medium text-gray-700 w-1/2">
                      {key}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div
                  className={`h-28 ${categoryColors[rel.category] ?? "bg-gray-500"} flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-3xl">
                    {rel.name.charAt(0)}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{rel.shortDescription}</p>
                  <span className="font-bold text-blue-600 text-sm">
                    {formatPrice(rel.price, rel.type, rel.priceInterval)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
