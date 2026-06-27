import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RESEARCH_CORE — The Future of Research",
    short_name: "RESEARCH_CORE",
    description:
      "System-initiated. Data streams optimized. Redefining computational analysis through monochromatic precision.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#DA840A",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
    ],
  };
}
