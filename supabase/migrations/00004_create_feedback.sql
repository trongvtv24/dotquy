-- =============================================
-- Migration: 00004_create_feedback
-- Description: Tạo bảng feedback (góp ý từ người dùng)
-- =============================================

CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('wrong_number', 'content', 'suggestion', 'other')),
  province_id UUID REFERENCES provinces(id) ON DELETE SET NULL,
  article_id UUID REFERENCES content_articles(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  email TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_type ON feedback(type);

COMMENT ON TABLE feedback IS 'Góp ý từ người dùng: báo số sai, góp ý nội dung...';
