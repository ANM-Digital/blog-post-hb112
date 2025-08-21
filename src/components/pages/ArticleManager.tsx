"use client";

import React, { useState } from "react";
import { addDataToFirestore, getOriginalTextFromChunks } from "../../../lib/firebase/firestore";

function splitTextIntoChunks(text: string, maxLength = 3000): string[] {
  const sentences = text.match(/[^.!?]+[.!?]?(\s|$)/g) || [];
  const chunks: string[] = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length <= maxLength) {
      currentChunk += sentence;
    } else {
      if (currentChunk) chunks.push(currentChunk.trim());

      // If single sentence longer than maxLength, force split it
      if (sentence.length > maxLength) {
        let start = 0;
        while (start < sentence.length) {
          chunks.push(sentence.slice(start, start + maxLength).trim());
          start += maxLength;
        }
        currentChunk = "";
      } else {
        currentChunk = sentence;
      }
    }
  }
  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
}

export default function ArticleManager() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      setStatus("Splitting text into chunks...");
      const chunks = splitTextIntoChunks(text, 3000);

      setStatus("Saving chunks to Firestore...");
      for (let i = 0; i < chunks.length; i++) {
        await addDataToFirestore("articles", {
          partNumber: i + 1,
          content: chunks[i],
          createdAt: new Date().toISOString(),
        });
      }
      setStatus("✅ Upload complete!");
      setText("");
    } catch (error) {
      console.error(error);
      setStatus("❌ Upload failed.");
    }
  };

  const handleRecall = async () => {
    try {
      setStatus("Fetching original text...");
      const originalText = await getOriginalTextFromChunks("articles");
      setText(originalText);
      setStatus("✅ Original text loaded");
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to fetch original text");
    }
  };

  return (
    <div>
      <h2>Article Manager</h2>
      <p>Paste your article below. It will be split into sentence-based chunks and saved in Firestore.</p>

      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Paste your full article here (up to ~10,000 characters)..."
        rows={15}
        style={{
          width: "100%",
          resize: "vertical",
          fontFamily: "monospace",
          fontSize: "14px",
        }}
      />

      <div
        style={{
          marginTop: "5px",
          fontSize: "12px",
          color: text.length > 10000 ? "red" : "gray",
        }}
      >
        Character count: {text.length} / 10000
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleSubmit} style={{ marginRight: "10px" }}>
          Submit
        </button>
        <button onClick={handleRecall}>Recall Original Text</button>
      </div>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </div>
  );
}
