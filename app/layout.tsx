import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Lexend, Lora, Fira_Code } from "next/font/google";
import { ThemeProvider } from "next-themes";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
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
      className={`${lexend.variable} ${lora.variable} ${firaCode.variable} font-sans`}
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
      </body>
    </html>
  );
}
