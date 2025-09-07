"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function MobileNav() {
  return (
    <div className="md:hidden flex items-center gap-2 h-12 px-2 border-b">
      <SidebarTrigger />
      <span className="font-semibold">Menu</span>
    </div>
  );
}

