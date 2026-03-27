import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources & Blog — Clocking Systems UK",
  description:
    "Expert advice on UK time and attendance, employment law, GDPR compliance, and getting the most from your Clocking Systems setup.",
  openGraph: {
    title: "Resources & Blog — Clocking Systems",
    description: "Expert guides on time & attendance, overtime calculation, GDPR and more.",
    type: "website",
  },
};

const posts = [
  {
    slug: "time-attendance-buyers-guide-2025",
    category: "Buyer Guide",
    categoryColor: "bg-emerald-100 text-emerald-700",
    title: "Time & Attendance Systems: Buyer's Guide 2025 (UK)",
    excerpt:
      "Everything UK businesses need to know when buying a time and attendance system in 2025. Hardware types, software features, pricing, and what questions to ask.",
    readTime: 10,
    date: "February 2025",
    featured: true,
  },
  {
    slug: "how-to-calculate-overtime-uk",
    category: "Compliance",
    categoryColor: "bg-blue-100 text-blue-700",
    title: "How to Calculate Overtime Pay in the UK (2025 Guide)",
    excerpt:
      "A complete guide to calculating overtime pay in the UK. Understand legal requirements, different overtime types, and how automated time & attendance systems eliminate errors.",
    readTime: 8,
    date: "March 2025",
  },
  {
    slug: "gdpr-biometric-clocking",
    category: "Compliance",
    categoryColor: "bg-purple-100 text-purple-700",
    title: "GDPR & Biometric Clocking: What UK Employers Need to Know",
    excerpt:
      "Is biometric time and attendance GDPR compliant in the UK? Learn what the law says about storing fingerprint and facial recognition data for employee clocking.",
    readTime: 7,
    date: "January 2025",
  },
  {
    slug: "clocking-machines-vs-manual-timesheets",
    category: "Business",
    categoryColor: "bg-amber-100 text-amber-700",
    title: "Clocking Machines vs Manual Timesheets: The Real Cost Comparison",
    excerpt:
      "Manual timesheets cost UK businesses more than they realise. Compare the real cost of paper timesheets vs automated clocking machines — including buddy punching, admin time, and payroll errors.",
    readTime: 9,
    date: "March 2025",
  },
];

export default function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Resources &amp; Guides</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Expert advice on time &amp; attendance, UK employment law, GDPR compliance, and getting the most from your Clocking Systems setup.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Featured */}
        <Link
          href={`/blog/${featured.slug}`}
          className="block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow mb-10 group"
        >
          <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] h-48 flex items-center justify-center px-10">
            <h2 className="text-white text-xl md:text-2xl font-bold text-center group-hover:text-blue-200 transition-colors">
              {featured.title}
            </h2>
          </div>
          <div className="p-7">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${featured.categoryColor}`}>
                {featured.category}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {featured.readTime} min read
              </span>
              <span className="text-xs text-gray-400">{featured.date}</span>
            </div>
            <p className="text-gray-600 mb-4">{featured.excerpt}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] group-hover:gap-2.5 transition-all">
              Read article <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col group"
            >
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 h-32 flex items-center justify-center px-5">
                <p className="text-white text-sm font-medium text-center leading-tight group-hover:text-blue-200 transition-colors">
                  {post.title}
                </p>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${post.categoryColor}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime} min
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#0A1628] mb-2 flex-1">{post.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="text-xs text-gray-400">{post.date}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
