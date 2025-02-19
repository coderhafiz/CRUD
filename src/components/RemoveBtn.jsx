"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/topics?id=${id}`, {
        method: "DELETE",
      });

      console.log(res);

      if (res.ok) {
        console.log("working");

        router.refresh();

        // router.push("/");
      } else {
        alert("Error deleting the topic");
      }
    }
  };

  return (
    <a href="/">
      <button onClick={removeTopic} className="text-red-400 active:scale-95">
        <HiOutlineTrash size={24} />
      </button>
    </a>
  );
}
