import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import InfiniteTicker from "@/components/InfiniteTicker"; // <--- IMPORT INI

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Moch. Sugih Nugraha",
  description: "Trader & Multidisciplinary Creative",
  icons: {
    icon: [
      {
        url: "/favicon.png?v=4",
        href: "/favicon.png?v=4",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white`}
      >
        {/* Konten Halaman (Home/About/dll) */}
        {children}
        
        {/* PEMBATAS ANTARA KONTEN & FOOTER */}
        <InfiniteTicker /> {/* <--- PASANG DI SINI */}

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}