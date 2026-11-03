"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase-client";
import { Lock, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        if (active) setCheckingAuth(false);
        return;
      }
      if (active) { setLoading(true); setCheckingAuth(true); }
      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/admin/session", {
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!active || auth.currentUser?.uid !== user.uid) return;
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) await signOut(auth);
          throw new Error(res.status === 403
            ? "Gmail này không được phép truy cập trang quản trị. Vui lòng chọn tài khoản khác."
            : data.error || "Không thể kiểm tra quyền đăng nhập. Vui lòng thử lại.");
        }
        router.replace("/admin");
      } catch (err: unknown) {
        if (active) {
          setError(err instanceof Error ? err.message : "Không thể kiểm tra quyền đăng nhập.");
          setCheckingAuth(false);
        }
      } finally {
        if (active) setLoading(false);
      }
    });
    return () => { active = false; unsubscribe(); };
  }, [router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!auth.app.options.apiKey) {
        throw new Error(
          "Chưa cấu hình Firebase Client. Vui lòng thêm NEXT_PUBLIC_FIREBASE_* vào .env.local!"
        );
      }

      await signInWithPopup(auth, googleProvider);
      // The auth listener verifies server authorization before navigation.
    } catch (err: unknown) {
      console.error("Sign-in failed:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đăng nhập thất bại. Vui lòng thử lại!");
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F3E8]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1E3A6D]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F3E8] px-4 py-12">
      <div className="max-w-md w-full bg-[#FFFDF9] border border-[#E7DFD4] rounded-[24px] p-8 shadow-vintage text-center">
        {/* Lock Icon */}
        <div className="w-14 h-14 rounded-full bg-[#1E3A6D]/10 text-[#1E3A6D] flex items-center justify-center mx-auto mb-5">
          <Lock className="w-7 h-7 stroke-[1.8]" />
        </div>

        <h1 className="font-serif text-2xl font-bold text-[#1E3A6D] mb-2">
          Đăng Nhập Quản Trị
        </h1>
        <p className="text-sm text-[#657083] font-light mb-6">
          Khu vực quản lý danh sách phản hồi thiệp mời tốt nghiệp dành riêng cho chủ tiệc.
        </p>

        {error && (
          <div className="p-3.5 mb-6 rounded-[12px] bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full border border-[#E7DFD4] bg-white text-[#26354B] font-medium text-sm shadow-sm hover:bg-gray-50 hover:shadow transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#1E3A6D]" />
              <span>Đang kết nối Google...</span>
            </>
          ) : (
            <>
              {/* Google G Logo SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Đăng nhập với Google</span>
            </>
          )}
        </button>

        <div className="mt-8 pt-6 border-t border-[#E7DFD4]/60">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#657083] hover:text-[#1E3A6D] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại trang thiệp mời</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
