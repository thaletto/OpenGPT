import { FullSession } from "@/types/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SECRET = process.env.BASE64_TOKEN || ""

export function encryptSessionToken(session: FullSession) {
  const str = JSON.stringify({
    userId: session.user.id,
    ts: Date.now(),
  });

  return btoa(str + SECRET);
}

export function isEncryptedToken(token: string | null): boolean {
  return typeof token === "string" && token.includes(SECRET);
}
