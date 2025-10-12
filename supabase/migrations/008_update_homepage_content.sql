-- =====================================================
-- Update Homepage Content with Complete CMS Data
-- =====================================================
-- This migration updates homepage content to match the exact structure
-- expected by the HomePage component

-- Update testimonials to include ratings and all 6 testimonials
UPDATE page_content 
SET 
  content = 'Client Testimonials with Ratings',
  metadata = '{
    "testimonials": [
      {
        "quote": "NMTSA has transformed our daughter''s life through music therapy. The progress she''s made is incredible.",
        "author": "Sarah M.",
        "role": "Parent",
        "rating": 5
      },
      {
        "quote": "The music therapy sessions have helped me regain my speech and confidence after my stroke.",
        "author": "Robert K.",
        "role": "Client",
        "rating": 5
      },
      {
        "quote": "The compassionate care and professional expertise at NMTSA is unmatched.",
        "author": "Linda T.",
        "role": "Family Member",
        "rating": 5
      },
      {
        "quote": "As a healthcare provider, I confidently refer my patients to NMTSA. Their evidence-based approach delivers real results.",
        "author": "Dr. Michael Chen",
        "role": "Neurologist",
        "rating": 5
      },
      {
        "quote": "The music therapy program has been instrumental in my son''s development. He''s more engaged and communicative than ever.",
        "author": "Jennifer R.",
        "role": "Parent of Child with Autism",
        "rating": 5
      },
      {
        "quote": "Working with NMTSA''s board-certified therapists has been life-changing for my recovery from traumatic brain injury.",
        "author": "David M.",
        "role": "TBI Survivor",
        "rating": 5
      }
    ]
  }'::jsonb,
  updated_at = NOW()
WHERE page_key = 'home_testimonials';

-- Update donate section content to match component expectations
UPDATE page_content 
SET 
  content = 'Transform Lives Through Music',
  updated_at = NOW()
WHERE page_key = 'home_donate_title';

UPDATE page_content 
SET 
  content = 'Your support helps us provide life-changing music therapy services to individuals with neurologic impairments and their families.',
  updated_at = NOW()
WHERE page_key = 'home_donate_description';

-- Update donate impact cards to use the exact metadata key 'impactCards'
UPDATE page_content 
SET 
  metadata = '{
    "impactCards": [
      {
        "amount": "$50",
        "description": "One therapy session"
      },
      {
        "amount": "$100",
        "description": "Two therapy sessions"
      },
      {
        "amount": "$250",
        "description": "Five therapy sessions"
      },
      {
        "amount": "$500",
        "description": "Full month of therapy"
      }
    ]
  }'::jsonb,
  updated_at = NOW()
WHERE page_key = 'home_donate_impact';

-- Log completion
DO $$
BEGIN
  RAISE NOTICE 'Homepage content updated successfully!';
END $$;
