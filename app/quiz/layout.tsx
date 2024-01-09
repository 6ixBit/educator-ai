"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { HomeLayout } from "@/components/home-layout";
import LoginModal from "@/components/LoginModal";
import { useUserAuth } from "../hooks";
import useWindowSize from "@/hooks/useWindowSize";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showLoginModal, setShowLoginModal } = useUserAuth();
  const { isMobile } = useWindowSize();

  return (
    <HomeLayout>
      {isMobile && <Header hideSearchBar={true} />}
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
      <div className="flex flex-col justify-center mt-1">{children} </div>
    </HomeLayout>
  );
}
