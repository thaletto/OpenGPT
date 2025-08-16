import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import type { ReactNode } from "react";

export default async function ChatLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar variant="sidebar" session={session} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
