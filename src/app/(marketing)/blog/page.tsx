"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: number;
  publishedAt: string;
  author: string;
  authorRole: string;
}

function PostSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <div className="flex gap-3 pt-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

const categoryBadgeVariant: Record<string, "default" | "secondary" | "success" | "warning"> = {
  "Buyer Guides": "default",
  Technology: "secondary",
  Business: "warning",
  Compliance: "destructive" as "warning",
  Security: "destructive" as "warning",
  Integrations: "success",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "Buyer Guides", "Technology", "Business", "Compliance", "Security", "Integrations"];

  useEffect(() => {
    setLoading(true);
    const params = activeCategory !== "all" ? `?category=${encodeURIComponent(activeCategory)}` : "";
    fetch(`/api/blog${params}`)
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.posts ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  const featuredPost = posts[0];
  const restPosts = posts.slice(1);

  return (
    <>
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Resources &amp; Guides
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Expert advice on time &amp; attendance, UK employment law, ROI, and getting the most from your Clocking Systems setup.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {cat === "all" ? "All Posts" : cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div>
            <Skeleton className="h-64 rounded-xl mb-8" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No posts found
            </h3>
            <button
              onClick={() => setActiveCategory("all")}
              className="text-sm text-blue-600 hover:underline"
            >
              View all posts
            </button>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow mb-10"
              >
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 h-48 flex items-center justify-center px-8">
                  <h2 className="text-white text-xl md:text-2xl font-bold text-center">
                    {featuredPost.title}
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant={categoryBadgeVariant[featuredPost.category] ?? "default"}>
                      {featuredPost.category}
                    </Badge>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredPost.readTime} min read
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                    <span>·</span>
                    <span>{formatDate(featuredPost.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest of posts grid */}
            {restPosts.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {restPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="bg-gradient-to-br from-gray-700 to-gray-800 h-32 flex items-center justify-center px-5">
                      <p className="text-white text-sm font-medium text-center line-clamp-3">
                        {post.title}
                      </p>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge
                          variant={categoryBadgeVariant[post.category] ?? "default"}
                        >
                          {post.category}
                        </Badge>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime} min
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 flex-1">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                        <span>·</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
