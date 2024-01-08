"use client";

import ArrowLogo from "@/components/icons/ArrowLogo";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import CheckLogo from "@/components/icons/CheckLogo";
import CollapsableSection from "@/components/CollapsableSection";
import DashboardButton from "@/components/DashboardButton";
import HamburgerMenu from "@/components/HamburgerMenu";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import Navigation from "@/components/Navigation";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import useStore from "./store";
import { useUserAuth } from "./hooks";
import useWindowSize from "@/hooks/useWindowSize";

export const dynamic = "force-dynamic";

const words = [
  {
    text: "Elevate",
  },
  {
    text: "your",
  },
  {
    text: "learning",
  },

  {
    text: "Experience.",
    className: "text-blue-500 dark:text-blue-500",
  },
];

export default function Index() {
  const { isMobile } = useWindowSize();

  const { userID } = useUserAuth();

  const loggedIn = userID ? "/projects" : "/login";

  return (
    <div className="w-full flex flex-col items-center bg-black">
      <Navigation>
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div className="text-white text-lg font-bold flex flex-row items-center gap-3">
            {" "}
            <Image src="/logo.png" width={40} height={40} alt="ai logo" />
            <p>Pro Tutor AI</p>
          </div>

          <div className="flex items-center gap-4">
            {userID && <DashboardButton />}

            {!userID && (
              <Link
                href="/login"
                className="py-1 px-3 rounded-md no-underline hover:bg-btn-background-hover bg-cyan-500 font-semibold"
              >
                Login
              </Link>
            )}

            {isMobile && (
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
            )}
          </div>
        </div>
      </Navigation>

      <BackgroundBeams />
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <TypewriterEffect words={words} />
          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent mt-3" />
          <p className=" lg:text-4xl mx-auto max-w-xl text-center mt-4 mb-4 text-sky-400 font-sans leading-snug text-xl font-semibold tracking-tight">
            Upload a PDF and watch ProTutor create your study notes for you.
          </p>

          <div className="mt-4 gap-4">
            <div className="grid grid-cols-[auto,1fr] gap-2 items-start">
              <CheckLogo stroke="#0ea5e9" />
              <p className="text-white">Save time on creating study material</p>
            </div>
            <div className="grid grid-cols-[auto,1fr] gap-2 items-start">
              <CheckLogo stroke="#0ea5e9" />
              <p className="text-white">
                Stay on track and get reminded of upcoming deadlines
              </p>
            </div>
            <div className="grid grid-cols-[auto,1fr] gap-2 items-start">
              <CheckLogo stroke="#0ea5e9" />
              <p className="text-white">
                Generate studycards, case studies & quizzes
              </p>
            </div>

            <div className="grid grid-cols-[auto,1fr] gap-2 items-start">
              <CheckLogo stroke="#0ea5e9" />
              <p className="text-white">Create custom quizzes for students</p>
            </div>
          </div>

          <Link href={loggedIn} className="w-full text-center mt-5">
            <button className="mt-[10px] box-border inline-flex h-[40px] w-1/2 sm:w-1/4 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-[15px] hover:from-pink-500 hover:to-yellow-500 leading-none text-white font-black shadow-blackA7 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
              Get started
            </button>
          </Link>

          {/* <p className="text-white">Trusted by ...</p> */}
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <h1 className="text-2xl text-white font-sans font-semibold text-center tracking-wide">
          Features
        </h1>
        <div className="flex flex-col gap-8 text-foreground">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {resources.map(({ title, subtitle, url, icon }) => (
              <a
                key={title}
                className="relative flex flex-col group rounded-lg border p-6 hover:border-blue-500"
              >
                <h3 className="font-bold mb-2  min-h-[40px] lg:min-h-[60px] text-white">
                  {title}
                </h3>
                <div className="flex flex-col grow gap-4 justify-between">
                  <p className="text-sm opacity-70 text-gray-400">{subtitle}</p>
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
                        stroke="white"
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

        <div>
          <h1
            id="demo"
            className="text-2xl text-white font-sans font-semibold text-center tracking-wide"
          >
            Demo Video
          </h1>

          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center pt-6 text-slate-300">
            We're about showing, less about talking so here's a video of how it
            works.
          </h4>

          <video autoPlay muted loop>
            <source src="path_to_your_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div>
          <h1
            id="pricing"
            className="text-2xl text-white font-sans font-semibold text-center tracking-wide mb-6"
          >
            Pricing
          </h1>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-900 dark:text-blue-100 pb-4">
                  Enhance your learning experience.
                </h2>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col items-center bg-blue-500 rounded-lg shadow-lg p-6 text-center space-y-4 w-full md:w-1/2 lg:w-1/3 dark:bg-blue-300">
                  <h3 className="text-2xl font-bold text-white">Pro Tutor +</h3>
                  <div className="text-4xl font-bold text-white">$11.99/mo</div>
                  <ul className="space-y-2 text-blue-200">
                    <li>Unlimited projects</li>
                    <li>Generate 100+ questions from over 50k words</li>
                    <li>Priority Email Support</li>
                    <li>Lifetime Updates</li>
                  </ul>
                  <Button className="mt-4 bg-white text-blue-500 hover:bg-gray-100 dark:text-blue-900 dark:hover:bg-blue-200">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <div>
          <h1
            id="faq"
            className="text-2xl text-white font-sans font-semibold text-center tracking-wide"
          >
            FAQ
          </h1>

          <div className="px-4">
            <CollapsableSection title="How does Pro Tutor AI work?">
              <p className="text-white text-lg font-bold">
                Simply upload your study material, and our AI will generate
                personalized study tools for you to work through.
              </p>
            </CollapsableSection>
          </div>

          <div className="px-4">
            <CollapsableSection title="What formats can I upload my study material in?">
              <p className="text-white text-lg font-bold">
                You can upload your material in various formats: raw text, text
                files, or PDFs.
              </p>
            </CollapsableSection>
          </div>

          <div className="px-4">
            <CollapsableSection title="How long does the process take?">
              <p className="text-white text-lg font-bold">
                The processing time depends on the size of the uploaded
                material, but it typically takes under a couple of minutes.
              </p>
            </CollapsableSection>
          </div>
        </div>

        <div className="flex justify-center text-center text-white text-md mt-2">
          <p>
            Built by{" "}
            <Link
              href="https://hamzacarew.vercel.app/"
              target="_blank"
              className="font-bold text-white"
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
  {
    title: "Upload text or a PDF document",
    subtitle:
      "Type in that essay or upload a document, we will process the data and generate what we can from it.",
    url: "/learn",
    icon: "M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528",
  },
  {
    title: "Upload text or a PDF document",
    subtitle:
      "Type in that essay or upload a document, we will process the data and generate what we can from it.",
    url: "/learn",
    icon: "M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528",
  },
];
