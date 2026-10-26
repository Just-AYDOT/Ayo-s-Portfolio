# AYO portfolio: "Certified"

Static HTML, CSS and JS built from the Figma "Certified" section (file 16QFXU6MgCN5n3ztZ3yEWD, node 22591:3234). There is no build step.

## Structure

- `index.html`, `work.html`, `about.html`, `contact.html`, `404.html`
- `work/*.html`: 11 case studies (tonote, gender-centre, enr, eptcms, i-am-alive, tcco, cobalt, brane, exquisite, erika, photo-manipulation)
- `assets/css/site.css`: design tokens and components (paper #edf0f4, ink #0f1b2d, seal #1f3bd1, highlighter #fef404; Gloock, Geist, Geist Mono from Google Fonts)
- `assets/js/site.js`: copy email, Work filters, FAQ accordion, brief chips, brief form (opens the visitor's email app)
- `assets/img/`: images exported at 2x as WebP; logos as PNG; seals, guilloché and tick as SVG
- `favicon.ico`, `site.webmanifest`, `assets/img/favicon-*.png`, `apple-touch-icon.png`, `icon-192/512.png`: favicon set
- `vercel.json`: clean URLs (`/work/cobalt` serves `work/cobalt.html`), no trailing slash, cache and security headers

## Breakpoints

Desktop matches the 1440px Figma frames. Layout steps down at 1360, 1240, 1024 and 760px, and was checked at 320, 360, 375, 414, 480, 600, 768, 834, 1024, 1100, 1280, 1366, 1440 and 1920px with no sideways scrolling.

## Deploy on Vercel

1. Push this folder to a GitHub repo (the folder is the repo root).
2. In Vercel: Add New, Project, import the repo. Framework preset: Other. Leave the build command and output directory empty.
3. Deploy.

Or from this folder: `npx vercel --prod`.

## Preview locally

Double-click `index.html`. Every CSS, JS, image and page link is relative, so the site works straight from the folder. `npx vercel dev` also works if you want the clean URLs.

## Still to fill in

- Behance and Dribbble links in case-study footers point to `#`.
- Placeholders carried over from Figma: "[Year]" and "[Years]" on About, the event caption, the availability date on Contact, the outcome lines on ENR/EPTCMS/I Am Alive/TCCo, and the pricing, timeline and mentoring FAQ answers.
- Testimonials are drafts and need each client's sign-off before going live.
