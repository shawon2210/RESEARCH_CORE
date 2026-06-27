export function validateSession(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [username, timestamp] = decoded.split(":");
    const AUTH_USERNAME = process.env.AUTH_USERNAME || "admin";
    if (username !== AUTH_USERNAME) return false;
    const age = Date.now() - parseInt(timestamp);
    if (isNaN(age) || age > 24 * 60 * 60 * 1000) return false;
    return true;
  } catch {
    return false;
  }
}
