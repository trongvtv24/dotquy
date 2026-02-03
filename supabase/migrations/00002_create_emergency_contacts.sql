-- =============================================
-- Migration: 00002_create_emergency_contacts
-- Description: Tạo bảng emergency_contacts (số cấp cứu theo tỉnh)
-- =============================================

CREATE TABLE IF NOT EXISTS emergency_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  province_id UUID NOT NULL REFERENCES provinces(id) ON DELETE CASCADE,
  hospital_name TEXT NOT NULL,
  emergency_phone TEXT NOT NULL,
  address TEXT,
  map_url TEXT,
  source_name TEXT,
  source_url TEXT,
  last_verified_at TIMESTAMPTZ,
  status TEXT DEFAULT 'needs_verify' CHECK (status IN ('active', 'needs_verify', 'inactive')),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_emergency_contacts_province ON emergency_contacts(province_id);
CREATE INDEX IF NOT EXISTS idx_emergency_contacts_status ON emergency_contacts(status);

-- Trigger for auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_emergency_contacts_updated_at ON emergency_contacts;
CREATE TRIGGER trigger_emergency_contacts_updated_at
  BEFORE UPDATE ON emergency_contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

COMMENT ON TABLE emergency_contacts IS 'Số cấp cứu BVĐK theo tỉnh. Fallback 115 nếu không có hoặc status != active';
