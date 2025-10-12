"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Search, FileSpreadsheet, Eye, Download } from "lucide-react";

export default function FormsPage() {
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setForms(data);
    }
    setLoading(false);
  };

  const filteredForms = forms.filter(
    (form) =>
      form.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Forms Management
            </h1>
            <p className="text-gray-600 mt-2">Manage forms and submissions</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create Form</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Forms</p>
                <p className="text-3xl font-bold text-gray-900">
                  {forms.length}
                </p>
              </div>
              <FileSpreadsheet className="w-12 h-12 text-indigo-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Forms</p>
                <p className="text-3xl font-bold text-green-600">
                  {forms.filter((f) => f.status === "active").length}
                </p>
              </div>
              <FileSpreadsheet className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Submissions</p>
                <p className="text-3xl font-bold text-blue-600">
                  {forms.reduce((sum, f) => sum + (f.submissions || 0), 0)}
                </p>
              </div>
              <FileSpreadsheet className="w-12 h-12 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search forms by title or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Forms Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-600">Loading...</div>
          ) : filteredForms.length === 0 ? (
            <div className="p-8 text-center text-gray-600">No forms found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Form Title
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Type
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Submissions
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Created
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredForms.map((form) => (
                    <tr
                      key={form.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <FileSpreadsheet className="w-8 h-8 text-indigo-500" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {form.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {form.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {form.type || "General"}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-blue-600">
                        {form.submissions || 0}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {form.created_at
                          ? new Date(form.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            form.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {form.status || "Active"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
                            <Download className="w-4 h-4" />
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
    </AdminLayout>
  );
}
