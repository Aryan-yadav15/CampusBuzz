// components/EnrollButton.tsx
"use client";

import { useState } from "react";

const EnrollButton = ({ userId, eventId }: { userId: string; eventId: string }) => {
  const [status, setStatus] = useState("");

  const handleEnroll = async () => {
    try {
      const response = await fetch(`/api/enrollUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, eventId }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);

      setStatus("Enrolled successfully!");
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <button
        onClick={handleEnroll}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Enroll
      </button>
      {status && <p>{status}</p>}
    </>
  );
};

export default EnrollButton;
