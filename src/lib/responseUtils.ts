export async function safeParseJSON(response: Response) {
  try {
    const text = await response.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch (err) {
    return null;
  }
}

export async function safeJsonOrThrow(response: Response) {
  const data = await safeParseJSON(response);
  if (response.ok) return data;
  const message = data && (data.message || data.error || data.msg);
  throw new Error(message || `Request failed (${response.status})`);
}
