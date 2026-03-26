"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, User, Calendar, Tag, Share2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readTime: number;
  publishedAt: string;
  author: string;
  authorRole: string;
}

interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishedAt: string;
  author: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blog/${slug}`)
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
          setPost(data.post);
          setRelated(data.related ?? []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Skeleton className="h-5 w-48 mb-8" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-5 w-1/3 mb-8" />
        <div className="space-y-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main content */}
        <article className="lg:col-span-2">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gray-900">Resources</Link>
            <span>/</span>
            <span className="text-gray-900 truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Category */}
          <Badge variant="default" className="mb-4">
            {post.category}
          </Badge>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span className="font-medium text-gray-700">{post.author}</span>
              <span className="text-gray-400">{post.authorRole}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </span>
          </div>

          {/* Excerpt */}
          <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium">
            {post.excerpt}
          </p>

          {/* Content */}
          <div
            className="prose prose-gray max-w-none text-gray-700 leading-relaxed [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4 [&>p]:text-sm [&>p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-200">
            <Tag className="w-4 h-4 text-gray-400 mt-0.5" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="flex items-center gap-3 mt-6">
            <Share2 className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Share:</span>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              Copy Link
            </button>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => {
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              LinkedIn
            </button>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              Twitter
            </button>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* CTA card */}
          <div className="bg-blue-600 text-white rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-2">
              Ready to stop wasting time on timesheets?
            </h3>
            <p className="text-blue-100 text-sm mb-4">
              Get a free quote for your business. Most customers achieve full payback within 90 days.
            </p>
            <Link
              href="/demo"
              className="block text-center w-full h-10 rounded-lg text-sm font-semibold bg-white text-blue-700 hover:bg-blue-50 inline-flex items-center justify-center transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/roi-calculator"
              className="block text-center mt-3 text-sm text-blue-200 hover:text-white transition-colors"
            >
              Calculate your savings →
            </Link>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Related Articles</h3>
              <div className="space-y-4">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="flex gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {rel.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {rel.readTime} min read
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/blog"
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline mt-4"
              >
                View all articles
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}

          {/* Products CTA */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-2">
              Shop our products
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Terminals from £149. Software from £49/month.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all products
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
