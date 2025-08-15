"use client";
import { PanelLeft } from "lucide-react";
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, open } = useSidebar();
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      variant={props.variant}
      className="border-border"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton
            onClick={toggleSidebar}
            className="flex flex-row justify-between"
          >
            {open && (
              <div className="flex flex-row items-start uppercase gap-2 font-semibold">
                <VercelDashed />
                MathGPT
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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
