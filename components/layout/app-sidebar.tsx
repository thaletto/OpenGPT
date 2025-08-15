"use client";
import { PanelLeft, Plus, Search, Sun } from "lucide-react";
import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { VercelDashed } from "../icons/vercel-dashed";

// This is sample data.
const data = {
  user: {
    name: "Laxman K R",
    email: "krlaxman03@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, open } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props} variant={props.variant} className="border-border">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton
            onClick={toggleSidebar}
            className="flex flex-row justify-between"
          >
            {open && (
              <div className="flex flex-row">
                <VercelDashed className="mr-1.5" />{" "}
                <span className="hidden md:inline text-sm uppercase  font-bold tracking-wide">
                  MathGPT
                </span>
              </div>
            )}{" "}
            <PanelLeft />
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
