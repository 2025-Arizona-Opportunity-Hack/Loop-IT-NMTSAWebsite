-- =====================================================
-- Update Form Types Enum
-- =====================================================
-- This migration adds new form types to the form_type enum
-- to support all the different forms in the application

-- Drop the existing form_type enum and recreate with all types
ALTER TYPE form_type RENAME TO form_type_old;

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

-- Update the form_submissions table to use the new enum
ALTER TABLE form_submissions 
  ALTER COLUMN form_type TYPE form_type 
  USING (
    CASE 
      WHEN form_type::text = 'client_inquiry' THEN 'contact'::form_type
      ELSE form_type::text::form_type
    END
  );

-- Drop the old enum
DROP TYPE form_type_old;

-- Add a comment to document the form types
COMMENT ON TYPE form_type IS 'Types of forms that can be submitted through the website';
