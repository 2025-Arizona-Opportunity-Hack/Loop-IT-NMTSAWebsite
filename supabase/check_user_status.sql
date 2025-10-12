-- =====================================================
-- Check User Status
-- =====================================================
-- Run this to check if a user exists and their role

-- Check if user exists in auth
SELECT 
  id,
  email,
  created_at,
  confirmed_at
FROM auth.users
WHERE email = 'test1@test.com';

-- Check if user has profile and role
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM users_profile
WHERE email = 'test1@test.com';

-- If the second query returns NO ROWS, run this:
-- (This adds the profile for existing auth user)
/*
INSERT INTO users_profile (id, email, full_name, role)
SELECT 
  id,
  'test1@test.com',
  'Admin User',
  'admin'
FROM auth.users
WHERE email = 'test1@test.com'
AND NOT EXISTS (
  SELECT 1 FROM users_profile WHERE email = 'test1@test.com'
);
*/

-- Verify all admin users
SELECT 
  up.id,
  up.email,
  up.full_name,
  up.role,
  up.created_at
FROM users_profile up
WHERE up.role = 'admin'
ORDER BY up.created_at DESC;
