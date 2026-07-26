/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Cloudflare Pages (via @cloudflare/next-on-pages) doesn't support the
    // built-in /_next/image optimizer without a custom Cloudflare Images
    // loader, so optimization is disabled to avoid broken images in prod.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https', hostname: 'covers.openlibrary.org' },
    ]
  },
  // Disable caching for Cloudflare Pages build size limits
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false;
    }
    return config;
  }
};

module.exports = nextConfig;
