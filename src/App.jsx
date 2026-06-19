import { useRef, useEffect } from 'react'
import './App.css'

const carouselRow1 = [
  { bg: 'linear-gradient(135deg, #8B6914 0%, #3d2e0a 100%)', nav: ['Network', 'Manifesto', 'Principles', 'Insights'], title: '', overlay: true },
  { bg: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)', nav: ['Portfolio', 'Team', 'Network', 'Manifesto', 'Principles', 'Insights'], title: 'The next era of intelligence is being built. We map it. We back what\'s next.', overlay: true },
  { bg: '#f5f0e8', nav: [], title: '', dark: true, brand: 'i-D' },
  { bg: 'linear-gradient(135deg, #2d8a4e 0%, #1a5c30 100%)', nav: [], title: 'Chase the Match', brand: 'Tripadvisor' },
  { bg: 'linear-gradient(135deg, #4ecdc4 0%, #2d9a8f 100%)', nav: ['Product', 'Solutions', 'Security', 'Customers', 'Company'], title: 'ORO turns your data into digital gold', brand: 'ORO' },
  { bg: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)', nav: [], title: 'We build', brand: '' },
]

const carouselRow2 = [
  { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', nav: [], title: 'Creative Design Studio', brand: '' },
  { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', nav: ['Home', 'About', 'Work', 'Contact'], title: 'We create digital experiences', brand: '' },
  { bg: '#1a1a1a', nav: ['Product', 'Solutions', 'Security', 'Customers', 'Company'], title: '', brand: 'LEGORA', overlay: true },
  { bg: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', nav: [], title: 'Reimagine Everything', brand: '' },
  { bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', nav: ['Services', 'Portfolio', 'About'], title: '', dark: true, brand: '' },
  { bg: 'linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)', nav: [], title: 'Build the Future', brand: '' },
]

const logos = [
  'Dribbble', 'LEGORA', 'zapier', 'perplexity',
  'Cal.com', 'mixpanel', 'miro', 'DOORDASH',
]

function CarouselCard({ card }) {
  return (
    <div className="carousel-card" style={{ background: card.bg }}>
      {card.nav.length > 0 && (
        <div className={`card-nav ${card.dark ? 'dark' : ''}`}>
          {card.nav.map((item, i) => <span key={i}>{item}</span>)}
          {card.brand && <span className="card-brand-nav">{card.brand}</span>}
        </div>
      )}
      {card.brand && card.nav.length === 0 && (
        <div className={`card-brand ${card.dark ? 'dark' : ''}`}>{card.brand}</div>
      )}
      {card.title && (
        <div className={`card-title ${card.dark ? 'dark' : ''}`}>{card.title}</div>
      )}
      {card.overlay && <div className="card-overlay" />}
    </div>
  )
}

function InfiniteCarousel({ items, direction = 'left', speed = 40 }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let animationId
    let position = 0
    const totalWidth = track.scrollWidth / 2

    const animate = () => {
      if (direction === 'left') {
        position -= speed / 60
        if (position <= -totalWidth) position += totalWidth
      } else {
        position += speed / 60
        if (position >= 0) position -= totalWidth
      }
      track.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    if (direction === 'right') {
      position = -totalWidth
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [direction, speed])

  return (
    <div className="carousel-wrapper">
      <div className="carousel-track" ref={trackRef}>
        {items.map((card, i) => <CarouselCard key={i} card={card} />)}
        {items.map((card, i) => <CarouselCard key={`dup-${i}`} card={card} />)}
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="nav-left">
            <a href="/" className="logo" aria-label="Framer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M4 0h16v8H12L4 0zm0 8h8l8 8H4V8zm0 8h8v8L4 16z" />
              </svg>
            </a>
            <ul className="nav-links">
              <li><a href="#">Product</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Enterprise</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>
          <div className="nav-right">
            <a href="#" className="nav-link-auth">Log in</a>
            <a href="#" className="btn-signup">Sign up</a>
          </div>
          <button className="mobile-menu-btn" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <a href="#" className="announcement">
            <span className="announcement-label">Framer 3.0 is here</span>
            <span className="announcement-link">See everything we shipped →</span>
          </a>
          <h1 className="hero-heading">
            Design with agents.<br />
            Refine on the canvas.<br />
            Ship with your team.
          </h1>
          <div className="hero-buttons">
            <a href="#" className="btn-primary">Get started for free</a>
            <a href="#" className="btn-secondary">Download app</a>
          </div>
        </div>

        <div className="hero-preview">
          <div className="preview-window">
            <div className="preview-toolbar">
              <div className="toolbar-left">
                <div className="toolbar-icon-group">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M4 0h16v8H12L4 0zm0 8h8l8 8H4V8zm0 8h8v8L4 16z" />
                  </svg>
                  <span>Canvas</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="rgba(255,255,255,0.5)">
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
                <div className="toolbar-icons">
                  <span className="toolbar-icon">+</span>
                  <span className="toolbar-icon">⊡</span>
                  <span className="toolbar-icon">T</span>
                  <span className="toolbar-icon">△</span>
                </div>
              </div>
              <div className="toolbar-center">
                <span>Site</span>
                <span className="toolbar-dot">·</span>
                <span className="branch-badge">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="rgba(255,255,255,0.6)">
                    <circle cx="5" cy="4" r="2" stroke="currentColor" fill="none"/>
                    <circle cx="5" cy="12" r="2" stroke="currentColor" fill="none"/>
                    <circle cx="11" cy="8" r="2" stroke="currentColor" fill="none"/>
                    <line x1="5" y1="6" x2="5" y2="10" stroke="currentColor"/>
                    <line x1="7" y1="4" x2="9" y2="6" stroke="currentColor"/>
                  </svg>
                  main
                </span>
              </div>
              <div className="toolbar-right">
                <div className="avatar-group">
                  <div className="avatar"></div>
                  <div className="avatar"></div>
                  <span className="avatar-count">12</span>
                </div>
                <button className="btn-toolbar-play">▶</button>
                <button className="btn-invite">Invite</button>
                <button className="btn-publish">Publish</button>
              </div>
            </div>

            <div className="preview-body">
              <div className="preview-sidebar">
                <div className="sidebar-tabs">
                  <span className="tab active">Pages</span>
                  <span className="tab">Layers</span>
                  <span className="tab">Assets</span>
                </div>
                <div className="sidebar-search">
                  <span className="search-icon">🔍</span>
                  <span>Search...</span>
                </div>
                <div className="sidebar-viewport">
                  <div className="viewport-item">
                    <span className="play-icon">▶</span>
                    <span>Desktop</span>
                    <span className="viewport-size">1200</span>
                    <span className="viewport-add">+</span>
                  </div>
                </div>
                <div className="sidebar-pages">
                  <div className="pages-header">
                    <span>Pages</span>
                    <span className="pages-add">+</span>
                  </div>
                  <div className="page-item active">
                    <span className="page-icon">🏠</span>
                    <span>Home</span>
                  </div>
                  <div className="page-item sub">
                    <span className="page-icon">📄</span>
                    <span>/work</span>
                  </div>
                  <div className="page-item sub-child">
                    <span className="page-icon">📋</span>
                    <span>Work Pages</span>
                  </div>
                  <div className="page-item sub">
                    <span className="page-icon">📄</span>
                    <span>/services</span>
                  </div>
                </div>
              </div>

              <div className="preview-canvas">
                <div className="canvas-content">
                  <div className="canvas-nav">
                    <span className="canvas-brand">HAUS</span>
                    <div className="canvas-nav-links">
                      <span>Work</span>
                      <span>Services</span>
                      <span>About</span>
                      <span>Get in Touch</span>
                    </div>
                  </div>
                  <div className="canvas-hero-text">
                    <p>We are a multidisciplinary</p>
                    <p>creative studio specializing</p>
                  </div>
                </div>
              </div>

              <div className="preview-panel">
                <div className="panel-tabs">
                  <span className="tab active">Agent</span>
                  <span className="tab">Style</span>
                </div>
                <div className="panel-content">
                  <div className="panel-dropdown">
                    <span>New Hero Ticker</span>
                    <div className="panel-actions">
                      <span>⌄</span>
                      <span>+</span>
                    </div>
                  </div>
                  <div className="panel-prompt">
                    <p>Add a 3D image ticker to the hero section and write a short introduction about Haus studio.</p>
                  </div>
                  <div className="panel-images">
                    <div className="panel-thumb"></div>
                    <div className="panel-thumb"></div>
                    <div className="panel-thumb"></div>
                    <span className="panel-refresh">↻</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shipped-section">
        <div className="shipped-header">
          <h2 className="shipped-title">Shipped with Framer</h2>
          <a href="#" className="btn-see-sites">See Framer sites</a>
        </div>

        <div className="carousels">
          <InfiniteCarousel items={carouselRow1} direction="left" speed={30} />
          <InfiniteCarousel items={carouselRow2} direction="right" speed={30} />
        </div>

        <div className="logos-grid">
          {logos.map((name, i) => (
            <div key={i} className="logo-item">{name}</div>
          ))}
        </div>
      </section>
    </>
  )
}

export default App
