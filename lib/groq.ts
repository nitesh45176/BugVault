import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function generateAIResponse(prompt: string) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant", // ✅ Updated model
    messages: [
      {
        role: "system",
        content: "You are a senior software engineer.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content ?? "";
}
