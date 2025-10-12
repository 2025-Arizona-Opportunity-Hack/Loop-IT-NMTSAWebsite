-- Create form_templates table
CREATE TABLE IF NOT EXISTS public.form_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    fields JSONB NOT NULL DEFAULT '[]'::jsonb,
    active BOOLEAN NOT NULL DEFAULT true,
    frontend_route TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_form_templates_slug ON public.form_templates(slug);
CREATE INDEX IF NOT EXISTS idx_form_templates_active ON public.form_templates(active);

-- Enable RLS
ALTER TABLE public.form_templates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active form templates"
    ON public.form_templates
    FOR SELECT
    USING (active = true);

CREATE POLICY "Admins can do anything with form templates"
    ON public.form_templates
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.users_profile
            WHERE users_profile.id = auth.uid()
            AND users_profile.role = 'admin'
        )
    );

-- Add comments
COMMENT ON TABLE public.form_templates IS 'Stores dynamic form templates that can be managed from admin panel';
COMMENT ON COLUMN public.form_templates.slug IS 'URL-friendly identifier for the form';
COMMENT ON COLUMN public.form_templates.fields IS 'JSON array defining form fields with their properties';
COMMENT ON COLUMN public.form_templates.frontend_route IS 'Frontend route where this form should be displayed';
