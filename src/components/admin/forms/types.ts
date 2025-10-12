export type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number' | 'date';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: string;
};

export type FormTemplate = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  fields: FormField[];
  active: boolean;
  frontend_route: string | null;
  created_at: string;
  updated_at: string;
};

export type FormSubmission = {
  id: string;
  form_type: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  metadata: any;
  status: string;
  created_at: string;
  updated_at: string;
};
