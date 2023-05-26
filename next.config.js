/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'multimedia.infojobs.net',
        port: '',
        pathname: '**/*'
      }
    ]
  }
}

module.exports = nextConfig
