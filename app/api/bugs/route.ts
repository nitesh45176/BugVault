import { auth } from "@/lib/auth";
import { generateAIResponse } from "@/lib/groq";
import { generateLocalEmbedding } from "@/lib/embeddings";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      title,
      errorMessage,
      context,
      rootCause,
      solution,
      projectId,
      screenshotUrl,
      entryType
    } = await req.json();

    const entryTypeValue = entryType || "BUG";

    // 🔐 Verify project ownership
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: session.user.id,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // 🐞 Create bug first
    const bug = await prisma.bug.create({
      data: {
        title,
        errorMessage,
        context,
        rootCause,
        solution,
        projectId,
        screenshotUrl,
        entryType: entryTypeValue
      },
    });

    // ===============================
    // 🧠 1️⃣ Generate AI Explanation
    // ===============================

    let aiExplanation = "";
    let aiInterviewQuestion = "";

   if(entryTypeValue == "BUG"){
      try {
      const aiText = await generateAIResponse(`
Here is a software bug:

Title: ${title}

Error Message:
${errorMessage}

Context:
${context}

Root Cause:
${rootCause}

Solution:
${solution}

1. Explain this bug clearly in simple terms.
2. Generate one interview-style question based on this bug.

Return in this format:

Explanation:
...

Interview Question:
...
`);

      const explanationMatch = aiText.match(
        /Explanation:\s*([\s\S]*?)Interview Question:/
      );

      const questionMatch = aiText.match(
        /Interview Question:\s*([\s\S]*)/
      );

      aiExplanation = explanationMatch?.[1]?.trim() || "";
      aiInterviewQuestion = questionMatch?.[1]?.trim() || "";

    } catch (error) {
      console.error("AI generation failed:", error);
    }

   }

  

    await prisma.bug.update({
      where: { id: bug.id },
      data: {
        aiExplanation,
        aiInterviewQuestion,
      },
    });

    const updatedBug = await prisma.bug.findUnique({
      where: { id: bug.id },
    });

    return NextResponse.json(updatedBug);

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
