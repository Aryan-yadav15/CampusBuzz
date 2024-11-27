// app/event/[id]/EventDetailsClient.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { handleEnroll } from "@/lib/actions/enroll.actions";

interface EventProps {
  event: {
    _id: string;
    title: string;
    imageUrl: string;
  };
}

const EventDetailsClient = ({ event }: EventProps) => {
  const [loading, setLoading] = useState(false);

  // Client-side enroll function
  async function enrollUser(userId: string, eventId: string) {
    setLoading(true);
    try {
      const result = await handleEnroll(userId, eventId); // Call the server action
      alert("Enrollment successful!");
    } catch (error: any) {
      console.error("Enrollment failed:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
      
      <Image
        src={event.imageUrl}
        alt="hero image"
        width={1000}
        height={1000}
        className="h-full min-h-[300px] object-cover object-center"
      />

      <div className="flex w-full flex-col gap-8 p-5 md:p-10">
        <h2 className="h2-bold">{event.title}</h2>
        <button
          onClick={() => enrollUser("USER_ID", event._id)} // Pass user and event ID
          disabled={loading}
          className={`px-4 py-2 rounded ${loading ? "bg-gray-500" : "bg-blue-500"} text-white`}
        >
          {loading ? "Enrolling..." : "Enroll"}
        </button>
      </div>
    </div>
  );
};

export default EventDetailsClient;
