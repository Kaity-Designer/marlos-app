import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Marlos, a warm, intelligent, and adaptive AI tutor designed for students aged 10-15.
Your personality is: calm, encouraging, curious, and never condescending.

Key principles:
- Explain things clearly, using analogies and examples that resonate with young learners
- Break complex ideas into digestible chunks
- Celebrate effort and curiosity, not just correct answers
- Adapt your tone to the learner's apparent level
- If asked to quiz, create engaging questions with clear explanations
- If asked to explain visually, use ASCII diagrams, bullet structures, or step-by-step breakdowns
- Never make the learner feel dumb — reframe mistakes as learning moments
- Keep responses focused and not too long — this is a conversation, not a lecture
- Use simple emojis occasionally to make things feel warmer (not excessive)

Current learning mode: {mode}`;

export async function POST(req: NextRequest) {
  try {
    const { messages, mode = "text" } = await req.json();

    // Try Anthropic first
    if (process.env.ANTHROPIC_API_KEY) {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-haiku-20241022",
          max_tokens: 800,
          system: SYSTEM_PROMPT.replace("{mode}", mode),
          messages: messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({
          content: data.content[0].text,
          model: "claude-3-5-haiku",
        });
      }
    }

    // Try OpenAI fallback
    if (process.env.OPENAI_API_KEY) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          max_tokens: 800,
          messages: [
            { role: "system", content: SYSTEM_PROMPT.replace("{mode}", mode) },
            ...messages,
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({
          content: data.choices[0].message.content,
          model: "gpt-4o-mini",
        });
      }
    }

    // Demo fallback (no API key needed for prototype)
    const fallbacks: Record<string, string> = {
      text: "Great question! Let me break this down for you step by step. The key thing to understand here is that every complex idea has a simpler core — we just need to find it together. What part would you like me to focus on first?",
      visual: "🎨 Here's a visual breakdown:\n\n**Core idea** → **Key parts** → **How they connect**\n\nThink of it like building blocks — each piece supports the next. Want me to draw out any specific part in more detail?",
      audio: "So let me explain this as if we were just chatting. Imagine you're describing this to a friend who's never heard of it before. You'd start with the most important piece — and build from there. Here's how I'd explain it...",
      quiz: "🧠 Let's test what you know! Here's a question for you:\n\n**In your own words**, can you describe what you're trying to learn about? There's no wrong answer — I'll help you refine it from there.",
    };

    return NextResponse.json({
      content: fallbacks[mode] || fallbacks.text,
      model: "demo",
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
