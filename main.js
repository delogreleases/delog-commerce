/* Delog Commerce · Tillora website. Fill in SITE once, every button picks it up. */
const SITE = {
  /** Where "Download" goes: a stable link to the latest installer (e.g. GitHub Releases). Empty: scrolls to the download section. */
  download: 'https://github.com/delogreleases/tillora-releases/releases/latest/download/Tillora-Setup.exe',
  /** WhatsApp number with country code, digits only (e.g. 919876543210). Empty: opens WhatsApp without a chat picked. */
  whatsapp: '916382026795',
  email: 'support.delogcommerce@gmail.com',
  /** What the WhatsApp button types in for the visitor. */
  whatsappText: 'Hi! I saw Tillora on your website and would like to know more.'
}

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------- links from SITE ----------
document.querySelectorAll('[data-download]').forEach((a) => {
  if (SITE.download) a.href = SITE.download
  else if (a.getAttribute('href') === '#') a.href = '#download'
})
document.querySelectorAll('[data-whatsapp]').forEach((a) => {
  a.href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappText)}`
  a.target = '_blank'
  a.rel = 'noopener'
})
document.querySelectorAll('[data-email]').forEach((a) => {
  if (SITE.email) a.href = `mailto:${SITE.email}`
  else a.remove()
})
document.querySelectorAll('[data-year]').forEach((s) => (s.textContent = String(new Date().getFullYear())))

// ---------- mobile menu ----------
const nav = document.querySelector('.nav')
const menu = document.querySelector('.nav-menu')
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open')
  menu.setAttribute('aria-expanded', String(open))
})
document.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', () => nav.classList.remove('open')))

// ---------- reveal on scroll ----------
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      e.target.classList.add('in')
      io.unobserve(e.target)
    }
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
)
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`
  io.observe(el)
})

// ---------- hero 3D stage follows the pointer ----------
const stage = document.querySelector('[data-tilt-stage]')
if (stage && !reduced) {
  let raf = 0
  window.addEventListener('pointermove', (e) => {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      stage.style.setProperty('--mx', x.toFixed(3))
      stage.style.setProperty('--my', y.toFixed(3))
    })
  })
}

// ---------- tilt cards ----------
if (!reduced && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      el.style.transform = `rotateY(${(x - 0.5) * 10}deg) rotateX(${(0.5 - y) * 8}deg) translateZ(0)`
      el.style.setProperty('--gx', `${x * 100}%`)
      el.style.setProperty('--gy', `${y * 100}%`)
    })
    el.addEventListener('pointerleave', () => {
      el.style.transform = ''
    })
  })
}

// ---------- 3D coverflow ----------
const flow = document.querySelector('.coverflow')
if (flow) {
  const items = [...flow.querySelectorAll('figure')]
  const caption = document.querySelector('.cf-caption')
  const dots = document.querySelector('.cf-dots')
  let index = 0
  items.forEach((_, i) => {
    const b = document.createElement('button')
    b.setAttribute('aria-label', `Screenshot ${i + 1}`)
    b.addEventListener('click', () => go(i))
    dots.append(b)
  })
  const go = (i) => {
    index = (i + items.length) % items.length
    items.forEach((f, n) => {
      let d = n - index
      if (d > items.length / 2) d -= items.length
      if (d < -items.length / 2) d += items.length
      const a = Math.abs(d)
      f.classList.toggle('active', d === 0)
      f.style.zIndex = String(100 - a)
      f.style.opacity = a > 2 ? '0' : String(1 - a * 0.22)
      f.style.filter = a ? `brightness(${1 - a * 0.25})` : ''
      f.style.pointerEvents = a > 2 ? 'none' : ''
      f.style.transform = `translateX(${d * 42}%) translateZ(${-a * 240}px) rotateY(${-Math.sign(d) * Math.min(a, 2) * 28}deg)`
    })
    ;[...dots.children].forEach((b, n) => b.classList.toggle('on', n === index))
    caption.querySelector('h3').textContent = items[index].dataset.title
    caption.querySelector('p').textContent = items[index].dataset.text
  }
  items.forEach((f, n) => f.addEventListener('click', () => n !== index && go(n)))
  document.querySelectorAll('[data-cf]').forEach((b) => b.addEventListener('click', () => go(index + Number(b.dataset.cf))))
  flow.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') go(index + 1)
    if (e.key === 'ArrowLeft') go(index - 1)
  })
  // Swipe on touch screens.
  let startX = null
  flow.addEventListener('pointerdown', (e) => (startX = e.clientX))
  flow.addEventListener('pointerup', (e) => {
    if (startX === null) return
    const dx = e.clientX - startX
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
    startX = null
  })
  go(0)
  // Moves on by itself until the visitor takes over.
  let auto = reduced ? 0 : setInterval(() => go(index + 1), 4200)
  const stop = () => {
    clearInterval(auto)
    auto = 0
  }
  flow.addEventListener('pointerdown', stop)
  document.querySelectorAll('[data-cf], .cf-dots').forEach((b) => b.addEventListener('click', stop))
}

// ---------- light / dark compare ----------
document.querySelectorAll('.compare').forEach((c) => {
  const range = c.querySelector('input')
  range.addEventListener('input', () => c.style.setProperty('--pos', `${range.value}%`))
})

// ---------- count-up numbers ----------
const counters = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      counters.unobserve(e.target)
      const el = e.target
      const end = Number(el.dataset.count)
      const pre = el.dataset.prefix ?? ''
      const post = el.dataset.suffix ?? ''
      if (reduced || end < 5) continue
      const t0 = performance.now()
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 1400)
        el.textContent = `${pre}${Math.round(end * (1 - Math.pow(1 - k, 3)))}${post}`
        if (k < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
  },
  { threshold: 0.6 }
)
document.querySelectorAll('[data-count]').forEach((el) => counters.observe(el))
