"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Plus,
  Search,
  FileSpreadsheet,
  Eye,
  Download,
  Settings,
  Mail,
  Phone,
  User,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Trash2,
  Edit,
  Copy,
  Link,
  FileText,
  Save,
  ToggleRight,
  ToggleLeft,
  MessageSquare,
  Code,
} from "lucide-react";

type FormSubmission = {
  id: string;
  form_type: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  metadata: any;
  status: string;
  created_at: string;
  updated_at: string;
};

type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkbox" | "radio" | "number" | "date";
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
};

type FormTemplate = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  fields: FormField[];
  active: boolean;
  frontend_route: string | null;
  created_at: string;
  updated_at: string;
};

export default function FormsPage() {
  const [activeTab, setActiveTab] = useState<"submissions" | "forms">("submissions");
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Partial<FormTemplate> | null>(null);

  useEffect(() => {
    if (activeTab === "submissions") {
      loadSubmissions();
    } else {
      loadTemplates();
    }
  }, [activeTab]);

  const loadSubmissions = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSubmissions(data);
    }
    setLoading(false);
  };

  const loadTemplates = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("form_templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setTemplates(data as any);
    }
    setLoading(false);
  };

  const filteredSubmissions = submissions.filter(
    (form) =>
      form.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.form_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTemplates = templates.filter(
    (template) =>
      template.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateSubmissionStatus = async (id: string, status: string) => {
    const supabase = createClient();
    await supabase.from("form_submissions").update({ status }).eq("id", id);
    await loadSubmissions();
    if (selectedSubmission?.id === id) {
      setSelectedSubmission({ ...selectedSubmission, status });
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    const supabase = createClient();
    await supabase.from("form_submissions").delete().eq("id", id);
    await loadSubmissions();
    setSelectedSubmission(null);
  };

  const saveTemplate = async () => {
    if (!editingTemplate || !editingTemplate.name || !editingTemplate.slug) return;
    const supabase = createClient();
    
    if (editingTemplate.id) {
      await supabase.from("form_templates").update(editingTemplate).eq("id", editingTemplate.id);
    } else {
      await supabase.from("form_templates").insert({
        name: editingTemplate.name!,
        slug: editingTemplate.slug!,
        description: editingTemplate.description,
        fields: editingTemplate.fields || [] as any,
        active: editingTemplate.active ?? true,
        frontend_route: editingTemplate.frontend_route,
      });
    }
    
    await loadTemplates();
    setShowTemplateModal(false);
    setEditingTemplate(null);
  };

  const deleteTemplate = async (id: string) => {
    if (!confirm("Delete this form template?")) return;
    const supabase = createClient();
    await supabase.from("form_templates").delete().eq("id", id);
    await loadTemplates();
  };

  const toggleTemplateStatus = async (id: string, currentStatus: boolean) => {
    const supabase = createClient();
    await supabase.from("form_templates").update({ active: !currentStatus }).eq("id", id);
    await loadTemplates();
  };

  const addField = () => {
    if (!editingTemplate) return;
    const newField: FormField = {
      name: `field_${(editingTemplate.fields?.length || 0) + 1}`,
      label: "New Field",
      type: "text",
      required: false,
    };
    setEditingTemplate({
      ...editingTemplate,
      fields: [...(editingTemplate.fields || []), newField],
    });
  };

  const updateField = (index: number, field: FormField) => {
    if (!editingTemplate) return;
    const updatedFields = [...(editingTemplate.fields || [])];
    updatedFields[index] = field;
    setEditingTemplate({ ...editingTemplate, fields: updatedFields });
  };

  const removeField = (index: number) => {
    if (!editingTemplate) return;
    const updatedFields = [...(editingTemplate.fields || [])];
    updatedFields.splice(index, 1);
    setEditingTemplate({ ...editingTemplate, fields: updatedFields });
  };

  const copyFormLink = (slug: string, route: string | null) => {
    const link = route ? `${window.location.origin}${route}` : `${window.location.origin}/forms/${slug}`;
    navigator.clipboard.writeText(link);
    alert("Form link copied!");
  };

  const stats = {
    totalSubmissions: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    reviewed: submissions.filter((s) => s.status === "reviewed").length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Forms Management</h1>
            <p className="text-gray-600 mt-2">
              {activeTab === "submissions" ? "View and manage form submissions" : "Create and manage forms"}
            </p>
          </div>
          {activeTab === "forms" && (
            <button
              onClick={() => {
                setEditingTemplate({ name: "", slug: "", description: "", fields: [], active: true, frontend_route: "" });
                setShowTemplateModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Form</span>
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("submissions")}
              className={`flex-1 px-6 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                activeTab === "submissions"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FileSpreadsheet className="w-5 h-5" />
              Form Submissions
            </button>
            <button
              onClick={() => setActiveTab("forms")}
              className={`flex-1 px-6 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                activeTab === "forms"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Settings className="w-5 h-5" />
              Forms
            </button>
          </div>
        </div>

        {/* Submissions Tab */}
        {activeTab === "submissions" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Submissions</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalSubmissions}</p>
                  </div>
                  <FileSpreadsheet className="w-12 h-12 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Pending</p>
                    <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
                  </div>
                  <Clock className="w-12 h-12 text-orange-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Reviewed</p>
                    <p className="text-3xl font-bold text-green-600">{stats.reviewed}</p>
                  </div>
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submissions Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-gray-600">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4">Loading submissions...</p>
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="p-8 text-center text-gray-600">
                  <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium">No submissions found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-6 font-semibold text-gray-700">Submitter</th>
                        <th className="text-left py-3 px-6 font-semibold text-gray-700">Form Type</th>
                        <th className="text-left py-3 px-6 font-semibold text-gray-700">Contact</th>
                        <th className="text-left py-3 px-6 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-6 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-6 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubmissions.map((submission) => (
                        <tr key={submission.id} className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer">
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                {submission.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{submission.name}</p>
                                <p className="text-sm text-gray-500">{submission.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {submission.form_type}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-600">{submission.email}</td>
                          <td className="py-4 px-6 text-sm text-gray-600">
                            {new Date(submission.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              submission.status === "pending" ? "bg-orange-100 text-orange-800" :
                              submission.status === "reviewed" ? "bg-blue-100 text-blue-800" :
                              "bg-green-100 text-green-800"
                            }`}>
                              {submission.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <button
                              onClick={() => setSelectedSubmission(submission)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* Forms Tab */}
        {activeTab === "forms" && (
          <>
            {/* Search */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search forms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Forms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full p-8 text-center text-gray-600">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4">Loading forms...</p>
                </div>
              ) : filteredTemplates.length === 0 ? (
                <div className="col-span-full p-8 text-center text-gray-600">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium">No forms found</p>
                  <p className="text-sm mt-2">Create your first form to get started</p>
                </div>
              ) : (
                filteredTemplates.map((template) => (
                  <div key={template.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{template.description || "No description"}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs text-gray-500">{template.fields.length} fields</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${template.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                        {template.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4 text-xs text-gray-500">
                      <div><strong>Slug:</strong> {template.slug}</div>
                      {template.frontend_route && <div><strong>Route:</strong> {template.frontend_route}</div>}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyFormLink(template.slug, template.frontend_route)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm"
                      >
                        <Link className="w-4 h-4" />
                        Copy Link
                      </button>
                      <button
                        onClick={() => { setEditingTemplate(template); setShowTemplateModal(true); }}
                        className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleTemplateStatus(template.id, template.active)}
                        className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        {template.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => deleteTemplate(template.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedSubmission(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedSubmission.name}</h2>
                  <p className="text-blue-100">{selectedSubmission.form_type} Submission</p>
                </div>
                <button onClick={() => setSelectedSubmission(null)} className="p-2 hover:bg-white/20 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Update Status</h3>
                <div className="flex gap-2">
                  {["pending", "reviewed", "resolved"].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateSubmissionStatus(selectedSubmission.id, status)}
                      className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                        selectedSubmission.status === status
                          ? "bg-blue-500 text-white"
                          : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {status === "pending" && <Clock className="w-4 h-4" />}
                      {status === "reviewed" && <Eye className="w-4 h-4" />}
                      {status === "resolved" && <CheckCircle className="w-4 h-4" />}
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Name</p>
                    <p className="font-medium">{selectedSubmission.name}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-medium break-all">{selectedSubmission.email}</p>
                  </div>
                  {selectedSubmission.phone && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Phone</p>
                      <p className="font-medium">{selectedSubmission.phone}</p>
                    </div>
                  )}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Submitted</p>
                    <p className="font-medium">{new Date(selectedSubmission.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              {selectedSubmission.message && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Message</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>
                </div>
              )}
              <div className="flex gap-4 pt-4 border-t">
                <button
                  onClick={() => window.location.href = `mailto:${selectedSubmission.email}`}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </button>
                <button
                  onClick={() => deleteSubmission(selectedSubmission.id)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Template Modal */}
      {showTemplateModal && editingTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowTemplateModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{editingTemplate.id ? "Edit Form" : "Create New Form"}</h2>
                <button onClick={() => { setShowTemplateModal(false); setEditingTemplate(null); }} className="p-2 hover:bg-white/20 rounded-lg">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Form Name *</label>
                    <input
                      type="text"
                      value={editingTemplate.name || ""}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Contact Form"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                    <input
                      type="text"
                      value={editingTemplate.slug || ""}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, slug: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., contact"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editingTemplate.description || ""}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Describe the form"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frontend Route</label>
                  <input
                    type="text"
                    value={editingTemplate.frontend_route || ""}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, frontend_route: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., /contact"
                  />
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingTemplate.active}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, active: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Form Fields</h3>
                  <button onClick={addField} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Field
                  </button>
                </div>
                {editingTemplate.fields && editingTemplate.fields.length > 0 ? (
                  <div className="space-y-4">
                    {editingTemplate.fields.map((field, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Field {index + 1}</h4>
                          <button onClick={() => removeField(index)} className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                            <input
                              type="text"
                              value={field.name}
                              onChange={(e) => updateField(index, { ...field, name: e.target.value })}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Label</label>
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => updateField(index, { ...field, label: e.target.value })}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                            <select
                              value={field.type}
                              onChange={(e) => updateField(index, { ...field, type: e.target.value as any })}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="text">Text</option>
                              <option value="email">Email</option>
                              <option value="tel">Phone</option>
                              <option value="textarea">Textarea</option>
                              <option value="select">Select</option>
                              <option value="number">Number</option>
                              <option value="date">Date</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <input
                            type="text"
                            value={field.placeholder || ""}
                            onChange={(e) => updateField(index, { ...field, placeholder: e.target.value })}
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Placeholder"
                          />
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => updateField(index, { ...field, required: e.target.checked })}
                              className="w-4 h-4"
                            />
                            <span className="text-xs font-medium text-gray-700">Required</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Code className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p>No fields yet. Click &ldquo;Add Field&rdquo; to start.</p>
                  </div>
                )}
              </div>
              <div className="flex gap-4 pt-4 border-t">
                <button onClick={saveTemplate} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Save Form
                </button>
                <button onClick={() => { setShowTemplateModal(false); setEditingTemplate(null); }} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
