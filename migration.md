# 🚀 Complete System Migration & Technical Setup Guide

**Aeron Irasusta · Portfolio Website**

A complete technical manual for maintaining, running, customizing, and deploying the entire portfolio system.

---

## 📋 Table of Contents

- [1. System Overview](#1-system-overview)
- [2. Complete File & Directory Architecture](#2-complete-file--directory-architecture)
- [3. Core Technical Mechanics](#3-core-technical-mechanics)
  - [3.1 Theme Engine (Light / Dark / System)](#31-theme-engine-light--dark--system)
  - [3.2 Navigation & Layout Controller](#32-navigation--layout-controller)
  - [3.3 Certificate Viewer Modal System](#33-certificate-viewer-modal-system)
  - [3.4 Animation & Reduced-Motion Engine](#34-animation--reduced-motion-engine)
  - [3.5 Monochrome Texture Engine](#35-monochrome-texture-engine)
- [4. Customization & Maintenance Guide](#4-customization--maintenance-guide)
  - [Updating Profile & Photos](#updating-profile--photos)
  - [Adding & Editing Projects](#adding--editing-projects)
  - [Modifying Skills & Tools](#modifying-skills--tools)
  - [Updating Hackathons & Experience](#updating-hackathons--experience)
  - [Connecting the Contact Form](#connecting-the-contact-form)
- [5. Deployment Guide (GitHub Pages & Custom Domain)](#5-deployment-guide-github-pages--custom-domain)
- [6. Troubleshooting & FAQs](#6-troubleshooting--faqs)

---

## 1. System Overview

This portfolio is engineered as a lightweight, high-performance static web application requiring **zero build steps, zero package managers, and zero dependencies**:

- **Structure**: Semantic HTML5 with complete ARIA landmarks.
- **Styling**: CSS Custom Properties (Tokens), CSS Grid, and Flexbox.
- **Scripting**: Pure Vanilla JavaScript (ES6+).
- **Fonts**: Loaded asynchronously via Google Fonts (`Geist`, `Geist Mono`, `Source Serif 4`).
- **Icons & Graphics**: Pure CSS rendering (halftone patterns, arrows, status badges, modal panels).

---

## 2. Complete File & Directory Architecture

```
Portfolio - Aeron Irasusta/
├── index.html                  ← Main single-page application entry point
├── content-blueprint.md        ← Design-agnostic master sheet of all content & copy
├── migration.md                ← This comprehensive system & technical manual
├── css/
│   ├── variables.css           ← Central design tokens (colors, radii, shadows, scales)
│   ├── styles.css              ← Global styles, components, sidebar, cards, modals
│   ├── animations.css          ← Keyframe animations, entrance staggers, pulse loops
│   └── responsive.css          ← Breakpoint controllers (≥1024px desktop vs <1024px mobile)
├── js/
│   ├── main.js                 ← Theme engine, mobile nav overlay, active links, modal controller
│   └── animations.js           ← IntersectionObserver for scroll-triggered entrance reveals
└── assets/
    ├── images/
    │   └── profile.png         ← High-resolution profile portrait
    ├── icons/                  ← Custom vector icons (optional)
    └── resume/
        └── resume.pdf          ← Downloadable PDF resume
```

---

## 3. Core Technical Mechanics

### 3.1 Theme Engine (Light / Dark / System)
**File:** `js/main.js` & `css/variables.css`

The theme system supports three distinct user states:
- `light`: Applies light canvas (`--bg: #ffffff`, `--ink: #0a0a0a`).
- `dark`: Applies dark canvas (`--bg: #0c0c0f`, `--ink: #f4f4f5`).
- `system`: Follows the user's operating system preferences dynamically via `window.matchMedia('(prefers-color-scheme: dark)')`.

**How it works:**
1. The choice is stored in `localStorage` under `theme-preference`.
2. The root `<html>` attribute `data-theme` is set to either `"light"` or `"dark"`.
3. Background and text transitions crossfade smoothly over 500ms (`--transition-theme`).

---

### 3.2 Navigation & Layout Controller
**Files:** `index.html`, `css/styles.css`, `css/responsive.css`, `js/main.js`

- **Desktop (≥ 1024px)**:
  - Fixed left sidebar (`width: 14rem`), keeping navigation, identity, theme selector, and external links constantly accessible.
  - Content shifts right to clear the sidebar (`margin-left: 14rem`).
  - Active section link detection uses an `IntersectionObserver` that highlights the currently viewed section with a subtle leading arrow `→`.
- **Mobile (< 1024px)**:
  - The desktop sidebar is hidden.
  - A compact sticky header appears at the top with a backdrop blur (`backdrop-filter: blur(12px)`).
  - Tapping **MENU** triggers a full-screen overlay menu.
  - Pressing `Escape` or clicking any navigation link automatically closes the overlay.

---

### 3.3 Certificate Viewer Modal System
**Files:** `index.html`, `css/styles.css`, `js/main.js`

- Any button with the attribute `data-modal-open="MODAL_ID"` triggers the designated modal.
- Includes backdrop blur, keyboard escape listener (`Escape` key closes), and backdrop click listener.
- Used for presenting official credentials (such as the **AppBuilders PH Hackathon** certificate).

---

### 3.4 Animation & Reduced-Motion Engine
**Files:** `css/animations.css`, `js/animations.js`

- Elements with the `.observe-entrance` class fade up 12px over 700ms using the cubic-bezier ease-out curve `cubic-bezier(0.16, 1, 0.3, 1)`.
- Staggered timing is applied via helper classes (`.stagger-1`, `.stagger-2`, `.stagger-3`).
- **Accessibility**: If the user has enabled "Reduce Motion" in their operating system, animations are automatically disabled via `@media (prefers-reduced-motion: reduce)`.

---

### 3.5 Monochrome Texture Engine
**Files:** `css/styles.css`, `index.html`

- Halftone dot texture is rendered with pure CSS using repeating radial gradients:
  ```css
  background-image: radial-gradient(var(--halftone-dot) 1px, transparent 1px);
  background-size: 9px 9px;
  -webkit-mask-image: radial-gradient(ellipse at top right, black 15%, transparent 70%);
  ```
- Fades out smoothly at the edges via soft CSS mask gradients.

---

## 4. Customization & Maintenance Guide

> 💡 **Tip**: Refer to [content-blueprint.md](file:///c:/Users/Aeron%20Irasusta/OneDrive/文档/Portfolio%20-%20Aeron%20Irasusta/content-blueprint.md) for the complete list of all text copy, bio statements, and credentials.

### Updating Profile & Photos
- **Image**: Replace `assets/images/profile.png` with any new high-resolution photo.
- **Copy**: Search for `id="profile"` in `index.html` to update the headline, bio, or quick attribute chips.

### Adding & Editing Projects
In `index.html` under `<section id="projects">`:
- Add a new card inside `.grid-cards`:
  ```html
  <div class="card project-card">
    <div>
      <div class="project-thumbnail">
        <span class="micro-label">preview / 05</span>
      </div>
      <div class="project-title">
        <span>Project Name</span>
      </div>
      <p class="project-desc">Description of the project.</p>
    </div>
    <div>
      <div class="project-tags">
        <span class="tag-pill">React</span>
        <span class="tag-pill">Node.js</span>
      </div>
      <div style="display: flex; gap: 0.75rem;">
        <a href="#" class="micro-label plain-link">live demo <span class="arrow-nudge">↗</span></a>
        <a href="#" class="micro-label plain-link">source <span class="arrow-nudge">↗</span></a>
      </div>
    </div>
  </div>
  ```

### Modifying Skills & Tools
In `index.html` under `<section id="skills">`:
- Add or remove tags inside `.skill-row-pills` under **Languages**, **Tools & Workflow**, or **Principles**.

### Updating Hackathons & Experience
In `index.html` under `<section id="experience">`:
- Milestone 1 is configured for **AppBuilders PH Hackathon** with the certificate button:
  ```html
  <button class="cert-badge-btn" data-modal-open="certModalAppBuilders">
    view certificate <span class="arrow-nudge">↗</span>
  </button>
  ```
- Milestones 2–4 are placeholder slots ready to be populated as you achieve new milestones.

### Connecting the Contact Form
1. Create a free endpoint at [formspree.io](https://formspree.io/) or [formspark.io](https://formspark.io/).
2. In `index.html`, update the form opening tag:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. In `js/main.js`, remove or comment out `e.preventDefault();` in `initContactForm()` to permit standard live submissions.

---

## 5. Deployment Guide (GitHub Pages & Custom Domain)

### Deploying to GitHub Pages (Free)

```bash
# 1. Initialize git in the workspace
cd "Portfolio - Aeron Irasusta"
git init

# 2. Add and commit all files
git add .
git commit -m "Deploy Aeron Irasusta portfolio"

# 3. Create a GitHub repository (e.g. 'portfolio') and link it
git remote add origin https://github.com/aeronautic005/portfolio.git
git branch -M main
git push -u origin main
```

**Enable GitHub Pages in GitHub Settings:**
1. Go to your repository on GitHub.
2. Navigate to **Settings** → **Pages** (in the left sidebar).
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your website will be live in 1–2 minutes at:
   `https://aeronautic005.github.io/portfolio/`

---

## 6. Troubleshooting & FAQs

- **Images not showing up?**
  Ensure the image file path is strictly relative (`assets/images/profile.png`) and casing matches exactly.
- **Fonts not rendering?**
  Fonts are served via Google Fonts. Verify you have an internet connection or download the `.woff2` files locally if offline development is needed.
- **Theme not persisting?**
  Ensure cookies / localStorage permissions are not blocked in your browser settings.
- **Modal not opening?**
  Confirm the `data-modal-open` attribute value on your button matches the `id` of the target `.modal-overlay`.

---

*Authored for Aeron Irasusta · Portfolio System*
