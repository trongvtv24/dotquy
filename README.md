# DOTQUY.NHANH 🚨

Website hỗ trợ nhận biết và phản ứng nhanh với đột quỵ. Emergency-first design với PWA offline support.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e)

---

## 🎯 Features

### 🚨 Emergency-First Design
- **Gọi 115 trong 1 tap** - Nút cấp cứu luôn hiển thị
- **BE FAST Checker** - Test triệu chứng đột quỵ trong 15 giây
- **Province-based contacts** - Số cấp cứu theo tỉnh/thành phố
- **Call script generator** - Hướng dẫn gọi 115 chi tiết
- **Time recorder** - Ghi lại "giờ lần cuối bình thường"

### 📴 PWA Offline Support
- **Offline page** - Thông tin cấp cứu hardcoded, luôn khả dụng
- **Service Worker** - Cache essential pages
- **Install to home screen** - Truy cập nhanh như native app

### 👨‍💼 Admin Panel
- **Dashboard** - Thống kê số cấp cứu, feedback
- **CRUD Emergency Contacts** - Quản lý số cấp cứu theo tỉnh
- **Search & Filter** - Tìm kiếm theo tên, tỉnh, trạng thái
- **Quick Actions** - Verify, Deactivate, Delete

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account (free tier)

### Installation

```bash
# Clone repository
git clone <repo-url>
cd dotquy-nhanh

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local với Supabase credentials
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Database Setup

```bash
# Link to Supabase project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# Seed data (63 tỉnh/thành phố VN)
supabase db seed
```

### Development

```bash
# Run dev server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Production build
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
dotquy-nhanh/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/          # Public pages
│   │   ├── admin/             # Admin panel
│   │   ├── offline/           # PWA offline page
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── ui/                # UI components
│   │   ├── layout/            # Layout components
│   │   ├── emergency/         # Emergency components
│   │   └── admin/             # Admin components
│   ├── lib/
│   │   ├── supabase/          # Supabase clients
│   │   ├── utils/             # Utilities
│   │   └── types/             # TypeScript types
│   └── styles/                # Global styles
├── public/
│   ├── icons/                 # PWA icons
│   ├── manifest.json          # PWA manifest
│   └── robots.txt             # SEO
├── supabase/
│   ├── migrations/            # Database migrations
│   └── seed.sql               # Seed data
└── .brain/                    # Project knowledge
    ├── brain.json             # Static knowledge
    ├── session.json           # Dynamic session
    └── handover.md            # Handover doc
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** TailwindCSS 4
- **Database:** PostgreSQL (Supabase)
- **Auth:** Supabase Auth
- **PWA:** next-pwa
- **Deployment:** Vercel (recommended)

---

## 📊 Database Schema

### Tables
- `provinces` - 63 tỉnh/thành phố VN
- `emergency_contacts` - Số cấp cứu theo tỉnh
- `content_articles` - Bài viết về đột quỵ
- `feedback` - Góp ý từ người dùng
- `profiles` - User profiles với admin flag
- `analytics_events` - Event tracking (optional)

---

## 🔐 Admin Access

### Create Admin User

```sql
-- In Supabase SQL Editor
INSERT INTO profiles (id, email, is_admin)
VALUES (
  'user-uuid-from-auth-users',
  'admin@example.com',
  true
);
```

### Login
- Navigate to `/admin/login`
- Enter email + password
- Admin dashboard at `/admin`

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Environment Variables (Vercel)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## 📝 Development Notes

### Type Assertions
Database types chưa được generated, hiện đang dùng type assertions:
- `(supabase as any)` cho insert/update operations
- `profile as { is_admin: boolean }` cho admin checks

**Fix:** Generate types sau khi setup Supabase:
```bash
supabase gen types typescript --local > src/lib/types/supabase.ts
```

### PWA Icons
Hiện đang dùng SVG placeholder. Cần generate PNG icons:
- 192x192px
- 512x512px

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [next-pwa](https://github.com/shadowwalker/next-pwa)

---

## 📞 Support

Nếu gặp vấn đề, vui lòng tạo issue trên GitHub hoặc liên hệ qua email.

**Emergency:** Nếu bạn hoặc người thân có dấu hiệu đột quỵ, hãy GỌI 115 NGAY!
