import { auth } from "./../../auth";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth(); // Fetch session

  if (!session || session.user.role !== "admin") {
    return <p>Access Denied. Please log in.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1>Welcome, {session.user.name}</h1>
      <p>Your email: {session.user.email}</p>
      <p>Your id: {session.user.id}</p>
      <Link
        className="bg-blue-600 text-white py-1 px-2 rounded-xl active:scale-95"
        href={"/dashboard/admin"}
      >
        Admin
      </Link>
    </div>
  );
}
