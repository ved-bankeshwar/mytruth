import type { Metadata } from "next";
import { Libre_Baskerville, Geist_Mono } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'TheTruth',
  description: 'A blog about web development and other things.',
  openGraph: {
    images: ['/og-image.png'],
  },
};

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { Suspense } from 'react';
import Analytics from '@/components/Analytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={libreBaskerville.variable}>
      <body>
          <Navbar />
          {children}
          <Footer />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
      </body>
    </html>
  );
}
