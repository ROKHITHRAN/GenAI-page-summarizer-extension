export const getSummary = async (text: string): Promise<string> => {
  const apiKey = "AIzaSyDnNYVexIczOPR2NaP89KbYx0lUyqci-kY";

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
                text: `Summarize this webpage concentrate only on the content based on main headline's contents,don't mention details about the website and extract useful links.:\n\n${text}`,
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
