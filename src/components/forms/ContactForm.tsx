"use client";

import { Mail, Phone, User, MessageSquare } from 'lucide-react';
import { FormWrapper, Input, Select, Textarea, FormSection } from './FormComponents';
import { contactFormSchema, ContactFormData } from '@/lib/forms/schemas';
import { submitContactForm } from '@/lib/forms/actions';

const subjects = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'assessment', label: 'Schedule Assessment' },
  { value: 'program', label: 'Program Information' },
  { value: 'insurance', label: 'Insurance/Billing' },
  { value: 'volunteer', label: 'Volunteer Opportunities' },
  { value: 'professional', label: 'Professional Development' },
  { value: 'employment', label: 'Employment Opportunities' },
  { value: 'media', label: 'Media/Press' },
  { value: 'other', label: 'Other' },
];

export function ContactForm() {
  return (
    <FormWrapper
      schema={contactFormSchema}
      onSubmit={submitContactForm}
      successMessage="Thank you for contacting us! We'll get back to you within 24 hours."
    >
      {(form) => (
        <>
          <FormSection
            title="Contact Information"
            description="Please provide your contact details"
            icon={<User className="w-5 h-5 text-nmtsa-500" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <Input
                label="Your Name"
                {...form.register('name')}
                error={form.formState.errors.name?.message}
                required
                placeholder="John Doe"
              />
              <Input
                label="Email Address"
                type="email"
                {...form.register('email')}
                error={form.formState.errors.email?.message}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <Input
                label="Phone Number"
                type="tel"
                {...form.register('phone')}
                error={form.formState.errors.phone?.message}
                placeholder="(602) 123-4567"
              />
              <Select
                label="Subject"
                {...form.register('subject')}
                error={form.formState.errors.subject?.message}
                options={subjects}
                required
              />
            </div>
          </FormSection>

          <FormSection
            title="Your Message"
            description="Tell us how we can help you"
            icon={<MessageSquare className="w-5 h-5 text-nmtsa-500" />}
          >
            <Textarea
              label="Message"
              {...form.register('message')}
              error={form.formState.errors.message?.message}
              required
              rows={6}
              placeholder="Tell us about your needs, questions, or how we can help..."
            />
          </FormSection>
        </>
      )}
    </FormWrapper>
  );
}
