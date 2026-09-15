import type { MetadataRoute } from "next";
import { clinic } from "@/data/clinic";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: clinic.site,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
