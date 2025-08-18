// app/api/incorrect-sentences/route.ts
import { NextRequest, NextResponse } from "next/server";

let sentencesDB = [
  { id: 1, text: "Би сургууль рүү явлаа.", wrongWord: "рүү", score: 0 },
  { id: 2, text: "Тэр нөм уншиж байна.", wrongWord: "нөм", score: 0 },
  // ... нэмэлт өгүүлбэрүүд
];

export async function GET() {
  const random = sentencesDB[Math.floor(Math.random() * sentencesDB.length)];
  return NextResponse.json({ success: true, sentence: random });
}

export async function POST(req: NextRequest) {
  const { id, correct } = await req.json();
  const sentence = sentencesDB.find((s) => s.id === id);
  if (!sentence) return NextResponse.json({ success: false }, { status: 404 });
  if (correct) sentence.score += 1;
  return NextResponse.json({ success: true, score: sentence.score });
}
