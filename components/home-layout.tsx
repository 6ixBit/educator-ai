"use client";

import { Button } from "@radix-ui/themes";
import ChangeLangModal from "./ChangeLangModal";
import Image from "next/image";
import Link from "next/link";
import { SettingsIcon } from "./icons/SettingsIcon";
import { useIntl } from "react-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useUserAuth } from "@/app/hooks";
import useWindowSize from "@/hooks/useWindowSize";

export function HomeLayout({ children }: { children: React.ReactNode }) {
  const { isTablet } = useWindowSize();
  const { userEmail } = useUserAuth();
  const path = usePathname();
  const [showChangeLangModal, setShowChangeLangModal] = useState(false);
  const intl = useIntl();

  const isActive = (routes: string[]) => {
    if (routes.some((route) => path.startsWith(route))) {
      return {
        border:
          "flex items-center px-4 py-2 mt-2 text-gray-700 hover:bg-gray-300 bg-[#1DB8FA] bg-opacity-20 rounded-lg",
        text: "text-[#24BAFA] mx-4",
      };
    } else {
      return {
        border:
          "flex items-center px-4 py-2 mt-2 text-gray-700 hover:bg-gray-300 rounded-lg",
        text: "mx-4",
      };
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 w-screen">
      <div
        className={`hidden md:flex ${
          isTablet ? "w-20" : "w-56"
        } bg-white p-4 shadow-lg  flex-col justify-between`}
      >
        <div>
          <div className="flex items-center justify-center gap-1">
            <Image src="/logo.png" width={40} height={40} alt="ai logo" />
            {!isTablet && (
              <span className="font-bold text-2xl mx-2">Pro Tutor AI</span>
            )}
          </div>

          <nav className="mt-8">
            <Link className={isActive(["/projects"]).border} href="/projects">
              <HomeIcon className="w-4 h-4" />
              {!isTablet && (
                <span className={isActive(["/projects"]).text}>
                  {intl.formatMessage({ id: "navmenu.projects" })}
                </span>
              )}
            </Link>
            <Link
              className={isActive(["/deck", "/decks"]).border}
              href="/decks"
            >
              <CardIcon className="w-4 h-4" />
              {!isTablet && (
                <span className={isActive(["/deck", "/decks"]).text}>
                  {intl.formatMessage({ id: "navmenu.studycards" })}
                </span>
              )}
            </Link>
            <Link className={isActive(["/quiz"]).border} href="/quiz">
              <QuizIcon className="w-4 h-4" />

              {!isTablet && (
                <span className={isActive(["/quiz"]).text}>
                  {intl.formatMessage({ id: "navmenu.quiz" })}
                </span>
              )}
            </Link>
          </nav>
        </div>

        <div className="flex items-center mt-8 flex-col">
          {!isTablet && (
            <Button
              variant="outline"
              radius="large"
              onClick={() => {
                setShowChangeLangModal(true);
              }}
            >
              <SettingsIcon className="w-4 h-4" />
              Change Languages
            </Button>
          )}

          {!isTablet && <span className="text-gray-600 pt-4">{userEmail}</span>}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 overflow-auto">{children}</div>

      <ChangeLangModal
        showModal={showChangeLangModal}
        setShowModal={setShowChangeLangModal}
      />
    </div>
  );
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function CardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
      <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
    </svg>
  );
}

function QuizIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2v7.31" />
      <path d="M14 9.3V1.99" />
      <path d="M8.5 2h7" />
      <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
      <path d="M5.52 16h12.96" />
    </svg>
  );
}
