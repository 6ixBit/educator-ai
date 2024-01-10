"use client";

import Link from "next/link";

export default function DashboardButton() {
  return (
    <Link
      className="py-2 px-3 z-10 flex rounded-md no-underline text-white bg-black transition-colors hover:bg-gray-700 border"
      href="/projects"
    >
      <svg
        aria-label="Vercel logomark"
        role="img"
        viewBox="0 0 74 64"
        className="h-4 w-4 mr-2"
      >
        <path
          d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
          fill="currentColor"
        ></path>
      </svg>
      Dashboard
    </Link>
  );
}
