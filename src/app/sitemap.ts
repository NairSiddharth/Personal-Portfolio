import type { MetadataRoute } from "next";

const siteUrl = "https://siddharthnair.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/ensemble", "/experience", "/projects", "/resume"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
