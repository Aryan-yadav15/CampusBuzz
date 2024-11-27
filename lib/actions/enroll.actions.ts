'use server';

import { connectToDatabase } from "@/lib/database";
import Enrollment from "../database/models/enroll.model";

export async function handleEnroll(userId: string, eventId: string) {
  try {
    await connectToDatabase();

    // Enrollment logic
    const enrollment = await Enrollment.create({ userId, eventId });

    return JSON.parse(JSON.stringify(enrollment));
  } catch (error) {
    console.error("Error enrolling user:", error);
    throw new Error("Enrollment failed. Please try again.");
  }
}
