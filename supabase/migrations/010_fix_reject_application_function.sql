-- =====================================================
-- FIX REJECT APPLICATION FUNCTION
-- =====================================================
-- This migration fixes the reject_application function to properly
-- cast the status string to application_status enum type

-- Function to reject application (works for all types)
CREATE OR REPLACE FUNCTION reject_application(
  table_name TEXT,
  application_id UUID,
  admin_id UUID,
  reason TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  EXECUTE format(
    'UPDATE %I SET 
      status = $1::application_status,
      reviewed_by = $2,
      reviewed_at = NOW(),
      rejection_reason = $3
    WHERE id = $4',
    table_name
  ) USING 'rejected', admin_id, reason, application_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION reject_application IS 'Rejects an application and records the rejection reason and reviewer';
