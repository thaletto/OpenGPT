import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Lexend, Lora, Fira_Code } from "next/font/google";
import { Providers } from "@/components/providers";

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
  title: "MathGPT",
  description: "ChatGPT with graphical user interface",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${lexend.variable} ${lora.variable} ${firaCode.variable} font-sans`}
    >
      <body className="antialiased">
        <Providers>
          <SidebarProvider>
            <AppSidebar variant="sidebar"/>
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
