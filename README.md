# Delog Commerce website (Tillora and Platera)

A static site with no build step; open `index.html` in a browser to preview.

| Page | What it is |
|---|---|
| `index.html` | Delog Commerce homepage: a door per product (a carousel once they don't all fit), who we are, our promises, getting started, contact. Styles in `home.css`. |
| `tillora.html` | Tillora, retail billing (this was `index.html` before; old links like `index.html#download` are sent here). |
| `platera.html` | Platera, the restaurant POS. Styles in `platera.css`. |

`styles.css` is shared by every page, and `main.js` runs them all.

**Adding a product:** add it to `PRODUCTS` in `main.js` (name, colours, icon, screenshot, door text and download link). It then shows up in the Products menu on every page and as a door on the homepage; give it its own page like `platera.html`.

## Before publishing

Fill in the `SITE` block at the top of `main.js`:

| Setting | What it is |
|---|---|
| `download` | A stable link to the latest installer, e.g. `https://github.com/YOUR-NAME/tillora-releases/releases/latest/download/Tillora-Setup.exe` |
| `whatsapp` | Your WhatsApp number with country code, digits only (`919876543210`) |
| `email` | Support email (the footer link is hidden while empty) |
| `platera.download` | Platera's installer link, e.g. `https://github.com/delogreleases/platera-releases/releases/latest/download/Platera-Setup.exe`. Empty: its buttons offer early access on WhatsApp instead of a download. |

## Hosting (free)

After changing `main.js`, `styles.css` or `platera.css`, bump the `?v=` date where both pages link them, so visitors' browsers fetch the new file instead of a cached one.

- **GitHub Pages**: push this folder to a repository, then Settings → Pages → deploy from the branch.
- **Netlify** or **Cloudflare Pages**: drag and drop this folder in their dashboard.

Keep the installer itself on GitHub Releases (large files), and link to it from `download`.

## Screenshots

`assets/screens/` holds the app screenshots (1600 px JPEGs). They were taken from the sample shop; retake them after big UI changes so the site matches the app.

`assets/platera/` holds Platera's screenshots, taken from the sample restaurant with the demo and trial banners hidden. The phone shots (captain app, table QR menu) are 520 px wide.
