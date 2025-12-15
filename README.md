# IS117 Final Project - Portfolio System

## Project Overview

A complete professional web portfolio system consisting of three interconnected sites, demonstrating mastery of modern web development, design principles, and business-focused implementation.

**Live Demo:** [Will be deployed on GitHub Pages]

---

## Sites Overview

### 1. **Landing Hub** (`docs/index.html`)
**Purpose:** Central navigation hub connecting all three sites

**Features:**
- Modern gradient hero with animated typography
- Project showcase cards with hover effects
- Tech stack grid display
- Smooth scroll navigation
- Fully responsive design
- Intersection Observer animations

**Tech Stack:** HTML5, CSS3 (Grid/Flexbox), Vanilla JS

---

### 2. **Portfolio Site** (`docs/portfolio/`)
**Purpose:** Personal brand positioning as AI Product Engineer

**Features:**
- **Brand Archetype:** The Sage (knowledge, wisdom, expertise)
- **Persuasion Principles:** 
  - Reciprocity: Free AI audit offer
  - Scarcity: Limited slots (3 remaining Q1 2025)
  - Authority: Client testimonials from CTOs/VPs
  - Social Proof: "Trusted by 15+ startups"
- **Integrations:**
  - Calendly inline widget for consultation booking
  - Zapier webhook for contact form submissions
- **Case Studies:** 3 detailed project examples with metrics
- **Swiss Typography:** Fluid type scales, systematic hierarchy
- **Accessibility:** WCAG AA compliant, semantic HTML, ARIA labels

**Tech Stack:** HTML5, CSS3 (Fluid Typography), Vanilla JS, Calendly API, Zapier

---

### 3. **Design Style Showcase** (`docs/design_style/`)
**Purpose:** Demonstrate design history knowledge and CSS Grid mastery

**Features:**
- **Focus:** Swiss International Typographic Style (1957-Present)
- **Design Principles:** 
  - Grid systems and modular layouts
  - Asymmetric composition
  - Sans-serif typography (Helvetica-inspired)
  - Strategic whitespace
  - Objective content presentation
- **Sections:**
  - Hero with large-scale typography
  - 6 core principles explained
  - Typography specimen showcase
  - Interactive grid demonstration
  - Restrained color palette display
  - Pioneer profiles (Müller-Brockmann, Vignelli, etc.)
  - Modern applications analysis
- **CSS Mastery:** Complex grids, fluid typography, asymmetric layouts

**Tech Stack:** HTML5, CSS3 (Advanced Grid), Semantic Markup

---

### 4. **Client Business Site** (`docs/client_site/`)
**Purpose:** Full-featured business website with conversion optimization

**Features:**
- **Company:** VelocityAI Solutions (AI consulting firm)
- **Sales Funnel Design:**
  - Attention: Hero with animated particles, trust statistics
  - Interest: Service showcase with social proof
  - Desire: Case studies with real metrics, testimonials
  - Action: Multi-tier pricing, lead generation form
- **Persuasion Elements:**
  - Social proof banner (company logos)
  - Urgency messaging (limited availability)
  - Risk reversal (free audit)
  - Authority signals (metrics, testimonials)
- **Integrations:**
  - Zapier webhook for lead capture
  - Form validation with detailed error handling
  - Analytics tracking (GA4, Facebook Pixel ready)
- **Visual Effects:**
  - Parallax scrolling particles
  - Scroll-triggered animations
  - Intersection Observer for fade-ins
  - Dynamic navigation hide/show

**Tech Stack:** HTML5, CSS3 (Animations, Gradients), Vanilla JS, Zapier

---

## Technical Implementation

### Quality Assurance Tools

```json
{
  "htmlhint": "HTML validation (semantic markup, accessibility)",
  "stylelint": "CSS validation (standards compliance)",
  "@lhci/cli": "Lighthouse CI for performance audits",
  "husky": "Git hooks for pre-commit validation",
  "lint-staged": "Run linters only on staged files"
}
```

### CI/CD Pipeline

**GitHub Actions Workflow** (`.github/workflows/lighthouse-ci.yml`):
- Trigger: Every push to main branch
- Steps:
  1. Checkout code
  2. Install Node.js 18
  3. Install dependencies (`npm ci`)
  4. Run Lighthouse CI on all sites
  5. Generate performance reports
- **Quality Gates:**
  - Accessibility: 100/100 (error on < 1.0)
  - SEO: 100/100 (error on < 1.0)
  - Performance: 90+ (warning on < 0.9)
  - Best Practices: 90+ (warning on < 0.9)

### Design System

**Fluid Typography:**
```css
--font-size-base: clamp(1rem, 0.92rem + 0.39vw, 1.25rem);
--font-size-3xl: clamp(3rem, 2.07rem + 4.63vw, 8rem);
```

**Color Palette:**
- Primary: `#2563eb` (Blue)
- Secondary: `#7c3aed` (Purple)
- Accent: `#10b981` (Green)
- Neutral: `#1e293b` → `#f8fafc`

**Spacing Scale:** Modular (0.5rem → 6rem)

**Grid System:** 12-column with 2rem gap

---

## Integrations Guide

### Calendly Setup (Portfolio Site)

1. Get your Calendly URL from https://calendly.com
2. Update in `docs/portfolio/index.html`:
```html
<div class="calendly-inline-widget" 
     data-url="YOUR_CALENDLY_URL_HERE"
     style="min-width:320px;height:700px;">
</div>
```

### Zapier Webhook Setup (Portfolio + Client Site)

1. Create Zap at https://zapier.com/app/zaps
2. Trigger: "Webhooks by Zapier" → "Catch Hook"
3. Copy webhook URL
4. Update in JavaScript files:
   - `docs/portfolio/script.js` line 11
   - `docs/client_site/script.js` line 7
```javascript
zapierWebhookUrl: 'https://hooks.zapier.com/hooks/catch/XXXXX/XXXXX/'
```

5. Action: Connect to Google Sheets, Slack, email, CRM, etc.

---

## Deployment Instructions

### Deploy to GitHub Pages

1. **Create GitHub Repository:**
```bash
# Repository is already initialized locally
# Create new repo on GitHub: github.com/new
# Name it: IS117_portfolio (or your choice)
```

2. **Connect and Push:**
```bash
cd /home/anabhayan/IS117_portfolio
git remote add origin https://github.com/YOUR_USERNAME/IS117_portfolio.git
git push -u origin main
```

3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Navigate to "Pages" section
   - Source: Deploy from branch `main`
   - Folder: `/docs`
   - Click "Save"

4. **Wait 2-3 minutes**, then visit:
   - `https://YOUR_USERNAME.github.io/IS117_portfolio/`

### Verify Deployment

After deployment, check:
- ✅ Landing page loads correctly
- ✅ All three site links work
- ✅ Images/assets load properly
- ✅ Forms submit (test Zapier webhook)
- ✅ Calendly widget displays
- ✅ Mobile responsive on different devices
- ✅ GitHub Actions Lighthouse CI runs successfully

---

## Project Structure

```
IS117_portfolio/
├── .github/
│   └── workflows/
│       └── lighthouse-ci.yml         # CI/CD pipeline
├── docs/                             # GitHub Pages root
│   ├── index.html                    # Landing hub
│   ├── style.css
│   ├── script.js
│   ├── portfolio/                    # Portfolio site
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   ├── design_style/                 # Design showcase
│   │   ├── index.html
│   │   └── style.css
│   └── client_site/                  # Business site
│       ├── index.html
│       ├── style.css
│       └── script.js
├── .htmlhintrc                       # HTML linting rules
├── .stylelintrc.json                 # CSS linting rules
├── lighthouserc.json                 # Lighthouse CI config
├── .gitignore
├── package.json                      # npm dependencies
└── README.md                         # This file
```

---

## Development Workflow

### Install Dependencies

```bash
npm install
```

### Run Linters

```bash
npm run lint:html    # Validate HTML
npm run lint:css     # Validate CSS
npm run lint         # Run both
```

### Run Lighthouse Locally

```bash
npm run lhci         # Audit all sites
```

### Git Workflow

Pre-commit hooks automatically run linters:
```bash
git add .
git commit -m "Your message"  # Triggers htmlhint + stylelint
git push
```

---

## Performance Benchmarks

**Target Lighthouse Scores:**
- 🎯 Accessibility: 100/100
- 🎯 SEO: 100/100
- 🎯 Performance: 90+
- 🎯 Best Practices: 90+

**Achieved Results:** (Run `npm run lhci` to verify)

---

## Requirements Checklist

### Technical Requirements
- [x] Three interconnected sites
- [x] Semantic HTML5 markup
- [x] Modern CSS (Grid, Flexbox, Custom Properties)
- [x] Vanilla JavaScript (no frameworks)
- [x] Fully responsive (mobile-first)
- [x] WCAG AA accessibility compliance
- [x] Cross-browser compatible
- [x] Optimized assets and performance

### Design Requirements
- [x] Fluid typography system
- [x] Consistent design language
- [x] Professional visual hierarchy
- [x] Design style history integration
- [x] Grid-based layouts
- [x] Color theory application
- [x] Whitespace management

### Business Requirements
- [x] Clear value propositions
- [x] Persuasion principles (Cialdini)
- [x] Brand archetype implementation
- [x] Social proof elements
- [x] Call-to-action optimization
- [x] Lead generation funnel
- [x] Integration with external services

### Quality Requirements
- [x] HTML validation (htmlhint)
- [x] CSS validation (stylelint)
- [x] Lighthouse CI audits
- [x] Git pre-commit hooks
- [x] CI/CD pipeline (GitHub Actions)
- [x] Documentation

---

## Technologies Used

**Frontend:**
- HTML5 (Semantic markup)
- CSS3 (Grid, Flexbox, Custom Properties, Animations)
- JavaScript ES6+ (Vanilla, no frameworks)

**Integrations:**
- Calendly (Consultation scheduling)
- Zapier (Form webhooks, lead capture)

**Quality Tools:**
- htmlhint (HTML validation)
- stylelint (CSS validation)
- @lhci/cli (Lighthouse CI)
- husky (Git hooks)
- lint-staged (Staged file linting)

**DevOps:**
- Git (Version control)
- GitHub Actions (CI/CD)
- GitHub Pages (Hosting)

---

## Key Learnings

### Design Principles
- Swiss International Typographic Style influence on modern web design
- Grid systems as foundation for layout consistency
- Fluid typography for seamless responsive scaling
- Whitespace as design element

### Business Psychology
- Cialdini's persuasion principles in web design
- Brand archetypes for consistent messaging
- Sales funnel optimization techniques
- Social proof and authority signals

### Technical Skills
- Advanced CSS Grid and Flexbox layouts
- Intersection Observer API for scroll animations
- Webhook integrations (Zapier)
- CI/CD pipeline implementation
- Accessibility best practices (WCAG AA)

### Workflow Optimization
- Git hooks for quality enforcement
- Automated testing in CI/CD
- Modular CSS architecture
- Performance optimization techniques

---

## Future Enhancements

**Phase 2 (Optional):**
- [ ] Add blog section with markdown rendering
- [ ] Implement dark mode toggle
- [ ] Add project filtering/search
- [ ] Integrate real CMS (Sanity/Contentful)
- [ ] Add testimonial carousel
- [ ] Implement A/B testing framework
- [ ] Add analytics dashboard
- [ ] Create admin panel for content updates

**Performance:**
- [ ] Image lazy loading
- [ ] Service worker for offline support
- [ ] Critical CSS inlining
- [ ] Resource hints (preconnect, prefetch)

---

## Course Context

**Course:** IS117 - Fundamentals of Web Development  
**Instructor:** [Your Instructor Name]  
**Term:** Spring 2025  
**Student:** [Your Name]  

**Project Objectives:**
1. ✅ Demonstrate HTML5/CSS3/JavaScript proficiency
2. ✅ Apply design principles and theory
3. ✅ Implement business and marketing concepts
4. ✅ Create professional portfolio presence
5. ✅ Master modern web development workflow
6. ✅ Integrate third-party services

---

## Credits

**Design Inspiration:**
- Swiss International Typographic Style pioneers
- Modern SaaS landing pages
- Professional portfolio sites

**Tools & Services:**
- Calendly (Scheduling)
- Zapier (Automation)
- GitHub (Hosting & CI/CD)
- VS Code (Development)

**Resources:**
- MDN Web Docs
- Web.dev (Google)
- CSS-Tricks
- A11y Project

---

## License

This project is for educational purposes as part of IS117 coursework.

---

## Contact

**Portfolio:** [Your GitHub Pages URL]  
**Email:** [Your Email]  
**GitHub:** [@yourusername](https://github.com/yourusername)  
**LinkedIn:** [Your LinkedIn]

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Status:** ✅ Complete & Ready for Deployment
