-- =====================================================
-- NMTSA Website Database Schema
-- =====================================================
-- This migration creates all necessary tables, RLS policies, and storage buckets
-- Run this script in your Supabase SQL Editor

-- =====================================================
-- 1. EXTENSIONS
-- =====================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 2. CUSTOM TYPES
-- =====================================================

-- User roles
CREATE TYPE user_role AS ENUM ('admin', 'volunteer', 'user');

-- Form submission types
CREATE TYPE form_type AS ENUM (
  'contact',
  'volunteer',
  'consultation',
  'internship',
  'employment',
  'music_lessons',
  'service_request',
  'donation',
  'corporate_sponsorship'
);

-- Service categories
CREATE TYPE service_category AS ENUM ('training', 'support', 'resources', 'advocacy');

-- =====================================================
-- 3. TABLES
-- =====================================================

-- Users Profile Table (extends auth.users)
CREATE TABLE IF NOT EXISTS users_profile (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on role for filtering
CREATE INDEX idx_users_profile_role ON users_profile(role);

-- Form Submissions Table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_type form_type NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  metadata JSONB, -- For storing flexible form-specific data
  status TEXT DEFAULT 'pending', -- pending, reviewed, resolved
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for filtering and searching
CREATE INDEX idx_form_submissions_type ON form_submissions(form_type);
CREATE INDEX idx_form_submissions_status ON form_submissions(status);
CREATE INDEX idx_form_submissions_created_at ON form_submissions(created_at DESC);

-- Employees Table
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  order_position INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for ordering and filtering
CREATE INDEX idx_employees_active_order ON employees(is_active, order_position);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category service_category NOT NULL,
  image_url TEXT,
  order_position INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for filtering and ordering
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_active_order ON services(is_active, order_position);

-- Page Content Table (Flexible CMS)
CREATE TABLE IF NOT EXISTS page_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_key TEXT NOT NULL UNIQUE, -- e.g., 'homepage_hero', 'about_mission'
  title TEXT,
  content TEXT,
  metadata JSONB, -- For storing structured data like images, links, etc.
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on page_key for quick lookups
CREATE INDEX idx_page_content_key ON page_content(page_key);
CREATE INDEX idx_page_content_active ON page_content(is_active);

-- Site Settings Table (Key-Value Store)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key TEXT NOT NULL UNIQUE, -- e.g., 'paypal_url', 'shopify_url'
  setting_value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on setting_key for quick lookups
CREATE INDEX idx_site_settings_key ON site_settings(setting_key);

-- =====================================================
-- 4. TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_profile_updated_at
  BEFORE UPDATE ON users_profile
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_form_submissions_updated_at
  BEFORE UPDATE ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_content_updated_at
  BEFORE UPDATE ON page_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS Policies: users_profile
-- =====================================================

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON users_profile FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile (except role)
CREATE POLICY "Users can update own profile"
  ON users_profile FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM users_profile WHERE id = auth.uid()));

-- Admins can do everything
CREATE POLICY "Admins have full access to users_profile"
  ON users_profile FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- RLS Policies: form_submissions
-- =====================================================

-- Anyone can insert form submissions (public forms)
CREATE POLICY "Anyone can submit forms"
  ON form_submissions FOR INSERT
  WITH CHECK (true);

-- Admins can read all submissions
CREATE POLICY "Admins can read all form submissions"
  ON form_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update submissions
CREATE POLICY "Admins can update form submissions"
  ON form_submissions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can delete submissions
CREATE POLICY "Admins can delete form submissions"
  ON form_submissions FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- RLS Policies: employees
-- =====================================================

-- Public can read active employees
CREATE POLICY "Public can read active employees"
  ON employees FOR SELECT
  USING (is_active = true);

-- Admins can do everything with employees
CREATE POLICY "Admins have full access to employees"
  ON employees FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- RLS Policies: services
-- =====================================================

-- Public can read active services
CREATE POLICY "Public can read active services"
  ON services FOR SELECT
  USING (is_active = true);

-- Admins can do everything with services
CREATE POLICY "Admins have full access to services"
  ON services FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- RLS Policies: page_content
-- =====================================================

-- Public can read active page content
CREATE POLICY "Public can read active page content"
  ON page_content FOR SELECT
  USING (is_active = true);

-- Admins can do everything with page content
CREATE POLICY "Admins have full access to page_content"
  ON page_content FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- RLS Policies: site_settings
-- =====================================================

-- Public can read site settings
CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  USING (true);

-- Admins can do everything with site settings
CREATE POLICY "Admins have full access to site_settings"
  ON site_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- 6. STORAGE BUCKETS
-- =====================================================

-- Note: Storage buckets need to be created via Supabase Dashboard or API
-- After running this script, create the following buckets in Supabase Dashboard:
-- 1. 'employee-photos' (public)
-- 2. 'service-images' (public)

-- Then run these policies (replace 'your-bucket-name' with actual bucket names)

-- =====================================================
-- Storage Policies: employee-photos
-- =====================================================

-- Public can view employee photos
-- CREATE POLICY "Public can view employee photos"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'employee-photos');

-- Admins can upload employee photos
-- CREATE POLICY "Admins can upload employee photos"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'employee-photos' AND
--     EXISTS (
--       SELECT 1 FROM users_profile
--       WHERE id = auth.uid() AND role = 'admin'
--     )
--   );

-- Admins can update employee photos
-- CREATE POLICY "Admins can update employee photos"
--   ON storage.objects FOR UPDATE
--   USING (
--     bucket_id = 'employee-photos' AND
--     EXISTS (
--       SELECT 1 FROM users_profile
--       WHERE id = auth.uid() AND role = 'admin'
--     )
--   );

-- Admins can delete employee photos
-- CREATE POLICY "Admins can delete employee photos"
--   ON storage.objects FOR DELETE
--   USING (
--     bucket_id = 'employee-photos' AND
--     EXISTS (
--       SELECT 1 FROM users_profile
--       WHERE id = auth.uid() AND role = 'admin'
--     )
--   );

-- =====================================================
-- Storage Policies: service-images
-- =====================================================

-- Public can view service images
-- CREATE POLICY "Public can view service images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'service-images');

-- Admins can upload service images
-- CREATE POLICY "Admins can upload service images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'service-images' AND
--     EXISTS (
--       SELECT 1 FROM users_profile
--       WHERE id = auth.uid() AND role = 'admin'
--     )
--   );

-- Admins can update service images
-- CREATE POLICY "Admins can update service images"
--   ON storage.objects FOR UPDATE
--   USING (
--     bucket_id = 'service-images' AND
--     EXISTS (
--       SELECT 1 FROM users_profile
--       WHERE id = auth.uid() AND role = 'admin'
--     )
--   );

-- Admins can delete service images
-- CREATE POLICY "Admins can delete service images"
--   ON storage.objects FOR DELETE
--   USING (
--     bucket_id = 'service-images' AND
--     EXISTS (
--       SELECT 1 FROM users_profile
--       WHERE id = auth.uid() AND role = 'admin'
--     )
--   );

-- =====================================================
-- 7. SEED DATA (Optional)
-- =====================================================

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value, description) VALUES
  ('paypal_donation_url', 'https://www.paypal.com/donate', 'PayPal donation button URL'),
  ('shopify_store_url', 'https://your-store.myshopify.com', 'Shopify store URL'),
  ('contact_email', 'info@nmtsa.org', 'Primary contact email'),
  ('contact_phone', '(555) 123-4567', 'Primary contact phone'),
  ('facebook_url', 'https://facebook.com/nmtsa', 'Facebook page URL'),
  ('twitter_url', 'https://twitter.com/nmtsa', 'Twitter profile URL'),
  ('instagram_url', 'https://instagram.com/nmtsa', 'Instagram profile URL')
ON CONFLICT (setting_key) DO NOTHING;

-- Insert default page content
INSERT INTO page_content (page_key, title, content, is_active) VALUES
  ('homepage_hero_title', 'Welcome to NMTSA', 'Empowering individuals with disabilities through technology', true),
  ('homepage_hero_subtitle', 'Our Mission', 'Providing assistive technology training and support services', true),
  ('about_mission', 'Our Mission', 'To empower individuals with disabilities through comprehensive assistive technology services and advocacy.', true),
  ('about_vision', 'Our Vision', 'A world where technology barriers are eliminated for people with disabilities.', true)
ON CONFLICT (page_key) DO NOTHING;

-- =====================================================
-- 8. FUNCTIONS (Optional utility functions)
-- =====================================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users_profile
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- Next steps:
-- 1. Create storage buckets in Supabase Dashboard
-- 2. Uncomment and run storage policies after creating buckets
-- 3. Generate TypeScript types: npx supabase gen types typescript --local > src/lib/supabase/database.types.ts
