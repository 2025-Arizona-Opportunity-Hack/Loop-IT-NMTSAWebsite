-- =====================================================
-- APPLICATION MANAGEMENT FOR VOLUNTEERS, INTERNS, AND EMPLOYEES
-- =====================================================
-- This migration adds application tracking and approval workflow
-- for volunteers, interns, and employees

-- =====================================================
-- 1. APPLICATION STATUS TYPE
-- =====================================================

CREATE TYPE application_status AS ENUM (
  'pending',      -- Initial submission
  'under_review', -- Being reviewed by admin
  'approved',     -- Approved and moved to main table
  'rejected',     -- Rejected
  'withdrawn'     -- Applicant withdrew
);

-- =====================================================
-- 2. VOLUNTEER APPLICATIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS volunteer_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address JSONB, -- {street, city, state, zip}
  emergency_contact JSONB, -- {name, phone, relationship}
  date_of_birth DATE,
  skills TEXT[], -- Array of skills
  interests TEXT[], -- Array of interests
  availability JSONB, -- {days: [], times: []}
  reason_for_volunteering TEXT,
  previous_volunteer_experience TEXT,
  reference_contacts JSONB, -- Array of {name, email, phone, relationship}
  
  -- Application tracking
  status application_status NOT NULL DEFAULT 'pending',
  application_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  review_notes TEXT,
  rejection_reason TEXT,
  
  -- If approved, reference to the volunteer record
  volunteer_id UUID REFERENCES volunteers(id) ON DELETE SET NULL,
  
  -- Metadata
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_volunteer_applications_status ON volunteer_applications(status);
CREATE INDEX idx_volunteer_applications_email ON volunteer_applications(email);
CREATE INDEX idx_volunteer_applications_date ON volunteer_applications(application_date DESC);

-- =====================================================
-- 3. INTERN APPLICATIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS intern_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address JSONB, -- {street, city, state, zip}
  emergency_contact JSONB, -- {name, phone, relationship}
  date_of_birth DATE,
  
  -- Academic information
  school_name TEXT NOT NULL,
  major TEXT NOT NULL,
  graduation_date DATE,
  gpa NUMERIC(3, 2),
  degree_level TEXT, -- Associates, Bachelors, Masters, PhD
  
  -- Internship details
  desired_position TEXT NOT NULL,
  desired_department TEXT,
  preferred_start_date DATE,
  preferred_end_date DATE,
  hours_per_week INTEGER,
  seeking_academic_credit BOOLEAN NOT NULL DEFAULT false,
  seeking_stipend BOOLEAN NOT NULL DEFAULT false,
  
  -- Experience and qualifications
  relevant_coursework TEXT,
  skills TEXT[],
  previous_internships TEXT,
  work_experience TEXT,
  reference_contacts JSONB, -- Array of {name, email, phone, relationship, title}
  
  -- Documents
  resume_url TEXT,
  cover_letter TEXT,
  transcript_url TEXT,
  
  -- Application tracking
  status application_status NOT NULL DEFAULT 'pending',
  application_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  review_notes TEXT,
  rejection_reason TEXT,
  
  -- If approved, reference to the intern record
  intern_id UUID REFERENCES interns(id) ON DELETE SET NULL,
  
  -- Metadata
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_intern_applications_status ON intern_applications(status);
CREATE INDEX idx_intern_applications_email ON intern_applications(email);
CREATE INDEX idx_intern_applications_date ON intern_applications(application_date DESC);

-- =====================================================
-- 4. EMPLOYEE APPLICATIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS employee_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address JSONB, -- {street, city, state, zip}
  date_of_birth DATE,
  
  -- Position details
  position_applied_for TEXT NOT NULL,
  department TEXT,
  desired_salary NUMERIC(10, 2),
  available_start_date DATE,
  employment_type TEXT, -- full-time, part-time, contract
  
  -- Qualifications
  education JSONB, -- Array of {degree, institution, year, major}
  certifications TEXT[],
  skills TEXT[],
  work_experience JSONB, -- Array of {company, title, start_date, end_date, responsibilities}
  reference_contacts JSONB, -- Array of {name, email, phone, relationship, company}
  
  -- Documents
  resume_url TEXT,
  cover_letter TEXT,
  portfolio_url TEXT,
  
  -- Application tracking
  status application_status NOT NULL DEFAULT 'pending',
  application_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  review_notes TEXT,
  rejection_reason TEXT,
  
  -- Interview tracking
  interview_scheduled BOOLEAN NOT NULL DEFAULT false,
  interview_date TIMESTAMPTZ,
  interview_notes TEXT,
  
  -- If approved, reference to the employee record
  employee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
  
  -- Metadata
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_employee_applications_status ON employee_applications(status);
CREATE INDEX idx_employee_applications_email ON employee_applications(email);
CREATE INDEX idx_employee_applications_date ON employee_applications(application_date DESC);
CREATE INDEX idx_employee_applications_position ON employee_applications(position_applied_for);

-- =====================================================
-- 5. ADD MISSING FIELDS TO EXISTING TABLES
-- =====================================================

-- Add image_url and additional fields to volunteers if not exists
DO $$ 
BEGIN
  -- Add image_url to volunteers
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'volunteers' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE volunteers ADD COLUMN image_url TEXT;
  END IF;
  
  -- Add date_of_birth to volunteers
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'volunteers' AND column_name = 'date_of_birth'
  ) THEN
    ALTER TABLE volunteers ADD COLUMN date_of_birth DATE;
  END IF;
  
  -- Add start_date to volunteers
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'volunteers' AND column_name = 'start_date'
  ) THEN
    ALTER TABLE volunteers ADD COLUMN start_date DATE DEFAULT CURRENT_DATE;
  END IF;
END $$;

-- Add image_url and additional fields to interns if not exists
DO $$ 
BEGIN
  -- Add image_url to interns
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'interns' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE interns ADD COLUMN image_url TEXT;
  END IF;
  
  -- Add date_of_birth to interns
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'interns' AND column_name = 'date_of_birth'
  ) THEN
    ALTER TABLE interns ADD COLUMN date_of_birth DATE;
  END IF;
END $$;

-- Enhance employees table
DO $$ 
BEGIN
  -- Add email to employees
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'employees' AND column_name = 'email'
  ) THEN
    ALTER TABLE employees ADD COLUMN email TEXT;
  END IF;
  
  -- Add phone to employees
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'employees' AND column_name = 'phone'
  ) THEN
    ALTER TABLE employees ADD COLUMN phone TEXT;
  END IF;
  
  -- Add address to employees
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'employees' AND column_name = 'address'
  ) THEN
    ALTER TABLE employees ADD COLUMN address JSONB;
  END IF;
  
  -- Add date_of_birth to employees
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'employees' AND column_name = 'date_of_birth'
  ) THEN
    ALTER TABLE employees ADD COLUMN date_of_birth DATE;
  END IF;
  
  -- Add start_date to employees
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'employees' AND column_name = 'start_date'
  ) THEN
    ALTER TABLE employees ADD COLUMN start_date DATE;
  END IF;
  
  -- Add employment_type to employees
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'employees' AND column_name = 'employment_type'
  ) THEN
    ALTER TABLE employees ADD COLUMN employment_type TEXT;
  END IF;
  
  -- Add department to employees
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'employees' AND column_name = 'department'
  ) THEN
    ALTER TABLE employees ADD COLUMN department TEXT;
  END IF;
  
  -- Add salary to employees
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'employees' AND column_name = 'salary'
  ) THEN
    ALTER TABLE employees ADD COLUMN salary NUMERIC(10, 2);
  END IF;
  
  -- Add emergency_contact to employees
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'employees' AND column_name = 'emergency_contact'
  ) THEN
    ALTER TABLE employees ADD COLUMN emergency_contact JSONB;
  END IF;
  
  -- Add notes to employees
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'employees' AND column_name = 'notes'
  ) THEN
    ALTER TABLE employees ADD COLUMN notes TEXT;
  END IF;
  
  -- Add metadata to employees
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'employees' AND column_name = 'metadata'
  ) THEN
    ALTER TABLE employees ADD COLUMN metadata JSONB;
  END IF;
END $$;

-- =====================================================
-- 6. TRIGGERS FOR UPDATED_AT
-- =====================================================

CREATE TRIGGER update_volunteer_applications_updated_at
  BEFORE UPDATE ON volunteer_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_intern_applications_updated_at
  BEFORE UPDATE ON intern_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employee_applications_updated_at
  BEFORE UPDATE ON employee_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE intern_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_applications ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS Policies: volunteer_applications
-- =====================================================

-- Anyone can submit a volunteer application
CREATE POLICY "Anyone can submit volunteer application"
  ON volunteer_applications FOR INSERT
  WITH CHECK (true);

-- Applicants can read their own application
CREATE POLICY "Applicants can read own volunteer application"
  ON volunteer_applications FOR SELECT
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Admins can read all volunteer applications
CREATE POLICY "Admins can read all volunteer applications"
  ON volunteer_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- Admins can update volunteer applications
CREATE POLICY "Admins can update volunteer applications"
  ON volunteer_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- Admins can delete volunteer applications
CREATE POLICY "Admins can delete volunteer applications"
  ON volunteer_applications FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- =====================================================
-- RLS Policies: intern_applications
-- =====================================================

-- Anyone can submit an intern application
CREATE POLICY "Anyone can submit intern application"
  ON intern_applications FOR INSERT
  WITH CHECK (true);

-- Applicants can read their own application
CREATE POLICY "Applicants can read own intern application"
  ON intern_applications FOR SELECT
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Admins can read all intern applications
CREATE POLICY "Admins can read all intern applications"
  ON intern_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- Admins can update intern applications
CREATE POLICY "Admins can update intern applications"
  ON intern_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- Admins can delete intern applications
CREATE POLICY "Admins can delete intern applications"
  ON intern_applications FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- =====================================================
-- RLS Policies: employee_applications
-- =====================================================

-- Anyone can submit an employee application
CREATE POLICY "Anyone can submit employee application"
  ON employee_applications FOR INSERT
  WITH CHECK (true);

-- Applicants can read their own application
CREATE POLICY "Applicants can read own employee application"
  ON employee_applications FOR SELECT
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Admins can read all employee applications
CREATE POLICY "Admins can read all employee applications"
  ON employee_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- Admins can update employee applications
CREATE POLICY "Admins can update employee applications"
  ON employee_applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- Admins can delete employee applications
CREATE POLICY "Admins can delete employee applications"
  ON employee_applications FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- =====================================================
-- 8. HELPER FUNCTIONS
-- =====================================================

-- Function to approve volunteer application
CREATE OR REPLACE FUNCTION approve_volunteer_application(
  application_id UUID,
  admin_id UUID
)
RETURNS UUID AS $$
DECLARE
  volunteer_record UUID;
  app_record RECORD;
BEGIN
  -- Get application details
  SELECT * INTO app_record
  FROM volunteer_applications
  WHERE id = application_id AND status = 'pending';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Application not found or already processed';
  END IF;
  
  -- Create volunteer record
  INSERT INTO volunteers (
    name, email, phone, address, emergency_contact,
    date_of_birth, skills, interests, availability,
    status, notes, metadata, start_date
  ) VALUES (
    app_record.name, app_record.email, app_record.phone,
    app_record.address, app_record.emergency_contact,
    app_record.date_of_birth, app_record.skills,
    app_record.interests, app_record.availability,
    'active', app_record.review_notes, app_record.metadata,
    CURRENT_DATE
  ) RETURNING id INTO volunteer_record;
  
  -- Update application status
  UPDATE volunteer_applications
  SET 
    status = 'approved',
    volunteer_id = volunteer_record,
    reviewed_by = admin_id,
    reviewed_at = NOW()
  WHERE id = application_id;
  
  RETURN volunteer_record;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to approve intern application
CREATE OR REPLACE FUNCTION approve_intern_application(
  application_id UUID,
  admin_id UUID,
  assigned_mentor_name TEXT DEFAULT NULL,
  assigned_mentor_email TEXT DEFAULT NULL,
  assigned_department TEXT DEFAULT NULL,
  assigned_position TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  intern_record UUID;
  app_record RECORD;
BEGIN
  -- Get application details
  SELECT * INTO app_record
  FROM intern_applications
  WHERE id = application_id AND status = 'pending';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Application not found or already processed';
  END IF;
  
  -- Create intern record
  INSERT INTO interns (
    name, email, phone, address, emergency_contact,
    date_of_birth, school_name, major, graduation_date,
    start_date, mentor_name, mentor_email, department,
    position_title, status, notes, metadata,
    academic_credit, stipend_amount
  ) VALUES (
    app_record.name, app_record.email, app_record.phone,
    app_record.address, app_record.emergency_contact,
    app_record.date_of_birth, app_record.school_name,
    app_record.major, app_record.graduation_date,
    COALESCE(app_record.preferred_start_date, CURRENT_DATE),
    COALESCE(assigned_mentor_name, 'To Be Assigned'),
    assigned_mentor_email,
    COALESCE(assigned_department, app_record.desired_department, 'General'),
    COALESCE(assigned_position, app_record.desired_position),
    'active', app_record.review_notes, app_record.metadata,
    app_record.seeking_academic_credit,
    CASE WHEN app_record.seeking_stipend THEN 0 ELSE NULL END
  ) RETURNING id INTO intern_record;
  
  -- Update application status
  UPDATE intern_applications
  SET 
    status = 'approved',
    intern_id = intern_record,
    reviewed_by = admin_id,
    reviewed_at = NOW()
  WHERE id = application_id;
  
  RETURN intern_record;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to approve employee application
CREATE OR REPLACE FUNCTION approve_employee_application(
  application_id UUID,
  admin_id UUID,
  assigned_role TEXT,
  assigned_department TEXT DEFAULT NULL,
  assigned_salary NUMERIC DEFAULT NULL,
  assigned_start_date DATE DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  employee_record UUID;
  app_record RECORD;
BEGIN
  -- Get application details
  SELECT * INTO app_record
  FROM employee_applications
  WHERE id = application_id AND status = 'pending';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Application not found or already processed';
  END IF;
  
  -- Create employee record
  INSERT INTO employees (
    name, role, email, phone, address, date_of_birth,
    start_date, employment_type, department, salary,
    emergency_contact, notes, metadata, is_active
  ) VALUES (
    app_record.name, assigned_role, app_record.email,
    app_record.phone, app_record.address, app_record.date_of_birth,
    COALESCE(assigned_start_date, app_record.available_start_date, CURRENT_DATE),
    app_record.employment_type,
    COALESCE(assigned_department, app_record.department),
    COALESCE(assigned_salary, app_record.desired_salary),
    NULL, app_record.review_notes, app_record.metadata, true
  ) RETURNING id INTO employee_record;
  
  -- Update application status
  UPDATE employee_applications
  SET 
    status = 'approved',
    employee_id = employee_record,
    reviewed_by = admin_id,
    reviewed_at = NOW()
  WHERE id = application_id;
  
  RETURN employee_record;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

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
      status = $1,
      reviewed_by = $2,
      reviewed_at = NOW(),
      rejection_reason = $3
    WHERE id = $4',
    table_name
  ) USING 'rejected', admin_id, reason, application_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 9. INDEXES FOR ENHANCED EMPLOYEES TABLE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(email);
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department);
CREATE INDEX IF NOT EXISTS idx_employees_start_date ON employees(start_date DESC);

COMMENT ON TABLE volunteer_applications IS 'Stores volunteer applications before approval';
COMMENT ON TABLE intern_applications IS 'Stores intern applications before approval';
COMMENT ON TABLE employee_applications IS 'Stores employee applications before approval';
