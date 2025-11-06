import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'GeoGIS Solutions',
  description: 'Especialistas en soluciones GIS. Convertimos datos territoriales en mapas, dashboards y aplicaciones que apoyan decisiones de gobierno y empresa.',
  keywords: 'GIS, ArcGIS, mapas interactivos, análisis geoespacial, dashboards, WebGIS, estudios mercado territorial, consultoría SIG',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/anime.js/3.2.1/anime.min.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}

