import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
      // https://cdn.jsdelivr.net/npm/emoji-datasource-${emojiSetName}@15.0.1/img/${emojiSetName}/sheets-256/64.png
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/npm/emoji-datasource-*@15.0.1/img/**",
      },
    ],
  },
};

export default nextConfig;
