"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import HamburgerMenu from "@/components/HamburgerMenu";
import { usePathname } from "next/navigation";
import { useIntl } from "react-intl";
import { useState } from "react";
import NewModal from "@/components/NewModal/NewModal";
import { Select, Separator } from "@radix-ui/themes";
import { languageMapping } from "../store";
import useStore from "../store";
import HorizontalSeparator from "@/components/HorizontalSeparator/HorizontalSeparator";
import { useEffect } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useQuery } from "react-query";
import { fetchUser } from "../learn/actions";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // @ts-ignore
  const state = useStore();
  const supabase = createClientComponentClient();
  const pathname = usePathname();
  const intl = useIntl();
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { isLoading: isLoadingUser, data: userData } = useQuery({
    queryKey: "userData",
    queryFn: () => fetchUser(supabase),
    onError: (error) => {
      console.log("Could not login user: ", error);
      setShowLoginModal(true);
    },
  });

  // @ts-ignore
  const userID = userData?.user?.id;

  useEffect(() => {
    if (!userID && !isLoadingUser) {
      setShowLoginModal(true);
    }
  }, [userID, isLoadingUser]);

  return (
    <div className="w-full flex flex-col items-center bg-slate-900 h-full">
      <div className="flex justify-between space-x-5 pt-4 items-center text-md text-foreground mt-2  max-w-full w-10/12 sm:w-8/12 lg:w-10/12">
        <div className="flex space-x-5">
          <Link
            href="/"
            className={`no-underline font-semibold text-md transform transition-transform duration-200 ${
              pathname === "/" ? "text-sky-500" : "text-gray-600"
            } hover:text-highlight hover:scale-110 hover:text-white`}
          >
            {intl.formatMessage({ id: "navmenu.home" })}
          </Link>
          <Separator orientation="vertical" />
          <Link
            href="/learn"
            className={`no-underline font-semibold text-md transform transition-transform duration-200 ${
              pathname === "/learn" ? "text-sky-500" : "text-gray-600"
            } hover:text-highlight hover:scale-110 hover:text-white`}
          >
            {intl.formatMessage({ id: "navmenu.notes" })}
          </Link>
          <Separator orientation="vertical" />
          <Link
            href="/learn/create"
            className={`no-underline font-semibold text-md transform transition-transform duration-200 ${
              pathname === "/create" ? "text-sky-500" : "text-gray-600"
            } hover:text-highlight hover:scale-110 hover:text-white`}
          >
            {intl.formatMessage({ id: "navmenu.create" })}
          </Link>
        </div>

        <NewModal
          open={showModal}
          onOpenChange={setShowModal}
          title="Change System Language"
          description={
            <div className="pt-3 pl-3">
              <Select.Root
                // @ts-ignore
                defaultValue={state.getLanguage()}
                onValueChange={(value) => {
                  // @ts-ignore
                  state.setLanguage(value);
                  localStorage.setItem("language", value);
                }}
              >
                <Select.Trigger variant="soft" />

                <Select.Content>
                  {Object.entries(languageMapping).map(([key, value]) => (
                    <Select.Item key={key} value={key}>
                      {value}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
          }
        />
        <HamburgerMenu
          items={[
            {
              name: intl.formatMessage({ id: "hamburger.langs.text" }),
              onClick: () => setShowModal(true),
            },
          ]}
        />
      </div>
      {/* 
      <HorizontalSeparator
        style={{ width: "67.3%", color: "white", marginBottom: "3rem" }}
      /> */}
      <NewModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        title="Hold up! You need an account to see this!"
        hideCloseButton={true}
        preventOutsideClick={true}
        description={
          <div className="flex justify-center mt-6">
            <Link href="/login">
              <div className="border-2 border-slate-600 rounded-full px-5 py-1 w-full glow flex items-center flex-row gap-4 hover:bg-slate-200 transition-colors duration-200">
                <p className="text-black text-lg">Sign In</p>
                <ArrowRightIcon style={{ height: "1.8em", width: "1.8em" }} />
              </div>
            </Link>
          </div>
        }
      />
      {children}
    </div>
  );
}
