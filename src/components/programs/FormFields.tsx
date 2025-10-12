"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

// ============================================
// FORM SECTION
// ============================================

interface FormSectionProps {
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  bgGradient?: string;
  children: ReactNode;
}

/**
 * Section wrapper for grouping related form fields
 */
export function FormSection({
  title,
  icon: Icon,
  iconColor = "text-nmtsa-600",
  bgGradient = "from-gray-50 to-gray-100",
  children,
}: FormSectionProps) {
  return (
    <div className={`bg-gradient-to-r ${bgGradient} p-4 sm:p-6 rounded-lg sm:rounded-xl`}>
      <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
        {Icon && <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${iconColor}`} />}
        {title}
      </h4>
      <div className="space-y-3 sm:space-y-4">{children}</div>
    </div>
  );
}

// ============================================
// TEXT INPUT
// ============================================

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "date" | "url" | "number";
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Standard text input field
 */
export function TextInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  disabled = false,
  className = "",
}: TextInputProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nmtsa-500 focus:border-transparent transition-all text-sm sm:text-base"
        required={required}
        disabled={disabled}
      />
    </div>
  );
}

// ============================================
// TEXTAREA
// ============================================

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Multi-line text area
 */
export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  required = false,
  disabled = false,
  className = "",
}: TextareaProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nmtsa-500 focus:border-transparent resize-none transition-all text-sm sm:text-base"
        required={required}
        disabled={disabled}
      />
    </div>
  );
}

// ============================================
// SELECT DROPDOWN
// ============================================

interface SelectProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Dropdown select field
 */
export function Select({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  className = "",
}: SelectProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nmtsa-500 focus:border-transparent transition-all text-sm sm:text-base"
        required={required}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ============================================
// CHECKBOX GROUP
// ============================================

interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
}

interface CheckboxGroupProps {
  label?: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  required?: boolean;
  disabled?: boolean;
  columns?: 1 | 2 | 3;
  className?: string;
}

/**
 * Group of checkboxes
 */
export function CheckboxGroup({
  label,
  options,
  selectedValues,
  onChange,
  required = false,
  disabled = false,
  columns = 1,
  className = "",
}: CheckboxGroupProps) {
  const handleChange = (value: string, checked: boolean) => {
    const newValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value);
    onChange(newValues);
  };

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm md:text-base font-medium text-gray-700 mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className={`grid ${gridCols[columns]} gap-2 sm:gap-3`}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
              disabled={disabled}
              className="mt-1 w-4 h-4 text-nmtsa-500 border-gray-300 rounded focus:ring-nmtsa-500"
            />
            <div className="flex-1">
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {option.label}
              </span>
              {option.description && (
                <p className="text-xs text-gray-500 mt-1">
                  {option.description}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

// ============================================
// RADIO GROUP
// ============================================

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  columns?: 1 | 2 | 3;
  className?: string;
}

/**
 * Group of radio buttons
 */
export function RadioGroup({
  label,
  options,
  selectedValue,
  onChange,
  required = false,
  disabled = false,
  columns = 1,
  className = "",
}: RadioGroupProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm md:text-base font-medium text-gray-700 mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className={`grid ${gridCols[columns]} gap-2 sm:gap-3`}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <input
              type="radio"
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              disabled={disabled}
              required={required}
              className="mt-1 w-4 h-4 text-nmtsa-500 border-gray-300 focus:ring-nmtsa-500"
            />
            <div className="flex-1">
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {option.label}
              </span>
              {option.description && (
                <p className="text-xs text-gray-500 mt-1">
                  {option.description}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

// ============================================
// SUBMIT BUTTON
// ============================================

interface SubmitButtonProps {
  isSubmitting?: boolean;
  text?: string;
  submittingText?: string;
  className?: string;
}

/**
 * Form submit button with loading state
 */
export function SubmitButton({
  isSubmitting = false,
  text = "Submit Application",
  submittingText = "Submitting...",
  className = "",
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm sm:text-base ${className}`}
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {submittingText}
        </>
      ) : (
        text
      )}
    </button>
  );
}

// ============================================
// GRID LAYOUT HELPER
// ============================================

interface GridProps {
  columns?: 1 | 2 | 3 | 4;
  gap?: 2 | 3 | 4 | 6;
  children: ReactNode;
  className?: string;
}

/**
 * Responsive grid layout for form fields
 */
export function Grid({
  columns = 2,
  gap = 4,
  children,
  className = "",
}: GridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
  };

  const gridGap = {
    2: "gap-2",
    3: "gap-3",
    4: "gap-3 sm:gap-4",
    6: "gap-4 sm:gap-6",
  };

  return (
    <div className={`grid ${gridCols[columns]} ${gridGap[gap]} ${className}`}>
      {children}
    </div>
  );
}
