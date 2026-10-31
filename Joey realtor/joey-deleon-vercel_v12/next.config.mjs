/** @type {import('next').NextConfig} */
const nextConfig = {
  // PREVIEW MODE: static export for the pplx.app preview URL.
  // For Vercel production, comment out the `output: 'export'` line below —
  // Vercel runs Next.js natively and supports the /api/lead serverless route.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};
export default nextConfig;
