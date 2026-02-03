-- =============================================
-- Migration: 00001_create_provinces
-- Description: Tạo bảng provinces (63 tỉnh/TP Việt Nam)
-- =============================================

CREATE TABLE IF NOT EXISTS provinces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index cho lookup nhanh theo slug
CREATE INDEX IF NOT EXISTS idx_provinces_slug ON provinces(slug);

COMMENT ON TABLE provinces IS 'Danh sách 63 tỉnh/thành phố Việt Nam';
