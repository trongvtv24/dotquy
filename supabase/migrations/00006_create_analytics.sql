-- =============================================
-- Migration: 00006_create_analytics
-- Description: Tạo bảng analytics_events (tracking ẩn danh)
-- =============================================

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  province_id UUID REFERENCES provinces(id) ON DELETE SET NULL,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at);

COMMENT ON TABLE analytics_events IS 'Event tracking ẩn danh: call_click, fast_start, fast_positive...';
