import { z } from "zod";

export const ActivitySchema = z.object({
  timestamp: z.string(),
  node: z.string(),
  event: z.string(),
  status: z.enum(["OK", "ERR", "WARN"]),
});

export const NodeSchema = z.object({
  name: z.string(),
  status: z.enum(["ONLINE", "DEGRADED", "OFFLINE"]),
  health: z.number().min(0).max(100),
  ip: z.string().optional(),
  lastHeartbeat: z.string().optional(),
});

export const StreamSchema = z.object({
  streamId: z.string(),
  node: z.string(),
  status: z.enum(["ONLINE", "DEGRADED", "OFFLINE"]),
  rate: z.string(),
  rateMbps: z.number(),
});

export const MetricsSchema = z.object({
  throughput: z.string(),
  throughputRaw: z.number(),
  throughputDelta: z.string(),
  latency: z.string(),
  latencyRaw: z.number(),
  latencyDelta: z.string(),
  nodesOnline: z.number(),
  nodesTotal: z.number(),
  uptime: z.string(),
  uptimePercent: z.number(),
});

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const LoginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(100),
});

export type ValidatedActivity = z.infer<typeof ActivitySchema>;
export type ValidatedNode = z.infer<typeof NodeSchema>;
export type ValidatedStream = z.infer<typeof StreamSchema>;
export type ValidatedMetrics = z.infer<typeof MetricsSchema>;
