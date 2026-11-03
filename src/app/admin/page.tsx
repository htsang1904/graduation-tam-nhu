"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { RSVPDocument, RSVPStats } from "@/types/rsvp";
import {
  Users,
  CheckCircle,
  XCircle,
  UserCheck,
  Search,
  Download,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [rsvps, setRsvps] = useState<RSVPDocument[]>([]);
  const [stats, setStats] = useState<RSVPStats>({
    total: 0,
    yesCount: 0,
    noCount: 0,
    totalAttendees: 0,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "yes" | "no">("all");
  const [exporting, setExporting] = useState(false);

  const fetchRsvps = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/rsvps", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Không thể tải danh sách phản hồi.");
      }
      setErrorMessage(null);
      setRsvps(data.rsvps);
      setStats(data.stats);
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : "Lỗi kết nối máy chủ.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => { void fetchRsvps(); }, 0);
    return () => window.clearTimeout(timer);
  }, [fetchRsvps]);

  const handleExportCsv = () => {
    if (rsvps.length === 0) return;
    setExporting(true);

    try {
      const sanitizeForCsv = (val: unknown): string => {
        if (val === undefined || val === null) return '""';
        let str = String(val);
        if (/^[=+\-@]/.test(str)) {
          str = "'" + str;
        }
        return `"${str.replace(/"/g, '""')}"`;
      };

      const rows: string[] = [
        ["STT", "Họ và tên", "Tham dự", "Số người đi cùng", "Lời nhắn", "Thời gian gửi"]
          .map(sanitizeForCsv)
          .join(","),
      ];

      rsvps.forEach((item, idx) => {
        const attendance = item.attendance === "yes" ? "Có" : "Không";
        const dateFormatted = item.createdAt
          ? new Date(item.createdAt).toLocaleString("vi-VN", {
              timeZone: "Asia/Ho_Chi_Minh",
            })
          : "";

        rows.push(
          [
            idx + 1,
            item.guestName,
            attendance,
            item.companions,
            item.message,
            dateFormatted,
          ]
            .map(sanitizeForCsv)
            .join(",")
        );
      });

      const bom = "\uFEFF";
      const blob = new Blob([bom + rows.join("\r\n")], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "danh-sach-rsvp-tam-nhu.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Xuất file thất bại.");
    } finally {
      setExporting(false);
    }
  };

  // Filtered list
  const filteredRsvps = useMemo(() => {
    return rsvps.filter((item) => {
      const matchSearch =
        item.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        statusFilter === "all" ? true : item.attendance === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [rsvps, searchQuery, statusFilter]);

  if (loading && !rsvps.length && !errorMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F3E8]">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#1E3A6D] mx-auto" />
          <p className="text-sm text-[#657083]">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F3E8] text-[#26354B] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Navbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DFD4]">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-full hover:bg-[#E7DFD4]/60 text-[#1E3A6D] transition-colors"
              title="Về trang thiệp mời"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-serif text-2xl font-bold text-[#1E3A6D]">
                Quản Trị Khách Mời Tốt Nghiệp
              </h1>
              <p className="text-xs text-[#657083]">
                Danh sách xác nhận tham dự
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setLoading(true); void fetchRsvps(); }}
              className="p-2.5 rounded-full border border-[#E7DFD4] bg-white text-[#1E3A6D] hover:bg-gray-50 transition-colors"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleExportCsv}
              disabled={exporting || rsvps.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1E3A6D] hover:bg-[#14284B] text-white text-xs sm:text-sm font-medium shadow-sm transition-all disabled:opacity-50"
            >
              {exporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>Xuất CSV</span>
            </button>

          </div>
        </div>

        {/* Error / Unauthorized Alert */}
        {errorMessage && (
          <div className="p-4 rounded-[16px] bg-rose-50 border border-rose-200 text-rose-800 text-sm space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>

          </div>
        )}

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card: Total RSVPs */}
          <div className="bg-[#FFFDF9] border border-[#E7DFD4] rounded-[18px] p-5 shadow-vintage">
            <div className="flex items-center justify-between text-[#657083] mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Tổng phản hồi</span>
              <Users className="w-4 h-4 text-[#1E3A6D]" />
            </div>
            <p className="font-serif text-3xl font-bold text-[#1E3A6D]">{stats.total}</p>
          </div>

          {/* Card: Yes */}
          <div className="bg-[#FFFDF9] border border-[#E7DFD4] rounded-[18px] p-5 shadow-vintage">
            <div className="flex items-center justify-between text-[#657083] mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Có tham dự</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-serif text-3xl font-bold text-emerald-700">{stats.yesCount}</p>
          </div>

          {/* Card: No */}
          <div className="bg-[#FFFDF9] border border-[#E7DFD4] rounded-[18px] p-5 shadow-vintage">
            <div className="flex items-center justify-between text-[#657083] mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Không tham dự</span>
              <XCircle className="w-4 h-4 text-gray-500" />
            </div>
            <p className="font-serif text-3xl font-bold text-gray-600">{stats.noCount}</p>
          </div>

          {/* Card: Total Attendees (Guests + Companions) */}
          <div className="bg-[#FFFDF9] border border-[#B6C9F2] rounded-[18px] p-5 shadow-vintage bg-gradient-to-br from-[#FFFDF9] to-[#EBF2FC]/50">
            <div className="flex items-center justify-between text-[#1E3A6D] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Tổng người dự kiến</span>
              <UserCheck className="w-4 h-4 text-[#1E3A6D]" />
            </div>
            <p className="font-serif text-3xl font-bold text-[#1E3A6D]">{stats.totalAttendees}</p>
            <span className="text-[11px] text-[#657083]">Khách Có + Người đi cùng</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#FFFDF9] border border-[#E7DFD4] rounded-[18px] p-4 shadow-vintage flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#657083] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc lời nhắn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-[#F9F3E8] border border-[#E7DFD4] text-[#26354B] placeholder:text-[#657083]/60 focus:bg-white"
            />
          </div>

          {/* Status Filter buttons */}
          <div className="flex items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                statusFilter === "all"
                  ? "bg-[#1E3A6D] text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-[#26354B]"
              }`}
            >
              Tất cả ({rsvps.length})
            </button>
            <button
              onClick={() => setStatusFilter("yes")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                statusFilter === "yes"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-[#26354B]"
              }`}
            >
              Có ({stats.yesCount})
            </button>
            <button
              onClick={() => setStatusFilter("no")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                statusFilter === "no"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-[#26354B]"
              }`}
            >
              Không ({stats.noCount})
            </button>
          </div>
        </div>

        {/* Responses Table / List */}
        <div className="bg-[#FFFDF9] border border-[#E7DFD4] rounded-[18px] shadow-vintage overflow-hidden">
          {filteredRsvps.length === 0 ? (
            <div className="py-12 text-center text-[#657083] text-sm">
              {searchQuery || statusFilter !== "all"
                ? "Không tìm thấy phản hồi phù hợp bộ lọc."
                : "Chưa có phản hồi nào được ghi nhận."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F9F3E8] text-[#1E3A6D] font-medium border-b border-[#E7DFD4]">
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">STT</th>
                    <th className="py-3 px-4">Khách mời</th>
                    <th className="py-3 px-4 w-32">Tham dự</th>
                    <th className="py-3 px-4 w-28 text-center">Đi cùng</th>
                    <th className="py-3 px-4">Lời nhắn</th>
                    <th className="py-3 px-4 w-40 text-right">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7DFD4]/60">
                  {filteredRsvps.map((rsvp, idx) => (
                    <tr key={rsvp.id || idx} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-3.5 px-4 text-center text-xs text-[#657083]">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#1E3A6D]">
                        {rsvp.guestName}
                      </td>
                      <td className="py-3.5 px-4">
                        {rsvp.attendance === "yes" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            Có tham dự
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            Không tham dự
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center text-xs font-medium text-[#26354B]">
                        {rsvp.attendance === "yes" ? `+${rsvp.companions}` : "—"}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-[#657083] max-w-xs truncate">
                        {rsvp.message || <span className="italic text-gray-400">Không có</span>}
                      </td>
                      <td className="py-3.5 px-4 text-right text-xs text-[#657083] whitespace-nowrap">
                        {rsvp.createdAt
                          ? new Date(rsvp.createdAt).toLocaleString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "2-digit",
                            })
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
