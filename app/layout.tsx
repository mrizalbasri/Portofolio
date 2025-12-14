import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: "M. Rizal Basri - Full Stack Developer Portfolio",
    template: "%s | M. Rizal Basri"
  },
  description: "Portfolio of M. Rizal Basri - Experienced Full Stack Developer from Pekanbaru, Indonesia. Specializing in React, Next.js, Node.js, TypeScript, and modern web technologies. Available for freelance projects and full-time opportunities.",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Frontend Developer",
    "Backend Developer",
    "Pekanbaru",
    "Indonesia",
    "Portfolio",
    "M. Rizal Basri",
    "Rizal Basri",
    "JavaScript Developer",
    "Mobile Developer",
    "UI/UX Developer"
  ],
  authors: [{ name: "M. Rizal Basri", url: "https://github.com/mrizalbasri" }],
  creator: "M. Rizal Basri",
  publisher: "M. Rizal Basri",
  
  // Open Graph (Facebook, LinkedIn, WhatsApp, Telegram, Discord)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com", // Update dengan URL Anda nanti
    siteName: "M. Rizal Basri Portfolio",
    title: "M. Rizal Basri - Full Stack Developer",
    description: "Experienced Full Stack Developer specializing in React, Next.js, and modern web technologies. Based in Pekanbaru, Indonesia.",
    images: [
      {
        url: "/og-image.jpg", // Kita akan buat ini nanti
        width: 1200,
        height: 630,
        alt: "M. Rizal Basri - Full Stack Developer Portfolio",
      }
    ],
  },

  // Additional Meta Tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification (untuk Google Search Console nanti)
  verification: {
    google: "your-google-verification-code", // Update nanti saat deploy
  },

  // App Metadata
  applicationName: "M. Rizal Basri Portfolio",
  category: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
