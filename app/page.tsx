import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import DashboardButton from "@/components/DashboardButton";
import Navigation from "@/components/Navigation";
import ArrowLogo from "@/components/ArrowLogo";
import CollapsableSection from "./learn/components/CollapsableSection";
import HamburgerMenu from "@/components/HamburgerMenu";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const loggedIn = user ? "/learn" : "/login";
  const isMobile = true;

  return (
    <div className="w-full flex flex-col items-center">
      <Navigation>
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div className="text-white text-lg">
            {/* <DashboardButton /> */}
            Pro Tutor AI
          </div>

          <div className="flex items-center gap-4">
            {isMobile ? (
              <>
                {user ? (
                  <LogoutButton />
                ) : (
                  <Link
                    href="/login"
                    className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                  >
                    Login
                  </Link>
                )}
                <HamburgerMenu
                  items={[
                    {
                      name: "Pricing",
                      url: "#pricing",
                    },
                    {
                      name: "FAQ",
                      url: "#faq",
                    },
                    {
                      name: "Contact",
                      url: "#contact",
                    },
                  ]}
                />
              </>
            ) : (
              <div className="flex flex-row gap-7 items-baseline">
                <p className="text-md font-medium">Pricing</p>
                <a href="#faq">
                  <p className="text-md font-medium">FAQ</p>
                </a>
                <p className="text-md font-medium">Contact</p>
                <Link
                  href="/login"
                  className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </Navigation>

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <h1 className="text-4xl font-sans font-semibold tracking-wide">
            Elevate Your Learning Experience
          </h1>

          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent mt-3" />
          <p className="text-2xl lg:text-4xl mx-auto max-w-xl text-center mt-4 mb-8 text-sky-400 font-sans leading-snug	">
            Unlock Your Full Potential with AI-Generated Study Tools –
            Flashcards, Exams, Case Studies and more.
          </p>

          <Link href={loggedIn} className="w-full text-center">
            <button className="mt-[10px] box-border inline-flex h-[40px] w-1/2 sm:w-1/4 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-[15px] hover:from-pink-500 hover:to-yellow-500 leading-none text-white font-black shadow-blackA7 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
              Get started
            </button>
          </Link>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <h1 className="text-2xl font-sans font-semibold text-center tracking-wide">
          Features
        </h1>
        <div className="flex flex-col gap-8 text-foreground">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {resources.map(({ title, subtitle, url, icon }) => (
              <a
                key={title}
                className="relative flex flex-col group rounded-lg border p-6 hover:border-blue-500"
                href={url}
              >
                <h3 className="font-bold mb-2  min-h-[40px] lg:min-h-[60px]">
                  {title}
                </h3>
                <div className="flex flex-col grow gap-4 justify-between">
                  <p className="text-sm opacity-70">{subtitle}</p>
                  <div className="flex justify-between items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="opacity-80 group-hover:opacity-100"
                    >
                      <path
                        d={icon}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <ArrowLogo />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <h1
          id="faq"
          className="text-2xl font-sans font-semibold text-center tracking-wide"
        >
          FAQ
        </h1>

        <div className="px-4">
          <CollapsableSection title="How does Pro Tutor AI work?">
            <p className="">
              Simply upload your study material, and our AI will generate
              personalized study tools for you to work through.
            </p>
          </CollapsableSection>
        </div>

        <div className="px-4">
          <CollapsableSection title="What formats can I upload my study material in?">
            <p className="">
              You can upload your material in various formats: raw text, text
              files, or PDFs.
            </p>
          </CollapsableSection>
        </div>

        <div className="px-4">
          <CollapsableSection title="How long does the process take?">
            <p className="">
              The processing time depends on the size of the uploaded material,
              but it typically takes under a couple of minutes.
            </p>
          </CollapsableSection>
        </div>

        <div className="flex justify-center text-center text-md mt-2">
          <p>
            Built by{" "}
            <Link
              href="https://hamzacarew.vercel.app/"
              target="_blank"
              className="font-bold"
            >
              Hamza
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const resources = [
  {
    title: "Generate summaries, flash cards and questions for your data.",
    subtitle:
      "Through reptition easily learn new topics and drill them down in your head.",
    url: "/learn",
    icon: "M7 4V20M17 4V20M3 8H7M17 8H21M3 12H21M3 16H7M17 16H21M4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44772 20.5523 4 20 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20Z",
  },
  {
    title: "Upload text or a PDF document",
    subtitle:
      "Type in that essay or upload a document, we will process the data and generate what we can from it.",
    url: "/learn",
    icon: "M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528",
  },
];
