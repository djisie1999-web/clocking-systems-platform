import { NextResponse } from "next/server";
import { BLOG_POSTS } from "@/lib/data/blog";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // Related posts: other posts (exclude current), up to 3
  const related = BLOG_POSTS.filter((p) => p.id !== post.id)
    .slice(0, 3)
    .map(({ content: _content, ...rest }) => rest);

  return NextResponse.json({ post, related });
}
