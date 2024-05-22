import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**/*',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'nias-backend.onrender.com',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import "src/styles/_variables.scss";`,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    })

    // Настройка алиасов
    config.resolve.alias['@public'] = path.join(__dirname, 'public')

    return config
  },
}

export default nextConfig
