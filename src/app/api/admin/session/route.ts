import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth-admin";

export async function GET(req: NextRequest) {
  const result = await verifyAdminRequest(req);
  if (!result.isAuthorized) return result.errorResponse!;
  return NextResponse.json({ authorized: true }, {
    headers: { "Cache-Control": "private, no-store" },
  });
}
