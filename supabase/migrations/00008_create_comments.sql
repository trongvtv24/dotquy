-- =============================================
-- Migration: 00008_create_comments
-- Description: Tạo bảng comments cho hệ thống bình luận kinh nghiệm
-- =============================================

CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_slug TEXT NOT NULL,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    is_approved BOOLEAN DEFAULT true
);

-- Bật Row Level Security cho bảng comments
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Chính sách 1: Ai cũng có thể xem các bình luận đã được duyệt (Anonymous Access)
CREATE POLICY "Cho phép tất cả mọi người xem bình luận đã duyệt"
ON comments FOR SELECT
USING (is_approved = true);

-- Chính sách 2: Ai cũng có thể đăng bình luận mới (Anonymous Insert)
CREATE POLICY "Cho phép mọi người đăng bình luận"
ON comments FOR INSERT
WITH CHECK (true);

-- Index để tối ưu việc tìm kiếm bình luận theo bài viết
CREATE INDEX idx_comments_post_slug ON comments(post_slug);

COMMENT ON TABLE comments IS 'Lưu trữ bình luận của độc giả cho các bài viết kinh nghiệm';
