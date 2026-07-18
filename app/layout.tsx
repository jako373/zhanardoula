import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://zhanar-doula-atyrau.vercel.app"),
  title: "Жанар — Доула | Атыраудағы босануға дайындық және қолдау",
  description: "Атырау қаласындағы кәсіби доула Жанардың жүктілік, босануға дайындық және босану кезіндегі жеке қолдауы.",
  keywords: ["доула Атырау", "босануға дайындық", "жүкті әйелдерге қолдау"],
  openGraph: { title: "Жанар — Доула", description: "Босануға сеніммен және тыныштықпен дайындалыңыз", locale: "kk_KZ", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Жанар — Доула", address: { "@type": "PostalAddress", addressLocality: "Атырау", addressCountry: "KZ" }, telephone: "+77013684924", areaServed: "Атырау" };
  return <html lang="kk"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}/></body></html>;
}
