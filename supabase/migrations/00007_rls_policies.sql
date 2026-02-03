-- =============================================
-- Migration: 00007_rls_policies
-- Description: Row Level Security policies cho tất cả bảng
-- =============================================

-- Enable RLS trên tất cả tables
ALTER TABLE provinces ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- =============================================
-- Helper function: Check if current user is admin
-- =============================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- PROVINCES POLICIES
-- =============================================
-- Public có thể đọc tất cả provinces
DROP POLICY IF EXISTS "Public can read provinces" ON provinces;
CREATE POLICY "Public can read provinces"
  ON provinces FOR SELECT
  TO anon, authenticated
  USING (true);

-- Chỉ admin mới có thể quản lý
DROP POLICY IF EXISTS "Admin can manage provinces" ON provinces;
CREATE POLICY "Admin can manage provinces"
  ON provinces FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- =============================================
-- EMERGENCY_CONTACTS POLICIES  
-- =============================================
-- Public có thể đọc contacts active/needs_verify
DROP POLICY IF EXISTS "Public can read visible contacts" ON emergency_contacts;
CREATE POLICY "Public can read visible contacts"
  ON emergency_contacts FOR SELECT
  TO anon, authenticated
  USING (status IN ('active', 'needs_verify'));

-- Admin có thể quản lý tất cả
DROP POLICY IF EXISTS "Admin can manage contacts" ON emergency_contacts;
CREATE POLICY "Admin can manage contacts"
  ON emergency_contacts FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- =============================================
-- CONTENT_ARTICLES POLICIES
-- =============================================
-- Public chỉ đọc được bài published
DROP POLICY IF EXISTS "Public can read published articles" ON content_articles;
CREATE POLICY "Public can read published articles"
  ON content_articles FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Admin đọc được tất cả
DROP POLICY IF EXISTS "Admin can read all articles" ON content_articles;
CREATE POLICY "Admin can read all articles"
  ON content_articles FOR SELECT
  TO authenticated
  USING (is_admin());

-- Admin quản lý bài viết
DROP POLICY IF EXISTS "Admin can manage articles" ON content_articles;
CREATE POLICY "Admin can manage articles"
  ON content_articles FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin can update articles" ON content_articles;
CREATE POLICY "Admin can update articles"
  ON content_articles FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin can delete articles" ON content_articles;
CREATE POLICY "Admin can delete articles"
  ON content_articles FOR DELETE
  TO authenticated
  USING (is_admin());

-- =============================================
-- FEEDBACK POLICIES
-- =============================================
-- Ai cũng có thể gửi feedback
DROP POLICY IF EXISTS "Anyone can submit feedback" ON feedback;
CREATE POLICY "Anyone can submit feedback"
  ON feedback FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Chỉ admin đọc/quản lý feedback
DROP POLICY IF EXISTS "Admin can manage feedback" ON feedback;
CREATE POLICY "Admin can manage feedback"
  ON feedback FOR SELECT
  TO authenticated
  USING (is_admin());

DROP POLICY IF EXISTS "Admin can update feedback" ON feedback;
CREATE POLICY "Admin can update feedback"
  ON feedback FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- =============================================
-- PROFILES POLICIES
-- =============================================
-- User đọc được profile của mình
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Admin đọc được tất cả profiles
DROP POLICY IF EXISTS "Admin can read all profiles" ON profiles;
CREATE POLICY "Admin can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (is_admin());

-- Admin có thể update profiles (để set is_admin)
DROP POLICY IF EXISTS "Admin can update profiles" ON profiles;
CREATE POLICY "Admin can update profiles"
  ON profiles FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- =============================================
-- ANALYTICS_EVENTS POLICIES
-- =============================================
-- Ai cũng có thể log events (anonymous tracking)
DROP POLICY IF EXISTS "Anyone can log events" ON analytics_events;
CREATE POLICY "Anyone can log events"
  ON analytics_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Chỉ admin đọc được events
DROP POLICY IF EXISTS "Admin can read events" ON analytics_events;
CREATE POLICY "Admin can read events"
  ON analytics_events FOR SELECT
  TO authenticated
  USING (is_admin());
