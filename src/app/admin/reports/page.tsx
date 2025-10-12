"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  Users,
  Heart,
  ShoppingCart,
} from "lucide-react";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("last_30_days");

  const reports = [
    {
      id: 1,
      title: "Donation Report",
      description: "Overview of all donations received",
      icon: Heart,
      color: "pink",
      records: 127,
    },
    {
      id: 2,
      title: "Volunteer Hours Report",
      description: "Total volunteer hours tracked",
      icon: Users,
      color: "blue",
      records: 482,
    },
    {
      id: 3,
      title: "Merchandise Sales Report",
      description: "Sales and inventory overview",
      icon: ShoppingCart,
      color: "purple",
      records: 89,
    },
    {
      id: 4,
      title: "Financial Summary",
      description: "Revenue and expenses breakdown",
      icon: DollarSign,
      color: "green",
      records: 1,
    },
    {
      id: 5,
      title: "Intern Hours Report",
      description: "Internship hours and activities",
      icon: Users,
      color: "orange",
      records: 12,
    },
    {
      id: 6,
      title: "Program Statistics",
      description: "Participation and outcomes",
      icon: BarChart3,
      color: "indigo",
      records: 45,
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; icon: string }> = {
      pink: { bg: "bg-pink-50", text: "text-pink-600", icon: "text-pink-500" },
      blue: { bg: "bg-blue-50", text: "text-blue-600", icon: "text-blue-500" },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        icon: "text-purple-500",
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        icon: "text-green-500",
      },
      orange: {
        bg: "bg-orange-50",
        text: "text-orange-600",
        icon: "text-orange-500",
      },
      indigo: {
        bg: "bg-indigo-50",
        text: "text-indigo-600",
        icon: "text-indigo-500",
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Reports & Analytics
            </h1>
            <p className="text-gray-600 mt-2">
              Generate and download comprehensive reports
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="last_7_days">Last 7 Days</option>
              <option value="last_30_days">Last 30 Days</option>
              <option value="last_90_days">Last 90 Days</option>
              <option value="this_year">This Year</option>
              <option value="all_time">All Time</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900">
                  {reports.length}
                </p>
              </div>
              <BarChart3 className="w-12 h-12 text-indigo-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Data Points</p>
                <p className="text-3xl font-bold text-blue-600">755</p>
              </div>
              <TrendingUp className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Last Updated</p>
                <p className="text-xl font-bold text-gray-900">Today</p>
              </div>
              <Calendar className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Exports</p>
                <p className="text-3xl font-bold text-purple-600">24</p>
              </div>
              <Download className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Available Reports */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Available Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => {
              const Icon = report.icon;
              const colors = getColorClasses(report.color);
              return (
                <div
                  key={report.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${colors.bg} mb-4`}
                  >
                    <Icon className={`w-8 h-8 ${colors.icon}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {report.records} records
                    </span>
                    <button
                      className={`flex items-center space-x-2 px-4 py-2 ${colors.bg} ${colors.text} rounded-lg hover:opacity-80 transition-opacity`}
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-medium">Export</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Report Builder */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Custom Report Builder
          </h2>
          <p className="text-gray-600 mb-6">
            Create custom reports by selecting specific data points and filters
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Donations</option>
                <option>Volunteers</option>
                <option>Orders</option>
                <option>Programs</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>PDF</option>
                <option>Excel (XLSX)</option>
                <option>CSV</option>
                <option>JSON</option>
              </select>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Generate Custom Report</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
