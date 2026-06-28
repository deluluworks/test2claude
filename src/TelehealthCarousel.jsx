import { useState, useEffect, useRef, useCallback } from 'react'
import './TelehealthCarousel.css'

const DATA = {
  skincare: [
    { name: 'Tretinoin 0.025%', dose: 'Night cream · 30g', price: '$32 / mo' },
    { name: 'Clindamycin + Niacinamide', dose: 'Clarifying gel · 30ml', price: '$28 / mo' },
    { name: 'Azelaic Acid 15%', dose: 'Brightening cream · 50g', price: '$30 / mo' },
    { name: 'Vitamin C + Tranexamic', dose: 'Day serum · 30ml', price: '$34 / mo' },
  ],
  hair: [
    { name: 'Finasteride 1mg', dose: 'Daily tablet · 30ct', price: '$22 / mo' },
    { name: 'Minoxidil 5%', dose: 'Topical foam · 60ml', price: '$18 / mo' },
    { name: 'Oral Minoxidil 2.5mg', dose: 'Daily tablet · 30ct', price: '$25 / mo' },
    { name: 'Ketoconazole 2%', dose: 'Antifungal shampoo · 120ml', price: '$20 / mo' },
  ],
}

function TelehealthCarousel({ accent = '#C2603F', autoplay = true, interval = 4.5 }) {
  const [category, setCategory] = useState('skincare')
  const [index, setIndex] = useState(0)
  const [trackTransform, setTrackTransform] = useState('translateX(0px)')
  const viewportRef = useRef(null)
  const cardRefs = useRef([])
  const pausedRef = useRef(false)

  const items = DATA[category]

  const recompute = useCallback(() => {
    const vp = viewportRef.current
    const card = cardRefs.current[index]
    if (!vp || !card) return
    const tx = vp.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2)
    setTrackTransform(`translateX(${tx}px)`)
  }, [index])

  useEffect(() => {
    recompute()
    const onResize = () => {
      requestAnimationFrame(recompute)
    }
    window.addEventListener('resize', onResize)
    if (document.fonts?.ready) document.fonts.ready.then(recompute)
    const t = setTimeout(recompute, 200)
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(t)
    }
  }, [recompute])

  useEffect(() => {
    if (!autoplay) return
    const ms = interval * 1000
    const timer = setInterval(() => {
      if (!pausedRef.current) {
        setIndex(prev => (prev + 1) % items.length)
      }
    }, ms)
    return () => clearInterval(timer)
  }, [autoplay, interval, items.length])

  const switchCategory = (cat) => {
    if (cat === category) return
    cardRefs.current = []
    setCategory(cat)
    setIndex(0)
  }

  const next = () => setIndex(prev => (prev + 1) % items.length)
  const prev = () => setIndex(prev => (prev - 1 + items.length) % items.length)
  const go = (i) => setIndex(i)

  const counter = `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`

  return (
    <div className="th-root">
      <div className="th-header">
        <div>
          <div className="th-eyebrow">Meridian · Telehealth</div>
          <h2 className="th-title">
            Prescription skincare &amp; hair,<br />
            <em className="th-title-accent" style={{ color: accent }}>delivered.</em>
          </h2>
        </div>
        <div className="th-tabs-wrapper">
          <div className="th-tabs-label">Shop by</div>
          <div className="th-tabs">
            <button
              className={`th-tab ${category === 'skincare' ? 'active' : ''}`}
              style={{ borderBottomColor: category === 'skincare' ? accent : 'transparent' }}
              onClick={() => switchCategory('skincare')}
            >
              Skincare
            </button>
            <button
              className={`th-tab ${category === 'hair' ? 'active' : ''}`}
              style={{ borderBottomColor: category === 'hair' ? accent : 'transparent' }}
              onClick={() => switchCategory('hair')}
            >
              Hair
            </button>
          </div>
        </div>
      </div>

      <div
        className="th-viewport"
        ref={viewportRef}
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
      >
        <div className="th-mover" style={{ transform: trackTransform }}>
          <div className="th-track">
            {items.map((item, i) => {
              const tag = `${category === 'skincare' ? 'SKIN' : 'HAIR'} / ${String(i + 1).padStart(2, '0')}`
              const isActive = i === index
              return (
                <div
                  key={`${category}-${i}`}
                  className="th-slide"
                  ref={el => { cardRefs.current[i] = el }}
                >
                  <div
                    className="th-card-scaler"
                    onClick={() => go(i)}
                    style={{
                      transform: isActive ? 'scale(1)' : 'scale(.8)',
                      opacity: isActive ? 1 : 0.34,
                      filter: isActive ? 'none' : 'saturate(.45)',
                    }}
                  >
                    <div className="th-card-image">
                      <div className="th-card-rx">℞ Rx</div>
                      <div className="th-card-tag">{tag}</div>
                      <div className="th-card-placeholder">PRODUCT SHOT</div>
                    </div>
                    <div className="th-card-info">
                      <div>
                        <h3 className="th-card-name">{item.name}</h3>
                        <div className="th-card-dose">{item.dose}</div>
                      </div>
                      <div className="th-card-price">{item.price}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="th-controls">
        <div className="th-counter">{counter}</div>
        <div className="th-dots">
          {items.map((_, i) => (
            <button key={i} className="th-dot-btn" onClick={() => go(i)}>
              <span
                className="th-dot-bar"
                style={{
                  width: i === index ? '32px' : '14px',
                  background: i === index ? accent : 'rgba(22,21,15,.28)',
                }}
              />
            </button>
          ))}
        </div>
        <div className="th-arrows">
          <button className="th-arrow" onClick={prev}>‹</button>
          <button className="th-arrow" onClick={next}>›</button>
        </div>
      </div>
    </div>
  )
}

export default TelehealthCarousel
