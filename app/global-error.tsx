"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {

  useEffect(() => {
    console.error("Global error captured:", error)
  }, [error]);

  return (
    <html>
      <body className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600">Something went wrong</h1>
        <p className="text-gray-600 mt-2">{error.message}</p>

        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
