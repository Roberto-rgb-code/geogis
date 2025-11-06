import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import StructuredData from './components/StructuredData'

export const metadata: Metadata = {
  metadataBase: new URL('https://geogis.solutions'),
  title: {
    default: 'GeoGIS Solutions - Especialistas en Soluciones GIS y Análisis Geoespacial',
    template: '%s | GeoGIS Solutions'
  },
  description: 'Especialistas en soluciones GIS. Convertimos datos territoriales en mapas, dashboards y aplicaciones que apoyan decisiones de gobierno y empresa. Servicios de ArcGIS, WebGIS, análisis geoespacial y estudios de mercado territorial.',
  keywords: [
    'GIS',
    'ArcGIS',
    'mapas interactivos',
    'análisis geoespacial',
    'dashboards GIS',
    'WebGIS',
    'estudios mercado territorial',
    'consultoría SIG',
    'ArcGIS Pro',
    'ArcGIS Online',
    'análisis territorial',
    'cartografía digital',
    'sistemas de información geográfica',
    'geodatabases',
    'aplicaciones móviles GIS',
    'Field Maps',
    'Survey123',
    'ArcGIS Enterprise',
    'teledetección',
    'imágenes satelitales',
    'planeación urbana',
    'catastro digital',
    'procesos electorales',
    'logística territorial'
  ],
  authors: [{ name: 'GeoGIS Solutions' }],
  creator: 'GeoGIS Solutions',
  publisher: 'GeoGIS Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://geogis.solutions',
    siteName: 'GeoGIS Solutions',
    title: 'GeoGIS Solutions - Especialistas en Soluciones GIS y Análisis Geoespacial',
    description: 'Especialistas en soluciones GIS. Convertimos datos territoriales en mapas, dashboards y aplicaciones que apoyan decisiones de gobierno y empresa.',
    images: [
      {
        url: '/compu.jpg',
        width: 1200,
        height: 630,
        alt: 'GeoGIS Solutions - Dashboard GIS Interactivo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GeoGIS Solutions - Especialistas en Soluciones GIS',
    description: 'Especialistas en soluciones GIS. Convertimos datos territoriales en mapas, dashboards y aplicaciones que apoyan decisiones de gobierno y empresa.',
    images: ['/compu.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Agregar códigos de verificación cuando estén disponibles
    // google: 'tu-codigo-google',
    // yandex: 'tu-codigo-yandex',
    // bing: 'tu-codigo-bing',
  },
  alternates: {
    canonical: 'https://geogis.solutions',
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
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body>
        <StructuredData />
        {children}
        <Script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/anime.js/3.2.1/anime.min.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}

