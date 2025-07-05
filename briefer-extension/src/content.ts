// src/content.ts
console.log("[GenAI Extension] Content script loaded");

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action === "extractContent") {
    const content = document.body.innerText;
    sendResponse({ content });
  }
});
