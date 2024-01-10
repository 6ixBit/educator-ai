import DashboardLogo from "./icons/DashboardLogo";
import Link from "next/link";

export default function DashboardButton() {
  return (
    <Link
      className="py-2 px-3 z-10 flex rounded-md no-underline text-white bg-black transition-colors hover:bg-gray-700 border"
      href="/projects"
    >
      <DashboardLogo />
      <p className="px-1">Dashboard</p>
    </Link>
  );
}
