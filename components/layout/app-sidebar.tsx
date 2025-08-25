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
import { OmegaSymbol } from "../icons/omega";
import { useSession } from "../providers/session-provider";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, open } = useSidebar();
  const session = useSession();
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
              <div className="flex flex-row items-start text-primary gap-2 font-semibold">
                <OmegaSymbol />
                OpenGPT
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
        <NavUser session={session} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
