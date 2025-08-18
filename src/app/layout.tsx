import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const browPro = localFont({
  src: "../fonts/BrownPro/Brown-Pro-Bold.woff2",
  variable: "--font-brow-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "un:send",
  description: "un:send festival 2025/2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${browPro.variable}`}>{children}</body>
    </html>
  );
}
