import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import "./button-contrast.css";
import "./trust.css";
import "./internal-links.css";
import "./case-studies.css";
import { site } from "@/lib/site";
import { SalesChatWidget } from "@/components/chat/SalesChatWidget";
import "@/components/chat/sales-chat.css";
import { organizationSchema, safeJsonLd, websiteSchema } from "@/lib/seo/schema";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "DigiUdyam — Your Digital Growth Partner", template: "%s | DigiUdyam" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { title: "DigiUdyam — Aap Business Sambhaliye. Growth Hum Sambhalenge.", description: site.description, url: site.url, siteName: site.name, locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image", title: "DigiUdyam — Your Digital Growth Partner", description: site.description },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = [organizationSchema(),websiteSchema()];
  return <html lang="en-IN" className={manrope.variable}><body><a className="skip-link" href="#main">Skip to content</a>{children}<SalesChatWidget/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} /></body></html>;
}
