import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Lexend, Fira_Code } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from '@vercel/speed-insights/next';
import {Analytics} from '@vercel/analytics/next'

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-sans",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "OpenGPT",
  description: "Open Source ChatGPT alternative",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${lexend.variable} ${firaCode.variable} font-sans`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
