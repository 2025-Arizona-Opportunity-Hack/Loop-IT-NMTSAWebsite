"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import LogoutButton from "@/components/LogoutButton";
import {
  LayoutDashboard,
  FileText,
  ShoppingBag,
  ShoppingCart,
  Heart,
  Users,
  UserCircle,
  GraduationCap,
  FileSpreadsheet,
  Settings,
  Upload,
  BarChart3,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: number;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(0);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [pendingFormsCount, setPendingFormsCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const navigation: NavItem[] = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Content", href: "/admin/content", icon: FileText },
    { name: "Merchandise", href: "/admin/merchandise", icon: ShoppingBag },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart, badge: pendingOrdersCount },
    { name: "Donors", href: "/admin/donors", icon: Heart },
    { name: "Volunteers", href: "/admin/volunteers", icon: Users },
    { name: "Employees", href: "/admin/employees", icon: UserCircle },
    { name: "Interns", href: "/admin/interns", icon: GraduationCap },
    { name: "Forms", href: "/admin/forms", icon: FileSpreadsheet, badge: pendingFormsCount },
    { name: "Media Library", href: "/admin/media", icon: Upload },
    { name: "Reports", href: "/admin/reports", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  useEffect(() => {
    checkAuth();
    loadPendingCounts();
  }, []);

  const checkAuth = async () => {
    // Check for mock session from hardcoded login
    const mockSession = localStorage.getItem("mockAdminSession");

    if (!mockSession) {
      router.push("/login");
      return;
    }

    try {
      const session = JSON.parse(mockSession);

      // Verify session is less than 24 hours old
      const sessionAge = Date.now() - session.timestamp;
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (sessionAge > twentyFourHours) {
        localStorage.removeItem("mockAdminSession");
        router.push("/login");
        return;
      }

      // Use the mock user data
      setCurrentUser(session.user);
      setLoading(false);
    } catch (error) {
      console.error("Session error:", error);
      localStorage.removeItem("mockAdminSession");
      router.push("/login");
    }
  };

  const loadPendingCounts = async () => {
    const supabase = createClient();

    try {
      // Get pending orders count
      const { count: ordersCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      setPendingOrdersCount(ordersCount || 0);

      // Get pending forms count
      const { count: formsCount } = await supabase
        .from("form_submissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      setPendingFormsCount(formsCount || 0);
    } catch (error) {
      console.error("Error loading pending counts:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
          <h1 className="text-xl font-bold">NMTSA Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname?.startsWith(item.href));
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "lg:pl-64" : ""
        }`}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-16">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-600 hover:text-gray-900 lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search across all sections..."
                  className="bg-transparent border-none outline-none ml-2 w-full text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {currentUser.full_name || "Admin"}
                  </p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                  {currentUser.full_name?.charAt(0) || "A"}
                </div>
                <LogoutButton />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
