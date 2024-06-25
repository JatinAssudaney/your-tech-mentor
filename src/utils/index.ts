export async function sendMessage(prompt: string) {
  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
      }),
    });
    const data = await response.json();
    return data.text;
  } catch (error) {
    throw error;
  }
}
