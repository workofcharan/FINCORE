export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "taxation" | "registration" | "accounting" | "licensing";
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "general",
    question: "What services does FINCORE provide?",
    answer:
      "FINCORE CONSULTANCY SERVICES provides structured assistance across six primary domains: (1) Taxation & Financial Compliance (ITR, GST, TDS, Professional Tax), (2) Business & Company Registration (Private Limited, LLP, Partnership, Proprietorship), (3) Accounting & Bookkeeping (day-to-day entries, reconciliations, financial statements), (4) Licenses & Business Approvals (Trade Licenses, FSSAI, Shop Act), (5) Payroll & Statutory Compliance (PF, ESI, payroll registers), and (6) Business Advisory & Setup Planning.",
  },
  {
    id: "faq-2",
    category: "general",
    question: "Can individuals and businesses both contact FINCORE?",
    answer:
      "Yes. We assist individual taxpayers, salaried executives, and freelancers with personal tax filing and asset declarations, as well as startups, partnerships, traders, and established corporate entities with company registration, bookkeeping, and comprehensive statutory compliance.",
  },
  {
    id: "faq-3",
    category: "taxation",
    question: "What documents are required for GST registration?",
    answer:
      "Document requirements depend on the legal structure of the business. Typically, you will need: (1) PAN card of the applicant or corporate entity, (2) Aadhaar card and photograph of promoters/authorized signatories, (3) Proof of principal place of business (such as electricity bill, property tax receipt, alongside a rent agreement and owner NOC if rented), and (4) Bank proof (cancelled cheque or recent bank statement showing entity name and account number).",
  },
  {
    id: "faq-4",
    category: "taxation",
    question: "Can FINCORE help with income tax return filing?",
    answer:
      "Yes. FINCORE assists in compiling, reconciling, and filing ITRs for salaried individuals, self-employed professionals, presumptive tax filers (Section 44ADA/44AD), partnership firms, and corporate entities. We review Form 16/16A, 26AS, AIS/TIS records, and capital gain statements before filing.",
  },
  {
    id: "faq-5",
    category: "registration",
    question: "How do I register a new company or partnership?",
    answer:
      "The process begins with evaluating your business model to choose the right vehicle (Private Limited, LLP, or Partnership Firm). We guide you through partner/director KYC collation, Digital Signature Certificate (DSC) acquisition, corporate name availability checks via the Ministry of Corporate Affairs (MCA), drafting constitutional documents (MoA & AoA or Partnership Deed), and submitting unified registration forms (SPICe+ or state registrar submissions).",
  },
  {
    id: "faq-6",
    category: "accounting",
    question: "Can I request accounting and bookkeeping services on an ongoing basis?",
    answer:
      "Yes. We offer recurring accounting coordination for businesses that do not require a full-time in-house accounts department. This includes recording monthly sales and purchases, classifying operating expenditures, reconciling bank and payment gateway statements, and producing verified trial balances and financial statements for management review.",
  },
  {
    id: "faq-7",
    category: "licensing",
    question: "How can I obtain a business or food license (FSSAI)?",
    answer:
      "Business licenses depend on your operational sector and municipal jurisdiction. For food operations, we assist with FSSAI registration or licensing via the FoSCoS portal based on annual turnover and business capacity. For commercial premises, we coordinate documentation for local Municipal Trade Licenses and State Shop and Commercial Establishment registrations.",
  },
  {
    id: "faq-8",
    category: "general",
    question: "How can I enquire about service fees?",
    answer:
      "Because service scope varies depending on transaction volume, entity type, state-specific government fees, and filing periodicity, we provide customized fee estimates after an initial requirement assessment. You can submit an enquiry via our consultation form or reach out directly to discuss your specific needs.",
  },
  {
    id: "faq-9",
    category: "general",
    question: "How long does a registration or statutory filing take?",
    answer:
      "Processing timelines depend on several factors: the completeness of client documents, Digital Signature verification, and crucially, government departmental processing queues (such as MCA, GST, or Municipal authority verification officers). While document preparation is handled promptly, statutory approvals remain subject to government agency turnaround times.",
  },
];
