import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  timestamp: Date;
  node: string;
  event: string;
  status: "OK" | "ERR" | "WARN";
}

const ActivitySchema = new Schema<IActivity>(
  {
    timestamp: { type: Date, default: Date.now },
    node: { type: String, required: true },
    event: { type: String, required: true },
    status: {
      type: String,
      enum: ["OK", "ERR", "WARN"],
      default: "OK",
    },
  },
  { timestamps: true }
);

export const Activity =
  mongoose.models.Activity ??
  mongoose.model<IActivity>("Activity", ActivitySchema);
