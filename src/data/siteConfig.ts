export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  phone: {
    display: string;
    value: string;
    isConfigured: boolean;
  };
  email: {
    display: string;
    value: string;
    isConfigured: boolean;
  };
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    isConfigured: boolean;
  };
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  whatsapp: {
    number: string;
    message: string;
    isConfigured: boolean;
  };
  disclaimer: string;
}

export const siteConfig: SiteConfig = {
  name: "FINCORE",
  legalName: "FINCORE CONSULTANCY SERVICES",
  tagline: "Your Trusted Partner in Finance, Compliance & Business Growth",
  description:
    "Professional consultancy providing financial, taxation, business registration, accounting, compliance, and licensing services to individuals, startups, entrepreneurs, and established companies across India.",
  url: "https://fincoreconsultancy.com",
  phone: {
    display: "+91 (080) 4123 4567",
    value: "+918041234567",
    isConfigured: true,
  },
  email: {
    display: "contact@fincoreconsultancy.com",
    value: "contact@fincoreconsultancy.com",
    isConfigured: true,
  },
  address: {
    street: "Business District Hub, Financial Towers",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    isConfigured: true,
  },
  businessHours: {
    weekdays: "Monday – Friday: 9:30 AM – 6:30 PM IST",
    saturday: "Saturday: 10:00 AM – 2:30 PM IST",
    sunday: "Sunday: Closed (Online Enquiries Open)",
  },
  whatsapp: {
    number: "",
    message: "Hello FINCORE team, I would like to enquire about consultancy services for my requirement.",
    isConfigured: false, // When true, links will connect directly to official WhatsApp
  },
  disclaimer:
    "FINCORE CONSULTANCY SERVICES provides facilitation, documentation, and consultancy assistance for business registrations, statutory filings, and compliance. All registrations, licenses, tax assessments, and statutory approvals are subject to government authority regulations, applicable laws, submission of verified documentation, and approval by relevant regulatory bodies. FINCORE does not guarantee statutory approvals or outcomes outside regulatory jurisdiction.",
};

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "Taxation & Financial Compliance", href: "/services/taxation-compliance" },
      { name: "Business & Company Registration", href: "/services/business-registration" },
      { name: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
      { name: "Licenses & Business Approvals", href: "/services/licenses-approvals" },
      { name: "Payroll & Employee Compliance", href: "/services/payroll-compliance" },
      { name: "Business Consultancy", href: "/services/business-consultancy" },
    ],
  },
  { name: "Contact", href: "/contact" },
];
