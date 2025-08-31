"use client";
import { dispatchNewChat } from "@/lib/chat-events";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewChatButton({ className }: { className?: string }) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn("cursor-pointer", className)}
      onClick={dispatchNewChat}
    >
      <Plus /> <span className="hidden md:block">New Chat</span>
    </Button>
  );
}
