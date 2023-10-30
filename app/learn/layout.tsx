"use client";

import Link from "next/link";
import HamburgerMenu from "@/components/HamburgerMenu";
import { usePathname } from "next/navigation";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col items-center bg-slate-900">
      <div className="flex justify-start space-x-5 pt-4 items-center text-md text-foreground mt-2 mb-4 w-10/12 sm:w-[510px] lg:w-5/12">
        <Link
          href="/"
          className={`no-underline font-semibold text-md ${
            pathname === "/" ? "text-sky-500" : "text-gray-600"
          } hover:text-highlight hover:underline`}
        >
          Home
        </Link>
        <Link
          href="/learn"
          className={`no-underline font-semibold text-md ${
            pathname === "/learn" ? "text-sky-500" : "text-gray-500"
          } hover:text-highlight hover:underline`}
        >
          Notes
        </Link>
        <Link
          href="/learn/create"
          className={`no-underline font-semibold text-md ${
            pathname === "/learn/create" ? "text-sky-500" : "text-gray-600"
          } hover:text-highlight hover:underline`}
        >
          Create
        </Link>
      </div>

      {children}
    </div>
  );
}
