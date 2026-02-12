/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone", // Required for the Dockerfile specified
    reactStrictMode: true,
};

export default nextConfig;
