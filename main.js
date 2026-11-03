/* Delog Commerce website (Tillora and Platera). Fill in SITE once, every button picks it up. */
const SITE = {
  /** Where "Download" goes: a stable link to the latest installer (e.g. GitHub Releases). Empty: scrolls to the download section. */
  download: 'https://github.com/delogreleases/tillora-releases/releases/latest/download/Tillora-Setup.exe',
  /** WhatsApp number with country code, digits only (e.g. 919876543210). Empty: opens WhatsApp without a chat picked. */
  whatsapp: '916382026795',
  email: 'support.delogcommerce@gmail.com',
  /** What the WhatsApp button types in for the visitor. */
  whatsappText: 'Hi! I saw Tillora on your website and would like to know more.',
  platera: {
    /** Platera's installer link. Leave empty until Platera is released: its buttons then offer early access on WhatsApp. */
    download: '',
    whatsappText: 'Hi! I saw Platera on your website and would like it for my restaurant.'
  }
}

/** Every Delog Commerce product. Add one here and it appears in the Products menu on every page. */
const PRODUCTS = [
  { key: 'tillora', name: 'Tillora', for: 'Retail shops', colour: '167 139 250', href: 'index.html', icon: 'assets/tillora-icon.svg', shot: 'assets/screens/counter.jpg', points: ['Billing & stock by size', 'GST bills & reports', 'WhatsApp receipts'] },
  { key: 'platera', name: 'Platera', for: 'Restaurants', colour: '255 122 46', href: 'platera.html', icon: 'assets/platera-icon.svg', shot: 'assets/platera/counter-home.jpg', points: ['Table billing & KOTs', 'Kitchen screen', 'Waiter app & QR ordering'] }
]

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------- links from SITE ----------
document.querySelectorAll('[data-download]').forEach((a) => {
  if (SITE.download) a.href = SITE.download
  else if (a.getAttribute('href') === '#') a.href = '#download'
})
document.querySelectorAll('[data-whatsapp]').forEach((a) => {
  const text = a.dataset.whatsapp === 'platera' ? SITE.platera.whatsappText : SITE.whatsappText
  a.href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
  a.target = '_blank'
  a.rel = 'noopener'
})
// Platera: a download once it is released; until then, early access on WhatsApp.
if (SITE.platera.download) {
  document.querySelectorAll('[data-platera-download]').forEach((a) => (a.href = SITE.platera.download))
  document.querySelectorAll('[data-platera-label]').forEach((s) => (s.textContent = 'Download for Windows'))
  document.querySelectorAll('[data-platera-soon]').forEach((s) => s.remove())
  document.querySelectorAll('[data-platera-heading]').forEach((h) => (h.textContent = 'Try Platera free for 14 days'))
} else document.querySelectorAll('[data-platera-only]').forEach((a) => a.remove())
document.querySelectorAll('[data-email]').forEach((a) => {
  if (SITE.email) a.href = `mailto:${SITE.email}`
  else a.remove()
})
document.querySelectorAll('[data-year]').forEach((s) => (s.textContent = String(new Date().getFullYear())))

// ---------- Products menu: the list on the left, a preview of the hovered product on the right ----------
document.querySelectorAll('.pmenu').forEach((menu) => {
  const btn = menu.querySelector('.pmenu-btn')
  const panel = menu.querySelector('.pmenu-panel')
  const here = PRODUCTS.find((p) => p.key === menu.dataset.product) ?? PRODUCTS[0]
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  btn.innerHTML = `<img src="${here.icon}" alt="" /><span>Products</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>`
  panel.innerHTML =
    '<div class="pmenu-list"><div class="pmenu-head">Products</div>' +
    PRODUCTS.map(
      (p, i) =>
        `<a class="pmenu-item" href="${p.href}" data-i="${i}" style="--pc: ${p.colour}"${p === here ? ' aria-current="page"' : ''}><img src="${p.icon}" alt="" /><span><b>${esc(p.name)}</b><small>${esc(p.for)}</small></span>${p === here ? '<span class="here" title="You are here">✓</span>' : ''}</a>`
    ).join('') +
    '<div class="pmenu-soon"><i>+</i>More soon</div></div><div class="pmenu-preview"></div>'
  const items = [...panel.querySelectorAll('.pmenu-item')]
  const preview = panel.querySelector('.pmenu-preview')
  const select = (i) => {
    const p = PRODUCTS[i]
    items.forEach((x, n) => x.classList.toggle('sel', n === i))
    preview.style.setProperty('--pc', p.colour)
    preview.innerHTML = `<img src="${p.shot}" alt="" /><b>${esc(p.name)} for ${esc(p.for.toLowerCase())}</b><ul>${p.points.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>${p === here ? '<span class="pmenu-go here">You’re here</span>' : `<a class="pmenu-go" href="${p.href}">Explore ${esc(p.name)} →</a>`}`
  }
  items.forEach((x, i) => {
    x.addEventListener('mouseenter', () => select(i))
    x.addEventListener('focus', () => select(i))
  })
  // Opens on another product than this one, so the menu shows something new.
  const start = Math.max(0, PRODUCTS.findIndex((p) => p !== here))
  const open = (on) => {
    if (on) select(start)
    panel.hidden = !on
    btn.setAttribute('aria-expanded', String(on))
  }
  btn.addEventListener('click', (e) => {
    e.stopPropagation()
    open(panel.hidden)
  })
  document.addEventListener('click', (e) => !menu.contains(e.target) && open(false))
  document.addEventListener('keydown', (e) => {
    if (panel.hidden) return
    if (e.key === 'Escape') {
      open(false)
      btn.focus()
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const now = items.indexOf(document.activeElement)
      const step = e.key === 'ArrowDown' ? 1 : -1
      items[now < 0 ? 0 : (now + step + items.length) % items.length].focus()
    }
  })
})

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

// ---------- FAQ with topics and search (both product pages) ----------
const faq = document.querySelector('.faq2')
if (faq) {
  const items = [...faq.querySelectorAll('details.qa')]
  const tabs = [...faq.querySelectorAll('.faq-topics button')]
  const search = faq.querySelector('[data-faq-search]')
  const empty = faq.querySelector('.faq-empty')
  let topic = 'popular'
  // Each topic shows how many questions it holds.
  faq.querySelectorAll('[data-topic-count]').forEach((s) => {
    const t = s.dataset.topicCount
    s.textContent = String(items.filter((i) => (t === 'popular' ? i.hasAttribute('data-popular') : i.dataset.topic === t)).length)
  })
  const text = new Map(items.map((i) => [i, i.textContent.toLowerCase()]))
  const show = () => {
    const q = search.value.trim().toLowerCase()
    let shown = 0
    for (const i of items) {
      // Searching looks through every question; otherwise the picked topic, or the most asked ones.
      const on = q ? text.get(i).includes(q) : topic === 'popular' ? i.hasAttribute('data-popular') : i.dataset.topic === topic
      i.hidden = !on
      if (on) shown++
      if (!on) i.open = false
    }
    empty.hidden = shown > 0
  }
  const pick = (t) => {
    if (t) topic = t
    tabs.forEach((x) => {
      x.classList.toggle('on', x.dataset.topic === t)
      x.setAttribute('aria-selected', String(x.dataset.topic === t))
    })
  }
  tabs.forEach((b) =>
    b.addEventListener('click', () => {
      pick(b.dataset.topic)
      search.value = ''
      show()
    })
  )
  // A search looks through every topic, so no topic stays highlighted while it runs.
  search.addEventListener('input', () => {
    if (search.value.trim()) pick('')
    else pick(topic || 'popular')
    show()
  })
  // One answer open at a time keeps the list easy to scan.
  items.forEach((i) => i.addEventListener('toggle', () => i.open && items.forEach((x) => x !== i && (x.open = false))))
  show()
  const first = items.find((i) => !i.hidden)
  if (first) first.open = true
}

