-- =====================================================
-- Seed Initial Content for CMS
-- =====================================================
-- This migration populates the page_content table with initial website content
-- Uses ON CONFLICT to update existing records instead of failing

-- =====================================================
-- HOMEPAGE CONTENT
-- =====================================================

-- Hero Section
INSERT INTO page_content (page_key, title, content, metadata, is_active) VALUES
('home_hero_title', 'Homepage Hero Title', 'Transforming Lives Through Neurologic Music Therapy', '{
  "alignment": "center",
  "textColor": "primary"
}', true),

('home_hero_subtitle', 'Homepage Hero Subtitle', 'Evidence-based music therapy services for individuals with neurologic conditions in Arizona', '{
  "alignment": "center"
}', true),

('home_hero_cta', 'Homepage Hero CTA', 'Learn More', '{
  "buttonText": "Learn More",
  "buttonLink": "/about",
  "secondaryButtonText": "Get Started",
  "secondaryButtonLink": "/contact"
}', true),

-- Stats Section
('home_stats', 'Homepage Statistics', 'Our Impact', '{
  "stats": [
    {"number": "40+", "label": "Years Serving"},
    {"number": "500+", "label": "Families Helped"},
    {"number": "15K+", "label": "Sessions Completed"}
  ]
}', true),

-- Programs Section
('home_programs_title', 'Homepage Programs Title', 'Our Programs', '{
  "subtitle": "Comprehensive neurologic music therapy services"
}', true),

('home_programs', 'Homepage Programs', 'Programs Overview', '{
  "programs": [
    {
      "icon": "Music",
      "title": "Music Therapy",
      "description": "Evidence-based interventions for neurologic conditions",
      "color": "bg-nmtsa-500",
      "link": "/programs"
    },
    {
      "icon": "GraduationCap",
      "title": "Music Lessons",
      "description": "Adaptive music education for all skill levels",
      "color": "bg-nmtsa-600",
      "link": "/programs"
    },
    {
      "icon": "Users",
      "title": "Community Education",
      "description": "Workshops and training for families and professionals",
      "color": "bg-nmtsa-700",
      "link": "/programs"
    }
  ]
}', true),

-- Testimonials Section
('home_testimonials_title', 'Homepage Testimonials Title', 'What Our Clients Say', '{
  "subtitle": "Real stories from real families"
}', true),

('home_testimonials', 'Homepage Testimonials', 'Client Testimonials', '{
  "testimonials": [
    {
      "quote": "NMTSA has transformed our daughter''s life through music therapy. The progress she''s made is incredible.",
      "author": "Sarah M.",
      "role": "Parent"
    },
    {
      "quote": "The music therapy sessions have helped me regain my speech and confidence after my stroke.",
      "author": "Robert K.",
      "role": "Client"
    },
    {
      "quote": "The compassionate care and professional expertise at NMTSA is unmatched.",
      "author": "Linda T.",
      "role": "Family Member"
    }
  ]
}', true),

-- CTA Section
('home_cta', 'Homepage Call to Action', 'Ready to Start Your Journey?', '{
  "subtitle": "Contact us today to schedule a consultation and learn how music therapy can help.",
  "buttonText": "Contact Us",
  "buttonLink": "/contact",
  "bgColor": "gradient"
}', true),

-- About Preview Section
('home_about_preview_badge', 'Homepage About Preview Badge', 'About NMTSA', '{}', true),

('home_about_preview_text', 'Homepage About Preview Text', 'Since 1982, Neurologic Music Therapy Services of Arizona has been dedicated to unleashing the unique potential of individuals with disabilities through evidence-based music therapy interventions.', '{}', true),

('home_about_preview_image', 'Homepage About Preview Image', 'https://static.wixstatic.com/media/072f2d_a15cb6cb61a74ff8956322ba1d5028f1.jpg/v1/fill/w_600,h_450,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/_MG_1270_JPG.jpg', '{
  "alt": "Music therapy session at NMTSA",
  "width": 600,
  "height": 450
}', true),

-- Programs Overview Section
('home_programs_badge', 'Homepage Programs Badge', 'Our Programs', '{}', true),

('home_programs_heading', 'Homepage Programs Heading', 'Comprehensive Services', '{
  "highlight": "Services"
}', true),

('home_programs_subtitle', 'Homepage Programs Subtitle', 'Evidence-based programs designed to meet diverse needs', '{}', true),

-- Request Service Section
('home_request_service_title', 'Homepage Request Service Title', 'Ready to Get Started?', '{
  "highlight": "Started"
}', true),

('home_request_service_description', 'Homepage Request Service Description', 'Take the first step towards transformation. Our team is here to guide you through our services and find the perfect program for your needs.', '{}', true),

('home_request_service_buttons', 'Homepage Request Service Buttons', 'Call to Action Buttons', '{
  "buttons": [
    {
      "text": "Request Service",
      "link": "/contact",
      "icon": "Calendar",
      "type": "primary"
    },
    {
      "text": "View Programs",
      "link": "/programs",
      "icon": "Music",
      "type": "secondary"
    }
  ]
}', true),

-- Get Involved Section
('home_get_involved_badge', 'Homepage Get Involved Badge', 'Opportunities', '{}', true),

('home_get_involved_title', 'Homepage Get Involved Title', 'Get Involved', '{
  "highlight": "Involved"
}', true),

('home_get_involved_subtitle', 'Homepage Get Involved Subtitle', 'Join our mission and make a meaningful impact in the lives of individuals with neurologic impairments', '{}', true),

('home_get_involved_options', 'Homepage Get Involved Options', 'Ways to Get Involved', '{
  "options": [
    {
      "icon": "Heart",
      "title": "Volunteer",
      "description": "Make a difference in our community",
      "link": "/contact"
    },
    {
      "icon": "Briefcase",
      "title": "Internship",
      "description": "Gain hands-on experience in music therapy",
      "link": "/contact"
    },
    {
      "icon": "UserPlus",
      "title": "Employment",
      "description": "Join our professional team",
      "link": "/contact"
    }
  ]
}', true),

-- Support/Donate Section
('home_donate_badge', 'Homepage Donate Badge', 'Support Our Mission', '{}', true),

('home_donate_title', 'Homepage Donate Title', 'Help Us Transform More Lives', '{
  "highlight": "More Lives"
}', true),

('home_donate_description', 'Homepage Donate Description', 'Your generous support enables us to provide life-changing music therapy services to individuals and families in need. Every donation makes a direct impact.', '{}', true),

('home_donate_buttons', 'Homepage Donate Buttons', 'Donation Action Buttons', '{
  "buttons": [
    {
      "text": "Donate Now",
      "link": "/donate",
      "icon": "Heart",
      "type": "primary"
    },
    {
      "text": "Shop Merchandise",
      "link": "/contact",
      "icon": "ShoppingBag",
      "type": "secondary"
    }
  ]
}', true),

('home_donate_impact', 'Homepage Donation Impact Cards', 'Impact of Your Donation', '{
  "impactCards": [
    {
      "amount": "$50",
      "description": "Funds one therapy session"
    },
    {
      "amount": "$200",
      "description": "Supports monthly programs"
    },
    {
      "amount": "$500",
      "description": "Sponsors a family''s care"
    },
    {
      "amount": "$1000",
      "description": "Transforms multiple lives"
    }
  ]
}', true),

('home_donate_why_choose', 'Homepage Why Choose NMTSA', 'Why Choose NMTSA?', '{
  "features": "40+ years of proven results • Evidence-based therapy • Board-certified therapists • Direct community impact"
}', true),

-- Testimonials Section
('home_testimonials_badge', 'Homepage Testimonials Badge', 'Testimonials', '{}', true),

('home_testimonials_heading', 'Homepage Testimonials Heading', 'Stories of Transformation', '{
  "highlight": "Transformation"
}', true),

-- Blog Section
('home_blog_badge', 'Homepage Blog Badge', 'Latest News', '{}', true),

('home_blog_heading', 'Homepage Blog Heading', 'From Our Blog', '{
  "highlight": "Blog"
}', true),

('home_blog_subtitle', 'Homepage Blog Subtitle', 'Stay updated with the latest insights, research, and stories from NMTSA', '{}', true),

('home_blog_posts', 'Homepage Blog Posts', 'Latest Blog Posts', '{
  "posts": [
    {
      "title": "The Science Behind Music Therapy",
      "excerpt": "Exploring how music activates neural pathways to promote healing...",
      "date": "Oct 5, 2024",
      "readTime": "5 min read",
      "link": "/blog"
    },
    {
      "title": "Supporting Families Through Music",
      "excerpt": "How our community programs create lasting impact...",
      "date": "Sep 28, 2024",
      "readTime": "3 min read",
      "link": "/blog"
    },
    {
      "title": "New Research in Neurologic Music Therapy",
      "excerpt": "Latest findings in evidence-based interventions...",
      "date": "Sep 20, 2024",
      "readTime": "4 min read",
      "link": "/blog"
    }
  ]
}', true),

('home_blog_cta_button', 'Homepage Blog CTA Button', 'View All Posts', '{
  "link": "/blog",
  "icon": "BookOpen"
}', true),

-- Final CTA Section
('home_final_cta_title', 'Homepage Final CTA Title', 'Ready to Begin Your Journey?', '{
  "highlight": "Journey"
}', true),

('home_final_cta_description', 'Homepage Final CTA Description', 'Whether you''re seeking music therapy services, want to get involved, or have questions about our programs, we''re here to help you take the next step.', '{}', true),

('home_final_cta_buttons', 'Homepage Final CTA Buttons', 'Final CTA Buttons', '{
  "buttons": [
    {
      "text": "Contact Us Today",
      "link": "/contact",
      "icon": "Users",
      "type": "primary"
    },
    {
      "text": "Explore Programs",
      "link": "/programs",
      "icon": "Music",
      "type": "secondary"
    }
  ]
}', true)
ON CONFLICT (page_key) 
DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  metadata = EXCLUDED.metadata,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- =====================================================
-- ABOUT PAGE CONTENT
-- =====================================================

INSERT INTO page_content (page_key, title, content, metadata, is_active) VALUES
('about_hero_title', 'About Page Hero Title', 'Transforming Lives Through Music', '{
  "subtitle": "About NMTSA"
}', true),

('about_hero_description', 'About Page Hero Description', 'For over 40 years, Neurologic Music Therapy Services of Arizona has been at the forefront of evidence-based music therapy, helping individuals with neurologic conditions achieve their goals through the power of music.', '{}', true),

('about_mission', 'Mission Statement', 'To provide evidence-based neurologic music therapy services that enhance the quality of life for individuals with neurologic conditions and their families.', '{
  "icon": "Target"
}', true),

('about_vision', 'Vision Statement', 'To be the leading provider of neurologic music therapy services in Arizona, recognized for clinical excellence, innovation, and compassionate care.', '{
  "icon": "Eye"
}', true),

('about_values', 'Our Values', 'Core Values', '{
  "values": [
    {
      "icon": "Music",
      "title": "Evidence-Based",
      "description": "Using scientifically proven neurologic music therapy techniques to achieve measurable results."
    },
    {
      "icon": "Users",
      "title": "Family-Centered",
      "description": "Supporting individuals and their families throughout their therapeutic journey."
    },
    {
      "icon": "Heart",
      "title": "Compassionate",
      "description": "Delivering care with empathy, respect, and unwavering dedication to each client."
    }
  ]
}', true),

('about_history', 'Our History', 'Founded in 1984, NMTSA has grown from a small practice to Arizona''s leading provider of neurologic music therapy. Our team of board-certified music therapists brings decades of combined experience and continues to advance the field through clinical practice, research, and education.', '{
  "yearFounded": "1984",
  "milestones": [
    {"year": "1984", "event": "NMTSA Founded"},
    {"year": "1995", "event": "Expanded to multiple locations"},
    {"year": "2005", "event": "Became NMT training center"},
    {"year": "2020", "event": "Launched telehealth services"}
  ]
}', true)
ON CONFLICT (page_key) 
DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  metadata = EXCLUDED.metadata,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- =====================================================
-- PROGRAMS PAGE CONTENT
-- =====================================================

INSERT INTO page_content (page_key, title, content, metadata, is_active) VALUES
('programs_hero_title', 'Programs Page Hero Title', 'Our Programs', '{
  "subtitle": "Evidence-based neurologic music therapy programs"
}', true),

('programs_hero_description', 'Programs Page Hero Description', 'Evidence-based neurologic music therapy programs designed to meet your individual needs and help you achieve your goals.', '{}', true),

('programs_therapy', 'Therapy Program', 'Comprehensive neurologic music therapy sessions tailored to individual needs and conditions.', '{
  "features": [
    "Individual & group therapy sessions",
    "Evidence-based NMT interventions",
    "Personalized treatment plans",
    "Progress tracking and assessment",
    "Family consultation included"
  ],
  "ageRange": "18 months - 90+ years",
  "duration": "30-90 minutes",
  "frequency": "Weekly or bi-weekly"
}', true),

('programs_music_lessons', 'Music Lessons Program', 'Adaptive music education for individuals of all abilities and skill levels.', '{
  "features": [
    "One-on-one instruction",
    "Multiple instrument options",
    "Adapted teaching methods",
    "Performance opportunities",
    "Flexible scheduling"
  ],
  "ageRange": "All ages",
  "duration": "30-60 minutes",
  "frequency": "Weekly"
}', true),

('programs_professional_dev', 'Professional Development', 'Training and certification programs for healthcare professionals, educators, and caregivers.', '{
  "features": [
    "NMT training courses",
    "CEU opportunities",
    "Workshops and seminars",
    "Certification programs",
    "Online learning options"
  ]
}', true),

('programs_community_ed', 'Community Education', 'Educational workshops and support programs for families and communities.', '{
  "features": [
    "Family workshops",
    "Support groups",
    "Community presentations",
    "Resource library",
    "Monthly programs"
  ]
}', true),

('programs_conditions', 'Conditions We Treat', 'We specialize in treating a wide range of neurologic conditions.', '{
  "conditions": [
    "Stroke",
    "Traumatic Brain Injury",
    "Parkinson''s Disease",
    "Multiple Sclerosis",
    "Cerebral Palsy",
    "Autism Spectrum Disorder",
    "Dementia & Alzheimer''s",
    "Developmental Delays"
  ]
}', true)
ON CONFLICT (page_key) 
DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  metadata = EXCLUDED.metadata,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- =====================================================
-- CONTACT PAGE CONTENT
-- =====================================================

INSERT INTO page_content (page_key, title, content, metadata, is_active) VALUES
('contact_hero_title', 'Contact Page Hero Title', 'Get in Touch', '{
  "subtitle": "Contact NMTSA"
}', true),

('contact_info', 'Contact Information', 'Contact Us', '{
  "phone": "(555) 123-4567",
  "email": "info@nmtsa.org",
  "address": "123 Music Therapy Lane, Phoenix, AZ 85001",
  "mapLink": "https://maps.google.com"
}', true),

('contact_hours', 'Office Hours', 'Office Hours', '{
  "hours": [
    {"day": "Monday - Friday", "time": "8:00 AM - 5:00 PM"},
    {"day": "Saturday", "time": "9:00 AM - 2:00 PM"},
    {"day": "Sunday", "time": "Closed"}
  ]
}', true),

('contact_emergency', 'Emergency Contact', 'For emergencies, please call 911 or visit your nearest emergency room.', '{
  "afterHoursPhone": "(555) 123-4567"
}', true)
ON CONFLICT (page_key) 
DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  metadata = EXCLUDED.metadata,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- =====================================================
-- DONATE PAGE CONTENT
-- =====================================================

INSERT INTO page_content (page_key, title, content, metadata, is_active) VALUES
('donate_hero_title', 'Donate Page Hero Title', 'Support Our Mission', '{
  "subtitle": "Make a Difference"
}', true),

('donate_description', 'Donation Description', 'Your generous donation helps us provide life-changing music therapy services to individuals with neurologic conditions. Every contribution makes a difference in someone''s healing journey.', '{}', true),

('donate_impact', 'Donation Impact', 'Your Impact', '{
  "impactLevels": [
    {"amount": "$50", "impact": "Provides one therapy session for a child"},
    {"amount": "$150", "impact": "Funds a month of group therapy sessions"},
    {"amount": "$500", "impact": "Sponsors an entire family''s therapy program"},
    {"amount": "$1000", "impact": "Supports research and program development"}
  ]
}', true),

('donate_recognition', 'Donor Recognition', 'We deeply appreciate our donors and recognize their generosity.', '{
  "levels": [
    {"name": "Bronze Supporter", "range": "$1-$499"},
    {"name": "Silver Supporter", "range": "$500-$999"},
    {"name": "Gold Supporter", "range": "$1,000-$4,999"},
    {"name": "Platinum Supporter", "range": "$5,000+"}
  ]
}', true)
ON CONFLICT (page_key) 
DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  metadata = EXCLUDED.metadata,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- =====================================================
-- GET INVOLVED PAGE CONTENT
-- =====================================================

INSERT INTO page_content (page_key, title, content, metadata, is_active) VALUES
('get_involved_hero_title', 'Get Involved Page Hero Title', 'Join Our Team', '{
  "subtitle": "Get Involved"
}', true),

('get_involved_description', 'Get Involved Description', 'Whether you''re interested in volunteering, pursuing an internship, or joining our professional team, we have opportunities for you to make a difference.', '{}', true),

('get_involved_volunteer', 'Volunteer Opportunities', 'Make a difference in our community by volunteering with NMTSA.', '{
  "opportunities": [
    "Administrative support",
    "Event assistance",
    "Community outreach",
    "Fundraising support"
  ],
  "requirements": [
    "Background check required",
    "Minimum 4 hours per month",
    "Orientation training provided"
  ]
}', true),

('get_involved_internship', 'Internship Program', 'Gain hands-on experience in music therapy through our comprehensive internship program.', '{
  "benefits": [
    "Direct client contact",
    "Supervision by MT-BC professionals",
    "Diverse clinical populations",
    "Research opportunities"
  ],
  "requirements": [
    "Currently enrolled in AMTA-approved program",
    "Minimum 1200 hours",
    "Strong academic standing"
  ]
}', true),

('get_involved_employment', 'Employment Opportunities', 'Join our team of dedicated professionals making a difference in people''s lives.', '{
  "positions": [
    "Board-Certified Music Therapists",
    "Music Therapy Interns",
    "Administrative Staff",
    "Program Coordinators"
  ],
  "benefits": [
    "Competitive salary",
    "Health insurance",
    "Professional development",
    "Flexible scheduling"
  ]
}', true)
ON CONFLICT (page_key) 
DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  metadata = EXCLUDED.metadata,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Log completion
DO $$
BEGIN
  RAISE NOTICE 'Initial content seed completed successfully! Records inserted or updated.';
END $$;
