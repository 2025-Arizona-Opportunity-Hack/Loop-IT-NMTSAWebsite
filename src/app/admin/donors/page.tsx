"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Search, Heart, Mail, Phone, Download } from "lucide-react";

export default function DonorsPage() {
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    totalAmount: 0,
    recurring: 0,
  });

  useEffect(() => {
    loadDonors();
  }, []);

  const loadDonors = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("donors")
      .select("*")
      .order("donation_date", { ascending: false });

    if (!error && data) {
      setDonors(data);
      setStats({
        total: data.length,
        totalAmount: data.reduce((sum, d) => sum + d.donation_amount, 0),
        recurring: data.filter((d) => d.is_recurring).length,
      });
    }
    setLoading(false);
  };

  const filteredDonors = donors.filter(
    (donor) =>
      donor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Donor Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage donors and track donations
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add Donor</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Donors</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <Heart className="w-12 h-12 text-pink-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Donations</p>
                <p className="text-3xl font-bold text-green-600">
                  ${stats.totalAmount.toLocaleString()}
                </p>
              </div>
              <Heart className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Recurring Donors</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.recurring}
                </p>
              </div>
              <Heart className="w-12 h-12 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search donors by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Donors Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-600">Loading...</div>
          ) : filteredDonors.length === 0 ? (
            <div className="p-8 text-center text-gray-600">No donors found</div>
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
                      Amount
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Type
                    </th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonors.map((donor) => (
                    <tr
                      key={donor.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-900">
                            {donor.name}
                          </p>
                          {donor.anonymous && (
                            <span className="text-xs text-gray-500">
                              (Anonymous)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            {donor.email}
                          </div>
                          {donor.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-4 h-4 mr-2" />
                              {donor.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-green-600">
                        ${donor.donation_amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {new Date(donor.donation_date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            donor.is_recurring
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {donor.is_recurring
                            ? `Recurring (${donor.frequency})`
                            : "One-time"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            donor.tax_receipt_sent
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {donor.tax_receipt_sent ? "Receipt Sent" : "Pending"}
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
