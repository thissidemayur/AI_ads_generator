"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center">
      <h2 className="text-xl font-semibold text-gray-900">
        Something went wrong!
      </h2>
      <p className="mt-2 text-gray-600 mb-6">
        {error.message || "We couldn't load this part of the dashboard."}
      </p>
      <button
        onClick={() => reset()} 
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Try again
      </button>
    </div>
  );
}
