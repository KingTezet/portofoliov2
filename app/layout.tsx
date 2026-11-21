import type { Metadata } from "next";
import { Inter, Shantell_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { MotionProvider, ScrollProgress } from "@/components/motion";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  // Fallback after the system font stack; not needed for first paint.
  preload: false,
});

const shantell = Shantell_Sans({
  variable: "--font-shantell",
  subsets: ["latin"],
  weight: ["300", "400"],
  preload: false,
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const SITE_URL = "https://www.mochsugihnugraha.my.id";
const NAME = "Moch Sugih Nugraha";
const DESCRIPTION =
  "Moch Sugih Nugraha is a frontend engineer from Sumedang, Indonesia, building fast, accessible web products with React, Next.js, TypeScript and Supabase.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} | Frontend Engineer`,
    template: `%s | ${NAME}`,
  },
  description: DESCRIPTION,
  applicationName: NAME,
  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  keywords: [
    NAME,
    "Moch. Sugih Nugraha",
    "Sugih Nugraha",
    "Frontend Engineer",
    "Next.js developer Indonesia",
    "React developer Sumedang",
  ],
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: NAME,
    title: `${NAME} | Frontend Engineer`,
    description: DESCRIPTION,
    firstName: "Moch Sugih",
    lastName: "Nugraha",
    images: [{ url: "/profile-sugih.jpg", alt: NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} | Frontend Engineer`,
    description: DESCRIPTION,
    images: ["/profile-sugih.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: "/favicon.png?v=5",
        href: "/favicon.png?v=5",
      },
    ],
  },
  verification: {
    google: "RJW3mxA5Onz8896dm4HhwMRimpMwRkTQVevNdkmpHiY",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: NAME,
      alternateName: ["Moch. Sugih Nugraha", "Sugih Nugraha"],
      url: SITE_URL,
      image: `${SITE_URL}/profile-sugih.jpg`,
      jobTitle: "Frontend Engineer",
      description: DESCRIPTION,
      email: "mailto:mochsugihnugraha@gmail.com",
      address: { "@type": "PostalAddress", addressLocality: "Sumedang", addressRegion: "Jawa Barat", addressCountry: "ID" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Universitas Sebelas April" },
      knowsAbout: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "WebXR", "Three.js"],
      sameAs: [
        "https://github.com/KingTezet",
        "https://www.linkedin.com/in/moch-sugih-nugraha/",
        "https://instagram.com/sugihnugrahaa",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: NAME,
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${shantell.variable} ${bebas.variable} font-sans bg-[#f5f5f4] text-zinc-900 antialiased`}
      >
        <script
          type="application/ld+json"
          // Structured data so Google can tie the name, photo and profiles together.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <MotionProvider>
          <ScrollProgress />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
