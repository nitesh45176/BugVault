

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteBugButton({  id }: {
  id: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm("Delete this bug?");
    if (!confirmDelete) return;

    setLoading(true);

    await fetch(`/api/projects/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    router.push(`/dashboard`);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-4 py-2 bg-red-600 text-white rounded"
    >
      {loading ? "Deleting..." : "Delete Project"}
    </button>
  );
}
