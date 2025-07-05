import { useState } from "react";
import { getSummary } from "./ai";

const linkify = (text: string) =>
  text.replace(
    /(https?:\/\/[^\s]+)/g,
    (url) =>
      `<a href="${url}" target="_blank" style="color:blue;word-break:break-word;">${url}</a>`
  );

const Popup = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExtract = () => {
    setLoading(true);
    setContent("");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0].id) return;

      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "extractContent" },
        async (response) => {
          if (chrome.runtime.lastError || !response?.content) {
            setContent("Error: Could not extract content.");
            setLoading(false);
            return;
          }

          const rawText = response.content;
          const trimmed = rawText.replace(/\s+/g, " ").trim().slice(0, 3000);

          const summary = await getSummary(trimmed);
          setContent(summary);
          setLoading(false);
        }
      );
    });
  };

  return (
    <div style={{ padding: "10px", width: "300px", fontFamily: "sans-serif" }}>
      <button onClick={handleExtract} style={{ marginBottom: "10px" }}>
        Extract & Summarize
      </button>

      {loading ? (
        <p>⏳ Summarizing page...</p>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: linkify(content) }}
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        />
      )}
    </div>
  );
};

export default Popup;
