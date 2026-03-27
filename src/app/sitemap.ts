import { MetadataRoute } from "next";

const BASE_URL = "https://clockingsystems.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/products", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/products/evotime", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/products/evotime-pro", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/products/enterprise", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/shop", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/demo", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/hardware", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/roi-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/compare", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/compare/evotime-vs-brighthr", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/compare/evotime-vs-deputy", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/compare/evotime-vs-timemoto", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/compare/evotime-vs-paper-timesheets", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/case-studies", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.6, changeFrequency: "yearly" as const },
    { url: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
    { url: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/blog/how-to-calculate-overtime-uk", priority: 0.6, changeFrequency: "yearly" as const },
    { url: "/blog/gdpr-biometric-clocking", priority: 0.6, changeFrequency: "yearly" as const },
    { url: "/blog/time-attendance-buyers-guide-2025", priority: 0.6, changeFrequency: "yearly" as const },
    { url: "/blog/clocking-machines-vs-manual-timesheets", priority: 0.6, changeFrequency: "yearly" as const },
    { url: "/blog/bradford-factor-calculator", priority: 0.6, changeFrequency: "yearly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
