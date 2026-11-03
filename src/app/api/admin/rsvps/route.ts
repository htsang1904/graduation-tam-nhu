import { verifyAdminRequest } from "@/lib/auth-admin";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { RSVPDocument, RSVPStats } from "@/types/rsvp";

export async function GET(req: NextRequest) {
  const authCheck = await verifyAdminRequest(req);
  if (!authCheck.isAuthorized) return authCheck.errorResponse!;
  try {
    // 2. Fetch from Firestore via Admin SDK
    const { initFirebaseAdmin } = await import("@/lib/firebase-admin");
    const { firestore } = initFirebaseAdmin();
    if (!firestore) {
      return NextResponse.json(
        { error: "Firebase Admin chưa được cấu hình trên máy chủ." },
        { status: 500 }
      );
    }

    const snapshot = await firestore
      .collection("rsvps")
      .orderBy("createdAt", "desc")
      .get();

    const rsvps: RSVPDocument[] = [];
    let yesCount = 0;
    let noCount = 0;
    let totalAttendees = 0;

    snapshot.forEach((doc: QueryDocumentSnapshot) => {
      const data = doc.data();
      const attendance = data.attendance === "yes" ? "yes" : "no";
      const companions = Number(data.companions) || 0;

      if (attendance === "yes") {
        yesCount += 1;
        totalAttendees += 1 + companions;
      } else {
        noCount += 1;
      }

      // Convert timestamp
      let createdAtStr = "";
      if (data.createdAt?.toDate) {
        createdAtStr = data.createdAt.toDate().toISOString();
      } else if (typeof data.createdAt === "string") {
        createdAtStr = data.createdAt;
      }

      rsvps.push({
        id: doc.id,
        guestName: data.guestName || "",
        attendance,
        companions: attendance === "yes" ? companions : 0,
        message: data.message || "",
        createdAt: createdAtStr,
      });
    });

    const stats: RSVPStats = {
      total: rsvps.length,
      yesCount,
      noCount,
      totalAttendees,
    };

    return NextResponse.json(
      { rsvps, stats },
      {
        headers: {
          "Cache-Control": "private, no-store",
        },
      }
    );
  } catch (error: unknown) {
    console.error("Error fetching RSVPs for admin:", error);
    const msg = error instanceof Error ? error.message : "Không thể lấy danh sách phản hồi từ cơ sở dữ liệu.";
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}
