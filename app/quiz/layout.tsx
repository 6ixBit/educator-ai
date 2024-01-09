"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
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

  return (
    <HomeLayout>
      <Header hideSearchBar={true} />
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
      <div className="flex flex-col justify-center mt-1">{children} </div>
    </HomeLayout>
  );
}
