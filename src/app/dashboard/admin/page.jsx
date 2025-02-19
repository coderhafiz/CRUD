"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }
  }, [session]);

  const updateUserRole = async (userId, newRole) => {
    const res = await fetch("/api/users/update-role", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, newRole }),
    });

    if (res.ok) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    }
  };

  if (!session || session.user.role !== "admin") return <p>Access Denied</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <div key={user._id} className="border rounded-lg p-4 shadow-md">
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm">
              Role: <span className="font-bold text-blue-600">{user.role}</span>
            </p>
            <select
              className="mt-2 p-2 border rounded w-full"
              value={user.role}
              onChange={(e) => updateUserRole(user._id, e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
