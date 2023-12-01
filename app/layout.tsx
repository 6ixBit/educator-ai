// @ts-nocheck
"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { IntlProvider } from "react-intl";
import messages from "../messages.json";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import useStore from "./store";

// export const metadata = {
//   title: "Educator AI",
//   description: "Learn anything you want.",
// };

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const storeLocale: string = useStore((state) => state.language);
  let locale = storeLocale;

  if (typeof window !== "undefined") {
    const localStorageLang = localStorage.getItem("language");
    const getLanguage = useStore((state) => state.getLanguage);

    locale = localStorageLang ? localStorageLang : getLanguage();
  }

  return (
    <html>
      <body>
        <IntlProvider key={locale} messages={messages[locale]} locale={locale}>
          <QueryClientProvider client={queryClient}>
            <Theme>
              <main className="min-h-screen bg-slate-900 flex flex-col items-center">
                {children}
              </main>
            </Theme>
          </QueryClientProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
