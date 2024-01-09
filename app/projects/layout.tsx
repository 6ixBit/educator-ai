import Header from "@/components/Header";
import { HomeLayout } from "@/components/home-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <HomeLayout>
      {" "}
      <Header />
      {children}
    </HomeLayout>
  );
}
