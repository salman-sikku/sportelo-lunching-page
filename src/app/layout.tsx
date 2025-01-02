import type { Metadata } from "next";
import "./globals.css";
import { Orbitron, Quicksand } from 'next/font/google';
import { Toaster } from 'sonner'
// Configure Orbitron font
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
});

// Configure Quicksand font
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  title: "Sportelo | Premium Sports Equipment & Gear",
  description: "Shop premium sports equipment, athletic gear, and accessories. Find the best deals on quality sporting goods for all activities.",
  keywords: "sports equipment, athletic gear, sports accessories, sporting goods, fitness equipment, online sports store",
  metadataBase: new URL('https://sportelo.shop/'),
  alternates: {
    canonical: 'https://sportelo.shop/'
  },
  openGraph: {
    title: 'Sportelo - Premium Sports Equipment Store',
    description: 'Discover quality sports gear and equipment for all your athletic needs',
    url: 'https://sportelo.shop/',
    siteName: 'Sportelo',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${quicksand.variable}`}>,
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}