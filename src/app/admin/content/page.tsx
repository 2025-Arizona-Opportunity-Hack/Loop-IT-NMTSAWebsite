"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";

export default function ContentManagementPage() {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPage, setSelectedPage] = useState("all");

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setContent(data || []);
    }
    setLoading(false);
  };

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.page_key?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPage =
      selectedPage === "all" || item.page_key === selectedPage;
    return matchesSearch && matchesPage;
  });

  const pages = Array.from(new Set(content.map((c) => c.page_key)));

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
              Manage website content and pages
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Content</span>
          </button>
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
                {pages.map((page) => (
                  <option key={page} value={page}>
                    {page}
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
            <div className="p-8 text-center text-gray-600">
              No content found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Title
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Page
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
                      <td className="py-4 px-6 text-gray-600">
                        {item.page_key}
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
                          <button className="text-blue-600 hover:text-blue-700">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-700">
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
    </AdminLayout>
  );
}
