# NEXUS — Responsive Landing Page

A visually immersive, fully responsive landing page built with vanilla HTML, CSS, and JavaScript. NEXUS features a smart sticky navigation bar, rich micro-interactions, animated scroll reveals, and a polished multi-section layout — crafted as Task 01 of the SkillCraft Web Development internship.

---

## Live Preview Sections

| Section | Description |
|---|---|
| **Hero** | Headline with floating ambient stat cards and smooth scroll CTA |
| **Features** | 6-card grid showcasing the UI capabilities |
| **Metrics** | Animated count-up statistics bar |
| **Testimonials** | Horizontal scrolling review cards |
| **CTA** | Call-to-action section with gradient glow box |
| **Footer** | Minimal footer with navigation links |

---

## Features

### Navigation
- Fixed navbar that transitions from transparent to frosted-glass blur on scroll
- Animated colour-shifting underlines on hover
- Smooth scroll to each page section
- Hamburger menu for mobile that morphs into an × icon with staggered mobile link reveals

### Micro-Interactions
- **Custom cursor** — dot + ring that morph on hover and click states
- **Click ripples** — radial ripple effect on every click
- **Hover magnetism** — buttons and cards subtly attract the cursor
- **Scroll reveal** — elements fade and drift in with staggered spring-eased animations

### Visual Design
- Drifting gradient **background orbs** for cinematic depth
- **Film-grain noise overlay** for a refined, tactile atmosphere
- Floating hero stat cards (Active Users, Satisfaction, Uptime SLA)
- Animated count-up numbers in the Metrics section
- Google Fonts: **Syne** (headings) + **DM Sans** (body)

### Responsiveness
- Fully responsive across mobile, tablet, and desktop
- Dedicated mobile menu with animated entry and exit

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, animations, glassmorphism, orbs, grain |
| JavaScript (ES6+) | Navbar scroll behaviour, cursor, ripples, reveals, count-up |
| Google Fonts | Syne & DM Sans typefaces |

---

## Project Structure

```
SCT_WD_1/
├── index.html    # Full single-page layout — nav, hero, features, stats, testimonials, CTA, footer
├── style.css     # All styles — layout, animations, responsive breakpoints, visual effects
└── main.js       # Interactive behaviour — scroll nav, cursor, ripple, reveal, count-up, mobile menu
```

---

## Getting Started

No build tools or dependencies required. Just open in a browser:

```bash
# Clone the repository
git clone https://github.com/krutikakolkur/SCT_WD_1.git

# Navigate into the project folder
cd SCT_WD_1

# Open in browser
open index.html
```

Or simply double-click `index.html` to run it locally.

---

## Internship Context

This project was built as **Task 01** of the **SkillCraft Technology Web Development Internship (SCT_WD)**. The task objective was to create a responsive landing page with an interactive navigation menu that changes style or colour on scroll, along with sticky/fixed positioning.

---



---

## License

This project is open source and available under the [MIT License](LICENSE).
