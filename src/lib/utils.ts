import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"; // Doğrusu bu!

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
