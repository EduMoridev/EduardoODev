import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/content/profile";
import { personJsonLd, SITE_URL } from "@/lib/seo";
import { MOTION_SCRIPT } from "@/lib/motion/level";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${profile.name} — ${profile.roleFull}`, template: `%s — ${profile.shortName}` },
  description: profile.headline,
  keywords: Object.values(profile.skills).flat(),
  authors: [{ name: profile.name, url: profile.links.github }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: `${profile.name} — ${profile.roleFull}`,
    description: profile.headline,
    url: SITE_URL,
    locale: "pt_BR",
  },
  twitter: { card: "summary_large_image", title: profile.name, description: profile.headline },
};

export const viewport: Viewport = { themeColor: "#030712", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* decide o nível de movimento antes da 1ª pintura (sem flash de conteúdo) */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }} />
      </head>
      <body className="bg-navy text-cream min-h-screen">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          //test
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        {children}
      </body>
    </html>
  );
}
