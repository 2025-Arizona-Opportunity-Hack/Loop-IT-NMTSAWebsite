"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Search, Users, Clock, CheckCircle } from "lucide-react";

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadVolunteers();
  }, []);

  const loadVolunteers = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("volunteers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setVolunteers(data || []);
    }
    setLoading(false);
  };

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch =
      volunteer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || volunteer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: volunteers.length,
    active: volunteers.filter((v) => v.status === "active").length,
    totalHours: volunteers.reduce((sum, v) => sum + (v.total_hours || 0), 0),
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Volunteer Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage volunteers and track their contributions
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Volunteer</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Volunteers</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <Users className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Volunteers</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.active}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Hours</p>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.totalHours}
                </p>
              </div>
              <Clock className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search volunteers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
          </div>
        </div>

        {/* Volunteers Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-600">Loading...</div>
          ) : filteredVolunteers.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              No volunteers found
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
                      Hours
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Skills
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Background Check
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVolunteers.map((volunteer) => (
                    <tr
                      key={volunteer.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {volunteer.name}
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">
                            {volunteer.email}
                          </p>
                          {volunteer.phone && (
                            <p className="text-sm text-gray-500">
                              {volunteer.phone}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-purple-600">
                        {volunteer.total_hours || 0} hrs
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1">
                          {volunteer.skills
                            ?.slice(0, 3)
                            .map((skill: string, i: number) => (
                              <span
                                key={i}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          {volunteer.skills?.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{volunteer.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            volunteer.status === "active"
                              ? "bg-green-100 text-green-800"
                              : volunteer.status === "inactive"
                              ? "bg-gray-100 text-gray-800"
                              : volunteer.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {volunteer.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            volunteer.background_check_completed
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {volunteer.background_check_completed
                            ? "Completed"
                            : "Pending"}
                        </span>
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
