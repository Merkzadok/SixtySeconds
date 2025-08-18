import { NextRequest, NextResponse } from "next/server";

// Симуляцийн хадгалалт (жинхэнэ DB биш)
// Жишээ зориулалттай
let sentencesDB = [
  { id: 1, text: "Монгол Улс нь төв Азийн зүрхэн цэг...", readCount: 0 },
  { id: 2, text: "Улаанбаатар нь хүн амын төвлөрөл ихтэй...", readCount: 0 },
];

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const sentence = sentencesDB.find((s) => s.id === id);
  if (sentence) {
    sentence.readCount += 1;
    return NextResponse.json({ success: true, readCount: sentence.readCount });
  }
  return NextResponse.json(
    { success: false, message: "Not found" },
    { status: 404 }
  );
}

export async function GET() {
  // Next өгүүлбэр авах API endpoint
  const nextSentence = sentencesDB.shift();
  if (nextSentence) {
    return NextResponse.json({ success: true, sentence: nextSentence });
  }
  return NextResponse.json(
    { success: false, message: "No more sentences" },
    { status: 404 }
  );
}
