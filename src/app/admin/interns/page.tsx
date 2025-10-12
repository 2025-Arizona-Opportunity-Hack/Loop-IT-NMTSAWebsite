"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Plus,
  Search,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

export default function InternsPage() {
  const [interns, setInterns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadInterns();
  }, []);

  const loadInterns = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("interns")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setInterns(data);
    }
    setLoading(false);
  };

  const filteredInterns = interns.filter(
    (intern) =>
      intern.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.school?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Intern Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage interns and track their hours
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Intern</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Interns</p>
                <p className="text-3xl font-bold text-gray-900">
                  {interns.length}
                </p>
              </div>
              <GraduationCap className="w-12 h-12 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Interns</p>
                <p className="text-3xl font-bold text-green-600">
                  {interns.filter((i) => i.status === "active").length}
                </p>
              </div>
              <GraduationCap className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Hours</p>
                <p className="text-3xl font-bold text-blue-600">
                  {interns.reduce((sum, i) => sum + (i.total_hours || 0), 0)}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search interns by name, email, or school..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Interns Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-600">Loading...</div>
          ) : filteredInterns.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              No interns found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Contact
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      School
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Start Date
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Hours
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
                  {filteredInterns.map((intern) => (
                    <tr
                      key={intern.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                            <span className="text-orange-600 font-semibold">
                              {intern.name?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {intern.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            {intern.email}
                          </div>
                          {intern.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-4 h-4 mr-2" />
                              {intern.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {intern.school || "N/A"}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {intern.start_date
                          ? new Date(intern.start_date).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-4 px-6 font-semibold text-blue-600">
                        {intern.total_hours || 0}h
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            intern.status === "active"
                              ? "bg-green-100 text-green-800"
                              : intern.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {intern.status || "Active"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Edit
                        </button>
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
