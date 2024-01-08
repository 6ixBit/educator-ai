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
  if (!arr || arr.length === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

interface QuestionObject {
  question: string;
  wrong_answers: string[];
  correct_answer: string;
}

function toAikenFormat(questionObj: QuestionObject) {
  const { question, wrong_answers, correct_answer } = questionObj;
  let options = wrong_answers.map((answer, index) => {
    return `${String.fromCharCode(65 + index)}. ${answer}`;
  });

  // Add the correct answer at a random position
  const correctIndex = Math.floor(Math.random() * (wrong_answers.length + 1));
  options.splice(
    correctIndex,
    0,
    `${String.fromCharCode(65 + correctIndex)}. ${correct_answer}`
  );

  // Join the question, options, and the answer identifier for the correct answer
  return `${question}\n${options.join("\n")}\nANSWER: ${String.fromCharCode(
    65 + correctIndex
  )}\n`;
}

// // Example usage:
// const questionData = {
//   question: "What is the capital of France?",
//   wrong_answers: ["Berlin", "Madrid", "London"],
//   correct_answer: "Paris"
// };

// console.log(toAikenFormat(questionData));
