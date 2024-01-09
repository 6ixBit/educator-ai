import Header from "@/components/Header";
import { HomeLayout } from "@/components/home-layout";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HomeLayout> {children}</HomeLayout>;
}
