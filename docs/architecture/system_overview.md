# System Overview - DOTQUY.NHANH

## 1. High-Level Architecture (v0.2.0 - Simplified)

DOTQUY.NHANH là một ứng dụng web dạng **Static/PWA (Client-Side Focus)**, tập trung tối đa vào tốc độ và khả năng truy cập trong tình huống khẩn cấp.

### Key Changes in v0.2.0:
- **No Database:** Loại bỏ hoàn toàn phụ thuộc vào Database cho tính năng chính.
- **Client-Side Logic:** Tất cả logic (BE FAST, Call Script) chạy trên client.
- **Hardcoded Emergency:** Số 115 được hardcode, không load động để tránh delay.
- **No Admin/Auth:** Loại bỏ tính năng quản trị và đăng nhập.

## 2. Technology Stack

- **Frontend Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **State Management:** React `useState` / `useEffect` + LocalStorage
- **PWA:** `next-pwa` (service worker, offline fallback)
- **Deployment:** Vercel (recommended) / Static Hosting

## 3. Core Modules

### A. Emergency Module
- **Floating Call Button:** Hiển thị số 115 cố định.
- **Emergency Banner:** Cảnh báo và hướng dẫn nhanh.

### B. BE FAST Module (`/fast`)
- **Wizard:** Quy trình 5 bước kiểm tra dấu hiệu đột quỵ.
- **Result:** Đánh giá dựa trên lựa chọn user (Client-side logic).

### C. Guidance Module
- **Call Script (`/call-script`):** Form điền thông tin -> Tạo kịch bản nói.
- **What To Do (`/what-to-do-now`):** Checklist DO/DON'T tĩnh.

## 4. Data Flow (Simplified)

1.  **Emergency Call:** User Click -> `tel:115` (Direct OS Call)
2.  **BE FAST Test:** User Input -> React State -> Result Display
3.  **Offline Access:** Service Worker -> Cached Static Pages

## 5. Security & Privacy

- **No User Data:** Không thu thập, không lưu trữ thông tin cá nhân server-side.
- **Client Storage:** Dữ liệu tạm (nếu có) chỉ lưu trên browser (LocalStorage/SessionStorage).
