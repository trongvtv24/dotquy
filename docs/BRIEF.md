# 💡 BRIEF: DOTQUY.NHANH - Website Cấp Cứu Đột Quỵ

**Ngày tạo:** 2026-02-02  
**Loại sản phẩm:** Web App (PWA)  
**Tech Stack:** Next.js (App Router) + TypeScript + TailwindCSS + Supabase

---

## 1. VẤN ĐỀ CẦN GIẢI QUYẾT

Khi có người bị đột quỵ, **mỗi phút đều quý giá**. Tuy nhiên, nhiều người:
- Không biết cách nhận biết dấu hiệu đột quỵ (BE FAST)
- Không biết gọi số cấp cứu nào (115 hay số BVĐK địa phương?)
- Không biết nên làm gì và KHÔNG nên làm gì trong lúc chờ cấp cứu
- Không biết "giờ lần cuối bình thường" quan trọng như thế nào

> **Thực tế đau lòng:** Nhiều người chờ "xem sao" → mất thời gian vàng → hậu quả nặng hơn.

---

## 2. GIẢI PHÁP ĐỀ XUẤT

Website tiếng Việt **DOTQUY.NHANH** với triết lý **"Emergency-first"**:

### Core Value Proposition
| Tính năng | Giá trị |
|-----------|---------|
| **1 chạm gọi cấp cứu** | Số BVĐK theo tỉnh hoặc fallback 115 |
| **BE FAST test 15 giây** | Nhận biết đột quỵ nhanh chóng |
| **Checklist DO/DON'T** | Biết ngay làm gì, không làm gì |
| **Lưu "giờ lần cuối bình thường"** | Thông tin quan trọng cho bác sĩ |
| **Call Script** | Biết nói gì khi gọi cấp cứu |
| **PWA Offline** | Vẫn hoạt động khi mất mạng |

### Triết lý thiết kế
- **5 giây là có thể gọi cấp cứu**
- **Mobile-first, accessibility cao** (font lớn, contrast cao, nút 44px+)
- **Không placeholder trong luồng khẩn cấp**
- **Fallback 115 nếu thiếu dữ liệu**

---

## 3. ĐỐI TƯỢNG SỬ DỤNG

### Primary: Người thân bệnh nhân đột quỵ
- Đang hoảng loạn, cần hướng dẫn ngay lập tức
- Cần số điện thoại cấp cứu chính xác
- Cần biết làm gì trong khi chờ

### Secondary: Người muốn học/phòng ngừa
- Tìm hiểu về đột quỵ để phòng ngừa
- Người có nguy cơ cao hoặc người nhà có tiền sử
- Người đang trong giai đoạn hồi phục sau đột quỵ

---

## 4. SITEMAP & ROUTES

### PUBLIC (15 routes)
```
/                      → Home = Emergency-first
/emergency             → Trang khẩn cấp tối giản
/fast                  → BE FAST wizard 6 bước
/what-to-do-now        → DO / DON'T checklist
/call-script           → Form tạo script gọi cấp cứu
/province/[slug]       → Số cấp cứu theo tỉnh
/learn                 → Danh mục Học
/learn/[slug]          → Bài viết Học
/prevention            → Phòng ngừa
/prevention/risk-check → Checklist nguy cơ
/recovery              → Hồi phục
/recovery/30-days      → Roadmap 30 ngày
/resources             → Tải/in tài liệu
/about                 → Giới thiệu + disclaimer
/feedback              → Góp ý/báo số sai
/offline               → Trang offline (hardcoded)
```

### ADMIN (5 routes)
```
/admin/login           → Đăng nhập admin
/admin                 → Dashboard
/admin/emergency-contacts → CRUD danh bạ theo tỉnh
/admin/content         → CRUD bài viết
/admin/feedback        → Xử lý góp ý
```

---

## 5. GLOBAL COMPONENTS

### A) Header (Navigation)
- **Logo:** DOTQUY.NHANH
- **Mobile:** Bottom nav 5 tabs (🚨 Khẩn cấp | 📘 Học | 🛡️ Phòng ngừa | ♿ Hồi phục | 📎 Tài nguyên)
- **Desktop:** Top nav

### B) Floating Call Button (CTA nổi)
| Trạng thái | Text | Subtext |
|------------|------|---------|
| Chưa chọn tỉnh | GỌI CẤP CỨU (115) | - |
| Đã chọn tỉnh, có số BV | GỌI CẤP CỨU | BV: [Tên] – [Số] |
| Không có dữ liệu tỉnh | GỌI CẤP CỨU (115) | Chưa có hotline BV tỉnh |
| Desktop | Hiển thị số + nút Copy | Toast: "Đã copy số cấp cứu" |

### C) Province Selector
- **Label:** Bạn đang ở Tỉnh/TP nào?
- **Placeholder:** Gõ để tìm… (VD: Khánh Hòa)
- **Lưu:** localStorage.selectedProvinceSlug
- **Info:** Nguồn + ngày xác minh (nếu có)
- **Warning:** "Chưa xác minh gần đây – ưu tiên gọi 115 nếu không liên lạc được"

### D) Emergency Banner (khi FAST dương tính)
- **Background:** Đỏ, chữ trắng
- **Title:** NGHI ĐỘT QUỴ
- **Body:** Có dấu hiệu nghi đột quỵ. Gọi cấp cứu ngay.
- **CTA:** GỌI NGAY

### E) Disclaimer Footer
> Nội dung chỉ mang tính tham khảo, không thay thế chẩn đoán. Nếu nghi đột quỵ, gọi cấp cứu ngay.

---

## 6. DATABASE SCHEMA (Supabase)

### Tables
```sql
-- 1) provinces
CREATE TABLE provinces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2) emergency_contacts
CREATE TABLE emergency_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  province_id UUID REFERENCES provinces(id),
  hospital_name TEXT NOT NULL,
  emergency_phone TEXT NOT NULL,
  address TEXT,
  map_url TEXT,
  source_name TEXT,
  source_url TEXT,
  last_verified_at TIMESTAMPTZ,
  status TEXT DEFAULT 'needs_verify', -- active | needs_verify | inactive
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3) content_articles
CREATE TABLE content_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- learn | prevention | recovery
  level INTEGER DEFAULT 1, -- 1..5
  summary_30s TEXT,
  body_md TEXT,
  faq_md TEXT,
  sources JSONB DEFAULT '[]',
  status TEXT DEFAULT 'draft', -- draft | review | published
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4) feedback
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- wrong_number | content | suggestion | other
  province_id UUID REFERENCES provinces(id),
  article_id UUID REFERENCES content_articles(id),
  message TEXT NOT NULL,
  email TEXT,
  status TEXT DEFAULT 'new', -- new | reviewed | resolved
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5) profiles (for admin)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6) analytics_events (optional)
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  province_id UUID REFERENCES provinces(id),
  meta JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### RLS Policies
- **Public (anon):** READ provinces, READ emergency_contacts (status in active/needs_verify), READ content_articles (status=published)
- **Public:** INSERT feedback
- **Admin (is_admin=true):** CRUD all tables

---

## 7. TÍNH NĂNG CHI TIẾT

### 🚀 MVP (Phase 1 - Bắt buộc có)

#### Core Emergency
- [ ] Trang / (Home) với Hero + BE FAST Quick Start + DO/DON'T
- [ ] Trang /emergency (tối giản, chỉ khẩn cấp)
- [ ] Trang /fast (BE FAST Wizard 6 bước)
- [ ] Trang /what-to-do-now (DO/DON'T chi tiết)
- [ ] Trang /call-script (Form + Output copy 1 chạm)
- [ ] Trang /province/[slug] (Số cấp cứu theo tỉnh)

#### Global Components
- [ ] FloatingCallButton (với fallback 115)
- [ ] ProvinceSelector (dropdown + search + localStorage)
- [ ] TimeRecorder (Lưu giờ lần cuối bình thường)
- [ ] EmergencyBanner (khi FAST dương tính)
- [ ] DisclaimerFooter

#### Admin MVP
- [ ] /admin/login (Supabase Auth)
- [ ] /admin/emergency-contacts (CRUD danh bạ)
- [ ] Admin guard (is_admin check)

#### PWA Offline
- [ ] Service Worker cache routes khẩn cấp
- [ ] Trang /offline (hardcoded 115 + BE FAST + DO/DON'T)

### 🎁 Phase 2 (Làm sau)
- [ ] /learn + /learn/[slug] (CMS bài viết)
- [ ] /prevention + /prevention/risk-check
- [ ] /recovery + /recovery/30-days
- [ ] /resources (Tải/in PDF)
- [ ] /about + /feedback
- [ ] /admin/content (CRUD bài viết)
- [ ] /admin/feedback (Xử lý góp ý)
- [ ] Analytics events tracking

### 💭 Backlog (Cân nhắc)
- [ ] Push notifications
- [ ] Multi-language (i18n)
- [ ] AI chatbot hỗ trợ
- [ ] Map integration (chỉ đường đến BV)

---

## 8. UI WIREFRAMES (TEXT)

### Trang / (Home)

```
┌─────────────────────────────────────┐
│ [Logo: DOTQUY.NHANH]                │
├─────────────────────────────────────┤
│         🚨 NGHI ĐỘT QUỴ?            │
│         GỌI CẤP CỨU NGAY            │
│                                     │
│   Đừng chờ "xem sao".               │
│   Mỗi phút trì hoãn đều quan trọng. │
│                                     │
│   [███ GỌI CẤP CỨU ███]             │
│   [Bắt đầu BE FAST (15 giây)]       │
├─────────────────────────────────────┤
│ 📍 Bạn đang ở Tỉnh/TP nào?          │
│ [Gõ để tìm... (VD: Khánh Hòa)    ▼] │
├─────────────────────────────────────┤
│ ⚡ BE FAST test (15 giây)           │
│ Chỉ cần 1 câu "Có" → gọi ngay       │
│            [BẮT ĐẦU]                │
├─────────────────────────────────────┤
│ ┌─────────┐  ┌─────────────────┐    │
│ │ LÀM NGAY│  │ KHÔNG LÀM       │    │
│ │ ✅ Gọi  │  │ ⛔ Không ăn/uống│    │
│ │ ✅ Ghi  │  │ ⛔ Không dùng   │    │
│ │    giờ  │  │    thuốc        │    │
│ └─────────┘  └─────────────────┘    │
├─────────────────────────────────────┤
│ [Lưu GIỜ LẦN CUỐI BÌNH THƯỜNG]      │
│ [Nói gì khi gọi cấp cứu →]          │
│ [Tôi nên làm gì trong lúc chờ? →]   │
├─────────────────────────────────────┤
│ ⚠️ Nội dung chỉ tham khảo...        │
└─────────────────────────────────────┘
│🚨 Khẩn│📘 Học│🛡️ Phòng│♿ Phục│📎 TN│
└─────────────────────────────────────┘
[═══ GỌI CẤP CỨU ═══] ← Floating CTA
```

### Trang /fast (BE FAST Wizard)

```
Step 0 - Intro:
┌─────────────────────────────────────┐
│         BE FAST (15 giây)           │
│                                     │
│   Chỉ cần 1 dấu hiệu →              │
│   gọi cấp cứu ngay.                 │
│                                     │
│          [BẮT ĐẦU]                  │
└─────────────────────────────────────┘

Step 1-5 (Balance, Eyes, Face, Arm, Speech):
┌─────────────────────────────────────┐
│            B - Balance              │
│                                     │
│   Đột ngột chóng mặt /              │
│   mất thăng bằng /                  │
│   đi loạng choạng?                  │
│                                     │
│   [═══ CÓ ═══]  [═══ KHÔNG ═══]     │
│                                     │
│   ℹ️ Triệu chứng xảy ra đột ngột,   │
│      khác thường.                   │
└─────────────────────────────────────┘

Step 6 - Result (nếu có CÓ):
┌─────────────────────────────────────┐
│ ████████████████████████████████████│
│ █    🚨 NGHI ĐỘT QUỴ              █│
│ █       GỌI NGAY                  █│
│ ████████████████████████████████████│
│                                     │
│   [███ GỌI CẤP CỨU ███]             │
│                                     │
│   [Lưu GIỜ LẦN CUỐI BÌNH THƯỜNG]    │
│                                     │
│   ▼ LÀM NGAY / KHÔNG LÀM            │
│   ▼ Tạo script gọi cấp cứu          │
└─────────────────────────────────────┘
```

---

## 9. SEED DATA

### Provinces (3 mẫu)
| slug | name |
|------|------|
| ha-noi | Hà Nội |
| khanh-hoa | Khánh Hòa |
| quang-ninh | Quảng Ninh |

### Emergency Contacts (3 mẫu - status: needs_verify)
> **Lưu ý:** Đây là dữ liệu placeholder. Cần xác minh số thật trước khi chuyển status=active.

### Content Articles (8 bài - đã cung cấp)
- 3 bài Level 1 (Learn)
- 3 bài Level 2 (Learn)
- 2 bài Level 3 (Learn)

---

## 10. ENV VARIABLES

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (server only)
```

---

## 11. ƯỚC TÍNH SƠ BỘ

| Hạng mục | Độ phức tạp | Thời gian ước tính |
|----------|-------------|-------------------|
| Setup project + DB | Đơn giản | 2-3 giờ |
| Global components | Trung bình | 4-5 giờ |
| Core pages (MVP) | Trung bình | 8-10 giờ |
| Admin CRUD | Trung bình | 4-5 giờ |
| PWA Offline | Trung bình | 3-4 giờ |
| Testing + Polish | Trung bình | 4-5 giờ |
| **TỔNG MVP** | | **~25-30 giờ** |

---

## 12. RỦI RO CẦN LƯU Ý

| Rủi ro | Giải pháp |
|--------|-----------|
| Số cấp cứu không chính xác | Luôn fallback 115 + status needs_verify |
| Nội dung y tế sai | Disclaimer rõ ràng + nguồn tham khảo |
| Offline không hoạt động | Hardcode 115 + nội dung tối thiểu |
| Pháp lý y tế | Disclaimer không thay thế chẩn đoán |

---

## 13. BƯỚC TIẾP THEO

**Đã sẵn sàng để chạy `/plan` và tạo:**
1. Migration SQL + RLS policies + seed script
2. Cấu trúc thư mục dự án (App Router)
3. Task list chi tiết cho từng component
4. Hướng dẫn chạy local + deploy

---

> **Ghi chú:** Brief này tổng hợp từ cuộc brainstorm ngày 2026-02-02. Spec và wireframes đã được user cung cấp chi tiết, sẵn sàng cho giai đoạn planning.
