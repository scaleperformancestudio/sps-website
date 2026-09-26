import type { Metadata } from "next";
import { LocalHome } from "@/components/local-home";
import { homeContent } from "./home-content";

const { meta } = homeContent.nl;
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/", languages: { nl: "/", en: "/en" } },
  openGraph: { title: meta.title, description: meta.description, type: "website", locale: "nl_NL" },
};

export default function HomePage() {
  return <LocalHome locale="nl" />;
}
