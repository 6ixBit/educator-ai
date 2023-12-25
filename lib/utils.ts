import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export function calculateDaysUntilDeadline(dueDate: string) {
  const today = new Date();
  const deadline = new Date(dueDate);
  const timeDifference = deadline.getTime() - today.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return daysDifference;
}
