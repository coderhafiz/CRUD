import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-blue-600 px-8 py-3 rounded-md">
      <Link className="text-white font-bold" href={"/"}>
        CG MARK
      </Link>
      <Link className="bg-white p-2 rounded-xl" href={"/addTopic"}>
        New Topic
      </Link>
    </nav>
  );
}
