# FINCORE CONSULTANCY SERVICES

> **A premier, modern, responsive Single Page Application (SPA) for FINCORE Consultancy Services — an Indian financial, taxation, corporate registration, accounting, and statutory compliance consultancy firm.**

Designed and built in strict accordance with the official FINCORE handwritten wireframe layout, enterprise UI/UX design standards, and the Indian regulatory framework.

---

## Table of Contents
1. [Executive Summary & Brand Philosophy](#1-executive-summary--brand-philosophy)
2. [Brand Identity & Color Tokens](#2-brand-identity--color-tokens)
3. [Wireframe Layout & Section Structure](#3-wireframe-layout--section-structure)
4. [Service Directory (All 15 Services across 3 Categories)](#4-service-directory-all-15-services-across-3-categories)
5. [Single Page Application (SPA) & Modal Architecture](#5-single-page-application-spa--modal-architecture)
6. [Interactive Animation & Micro-Interactions](#6-interactive-animation--micro-interactions)
7. [Consultation Form, Security & Anti-Spam Pipeline](#7-consultation-form-security--anti-spam-pipeline)
8. [Project Structure & Component Hierarchy](#8-project-structure--component-hierarchy)
9. [Local Development & Environment Setup](#9-local-development--environment-setup)
10. [Production Build & Deployment](#10-production-build--deployment)
11. [Indian Regulatory Integrity & Legal Disclaimers](#11-indian-regulatory-integrity--legal-disclaimers)

---

## 1. Executive Summary & Brand Philosophy

**FINCORE Consultancy Services** bridges the gap between intricate Indian statutory enactments and practical enterprise execution. The platform is engineered to deliver clarity, structured documentation, and confidence to sole proprietors, startups, MSMEs, expanding corporate bodies, and individuals navigating essential regulatory processes.

### Core Principles
- **Clarity First:** Translating complex statutory language and portal mandates into step-by-step actionable roadmaps.
- **Verified Scope:** Zero misleading claims or fabricated credentials; every engagement is anchored in actual Indian legal provisions (Income Tax Act, CGST/SGST Acts, Companies Act 2013, EPFO, ESIC, and municipal laws).
- **Scalable Enterprise Support:** Adapting advisory from early registration stages to ongoing double-entry bookkeeping and annual audit preparation.

---

## 2. Brand Identity & Color Tokens

The visual design system adheres strictly to the defined brand palette, creating an authoritative, trustworthy, and modern financial presence:

| Color Name | Hex Code | Purpose & Usage in Design |
|---|---|---|
| **Royal Blue** | `#163E8C` | Primary buttons, active tabs, link states, prominent accents, and highlight icons |
| **Deep Royal Blue** | `#0B2458` | Executive hero background, promotional banners, console headers, and footer |
| **Black** | `#080B12` | High-contrast typography, section headings, and primary text |
| **White** | `#FFFFFF` | Clean card surfaces, high-contrast hero CTA button, and text on dark banners |
| **Light Blue Accent** | `#EAF1FF` | Category filter tags, subtle badges, and secondary action highlights |
| **Light Gray Neutral** | `#F5F7FA` | Practice directory background and subtle card borders |

### Typography System
- **Headings:** `Plus Jakarta Sans` / `Inter` (`letter-spacing: -0.025em`) with font features for numerical clarity (`cv02`, `cv03`, `cv04`, `cv11`).
- **Body & Microcopy:** `Inter` (`letter-spacing: -0.011em`, `line-height: 1.6`) for optimal legibility across mobile, laptop, and ultra-wide screens.

---

## 3. Wireframe Layout & Section Structure

The website is structured as a continuous Single Page Application (SPA) following the exact sequence of the handwritten wireframe:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Sticky Navigation Bar (Logo, Nav Links, "Get Consultation")│
├─────────────────────────────────────────────────────────────┤
│ 2. Executive Hero Banner (Deep Blue Gradient & Compliance) │
├─────────────────────────────────────────────────────────────┤
│ 3. About FINCORE (Narrative + 3 Visual Highlights)          │
├─────────────────────────────────────────────────────────────┤
│ 4. Practice Directory (15 Service Cards across 3 Categories)│
├─────────────────────────────────────────────────────────────┤
│ 5. Promotional CTA Banner ("Let's Simplify Your Compliance")│
├─────────────────────────────────────────────────────────────┤
│ 6. Contact & Consultation Desk (Form + Office Placeholders) │
├─────────────────────────────────────────────────────────────┤
│ 7. 4-Column Compliance Footer & In-Page Legal Modals        │
└─────────────────────────────────────────────────────────────┘
```

### Detailed Section Breakdown

#### Section 1: Sticky Navigation Bar
- **Left Side:** Distinctive FINCORE financial shield brand mark and `FINCORE` title with `Consultancy Services` uppercase subtitle.
- **Right Side:** Desktop navigation links (`Home`, `About Us`, `Services`, `Contact Us`) with an active scroll-spy indicator.
- **Primary CTA:** Prominent `Get Consultation` button opening the global consultation modal.
- **Mobile Menu:** Responsive hamburger toggle revealing a clean mobile drawer with instant section scrolling.

#### Section 2: Executive Hero Banner & Compliance Hub
- **Atmosphere:** Deep Royal Blue (`#0B2458`) into Royal Blue (`#163E8C`) with subtle dark geometric grid lines and soft ambient glows.
- **Headings & Copy:**
  - *Main Heading:* **"Your Trusted Partner in Financial & Business Consultancy"**
  - *Supporting Text:* *"From tax compliance and business registration to accounting and licensing, FINCORE helps individuals and businesses navigate essential financial and regulatory processes with clarity."*
- **Action CTAs:** White primary `Explore Our Services` button with shine effect, paired with a frosted glass `Get Consultation` button.
- **Trust Chips:** Three frosted-glass badges (`Verified Documentation`, `Statutory Deadlines`, `Transparent Scope`).
- **FINCORE Compliance Console:** Floating interactive console displaying:
  - *MCA SPICe+ Corporate Formation Track:* Milestone tracker with an animated progress bar.
  - *GST Compliance Tile:* GSTR-1 & 3B return status and automated ITC reconciliation.
  - *Direct Tax Tile:* ITR & TDS periodic filings, AIS & Form 26AS matching.
  - *Day-to-Day Accounting:* Double-entry ledger synchronization and trial balance status.
  - *Integrated Badges:* Embedded `Direct & Indirect Tax Advisory` and `Strict Client Confidentiality` indicators.

#### Section 3: About Us
- **Main Heading:** **"About FINCORE"**
- **Description:** *"FINCORE Consultancy Services aims to simplify financial administration and business compliance by bringing essential consultancy services together in one place. Our website helps individuals, entrepreneurs, and businesses understand available services and take the next step with confidence."*
- **Three Visual Highlights:**
  1. *Clear Guidance:* Transparent statutory roadmaps and jargon-free advice.
  2. *Compliance-Focused Support:* Systematic filing checklists verified against current notifications.
  3. *Business-Oriented Solutions:* Advisory scaled to your business volume and structure.

#### Section 4: Practice Directory (Services)
- **Heading:** **"Our Services"**
- **Subtitle:** *"Practical support for your financial, taxation, registration, and business compliance needs."*
- **Search & Category Tabs:** Real-time search across all 15 services with instantaneous filtering by category.
- **Interactive Service Cards:** Featuring Lucide icons, eligibility indicators, and dual actions (`Learn More` modal trigger and `Request Consultation`).

#### Section 5: Promotional CTA Banner
- **Heading:** **"Let's Simplify Your Business Compliance"**
- **Supporting Text:** *"Explore the right consultancy services for your financial, registration, accounting, and licensing requirements."*
- **Actions:** High-contrast `Request a Consultation` button and secondary `Explore All Services` link.
- **Trust Metrics:** Preparation checklists, portal submissions, and confidential client data handling.

#### Section 6: Contact & Consultation Desk
- **Office Placeholders:** Clearly designated contact details (phone, email, street address, business hours) configured via `siteConfig.ts`.
- **Consultation Form:** 15-service dropdown, full Zod validation, error indicators, loading spinner, and reference ID confirmation.

#### Section 7: Footer
- **4 Columns:** Brand Summary, Quick Links, Core Services, and Editable Contact Details.
- **Legal Notice & Modals:** Built-in modal triggers for Privacy Notice, Terms and Conditions, and Statutory Disclaimer.
- **Dynamic Year:** Automatically updates on client mount (`© 2026 FINCORE CONSULTANCY SERVICES`).

---

## 4. Service Directory (All 15 Services across 3 Categories)

All 15 official services are configured with complete descriptions, suitability guidelines, prerequisite documents, and standard process workflows:

### Category 1: Taxation & Financial Compliance (8 Services)
1. **Tax Filing (ITR)**
   - *Description:* Individual and business income tax filing support (ITR-1 through ITR-7), tax computation, and compliance review.
   - *Key Documents:* Form 16/16A, PAN, Aadhaar, Bank Statements, AIS/TIS summary.
2. **GST Registration and Filing**
   - *Description:* GST registration and periodic return filing assistance (GSTR-1, GSTR-3B, GSTR-9) with ITC reconciliation.
   - *Key Documents:* PAN, Electricity Bill/Rental Agreement, Bank Statement, Authorization Letter.
3. **Provident Fund (PF)**
   - *Description:* Applicable provident fund compliance, employer establishment registration, and monthly Electronic Challan cum Return (ECR) filing.
   - *Key Documents:* Entity PAN, Certificate of Incorporation, Employee roster, Salary registers.
4. **ESI (Employee State Insurance)**
   - *Description:* Employee State Insurance compliance assistance, monthly contribution calculations, and statutory register upkeep.
   - *Key Documents:* Employer registration code, Employee KYC, Monthly attendance and wage sheets.
5. **TDS (Tax Deducted at Source)**
   - *Description:* TDS compliance, rate verification, challan generation, quarterly return filings (Forms 24Q, 26Q, 27Q), and Form 16/16A generation.
   - *Key Documents:* TAN, Deduction registers, Challan ITNS 281 records, Deductee PAN list.
6. **TCS (Tax Collected at Source)**
   - *Description:* Tax Collected at Source compliance under Section 206C, periodic return filing (Form 27EQ), and TCS certificate issuance.
   - *Key Documents:* TAN, Invoices with TCS collection, Deposit challans, Buyer PAN details.
7. **Professional Tax (PT)**
   - *Description:* Applicable state-wise professional tax registration (PT EC & PT RC), slab calculation, and periodic return filing.
   - *Key Documents:* Business proof, Employee count & salary brackets, Municipal license copy.
8. **Accounting and Bookkeeping**
   - *Description:* Financial records maintenance, double-entry bookkeeping, bank reconciliation, trial balance, and pre-audit schedules.
   - *Key Documents:* Bank statements, Sales & Purchase invoices, Expense vouchers, Asset receipts.

### Category 2: Business Registration (3 Services)
9. **Company Incorporation**
   - *Description:* Support for eligible business structures (Private Limited, One Person Company, LLP) via MCA SPICe+ and RUN forms.
   - *Key Documents:* Director PAN & Aadhaar, Digital Signature Certificate (DSC), Utility bill of registered office, MoA & AoA drafts.
10. **Partnership Firm Registration**
    - *Description:* Assistance with partnership deed drafting, stamp duty guidance, notarization, PAN issuance, and Registrar of Firms (RoF) submission.
    - *Key Documents:* Partnership Deed on stamp paper, Partners' KYC proofs, Registered office address proof.
11. **Business Registration**
    - *Description:* Guidance on suitable business registrations including Sole Proprietorship, MSME / Udyam registration, and Shop & Establishment Act setup.
    - *Key Documents:* Proprietor PAN & Aadhaar, Commercial address proof, Canceled cheque, Mobile linked to Aadhaar.

### Category 3: Licenses & Regulatory Compliance (4 Services)
12. **Trade License**
    - *Description:* Assistance with applicable municipal trade licenses, commercial premises occupancy permits, and statutory renewals.
    - *Key Documents:* Property tax receipt / Lease agreement, NOC from property owner, Sanctioned plan.
13. **Labour License and Compliance**
    - *Description:* Guidance on applicable labour registrations, Contract Labour Act permits, and statutory muster roll registers.
    - *Key Documents:* Principal employer certificate, Contractor agreement, Form V, Workforce deployment list.
14. **Food License (FSSAI)**
    - *Description:* Assistance with applicable food business operator licensing (Basic Registration, State License, Central License) via FoSCoS.
    - *Key Documents:* Food category list, Water test report, Layout blueprint, FSMS plan, Proprietor KYC.
15. **Other Business Licenses**
    - *Description:* Support for specialized commercial approvals including Import Export Code (IEC), Pollution Control Board clearance, and industry permits.
    - *Key Documents:* PAN, Bank certificate (ANF-2A), Specific sectoral clearances.

---

## 5. Single Page Application (SPA) & Modal Architecture

The user experience is entirely contained in a single fluid page, avoiding disruptive page reloads while providing in-depth inspection via modals:

### Global State (`SPAContext.tsx`)
```tsx
interface SPAContextType {
  openConsultation: (serviceName?: string) => void;
  closeConsultation: () => void;
  openLegal: (type: LegalDocType) => void;
  closeLegal: () => void;
}
```

### In-Page Modals
1. **`ServiceDetailModal.tsx`:** Triggered when clicking "Learn More" on any service card. Presents service overview, suitability rules, required documents list, process steps, and a direct consultation CTA.
2. **`ConsultationModal.tsx`:** Triggered from the navbar, hero buttons, or service cards. Opens pre-populated with the selected service name.
3. **`LegalModal.tsx`:** Displays Privacy Policy, Terms & Conditions, and Statutory Disclaimers with full accessibility (ESC key to dismiss, body scroll lock, focus trap).

---

## 6. Interactive Animation & Micro-Interactions

Built using modern Tailwind CSS and hardware-accelerated CSS `@keyframes` with smooth cubic-bezier timing:

- **Staggered Hero Entrance:** Headline, copy, actions, and verification chips cascade in with `animate-fade-in-up` (delays 120ms, 240ms, 360ms).
- **Subtle Floating Physics (`animate-float`):** The compliance console gently oscillates (`transform: translateY(-8px)` over 5s ease-in-out), giving an organic, modern feel.
- **MCA Progress Fill (`animate-progress-fill`):** The SPICe+ formation track smoothly fills from 0% to 85% with a cyan-to-blue gradient.
- **Interactive Card Hover (`card-interactive`):** Service cards elevate with `-5px` translateY and a soft dual-layer shadow on hover.
- **Top Accent Reveal:** Linear gradient bar scales from `origin-left` on card hover (`scale-x-0 group-hover:scale-x-100`).
- **Icon Hover Micro-Rotation:** Lucide service icons scale by 105% and tilt `-3deg` on card hover.
- **Button Light Sweep (`btn-hover-shine`):** Primary action buttons feature a 25-degree angled translucent reflection that glides across the button on hover.
- **Spring-Popped Modals (`animate-modal-pop`):** Modals emerge with a slight scale (`0.96` to `1.0`) and translation (`14px` to `0`) for smooth presentation.

---

## 7. Consultation Form, Security & Anti-Spam Pipeline

The consultation system is built to enterprise standards with full client-side and server-side verification:

```
[User Form Input] 
       │
       ▼
[Client-side Zod Validation] ──(Fails)──> Accessible error hints
       │ (Passes)
       ▼
[Hidden Honeypot Field Check] ──(Bot Detected)──> Silent rejection / drop
       │ (Clean)
       ▼
[Next.js API Route (/api/consultation)]
       │
       ▼
[Server-side Sanitization & Reference ID Generation]
       │
       ▼
[Persistent Storage (Supabase / Webhook / CRM)]
       │
       ▼
[Client Confirmation Screen with Reference Code (e.g., FIN-20261017-8492)]
```

### Security Highlights
- **Zero Sensitive Data Storage:** No banking passwords, tax portal PINs, or confidential credentials are requested or stored on public forms.
- **Honeypot Anti-Spam:** An invisible field catches automated bots without bothering real visitors with intrusive captchas.
- **Reference Tracking:** Every successful submission returns a timestamped tracking ID for follow-up reference.

---

## 8. Project Structure & Component Hierarchy

```
FINCORE/
├── public/                      # Static assets, favicon, manifest
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── consultation/    # Next.js API endpoint for consultation requests
│   │   ├── favicon.ico
│   │   ├── globals.css          # Tailwind CSS theme, keyframes & animations
│   │   ├── layout.tsx           # Root HTML layout, font setup, metadata
│   │   ├── page.tsx             # Master SPA homepage strictly following wireframe
│   │   ├── robots.ts            # SEO crawling directives
│   │   └── sitemap.ts           # Dynamic XML sitemap
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky navigation with section scroll-spy
│   │   ├── HeroSection.tsx      # Executive royal blue hero & compliance desk
│   │   ├── AboutSection.tsx     # Narrative + 3 visual highlight cards
│   │   ├── ServicesSection.tsx  # 15 services with tabs & live search
│   │   ├── ServiceCard.tsx      # Atomic card component with hover elevation
│   │   ├── ServiceDetailModal.tsx # Detailed service modal with document checklist
│   │   ├── CTASection.tsx       # Promotional banner with deep blue gradient
│   │   ├── ConsultationForm.tsx # In-page contact & consultation desk
│   │   ├── ConsultationModal.tsx# Global modal for consultation requests
│   │   ├── LegalModal.tsx       # In-page legal policy viewer
│   │   └── Footer.tsx           # 4-column footer with dynamic copyright
│   ├── context/
│   │   └── SPAContext.tsx       # Global state for modals and navigation
│   ├── data/
│   │   ├── servicesData.ts      # Structured data for all 15 services
│   │   └── siteConfig.ts        # Centralized brand, contact, and legal metadata
│   └── lib/
│       └── validations/
│           └── consultation.ts  # Zod schema for consultation requests
├── supabase/
│   └── schema.sql               # Optional PostgreSQL schema for enquiry persistence
├── .env.example                 # Environment variable templates
├── next.config.ts               # Next.js 16 configuration
├── package.json                 # Project dependencies & scripts
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript strict configuration
```

---

## 9. Local Development & Environment Setup

### Prerequisites
- **Node.js:** `v18.18+` or `v20+`
- **npm:** `v9+` or `v10+`

### Installation Steps
```bash
# 1. Clone repository and navigate to root directory
cd FINCORE

# 2. Install dependencies
npm install

# 3. Create your local environment configuration
cp .env.example .env.local

# 4. Start local development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 10. Production Build & Deployment

### Build Verification
Run the production build to compile static pages and verify TypeScript type safety:

```bash
npm run build
```

The output will confirm static page prerendering and partial prefetching across all routes:
```
▲ Next.js 16.4.1 (Turbopack)
✓ Compiled successfully
✓ Finished TypeScript validation
✓ Generating static pages (17/17)
```

To test the production build locally:
```bash
npm run start
```

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub or GitLab.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `FINCORE` repository.
4. Next.js 16 preset will be automatically detected with `npm run build`.
5. Under **Environment Variables**, provide any optional keys from `.env.example`.
6. Click **"Deploy"**. Vercel will provision an edge-distributed HTTPS URL with automated SSL.

---

## 11. Indian Regulatory Integrity & Legal Disclaimers

### Statutory Notice
FINCORE Consultancy Services provides facilitation, documentation preparation, and advisory assistance for business registrations, statutory filings, and compliance mandates. 

All statutory approvals, Certificate of Incorporation (CIN) issuances, GSTIN allocations, trademark registrations, municipal trade permits, and FSSAI licenses remain under the sole jurisdiction and verification of the respective Indian statutory departments:
- **Ministry of Corporate Affairs (MCA)**
- **Goods and Services Tax Network (GSTN) / Central Board of Indirect Taxes and Customs (CBIC)**
- **Income Tax Department, Government of India (CBDT)**
- **Employees' Provident Fund Organisation (EPFO)**
- **Employees' State Insurance Corporation (ESIC)**
- **Food Safety and Standards Authority of India (FSSAI)**
- **Local Municipal Corporations and State Labour Departments**

FINCORE does not make unsubstantiated claims regarding government relationships or guaranteed outcomes. All consultancy is provided on verified statutory frameworks and documented client authorization.
# FINCORE
