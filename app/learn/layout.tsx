"use client";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import useWindowSize from "@/hooks/useWindowSize";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobile } = useWindowSize();

  return (
    <div className="w-full flex flex-col items-center">
      {/* <Navigation>
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <Link
            href="/"
            className="absolute py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>{" "}
            Home
          </Link>
        </div>
      </Navigation> */}

      <HamburgerMenu
        items={[
          { name: "Home", url: "/" },
          { name: "Items", url: "/learn" },
        ]}
      />

      {/* {isMobile ? (
        <HamburgerMenu
          items={[
            { name: "Home", url: "/" },
            { name: "Items", url: "/learn" },
          ]}
        />
      ) : null} */}

      {children}
    </div>
  );
}
