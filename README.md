# 🚨 DOTQUY.NHANH

**Website hỗ trợ nhận biết đột quỵ và gọi cấp cứu nhanh chóng**

---

## 📋 Giới thiệu

DOTQUY.NHANH là website tiếng Việt giúp người dân:
- ✅ **Nhận biết dấu hiệu đột quỵ** qua test BE FAST (15 giây)
- 📞 **Gọi cấp cứu 115** chỉ trong 1 chạm
- 📚 **Học cách xử lý khẩn cấp** khi nghi đột quỵ

> **Triết lý:** "Emergency First" - Thiết kế tối giản, tập trung vào hành động cấp cứu nhanh nhất.

---

## 🎯 Tính năng chính

### 1. Test BE FAST (15 giây)
- Wizard 5 bước hướng dẫn kiểm tra dấu hiệu đột quỵ
- Kết quả ngay lập tức
- Hướng dẫn hành động tiếp theo

### 2. Nút gọi cấp cứu 115
- Hiển thị cố định trên mọi trang
- 1 chạm để gọi điện
- Không cần chọn tỉnh/thành phố

### 3. Hướng dẫn sơ cứu
- Checklist **NÊN LÀM** / **KHÔNG LÀM**
- Hướng dẫn rõ ràng, dễ hiểu
- Tối ưu cho tình huống khẩn cấp

### 4. Tạo script gọi cấp cứu
- Form điền thông tin bệnh nhân
- Tự động tạo script nói điện
- Copy 1 chạm

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **Database:** Supabase (optional - không dùng trong version hiện tại)
- **PWA:** next-pwa (offline support)

---

## 🚀 Chạy local

```bash
# Cài đặt dependencies
npm install

# Chạy dev server
npm run dev

# Build production
npm run build
npm start
```

Mở trình duyệt: `http://localhost:3000`

---

## 📁 Cấu trúc dự án

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Trang chủ
│   ├── fast/              # Test BE FAST
│   ├── what-to-do-now/    # Hướng dẫn sơ cứu
│   ├── call-script/       # Tạo script gọi cấp cứu
│   ├── emergency/         # Trang khẩn cấp tối giản
│   └── offline/           # Trang offline (PWA)
├── components/
│   ├── emergency/         # Components cấp cứu
│   ├── fast/              # Components BE FAST wizard
│   ├── layout/            # Header, Footer, BottomNav
│   └── ui/                # Base UI components
└── lib/
    ├── utils/             # Helper functions
    └── types/             # TypeScript types
```

---

## 🎨 Design System

### Colors
- **Emergency Red:** `#dc2626` - Nút cấp cứu, cảnh báo
- **Background:** `#ffffff` (Light) / `#0a0a0a` (Dark)
- **Muted:** `#f5f5f5` (Light) / `#262626` (Dark)

### Typography
- **Font:** Inter (Google Fonts)
- **Base size:** 16px
- **Emergency text:** 20px+ (dễ đọc khi hoảng loạn)

### Accessibility
- ✅ Contrast ratio AAA (7:1)
- ✅ Touch targets ≥ 44px
- ✅ Semantic HTML
- ✅ ARIA labels đầy đủ

---

## 📱 PWA (Progressive Web App)

Website hoạt động offline với:
- Cached routes: `/`, `/fast`, `/what-to-do-now`, `/offline`
- Hardcoded emergency info khi mất mạng
- Hiển thị số 115 và BE FAST checklist

**Cài đặt như app:**
- iOS: Safari → Share → Add to Home Screen
- Android: Chrome → Menu → Install App

---

## 🔒 Bảo mật & Pháp lý

**Disclaimer:**
> Nội dung trên website chỉ mang tính tham khảo, không thay thế chẩn đoán y tế. 
> Nếu nghi ngờ đột quỵ, hãy gọi cấp cứu ngay.

**Không lưu trữ dữ liệu cá nhân:**
- Không có authentication
- Không có database cho user data
- Tất cả data lưu trên localStorage (chỉ local)

---

## 📊 Roadmap (Tương lai)

- [ ] Multi-language (English, 中文)
- [ ] Video hướng dẫn BE FAST
- [ ] Map tìm bệnh viện đột quỵ gần nhất
- [ ] Push notifications cho người nguy cơ cao
- [ ] AI chatbot hỗ trợ

---

## 👥 Đóng góp

Nếu bạn muốn đóng góp:
1. Fork repo
2. Tạo branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add some AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

---

## 📄 License

MIT License - Xem file `LICENSE` để biết thêm chi tiết.

---

## 📞 Liên hệ

**Emergency Hotline (Vietnam):** 115

**Project Repository:** [GitHub - DOTQUY.NHANH](https://github.com/yourusername/dotquy-nhanh)

---

**⚠️ LƯU Ý QUAN TRỌNG:**

Đây là công cụ hỗ trợ, KHÔNG thay thế ý kiến bác sĩ. 
Khi nghi ngờ đột quỵ, hãy GỌI CẤP CỨU NGAY.
