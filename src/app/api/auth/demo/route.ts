import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Demo authentication is disabled" }, { status: 404 });
}
