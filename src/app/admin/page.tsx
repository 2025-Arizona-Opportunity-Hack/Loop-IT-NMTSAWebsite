"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import DashboardStats from "@/components/admin/DashboardStats";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  ShoppingCart,
  Users,
  Heart,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

interface Activity {
  id: string;
  type: string;
  description: string;
  time: string;
  icon: any;
  color: string;
}

export default function AdminDashboard() {
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const supabase = createClient();

    try {
      // Load low stock items
      const { data: lowStock } = await supabase
        .from("merchandise")
        .select("*")
        .lt("stock_quantity", 10)
        .eq("is_active", true)
        .limit(5);

      setLowStockItems(lowStock || []);

      // Load pending orders
      const { data: orders } = await supabase
        .from("orders")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(5);

      setPendingOrders(orders || []);

      // Mock recent activity (you can replace with actual data)
      setRecentActivity([
        {
          id: "1",
          type: "order",
          description: "New order #1234 received",
          time: "5 minutes ago",
          icon: ShoppingCart,
          color: "text-blue-600",
        },
        {
          id: "2",
          type: "donation",
          description: "New donation of $500 from John Doe",
          time: "15 minutes ago",
          icon: Heart,
          color: "text-pink-600",
        },
        {
          id: "3",
          type: "volunteer",
          description: "New volunteer application submitted",
          time: "1 hour ago",
          icon: Users,
          color: "text-green-600",
        },
        {
          id: "4",
          type: "content",
          description: "Homepage content updated",
          time: "2 hours ago",
          icon: FileText,
          color: "text-purple-600",
        },
      ]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Cards */}
        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Recent Activity
              </h2>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0"
                  >
                    <div
                      className={`p-2 rounded-lg bg-gray-50 ${activity.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href="/admin/reports"
              className="block text-center mt-6 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all activity →
            </a>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Low Stock Alerts
              </h2>
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>

            {lowStockItems.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-600">All items are well stocked!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Stock: {item.stock_quantity} units
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-red-600">
                      Low
                    </span>
                  </div>
                ))}
              </div>
            )}

            <a
              href="/admin/merchandise"
              className="block text-center mt-6 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Manage inventory →
            </a>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Pending Orders
              </h2>
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                {pendingOrders.length} Pending
              </span>
            </div>

            {pendingOrders.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-600">No pending orders</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Order #
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Customer
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Total
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 font-medium text-blue-600">
                          {order.order_number}
                        </td>
                        <td className="py-3 px-4">{order.customer_name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 font-semibold">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <a
                            href={`/admin/orders/${order.id}`}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <a
              href="/admin/orders"
              className="block text-center mt-6 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all orders →
            </a>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href="/admin/merchandise"
                className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-colors"
              >
                <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Add Product</p>
              </a>
              <a
                href="/admin/donors"
                className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-colors"
              >
                <Heart className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Add Donor</p>
              </a>
              <a
                href="/admin/volunteers"
                className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-colors"
              >
                <Users className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Add Volunteer</p>
              </a>
              <a
                href="/admin/content"
                className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-colors"
              >
                <FileText className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Edit Content</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
