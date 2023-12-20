/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/pages/dashboard",
                permanent: true,
            },
            {
                source: "/",
                destination: "/pages/products",
                permanent: true,
            }
        ]
    }
}

module.exports = nextConfig
