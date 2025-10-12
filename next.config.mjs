/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Development configuration
  ...(process.env.NODE_ENV === "development" && {
    // Disable source maps in development to prevent cache issues
    productionBrowserSourceMaps: false,

    // Configure dev server
    devIndicators: {
      buildActivity: true,
      buildActivityPosition: "bottom-right",
    },
  }),
};

export default nextConfig;
