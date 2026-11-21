import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old Vercel URL is still on LinkedIn, job portals and older CVs; send it to the custom domain.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "moch-sugih-nugraha-v2.vercel.app" }],
        destination: "https://www.mochsugihnugraha.my.id/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
