# DOTQUY.NHANH - Changelog

Tất cả thay đổi quan trọng của dự án sẽ được ghi lại ở đây.

---

## [0.2.1] - 2026-02-05

### 🧹 Deep Clean - Code Audit & Cleanup

**Removed (Dead Code):**
- ❌ `src/lib/supabase/` - Toàn bộ Supabase client/server/admin code
- ❌ `src/lib/types/database.ts` - Database types không còn dùng
- ❌ `src/lib/hooks/` - Empty folder
- ❌ `src/components/emergency/ProvinceSelector.tsx` - Province selector
- ❌ `src/components/emergency/TimeRecorder.tsx` - Time recorder
- ❌ `src/components/layout/Footer.tsx` - Unused footer

**Simplified:**
- 🔧 `src/lib/utils/storage.ts` - Chỉ giữ FAST answers functions
- 🔧 `src/lib/utils/time.ts` - Xóa getRecordedTime
- 🔧 `src/lib/utils/phone.ts` - Đơn giản hóa, chỉ giữ buildTelLink

**Fixed:**
- 🐛 Header overlay issue - Added backdrop-blur
- 🐛 BottomNav covering content - Added safe-area-inset
- 🐛 Main content padding - Increased to pb-32

**UI Improvements:**
- ✨ Added call 115 button in what-to-do-now page
- ✨ Cleaner responsive design tested (320px → 1920px)

**Audit Results:**
- 🔴 Critical: 0
- 🟡 Warnings: 4 → 0 (all fixed)
- 🟢 Suggestions: 3

---

## [0.2.0] - 2026-02-04

### 🎯 Scope Simplified - Emergency Focus Only

**BREAKING CHANGES:**
- ❌ Removed province/local emergency number feature
- ❌ Removed admin authentication and management
- ❌ Removed TimeRecorder component
- ❌ Removed Supabase database dependencies

**✨ New Features:**
- ✅ Hardcoded 115 emergency number (nationwide)
- ✅ Simplified FloatingCallButton (no database calls)
- ✅ Updated navigation (Home, BE FAST, What to do)

**📝 What's kept:**
- ✅ BE FAST Test wizard (5 steps)
- ✅ DO/DON'T emergency guidelines
- ✅ Call script generator
- ✅ PWA offline support

**🎨 UI Improvements:**
- Cleaner homepage layout
- Better mobile navigation
- Removed complex forms

---

## [2026-02-03] - MVP Complete 🎉

### Added - Phase 01: Setup
- ✨ Next.js 16 project với TypeScript + TailwindCSS 4
- ✨ Supabase client setup (client + server)
- ✨ Database migrations: 6 tables (provinces, emergency_contacts, content_articles, feedback, profiles, analytics_events)
- ✨ Seed data: 63 tỉnh/thành phố Việt Nam

### Added - Phase 02: Components
- ✨ UI Components: Button, Input, Card, Badge, Toast, Skeleton
- ✨ Layout Components: Header, BottomNav, Footer, DisclaimerFooter
- ✨ Emergency Components: FloatingCallButton, ProvinceSelector, TimeRecorder, EmergencyBanner, DoDoNotList
- ✨ FastWizard component (5-step BE FAST symptom checker)

### Added - Phase 03: Pages
- ✨ Homepage (/) - Emergency-first design
- ✨ /emergency - Emergency information page
- ✨ /fast - BE FAST symptom checker wizard
- ✨ /what-to-do-now - What to do guide
- ✨ /call-script - Call script generator
- ✨ /province/[slug] - Province-specific emergency contacts

### Added - Phase 04: Admin Panel
- ✨ AdminGuard component - Client-side authentication guard
- ✨ /admin/login - Email/password authentication
- ✨ /admin - Dashboard với statistics cards
- ✨ /admin/emergency-contacts - CRUD interface
  - List view với search, filter (status, province)
  - Add new contact form
  - Edit contact form
  - Quick actions: Verify, Deactivate, Delete

### Added - Phase 05: PWA
- ✨ next-pwa configuration với Turbopack compatibility
- ✨ PWA manifest.json (icons, theme, shortcuts)
- ✨ /offline page với hardcoded emergency info
- ✨ Service worker với offline fallback
- ✨ Type declarations cho next-pwa

### Added - Phase 06: Polish
- ✨ Custom 404 page (not-found.tsx)
- ✨ Custom error boundary (error.tsx)
- ✨ Loading states (Skeleton components)
- ✨ SEO: robots.txt, dynamic sitemap.ts

### Technical Decisions
- 🔧 Custom components thay vì UI library (smaller bundle)
- 🔧 Supabase BaaS cho auth + database
- 🔧 Type assertions cho Supabase queries (workaround until types generated)
- 🔧 Empty turbopack config để tương thích với next-pwa
- 🔧 Hardcoded offline page (no network dependency)

### Fixed
- 🐛 TypeScript errors với Supabase types - added type assertions
- 🐛 Turbopack vs Webpack conflict - added empty turbopack config
- 🐛 next-pwa build errors - configured properly for Next.js 16

---

## Next Steps

### Before Deploy:
- [ ] Setup Supabase project
- [ ] Run `supabase db push`
- [ ] Generate types: `supabase gen types typescript`
- [ ] Generate PNG icons từ SVG
- [ ] Update manifest.json với production domain

### Future Enhancements (Post-MVP):
- [ ] Content articles CRUD trong admin
- [ ] Feedback management trong admin
- [ ] Analytics dashboard
- [ ] Multi-language support (English)
- [ ] Dark mode
- [ ] Push notifications cho PWA
