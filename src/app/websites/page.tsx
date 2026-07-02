import { redirect } from "next/navigation";
import { defaultLocale } from "./content";

// The /websites funnel is localized under /websites/[locale].
// Bare /websites redirects to the default language; the on-page switcher
// (and direct /websites/nl, /websites/en links) handle the rest.
export default function WebsitesIndex() {
  redirect(`/websites/${defaultLocale}`);
}
