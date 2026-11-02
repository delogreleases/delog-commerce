# Delog Commerce website (Tillora)

A static site: `index.html`, `styles.css`, `main.js` and `assets/`. No build step; open `index.html` in a browser to preview.

## Before publishing

Fill in the `SITE` block at the top of `main.js`:

| Setting | What it is |
|---|---|
| `download` | A stable link to the latest installer, e.g. `https://github.com/YOUR-NAME/tillora-releases/releases/latest/download/Tillora-Setup.exe` |
| `whatsapp` | Your WhatsApp number with country code, digits only (`919876543210`) |
| `email` | Support email (the footer link is hidden while empty) |

## Hosting (free)

- **GitHub Pages**: push this folder to a repository, then Settings → Pages → deploy from the branch.
- **Netlify** or **Cloudflare Pages**: drag and drop this folder in their dashboard.

Keep the installer itself on GitHub Releases (large files), and link to it from `download`.

## Screenshots

`assets/screens/` holds the app screenshots (1600 px JPEGs). They were taken from the sample shop; retake them after big UI changes so the site matches the app.
