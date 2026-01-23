import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import StructuredData from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import FloatingRobot from "@/components/FloatingRobot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata Base URL & Verification (update saat deploy)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mrizalbasri.vercel.app';
const gscVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-placeholder';

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  
  // Basic Metadata
  title: {
    default: "M. Rizal Basri | Full Stack Developer",
    template: "%s | M. Rizal Basri"
  },
  description: "Portfolio of M. Rizal Basri - Full Stack Developer from Pekanbaru, Indonesia. Expert in React, Next.js, Laravel, and modern web solutions. Explore my projects and skills.",
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
    url: baseUrl,
    siteName: "M. Rizal Basri Portfolio",
    title: "M. Rizal Basri - Full Stack Developer",
    description: "Experienced Full Stack Developer specializing in React, Next.js, and modern web technologies. Based in Pekanbaru, Indonesia.",
    images: [
      {
        url: "/og-image.jpg",
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
  
  // Verification (untuk Google Search Console)
  verification: {
    google: gscVerification,
  },

  // App Metadata
  applicationName: "M. Rizal Basri Portfolio",
  category: "Portfolio",

  // Setup Favicon using available Logo
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white dark`}
        suppressHydrationWarning
      >
        <CustomCursor />
        <FloatingRobot />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
