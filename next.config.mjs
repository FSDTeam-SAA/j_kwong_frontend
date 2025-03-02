/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "147.93.84.148",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "https://admin.thegreencloister.com",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
