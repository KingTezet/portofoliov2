import type { Metadata } from "next";
import { Inter, Shantell_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const shantell = Shantell_Sans({
  variable: "--font-shantell",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Moch. Sugih Nugraha | Product Engineer",
  description:
    "Product Engineer, Full-Stack (Next.js) & AI Automation Specialist building highly autonomous and reliable digital products.",
  icons: {
    icon: [
      {
        url: "/favicon.png?v=4",
        href: "/favicon.png?v=4",
      },
    ],
  },
  verification: {
    google: "RJW3mxA5Onz8896dm4HhwMRimpMwRkTQVevNdkmpHiY",
  },
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
