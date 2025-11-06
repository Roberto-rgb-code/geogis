export default function StructuredData() {
  const baseUrl = 'https://geogis.solutions'
  
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}#organization`,
    "name": "GeoGIS Solutions",
    "alternateName": "GeoGIS",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": `${baseUrl}/compu.jpg`,
    "description": "Especialistas en soluciones GIS. Convertimos datos territoriales en mapas, dashboards y aplicaciones que apoyan decisiones de gobierno y empresa.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Guadalajara",
      "addressRegion": "Jalisco",
      "addressCountry": "MX"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+52-33-3402-8621",
      "contactType": "customer service",
      "email": "geogissolutionsmx@gmail.com",
      "availableLanguage": ["Spanish", "English"]
    },
    "sameAs": [
      // Agregar redes sociales cuando estén disponibles
    ],
    "areaServed": {
      "@type": "Country",
      "name": "México"
    },
    "serviceType": [
      "Sistemas de Información Geográfica",
      "Análisis Geoespacial",
      "Consultoría GIS",
      "Desarrollo WebGIS",
      "Estudios de Mercado Territorial"
    ]
  }

  // Services Schema
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Mapas e Informes Estáticos",
        "description": "Mapas en alta resolución, informes geográficos profesionales y análisis espacial básico",
        "provider": {
          "@id": `${baseUrl}#organization`
        },
        "serviceType": "Cartografía Digital",
        "areaServed": "México"
      },
      {
        "@type": "Service",
        "name": "Dashboards Interactivos",
        "description": "ArcGIS Dashboards con indicadores, filtros y KPIs territoriales para monitoreo operativo",
        "provider": {
          "@id": `${baseUrl}#organization`
        },
        "serviceType": "Business Intelligence Geoespacial",
        "areaServed": "México"
      },
      {
        "@type": "Service",
        "name": "WebGIS Interactivo",
        "description": "Mapas web accesibles desde cualquier dispositivo con herramientas de consulta y análisis integradas",
        "provider": {
          "@id": `${baseUrl}#organization`
        },
        "serviceType": "Desarrollo WebGIS",
        "areaServed": "México"
      },
      {
        "@type": "Service",
        "name": "Aplicaciones Móviles de Campo",
        "description": "Field Maps, Survey123 y QuickCapture para recolección de datos en campo con sincronización offline/online",
        "provider": {
          "@id": `${baseUrl}#organization`
        },
        "serviceType": "Aplicaciones Móviles GIS",
        "areaServed": "México"
      },
      {
        "@type": "Service",
        "name": "Infraestructura GIS",
        "description": "Configuración de ArcGIS Enterprise, servidores de mapas y gestión avanzada de geodatabases",
        "provider": {
          "@id": `${baseUrl}#organization`
        },
        "serviceType": "Infraestructura GIS Enterprise",
        "areaServed": "México"
      },
      {
        "@type": "Service",
        "name": "Análisis Avanzado",
        "description": "Modelos espaciales específicos, estudios de mercado territoriales, teledetección y visualización 3D",
        "provider": {
          "@id": `${baseUrl}#organization`
        },
        "serviceType": "Análisis Geoespacial Avanzado",
        "areaServed": "México"
      },
      {
        "@type": "Service",
        "name": "Estudios de Mercado Territoriales",
        "description": "Análisis de ubicación de competencia, densidad poblacional, seguridad y características del entorno para decisiones comerciales estratégicas",
        "provider": {
          "@id": `${baseUrl}#organization`
        },
        "serviceType": "Consultoría Territorial",
        "areaServed": "México"
      }
    ]
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Servicios",
        "item": `${baseUrl}#servicios`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Productos",
        "item": `${baseUrl}#productos`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Tecnologías",
        "item": `${baseUrl}#tecnologias`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Industrias",
        "item": `${baseUrl}#industrias`
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Contacto",
        "item": `${baseUrl}#contacto`
      }
    ]
  }

  // FAQ Schema (para mejorar rich snippets)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué servicios ofrece GeoGIS Solutions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ofrecemos servicios de mapas e informes estáticos, dashboards interactivos, WebGIS, aplicaciones móviles de campo, infraestructura GIS Enterprise y análisis avanzado con ArcGIS."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué tecnologías utilizan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Utilizamos ArcGIS Pro, ArcGIS Online, Python/ArcPy, ArcGIS API for JavaScript, Sentinel/Landsat para teledetección, y herramientas de Business Intelligence como Power BI y Tableau."
        }
      },
      {
        "@type": "Question",
        "name": "¿A qué sectores atienden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Atendemos a gobierno y sector público, planeación urbana, procesos electorales, transporte y logística, medio ambiente y estudios de mercado territoriales."
        }
      },
      {
        "@type": "Question",
        "name": "¿Dónde están ubicados?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Estamos ubicados en Guadalajara, Jalisco, México. Atendemos proyectos en todo el país."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}

