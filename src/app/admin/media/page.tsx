"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  Video,
  FileText,
  Folder,
  Search,
  Grid,
  List,
} from "lucide-react";

export default function MediaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock media data
  const mediaItems = [
    {
      id: 1,
      name: "NMTSA Logo.png",
      type: "image",
      size: "245 KB",
      date: "2024-10-01",
    },
    {
      id: 2,
      name: "Event Photo 1.jpg",
      type: "image",
      size: "1.2 MB",
      date: "2024-10-05",
    },
    {
      id: 3,
      name: "Therapy Session.mp4",
      type: "video",
      size: "15.3 MB",
      date: "2024-10-08",
    },
    {
      id: 4,
      name: "Annual Report.pdf",
      type: "document",
      size: "3.4 MB",
      date: "2024-09-28",
    },
  ];

  const filteredMedia = mediaItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-8 h-8 text-blue-500" />;
      case "video":
        return <Video className="w-8 h-8 text-purple-500" />;
      case "document":
        return <FileText className="w-8 h-8 text-red-500" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
            <p className="text-gray-600 mt-2">
              Manage images, videos, and documents
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Media</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Files</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mediaItems.length}
                </p>
              </div>
              <Folder className="w-12 h-12 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Images</p>
                <p className="text-3xl font-bold text-blue-600">
                  {mediaItems.filter((m) => m.type === "image").length}
                </p>
              </div>
              <ImageIcon className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Videos</p>
                <p className="text-3xl font-bold text-purple-600">
                  {mediaItems.filter((m) => m.type === "video").length}
                </p>
              </div>
              <Video className="w-12 h-12 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Documents</p>
                <p className="text-3xl font-bold text-red-600">
                  {mediaItems.filter((m) => m.type === "document").length}
                </p>
              </div>
              <FileText className="w-12 h-12 text-red-500" />
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search media files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Media Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  {getMediaIcon(item.type)}
                  <p className="mt-4 font-medium text-gray-900 truncate w-full">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">{item.size}</p>
                  <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">
                    Size
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMedia.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        {getMediaIcon(item.type)}
                        <span className="font-medium text-gray-900">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{item.size}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {item.date}
                    </td>
                    <td className="py-4 px-6">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredMedia.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No media files found</p>
            <p className="text-gray-500 text-sm mt-2">
              Upload your first file to get started
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
