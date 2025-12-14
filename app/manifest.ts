import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'M. Rizal Basri - Full Stack Developer Portfolio',
    short_name: 'MRB Portfolio',
    description: 'Portfolio of M. Rizal Basri - Full Stack Developer',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#8b5cf6',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
