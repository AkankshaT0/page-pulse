const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function auditUrl(url) {
  const response = await fetch(`${API_URL}/api/audit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(data?.error?.message || "Audit failed.");
  }

  return data;
}
