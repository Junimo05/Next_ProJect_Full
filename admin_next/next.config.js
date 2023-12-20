/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/pages/products",
                permanent: true,
            }
        ]
    }
}

module.exports = nextConfig
