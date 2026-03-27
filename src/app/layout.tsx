import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CookieBar } from "@/components/CookieBar";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "P.I.W. IMPULS | Chemia, kosmetyki, mydła",
    template: "%s | P.I.W. IMPULS",
  },
  description:
    "Przedsiębiorstwo Innowacyjno-Wdrożeniowe IMPULS — produkcja chemii gospodarczej i profesjonalnej, kosmetyków, usługi laboratoryjne i B+R.",
  openGraph: {
    siteName: "P.I.W. IMPULS",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
        <CookieBar />
      </body>
    </html>
  );
}
