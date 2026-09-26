/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Demo's serveren vanaf het eigen domein. De vercel.app-URL met /api/ en een
  // willekeurige code erachter leest als phishing, precies waar voorlichtings-
  // campagnes voor waarschuwen; een prospect die net gehackt is klikt daar niet
  // op. Zelfde pagina, adres dat bij de afzender past.
  // De demopagina verwijst intern naar /demo-assets/... en post haar
  // view-teller naar /api/public/demo-view. Beide zijn RELATIEF, dus zodra de
  // pagina hier vandaan komt zoeken ze op dit domein en dat bestond niet: sinds
  // 25 aug zag elke prospect die op een demolink klikte een pagina zónder
  // foto's, en werd zijn bezoek niet geteld. Alles wat de demo nodig heeft moet
  // dus mee doorgestuurd worden, niet alleen de pagina zelf.
  // Korte adressen voor op de flyer; de vraagparameter ?van=emre blijft staan.
  async redirects() {
    return [
      { source: "/lek-check", destination: "/websites/nl/lek-check", permanent: false },
      { source: "/leak-check", destination: "/websites/en/lek-check", permanent: false },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/demo/:slug",
        destination: "https://sps-dashboard-alpha.vercel.app/api/public/demo/:slug",
      },
      {
        source: "/demo-assets/:path*",
        destination: "https://sps-dashboard-alpha.vercel.app/demo-assets/:path*",
      },
      {
        source: "/api/public/:path*",
        destination: "https://sps-dashboard-alpha.vercel.app/api/public/:path*",
      },
    ];
  },
};

export default nextConfig;
