<div align="center">

# 🌸 Nathaly Ingol - Portfolio

**Software Developer · Data Engineer · AI/ML Enthusiast**

*CS Senior @ Texas State University · Austin, TX*

[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro-FF5D01?logo=astro&logoColor=white)](https://astro.build)
&nbsp;
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## ✨ About This Portfolio

A personal portfolio website for **Nathaly Ingol** — designed with a warm earthy aesthetic (cream, olive, brown & blush tones) to showcase her projects, skills, and professional journey. Features a custom AI assistant (COCO) powered by Gemini.

---

## 🗂️ Pages

| Page | Route | Description |
|------|-------|-------------|
| 🏠 Home | `/` | Hero section with intro, social links & AI assistant CTA |
| 👩‍💻 About Me | `/about` | Personal story, hobbies, photography & dog tax 🐶 |
| 📄 Resume | `/resume` | Education, experience, skills — downloadable PDF + virtual view |
| 🛠️ Projects | `/projects` | Project showcase with live/GitHub links |
| 📬 Contact | `/contact` | Contact form + social/email info |
| 🤖 Assistant | `/assistant` | COCO — AI chatbot about Nathaly, powered by Gemini |

---

## 🚀 Tech Stack

- **Framework:** [Astro](https://astro.build) v5
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v4 + custom CSS variables
- **Components:** React (for interactive islands)
- **Fonts:** Bebas Neue · Playfair Display · DM Sans (Google Fonts)
- **AI:** Google Gemini API
- **Deployment:** Netlify
- **SEO:** Open Graph · JSON-LD structured data · canonical URLs · sitemap

---

## 🗃️ Project Structure

```text
portfolio/
├── public/
│   └── images/          ← static images (og-cover, favicon, project photos)
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro   ← shared HTML head (SEO meta, fonts, cursor)
│   ├── pages/
│   │   ├── index.astro        ← Home
│   │   ├── about.astro
│   │   ├── resume.astro
│   │   ├── projects.astro
│   │   ├── contact.astro
│   │   └── assistant.astro
│   └── styles/
│       └── global.css         ← design tokens, base styles
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js `>=18`
- npm or pnpm

### Installation

```bash
# clone the repo
git clone https://github.com/coconath0/portfolio.git
cd portfolio

# install dependencies
npm install

# start dev server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser. 🎉

### Build for Production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--cream` | `#F5F0E8` | Background |
| `--olive` | `#8B9A5A` | Navbar, accents |
| `--olive-dark` | `#4A5A2A` | Cards, buttons |
| `--brown` | `#6B3A2A` | Headings, CTAs |
| `--brown-dark` | `#3D2010` | Footer, dark sections |
| `--blush` | `#E8C4C8` | Social card, highlights |

---

## 🔍 SEO

This portfolio is optimized to rank when **"Nathaly Ingol"** is searched:
- ✅ Semantic HTML & proper heading hierarchy
- ✅ Open Graph & Twitter card meta tags
- ✅ JSON-LD structured data (`Person` schema)
- ✅ Canonical URLs
- ✅ `robots` meta: `index, follow`
- ✅ Descriptive `alt` attributes on all images

---

## 📬 Contact

- 💼 [linkedin.com/in/nathaly-ingol](https://linkedin.com/in/nathaly-ingol)
- 🐙 [github.com/coconath0](https://github.com/coconath0)
- 🌿 [linktr.ee/nathalyingol](https://linktr.ee/nathalyingol)

---

<div align="center">
  <sub>Made with ☕, code & way too many tabs open 🌸</sub>
</div>

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
