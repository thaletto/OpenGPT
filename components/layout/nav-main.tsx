"use client";
import { Loader, Plus, Search } from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

export function NavMain() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="New Chat"
              onClick={() => {
                window.dispatchEvent(new Event("new-chat"));
              }}
            >
              <Plus /> <span>New Chat</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Search" onClick={() => {}}>
              <Search /> <span>Search</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <ThemeToggle />
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton>
          <Loader className="animate-spin" />
          Loading...
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip="Toggle theme"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme === "dark" ? <Moon /> : <Sun />}
        <span>Toggle theme</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
