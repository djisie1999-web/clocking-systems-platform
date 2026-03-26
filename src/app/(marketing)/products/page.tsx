"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Star, Check } from "lucide-react";
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
  features: string[];
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

function addToCart(product: Product) {
  try {
    const raw = localStorage.getItem("cs_cart");
    const cart: { items: { productId: string; quantity: number; name: string; price: number; type: string }[] } = raw
      ? JSON.parse(raw)
      : { items: [] };
    const existing = cart.items.find((i) => i.productId === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.items.push({
        productId: product.id,
        quantity: 1,
        name: product.name,
        price: product.price,
        type: product.type,
      });
    }
    localStorage.setItem("cs_cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  } catch {
    // ignore
  }
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <Skeleton className="h-40 rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-8 w-1/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  );
}

const categoryColors: Record<string, string> = {
  hardware: "bg-blue-600",
  software: "bg-indigo-600",
  bundle: "bg-emerald-600",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("popular");

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (sort) params.set("sort", sort);

    setLoading(true);
    fetch(`/api/products?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeCategory, sort]);

  const tabs = [
    { value: "all", label: "All Products" },
    { value: "hardware", label: "Hardware" },
    { value: "software", label: "Software" },
    { value: "bundle", label: "Bundles" },
  ];

  return (
    <>
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Time &amp; Attendance Products
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Hardware terminals, cloud software, and bundles for every business size. All UK-compatible, with free setup guides.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveCategory(tab.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === tab.value
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-sm text-gray-500">
              Try a different category or{" "}
              <button
                onClick={() => setActiveCategory("all")}
                className="text-blue-600 hover:underline"
              >
                view all products
              </button>
              .
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Image placeholder */}
                <div
                  className={`h-40 ${categoryColors[product.category] ?? "bg-gray-400"} flex items-center justify-center relative`}
                >
                  <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-white text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                        {product.badge}
                      </span>
                    </div>
                  )}
                  {product.popular && (
                    <div className="absolute top-3 right-3">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-1">
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
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 flex-1">
                    {product.shortDescription}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1 mb-4">
                    {product.features.slice(0, 3).map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-xs text-gray-600"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="text-lg font-bold text-gray-900 mb-4">
                    {formatPrice(product.price, product.type, product.priceInterval)}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex-1 inline-flex items-center justify-center h-9 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 inline-flex items-center justify-center h-9 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors gap-1.5"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
