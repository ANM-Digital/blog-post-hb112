import { addDataToFirestore } from "../firebase/firestore";

export const splitTextAndSave = async (
  fullText: string,
  collectionName: string
) => {
  const response = await fetch("/api/route_gpt3.5", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      task: "splitText",
      input: fullText,
    }),
  });

  const { chunks } = await response.json();

  if (!Array.isArray(chunks)) throw new Error("Invalid OpenAI split response");

  for (let i = 0; i < chunks.length; i++) {
    await addDataToFirestore(collectionName, {
      content: chunks[i],
      partNumber: i,
    });
  }

  console.log(`✅ ${chunks.length} parts saved to Firestore`);
};
