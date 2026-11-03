import { NextRequest, NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/validators";
import { checkRateLimit } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  try {
    const { initFirebaseAdmin } = await import("@/lib/firebase-admin");
    const res = initFirebaseAdmin();
    return NextResponse.json({
      status: "diagnostic_ok",
      hasFirestore: !!res.firestore,
      hasAuth: !!res.auth,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? { message: err.message, stack: err.stack } : { message: String(err) };
    return NextResponse.json({
      status: "diagnostic_error",
      error,
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const rateCheck = await checkRateLimit(ip, 5, 60);

    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút!" },
        { status: 429 }
      );
    }

    // 2. Parse body
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Dữ liệu yêu cầu không hợp lệ." },
        { status: 400 }
      );
    }

    // 3. Honeypot check
    if (body.website_hp && String(body.website_hp).trim().length > 0) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    // 4. Validate
    const validation = rsvpSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || "Dữ liệu không hợp lệ.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { guestName, attendance, companions, message } = validation.data;

    // 5. Save to Firestore via Firebase Admin
    const { initFirebaseAdmin } = await import("@/lib/firebase-admin");
    const { firestore } = initFirebaseAdmin();

    if (!firestore) {
      throw new Error("Không thể khởi tạo kết nối cơ sở dữ liệu Firestore.");
    }

    await firestore.collection("rsvps").add({
      guestName,
      attendance,
      companions,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau ít phút!";
    console.error("Error processing RSVP submission:", error);
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}
