'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Script from 'next/script'

declare global {
  interface Window {
    particlesJS: any
    THREE: any
    anime: any
  }
}

export default function Home() {
  const [whatsappChatActive, setWhatsappChatActive] = useState(false)
  const [contactModalActive, setContactModalActive] = useState(false)
  const [navLinksActive, setNavLinksActive] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [headerStyle, setHeaderStyle] = useState({})
  const particlesInitialized = useRef(false)

  useEffect(() => {
    // Scroll progress
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / scrollHeight) * 100
      setScrollProgress(scrolled)
    }

    // Header style
    const updateHeader = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop
      if (st > 100) {
        setHeaderStyle({
          background: 'rgba(255,255,255,0.98)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
        })
      } else {
        setHeaderStyle({
          background: 'rgba(255,255,255,0.95)',
          boxShadow: 'none'
        })
      }
    }

    // Smooth scrolling
    const initSmoothScrolling = () => {
      document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
          e.preventDefault()
          const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
          const target = href ? document.querySelector(href) : null
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setNavLinksActive(false)
          }
        })
      })
    }

    // Animations
    const initAnimations = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in')
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      )
      document.querySelectorAll('.feature-card,.product-card,.industry-card,.showcase-item,.tech-item').forEach(el => {
        el.classList.add('fade-in')
        observer.observe(el)
      })
    }

    // Lazy loading
    const initLazyLoading = () => {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('loaded')
            io.unobserve(entry.target)
          }
        })
      })
      document.querySelectorAll('img[loading="lazy"]').forEach(img => io.observe(img))
    }

    // Parallax
    const initParallax = () => {
      window.addEventListener('scroll', () => {
        const s = window.pageYOffset
        const hi = document.querySelector('.hero-image img')
        if (hi && s < window.innerHeight) {
          const r = s * 0.3
          ;(hi as HTMLElement).style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(${r}px)`
        }
      })
    }

    // Scroll events
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress()
          updateHeader()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    initSmoothScrolling()
    initAnimations()
    initLazyLoading()
    initParallax()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    // Wait for scripts to load
    const initParticles = () => {
      if (typeof window === 'undefined' || !window.particlesJS || particlesInitialized.current) return
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isMobile = window.innerWidth < 768

      // Hero particles
      window.particlesJS('particles-js', {
        particles: {
          number: { value: isMobile ? 50 : 90, density: { enable: true, value_area: 900 } },
          color: { value: "#ffffff" },
          shape: { type: ["circle", "polygon"], polygon: { nb_sides: 6 } },
          opacity: { value: 0.22, random: true, anim: { enable: !prefersReduced, speed: 0.6, opacity_min: 0.05, sync: false } },
          size: { value: 2.2, random: true, anim: { enable: !prefersReduced, speed: 1, size_min: 0.8, sync: false } },
          line_linked: { enable: true, distance: isMobile ? 110 : 140, color: "#ffffff", opacity: 0.25, width: 0.8 },
          move: { enable: !prefersReduced, speed: isMobile ? 0.6 : 0.9, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
          detect_on: "canvas",
          events: { onhover: { enable: !prefersReduced, mode: ["grab", "repulse"] }, onclick: { enable: !prefersReduced, mode: "push" }, resize: true },
          modes: { grab: { distance: 160, line_linked: { opacity: 0.45 } }, repulse: { distance: 120, duration: 0.4 }, push: { particles_nb: 2 } }
        },
        retina_detect: true
      })

      // Other particles
      const makeParticles = (id: string, opts: any) => {
        if (!document.getElementById(id)) return
        window.particlesJS(id, Object.assign({
          particles: {
            color: { value: "#ffffff" },
            opacity: { value: 0.15 },
            size: { value: 2, random: true },
            move: { enable: !prefersReduced, speed: 0.7, out_mode: "out" }
          },
          interactivity: { events: { resize: true } },
          retina_detect: true
        }, opts))
      }

      makeParticles('particles-visual', {
        particles: { number: { value: isMobile ? 40 : 80 }, line_linked: { enable: true, distance: isMobile ? 90 : 130, opacity: 0.25, width: 0.7 }, size: { value: 1.8 } }
      })

      makeParticles('particles-products', {
        particles: { number: { value: isMobile ? 28 : 55 }, size: { value: 3 }, move: { speed: 0.5 }, line_linked: { enable: false } }
      })

      makeParticles('particles-industries', {
        particles: { number: { value: isMobile ? 70 : 120 }, size: { value: 1.6 }, line_linked: { enable: false }, opacity: { value: 0.12 } }
      })

      makeParticles('particles-cta', {
        particles: { number: { value: isMobile ? 18 : 28 }, size: { value: 4 }, line_linked: { enable: false }, move: { speed: 0.4 } }
      })

      // THREE.js
      if (!prefersReduced && window.THREE) {
        const container = document.getElementById('particles-js')
        if (container) {
          const renderer = new window.THREE.WebGLRenderer({ alpha: true, antialias: true })
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          renderer.setSize(container.clientWidth, container.clientHeight)
          Object.assign(renderer.domElement.style, { position: 'absolute', inset: '0', pointerEvents: 'none' })
          container.appendChild(renderer.domElement)

          const scene = new window.THREE.Scene()
          const camera = new window.THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 1000)
          camera.position.z = 200

          const geometry = new window.THREE.BufferGeometry()
          const starCount = isMobile ? 140 : 280
          const positions = new Float32Array(starCount * 3)
          for (let i = 0; i < starCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 600
            positions[i * 3 + 1] = (Math.random() - 0.5) * 400
            positions[i * 3 + 2] = (Math.random() - 0.5) * 300
          }
          geometry.setAttribute('position', new window.THREE.BufferAttribute(positions, 3))
          const material = new window.THREE.PointsMaterial({ color: 0xffffff, size: 1.2, sizeAttenuation: true, transparent: true, opacity: 0.6 })
          const stars = new window.THREE.Points(geometry, material)
          scene.add(stars)

          let mouseX = 0, mouseY = 0
          if (!isMobile) {
            document.addEventListener('mousemove', e => {
              mouseX = (e.clientX / window.innerWidth - 0.5) * 2
              mouseY = (e.clientY / window.innerHeight - 0.5) * 2
            })
          }

          function tick() {
            stars.rotation.y += 0.0007
            stars.rotation.x += 0.0003
            camera.position.x += (mouseX * 10 - camera.position.x) * 0.02
            camera.position.y += (-mouseY * 10 - camera.position.y) * 0.02
            renderer.render(scene, camera)
            requestAnimationFrame(tick)
          }
          tick()

          window.addEventListener('resize', () => {
            renderer.setSize(container.clientWidth, container.clientHeight)
            camera.aspect = container.clientWidth / container.clientHeight
            camera.updateProjectionMatrix()
          })
        }
      }

      particlesInitialized.current = true
    }

    // Check if scripts are already loaded
    if (typeof window !== 'undefined' && window.particlesJS) {
      initParticles()
    } else {
      // Wait for scripts to load
      const checkScripts = setInterval(() => {
        if (typeof window !== 'undefined' && window.particlesJS) {
          initParticles()
          clearInterval(checkScripts)
        }
      }, 100)

      // Cleanup after 10 seconds
      setTimeout(() => clearInterval(checkScripts), 10000)
    }
  }, [])

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const btn = form.querySelector('.modal-submit') as HTMLButtonElement
    const originalText = btn.innerHTML
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
    btn.disabled = true

    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado! Te contactaremos pronto'
      btn.style.background = 'var(--success)'
      console.log('Form Data:', data)
      setTimeout(() => {
        setContactModalActive(false)
        form.reset()
        btn.innerHTML = originalText
        btn.disabled = false
        btn.style.background = 'linear-gradient(135deg, var(--primary), var(--accent))'
      }, 2000)
    }, 1500)
  }

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      <header id="header" style={headerStyle}>
        <nav>
          <a href="#inicio" className="logo">
            <Image src="/logo.png" alt="GeoGIS Solutions" width={120} height={40} />
          </a>
          <ul className={`nav-links ${navLinksActive ? 'active' : ''}`} id="navLinks">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#tecnologias">Tecnologías</a></li>
            <li><a href="#industrias">Industrias</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
          <button className="mobile-toggle" onClick={() => setNavLinksActive(!navLinksActive)}>
            <i className={`fas ${navLinksActive ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          <a href="#contacto" className="cta-btn" onClick={(e) => { e.preventDefault(); setContactModalActive(true); }}>Consulta Gratis</a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div id="particles-js" aria-hidden="true"></div>
        <div className="hero-container">
          <div className="hero-content">
            <h1>Inteligencia geoespacial para decidir mejor</h1>
            <p>Convertimos datos territoriales en mapas, tableros y aplicaciones que apoyan decisiones de gobierno y empresa. Trabajamos con ArcGIS y metodologías claras para entregar resultados medibles.</p>
            <div className="hero-buttons">
              <a href="#productos" className="btn-primary"><i className="fas fa-map"></i> Explorar Soluciones</a>
              <a href="#contacto" className="btn-secondary" onClick={(e) => { e.preventDefault(); setContactModalActive(true); }}>Consulta Gratuita</a>
            </div>
          </div>
          <div className="hero-image">
            <Image src="/compu.jpg" alt="Dashboard GIS Interactivo" width={600} height={400} priority />
          </div>
        </div>
      </section>

      <section className="features" id="servicios">
        <div className="container">
          <h2 className="section-title">¿Por Qué Elegirnos?</h2>
          <p className="section-subtitle">Combinamos experiencia con ArcGIS, metodologías claras y buenas prácticas para entregar entregables listos para usar</p>
          <div className="features-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon"><i className="fas fa-desktop"></i></div>
              <h3>Experiencia con ArcGIS</h3>
              <p>Proyectos desarrollados con ArcGIS Pro y ArcGIS Online, automatizaciones con Python/ArcPy y capacidad para integrar diversas fuentes de datos territoriales.</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon"><i className="fas fa-file-contract"></i></div>
              <h3>Entregables Claros</h3>
              <p>Mapas, dashboards y reportes listos para usar. Documentación completa y formatos estándar que facilitan la adopción y el uso inmediato.</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon"><i className="fas fa-rocket"></i></div>
              <h3>Implementación Ágil</h3>
              <p>De prototipos a producción con buenas prácticas de datos. Metodología iterativa que permite validar resultados en cada etapa del proyecto.</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon"><i className="fas fa-chalkboard-teacher"></i></div>
              <h3>Acompañamiento</h3>
              <p>Capacitación básica y transferencia de conocimiento al cierre. Tu equipo quedará preparado para usar y mantener las soluciones implementadas.</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
              <h3>Buenas Prácticas de Datos</h3>
              <p>Control de accesos, respaldo periódico y permisos por rol. Estructura de datos ordenada y documentada para facilitar el mantenimiento.</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon"><i className="fas fa-chart-line"></i></div>
              <h3>Estudios de Mercado Territoriales</h3>
              <p>Análisis de ubicación de competencia, densidad poblacional, seguridad y características del entorno para ubicar zonas estratégicas de negocio.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="visual-showcase">
        <div className="particles-layer" id="particles-visual"></div>
        <div className="container">
          <h2 className="section-title">Nuestras Soluciones en Acción</h2>
          <p className="section-subtitle">Descubre cómo convertimos datos territoriales en herramientas útiles para la toma de decisiones</p>
          <div className="showcase-grid">
            <div className="showcase-item">
              <Image src="/layer2.png" alt="Análisis Geoespacial Multidimensional" width={400} height={250} loading="lazy" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div className="showcase-overlay">
                <h4>Análisis Multidimensional</h4>
                <p>Procesamiento de múltiples capas de datos para análisis complejos</p>
              </div>
            </div>
            <div className="showcase-item">
              <Image src="/web.png" alt="Mapas Interactivos WebGIS" width={400} height={250} loading="lazy" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div className="showcase-overlay">
                <h4>WebGIS Interactivo</h4>
                <p>Plataformas web accesibles con herramientas de consulta y análisis</p>
              </div>
            </div>
            <div className="showcase-item">
              <Image src="/dashborads.jpg" alt="Dashboards Ejecutivos" width={400} height={250} loading="lazy" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div className="showcase-overlay">
                <h4>Dashboards Ejecutivos</h4>
                <p>Tableros con indicadores territoriales para decisiones estratégicas</p>
              </div>
            </div>
            <div className="showcase-item">
              <Image src="/gis.png" alt="Análisis Territorial" width={400} height={250} loading="lazy" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div className="showcase-overlay">
                <h4>Análisis Territorial</h4>
                <p>Estudios de idoneidad y evaluación de alternativas de ubicación</p>
              </div>
            </div>
            <div className="showcase-item">
              <Image src="/layer.png" alt="Capas de Análisis Espacial" width={400} height={250} loading="lazy" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div className="showcase-overlay">
                <h4>Análisis Multicapa</h4>
                <p>Superposición de datasets para insights territoriales profundos</p>
              </div>
            </div>
            <div className="showcase-item">
              <Image src="/graficos.png" alt="Aplicaciones Móviles de Campo" width={400} height={250} loading="lazy" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div className="showcase-overlay">
                <h4>Soluciones Móviles</h4>
                <p>Aplicaciones para recolección y actualización de datos en campo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products" id="productos">
        <div className="particles-layer" id="particles-products"></div>
        <div className="container">
          <h2 className="section-title">Portafolio de Soluciones</h2>
          <p className="section-subtitle">Desde mapas básicos hasta infraestructura empresarial completa, tenemos la solución adecuada para tu necesidad</p>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-badge">Básico</div>
              <h3>Mapas e Informes Estáticos</h3>
              <ul>
                <li>Mapas en alta resolución (PNG, JPEG, PDF)</li>
                <li>Informes geográficos profesionales</li>
                <li>Análisis espacial básico</li>
                <li>Cartografía temática personalizada</li>
                <li>Ideal para reportes y presentaciones</li>
              </ul>
            </div>
            <div className="product-card">
              <div className="product-badge">Intermedio</div>
              <h3>Dashboards Interactivos</h3>
              <ul>
                <li>ArcGIS Dashboards con indicadores y filtros</li>
                <li>Widgets interactivos y KPIs territoriales</li>
                <li>Actualización según fuente de datos</li>
                <li>Integración con bases de datos existentes</li>
                <li>Perfecto para monitoreo operativo</li>
              </ul>
            </div>
            <div className="product-card">
              <div className="product-badge">Estándar</div>
              <h3>WebGIS Interactivo</h3>
              <ul>
                <li>Mapas web accesibles desde cualquier dispositivo</li>
                <li>Herramientas de consulta y análisis integradas</li>
                <li>Interfaz responsive y personalizable</li>
                <li>Permisos por usuario y control de acceso</li>
                <li>Capacitación básica incluida</li>
              </ul>
            </div>
            <div className="product-card">
              <div className="product-badge">Avanzado</div>
              <h3>Aplicaciones Móviles de Campo</h3>
              <ul>
                <li>Field Maps para levantamiento de datos en campo</li>
                <li>Survey123 para recolección estructurada</li>
                <li>QuickCapture para registro rápido</li>
                <li>Sincronización offline/online</li>
                <li>Optimizado para tablets y smartphones</li>
              </ul>
            </div>
            <div className="product-card">
              <div className="product-badge">Enterprise</div>
              <h3>Infraestructura GIS</h3>
              <ul>
                <li>Configuración de ArcGIS Enterprise</li>
                <li>Servidor de mapas y bases de datos geoespaciales</li>
                <li>Gestión avanzada de geodatabases</li>
                <li>Integración con sistemas existentes</li>
                <li>Arquitectura escalable y documentada</li>
              </ul>
            </div>
            <div className="product-card">
              <div className="product-badge">A Demanda</div>
              <h3>Análisis Avanzado</h3>
              <ul>
                <li>Modelos espaciales específicos (idoneidad territorial)</li>
                <li>Estudios de mercado territoriales detallados</li>
                <li>Teledetección con Sentinel/Landsat (según proyecto)</li>
                <li>Visualización 3D (cuando datos lo justifican)</li>
                <li>Solución completamente personalizada</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="technologies" id="tecnologias">
        <div className="container">
          <h2 className="section-title">Tecnología Comprobada</h2>
          <p className="section-subtitle">Utilizamos herramientas ampliamente utilizadas en la industria para garantizar soluciones estables y escalables</p>
          <div className="tech-grid">
            <div className="tech-content">
              <h3>Stack Tecnológico Principal</h3>
              <p>Nuestro expertise se centra en ArcGIS y tecnologías complementarias probadas, integrando lo mejor de cada herramienta para crear soluciones efectivas y mantenibles.</p>
              <div className="tech-list">
                <div className="tech-item">
                  <div className="tech-icon"><i className="fas fa-desktop"></i></div>
                  <div><strong>ArcGIS Pro</strong><br /><small>Análisis espacial avanzado</small></div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon"><i className="fas fa-cloud"></i></div>
                  <div><strong>ArcGIS Online</strong><br /><small>Plataforma en la nube</small></div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon"><i className="fab fa-python"></i></div>
                  <div><strong>Python & ArcPy</strong><br /><small>Automatización de procesos</small></div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon"><i className="fas fa-code"></i></div>
                  <div><strong>ArcGIS API for JavaScript</strong><br /><small>Desarrollo web</small></div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon"><i className="fas fa-satellite"></i></div>
                  <div><strong>Sentinel & Landsat</strong><br /><small>Imágenes satelitales (opcional)</small></div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon"><i className="fas fa-chart-bar"></i></div>
                  <div><strong>Power BI & Tableau</strong><br /><small>Business Intelligence (opcional)</small></div>
                </div>
              </div>
              <a href="#contacto" className="btn-primary" onClick={(e) => { e.preventDefault(); setContactModalActive(true); }}><i className="fas fa-cogs"></i> Conocer Más Detalles</a>
            </div>
            <div className="tech-image">
              <Image src="/elevacion.jpg" alt="ArcGIS Pro - Análisis Territorial" width={400} height={300} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="industries" id="industrias">
        <div className="particles-layer" id="particles-industries"></div>
        <div className="container">
          <h2 className="section-title">Sectores que Atendemos</h2>
          <p className="section-subtitle">Trabajamos para sectores estratégicos con soluciones especializadas que generan valor real</p>
          <div className="industries-grid">
            <div className="industry-card">
              <h4><i className="fas fa-landmark"></i> Gobierno y Sector Público</h4>
              <p>Catastro digital, planificación urbana, gestión de servicios públicos y transparencia gubernamental</p>
            </div>
            <div className="industry-card">
              <h4><i className="fas fa-city"></i> Planeación Urbana</h4>
              <p>Estudios de crecimiento urbano, zonificación y análisis de densidad</p>
            </div>
            <div className="industry-card">
              <h4><i className="fas fa-vote-yea"></i> Procesos Electorales</h4>
              <p>Análisis electoral territorial, logística de votación, mapeo de tendencias y participación ciudadana</p>
            </div>
            <div className="industry-card">
              <h4><i className="fas fa-truck"></i> Transporte y Logística</h4>
              <p>Optimización de rutas, análisis de tráfico y gestión de flotas</p>
            </div>
            <div className="industry-card">
              <h4><i className="fas fa-leaf"></i> Medio Ambiente</h4>
              <p>Monitoreo ambiental, gestión de recursos naturales, análisis de cambio climático y evaluación de impactos</p>
            </div>
            <div className="industry-card">
              <h4><i className="fas fa-store"></i> Estudios de Mercado Territoriales</h4>
              <p>Análisis de ubicación de competencia, densidad poblacional, seguridad y características del entorno para decisiones comerciales estratégicas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" id="contacto">
        <div className="particles-layer" id="particles-cta"></div>
        <div className="cta-content">
          <h2>¿Tienes un reto territorial?</h2>
          <p>Agendemos una consulta gratuita para entender tu necesidad y proponerte un alcance y entregables concretos.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:info@geogis.solutions" className="btn-primary"><i className="fas fa-envelope"></i> Solicitar Consulta</a>
            <a href="tel:+523334028621" className="btn-secondary"><i className="fas fa-phone"></i> Llamar Ahora</a>
            <button className="btn-secondary" onClick={() => setContactModalActive(true)}><i className="fas fa-comments"></i> Chat Directo</button>
          </div>
        </div>
      </section>

      <footer style={{ background: '#f1f5f9', color: '#1e293b', padding: '4rem 0 2rem' }}>
        <div className="container">
          <div className="footer-content" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '3rem', marginBottom: '3rem', textAlign: 'left' }}>
            <div className="footer-section" style={{ flex: 1, minWidth: '220px' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', color: '#334155' }}>GeoGIS Solutions</h4>
              <p style={{ color: '#475569' }}>Especialistas en soluciones geoespaciales para decisiones estratégicas. Convertimos datos territoriales en herramientas útiles que impulsan el crecimiento y la innovación.</p>
              <div className="social-links" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <a href="#" aria-label="LinkedIn" style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#334155', transition: 'all .3s ease' }}><i className="fab fa-linkedin-in"></i></a>
                <a href="#" aria-label="Twitter" style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#334155', transition: 'all .3s ease' }}><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="Instagram" style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#334155', transition: 'all .3s ease' }}><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="footer-section" style={{ flex: 1, minWidth: '180px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.2rem', color: '#334155' }}>Soluciones Principales</h4>
              <p><a href="#productos" style={{ color: '#475569', textDecoration: 'none' }}>Mapas e Informes</a></p>
              <p><a href="#productos" style={{ color: '#475569', textDecoration: 'none' }}>Dashboards Interactivos</a></p>
              <p><a href="#productos" style={{ color: '#475569', textDecoration: 'none' }}>WebGIS</a></p>
              <p><a href="#productos" style={{ color: '#475569', textDecoration: 'none' }}>Aplicaciones Móviles</a></p>
              <p><a href="#productos" style={{ color: '#475569', textDecoration: 'none' }}>Infraestructura GIS</a></p>
            </div>
            <div className="footer-section" style={{ flex: 1, minWidth: '180px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.2rem', color: '#334155' }}>Sectores Especializados</h4>
              <p><a href="#industrias" style={{ color: '#475569', textDecoration: 'none' }}>Gobierno y Sector Público</a></p>
              <p><a href="#industrias" style={{ color: '#475569', textDecoration: 'none' }}>Planeación Urbana</a></p>
              <p><a href="#industrias" style={{ color: '#475569', textDecoration: 'none' }}>Procesos Electorales</a></p>
              <p><a href="#industrias" style={{ color: '#475569', textDecoration: 'none' }}>Transporte y Logística</a></p>
              <p><a href="#industrias" style={{ color: '#475569', textDecoration: 'none' }}>Estudios de Mercado</a></p>
            </div>
            <div className="footer-section" style={{ flex: 1, minWidth: '220px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.2rem', color: '#334155' }}>Contacto Directo</h4>
              <p style={{ color: '#475569' }}><i className="fas fa-envelope"></i> geogissolutionsmx@gmail.com</p>
              <p style={{ color: '#475569' }}><i className="fas fa-phone"></i> +52 33 3402 8621</p>
              <p style={{ color: '#475569' }}><i className="fas fa-map-marker-alt"></i> Guadalajara, Jalisco, México</p>
              <p style={{ color: '#475569' }}><i className="fas fa-clock"></i> Lun-Vie 9:00 AM - 6:00 PM CST</p>
            </div>
          </div>
          <div className="footer-bottom" style={{ borderTop: '1px solid #cbd5e1', paddingTop: '1.5rem', textAlign: 'center', color: '#64748b' }}>
            <p>&copy; 2025 GeoGIS Solutions. Todos los derechos reservados. | 
              <a href="#" style={{ color: '#475569', textDecoration: 'none' }}> Política de Privacidad</a> | 
              <a href="#" style={{ color: '#475569', textDecoration: 'none' }}> Términos de Servicio</a> | 
              <a href="#" style={{ color: '#475569', textDecoration: 'none' }}> Aviso Legal</a>
            </p>
          </div>
        </div>
      </footer>

      <div className="whatsapp-widget" id="whatsappWidget">
        <div className="whatsapp-button" onClick={() => setWhatsappChatActive(!whatsappChatActive)}>
          <i className="fab fa-whatsapp"></i>
        </div>
        <div className={`whatsapp-chat ${whatsappChatActive ? 'active' : ''}`} id="whatsappChat">
          <div className="whatsapp-header">
            <button className="whatsapp-close" onClick={() => setWhatsappChatActive(false)}>&times;</button>
            <div className="whatsapp-avatar">
              <Image src="/logo.png" alt="GeoGIS" width={24} height={24} style={{ borderRadius: '50%' }} />
            </div>
            <div className="whatsapp-info">
              <h4>GeoGIS Solutions</h4>
              <div className="whatsapp-status"><span className="status-dot"></span>Generalmente responde en pocos minutos</div>
            </div>
          </div>
          <div className="whatsapp-body">
            <div className="whatsapp-message">¡Hola! 👋 Soy especialista en soluciones GIS. ¿En qué puedo ayudarte hoy?</div>
            <div className="whatsapp-options">
              <a href="https://wa.me/523334028621?text=Hola%2C%20me%20interesa%20conocer%20sus%20soluciones%20GIS%20para%20mi%20empresa" className="whatsapp-option"><i className="fas fa-building"></i>Soluciones para mi organización</a>
              <a href="https://wa.me/523334028621?text=Necesito%20una%20consulta%20gratuita%20sobre%20an%C3%A1lisis%20territorial" className="whatsapp-option"><i className="fas fa-comments"></i>Consulta gratuita</a>
              <a href="https://wa.me/523334028621?text=Me%20interesa%20un%20estudio%20de%20mercado%20territorial" className="whatsapp-option"><i className="fas fa-map-marked-alt"></i>Estudio de mercado territorial</a>
              <a href="https://wa.me/523334028621?text=Tengo%20un%20proyecto%20espec%C3%ADfico%20que%20requiere%20an%C3%A1lisis%20geoespacial" className="whatsapp-option"><i className="fas fa-project-diagram"></i>Proyecto específico</a>
            </div>
          </div>
          <div className="whatsapp-footer">
            <a href="https://wa.me/523334028621?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20GeoGIS%20Solutions"><i className="fab fa-whatsapp"></i>Iniciar conversación</a>
          </div>
        </div>
      </div>

      <div className={`contact-modal ${contactModalActive ? 'active' : ''}`} id="contactModal" onClick={(e) => { if (e.target === e.currentTarget) setContactModalActive(false); }}>
        <div className="modal-content">
          <button className="modal-close" onClick={() => setContactModalActive(false)}>&times;</button>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)', textAlign: 'center' }}><i className="fas fa-map"></i> Consulta Gratuita Personalizada</h3>
          <form className="modal-form" id="contactForm" onSubmit={handleContactSubmit}>
            <input type="text" name="name" placeholder="Nombre completo *" required />
            <input type="email" name="email" placeholder="Email corporativo *" required />
            <input type="tel" name="phone" placeholder="Teléfono" />
            <input type="text" name="company" placeholder="Empresa u organización" />
            <select name="industry">
              <option value="">Selecciona tu sector</option>
              <option value="gobierno">Gobierno y Sector Público</option>
              <option value="planeacion">Planeación Urbana</option>
              <option value="electoral">Procesos Electorales</option>
              <option value="transporte">Transporte y Logística</option>
              <option value="ambiente">Medio Ambiente</option>
              <option value="mercado">Estudios de Mercado Territoriales</option>
              <option value="otro">Otro</option>
            </select>
            <select name="service">
              <option value="">¿Qué tipo de solución necesitas?</option>
              <option value="mapas">Mapas e Informes Estáticos</option>
              <option value="dashboards">Dashboards Interactivos</option>
              <option value="webgis">WebGIS Interactivo</option>
              <option value="movil">Aplicaciones Móviles</option>
              <option value="enterprise">Infraestructura GIS</option>
              <option value="analisis">Análisis Avanzado</option>
              <option value="mercado_territorial">Estudio de Mercado Territorial</option>
              <option value="no_seguro">No estoy seguro</option>
            </select>
            <textarea name="message" placeholder="Describe tu reto territorial, necesidades específicas o desafíos que enfrentas..."></textarea>
            <button type="submit" className="modal-submit"><i className="fas fa-paper-plane"></i> Enviar Consulta</button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
            <p style={{ color: '#64748b', fontSize: '.9rem', marginBottom: '1rem' }}>También puedes contactarnos directamente:</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="mailto:info@geogis.solutions" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '.5rem' }}><i className="fas fa-envelope"></i> info@geogis.solutions</a>
              <a href="tel:+523334028621" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '.5rem' }}><i className="fas fa-phone"></i> +52 33 4028 6621</a>
              <a href="https://wa.me/523334028621" style={{ color: 'var(--success)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '.5rem' }}><i className="fab fa-whatsapp"></i> WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

