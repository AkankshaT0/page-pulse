import dns from "node:dns/promises";
import net from "node:net";

function isPrivateIp(ip) {
  if (net.isIP(ip) === 4) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 10 ||
      a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a === 0
    );
  }

  if (net.isIP(ip) === 6) {
    const value = ip.toLowerCase();
    return value === "::1" || value.startsWith("fc") || value.startsWith("fd") ||
      value.startsWith("fe80:");
  }

  return false;
}

export async function validatePublicHttpUrl(value) {
  let parsed;

  try {
    parsed = new URL(String(value));
  } catch {
    const error = new Error("Please provide a valid HTTP or HTTPS URL.");
    error.code = "INVALID_URL";
    throw error;
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    const error = new Error("Only HTTP and HTTPS URLs are supported.");
    error.code = "INVALID_URL";
    throw error;
  }

  if (parsed.username || parsed.password) {
    const error = new Error("URLs containing credentials are not allowed.");
    error.code = "UNSAFE_URL";
    throw error;
  }

  if (parsed.hostname === "localhost" || parsed.hostname.endsWith(".local")) {
    const error = new Error("Local or private network URLs are not allowed.");
    error.code = "UNSAFE_URL";
    throw error;
  }

  try {
    const addresses = await dns.lookup(parsed.hostname, { all: true });
    if (addresses.some(({ address }) => isPrivateIp(address))) {
      const error = new Error("Local or private network URLs are not allowed.");
      error.code = "UNSAFE_URL";
      throw error;
    }
  } catch (error) {
    if (error.code === "UNSAFE_URL") throw error;
    const invalid = new Error("The hostname could not be resolved.");
    invalid.code = "INVALID_URL";
    throw invalid;
  }

  return parsed.toString();
}
