export interface ClientCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyNeeds: string[];
  recommendedServices: string[];
  iconName: string;
}

export const clientCategories: ClientCategory[] = [
  {
    id: "individuals-salaried",
    title: "Individuals & Salaried Professionals",
    subtitle: "Personal taxation, deductions & asset compliance",
    description:
      "For employees, high-net-worth individuals, and executives navigating complex salary structures, ESOPs, capital gains from stocks/mutual funds, and foreign asset disclosures.",
    keyNeeds: [
      "Annual Income Tax Return (ITR-1 / ITR-2) filing",
      "Capital gains computation on equity and property transactions",
      "Maximization of eligible statutory deductions under Chapter VI-A",
      "Scrutiny resolution and response to income tax compliance intimations",
    ],
    recommendedServices: [
      "Income Tax Return (ITR) Filing",
      "TDS Mismatch Rectification",
      "AIS / TIS Statement Reconciliation",
    ],
    iconName: "UserCheck",
  },
  {
    id: "freelancers-consultants",
    title: "Freelancers & Consultants",
    subtitle: "Presumptive taxation, GST on export & expense claims",
    description:
      "For independent software developers, designers, writers, architects, and knowledge consultants working with domestic and international clients.",
    keyNeeds: [
      "Presumptive taxation scheme assistance (Section 44ADA)",
      "GST registration for cross-border export of services or domestic thresholds",
      "Letter of Undertaking (LUT) filing for export of services without IGST",
      "Tracking deductible business expenses and advance tax calculations",
    ],
    recommendedServices: [
      "Section 44ADA Presumptive Tax Filing",
      "GST Registration & LUT Filing",
      "Quarterly Advance Tax Computation",
    ],
    iconName: "Laptop",
  },
  {
    id: "startups-entrepreneurs",
    title: "Startups & Entrepreneurs",
    subtitle: "Incorporation, founder agreements & compliance launchpad",
    description:
      "For innovative founders building scalable ventures who need solid legal foundations, MCA incorporation, DPIIT recognition, and investor-ready compliance.",
    keyNeeds: [
      "Private Limited Company or LLP incorporation under MCA SPICe+",
      "Startup India / DPIIT recognition guidance",
      "Issuance of share certificates and post-incorporation RoC filings",
      "Core tax registrations including GST, PAN, TAN, and MSME/Udyam",
    ],
    recommendedServices: [
      "Private Limited Company Registration",
      "DPIIT Recognition Assistance",
      "RoC Post-Incorporation Compliance",
    ],
    iconName: "Rocket",
  },
  {
    id: "smbs",
    title: "Small & Medium Businesses (SMBs)",
    subtitle: "Bookkeeping, periodic GST & statutory peace of mind",
    description:
      "For manufacturing, trading, and regional service enterprises needing dependable accounting, timely monthly GST filings, and disciplined vendor reconciliations.",
    keyNeeds: [
      "Monthly bookkeeping and bank reconciliations",
      "Regular GSTR-1 and GSTR-3B filings with input tax credit matching",
      "Udyam registration for MSME credit access and interest protection",
      "Preparation of year-end balance sheets and profit & loss statements",
    ],
    recommendedServices: [
      "Day-to-Day Accounting & Bookkeeping",
      "Monthly GST Return Filing",
      "Udyam / MSME Registration",
    ],
    iconName: "Factory",
  },
  {
    id: "partnership-firms",
    title: "Partnership Firms",
    subtitle: "Deed formulation, firm registration & profit sharing compliance",
    description:
      "For business partners joining forces under conventional partnership deeds or registered Limited Liability Partnerships seeking structural transparency.",
    keyNeeds: [
      "Drafting robust Partnership Deeds or LLP Agreements",
      "Registration with the Registrar of Firms or Ministry of Corporate Affairs",
      "PAN and TAN registration in the firm's legal name",
      "Tax filing under Form ITR-5 with partner remuneration accounting",
    ],
    recommendedServices: [
      "Partnership Deed Drafting & Registration",
      "LLP Agreement Filing (Form 3)",
      "ITR-5 Firm Tax Return Filing",
    ],
    iconName: "Briefcase",
  },
  {
    id: "established-companies",
    title: "Established Companies",
    subtitle: "Corporate secretarial assistance & multi-state compliance",
    description:
      "For operating corporations that require rigorous statutory calendar management, annual ROC filings, board resolution documentation, and internal reviews.",
    keyNeeds: [
      "Annual RoC filings (AOC-4, MGT-7) and Director KYC (DIR-3 KYC)",
      "TDS and TCS quarterly return reconciliations and Form 16 issuance",
      "Statutory payroll deductions (EPFO & ESIC monthly filings)",
      "Assistance in coordinating books of accounts for statutory audit",
    ],
    recommendedServices: [
      "Annual RoC Statutory Compliance",
      "TDS / TCS Corporate Compliance",
      "EPFO / ESIC Retainership",
    ],
    iconName: "Building",
  },
  {
    id: "retailers-traders",
    title: "Retailers & Traders",
    subtitle: "Municipal trade licenses, shop acts & inventory tax",
    description:
      "For wholesale traders, distributors, and retail showroom operators managing inventory, point-of-sale invoicing, and municipal clearances.",
    keyNeeds: [
      "Municipal Trade License application and annual renewal",
      "Shop and Commercial Establishment Act registration",
      "GST registration and electronic invoicing / e-way bill coordination",
      "Quarterly composition or regular GST return reconciliations",
    ],
    recommendedServices: [
      "Municipal Trade License Assistance",
      "Shop & Establishment Act Filing",
      "GST & E-Way Bill Advisory",
    ],
    iconName: "Store",
  },
  {
    id: "food-businesses",
    title: "Food Businesses",
    subtitle: "FSSAI licensing, hygiene clearances & cloud kitchen permits",
    description:
      "For cloud kitchens, restaurants, bakers, packaged food manufacturers, and cafeteria operators requiring mandatory food safety clearances.",
    keyNeeds: [
      "FSSAI Basic Registration or State/Central Food Safety License",
      "FoSCoS portal application management and food category classification",
      "Premise municipal trade clearances and NOC documentation",
      "Periodic food safety return filings where mandated",
    ],
    recommendedServices: [
      "FSSAI Food License (Basic / State)",
      "Commercial Trade Permit Assistance",
      "Food Safety Documentation Review",
    ],
    iconName: "UtensilsCrossed",
  },
];
