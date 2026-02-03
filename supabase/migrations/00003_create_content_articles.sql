-- =============================================
-- Migration: 00003_create_content_articles
-- Description: Tạo bảng content_articles (bài viết)
-- =============================================

CREATE TABLE IF NOT EXISTS content_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('learn', 'prevention', 'recovery')),
  level INTEGER DEFAULT 1 CHECK (level >= 1 AND level <= 5),
  summary_30s TEXT,
  body_md TEXT,
  faq_md TEXT,
  sources JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_content_articles_slug ON content_articles(slug);
CREATE INDEX IF NOT EXISTS idx_content_articles_category ON content_articles(category);
CREATE INDEX IF NOT EXISTS idx_content_articles_status ON content_articles(status);
CREATE INDEX IF NOT EXISTS idx_content_articles_level ON content_articles(level);

-- Reuse trigger from 00002
DROP TRIGGER IF EXISTS trigger_content_articles_updated_at ON content_articles;
CREATE TRIGGER trigger_content_articles_updated_at
  BEFORE UPDATE ON content_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

COMMENT ON TABLE content_articles IS 'Bài viết về đột quỵ: Học, Phòng ngừa, Hồi phục';
