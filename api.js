async function generateAI(prompt) {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI generation failed");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
