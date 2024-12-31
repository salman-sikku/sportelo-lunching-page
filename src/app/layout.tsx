import type { Metadata } from "next";
import "./globals.css";
import { Orbitron, Quicksand } from 'next/font/google';

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
  title: "Sportelo - Coming Soon",
  description: "Get ready for an exciting journey into the world of sports!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${quicksand.variable}`}>
        {children}
      </body>
    </html>
  );
}