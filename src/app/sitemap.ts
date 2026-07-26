import type { MetadataRoute } from "next";

const siteUrl = "https://siddharthn.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/ensemble", "/experience", "/projects", "/resume"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
