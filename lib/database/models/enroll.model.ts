import mongoose, { Schema, model, models } from "mongoose";

const EnrollmentSchema = new Schema({
  userId: { type: String, required: true, ref: "User" }, // Clerk ID of the user
  eventId: { type: Schema.Types.ObjectId, required: true, ref: "Event" }, // Event ID
  createdAt: { type: Date, default: Date.now }, // Timestamp for enrollment
});

// Check if the model already exists to avoid overwrite errors
const Enrollment =
  models.Enrollment || model("Enrollment", EnrollmentSchema);

export default Enrollment;
