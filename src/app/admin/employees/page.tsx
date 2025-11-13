"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Search, UserCircle, Mail, Phone, Briefcase, Eye, Check, X, Clock, CheckCircle } from "lucide-react";

type Tab = "employees" | "applications";

export default function EmployeesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("employees");
  const [employees, setEmployees] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();

    if (activeTab === "employees") {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setEmployees(data || []);
      }
    } else {
      const { data, error } = await supabase
        .from("employee_applications" as any)
        .select("*")
        .order("application_date", { ascending: false });

      if (!error) {
        setApplications(data || []);
      }
    }
    setLoading(false);
  }, [activeTab]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleApprove = async (applicationId: string) => {
    const response = await fetch(
      `/api/employees/applications/${applicationId}/approve`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "Staff" }), // role is required for employees
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
      `/api/employees/applications/${applicationId}/reject`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectReason }),
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

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplications = applications
    .filter((app) => app.status !== "approved") // Hide approved applications
    .filter((app) => {
      const matchesSearch =
        app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position_applied_for?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Employee Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage staff members and their information
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Employee</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Employees</p>
                <p className="text-3xl font-bold text-gray-900">
                  {employees.length}
                </p>
              </div>
              <UserCircle className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Staff</p>
                <p className="text-3xl font-bold text-green-600">
                  {employees.filter((e) => e.status === "active").length}
                </p>
              </div>
              <UserCircle className="w-12 h-12 text-green-500" />
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
                <p className="text-gray-600 text-sm">Departments</p>
                <p className="text-3xl font-bold text-purple-600">
                  {new Set(employees.map((e) => e.department)).size}
                </p>
              </div>
              <Briefcase className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("employees")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === "employees"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Active Employees ({employees.length})</span>
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

        {/* Search for Employees Tab */}
        {activeTab === "employees" && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search employees by name, email, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === "employees" ? (
          /* Employees Table */
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-600">Loading...</div>
            ) : filteredEmployees.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                No employees found
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
                        Position
                      </th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">
                        Department
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
                  {filteredEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                              {employee.name?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {employee.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            {employee.email}
                          </div>
                          {employee.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-4 h-4 mr-2" />
                              {employee.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {employee.position}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {employee.department}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            employee.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {employee.status || "Active"}
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
                        Position
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
                        <td className="py-4 px-6 text-sm text-gray-700">
                          {app.position_applied_for || "General Position"}
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

        {/* Application Review Modal */}
        {showModal && selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Employment Application Review
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Review and take action on this application
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedApplication(null);
                    setRejectReason("");
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Applicant Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Applicant Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{selectedApplication.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">
                        {selectedApplication.phone || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Position Applied For</p>
                      <p className="font-medium">
                        {selectedApplication.position_applied_for || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                {selectedApplication.cover_letter && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Cover Letter
                    </h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                      {selectedApplication.cover_letter}
                    </p>
                  </div>
                )}

                {/* Additional Info */}
                {selectedApplication.metadata && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Additional Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                      {Object.entries(selectedApplication.metadata).map(
                        ([key, value]: [string, any]) => (
                          <div key={key}>
                            <span className="font-medium text-gray-700">
                              {key
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                              :
                            </span>{" "}
                            <span className="text-gray-600">
                              {typeof value === "object"
                                ? JSON.stringify(value)
                                : String(value)}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Status and Actions */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">Current Status:</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedApplication.status === "pending"
                        ? "bg-orange-100 text-orange-800"
                        : selectedApplication.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedApplication.status || "Pending"}
                  </span>
                </div>

                {selectedApplication.status === "pending" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rejection Reason (Optional)
                      </label>
                      <textarea
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Enter reason for rejection..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleApprove(selectedApplication.id)}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                      >
                        <Check className="w-5 h-5" />
                        <span>Approve Application</span>
                      </button>
                      <button
                        onClick={() => handleReject(selectedApplication.id)}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
                      >
                        <X className="w-5 h-5" />
                        <span>Reject Application</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
