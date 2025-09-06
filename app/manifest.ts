import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OpenGPT',
    short_name: 'OpenGPT',
    description: 'Open Source ChatGPT alternative',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: 'https://raw.githubusercontent.com/thaletto/thaletto/refs/heads/main/public/projects/opengpt.jpeg',
        sizes: '1200x630',
        type: 'image/jpeg',
        purpose: 'any maskable',
      },
    ],
  }
}