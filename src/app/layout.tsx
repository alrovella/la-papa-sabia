import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Logo from "@/components/Logo";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "La Papa Sabia - Intelligent Recipe Generator",
  description: "Recipe generator with artificial intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)] bg-[length:400%_100%] bg-gradient-to-l from-primary/15 via-primary/25 to-primary/20`}
      >
        <Toaster />
        <main className="flex flex-col justify-center items-center min-h-screen">
          <Logo className="size-[250px]" />
          {children}
        </main>
      </body>
    </html>
  );
}
