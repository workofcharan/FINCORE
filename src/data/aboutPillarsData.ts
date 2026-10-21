import { Compass, FileCheck2, Briefcase, LucideIcon } from "lucide-react";

export interface PillarFeature {
  title: string;
  description: string;
}

export interface AboutPillarItem {
  id: "clear-guidance" | "compliance-support" | "business-solutions";
  title: string;
  tagline: string;
  metric: string;
  category: string;
  icon: LucideIcon;
  summary: string;
  overview: string;
  features: PillarFeature[];
  deliverables: string[];
  riskProtection: {
    heading: string;
    description: string;
    statutoryRef: string;
  };
  recommendedServices: {
    name: string;
    description: string;
  }[];
}

export const aboutPillarsData: AboutPillarItem[] = [
  {
    id: "clear-guidance",
    title: "Clear Guidance",
    tagline: "Transparent Statutory Clarity",
    metric: "Clarity First",
    category: "Statutory Advisory & Regulatory Demystification",
    icon: Compass,
    summary:
      "We translate complex statutory jargon into clear, practical roadmaps tailored to your specific individual or business operational structure.",
    overview:
      "Indian fiscal and regulatory provisions—spanning the Income Tax Act 1961, CGST/SGST Acts, and the Companies Act 2013—are packed with dense legalese, technical thresholds, and frequent notifications. At FINCORE, 'Clear Guidance' means stripping away bureaucratic confusion. We convert ambiguous legal requirements into a straightforward, calendarized roadmap customized to your specific entity type.",
    features: [
      {
        title: "Statutory Jargon Demystification",
        description:
          "We break down complex tax sections, eligible deductions (80C to 80U), Presumptive Taxation (Sec 44AD / 44ADA), and GST thresholds into plain, actionable advice so you make informed financial decisions without feeling lost.",
      },
      {
        title: "Entity-Tailored Compliance Mapping",
        description:
          "Whether you are a salaried individual with capital gains, an independent freelance consultant, a partnership firm, or a Private Limited Company, we map out your exact statutory obligations across the entire fiscal year.",
      },
      {
        title: "Upfront Cost & Scope Transparency",
        description:
          "Zero hidden retainer fees or surprise processing costs. Every statutory government challan, filing deadline, and advisory milestone is detailed clearly before any engagement begins.",
      },
      {
        title: "Pre-Filing Document Screening",
        description:
          "Rigorous preliminary verification of PAN-Aadhaar linking, bank account validations, Form 26AS/AIS entries, and portal credentials before lodging forms to prevent defective returns and delays.",
      },
    ],
    deliverables: [
      "Annual Statutory Compliance Calendar tailored to your turnover & scale",
      "Plain-Language Regime Optimization Analysis (Old vs New Tax Regime Sec 115BAC)",
      "Structured Prerequisite KYC & Financial Document Checklist",
      "1-on-1 Advisory Session with an experienced statutory consultant",
      "Defective Return & Resubmission Prevention Screening",
    ],
    riskProtection: {
      heading: "Notice & Defective Return Prevention",
      description:
        "Prevents defective return notices under Section 139(9), under-reporting penalties under Section 270A, and loss of legitimate tax deductions due to incorrect classification.",
      statutoryRef: "Income Tax Act 1961 & Indian Regulatory Framework",
    },
    recommendedServices: [
      {
        name: "Income Tax Return (ITR) Filing",
        description: "Precision return filing for individuals, firms, and companies with verified deductions.",
      },
      {
        name: "TDS / TCS Compliance",
        description: "Quarterly deduction reconciliation, challan payments, and Form 16/16A generation.",
      },
      {
        name: "Financial Advisory & Documentation",
        description: "Structured statement analysis, asset verification, and statutory bookkeeping.",
      },
    ],
  },
  {
    id: "compliance-support",
    title: "Compliance-Focused Support",
    tagline: "Systematic Filing Verification",
    metric: "Verified Scope",
    category: "Government Portal Data Integrity & Reconciliation",
    icon: FileCheck2,
    summary:
      "Every registration, return, and municipal application is verified against current Indian regulatory checklists to eliminate omissions and errors.",
    overview:
      "Statutory compliance in India is tightly synchronized across digital networks—including the Income Tax e-Filing Portal, GSTN, MCA21, EPFO Unified Portal, and Shram Suvidha. Any omission, numerical mismatch, or incorrect challan tagging triggers automated computer scrutiny and immediate notices. FINCORE's Compliance-Focused Support implements an uncompromising, multi-tier verification process that validates every figure, document, and schedule against official checklists before submission.",
    features: [
      {
        title: "Multi-Point Cross-Reconciliation",
        description:
          "Rigorous 3-way reconciliation comparing accounting ledgers, GSTR-1 outward supplies, GSTR-3B tax summaries, and auto-populated GSTR-2B Input Tax Credit (ITC) to protect your working capital.",
      },
      {
        title: "Checklist-Driven Portal Submissions",
        description:
          "Every GST, MCA, and municipal filing is vetted against current government guidelines, ensuring valid HSN/SAC codes, correct RCM classifications, and verified DSC/EVC credentials.",
      },
      {
        title: "Proactive Deadline Surveillance",
        description:
          "Continuous tracking of advance tax cutoffs, monthly/quarterly GST returns, TDS quarterly returns, and annual ROC filings to prevent avoidable interest and late fee penalties.",
      },
      {
        title: "Official Government Acknowledgments",
        description:
          "Immediate delivery of official government-generated receipts (ITR-V, GSTR ARN, MCA SRN, EPFO ECR) alongside audit-ready digital archives for statutory scrutiny.",
      },
    ],
    deliverables: [
      "Comprehensive Pre-Filing Data Reconciliation Report (Books vs Portal)",
      "Official Government Filing Acknowledgments (ITR-V, GSTR ARN, MCA SRN)",
      "Automated Due Date Reminder Alerts via Email & WhatsApp",
      "Official Government Challan & Tax Payment Records",
      "Notice Scrutiny Assessment & Statutory Reply Assistance",
    ],
    riskProtection: {
      heading: "Severe Late Fees & Scrutiny Prevention",
      description:
        "Shields your entity against mandatory late fees under Section 234F (up to ₹5,000), daily GST late fees under Section 47 (₹50/day), interest under Section 50, and GST registration cancellations.",
      statutoryRef: "CGST/SGST Acts 2017 & ITD Scrutiny Protocols",
    },
    recommendedServices: [
      {
        name: "GST Registration & Return Filing",
        description: "GSTR-1, GSTR-3B, GSTR-9 annual reconciliations, and proactive ITC maximization.",
      },
      {
        name: "TDS Compliance & Returns",
        description: "Form 24Q, 26Q, 27Q quarterly filings with zero challan mismatch errors.",
      },
      {
        name: "EPF & ESI Monthly Compliance",
        description: "Monthly ECR generation, wage ceiling compliance, and contribution challans.",
      },
    ],
  },
  {
    id: "business-solutions",
    title: "Business-Oriented Solutions",
    tagline: "Scalable Enterprise Facilitation",
    metric: "Growth Aligned",
    category: "Commercial Structuring, Licensing & Enterprise Scaling",
    icon: Briefcase,
    summary:
      "From early sole proprietorships to expanding corporate bodies, our advisory adapts to your transaction volume and commercial growth stages.",
    overview:
      "Compliance should never be a roadblock to commercial velocity; rather, it serves as the rock-solid foundation for enterprise scalability, banking credit, and institutional confidence. Whether you are bootstrapping a local proprietorship, launching an innovative startup, or scaling a multi-state enterprise, FINCORE provides agile, growth-aligned advisory. We adapt our operational support to match your expanding transaction volume, employee headcount, and commercial milestones.",
    features: [
      {
        title: "Strategic Entity Formation & Transition",
        description:
          "Guiding founders to choose between Sole Proprietorship, Partnership Firm, LLP, or Private Limited Company (MCA SPICe+) based on liability, equity structuring, and operational needs.",
      },
      {
        title: "Commercial & Municipal Licensing Suites",
        description:
          "End-to-end facilitation for essential operating permits including Municipal Trade Licenses, Shops & Establishments Registration, MSME/Udyam, and FSSAI Food Licenses.",
      },
      {
        title: "Workforce & Labour Law Expansion",
        description:
          "Seamlessly establishing employee statutory welfare infrastructure (EPFO, ESIC, Professional Tax) as your payroll crosses statutory headcount thresholds.",
      },
      {
        title: "Banking, Tender & Investor Readiness",
        description:
          "Structuring clean statutory records, pristine ROC annual records, and verified financial filings that satisfy bank underwriters, venture capitalists, and enterprise vendor audits.",
      },
    ],
    deliverables: [
      "Official Government Incorporation Documentation (COI, PAN, TAN, MoA/AoA)",
      "Municipal & Sector-Specific Operating Licenses (Trade License, Shop Act, FSSAI)",
      "MSME Udyam Registration Certificate with Priority Lending Benefits",
      "Labour Law Establishment Registrations (EPF Code, ESI Code, PT)",
      "Commercial Growth Scaling Blueprint for Multi-State Expansion",
    ],
    riskProtection: {
      heading: "Unlicensed Operation & Dilution Safeguards",
      description:
        "Prevents municipal closure notices, disqualification from government/corporate procurement tenders, and severe personal liability pitfalls associated with informal business setups.",
      statutoryRef: "Companies Act 2013, MSMED Act 2006 & Municipal Corporation Acts",
    },
    recommendedServices: [
      {
        name: "Company & LLP Incorporation",
        description: "MCA SPICe+ registration with complete DIN, digital signatures, and name approval.",
      },
      {
        name: "Partnership Firm Registration",
        description: "Custom partnership deed drafting, notary, and Registrar of Firms documentation.",
      },
      {
        name: "Trade License & Municipal Permits",
        description: "Local municipal clearance ensuring legal commercial establishment.",
      },
      {
        name: "MSME / Udyam Registration",
        description: "Unlocking government subsidies, priority bank lending, and statutory protection.",
      },
    ],
  },
];
