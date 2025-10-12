-- =====================================================
-- NMTSA Website Extended Schema
-- Marketplace, Donors, Volunteer Tracking, Intern Tracking
-- =====================================================

-- =====================================================
-- 1. CUSTOM TYPES
-- =====================================================

-- Merchandise categories
CREATE TYPE merchandise_category AS ENUM ('apparel', 'accessories', 'digital', 'other');

-- Order status
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'completed', 'cancelled');

-- Tracking status
CREATE TYPE tracking_status AS ENUM ('active', 'inactive', 'completed', 'on_hold');

-- =====================================================
-- 2. MARKETPLACE TABLES
-- =====================================================

-- Merchandise/Products Table
CREATE TABLE IF NOT EXISTS merchandise (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category merchandise_category NOT NULL DEFAULT 'other',
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  image_url TEXT,
  images JSONB DEFAULT '[]'::jsonb, -- Array of additional image URLs
  is_active BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB, -- For additional product details (size, color, etc.)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_merchandise_category ON merchandise(category);
CREATE INDEX idx_merchandise_active ON merchandise(is_active);
CREATE INDEX idx_merchandise_featured ON merchandise(featured, is_active);

-- Orders Table (for tracking merchandise orders)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address JSONB NOT NULL, -- {street, city, state, zip, country}
  items JSONB NOT NULL, -- Array of {merchandise_id, name, quantity, price}
  subtotal NUMERIC(10, 2) NOT NULL,
  tax NUMERIC(10, 2) DEFAULT 0,
  shipping_cost NUMERIC(10, 2) DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,
  status order_status NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  notes TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_order_number ON orders(order_number);

-- =====================================================
-- 3. DONORS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS donors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address JSONB, -- {street, city, state, zip, country}
  donation_amount NUMERIC(10, 2) NOT NULL CHECK (donation_amount > 0),
  donation_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  donation_method TEXT, -- e.g., 'credit_card', 'paypal', 'check', 'bank_transfer'
  is_recurring BOOLEAN NOT NULL DEFAULT false,
  frequency TEXT, -- e.g., 'monthly', 'quarterly', 'annually'
  anonymous BOOLEAN NOT NULL DEFAULT false,
  message TEXT,
  tax_receipt_sent BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB, -- For campaign tracking, tribute info, etc.
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_donors_email ON donors(email);
CREATE INDEX idx_donors_donation_date ON donors(donation_date DESC);
CREATE INDEX idx_donors_recurring ON donors(is_recurring);
CREATE INDEX idx_donors_anonymous ON donors(anonymous);

-- =====================================================
-- 4. VOLUNTEER TRACKING TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Optional link to user account
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  address JSONB, -- {street, city, state, zip}
  emergency_contact JSONB, -- {name, phone, relationship}
  skills TEXT[], -- Array of skills
  interests TEXT[], -- Array of interests
  availability JSONB, -- {days: [], times: []}
  status tracking_status NOT NULL DEFAULT 'active',
  total_hours NUMERIC(10, 2) DEFAULT 0 CHECK (total_hours >= 0),
  background_check_completed BOOLEAN NOT NULL DEFAULT false,
  background_check_date TIMESTAMPTZ,
  orientation_completed BOOLEAN NOT NULL DEFAULT false,
  orientation_date TIMESTAMPTZ,
  notes TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_volunteers_email ON volunteers(email);
CREATE INDEX idx_volunteers_status ON volunteers(status);
CREATE INDEX idx_volunteers_user_id ON volunteers(user_id);

-- Volunteer Hours Log
CREATE TABLE IF NOT EXISTS volunteer_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  volunteer_id UUID NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
  activity TEXT NOT NULL,
  description TEXT,
  hours NUMERIC(10, 2) NOT NULL CHECK (hours > 0),
  activity_date DATE NOT NULL,
  supervisor_name TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  verified_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_volunteer_hours_volunteer_id ON volunteer_hours(volunteer_id);
CREATE INDEX idx_volunteer_hours_activity_date ON volunteer_hours(activity_date DESC);
CREATE INDEX idx_volunteer_hours_verified ON volunteer_hours(verified);

-- =====================================================
-- 5. INTERN TRACKING TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS interns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Optional link to user account
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  address JSONB, -- {street, city, state, zip}
  emergency_contact JSONB, -- {name, phone, relationship}
  school_name TEXT,
  major TEXT,
  graduation_date DATE,
  start_date DATE NOT NULL,
  end_date DATE,
  mentor_name TEXT,
  mentor_email TEXT,
  department TEXT,
  position_title TEXT NOT NULL,
  status tracking_status NOT NULL DEFAULT 'active',
  total_hours NUMERIC(10, 2) DEFAULT 0 CHECK (total_hours >= 0),
  stipend_amount NUMERIC(10, 2),
  academic_credit BOOLEAN NOT NULL DEFAULT false,
  performance_reviews JSONB DEFAULT '[]'::jsonb, -- Array of review objects
  notes TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_interns_email ON interns(email);
CREATE INDEX idx_interns_status ON interns(status);
CREATE INDEX idx_interns_user_id ON interns(user_id);
CREATE INDEX idx_interns_start_date ON interns(start_date DESC);

-- Intern Hours Log
CREATE TABLE IF NOT EXISTS intern_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  intern_id UUID NOT NULL REFERENCES interns(id) ON DELETE CASCADE,
  project TEXT NOT NULL,
  description TEXT,
  hours NUMERIC(10, 2) NOT NULL CHECK (hours > 0),
  activity_date DATE NOT NULL,
  supervisor_name TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  verified_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_intern_hours_intern_id ON intern_hours(intern_id);
CREATE INDEX idx_intern_hours_activity_date ON intern_hours(activity_date DESC);
CREATE INDEX idx_intern_hours_verified ON intern_hours(verified);

-- =====================================================
-- 6. TRIGGERS FOR UPDATED_AT
-- =====================================================

CREATE TRIGGER update_merchandise_updated_at
  BEFORE UPDATE ON merchandise
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteers_updated_at
  BEFORE UPDATE ON volunteers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteer_hours_updated_at
  BEFORE UPDATE ON volunteer_hours
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interns_updated_at
  BEFORE UPDATE ON interns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_intern_hours_updated_at
  BEFORE UPDATE ON intern_hours
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 7. TRIGGERS FOR TOTAL HOURS CALCULATION
-- =====================================================

-- Update volunteer total_hours when hours are added/updated/deleted
CREATE OR REPLACE FUNCTION update_volunteer_total_hours()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE volunteers 
    SET total_hours = COALESCE((
      SELECT SUM(hours) 
      FROM volunteer_hours 
      WHERE volunteer_id = OLD.volunteer_id
    ), 0)
    WHERE id = OLD.volunteer_id;
    RETURN OLD;
  ELSE
    UPDATE volunteers 
    SET total_hours = COALESCE((
      SELECT SUM(hours) 
      FROM volunteer_hours 
      WHERE volunteer_id = NEW.volunteer_id
    ), 0)
    WHERE id = NEW.volunteer_id;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_volunteer_total_hours
  AFTER INSERT OR UPDATE OR DELETE ON volunteer_hours
  FOR EACH ROW
  EXECUTE FUNCTION update_volunteer_total_hours();

-- Update intern total_hours when hours are added/updated/deleted
CREATE OR REPLACE FUNCTION update_intern_total_hours()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE interns 
    SET total_hours = COALESCE((
      SELECT SUM(hours) 
      FROM intern_hours 
      WHERE intern_id = OLD.intern_id
    ), 0)
    WHERE id = OLD.intern_id;
    RETURN OLD;
  ELSE
    UPDATE interns 
    SET total_hours = COALESCE((
      SELECT SUM(hours) 
      FROM intern_hours 
      WHERE intern_id = NEW.intern_id
    ), 0)
    WHERE id = NEW.intern_id;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_intern_total_hours
  AFTER INSERT OR UPDATE OR DELETE ON intern_hours
  FOR EACH ROW
  EXECUTE FUNCTION update_intern_total_hours();

-- =====================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE merchandise ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE interns ENABLE ROW LEVEL SECURITY;
ALTER TABLE intern_hours ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS Policies: merchandise
-- =====================================================

-- Public can read active merchandise
CREATE POLICY "Public can read active merchandise"
  ON merchandise FOR SELECT
  USING (is_active = true);

-- Admins have full access
CREATE POLICY "Admins have full access to merchandise"
  ON merchandise FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- =====================================================
-- RLS Policies: orders
-- =====================================================

-- Admins can read all orders
CREATE POLICY "Admins can read all orders"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- Admins can update orders
CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- Anyone can create orders (for checkout)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- RLS Policies: donors
-- =====================================================

-- Admins can read all donors
CREATE POLICY "Admins can read all donors"
  ON donors FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- Anyone can create donor records
CREATE POLICY "Anyone can create donor records"
  ON donors FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- RLS Policies: volunteers
-- =====================================================

-- Volunteers can read their own record
CREATE POLICY "Volunteers can read own record"
  ON volunteers FOR SELECT
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role IN ('admin', 'volunteer')
    )
  );

-- Admins have full access
CREATE POLICY "Admins have full access to volunteers"
  ON volunteers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- Volunteers can update their own record (limited fields)
CREATE POLICY "Volunteers can update own record"
  ON volunteers FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- =====================================================
-- RLS Policies: volunteer_hours
-- =====================================================

-- Volunteers can read their own hours
CREATE POLICY "Volunteers can read own hours"
  ON volunteer_hours FOR SELECT
  USING (
    volunteer_id IN (SELECT id FROM volunteers WHERE user_id = auth.uid()) OR
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role IN ('admin', 'volunteer')
    )
  );

-- Volunteers can create their own hours
CREATE POLICY "Volunteers can create own hours"
  ON volunteer_hours FOR INSERT
  WITH CHECK (
    volunteer_id IN (SELECT id FROM volunteers WHERE user_id = auth.uid())
  );

-- Admins have full access
CREATE POLICY "Admins have full access to volunteer_hours"
  ON volunteer_hours FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- =====================================================
-- RLS Policies: interns
-- =====================================================

-- Interns can read their own record
CREATE POLICY "Interns can read own record"
  ON interns FOR SELECT
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role IN ('admin', 'volunteer')
    )
  );

-- Admins have full access
CREATE POLICY "Admins have full access to interns"
  ON interns FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- Interns can update their own record (limited fields)
CREATE POLICY "Interns can update own record"
  ON interns FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- =====================================================
-- RLS Policies: intern_hours
-- =====================================================

-- Interns can read their own hours
CREATE POLICY "Interns can read own hours"
  ON intern_hours FOR SELECT
  USING (
    intern_id IN (SELECT id FROM interns WHERE user_id = auth.uid()) OR
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role IN ('admin', 'volunteer')
    )
  );

-- Interns can create their own hours
CREATE POLICY "Interns can create own hours"
  ON intern_hours FOR INSERT
  WITH CHECK (
    intern_id IN (SELECT id FROM interns WHERE user_id = auth.uid())
  );

-- Admins have full access
CREATE POLICY "Admins have full access to intern_hours"
  ON intern_hours FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users_profile
      WHERE users_profile.id = auth.uid()
      AND users_profile.role = 'admin'
    )
  );

-- =====================================================
-- 9. HELPER FUNCTIONS
-- =====================================================

-- Function to generate unique order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  new_order_number TEXT;
  done BOOLEAN := false;
BEGIN
  WHILE NOT done LOOP
    new_order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    IF NOT EXISTS (SELECT 1 FROM orders WHERE order_number = new_order_number) THEN
      done := true;
    END IF;
  END LOOP;
  RETURN new_order_number;
END;
$$ LANGUAGE plpgsql;
