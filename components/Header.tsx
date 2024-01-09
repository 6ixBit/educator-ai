"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { CardIcon } from "./icons/CardIcon";
import ChangeLangModal from "./ChangeLangModal";
import { HomeIcon } from "./icons/HomeIcon";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { QuizIcon } from "./icons/QuizIcon";
import { SettingsIcon } from "./icons/SettingsIcon";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserAuth } from "@/app/hooks";

export default function Header({ hideSearchBar }: { hideSearchBar?: boolean }) {
  const { userEmail } = useUserAuth();
  const [showChangeLangModal, setShowChangeLangModal] = useState(false);
  const router = useRouter();

  return (
    <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 rounded-lg">
      {hideSearchBar ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            router.back();
          }}
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
          </svg>
          Back
        </Button>
      ) : (
        <div className="relative w-1/3 bg-white rounded-lg">
          <Input
            className="w-full py-2 pl-10 pr-4 rounded-md bg-color"
            placeholder="Search..."
            type="search"
          />
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
      )}
      <div className="flex-1" />
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          className="bg-white w-64 space-y-4 pt-10 pr-4 pl-8 flex flex-col justify-between rounded-lg text-black"
          side="right"
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 mb-6">
              <Image src="/logo.png" width={25} height={25} alt="ai logo" />
              <span className="font-bold text-md">Pro Tutor AI</span>
            </div>
            <Link
              className="text-lg font-semibold flex flex-row items-baseline"
              href="/projects"
            >
              <HomeIcon className="w-4 h-4 mr-2" />
              Projects
            </Link>
            <Link
              className="text-lg font-semibold flex flex-row items-baseline"
              href="/decks"
            >
              <CardIcon className="w-4 h-4 mr-2" />
              Study Cards
            </Link>
            <Link
              className="text-lg font-semibold flex flex-row items-baseline"
              href="/quiz"
            >
              <QuizIcon className="w-4 h-4 mr-2" />
              Quiz
            </Link>
          </div>

          <div className="flex items-center flex-col mt-8">
            <Button
              variant="outline"
              onClick={() => {
                setShowChangeLangModal(true);
              }}
            >
              <SettingsIcon className="w-5 h-5" />
              <p className="px-2">Change Languages</p>
            </Button>
            <span className="text-gray-600 pt-4">{userEmail}</span>
          </div>
        </SheetContent>
      </Sheet>
      <ChangeLangModal
        showModal={showChangeLangModal}
        setShowModal={setShowChangeLangModal}
      />
    </div>
  );
}

function MenuIcon(props: any) {
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

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
