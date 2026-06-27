import mongoose, { Schema, Document } from "mongoose";

export interface INode extends Document {
  name: string;
  status: "ONLINE" | "DEGRADED" | "OFFLINE";
  health: number;
  ip: string;
  lastHeartbeat: Date;
}

const NodeSchema = new Schema<INode>(
  {
    name: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["ONLINE", "DEGRADED", "OFFLINE"],
      default: "ONLINE",
    },
    health: { type: Number, min: 0, max: 100, default: 100 },
    ip: { type: String, required: true },
    lastHeartbeat: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Node =
  mongoose.models.Node ?? mongoose.model<INode>("Node", NodeSchema);
