"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Plus,
  Search,
  Users,
  Clock,
  CheckCircle,
  UserCheck,
  UserX,
  Eye,
  Mail,
  Phone,
  Calendar,
  X,
  Check,
} from "lucide-react";

type Tab = "volunteers" | "applications";

export default function VolunteersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("volunteers");
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    const supabase = createClient();

    if (activeTab === "volunteers") {
      const { data, error } = await supabase
        .from("volunteers")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setVolunteers(data || []);
      }
    } else {
      const { data, error } = await supabase
        .from("volunteer_applications" as any)
        .select("*")
        .order("application_date", { ascending: false });

      if (!error) {
        setApplications(data || []);
      }
    }
    setLoading(false);
  };

  const handleApprove = async (applicationId: string) => {
    const response = await fetch(
      `/api/volunteers/applications/${applicationId}/approve`,
      { 
        method: "POST",
        credentials: "include"
      }
    );

    if (response.ok) {
      alert("Application approved successfully!");
      setShowModal(false);
      loadData();
    } else {
      const error = await response.json();
      alert(`Error: ${error.error}`);
    }
  };

  const handleReject = async (applicationId: string) => {
    const response = await fetch(
      `/api/volunteers/applications/${applicationId}/reject`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectReason }),
        credentials: "include"
      }
    );

    if (response.ok) {
      alert("Application rejected successfully!");
      setShowModal(false);
      setRejectReason("");
      loadData();
    } else {
      const error = await response.json();
      alert(`Error: ${error.error}`);
    }
  };

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch =
      volunteer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || volunteer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredApplications = applications
    .filter((app) => app.status !== "approved") // Hide approved applications
    .filter((app) => {
      const matchesSearch =
        app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

  const volunteerStats = {
    total: volunteers.length,
    active: volunteers.filter((v) => v.status === "active").length,
    totalHours: volunteers.reduce((sum, v) => sum + (v.total_hours || 0), 0),
  };

  const applicationStats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
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
              Manage volunteers, applications, and track contributions
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Volunteers</p>
                <p className="text-3xl font-bold text-gray-900">
                  {volunteers.length}
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
                  {volunteers.filter((v) => v.status === "active").length}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Applications</p>
                <p className="text-3xl font-bold text-orange-600">
                  {applications.filter((a) => a.status === "pending").length}
                </p>
              </div>
              <Clock className="w-12 h-12 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Hours</p>
                <p className="text-3xl font-bold text-purple-600">
                  {volunteers.reduce((sum, v) => sum + (v.total_hours || 0), 0)}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("volunteers")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === "volunteers"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Active Volunteers ({volunteers.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === "applications"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>
                  Applications ({applications.length})
                  {applications.filter((a) => a.status === "pending").length >
                    0 && (
                    <span className="ml-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                      {
                        applications.filter((a) => a.status === "pending")
                          .length
                      }{" "}
                      new
                    </span>
                  )}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Filter and Search for Applications */}
        {activeTab === "applications" && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search applications..."
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
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        )}

        {/* Search for Volunteers Tab */}
        {activeTab === "volunteers" && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search volunteers by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === "volunteers" ? (
          /* Volunteers Table */
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
                        Start Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVolunteers.map((volunteer) => (
                      <tr
                        key={volunteer.id}
                        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            {volunteer.image_url ? (
                              <img
                                src={volunteer.image_url}
                                alt={volunteer.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-semibold">
                                  {volunteer.name.charAt(0)}
                                </span>
                              </div>
                            )}
                            <span className="font-medium text-gray-900">
                              {volunteer.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600 flex items-center space-x-1">
                              <Mail className="w-4 h-4" />
                              <span>{volunteer.email}</span>
                            </p>
                            {volunteer.phone && (
                              <p className="text-sm text-gray-500 flex items-center space-x-1">
                                <Phone className="w-4 h-4" />
                                <span>{volunteer.phone}</span>
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-bold text-purple-600">
                            {volunteer.total_hours || 0} hrs
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1">
                            {volunteer.skills
                              ?.slice(0, 2)
                              .map((skill: string, i: number) => (
                                <span
                                  key={i}
                                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            {volunteer.skills?.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{volunteer.skills.length - 2}
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
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {volunteer.start_date
                            ? new Date(volunteer.start_date).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          /* Applications Table */
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-600">Loading...</div>
            ) : filteredApplications.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                No applications found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">
                        Applicant
                      </th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">
                        Contact
                      </th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">
                        Skills
                      </th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">
                        Applied Date
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
                    {filteredApplications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">
                                {app.name?.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {app.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="w-4 h-4 mr-2" />
                              {app.email}
                            </div>
                            {app.phone && (
                              <div className="flex items-center text-sm text-gray-600">
                                <Phone className="w-4 h-4 mr-2" />
                                {app.phone}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1">
                            {app.skills
                              ?.slice(0, 2)
                              .map((skill: string, i: number) => (
                                <span
                                  key={i}
                                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            {app.skills?.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{app.skills.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {new Date(
                            app.application_date || app.created_at
                          ).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              app.status === "pending"
                                ? "bg-orange-100 text-orange-800"
                                : app.status === "under_review"
                                ? "bg-blue-100 text-blue-800"
                                : app.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {app.status || "Pending"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => {
                              setSelectedApplication(app);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Review</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Application Details Modal */}
        {showModal && selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-2xl font-bold text-gray-900">
                  Application Details
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedApplication(null);
                    setRejectReason("");
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Name
                    </label>
                    <p className="text-gray-900">{selectedApplication.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Phone
                    </label>
                    <p className="text-gray-900">
                      {selectedApplication.phone || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Application Date
                    </label>
                    <p className="text-gray-900">
                      {new Date(
                        selectedApplication.application_date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {selectedApplication.skills && selectedApplication.skills.length > 0 && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Skills
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplication.skills.map((skill: string, i: number) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedApplication.reason_for_volunteering && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Reason for Volunteering
                    </label>
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedApplication.reason_for_volunteering}
                    </p>
                  </div>
                )}

                {selectedApplication.previous_volunteer_experience && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Previous Experience
                    </label>
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedApplication.previous_volunteer_experience}
                    </p>
                  </div>
                )}

                {selectedApplication.status === "pending" && (
                  <>
                    <div className="border-t pt-4">
                      <label className="text-sm font-semibold text-gray-700 block mb-2">
                        Rejection Reason (Optional)
                      </label>
                      <textarea
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Enter reason for rejection..."
                      />
                    </div>

                    <div className="flex items-center justify-end space-x-3">
                      <button
                        onClick={() => handleReject(selectedApplication.id)}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Reject Application
                      </button>
                      <button
                        onClick={() => handleApprove(selectedApplication.id)}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Approve Application
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
