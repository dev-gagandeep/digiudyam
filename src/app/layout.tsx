import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./button-contrast.css";
import "./trust.css";
import "./trust-marks.css";
import "./small-business-website.css";
import "./internal-links.css";
import "./case-studies.css";
import "./public-polish.css";
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
  return <html lang="en-IN" className={manrope.variable}><body><a className="skip-link" href="#main">Skip to content</a>{children}<SalesChatWidget/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} /><Script src="https://www.googletagmanager.com/gtag/js?id=G-QJYSSGBX9S" strategy="afterInteractive"/><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-QJYSSGBX9S');`}</Script></body></html>;
}
