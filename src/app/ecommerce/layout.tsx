import type { Metadata } from "next";

// De e-commerce-homepage van vóór 26 september 2026, ongewijzigd verhuisd
// van / naar /ecommerce. Het lokale aanbod staat nu op /.
export const metadata: Metadata = {
  title: "Scale Performance Studio — Performance Creative Engine",
  description:
    "SPS builds high-converting performance creative and scales paid media for ecommerce brands. AI-powered creative production, human-led strategy.",
  openGraph: {
    title: "Scale Performance Studio",
    description: "Performance creative engine + media buying for ecommerce brands.",
    type: "website",
  },
};

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
