"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface ProgramFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

/**
 * Common modal component for all Program forms
 * Provides consistent modal structure, styling, and animations
 */
export function ProgramFormModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "4xl",
}: ProgramFormModalProps) {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className={`bg-white rounded-2xl ${maxWidthClasses[maxWidth]} w-full my-8`}>
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
          <h3 className="text-2xl font-bold text-gray-900 font-poppins">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close form"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[calc(90vh-100px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
