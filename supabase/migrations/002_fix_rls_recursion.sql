-- =====================================================
-- Fix RLS Infinite Recursion Issue
-- =====================================================
-- This migration fixes the infinite recursion in users_profile RLS policies
-- Run this in Supabase SQL Editor AFTER running 001_initial_schema.sql

-- =====================================================
-- STEP 1: Drop existing problematic policies
-- =====================================================

DROP POLICY IF EXISTS "Admins have full access to users_profile" ON users_profile;
DROP POLICY IF EXISTS "Users can update own profile" ON users_profile;
DROP POLICY IF EXISTS "Admins can read all form submissions" ON form_submissions;
DROP POLICY IF EXISTS "Admins can update form submissions" ON form_submissions;
DROP POLICY IF EXISTS "Admins can delete form submissions" ON form_submissions;
DROP POLICY IF EXISTS "Admins have full access to employees" ON employees;
DROP POLICY IF EXISTS "Admins have full access to services" ON services;
DROP POLICY IF EXISTS "Admins have full access to page_content" ON page_content;
DROP POLICY IF EXISTS "Admins have full access to site_settings" ON site_settings;

-- =====================================================
-- STEP 2: Create helper function to check admin role
-- =====================================================

-- This function uses SECURITY DEFINER to bypass RLS when checking role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM users_profile
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

-- =====================================================
-- STEP 3: Recreate policies using the helper function
-- =====================================================

-- =====================================================
-- users_profile policies
-- =====================================================

-- Users can update their own profile (but not change role)
CREATE POLICY "Users can update own profile"
  ON users_profile FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND 
    role = (SELECT role FROM users_profile WHERE id = auth.uid())
  );

-- Admins can do everything with users_profile
CREATE POLICY "Admins have full access to users_profile"
  ON users_profile FOR ALL
  USING (is_admin());

-- =====================================================
-- form_submissions policies
-- =====================================================

-- Admins can read all submissions
CREATE POLICY "Admins can read all form submissions"
  ON form_submissions FOR SELECT
  USING (is_admin());

-- Admins can update submissions
CREATE POLICY "Admins can update form submissions"
  ON form_submissions FOR UPDATE
  USING (is_admin());

-- Admins can delete submissions
CREATE POLICY "Admins can delete form submissions"
  ON form_submissions FOR DELETE
  USING (is_admin());

-- =====================================================
-- employees policies
-- =====================================================

-- Admins can do everything with employees
CREATE POLICY "Admins have full access to employees"
  ON employees FOR ALL
  USING (is_admin());

-- =====================================================
-- services policies
-- =====================================================

-- Admins can do everything with services
CREATE POLICY "Admins have full access to services"
  ON services FOR ALL
  USING (is_admin());

-- =====================================================
-- page_content policies
-- =====================================================

-- Admins can do everything with page content
CREATE POLICY "Admins have full access to page_content"
  ON page_content FOR ALL
  USING (is_admin());

-- =====================================================
-- site_settings policies
-- =====================================================

-- Admins can do everything with site settings
CREATE POLICY "Admins have full access to site_settings"
  ON site_settings FOR ALL
  USING (is_admin());

-- =====================================================
-- VERIFICATION
-- =====================================================

-- You can verify the fix by running:
-- SELECT is_admin(); -- Should return true if you're logged in as admin
-- SELECT * FROM employees; -- Should work without recursion error
