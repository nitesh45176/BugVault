"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteBugButton({
  bugId,
  projectId,
}: {
  bugId: string;
  projectId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm("Delete this bug?");
    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/bugs/${bugId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      // ✅ Refresh current page so bug list updates
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);  
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-2 rounded"
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
