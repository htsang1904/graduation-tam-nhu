import { NextRequest, NextResponse } from "next/server";
import { initFirebaseAdmin } from "./firebase-admin";

export interface AdminAuthResult {
  isAuthorized: boolean;
  uid?: string;
  email?: string;
  errorResponse?: NextResponse;
}

const DEFAULT_ADMIN_IDENTIFIERS = [
  "zgexpfm0fahaqis89sywvcatn543",
  "trandactamnhu@gmail.com",
];

export async function verifyAdminRequest(req: NextRequest): Promise<AdminAuthResult> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      isAuthorized: false,
      errorResponse: NextResponse.json(
        { error: "Yêu cầu đăng nhập (Thiếu Bearer Token)." },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.split("Bearer ")[1]?.trim();
  if (!token) {
    return {
      isAuthorized: false,
      errorResponse: NextResponse.json(
        { error: "Token không hợp lệ." },
        { status: 401 }
      ),
    };
  }

  const { auth } = initFirebaseAdmin();
  if (!auth) {
    return {
      isAuthorized: false,
      errorResponse: NextResponse.json(
        { error: "Hệ thống máy chủ chưa cấu hình Firebase Admin." },
        { status: 500 }
      ),
    };
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const envAdmins = (process.env.ADMIN_UIDS || "")
      .split(",")
      .map((uid) => uid.trim().toLowerCase())
      .filter(Boolean);

    const allAdmins = [...DEFAULT_ADMIN_IDENTIFIERS, ...envAdmins];

    const userUid = (decodedToken.uid || "").trim().toLowerCase();
    const userEmail = (decodedToken.email || "").trim().toLowerCase();

    const isMatch = allAdmins.some(
      (admin) => admin === userUid || (userEmail && admin === userEmail)
    );

    if (!isMatch) {
      return {
        isAuthorized: false,
        errorResponse: NextResponse.json(
          { error: "Bạn không có quyền truy cập trang quản trị." },
          { status: 403 }
        ),
      };
    }

    return {
      isAuthorized: true,
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
  } catch (error) {
    console.error("Token verification failed:", error);
    return {
      isAuthorized: false,
      errorResponse: NextResponse.json(
        { error: "Phiên đăng nhập hết hạn hoặc không hợp lệ." },
        { status: 401 }
      ),
    };
  }
}
