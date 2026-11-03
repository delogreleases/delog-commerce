# Delog Commerce website (Tillora and Platera)

A static site: `index.html` (Tillora), `platera.html` (Platera, the restaurant POS), `styles.css`, `platera.css`, `main.js` and `assets/`. No build step; open `index.html` in a browser to preview.

## Before publishing

Fill in the `SITE` block at the top of `main.js`:

| Setting | What it is |
|---|---|
| `download` | A stable link to the latest installer, e.g. `https://github.com/YOUR-NAME/tillora-releases/releases/latest/download/Tillora-Setup.exe` |
| `whatsapp` | Your WhatsApp number with country code, digits only (`919876543210`) |
| `email` | Support email (the footer link is hidden while empty) |
| `platera.download` | Platera's installer link. **Leave empty until Platera is released**: its buttons then offer early access on WhatsApp instead of a download. |

## Hosting (free)

- **GitHub Pages**: push this folder to a repository, then Settings → Pages → deploy from the branch.
- **Netlify** or **Cloudflare Pages**: drag and drop this folder in their dashboard.

Keep the installer itself on GitHub Releases (large files), and link to it from `download`.

## Screenshots

`assets/screens/` holds the app screenshots (1600 px JPEGs). They were taken from the sample shop; retake them after big UI changes so the site matches the app.

`assets/platera/` holds Platera's screenshots, taken from the sample restaurant with the demo and trial banners hidden. The phone shots (captain app, table QR menu) are 520 px wide.
