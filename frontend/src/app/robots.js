export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/admin"],
    },
    sitemap: "https://elventex.tech/sitemap.xml",
  };
}