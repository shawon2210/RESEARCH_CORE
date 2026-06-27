export interface StreamData {
  streamId: string;
  node: string;
  status: "ONLINE" | "DEGRADED" | "OFFLINE";
  rate: string;
  rateMbps: number;
}

export interface NodeData {
  name: string;
  status: "ONLINE" | "DEGRADED" | "OFFLINE";
  health: number;
}

export interface ActivityData {
  timestamp: string;
  node: string;
  event: string;
  status: "OK" | "ERR" | "WARN";
}

export interface MetricsData {
  throughput: string;
  throughputRaw: number;
  throughputDelta: string;
  latency: string;
  latencyRaw: number;
  latencyDelta: string;
  nodesOnline: number;
  nodesTotal: number;
  uptime: string;
  uptimePercent: number;
}
