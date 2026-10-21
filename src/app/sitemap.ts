import { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { servicesData, allServices } from "@/data/servicesData";
import { aboutPillarsData } from "@/data/aboutPillarsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // All 3 Operational Pillar Pages
  const pillarRoutes: MetadataRoute.Sitemap = aboutPillarsData.map((p) => ({
    url: `${baseUrl}/about/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // All 17 unique practice & category routes
  const categorySlugs = servicesData.map((svc) => svc.slug);
  const individualSlugs = allServices.map((svc) => svc.slug);
  const uniqueSlugs = Array.from(new Set([...categorySlugs, ...individualSlugs]));

  const serviceRoutes: MetadataRoute.Sitemap = uniqueSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...pillarRoutes, ...serviceRoutes];
}
