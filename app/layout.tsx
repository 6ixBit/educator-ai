// @ts-nocheck
"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { IntlProvider } from "react-intl";
import messages from "../messages.json";

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
  const locale = window.navigator.language;
  console.log("cartz: ", locale);

  return (
    <html>
      <body>
        <IntlProvider
          messages={messages[locale]}
          locale={locale}
          defaultLocale="en"
        >
          <QueryClientProvider client={queryClient}>
            <main className="min-h-screen bg-slate-900 flex flex-col items-center">
              {children}
            </main>
          </QueryClientProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
