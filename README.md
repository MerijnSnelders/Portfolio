# Portfolio

My personal portfolio website, built to show my projects and to help me find an internship. It is a static site made with plain HTML, Tailwind CSS and vanilla JavaScript, and it is hosted on Netlify.

Live site: https://merijnsneldersportfolio.netlify.app/

## Technologies

- HTML5
- Tailwind CSS 3 (compiled into `styles.css`)
- Vanilla JavaScript (ES modules)
- AOS for scroll animations and Swiper for the project carousel (both vendored in `vendor/`)
- Netlify for hosting
- npm scripts for the CSS build and a local server

## Features

- Dutch and English language switch
- A video preview for every project
- Project detail pages
- A hidden terminal easter egg
- Scroll animations
- Responsive layout for phone, tablet and desktop
- Accessibility basics, such as a skip-to-content link

## Project structure

```
.
├── index.html          # The single page of the site
├── styles.css          # Compiled Tailwind output (committed)
├── tailwind.config.js  # Tailwind configuration
├── netlify.toml        # Netlify headers and publish settings
├── src/                # Tailwind input CSS
├── js/                 # JavaScript modules (such as main.js and projects.js)
├── vendor/             # Vendored third-party libraries (AOS, Swiper)
├── fonts/              # Self-hosted fonts
├── icons/              # SVG icons
├── images/             # Images
└── videos/             # Project preview videos
```

## How to run it

You need Node.js 18 or newer.

```bash
git clone https://github.com/MerijnSnelders/Portfolio.git
cd Portfolio
npm install
npm run build:css   # compile Tailwind once
npm run serve       # serve the site on http://localhost:5173
```

While you edit styles, run `npm run watch:css` in a second terminal so `styles.css` is rebuilt on every change.

`styles.css` is committed on purpose: Netlify publishes the repository root and does not run a build step.

## Contributing

1. Create a branch from `main`.
2. Run `npm run build:css` before you commit so `styles.css` is up to date.
3. Open a pull request with a short description of what you changed.

## Process

I started this portfolio about a year ago. I wanted a personal website of my own, and I wanted it to help me find an internship.

I spent the first week getting the basic features working. After that I added a video preview for each project, which I think is the part that makes the site stand out. Then I added the terminal easter egg to make it different from a normal portfolio. I hosted it on Netlify, which deploys the `main` branch.

Once I found an internship I let the project rest, and a few bugs stayed open. Recently I came back to fix those bugs, improve the design a bit and add the Dutch and English language switch.

## What I learned

- Building a multilingual site without a framework
- Structuring a Tailwind build
- Accessibility basics, such as keyboard navigation and a skip link
- Deploying and caching static assets with Netlify

## How it could improve

- Move to a small Vite project instead of the current static setup, so styles are built on deploy and do not have to be committed
- Add Lighthouse and accessibility checks
