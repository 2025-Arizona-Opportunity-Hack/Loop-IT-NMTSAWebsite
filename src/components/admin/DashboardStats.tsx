"use client";

import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  // Mock data for demo/mockup purposes
  const stats = {
    totalDonors: 127,
    totalDonations: 45250,
    activeVolunteers: 34,
    volunteerHours: 482,
    totalOrders: 89,
    totalRevenue: 12840,
    lowStockItems: 8,
    activeInterns: 12,
  };

  useEffect(() => {
    // Simulate loading delay for realistic UX
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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
