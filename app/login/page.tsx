import Image from "next/image";
import Link from "next/link";
import Messages from "./messages";

export default function Login() {
  return (
    <div className="w-full">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground sm:px-36 lg:px-72 md:max-w-52"
        action="/auth/sign-in"
        method="post"
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <Image
            src="/logo.png"
            width={140}
            height={140}
            alt="ai logo"
            className="mb-2"
          />
          <h1 className="text-5xl font-semibold mb-4 flex justify-center text-white pb-10">
            Pro Tutor AI
          </h1>
        </div>
        <label className="text-md text-white font-semibold " htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 text-white"
          name="email"
          placeholder="you@email.com"
          required
        />
        <label className="text-md text-white font-semibold" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 text-white"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button
          className="rounded  mt-8 p-4 py-2 text-black mb-2 bg-login-btn"
          // style={{ background: "linear-gradient(to right, #008FFF, #A436FE)" }}
        >
          Login
        </button>
        {/* <button
          formAction="/auth/sign-up"
          className="border border-white rounded px-4 py-2 text-white mb-2"
        >
          Sign Up
        </button> */}
        <Messages />
      </form>
    </div>
  );
}

/* <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Home
      </Link> */
