import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

export default function ChatLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar variant="sidebar" />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
