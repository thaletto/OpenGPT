import { headers } from "next/headers";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { SessionProvider } from "@/components/providers/session-provider";

export default async function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <SessionProvider session={session ?? null}>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar variant="sidebar" />
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
