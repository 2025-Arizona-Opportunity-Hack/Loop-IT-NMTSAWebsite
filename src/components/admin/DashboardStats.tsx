"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Heart,
  Users,
  ShoppingCart,
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: any;
  color: string;
}

function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  const isPositive = change && change >= 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalDonations: 0,
    activeVolunteers: 0,
    volunteerHours: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockItems: 0,
    activeInterns: 0,
    formSubmissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const supabase = createClient();

    try {
      // Fetch donors
      const { count: donorCount } = await supabase
        .from("donors")
        .select("*", { count: "exact", head: true });

      // Fetch total donations
      const { data: donations } = await supabase
        .from("donors")
        .select("donation_amount");

      const totalDonations =
        donations?.reduce((sum, d) => sum + (d.donation_amount || 0), 0) || 0;

      // Fetch volunteers
      const { count: volunteerCount } = await supabase
        .from("volunteers")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      // Fetch volunteer hours
      const { data: hours } = await supabase
        .from("volunteer_hours")
        .select("hours");

      const totalHours =
        hours?.reduce((sum, h) => sum + (h.hours || 0), 0) || 0;

      // Fetch orders
      const { count: orderCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });

      const { data: orders } = await supabase.from("orders").select("total");

      const totalRevenue =
        orders?.reduce((sum, o) => sum + (o.total || 0), 0) || 0;

      // Fetch low stock items
      const { count: lowStockCount } = await supabase
        .from("merchandise")
        .select("*", { count: "exact", head: true })
        .lt("stock_quantity", 10);

      // Fetch active interns
      const { count: internCount } = await supabase
        .from("interns")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      setStats({
        totalDonors: donorCount || 0,
        totalDonations,
        activeVolunteers: volunteerCount || 0,
        volunteerHours: totalHours,
        totalOrders: orderCount || 0,
        totalRevenue,
        lowStockItems: lowStockCount || 0,
        activeInterns: internCount || 0,
        formSubmissions: 0, // Implement based on forms table
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md p-6 animate-pulse"
          >
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Donors"
        value={stats.totalDonors}
        change={12.5}
        icon={Heart}
        color="bg-pink-500"
      />
      <StatCard
        title="Total Donations"
        value={`$${stats.totalDonations.toLocaleString()}`}
        change={8.2}
        icon={DollarSign}
        color="bg-green-500"
      />
      <StatCard
        title="Active Volunteers"
        value={stats.activeVolunteers}
        change={5.1}
        icon={Users}
        color="bg-blue-500"
      />
      <StatCard
        title="Volunteer Hours"
        value={stats.volunteerHours}
        change={15.3}
        icon={Clock}
        color="bg-indigo-500"
      />
      <StatCard
        title="Total Orders"
        value={stats.totalOrders}
        change={-2.4}
        icon={ShoppingCart}
        color="bg-purple-500"
      />
      <StatCard
        title="Total Revenue"
        value={`$${stats.totalRevenue.toLocaleString()}`}
        change={11.8}
        icon={DollarSign}
        color="bg-emerald-500"
      />
      <StatCard
        title="Low Stock Items"
        value={stats.lowStockItems}
        icon={Package}
        color="bg-red-500"
      />
      <StatCard
        title="Active Interns"
        value={stats.activeInterns}
        change={3.7}
        icon={Users}
        color="bg-orange-500"
      />
    </div>
  );
}
