import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  console.log(NextRequest);
  return NextResponse.json({ text: "Hello" });
}
