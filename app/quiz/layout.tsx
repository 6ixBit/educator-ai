"use client";

import { Button } from "@/components/ui/button";
import { HomeLayout } from "@/components/home-layout";
import LoginModal from "@/components/LoginModal";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../hooks";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showLoginModal, setShowLoginModal } = useUserAuth();
  const router = useRouter();

  return (
    <HomeLayout>
      <div className="sm:px-7 px-1">
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
        <Separator className="mt-4" />
      </div>
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
      <div className="flex flex-col justify-center mt-1">{children} </div>
    </HomeLayout>
  );
}
