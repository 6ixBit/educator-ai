"use client";

import Link from "next/link";
import HamburgerMenu from "@/components/HamburgerMenu";
import { usePathname } from "next/navigation";
import { useIntl } from "react-intl";

import { useState } from "react";
import NewModal from "@/components/NewModal/NewModal";
import { Select, Separator } from "@radix-ui/themes";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const intl = useIntl();
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState("English");

  return (
    <div className="w-full flex flex-col items-center bg-slate-900">
      <div className="flex justify-between space-x-5 pt-4 items-center text-md text-foreground mt-2 mb-4 max-w-full w-10/12 sm:w-8/12 lg:w-10/12">
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
              pathname === "/learn/create" ? "text-sky-500" : "text-gray-600"
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
              <Select.Root defaultValue="en-US">
                <Select.Trigger variant="soft" />

                <Select.Content>
                  <Select.Item value="en-US">English </Select.Item>
                  <Select.Item value="fr">French</Select.Item>
                  <Select.Item value="es">Spanish</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>
          }
          actionButtons={
            <button className="border-black border px-2 py-1 rounded-none">
              Save
            </button>
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

      {children}
    </div>
  );
}
