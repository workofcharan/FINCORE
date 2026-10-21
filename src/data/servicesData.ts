export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  category: "Taxation & Financial Compliance" | "Business Registration" | "Licenses & Regulatory Compliance";
  categorySlug: "taxation-compliance" | "business-registration" | "licenses-compliance";
  description: string;
  iconName: string;
  whatItMeans: string;
  suitability: string[];
  keyDocuments: string[];
  processSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  regulatoryNotice: string;
}

export interface ServiceCategoryMeta {
  title: "Taxation & Financial Compliance" | "Business Registration" | "Licenses & Regulatory Compliance";
  slug: string;
  tagline: string;
  description: string;
  serviceCount: number;
}

export const serviceCategories: ServiceCategoryMeta[] = [
  {
    title: "Taxation & Financial Compliance",
    slug: "taxation-compliance",
    tagline: "Accurate filing, timely submissions, and structured tax management",
    description:
      "Comprehensive income tax, GST, TDS/TCS, payroll compliance, and bookkeeping support designed to keep individuals and business entities legally compliant under Indian tax regulations.",
    serviceCount: 8,
  },
  {
    title: "Business Registration",
    slug: "business-registration",
    tagline: "Procedural clarity for establishing legal business structures in India",
    description:
      "End-to-end documentation, name approvals, constitutional drafting, and registration filings for private limited companies, LLPs, partnership firms, and sole proprietorships.",
    serviceCount: 3,
  },
  {
    title: "Licenses & Regulatory Compliance",
    slug: "licenses-compliance",
    tagline: "Statutory permits and municipal licenses for legitimate business operations",
    description:
      "Guidance and liaison support for commercial trade licenses, labour registrations, FSSAI food business licensing, and industry-specific statutory authorizations.",
    serviceCount: 4,
  },
];

export const allServices: ServiceItem[] = [
  // ==========================================
  // Category 1: Taxation & Financial Compliance (8 Services)
  // ==========================================
  {
    id: "tax-filing",
    slug: "tax-filing",
    name: "Tax Filing",
    category: "Taxation & Financial Compliance",
    categorySlug: "taxation-compliance",
    description: "Individual and business income tax filing support (ITR-1 through ITR-7), tax computation, and compliance review.",
    iconName: "ReceiptText",
    whatItMeans:
      "Income tax filing involves compiling total taxable revenues, claiming legitimate statutory deductions, reconciling withholding taxes (Form 26AS/AIS/TIS), and submitting verified tax returns to the Income Tax Department.",
    suitability: [
      "Salaried professionals with multiple employers, dividend, or capital gain earnings",
      "Freelancers, professionals, and consultants opting for presumptive or regular taxation",
      "Proprietorships, partnership firms, LLPs, and corporate business entities",
      "Non-resident Indians (NRIs) with taxable income sources situated in India",
    ],
    keyDocuments: [
      "PAN Card and Aadhaar Card linkage verification",
      "Form 16 / 16A and updated Form 26AS, AIS, and TIS statements",
      "Bank account statements for all operational bank accounts during the financial year",
      "Deduction proofs (Section 80C, 80D, 80G, NPS, housing loan interest certificates)",
      "Capital gains statements from brokerage firms or mutual fund asset managers (where applicable)",
    ],
    processSteps: [
      {
        step: 1,
        title: "Income & Deduction Assessment",
        description: "We review your income streams, salary structures, capital gains, and deduction claims for mathematical and statutory accuracy.",
      },
      {
        step: 2,
        title: "Reconciliation with Portal Data",
        description: "Taxes paid, advance tax challans, and TDS credits are matched against income tax portal AIS/TIS and 26AS records.",
      },
      {
        step: 3,
        title: "Draft Review & Client Approval",
        description: "A preliminary computation sheet is presented for your confirmation prior to final submission.",
      },
      {
        step: 4,
        title: "ITR Filing & e-Verification Support",
        description: "We upload the finalized return to the e-filing portal and guide you through Aadhaar OTP or net banking e-verification.",
      },
    ],
    regulatoryNotice:
      "Applicable tax slabs, deduction eligibility, and filing due dates depend on the tax regime chosen (New vs Old) and annual notifications by the Central Board of Direct Taxes (CBDT).",
  },
  {
    id: "gst-registration-filing",
    slug: "gst-registration-filing",
    name: "GST Registration and Filing",
    category: "Taxation & Financial Compliance",
    categorySlug: "taxation-compliance",
    description: "GST registration assistance and periodic return filing support (GSTR-1, GSTR-3B, GSTR-9) with input tax credit reconciliation.",
    iconName: "FileSpreadsheet",
    whatItMeans:
      "Goods and Services Tax (GST) is India's destination-based indirect tax. Compliance requires applying for a Goods and Services Tax Identification Number (GSTIN) when eligible or required, reporting monthly/quarterly turnover, and reconciling Input Tax Credit (ITC).",
    suitability: [
      "Businesses exceeding turnover thresholds (₹40L/₹20L for goods, ₹20L/₹10L for services, as applicable)",
      "Inter-state suppliers and e-commerce sellers requiring mandatory registration",
      "Voluntary registrations seeking to pass on input tax credit to corporate clients",
      "Registered entities requiring regular GSTR-1, GSTR-3B, and annual GSTR-9 return filings",
    ],
    keyDocuments: [
      "PAN of the business entity or sole proprietor",
      "Constitution documents (Partnership Deed, Certificate of Incorporation, MoA/AoA)",
      "Principal place of business address proof (Electricity bill with NOC or registered Rent Agreement)",
      "Bank statement / cancelled cheque displaying entity name and IFSC code",
      "Authorized signatory Aadhaar, photograph, and letter of authorization / board resolution",
    ],
    processSteps: [
      {
        step: 1,
        title: "Eligibility & Documentation Review",
        description: "We inspect your business structure, premises documentation, and jurisdiction to structure the application.",
      },
      {
        step: 2,
        title: "Application Submission & ARN Generation",
        description: "Form GST REG-01 is submitted on the GST Common Portal with biometric/Aadhaar authentication assistance.",
      },
      {
        step: 3,
        title: "Query Handling & Certificate Retrieval",
        description: "We address any clarification notices issued by the jurisdictional tax officer until the GSTIN is granted.",
      },
      {
        step: 4,
        title: "Recurring Return Management",
        description: "We compile monthly sales and purchase ledgers, match GSTR-2B for eligible ITC, and file GSTR-1 and GSTR-3B on schedule.",
      },
    ],
    regulatoryNotice:
      "GST registration issuance and return validation remain subject to jurisdictional tax officer scrutiny and GST Council rules. Input Tax Credit matching adheres to Section 16(2)(aa) of the CGST Act.",
  },
  {
    id: "provident-fund",
    slug: "provident-fund",
    name: "Provident Fund (PF)",
    category: "Taxation & Financial Compliance",
    categorySlug: "taxation-compliance",
    description: "Applicable provident fund compliance and monthly Electronic Challan cum Return (ECR) filing support under EPFO.",
    iconName: "ShieldCheck",
    whatItMeans:
      "The Employees' Provident Fund (EPF) is a retirement benefit scheme managed by the EPFO. Establishments meeting employee thresholds must obtain an establishment code, enroll eligible employees, and deposit monthly statutory contributions.",
    suitability: [
      "Establishments employing 20 or more persons (mandatory under EPF & MP Act)",
      "Voluntary EPF registrations for smaller startups seeking social security benefits for staff",
      "Employers needing monthly ECR preparation, Universal Account Number (UAN) generation, and KYC seeding",
    ],
    keyDocuments: [
      "Certificate of Incorporation or Partnership Deed / Registration Certificate",
      "PAN Card of the establishment and authorized signatory",
      "Address proof of the business premise and utility bill",
      "Employee master register with Aadhaar, PAN, and bank account details for UAN generation",
      "Digital Signature Certificate (DSC) of the employer for Shram Suvidha / EPFO portal",
    ],
    processSteps: [
      {
        step: 1,
        title: "Establishment Code Verification",
        description: "We verify whether your business requires Shram Suvidha registration or voluntary establishment setup.",
      },
      {
        step: 2,
        title: "Employee Roster & UAN Allotment",
        description: "Employee details are uploaded for member enrollment, UAN allocation, and bank KYC linking.",
      },
      {
        step: 3,
        title: "Monthly Wage Register Computation",
        description: "Monthly EPF wages are calculated considering the statutory ceiling and matching employer/employee shares.",
      },
      {
        step: 4,
        title: "ECR Generation & Challan Clearance",
        description: "Electronic Challan cum Return is uploaded to the EPFO portal and payment challan generated for prompt clearing.",
      },
    ],
    regulatoryNotice:
      "EPF contributions are governed by the Employees' Provident Funds and Miscellaneous Provisions Act, 1952. Statutory thresholds and interest rates are defined by the EPFO.",
  },
  {
    id: "esi",
    slug: "esi",
    name: "ESI (Employee State Insurance)",
    category: "Taxation & Financial Compliance",
    categorySlug: "taxation-compliance",
    description: "Employee State Insurance compliance assistance, monthly contribution calculations, and statutory register upkeep.",
    iconName: "HeartPulse",
    whatItMeans:
      "Employee State Insurance (ESI) is an integrated social security scheme providing healthcare and cash benefits to employees earning within the statutory wage threshold in designated areas.",
    suitability: [
      "Factories or commercial establishments employing 10 or more workers in implemented districts",
      "Employers with staff members earning gross monthly wages up to the statutory limit (currently ₹21,000/month, ₹25,000 for persons with disabilities)",
      "Businesses seeking recurring ESIC return filing and statutory compliance support",
    ],
    keyDocuments: [
      "Registration documents of the entity and address proof",
      "PAN and GST certificate of the establishment",
      "Employee roll list with date of appointment, basic wage, and gross salary structure",
      "Employee family details and nominee particulars for ESIC Pehchan card generation",
    ],
    processSteps: [
      {
        step: 1,
        title: "Applicability Assessment",
        description: "We determine whether your operational location falls under an ESIC-notified district and review wage structures.",
      },
      {
        step: 2,
        title: "Unit Code Registration",
        description: "Online application for 17-digit ESIC Employer Code through the unified Shram Suvidha portal.",
      },
      {
        step: 3,
        title: "IP (Insured Person) Enrollment",
        description: "We register eligible employees to generate their Insurance Numbers (IP numbers).",
      },
      {
        step: 4,
        title: "Monthly Challan & Return Submissions",
        description: "Monthly employer (3.25%) and employee (0.75%) contributions are computed and paid via ESIC online portal.",
      },
    ],
    regulatoryNotice:
      "ESI compliance is governed by the Employees' State Insurance Act, 1948. Rules apply strictly based on jurisdictional district notifications and employee wage ceilings.",
  },
  {
    id: "tds",
    slug: "tds",
    name: "TDS (Tax Deducted at Source)",
    category: "Taxation & Financial Compliance",
    categorySlug: "taxation-compliance",
    description: "Tax Deducted at Source compliance, quarterly return filings (Forms 24Q, 26Q, 27Q), and Form 16/16A generation.",
    iconName: "Calculator",
    whatItMeans:
      "TDS is an indirect collection mechanism where an entity deducting payment (such as salary, contractor fees, rent, or professional charges) remits the deducted tax to the central government and files quarterly reconciliation returns.",
    suitability: [
      "Employers paying taxable salaries to staff members (Form 24Q)",
      "Businesses making payments for professional fees (194J), contracts (194C), rent (194I), or commission",
      "Entities holding a Tax Deduction and Collection Account Number (TAN)",
    ],
    keyDocuments: [
      "Valid 10-digit TAN of the deducting entity",
      "PAN of all deductees (vendors, contractors, employees)",
      "Monthly tax deduction challan copies (Challan ITNS 281) with BSR code and CIN",
      "Deduction payment ledgers and invoice vouchers",
    ],
    processSteps: [
      {
        step: 1,
        title: "Transaction & Rate Review",
        description: "We analyze vendor vouchers to verify applicable TDS sections and ensure correct deduction rates.",
      },
      {
        step: 2,
        title: "Monthly Challan Deposit Assistance",
        description: "We assist in generating Challan 281 for on-time monthly tax deposit via the e-filing portal.",
      },
      {
        step: 3,
        title: "Quarterly Return Compilation",
        description: "Preparation of quarterly e-TDS returns (24Q for salaries, 26Q for domestic non-salary payments) using FVU utilities.",
      },
      {
        step: 4,
        title: "TRACES Certificate Issuance",
        description: "Download and generation of digitally signed Form 16 and Form 16A certificates from the TRACES portal.",
      },
    ],
    regulatoryNotice:
      "TDS deduction rates and thresholds are determined by the Income-tax Act, 1961. Non-deduction or delayed filing may attract penal interest and late fees under Sections 201 and 234E.",
  },
  {
    id: "tcs",
    slug: "tcs",
    name: "TCS (Tax Collected at Source)",
    category: "Taxation & Financial Compliance",
    categorySlug: "taxation-compliance",
    description: "Tax Collected at Source compliance, quarterly return filing (Form 27EQ), and TCS certificate issuance support.",
    iconName: "Layers",
    whatItMeans:
      "Tax Collected at Source (TCS) is tax collected by a seller from the buyer at the time of sale of specified goods (such as timber, scrap, minerals, motor vehicles exceeding specified thresholds, or high-value sale of goods under Section 206C(1H)).",
    suitability: [
      "Traders and manufacturers dealing in goods specified under Section 206C",
      "Businesses exceeding ₹10 Crore turnover selling goods worth more than ₹50 Lakhs to a buyer in a financial year",
      "Authorized dealers facilitating foreign currency remittances under the Liberalised Remittance Scheme (LRS)",
    ],
    keyDocuments: [
      "TAN of the collecting organization",
      "Buyer PAN verification records",
      "Sale invoices, receipts, and collection registers",
      "ITNS 281 challans with verified Challan Identification Numbers (CIN)",
    ],
    processSteps: [
      {
        step: 1,
        title: "Threshold & Scope Identification",
        description: "We identify applicable TCS categories and determine whether transaction turnover triggers Section 206C provisions.",
      },
      {
        step: 2,
        title: "Collection Monitoring",
        description: "Verification that tax was collected at prescribed rates upon debit or receipt of payment.",
      },
      {
        step: 3,
        title: "Challan Deposit Reconciliation",
        description: "Monthly tax payments deposited using Challan 281 before statutory deadlines.",
      },
      {
        step: 4,
        title: "Form 27EQ Quarterly Filing",
        description: "We assemble and file the quarterly TCS return and download Form 27D certificates from TRACES for your buyers.",
      },
    ],
    regulatoryNotice:
      "TCS applicability is strictly subject to turnover parameters and categories notified in Section 206C of the Income-tax Act, 1961.",
  },
  {
    id: "professional-tax",
    slug: "professional-tax",
    name: "Professional Tax (PT)",
    category: "Taxation & Financial Compliance",
    categorySlug: "taxation-compliance",
    description: "Applicable professional tax registration (PT EC & PT RC) and periodic return filing in relevant Indian states.",
    iconName: "Briefcase",
    whatItMeans:
      "Professional Tax is a state-level tax levied on salaried individuals, professionals, and business owners. Employers must obtain an Enrolment Certificate (EC) and Registration Certificate (RC) to deduct and remit PT.",
    suitability: [
      "Employers operating in states levying Professional Tax (e.g., Karnataka, Maharashtra, West Bengal, Telangana, Tamil Nadu, etc.)",
      "Self-employed professionals including consultants, engineers, doctors, and chartered practitioners",
      "Firms and corporate bodies holding a registered office in applicable municipal jurisdictions",
    ],
    keyDocuments: [
      "Entity PAN, Certificate of Incorporation / Partnership Deed",
      "Address proof of registered office in the respective state",
      "List of employees, salary structures, and PT deduction slabs",
      "Bank account details and authorized signatory proof",
    ],
    processSteps: [
      {
        step: 1,
        title: "State Rule Evaluation",
        description: "We determine the exact state PT enactments, exemption thresholds, and slab rates applicable to your office location.",
      },
      {
        step: 2,
        title: "PT EC & RC Registration",
        description: "Application on the state commercial taxes portal for both employer enrollment and employee deduction registration.",
      },
      {
        step: 3,
        title: "Monthly Salary Deductions",
        description: "Assistance in applying correct monthly PT deduction rates across payroll tiers.",
      },
      {
        step: 4,
        title: "Challan & Annual Return Submissions",
        description: "Filing monthly or annual PT returns and generating treasury challans for payment clearance.",
      },
    ],
    regulatoryNotice:
      "Professional Tax laws differ by state jurisdiction. Certain states and union territories do not levy professional tax. Applicability depends on your physical place of business.",
  },
  {
    id: "accounting-bookkeeping",
    slug: "accounting-bookkeeping",
    name: "Accounting and Bookkeeping",
    category: "Taxation & Financial Compliance",
    categorySlug: "taxation-compliance",
    description: "Day-to-day financial record keeping, double-entry bookkeeping, ledger maintenance, and statutory accounting support.",
    iconName: "BookOpenCheck",
    whatItMeans:
      "Systematic recording of financial transactions, sales invoices, expense vouchers, vendor ledgers, and bank reconciliations to produce structured trial balances, balance sheets, and profit & loss statements.",
    suitability: [
      "Startups and micro-enterprises lacking an in-house full-time accounts department",
      "Growing companies requiring organized books for tax audits, investor reporting, or bank loan appraisals",
      "Professionals and firms wanting monthly profit & loss visibility and cash flow control",
    ],
    keyDocuments: [
      "Bank statements in digital format (CSV/Excel/PDF)",
      "Sales invoices and credit notes issued",
      "Purchase invoices, vendor bills, and expense payment receipts",
      "Loan account statements and asset purchase agreements",
    ],
    processSteps: [
      {
        step: 1,
        title: "Chart of Accounts Setup",
        description: "We configure an organized ledger hierarchy tailored to your business operations and industry.",
      },
      {
        step: 2,
        title: "Transaction Vouching & Posting",
        description: "Regular entry of sales, expenses, inventory, and asset transactions adhering to double-entry standards.",
      },
      {
        step: 3,
        title: "Bank & Ledger Reconciliation",
        description: "Monthly reconciliation between bank passbooks, payment gateways, and accounting software ledgers.",
      },
      {
        step: 4,
        title: "Financial Statements Preparation",
        description: "Compilation of trial balances, balance sheets, and profit & loss statements ready for tax filing and review.",
      },
    ],
    regulatoryNotice:
      "Accounting practices follow Indian Accounting Standards (Ind AS) or standard GAAP principles as applicable to your entity constitution.",
  },

  // ==========================================
  // Category 2: Business Registration (3 Services)
  // ==========================================
  {
    id: "company-incorporation",
    slug: "company-incorporation",
    name: "Company Incorporation",
    category: "Business Registration",
    categorySlug: "business-registration",
    description: "Support for eligible corporate business structures including Private Limited Companies, OPCs, and LLPs via MCA SPICe+.",
    iconName: "Building2",
    whatItMeans:
      "Incorporating a corporate structure grants separate legal entity status, limited liability protection to directors/shareholders, and recognized statutory standing under the Ministry of Corporate Affairs (MCA).",
    suitability: [
      "Startups planning equity fundraising or grant applications",
      "Businesses requiring limited liability protection for founders",
      "Entrepreneurs launching technology, manufacturing, or service ventures across India",
    ],
    keyDocuments: [
      "PAN and Aadhaar / Passport of all proposed directors and shareholders",
      "Proof of address for directors (Voter ID, driving license, or recent bank statement with address)",
      "Registered office address proof (Electricity/gas bill not older than 2 months + Rent Agreement + Owner NOC)",
      "Digital Signature Certificates (Class 3 DSC) for signing directors",
    ],
    processSteps: [
      {
        step: 1,
        title: "Name Availability & RUN Verification",
        description: "We evaluate proposed entity names against MCA trademark and existing company databases for uniqueness.",
      },
      {
        step: 2,
        title: "DSC Issuance & Document Drafting",
        description: "Procurement of Digital Signature Certificates and customized drafting of Memorandum of Association (MoA) and Articles of Association (AoA).",
      },
      {
        step: 3,
        title: "SPICe+ Part A & B Portal Filing",
        description: "Submission of integrated MCA form including PAN, TAN, EPFO, ESIC, and bank account opening requests.",
      },
      {
        step: 4,
        title: "Certificate of Incorporation (CoI) Issuance",
        description: "Registrar of Companies (RoC) issues the CoI with Corporate Identification Number (CIN).",
      },
    ],
    regulatoryNotice:
      "Company incorporation is governed by the Companies Act, 2013 and rules issued by the Ministry of Corporate Affairs (MCA). Final approval rests with the Central Registration Centre (CRC).",
  },
  {
    id: "partnership-registration",
    slug: "partnership-registration",
    name: "Partnership Firm Registration",
    category: "Business Registration",
    categorySlug: "business-registration",
    description: "Assistance with partnership deed drafting, notarization, PAN issuance, and Registrar of Firms (RoF) documentation.",
    iconName: "Users2",
    whatItMeans:
      "A Partnership Firm is a formal association of two or more individuals agreeing to share the profits and liabilities of a business venture governed by a written Partnership Deed.",
    suitability: [
      "Two or more co-founders wanting an agile, lower-compliance business structure",
      "Family businesses, trading entities, and professional practices",
      "Ventures seeking formal legal terms without immediate corporate equity requirements",
    ],
    keyDocuments: [
      "PAN Cards and Aadhaar Cards of all partners",
      "Address proof of all partners (Passport, Voter ID, or bank statement)",
      "Business premise address proof (Electricity bill, rental agreement, NOC)",
      "Drafted terms of capital contribution, profit sharing ratio, and operational duties",
    ],
    processSteps: [
      {
        step: 1,
        title: "Deed Structuring & Terms Advisory",
        description: "We outline partner capital contributions, profit/loss sharing percentages, retirement clauses, and dispute resolution mechanisms.",
      },
      {
        step: 2,
        title: "Stamp Duty & Notarization",
        description: "Execution of the Partnership Deed on appropriate state non-judicial stamp paper with legal notarization.",
      },
      {
        step: 3,
        title: "Entity PAN & TAN Application",
        description: "Obtaining dedicated PAN and TAN for the partnership firm from the Income Tax Department.",
      },
      {
        step: 4,
        title: "Registrar of Firms (RoF) Filing (Optional/Applicable)",
        description: "Submitting Form 1 to the state Registrar of Firms for registered partnership status where desired.",
      },
    ],
    regulatoryNotice:
      "Partnership firms are governed by the Indian Partnership Act, 1932. Registration with the state RoF is optional in some jurisdictions but recommended for legal enforcement of contractual rights.",
  },
  {
    id: "business-registration",
    slug: "business-registration",
    name: "Business Registration",
    category: "Business Registration",
    categorySlug: "business-registration",
    description: "Guidance on suitable business registration options including Sole Proprietorship, MSME / Udyam, and Shop Act setup.",
    iconName: "FileCheck",
    whatItMeans:
      "Selecting and registering the foundational legal identity for a single-promoter or micro enterprise to establish operational legitimacy, open commercial bank accounts, and claim MSME privileges.",
    suitability: [
      "Solo entrepreneurs, independent artisans, retail store owners, and freelancers",
      "Small enterprises seeking Udyam (MSME) registration for priority sector lending and government tender benefits",
      "New businesses requiring basic proof of existence for current bank accounts",
    ],
    keyDocuments: [
      "Proprietor PAN Card and Aadhaar Card (linked to mobile for OTP)",
      "Premise address proof and latest electricity/utility bill",
      "Cancelled cheque / bank statement in individual or commercial name",
      "Basic details of manufacturing or service activities (NIC codes)",
    ],
    processSteps: [
      {
        step: 1,
        title: "Structure Evaluation",
        description: "We evaluate your expected revenues, liability exposure, and operational scope to advise between proprietorship, LLP, or company.",
      },
      {
        step: 2,
        title: "Udyam (MSME) Registration",
        description: "Filing on the official Udyam portal to obtain your permanent MSME certificate and registration number.",
      },
      {
        step: 3,
        title: "Local Commercial Compliance",
        description: "Guidance on state-specific Shop & Commercial Establishment registration or municipal trade registration.",
      },
      {
        step: 4,
        title: "Banking Documentation Kit",
        description: "We assemble the registration bundle to assist you in opening a dedicated business current account.",
      },
    ],
    regulatoryNotice:
      "A sole proprietorship does not have a separate legal identity from its owner. Udyam registrations are issued under the Ministry of Micro, Small & Medium Enterprises guidelines.",
  },

  // ==========================================
  // Category 3: Licenses & Regulatory Compliance (4 Services)
  // ==========================================
  {
    id: "trade-license",
    slug: "trade-license",
    name: "Trade License",
    category: "Licenses & Regulatory Compliance",
    categorySlug: "licenses-compliance",
    description: "Assistance with applicable municipal trade license requirements, commercial premises clearance, and renewals.",
    iconName: "Landmark",
    whatItMeans:
      "A Trade License is an authorization granted by the local municipal corporation or civic body permitting an entity to conduct specific commercial activities within a designated municipal territory.",
    suitability: [
      "Retail shops, commercial offices, restaurants, warehouses, and showrooms",
      "Service providers operating commercial premises within municipal corporation limits",
      "Businesses seeking annual renewal or change of commercial premises license",
    ],
    keyDocuments: [
      "Property tax paid receipt for the commercial premise or lease agreement with owner NOC",
      "Sanctioned building plan or trade premise layout drawing",
      "Entity registration certificate (PAN, GSTIN, Incorporation / Partnership deed)",
      "Identity and address proofs of applicant / authorized signatory",
    ],
    processSteps: [
      {
        step: 1,
        title: "Municipal Jurisdiction Check",
        description: "We identify the relevant local civic body (e.g., BBMP, BMC, MCD) and inspect ward-level trade license requirements.",
      },
      {
        step: 2,
        title: "Premise Category Classification",
        description: "Classifying trade activity under accurate municipal schedule codes and calculating applicable fee tiers.",
      },
      {
        step: 3,
        title: "Application Preparation & Submission",
        description: "Submitting the formal application along with premise proofs and floor plans to the local authority portal.",
      },
      {
        step: 4,
        title: "Inspection Coordination & Certificate Issuance",
        description: "Following up through municipal health / commercial inspector visits until the official license certificate is released.",
      },
    ],
    regulatoryNotice:
      "Trade license issuance is subject to municipal corporation regulations and physical premises inspection where mandated by local civic bodies.",
  },
  {
    id: "labour-license",
    slug: "labour-license",
    name: "Labour License and Compliance",
    category: "Licenses & Regulatory Compliance",
    categorySlug: "licenses-compliance",
    description: "Guidance on applicable labour registrations, Contract Labour Act compliance, and statutory workforce registers.",
    iconName: "HardHat",
    whatItMeans:
      "Labour licenses and registrations ensure adherence to employment, safety, and welfare statutes. This covers the Contract Labour (Regulation & Abolition) Act, interstate migrant workmen, and state shop registrations.",
    suitability: [
      "Principal employers engaging contract labour through contractors or third-party agencies",
      "Contractor firms deploying 20 or more contractual workers at client work sites",
      "Commercial establishments needing statutory registers (Form A, Form B, muster roll, wage slips)",
    ],
    keyDocuments: [
      "Principal employer registration certificate / Form I (for contract labour license)",
      "Agreement between principal employer and contractor specifying scope and workforce count",
      "Form V issued by the principal employer to the contractor",
      "Entity constitution proof, PAN, and address proof of work site",
    ],
    processSteps: [
      {
        step: 1,
        title: "Workforce Threshold Review",
        description: "We determine the headcount of regular and contract workers to verify if CLRA registration or licensing applies.",
      },
      {
        step: 2,
        title: "Form V & Contract Drafting",
        description: "Assisting in obtaining Form V from principal employers and assembling contractor credentials.",
      },
      {
        step: 3,
        title: "Labour Portal Application Filing",
        description: "Submission of application on state labour department or central Shram Suvidha portal.",
      },
      {
        step: 4,
        title: "Register Formats & Compliance Kit",
        description: "Providing compliant templates for wages, muster rolls, overtime, and advance deductions.",
      },
    ],
    regulatoryNotice:
      "Labour license criteria depend on workforce headcount thresholds specified under the Contract Labour (Regulation and Abolition) Act, 1970 and state-specific labour laws.",
  },
  {
    id: "food-license",
    slug: "food-license",
    name: "Food License (FSSAI)",
    category: "Licenses & Regulatory Compliance",
    categorySlug: "licenses-compliance",
    description: "Assistance with applicable food business licensing requirements (FSSAI Basic, State, and Central Licenses) via FoSCoS.",
    iconName: "Utensils",
    whatItMeans:
      "FSSAI registration/license is mandatory for any Food Business Operator (FBO) involved in the manufacture, processing, packaging, storage, distribution, transportation, or sale of food products in India.",
    suitability: [
      "Petty food manufacturers, cloud kitchens, bakeries, cafes, and restaurants",
      "Food product packaging units, importers, distributors, and wholesalers",
      "E-commerce food aggregators and delivery platforms",
    ],
    keyDocuments: [
      "Photo ID and address proof of the food business operator / proprietor / directors",
      "Proof of possession of premises (Rental agreement + electricity bill + NOC)",
      "Food safety management system plan (FSMS) and water test report (where applicable for manufacturing)",
      "List of food categories / products to be handled",
    ],
    processSteps: [
      {
        step: 1,
        title: "Turnover & Capacity Assessment",
        description: "We verify whether your business qualifies for FSSAI Basic Registration (<₹12L/yr), State License (₹12L–₹20Cr/yr), or Central License.",
      },
      {
        step: 2,
        title: "FoSCoS Application Compilation",
        description: "Preparing Form A (Registration) or Form B (License) with food product categorization on the FoSCoS portal.",
      },
      {
        step: 3,
        title: "Food Safety Plan & Query Response",
        description: "Answering scrutiny notices and drafting self-declarations required by the Designated Officer.",
      },
      {
        step: 4,
        title: "14-Digit FSSAI License Retrieval",
        description: "Retrieving the official 14-digit FSSAI license certificate and QR-coded registration document.",
      },
    ],
    regulatoryNotice:
      "FSSAI registration and licensing are administered under the Food Safety and Standards Act, 2006. Premise inspections may be conducted by Food Safety Officers prior to license grant.",
  },
  {
    id: "other-licenses",
    slug: "other-licenses",
    name: "Other Business Licenses",
    category: "Licenses & Regulatory Compliance",
    categorySlug: "licenses-compliance",
    description: "Support for specialized permits based on business type, including Import Export Code (IEC), MSME, and regulatory clearances.",
    iconName: "ShieldAlert",
    whatItMeans:
      "Specialized licenses and regulatory clearances required for sector-specific commercial ventures, international trade transactions, environmental clearances, and statutory certifications.",
    suitability: [
      "Exporters and importers requiring Director General of Foreign Trade (DGFT) Import Export Code (IEC)",
      "Businesses requiring Pollution Control Board (CPCB/SPCB) consent to establish or operate",
      "Commercial entities seeking Fire Safety NOC or weight and measurement clearances",
    ],
    keyDocuments: [
      "Entity constitution documents and address proof of premise",
      "PAN Card of applicant organization and authorized signatories",
      "Bank certificate / cancelled cheque with bank account verification",
      "Activity description and technical specifications of commercial equipment",
    ],
    processSteps: [
      {
        step: 1,
        title: "Industry Scope Mapping",
        description: "We analyze your planned operations against central, state, and departmental regulatory frameworks.",
      },
      {
        step: 2,
        title: "Prerequisite Document Checklist",
        description: "We formulate a step-by-step checklist of departmental requirements to prevent procedural delays.",
      },
      {
        step: 3,
        title: "Departmental Filing & Liaison",
        description: "Submitting applications on relevant government portals (e.g., DGFT, National Single Window System - NSWS).",
      },
      {
        step: 4,
        title: "Approval Follow-up & Compliance Schedule",
        description: "Tracking application status, addressing departmental queries, and scheduling future statutory renewals.",
      },
    ],
    regulatoryNotice:
      "Specialized licenses are issued by respective statutory departments and ministries. Granting of clearances depends strictly on technical criteria, zoning bylaws, and applicant verification.",
  },
];

// Helper functions for easy consumption across components
export function getServiceById(id: string): ServiceItem | undefined {
  return allServices.find((s) => s.id === id || s.slug === id);
}

export function getServicesByCategory(category: string): ServiceItem[] {
  if (category === "All") return allServices;
  return allServices.filter((s) => s.category === category);
}

export function searchServices(query: string): ServiceItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return allServices;
  return allServices.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.whatItMeans.toLowerCase().includes(q)
  );
}

// Legacy compatibility for existing slug dynamic routes
export const servicesData = serviceCategories.map((cat, idx) => {
  const catServices = allServices.filter((s) => s.categorySlug === cat.slug);
  return {
    slug: cat.slug,
    categoryNumber: idx + 1,
    title: cat.title,
    tagline: cat.tagline,
    shortDescription: cat.description,
    iconName: idx === 0 ? "ReceiptText" : idx === 1 ? "Building2" : "ShieldCheck",
    whatItMeans: cat.description,
    whoNeedsIt: [
      "Individuals, startups, and established enterprises in India",
      "Entities needing structured statutory documentation and returns",
      "Commercial organizations seeking peace of mind with regulatory adherence",
    ],
    keyRequirements: [
      {
        title: "Standard Verification Documents",
        items: [
          "PAN Card of the individual or business entity",
          "Address proof of operating location (Electricity bill, rental agreement)",
          "Bank account statements and cancelled cheque",
          "Authorized signatory identification (Aadhaar, Passport)",
        ],
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Initial Advisory & Requirement Review",
        description: "We review your operational profile to determine exact regulatory prerequisites.",
      },
      {
        step: 2,
        title: "Document Collation & Preparation",
        description: "Our compliance desk verifies all statutory documents for accuracy.",
      },
      {
        step: 3,
        title: "Portal Submission & Processing",
        description: "We prepare and submit your application on the official government portal.",
      },
      {
        step: 4,
        title: "Acknowledgment & Ongoing Support",
        description: "You receive official acknowledgments and guidance on recurring filing deadlines.",
      },
    ],
    howFincoreAssists: [
      "Clear, transparent guidance without statutory jargon",
      "Systematic checklists to ensure complete documentation",
      "Timely submissions to avoid statutory late fees and penalties",
    ],
    subServices: catServices.map((cs) => ({
      name: cs.name,
      description: cs.description,
      suitableFor: "Where applicable based on business model and turnover",
    })),
    regulatoryNotice:
      "All services provided are advisory and facilitation services. Official approvals and registrations are issued at the sole discretion of relevant Indian regulatory authorities.",
  };
});
