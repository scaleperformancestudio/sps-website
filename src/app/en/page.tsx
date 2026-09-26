import type { Metadata } from "next";
import { LocalHome } from "@/components/local-home";
import { homeContent } from "../home-content";

const { meta } = homeContent.en;
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/en", languages: { nl: "/", en: "/en" } },
  openGraph: { title: meta.title, description: meta.description, type: "website", locale: "en_GB" },
};

export default function HomePageEn() {
  return <LocalHome locale="en" />;
}
