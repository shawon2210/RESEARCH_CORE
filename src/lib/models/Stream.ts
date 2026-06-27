import mongoose, { Schema, Document } from "mongoose";

export interface IStream extends Document {
  streamId: string;
  node: string;
  status: "ONLINE" | "DEGRADED" | "OFFLINE";
  rate: string;
  rateMbps: number;
  lastActive: Date;
}

const StreamSchema = new Schema<IStream>(
  {
    streamId: { type: String, required: true, unique: true },
    node: { type: String, required: true },
    status: {
      type: String,
      enum: ["ONLINE", "DEGRADED", "OFFLINE"],
      default: "ONLINE",
    },
    rate: { type: String, required: true },
    rateMbps: { type: Number, required: true },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Stream =
  mongoose.models.Stream ?? mongoose.model<IStream>("Stream", StreamSchema);
