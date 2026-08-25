/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Demo's serveren vanaf het eigen domein. De vercel.app-URL met /api/ en een
  // willekeurige code erachter leest als phishing, precies waar voorlichtings-
  // campagnes voor waarschuwen; een prospect die net gehackt is klikt daar niet
  // op. Zelfde pagina, adres dat bij de afzender past.
  async rewrites() {
    return [
      {
        source: "/demo/:slug",
        destination: "https://sps-dashboard-alpha.vercel.app/api/public/demo/:slug",
      },
    ];
  },
};

export default nextConfig;
