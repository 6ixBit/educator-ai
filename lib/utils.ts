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

export function randomizeArray<T>(array: T[]): T[] {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export function getAvgOfArray(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}
