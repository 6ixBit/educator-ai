"use client";

import Link from "next/link";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import HamburgerMenu from "./HamburgerMenu";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function HomeLayout({ children }: { children: React.ReactNode }) {
  const { isMobile, isTablet } = useWindowSize();
  const path = usePathname();

  const isActive = (route: string) => {
    if (route === path) {
      const activeStyles = {
        border:
          "flex items-center px-4 py-2 mt-2 text-gray-700 hover:bg-gray-300 bg-[#1DB8FA] bg-opacity-20 rounded-lg",
        text: "text-[#24BAFA] mx-4",
      };
      return activeStyles;
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
            <Link className={isActive("/projects").border} href="/projects">
              <HomeIcon className="w-4 h-4" />
              {!isTablet && (
                <span className={isActive("/projects").text}>Projects</span>
              )}
            </Link>
            <Link
              className={isActive("/study-cards").border}
              href="/study-cards"
            >
              <PieChartIcon className="w-4 h-4" />
              {!isTablet && (
                <span className={isActive("/study-cards").text}>
                  Study Cards
                </span>
              )}
            </Link>
            <Link className={isActive("/quiz").border} href="/quiz">
              <SettingsIcon className="w-4 h-4" />
              {!isTablet && (
                <span className={isActive("/quiz").text}>Quiz</span>
              )}
            </Link>
          </nav>
        </div>

        <div className="flex items-center mt-8">
          <Avatar className="w-8 h-8 mr-2">
            <AvatarImage
              alt="User avatar"
              src="/placeholder.svg?height=32&width=32"
            />
          </Avatar>
          {!isTablet && <span className="text-gray-600">hcar@yahoo.co</span>}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 overflow-auto">
        <div className="flex justify-between items-center">
          {isMobile && (
            <HamburgerMenu
              items={[
                {
                  name: "Projects",
                  url: "#projects",
                },
                {
                  name: "Quiz",
                  url: "#quiz",
                },
                {
                  name: "Case study",
                  url: "#case",
                },
              ]}
            />
          )}
          {/* <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <Button>Logout</Button> */}
        </div>
        {children}
      </div>
    </div>
  );
}

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PieChartIcon(props) {
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
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}

function HomeIcon(props) {
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

function MenuIcon(props) {
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

function ImageIcon(props) {
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
