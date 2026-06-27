const nodeNames = ["NOVA-01", "NOVA-02", "NOVA-03", "NOVA-04", "EDGE-A1", "EDGE-A2", "CORE-X1", "CORE-X2"];
const statuses = ["ONLINE", "ONLINE", "ONLINE", "ONLINE", "ONLINE", "DEGRADED", "ONLINE", "OFFLINE"] as const;
const eventTypes = [
  "STREAM_CONNECT", "STREAM_DISCONNECT", "HEARTBEAT_RECEIVED",
  "DATA_SYNC_COMPLETE", "PROTOCOL_UPDATE", "ROUTE_OPTIMIZED",
  "NODE_REGISTERED", "ALERT_CLEARED", "CONFIG_APPLIED",
];

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomRate(): string {
  const val = Math.floor(Math.random() * 9500) + 500;
  return val > 1000 ? `${(val / 1000).toFixed(1)} gb/s` : `${val} mb/s`;
}

export function generateDemoStreams(count = 8) {
  return Array.from({ length: count }, (_, i) => ({
    streamId: `STR-${String(i + 1).padStart(3, "0")}`,
    node: pick(nodeNames),
    status: pick(statuses),
    rate: randomRate(),
    rateMbps: Math.floor(Math.random() * 9500) + 500,
  }));
}

export function generateDemoNodes() {
  return nodeNames.map((name, i) => ({
    name,
    status: statuses[i % statuses.length],
    health: Math.floor(Math.random() * 20) + 80,
    ip: `10.0.${Math.floor(i / 4)}.${(i % 4) + 1}`,
    lastHeartbeat: new Date(Date.now() - Math.random() * 5000).toISOString(),
  }));
}

export function generateDemoActivity(count = 20) {
  return Array.from({ length: count }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 45000).toISOString().slice(11, 19),
    node: pick(nodeNames),
    event: pick(eventTypes),
    status: pick(["OK", "OK", "OK", "OK", "WARN", "OK", "ERR"] as const),
  }));
}

export function generateDemoMetrics() {
  const onlineNodes = nodeNames.filter((_, i) => statuses[i % statuses.length] === "ONLINE").length;
  return {
    throughput: "3.2 gb/s",
    throughputRaw: 3200,
    throughputDelta: "+12% vs baseline",
    latency: "14ms",
    latencyRaw: 14,
    latencyDelta: "-3% vs baseline",
    nodesOnline: onlineNodes,
    nodesTotal: nodeNames.length,
    uptime: "24d 7h",
    uptimePercent: 99.9,
  };
}
