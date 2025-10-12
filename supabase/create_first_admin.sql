-- =====================================================
-- Create First Admin User
-- =====================================================
-- Run this in Supabase SQL Editor to create your first admin user
-- IMPORTANT: Replace the email, password, and name with your own!

-- Step 1: Create auth user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin2@test.com', -- ⚠️ CHANGE THIS to a NEW email (not test1@test.com)
  crypt('admin@123', gen_salt('bf')), -- ⚠️ CHANGE THIS to your password
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Step 2: Create user profile
INSERT INTO users_profile (id, email, full_name, role)
SELECT 
  id,
  'admin2@test.com', -- ⚠️ CHANGE THIS to same email as above
  'Admin 2', -- ⚠️ CHANGE THIS to your name
  'admin' -- This makes the user an admin
FROM auth.users
WHERE email = 'admin2@test.com'; -- ⚠️ CHANGE THIS to same email

-- Verify the user was created
SELECT 
  up.id,
  up.email,
  up.full_name,
  up.role,
  up.created_at
FROM users_profile up
WHERE up.email = 'admin2@test.com'; -- ⚠️ CHANGE THIS to your email

-- Expected result: Should show 1 row with your admin user
