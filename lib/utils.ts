import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToISODateString(dateString: string) {
  const date = new Date(dateString);
  return date.toISOString();
}

export function isISODateInPast(dateString: string) {
  const date = new Date(dateString);
  const currentDate = new Date();
  return date < currentDate;
}
