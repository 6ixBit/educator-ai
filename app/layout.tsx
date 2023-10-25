"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

// export const metadata = {
//   title: "Educator AI",
//   description: "Learn anything you want.",
// };

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <main className="min-h-screen bg-background flex flex-col items-center">
            {children}
          </main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
