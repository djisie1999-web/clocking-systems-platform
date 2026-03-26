import { NextResponse } from "next/server";
import { BLOG_POSTS } from "@/lib/data/blog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let posts = [...BLOG_POSTS];

  if (category && category !== "all") {
    posts = posts.filter((p) => p.category === category);
  }

  // Return without full content for listing
  const listing = posts.map(({ content: _content, ...rest }) => rest);

  return NextResponse.json({ posts: listing });
}
