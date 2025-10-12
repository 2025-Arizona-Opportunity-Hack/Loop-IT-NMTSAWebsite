"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit, Trash2, Search, Filter, X, Save, Eye, EyeOff, FileJson, Type, Image as ImageIcon, Home, ExternalLink } from "lucide-react";
import Link from "next/link";

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

interface ContentPage {
  id: string;
  page: string;
  count: number;
  sections: string[];
}

// Helper function to convert page_key to readable description
const getReadableDescription = (pageKey: string): string => {
  const descriptions: Record<string, string> = {
    // Homepage - Hero Section
    'home_hero_title': 'Homepage - Main Hero Title',
    'home_hero_subtitle': 'Homepage - Hero Subtitle/Description',
    'home_hero_cta': 'Homepage - Hero Call-to-Action Buttons',
    'home_stats': 'Homepage - Statistics Section (Years, Families, Sessions)',
    
    // Homepage - About Preview
    'home_about_preview_badge': 'Homepage - About Preview Badge Text',
    'home_about_preview_text': 'Homepage - About Preview Description',
    'home_about_preview_image': 'Homepage - About Preview Image URL + Metadata',
    
    // Homepage - Programs Section
    'home_programs_badge': 'Homepage - Programs Section Badge',
    'home_programs_heading': 'Homepage - Programs Section Heading',
    'home_programs_subtitle': 'Homepage - Programs Section Subtitle',
    'home_programs_title': 'Homepage - Programs Section Title',
    'home_programs': 'Homepage - Programs Cards (Therapy, Lessons, Education)',
    
    // Homepage - Request Service
    'home_request_service_title': 'Homepage - Request Service Section Title',
    'home_request_service_description': 'Homepage - Request Service Description',
    
    // Homepage - Get Involved
    'home_get_involved_badge': 'Homepage - Get Involved Badge',
    'home_get_involved_title': 'Homepage - Get Involved Section Title',
    'home_get_involved_subtitle': 'Homepage - Get Involved Subtitle',
    'home_get_involved_options': 'Homepage - Get Involved Options (Volunteer, Internship, Employment)',
    
    // Homepage - Donate/Support
    'home_donate_title': 'Homepage - Donate Section Title',
    'home_donate_description': 'Homepage - Donate Section Description',
    'home_donate_impact': 'Homepage - Donation Impact Cards',
    'home_donate_why_choose': 'Homepage - Why Choose NMTSA Section',
    
    // Homepage - Testimonials
    'home_testimonials_badge': 'Homepage - Testimonials Badge',
    'home_testimonials_heading': 'Homepage - Testimonials Section Heading',
    'home_testimonials_title': 'Homepage - Testimonials Section Title',
    'home_testimonials': 'Homepage - Client Testimonials with Ratings',
    
    // Homepage - Blog
    'home_blog_badge': 'Homepage - Blog Section Badge',
    'home_blog_heading': 'Homepage - Blog Section Heading',
    'home_blog_subtitle': 'Homepage - Blog Section Subtitle',
    'home_blog_posts': 'Homepage - Blog Post Previews',
    
    // Homepage - Final CTA
    'home_final_cta_title': 'Homepage - Final CTA Title',
    'home_final_cta_description': 'Homepage - Final CTA Description',
    'home_cta': 'Homepage - Bottom Call-to-Action Section',
    
    // About Page
    'about_hero_title': 'About Page - Main Hero Title',
    'about_hero_description': 'About Page - Hero Description Text',
    'about_mission': 'About Page - Mission Statement',
    'about_vision': 'About Page - Vision Statement',
    'about_values': 'About Page - Core Values Section',
    'about_history': 'About Page - Organization History',
    'about_team': 'About Page - Team Members Section',
    
    // Programs Page
    'programs_hero_title': 'Programs Page - Main Hero Title',
    'programs_hero_description': 'Programs Page - Hero Description',
    'programs_therapy': 'Programs Page - Therapy Program Details',
    'programs_music_lessons': 'Programs Page - Music Lessons Program',
    'programs_professional_dev': 'Programs Page - Professional Development',
    'programs_community_ed': 'Programs Page - Community Education',
    'programs_conditions': 'Programs Page - Conditions We Treat',
    
    // Contact Page
    'contact_hero_title': 'Contact Page - Main Title',
    'contact_info': 'Contact Page - Contact Information (Phone, Email, Address)',
    'contact_hours': 'Contact Page - Office Hours',
    'contact_emergency': 'Contact Page - Emergency Contact Info',
    
    // Donate Page
    'donate_hero_title': 'Donate Page - Main Title',
    'donate_description': 'Donate Page - Donation Description',
    'donate_impact': 'Donate Page - Donation Impact Levels',
    'donate_recognition': 'Donate Page - Donor Recognition Tiers',
    
    // Get Involved Page
    'get_involved_hero_title': 'Get Involved Page - Main Title',
    'get_involved_description': 'Get Involved Page - Description',
    'get_involved_volunteer': 'Get Involved Page - Volunteer Opportunities',
    'get_involved_internship': 'Get Involved Page - Internship Program',
    'get_involved_employment': 'Get Involved Page - Employment Opportunities',
  };
  
  return descriptions[pageKey] || pageKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export default function ContentManagementPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPage, setSelectedPage] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    page_key: "",
    title: "",
    content: "",
    metadata: "{}",
    is_active: true
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .order("page_key", { ascending: true });

    if (!error) {
      setContent(data || []);
    }
    setLoading(false);
  };

  const handleOpenModal = (item?: ContentItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        page_key: item.page_key,
        title: item.title || "",
        content: item.content || "",
        metadata: JSON.stringify(item.metadata || {}, null, 2),
        is_active: item.is_active
      });
    } else {
      setEditingItem(null);
      setFormData({
        page_key: "",
        title: "",
        content: "",
        metadata: "{}",
        is_active: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      page_key: "",
      title: "",
      content: "",
      metadata: "{}",
      is_active: true
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      
      // Validate for HTTP URLs (insecure)
      const httpUrlRegex = /http:\/\/[^\s"']+/gi;
      
      // Check content field for HTTP URLs
      if (formData.content && httpUrlRegex.test(formData.content)) {
        alert("❌ Security Error: HTTP URLs are not allowed. Please use HTTPS URLs only.\n\nHTTP URLs are insecure and can be intercepted. Please find an HTTPS version of the image/link or choose a different resource.");
        setSaving(false);
        return;
      }
      
      let metadata;
      try {
        metadata = JSON.parse(formData.metadata);
        
        // Check metadata for HTTP URLs
        const metadataString = JSON.stringify(metadata);
        if (httpUrlRegex.test(metadataString)) {
          alert("❌ Security Error: HTTP URLs found in metadata. Please use HTTPS URLs only.\n\nHTTP URLs are insecure and can be intercepted. Please update all URLs to use HTTPS.");
          setSaving(false);
          return;
        }
      } catch (e) {
        alert("Invalid JSON in metadata field");
        setSaving(false);
        return;
      }

      const payload = {
        page_key: formData.page_key,
        title: formData.title,
        content: formData.content,
        metadata,
        is_active: formData.is_active
      };

      const { error } = await supabase
        .from("page_content")
        .upsert(payload, { onConflict: "page_key" });

      if (error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("✅ Content saved successfully!");
        handleCloseModal();
        loadContent();
      }
    } catch (error) {
      alert("An error occurred while saving");
    }
    setSaving(false);
  };

  const handleDelete = async (item: ContentItem) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) {
      return;
    }

    const supabase = createClient();
    const { error } = await supabase
      .from("page_content")
      .delete()
      .eq("id", item.id);

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert("Content deleted successfully!");
      loadContent();
    }
  };

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.page_key?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPage =
      selectedPage === "all" || item.page_key.startsWith(selectedPage);
    return matchesSearch && matchesPage;
  });

  const uniquePages = Array.from(new Set(content.map((c) => c.page_key.split("_")[0])));

  // Generate dynamic page sections from actual content
  const contentPages: ContentPage[] = uniquePages.map(pageId => {
    const pageItems = content.filter(item => item.page_key.startsWith(pageId + "_"));
    const sections = pageItems.map(item => {
      const parts = item.page_key.split("_");
      parts.shift(); // Remove page prefix
      return parts.join("_");
    });
    
    const pageNames: Record<string, string> = {
      'home': 'Homepage',
      'about': 'About Page',
      'programs': 'Programs Page',
      'contact': 'Contact Page',
      'donate': 'Donate Page',
      'blog': 'Blog Page',
      'get': 'Get Involved Page'
    };
    
    return {
      id: pageId,
      page: pageNames[pageId] || `${pageId.charAt(0).toUpperCase()}${pageId.slice(1)} Page`,
      count: pageItems.length,
      sections: sections
    };
  }).filter(page => page.count > 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Content Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage website content and pages dynamically
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Content</span>
          </button>
        </div>

        {/* Homepage Quick Access Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Home className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Homepage Content Manager</h2>
                <p className="text-blue-100">
                  Dedicated interface for managing all homepage sections with live preview
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/"
                target="_blank"
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Homepage</span>
              </Link>
              <Link
                href="/admin/content/homepage"
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Manage Homepage</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Access Sections */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access by Page</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentPages.map((pageSection) => (
              <div
                key={pageSection.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => setSelectedPage(pageSection.id)}
              >
                <h3 className="font-semibold text-gray-900 mb-2">{pageSection.page}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {pageSection.count} content items
                </p>
                <div className="text-xs text-gray-500">
                  <div className="font-medium mb-1">Sections:</div>
                  <div className="flex flex-wrap gap-1">
                    {pageSection.sections.slice(0, 3).map((section, idx) => (
                      <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {section.replace(/_/g, ' ')}
                      </span>
                    ))}
                    {pageSection.sections.length > 3 && (
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        +{pageSection.sections.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Pages</option>
                {uniquePages.map((page) => (
                  <option key={page} value={page}>
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-600">Loading...</div>
          ) : filteredContent.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-4">No content found</p>
              <button
                onClick={() => handleOpenModal()}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first content item
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Title
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700 w-2/5">
                      Content
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Last Updated
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContent.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {item.title || "Untitled"}
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm max-w-md">
                        <div className="line-clamp-2" title={item.content || ''}>
                          {item.content ? (
                            item.content.length > 100 
                              ? `${item.content.substring(0, 100)}...` 
                              : item.content
                          ) : (
                            <span className="text-gray-400 italic">No content</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {item.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {new Date(item.updated_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleOpenModal(item)}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingItem ? "Edit Content" : "Add New Content"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Readable Description (if editing existing) */}
              {editingItem && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Editing:</strong> {getReadableDescription(editingItem.page_key)}
                  </p>
                </div>
              )}

              {/* Page Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Type className="w-4 h-4 inline mr-1" />
                  Page Key * {editingItem && <span className="text-gray-500 text-xs">(Technical ID)</span>}
                </label>
                <input
                  type="text"
                  value={formData.page_key}
                  onChange={(e) => setFormData({ ...formData, page_key: e.target.value })}
                  placeholder="e.g., home_hero_title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  required
                  disabled={!!editingItem}
                />
                {!editingItem && (
                  <p className="text-xs text-gray-500 mt-1">
                    Unique identifier for this content (use format: page_section_element)
                  </p>
                )}
                {editingItem && (
                  <p className="text-xs text-gray-500 mt-1">
                    Page key cannot be changed after creation
                  </p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Content title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Main content text..."
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Metadata */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileJson className="w-4 h-4 inline mr-1" />
                  Metadata (JSON)
                </label>
                <textarea
                  value={formData.metadata}
                  onChange={(e) => setFormData({ ...formData, metadata: e.target.value })}
                  placeholder='{"key": "value"}'
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Additional structured data (images, links, arrays, etc.)
                </p>
              </div>

              {/* Active Status */}
              <div className="flex items-center space-x-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span className="text-sm font-medium text-gray-700">
                  {formData.is_active ? (
                    <>
                      <Eye className="w-4 h-4 inline mr-1" />
                      Active (Visible on website)
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-4 h-4 inline mr-1" />
                      Inactive (Hidden from website)
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-end space-x-3 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                <span>{saving ? "Saving..." : "Save Content"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
