import Link from "next/link";
import SignIn from "./sign-in";
import SignOut from "./sign-out";
import { auth } from "../auth";
export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="bg-blue-600 px-8 py-3 rounded-md flex items-center justify-between">
      {/* Logo */}
      <Link className="text-white font-bold" href="/">
        CG MARK
      </Link>
      {/* Mobile Sidebar Toggle (Hidden on large screens) */}
      <input type="checkbox" id="menu-toggle" className="hidden peer" />
      <label
        htmlFor="menu-toggle"
        className="lg:hidden text-white cursor-pointer text-2xl"
      >
        ☰
      </label>

      {/* Navbar (Sidebar on mobile) */}
      <div className="peer-checked:block hidden lg:flex flex-col lg:flex-row lg:gap-4 absolute lg:static top-20 w-full left-0 lg:w-auto bg-blue-700 lg:bg-transparent py-5 px-3 lg:p-0 rounded-md shadow-md lg:shadow-none ">
        <a
          className="text-blue-600 bg-white p-2 lg:rounded-md  active:scale-95 block lg:inline"
          href="/addTopic"
        >
          New Topic
        </a>
        <a
          className="text-blue-600 bg-white p-2 lg:rounded-md active:scale-95 block lg:inline"
          href="/dashboard"
        >
          Dashboard
        </a>
        {/* Conditional Sign In/Sign Out */}
        {session ? <SignOut /> : <SignIn />}
      </div>
    </nav>
  );
}
