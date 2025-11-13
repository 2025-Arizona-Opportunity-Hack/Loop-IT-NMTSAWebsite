"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { 
  Save, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  ChevronUp,
  AlertCircle,
  CheckCircle,
  Info
} from "lucide-react";

interface ContentItem {
  id: string;
  page_key: string;
  title: string | null;
  content: string | null;
  metadata: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Section {
  id: string;
  title: string;
  description: string;
  items: {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'json' | 'image';
    placeholder?: string;
    help?: string;
  }[];
}

export default function HomePageContentManagement() {
  const [content, setContent] = useState<Record<string, ContentItem>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['hero', 'trust_credibility', 'process']));
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

  // Define homepage structure
  const sections: Section[] = [
    {
      id: 'hero',
      title: 'Hero Section',
      description: 'Main hero banner at the top of the homepage',
      items: [
        {
          key: 'home_hero_title',
          label: 'Hero Title',
          type: 'text',
          placeholder: 'Unleashing Unique Potential Through Music Therapy',
          help: 'Main heading displayed in the hero section'
        },
        {
          key: 'home_hero_subtitle',
          label: 'Hero Subtitle',
          type: 'textarea',
          placeholder: 'NMTSA provides comprehensive music therapy services...',
          help: 'Descriptive text below the main title'
        },
        {
          key: 'home_stats',
          label: 'Statistics',
          type: 'json',
          help: 'Array of statistics. Format: {"stats": [{"number": "40+", "label": "Years Serving"}]}'
        }
      ]
    },
    {
      id: 'about_preview',
      title: 'About Preview Section',
      description: 'About NMTSA preview section',
      items: [
        {
          key: 'home_about_preview_badge',
          label: 'Badge Text',
          type: 'text',
          placeholder: 'About NMTSA'
        },
        {
          key: 'home_about_preview_heading',
          label: 'Section Heading',
          type: 'text',
          placeholder: 'Unleashing the Unique Potential of Individuals with Disabilities',
          help: 'Main heading for the About section. Last 3 words will be gradient-styled.'
        },
        {
          key: 'home_about_preview_description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Since 1982, NMTSA has provided services to persons with...',
          help: 'Main description text below the heading'
        },
        {
          key: 'home_about_preview_button_text',
          label: 'Button Text',
          type: 'text',
          placeholder: 'Learn More About Us',
          help: 'Text displayed on the call-to-action button'
        },
        {
          key: 'home_about_preview_text',
          label: 'Alternative Text (Legacy)',
          type: 'textarea',
          placeholder: 'Since 1982, Neurologic Music Therapy Services...',
          help: 'Legacy field - kept for compatibility'
        },
        {
          key: 'home_about_preview_image',
          label: 'Image URL',
          type: 'image',
          placeholder: 'https://example.com/image.jpg',
          help: 'Use metadata for alt, width, height: {"alt": "Description", "width": 600, "height": 450}'
        }
      ]
    },
    {
      id: 'programs',
      title: 'Programs Overview',
      description: 'Programs section showcasing services',
      items: [
        {
          key: 'home_programs_badge',
          label: 'Badge Text',
          type: 'text',
          placeholder: 'Our Programs'
        },
        {
          key: 'home_programs_heading',
          label: 'Section Heading',
          type: 'text',
          placeholder: 'Comprehensive Services'
        },
        {
          key: 'home_programs_subtitle',
          label: 'Subtitle',
          type: 'text',
          placeholder: 'Evidence-based programs designed to meet diverse needs'
        },
        {
          key: 'home_programs',
          label: 'Programs List',
          type: 'json',
          help: 'Array of programs. Format: {"programs": [{"icon": "Music", "title": "Music Therapy", "description": "...", "color": "bg-nmtsa-500"}]}'
        }
      ]
    },
    {
      id: 'trust_credibility',
      title: 'Trust & Credibility Section',
      description: '"Why Choose NMTSA" section with trust builders',
      items: [
        {
          key: 'home_trust_section_title',
          label: 'Section Title',
          type: 'text',
          placeholder: 'Why Choose NMTSA?'
        },
        {
          key: 'home_trust_section_subtitle',
          label: 'Subtitle',
          type: 'text',
          placeholder: 'Trusted by families across Arizona...'
        },
        {
          key: 'home_trust_builders',
          label: 'Trust Builder Cards',
          type: 'json',
          help: 'Format: {"trustBuilders": [{"icon": "Award", "title": "40+ Years", "description": "..."}]}'
        },
        {
          key: 'home_trust_signals',
          label: 'Trust Signals Footer',
          type: 'json',
          help: 'Format: {"servingLabel": "Proudly Serving", "signals": [{"icon": "MapPin", "text": "Greater Phoenix Area"}]}'
        }
      ]
    },
    {
      id: 'process',
      title: 'How It Works / Process Section',
      description: 'Step-by-step journey section',
      items: [
        {
          key: 'home_process_title',
          label: 'Section Title',
          type: 'text',
          placeholder: 'How Music Therapy Works'
        },
        {
          key: 'home_process_subtitle',
          label: 'Subtitle',
          type: 'text',
          placeholder: 'Your journey with NMTSA: Simple, professional, and transformative'
        },
        {
          key: 'home_process_steps',
          label: 'Process Steps',
          type: 'json',
          help: 'Format: {"steps": [{"number": "01", "title": "...", "description": "...", "icon": "Phone"}]}'
        },
        {
          key: 'home_process_cta_text',
          label: 'CTA Text',
          type: 'text',
          placeholder: 'Ready to start your transformation journey?'
        }
      ]
    },
    {
      id: 'request_service_extended',
      title: 'Request Service Section (Extended)',
      description: 'Additional fields for the "Get Started" section',
      items: [
        {
          key: 'home_request_service_heading',
          label: 'Main Heading',
          type: 'text',
          placeholder: 'Ready to Transform Your Life with Music?'
        },
        {
          key: 'home_request_service_intro',
          label: 'Intro Text',
          type: 'textarea',
          placeholder: 'Join hundreds of families who have experienced...'
        },
        {
          key: 'home_request_service_quick_stats',
          label: 'Quick Statistics',
          type: 'json',
          help: 'Format: {"stats": [{"icon": "Clock", "label": "2-minute", "description": "consultation form"}]}'
        },
        {
          key: 'home_request_service_phone',
          label: 'Contact Phone',
          type: 'text',
          placeholder: '(602) 588-7631',
          help: 'Use metadata for raw number: {"raw": "602-588-7631"}'
        },
        {
          key: 'home_request_service_phone_label',
          label: 'Phone Label',
          type: 'text',
          placeholder: 'Have questions? Call us today'
        }
      ]
    },
    {
      id: 'testimonials_extended',
      title: 'Testimonials Section (Extended)',
      description: 'Additional testimonials metadata',
      items: [
        {
          key: 'home_testimonials_subtitle',
          label: 'Subtitle',
          type: 'text',
          placeholder: 'Hear from families, clients, and healthcare professionals'
        },
        {
          key: 'home_testimonials_overall_rating',
          label: 'Overall Rating',
          type: 'json',
          help: 'Format: {"rating": 5.0, "maxRating": 5, "reviewCount": "120+"}'
        },
        {
          key: 'home_testimonials_scroll_hint',
          label: 'Scroll Hint Text',
          type: 'text',
          placeholder: '← Swipe to see more testimonials →'
        }
      ]
    },
    {
      id: 'final_cta_extended',
      title: 'Final CTA Section (Extended)',
      description: 'Additional fields for bottom call-to-action',
      items: [
        {
          key: 'home_final_cta_phone_label',
          label: 'Phone Section Label',
          type: 'text',
          placeholder: 'Prefer to talk? We\'re here to help'
        },
        {
          key: 'home_final_cta_hours',
          label: 'Business Hours',
          type: 'text',
          placeholder: 'Mon-Fri 9AM-5PM MST',
          help: 'Use metadata for icon: {"icon": "Clock"}'
        }
      ]
    },
    {
      id: 'request_service',
      title: 'Request Service / Get Started (Original)',
      description: 'Original call-to-action section for service requests',
      items: [
        {
          key: 'home_request_service_title',
          label: 'Section Title',
          type: 'text',
          placeholder: 'Ready to Get Started?'
        },
        {
          key: 'home_request_service_description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Take the first step towards transformation...'
        }
      ]
    },
    {
      id: 'get_involved',
      title: 'Get Involved Section',
      description: 'Volunteer, internship, and employment opportunities',
      items: [
        {
          key: 'home_get_involved_badge',
          label: 'Badge Text',
          type: 'text',
          placeholder: 'Opportunities'
        },
        {
          key: 'home_get_involved_title',
          label: 'Section Title',
          type: 'text',
          placeholder: 'Get Involved'
        },
        {
          key: 'home_get_involved_subtitle',
          label: 'Subtitle',
          type: 'textarea',
          placeholder: 'Join our mission and make a meaningful impact...'
        },
        {
          key: 'home_get_involved_options',
          label: 'Involvement Options',
          type: 'json',
          help: 'Array of options. Format: {"options": [{"icon": "Heart", "title": "Volunteer", "description": "...", "link": "/contact"}]}'
        }
      ]
    },
    {
      id: 'donate',
      title: 'Donate / Support Section',
      description: 'Donation and support information',
      items: [
        {
          key: 'home_donate_title',
          label: 'Section Title',
          type: 'text',
          placeholder: 'Transform Lives Through Music'
        },
        {
          key: 'home_donate_description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Your support helps us provide life-changing music therapy...'
        },
        {
          key: 'home_donate_impact',
          label: 'Impact Cards',
          type: 'json',
          help: 'Array of impact levels. Format: {"impactCards": [{"amount": "$50", "description": "One therapy session"}]}'
        },
        {
          key: 'home_donate_why_choose',
          label: 'Why Choose NMTSA',
          type: 'text',
          placeholder: 'Why Choose NMTSA?',
          help: 'Use metadata for features: {"features": "40+ years • Evidence-based • Board-certified"}'
        }
      ]
    },
    {
      id: 'testimonials',
      title: 'Testimonials Section',
      description: 'Client testimonials and reviews',
      items: [
        {
          key: 'home_testimonials_badge',
          label: 'Badge Text',
          type: 'text',
          placeholder: 'Testimonials'
        },
        {
          key: 'home_testimonials_heading',
          label: 'Section Heading',
          type: 'text',
          placeholder: 'Stories of Transformation'
        },
        {
          key: 'home_testimonials',
          label: 'Testimonials List',
          type: 'json',
          help: 'Array with ratings (1-5). Format: {"testimonials": [{"quote": "...", "author": "Name", "role": "Parent", "rating": 5}]}'
        }
      ]
    },
    {
      id: 'blog',
      title: 'Blog Section',
      description: 'Latest blog posts preview',
      items: [
        {
          key: 'home_blog_badge',
          label: 'Badge Text',
          type: 'text',
          placeholder: 'Latest News'
        },
        {
          key: 'home_blog_heading',
          label: 'Section Heading',
          type: 'text',
          placeholder: 'From Our Blog'
        },
        {
          key: 'home_blog_subtitle',
          label: 'Subtitle',
          type: 'text',
          placeholder: 'Stay updated with the latest insights...'
        },
        {
          key: 'home_blog_posts',
          label: 'Blog Posts',
          type: 'json',
          help: 'Array of posts. Format: {"posts": [{"title": "...", "excerpt": "...", "date": "Oct 5, 2024", "readTime": "5 min read", "link": "/blog"}]}'
        }
      ]
    },
    {
      id: 'final_cta',
      title: 'Final Call-to-Action',
      description: 'Bottom CTA section before footer',
      items: [
        {
          key: 'home_final_cta_title',
          label: 'CTA Title',
          type: 'text',
          placeholder: 'Ready to Begin Your Journey?'
        },
        {
          key: 'home_final_cta_description',
          label: 'CTA Description',
          type: 'textarea',
          placeholder: 'Whether you\'re seeking music therapy services...'
        }
      ]
    }
  ];

  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("page_content")
        .select("*")
        .ilike('page_key', 'home_%');

      if (error) throw error;

      const contentMap: Record<string, ContentItem> = {};
      data?.forEach((item) => {
        contentMap[item.page_key] = item;
      });
      setContent(contentMap);
      
      showMessage('info', 'Content loaded successfully');
    } catch (error) {
      console.error('Error loading content:', error);
      showMessage('error', 'Failed to load content');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleSave = async (pageKey: string, value: string, isMetadata: boolean = false) => {
    setSaving(pageKey);
    try {
      const supabase = createClient();
      
      // Validate HTTPS for URLs
      const httpUrlRegex = /http:\/\/[^\s"']+/gi;
      if (httpUrlRegex.test(value)) {
        showMessage('error', 'HTTP URLs not allowed. Please use HTTPS URLs only.');
        setSaving(null);
        return;
      }

      const existingItem = content[pageKey];
      let metadata = existingItem?.metadata || {};
      let contentValue = existingItem?.content || '';

      if (isMetadata) {
        // Validate and parse JSON
        try {
          metadata = JSON.parse(value);
          // Check metadata for HTTP URLs
          if (httpUrlRegex.test(JSON.stringify(metadata))) {
            showMessage('error', 'HTTP URLs found in metadata. Please use HTTPS URLs only.');
            setSaving(null);
            return;
          }
        } catch (e) {
          showMessage('error', 'Invalid JSON format');
          setSaving(null);
          return;
        }
      } else {
        contentValue = value;
      }

      const payload = {
        page_key: pageKey,
        title: existingItem?.title || `Homepage - ${pageKey.replace('home_', '').replace(/_/g, ' ')}`,
        content: contentValue,
        metadata,
        is_active: existingItem?.is_active !== undefined ? existingItem.is_active : true
      };

      const { data, error } = await supabase
        .from("page_content")
        .upsert(payload, { onConflict: "page_key" })
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setContent(prev => ({
        ...prev,
        [pageKey]: data
      }));

      showMessage('success', `${pageKey} saved successfully!`);
    } catch (error: any) {
      console.error('Error saving:', error);
      showMessage('error', `Failed to save: ${error.message}`);
    } finally {
      setSaving(null);
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const showMessage = (type: 'success' | 'error' | 'info', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const renderField = (item: typeof sections[0]['items'][0], sectionId: string) => {
    const contentItem = content[item.key];
    const value = item.type === 'json' 
      ? JSON.stringify(contentItem?.metadata || {}, null, 2)
      : (contentItem?.content || '');

    return (
      <div key={item.key} className="border-b border-gray-200 pb-6 last:border-b-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              {item.label}
            </label>
            {item.help && (
              <p className="text-xs text-gray-500 mb-2 flex items-start">
                <Info className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                <span>{item.help}</span>
              </p>
            )}
          </div>
          <div className="flex items-center ml-4 space-x-2">
            {contentItem && (
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                contentItem.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {contentItem.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </span>
            )}
          </div>
        </div>

        {item.type === 'text' && (
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                const newContent = { ...content };
                if (!newContent[item.key]) {
                  newContent[item.key] = {
                    id: '',
                    page_key: item.key,
                    title: item.label,
                    content: '',
                    metadata: {},
                    is_active: true,
                    created_at: '',
                    updated_at: ''
                  };
                }
                newContent[item.key].content = e.target.value;
                setContent(newContent);
              }}
              placeholder={item.placeholder}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSave(item.key, value, false)}
              disabled={saving === item.key}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              {saving === item.key ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        )}

        {item.type === 'textarea' && (
          <div className="space-y-2">
            <textarea
              value={value}
              onChange={(e) => {
                const newContent = { ...content };
                if (!newContent[item.key]) {
                  newContent[item.key] = {
                    id: '',
                    page_key: item.key,
                    title: item.label,
                    content: '',
                    metadata: {},
                    is_active: true,
                    created_at: '',
                    updated_at: ''
                  };
                }
                newContent[item.key].content = e.target.value;
                setContent(newContent);
              }}
              placeholder={item.placeholder}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSave(item.key, value, false)}
              disabled={saving === item.key}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              {saving === item.key ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        )}

        {item.type === 'image' && (
          <div className="space-y-2">
            <input
              type="url"
              value={value}
              onChange={(e) => {
                const newContent = { ...content };
                if (!newContent[item.key]) {
                  newContent[item.key] = {
                    id: '',
                    page_key: item.key,
                    title: item.label,
                    content: '',
                    metadata: {},
                    is_active: true,
                    created_at: '',
                    updated_at: ''
                  };
                }
                newContent[item.key].content = e.target.value;
                setContent(newContent);
              }}
              placeholder={item.placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {contentItem?.metadata && (
              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                <strong>Metadata:</strong> {JSON.stringify(contentItem.metadata)}
              </div>
            )}
            <button
              onClick={() => handleSave(item.key, value, false)}
              disabled={saving === item.key}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              {saving === item.key ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        )}

        {item.type === 'json' && (
          <div className="space-y-2">
            <textarea
              value={value}
              onChange={(e) => {
                const newContent = { ...content };
                if (!newContent[item.key]) {
                  newContent[item.key] = {
                    id: '',
                    page_key: item.key,
                    title: item.label,
                    content: '',
                    metadata: {},
                    is_active: true,
                    created_at: '',
                    updated_at: ''
                  };
                }
                // For JSON fields, we'll validate and save to metadata on save, not on change
                setContent(newContent);
              }}
              placeholder='{"key": "value"}'
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
            <button
              onClick={() => handleSave(item.key, value, true)}
              disabled={saving === item.key}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              {saving === item.key ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Loading homepage content...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Homepage Content
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all homepage content. Changes are live immediately.
            </p>
          </div>
          <button
            onClick={loadContent}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Message Banner */}
        {message && (
          <div className={`p-4 rounded-lg flex items-center space-x-2 ${
            message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
            message.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
            'bg-blue-50 text-blue-800 border border-blue-200'
          }`}>
            {message.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {message.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {message.type === 'info' && <Info className="w-5 h-5" />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Content Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="text-left">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {section.description}
                  </p>
                </div>
                {expandedSections.has(section.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedSections.has(section.id) && (
                <div className="px-6 py-4 border-t border-gray-200 space-y-6">
                  {section.items.map((item) => renderField(item, section.id))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Tips for Managing Content
          </h3>
          <ul className="text-sm text-blue-800 space-y-1 ml-7">
            <li>• Changes are saved individually - click Save after editing each field</li>
            <li>• All changes are <strong>live immediately</strong> - refresh homepage to see updates</li>
            <li>• HTTPS URLs only - HTTP URLs will be rejected for security</li>
            <li>• JSON fields must be valid JSON format</li>
            <li>• Use the format examples in the help text for complex fields</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
