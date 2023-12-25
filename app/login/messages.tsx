"use client";

import { useSearchParams } from "next/navigation";

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  console.log({ message, error });

  const errorMap: { [key: string]: string } = {
    "Could not authenticate user":
      "Invalid email or password. Please try again",
  };

  return (
    <>
      {error && (
        <p className="mt-4 p-4 bg-neutral-900 text-red-500 text-center">
          {errorMap[error] || ""}
        </p>
      )}
      {message && (
        <p className="mt-4 p-4 bg-neutral-900 text-neutral-300 text-center">
          {message}
        </p>
      )}
    </>
  );
}
