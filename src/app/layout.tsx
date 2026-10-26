import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { SPAProvider } from "@/context/SPAContext";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080B14",
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.legalName} | Tax, Company Registration, Accounting & Compliance in India`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "FINCORE Consultancy Services",
    "Income Tax Return Filing India",
    "ITR filing Bangalore",
    "GST Registration and Returns",
    "Private Limited Company Registration",
    "LLP Registration India",
    "Accounting and Bookkeeping Services",
    "FSSAI Food License",
    "Trade License Assistance",
    "PF ESI Compliance",
    "Business Setup Advisory India",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.legalName} | Finance, Compliance & Business Growth`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.legalName} | Financial & Corporate Advisory`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:30",
        closes: "18:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "14:30",
      },
    ],
    priceRange: "$$",
    serviceArea: {
      "@type": "Country",
      name: "India",
    },
  };

  return (
    <html
      lang="en"
      
      className={cn("antialiased", plusJakartaSans.variable, "font-sans", geist.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-black font-sans selection:bg-[#163E8C] selection:text-white">
        <SPAProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </SPAProvider>
      </body>
    </html>
  );
}
