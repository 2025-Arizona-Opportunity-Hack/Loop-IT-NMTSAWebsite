/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Cache optimization to prevent corruption
  experimental: {
    // Disable SWC cache that often gets corrupted
    swcMinify: true,
    // Use more stable caching
    workerThreads: false,
  },

  // Configure webpack for better cache management
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Disable webpack cache in development to prevent corruption
      config.cache = false;
    }

    // Optimize cache location
    config.infrastructureLogging = {
      level: "error",
    };

    return config;
  },

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
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
