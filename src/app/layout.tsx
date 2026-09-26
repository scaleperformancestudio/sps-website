import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://scaleperformancestudio.com"),
  title: "Je betaalt pas als het werkt — Scale Performance Studio, Nijmegen",
  description:
    "Meer klanten via Google, een site die boekt, reviews die binnenkomen. Twee broers uit Nijmegen zetten alles op; je betaalt alleen per klant die via ons bij jou heeft betaald.",
  openGraph: {
    title: "Scale Performance Studio",
    description: "Je betaalt pas als het werkt. Websites, Google en klanten voor lokale ondernemers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen bg-bg font-sans text-neutral-100 antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
