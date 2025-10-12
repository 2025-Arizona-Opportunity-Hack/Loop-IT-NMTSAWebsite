-- Migration: Add missing homepage content fields for full CMS control
-- This adds all the static data that should be manageable from the admin panel

-- About Preview Section (New fields)
-- Trust & Credibility Section (Why Choose NMTSA)
-- How It Works / Process Section
-- Request Service Section (Additional fields)
-- Testimonials Section (Additional metadata)
-- Final CTA Section (Additional fields)

INSERT INTO page_content (page_key, title, content, metadata, is_active) VALUES
(
  'home_about_preview_heading',
  'About Preview Section Heading',
  'Unleashing the Unique Potential of Individuals with Disabilities',
  NULL,
  true
),
(
  'home_about_preview_description',
  'About Preview Section Description',
  'Since 1982, NMTSA has provided services to persons with neurologic impairments (ages 18 months to 75+ years) and their families in the greater Phoenix area, using evidence-based neurologic music therapy.',
  NULL,
  true
),
(
  'home_about_preview_button_text',
  'About Preview Button Text',
  'Learn More About Us',
  NULL,
  true
),
(
  'home_trust_section_title',
  'Why Choose NMTSA Section Title',
  'Why Choose NMTSA?',
  NULL,
  true
),
(
  'home_trust_section_subtitle',
  'Why Choose NMTSA Section Subtitle',
  'Trusted by families across Arizona for evidence-based music therapy',
  NULL,
  true
),
(
  'home_trust_builders',
  'Trust Builder Cards',
  NULL,
  '{
    "trustBuilders": [
      {
        "icon": "Award",
        "title": "40+ Years of Excellence",
        "description": "Serving Arizona families since 1982"
      },
      {
        "icon": "CheckCircle",
        "title": "Board-Certified Therapists",
        "description": "Evidence-based, professional care"
      },
      {
        "icon": "Target",
        "title": "Proven Results",
        "description": "500+ families transformed"
      },
      {
        "icon": "TrendingUp",
        "title": "15,000+ Sessions",
        "description": "Delivering consistent outcomes"
      }
    ]
  }'::jsonb,
  true
),
(
  'home_trust_signals',
  'Trust Signals Footer',
  NULL,
  '{
    "servingLabel": "Proudly Serving",
    "signals": [
      {
        "icon": "MapPin",
        "text": "Greater Phoenix Area"
      },
      {
        "icon": "Award",
        "text": "Board-Certified Staff"
      },
      {
        "icon": "CheckCircle",
        "text": "Evidence-Based Approach"
      }
    ]
  }'::jsonb,
  true
),

-- How It Works / Process Section
(
  'home_process_title',
  'How It Works Section Title',
  'How Music Therapy Works',
  NULL,
  true
),
(
  'home_process_subtitle',
  'How It Works Section Subtitle',
  'Your journey with NMTSA: Simple, professional, and transformative',
  NULL,
  true
),
(
  'home_process_steps',
  'Process Steps',
  NULL,
  '{
    "steps": [
      {
        "number": "01",
        "title": "Initial Consultation",
        "description": "Free consultation to understand your needs and goals",
        "icon": "Phone"
      },
      {
        "number": "02",
        "title": "Assessment",
        "description": "Comprehensive evaluation by our certified therapists",
        "icon": "CheckCircle"
      },
      {
        "number": "03",
        "title": "Personalized Plan",
        "description": "Custom therapy program designed for you",
        "icon": "Target"
      },
      {
        "number": "04",
        "title": "Ongoing Sessions",
        "description": "Regular therapy sessions with progress tracking",
        "icon": "Music"
      },
      {
        "number": "05",
        "title": "Progress Tracking",
        "description": "Continuous evaluation and plan adjustments",
        "icon": "TrendingUp"
      }
    ]
  }'::jsonb,
  true
),
(
  'home_process_cta_text',
  'Process Section CTA Text',
  'Ready to start your transformation journey?',
  NULL,
  true
),

-- Request Service Section (Additional fields)
(
  'home_request_service_heading',
  'Request Service Main Heading',
  'Ready to Transform Your Life with Music?',
  NULL,
  true
),
(
  'home_request_service_intro',
  'Request Service Intro Text',
  'Join hundreds of families who have experienced the life-changing power of music therapy.',
  NULL,
  true
),
(
  'home_request_service_quick_stats',
  'Quick Statistics',
  NULL,
  '{
    "stats": [
      {
        "icon": "Clock",
        "label": "2-minute",
        "description": "consultation form"
      },
      {
        "icon": "CheckCircle",
        "label": "24-hour",
        "description": "response time"
      },
      {
        "icon": "Users",
        "label": "12 families",
        "description": "started this month"
      }
    ]
  }'::jsonb,
  true
),
(
  'home_request_service_phone',
  'Contact Phone Number',
  '(602) 588-7631',
  '{"raw": "602-588-7631"}'::jsonb,
  true
),
(
  'home_request_service_phone_label',
  'Contact Phone Label',
  'Have questions? Call us today',
  NULL,
  true
),

-- Testimonials Section (Additional metadata)
(
  'home_testimonials_subtitle',
  'Testimonials Section Subtitle',
  'Hear from families, clients, and healthcare professionals',
  NULL,
  true
),
(
  'home_testimonials_overall_rating',
  'Overall Rating Display',
  NULL,
  '{
    "rating": 5.0,
    "maxRating": 5,
    "reviewCount": "120+"
  }'::jsonb,
  true
),
(
  'home_testimonials_scroll_hint',
  'Testimonials Scroll Hint',
  '← Swipe to see more testimonials →',
  NULL,
  true
),

-- Final CTA Section (Additional fields)
(
  'home_final_cta_phone_label',
  'Final CTA Phone Label',
  'Prefer to talk? We''re here to help',
  NULL,
  true
),
(
  'home_final_cta_hours',
  'Business Hours Display',
  'Mon-Fri 9AM-5PM MST',
  '{"icon": "Clock"}'::jsonb,
  true
)
ON CONFLICT (page_key) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();
