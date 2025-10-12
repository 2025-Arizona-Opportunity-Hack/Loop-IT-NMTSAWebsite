import { FormTemplate } from './types';
import { FileText, Edit, Copy, ToggleRight, ToggleLeft, Trash2, Link } from 'lucide-react';

interface FormCardProps {
  template: FormTemplate;
  onEdit: (template: FormTemplate) => void;
  onDuplicate: (template: FormTemplate) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
  onCopyLink: (slug: string, route: string | null) => void;
}

export function FormCard({
  template,
  onEdit,
  onDuplicate,
  onToggleStatus,
  onDelete,
  onCopyLink,
}: FormCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {template.name}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">
              {template.description || "No description"}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500">
                {template.fields.length} fields
              </span>
              {template.active ? (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
                  <ToggleRight className="w-3 h-3" />
                  Active
                </span>
              ) : (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center gap-1">
                  <ToggleLeft className="w-3 h-3" />
                  Inactive
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-3 sm:mb-4">
          <div className="text-xs text-gray-500 break-all">
            <strong>Slug:</strong> {template.slug}
          </div>
          {template.frontend_route && (
            <div className="text-xs text-gray-500 break-all">
              <strong>Route:</strong> {template.frontend_route}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => onCopyLink(template.slug, template.frontend_route)}
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm"
          >
            <Link className="w-4 h-4" />
            <span className="hidden sm:inline">Copy Link</span>
            <span className="sm:hidden">Link</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(template)}
              className="flex-1 sm:flex-none p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDuplicate(template)}
              className="flex-1 sm:flex-none p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              title="Duplicate"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleStatus(template.id, template.active)}
              className="flex-1 sm:flex-none p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              title="Toggle Status"
            >
              {template.active ? (
                <ToggleRight className="w-4 h-4" />
              ) : (
                <ToggleLeft className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => onDelete(template.id)}
              className="flex-1 sm:flex-none p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
