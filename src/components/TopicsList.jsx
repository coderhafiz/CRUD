"use client"; // ✅ Convert to a Client Component

import { useState, useEffect } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

export default function TopicsList() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const res = await fetch(`${apiUrl}/api/topics`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }

        const data = await res.json();
        setTopics(data.topics); // ✅ Fix: Ensure correct data structure
      } catch (err) {
        console.error("Error loading topics:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) return <p>Loading topics...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      {topics.length > 0 ? (
        topics.map((t) => (
          <div
            key={t._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start rounded-md"
          >
            <div>
              <h2 className="font-bold text-2xl text-blue-500">{t.title}</h2>
              <div className="">{t.description}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={t._id} />
              <Link href={`/editTopic/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No topics found.</p>
      )}
    </>
  );
}
