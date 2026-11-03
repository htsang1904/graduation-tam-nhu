> Trang `/admin` yêu cầu đăng nhập Google. Cấu hình `ADMIN_EMAIL` trên server thành đúng một email được phép truy cập (ví dụ `your-email@gmail.com`); bỏ trống sẽ chặn tất cả. Không dùng danh sách UID. Bật Google trong Firebase Authentication và thêm domain website vào Authorized domains. API danh sách và xuất CSV đều xác minh token, email đã xác thực và nhà cung cấp Google. Redeploy sau khi đổi biến trên Vercel.

# Graduation Invitation Website — Trần Đắc Tâm Như 🎓

> Website thiệp mời lễ tốt nghiệp đại học thanh lịch, tối giản dành riêng cho **Trần Đắc Tâm Như** (Hàn Quốc học — K21, Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM).  
> Xây dựng theo **Phương án B (Landing Page vintage hoa cẩm tú cầu xanh & nền kem)**.

---

## 🌟 Tính năng chính

### 1. Dành cho khách mời (`/`)
- **Giao diện Responsive Mobile-first:** Tối ưu mượt mà trên mọi thiết bị từ điện thoại (375px+) đến màn hình máy tính lớn.
- **Phong cách hoa xanh vintage:** Tông màu kem ấm (`#F9F3E8`), xanh navy (`#1E3A6D`), hoa cẩm tú cầu xanh nhẹ nhàng.
- **Thông tin sự kiện rõ ràng:** Ngày, giờ và địa điểm tổ chức kèm địa chỉ chi tiết.
- **Lưu vào lịch (`.ics`):** Tải file lịch chuẩn UTC+7 tích hợp ngay vào Apple Calendar, Google Calendar, Outlook chỉ với 1 click.
- **Xem bản đồ:** Mở trực tiếp địa điểm trường trên Google Maps.
- **Xác nhận tham dự (RSVP):** Điền form nhanh gọn, không cần tạo tài khoản hay cung cấp email/sđt.
- **Chống spam & bot:** Bảo vệ bằng rate limiting và honeypot ẩn.

### 2. Dành cho chủ tiệc (`/admin`)
- **Đăng nhập Google an toàn:** Chỉ tài khoản Google có email trùng `ADMIN_EMAIL` mới được xem dữ liệu.
- **Thống kê tức thì:** 
  - Tổng số phản hồi
  - Số khách tham dự (Có / Không)
  - **Tổng số người dự kiến đến** (`Số khách Có` + `Số người đi cùng`)
- **Tìm kiếm & Bộ lọc:** Lọc theo trạng thái Có/Không, tìm kiếm theo tên hoặc lời nhắn.
- **Xuất file CSV chuẩn UTF-8 (BOM):** Mở trực tiếp bằng Excel không bị lỗi font tiếng Việt, có cơ chế chống CSV Formula Injection.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Framework:** Next.js (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS v4, Fonts Google (`Cormorant Garamond`, `Be Vietnam Pro`, `Alex Brush`)
- **Database & Auth:** Firebase Firestore, Firebase Authentication (Google Sign-In)
- **Backend Server:** Firebase Admin SDK (Chạy trên API Routes của Next.js, bảo mật tuyệt đối không lộ client)
- **Validation:** Zod
- **Icons:** Lucide React
- **Deploy:** Vercel

---

## 🚀 Hướng dẫn cài đặt & Chạy cục bộ (Local Development)

### Bước 1: Sao chép file cấu hình môi trường
Tạo file `.env.local` từ mẫu `.env.example`:
```bash
cp .env.example .env.local
```

### Bước 2: Cài đặt thư viện
```bash
npm install
```

### Bước 3: Chạy máy chủ phát triển
```bash
npm run dev
```
Mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Cấu hình Firebase & Biến môi trường

### 1. Tạo Firebase Project
1. Truy cập [Firebase Console](https://console.firebase.google.com/) và tạo project mới (ví dụ: `tam-nhu-graduation`).
2. Vào **Authentication** -> **Sign-in method** -> Bật provider **Google**.
3. Vào **Firestore Database** -> Chọn **Create Database** (chọn vị trí `asia-southeast1` hoặc gần nhất).
4. Áp dụng quy tắc bảo mật từ file `firestore.rules`:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /rsvps/{document=**} {
         allow read, write: if false; // Chặn hoàn toàn client đọc/ghi trực tiếp
       }
     }
   }
   ```

### 2. Lấy Service Account cho Firebase Admin SDK
1. Trong Firebase Console -> **Project Settings** -> **Service accounts**.
2. Chọn **Generate new private key** để tải file `.json`.
3. Điền các trường tương ứng vào `.env.local`:
   ```dotenv
   FIREBASE_PROJECT_ID=...
   FIREBASE_CLIENT_EMAIL=...
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
   ```

### 3. Cấu hình email quản trị
1. Điền đúng một email Google vào biến `ADMIN_EMAIL` trong `.env.local` và trên Vercel.
2. Khởi động lại server hoặc redeploy, rồi đăng nhập tại `/admin/login` bằng email đó.
3. Ví dụ cấu hình:
   ```dotenv
   ADMIN_EMAIL=your-email@gmail.com
   ```

---

## 🌐 Hướng dẫn Triển khai lên Vercel (Deployment)

1. Đẩy mã nguồn lên GitHub.
2. Truy cập [Vercel](https://vercel.com/) và bấm **Add New Project** -> Chọn repository.
3. Thêm đầy đủ các biến môi trường trong phần **Environment Variables** (giống như trong `.env.local`).
4. Bấm **Deploy**.
5. Sau khi deploy thành công, vào **Firebase Console** -> **Authentication** -> **Settings** -> **Authorized domains**, thêm domain của Vercel (ví dụ `tam-nhu-graduation.vercel.app`) để Google Sign-in hoạt động.

---

## 📋 Kiểm thử và Tiêu chí hoàn thành (Checklist)

- [x] Giao diện landing page đúng thiết kế Phương án B: tone kem dịu, hoa cẩm tú cầu xanh, font chữ trang nhã.
- [x] Responsive mượt mà trên mobile (375px), tablet và desktop.
- [x] Nút "Lưu vào lịch" tải về file `.ics` đúng múi giờ Việt Nam (`09:45–12:00, 10/11/2026`).
- [x] Nút "Xem bản đồ" mở đúng địa điểm trường ĐH KHXH&NV cơ sở Linh Xuân.
- [x] Form RSVP validate chặt chẽ (tên 2-80 ký tự, số người đi cùng 0-5, tin nhắn <=500 ký tự).
- [x] Tích hợp honeypot và rate limit chống bot spam.
- [x] Không lưu số người đi cùng nếu khách chọn "Không tham dự".
- [x] Firebase Admin SDK chạy an toàn ở backend, client bị chặn truy cập trực tiếp Firestore.
- [x] Dashboard `/admin` và API chỉ cho phép email Google đã xác thực trùng `ADMIN_EMAIL` truy cập.
- [x] Thống kê chính xác số lượng khách và tổng người dự kiến.
- [x] Xuất file CSV UTF-8 có BOM mở không lỗi tiếng Việt trên Microsoft Excel và chống CSV formula injection.
