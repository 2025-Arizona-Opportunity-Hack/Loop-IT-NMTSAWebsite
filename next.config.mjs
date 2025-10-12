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

      // Fix chunk loading timeout issues
      config.output = {
        ...config.output,
        publicPath: "/_next/",
        chunkLoadTimeout: 30000, // 30 seconds timeout
      };
    }

    // Optimize cache location
    config.infrastructureLogging = {
      level: "error",
    };

    // Fix chunk loading issues
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    };

    return config;
  },

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
