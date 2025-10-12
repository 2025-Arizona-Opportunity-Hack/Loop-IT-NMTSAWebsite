"use client";

import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Check, AlertCircle } from 'lucide-react';

// ============================================
// FORM INPUT COMPONENTS
// ============================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export function Input({ label, error, required, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm md:text-base font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-nmtsa-500 bg-white transition-all text-sm sm:text-base ${
          error ? 'border-red-500' : 'border-gray-200'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
          {error}
        </p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export function Textarea({ label, error, required, className = '', ...props }: TextareaProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm md:text-base font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-nmtsa-500 bg-white resize-none transition-all text-sm sm:text-base ${
          error ? 'border-red-500' : 'border-gray-200'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

export function Select({ label, error, required, options, className = '', ...props }: SelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm md:text-base font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-nmtsa-500 bg-white transition-all text-sm sm:text-base ${
          error ? 'border-red-500' : 'border-gray-200'
        } ${className}`}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
          {error}
        </p>
      )}
    </div>
  );
}

interface CheckboxGroupProps {
  label: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function CheckboxGroup({ label, error, required, options, value, onChange }: CheckboxGroupProps) {
  const handleChange = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm md:text-base font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 sm:space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="w-4 h-4 text-nmtsa-500 border-gray-300 rounded focus:ring-nmtsa-500"
            />
            <span className="text-sm sm:text-base text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
          {error}
        </p>
      )}
    </div>
  );
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export function Checkbox({ label, error, required, className = '', ...props }: CheckboxProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-start space-x-2 sm:space-x-3 cursor-pointer">
        <input
          type="checkbox"
          className={`mt-1 w-4 h-4 text-nmtsa-500 border-gray-300 rounded focus:ring-nmtsa-500 ${className}`}
          {...props}
        />
        <span className="text-sm sm:text-base text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      </label>
      {error && (
        <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1 ml-6 sm:ml-7">
          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
          {error}
        </p>
      )}
    </div>
  );
}

// ============================================
// FORM WRAPPER COMPONENT
// ============================================

interface FormWrapperProps<T extends z.ZodType<any, any>> {
  schema: T;
  onSubmit: (data: z.infer<T>) => Promise<void>;
  children: (form: UseFormReturn<z.infer<T>, any, undefined>) => React.ReactNode;
  className?: string;
  successMessage?: string;
}

export function FormWrapper<T extends z.ZodType<any, any>>({
  schema,
  onSubmit,
  children,
  className = '',
  successMessage = 'Form submitted successfully! We will get back to you within 24 hours.',
}: FormWrapperProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema) as any,
  });

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(data);
      setIsSuccess(true);
      form.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className={`space-y-4 sm:space-y-6 ${className}`}>
      {children(form)}

      {error && (
        <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl flex items-start gap-2 sm:gap-3">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-900 text-sm sm:text-base">Error</h4>
            <p className="text-xs sm:text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl flex items-start gap-2 sm:gap-3 animate-in slide-in-from-top">
          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900 text-sm sm:text-base">Success!</h4>
            <p className="text-xs sm:text-sm text-green-700">{successMessage}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Form'
        )}
      </button>
    </form>
  );
}

// ============================================
// FORM SECTION COMPONENT
// ============================================

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ title, description, icon, children, className = '' }: FormSectionProps) {
  return (
    <div className={`bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 rounded-lg sm:rounded-xl ${className}`}>
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {description && <p className="text-xs sm:text-sm text-gray-600">{description}</p>}
      </div>
      <div className="space-y-3 sm:space-y-4">{children}</div>
    </div>
  );
}
