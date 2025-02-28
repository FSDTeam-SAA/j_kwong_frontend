import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateImage(src) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  return `${baseURL}${src}`;
}
