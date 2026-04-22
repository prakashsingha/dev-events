import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  if (!url) return "";
  // If it doesn't start with http, add https://
  return url.startsWith("http") ? url : `https://${url}`;
};
