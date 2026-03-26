import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  let products = [...PRODUCTS];

  if (category && category !== "all") {
    products = products.filter((p) => p.category === category);
  }

  if (sort === "price_asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === "name") {
    products.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "popular") {
    products.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  }

  return NextResponse.json({ products });
}
