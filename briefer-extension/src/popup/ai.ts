export const getSummary = async (text: string): Promise<string> => {
  const apiKey = "AIzaSyDnNYVexIczOPR2NaP89KbYx0lUyqci-kY"; // Replace with yours

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
      apiKey,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Summarize this webpage and extract useful links.If its a news portal focus on data about the headlines:\n\n${text}`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await res.json();
  console.log("Gemini API response:", data);

  const textOutput =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available.";

  return textOutput;
};
