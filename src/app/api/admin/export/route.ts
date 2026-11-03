import { verifyAdminRequest } from "@/lib/auth-admin";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { initFirebaseAdmin } from "@/lib/firebase-admin";

function sanitizeForCsv(value: string | number | undefined): string {
  if (value === undefined || value === null) return '""';
  let str = String(value);

  // Prevent CSV Formula Injection: neutralize leading '=', '+', '-', '@'
  if (/^[=+\-@]/.test(str)) {
    str = "'" + str;
  }

  // Escape inner double quotes
  str = str.replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET(req: NextRequest) {
  const authCheck = await verifyAdminRequest(req);
  if (!authCheck.isAuthorized) return authCheck.errorResponse!;
  // 2. Fetch from Firestore via Admin SDK
  const { firestore } = initFirebaseAdmin();
  if (!firestore) {
    return NextResponse.json(
      { error: "Firebase Admin chưa được cấu hình." },
      { status: 500 }
    );
  }

  try {
    const snapshot = await firestore
      .collection("rsvps")
      .orderBy("createdAt", "desc")
      .get();

    // CSV Header with BOM (\uFEFF) for Excel Vietnamese encoding
    const csvRows: string[] = [
      ["STT", "Họ và tên", "Tham dự", "Số người đi cùng", "Lời nhắn", "Thời gian gửi"]
        .map(sanitizeForCsv)
        .join(","),
    ];

    let index = 1;
    snapshot.forEach((doc: QueryDocumentSnapshot) => {
      const data = doc.data();
      const attendance = data.attendance === "yes" ? "Có" : "Không";
      const companions = data.attendance === "yes" ? (data.companions || 0) : 0;
      let dateFormatted = "";

      if (data.createdAt?.toDate) {
        dateFormatted = data.createdAt.toDate().toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        });
      }

      csvRows.push(
        [
          index++,
          data.guestName || "",
          attendance,
          companions,
          data.message || "",
          dateFormatted,
        ]
          .map(sanitizeForCsv)
          .join(",")
      );
    });

    const bom = "\uFEFF";
    const csvContent = bom + csvRows.join("\r\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="danh-sach-rsvp-tam-nhu.csv"',
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("Error exporting CSV:", error);
    return NextResponse.json(
      { error: "Không thể xuất file CSV." },
      { status: 500 }
    );
  }
}
