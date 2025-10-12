"use client";

import { useState } from 'react';
import { User, GraduationCap, Briefcase, Target, Calendar, FileText } from 'lucide-react';
import { FormWrapper, Input, Select, Textarea, FormSection, Checkbox } from './FormComponents';
import { internshipFormSchema, InternshipFormData } from '@/lib/forms/schemas';
import { submitInternshipForm } from '@/lib/forms/actions';

const academicYearOptions = [
  { value: 'freshman', label: 'Freshman' },
  { value: 'sophomore', label: 'Sophomore' },
  { value: 'junior', label: 'Junior' },
  { value: 'senior', label: 'Senior' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'other', label: 'Other' },
];

const internshipTypeOptions = [
  { value: 'music-therapy', label: 'Music Therapy' },
  { value: 'psychology', label: 'Psychology / Neuroscience' },
  { value: 'communications', label: 'Communications / Marketing' },
  { value: 'nonprofit', label: 'Nonprofit Administration' },
  { value: 'research', label: 'Research & Data Collection' },
  { value: 'other', label: 'Other' },
];

const desiredTermOptions = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'fall', label: 'Fall' },
  { value: 'winter', label: 'Winter' },
  { value: 'year-round', label: 'Year-round' },
];

const priorExperienceOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'some', label: 'Some experience / observation only' },
];

const receivingCreditOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unsure', label: 'Unsure' },
];

const siteAgreementOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'not-sure', label: 'Not sure' },
];

interface InternshipFormProps {
  onSuccess?: () => void;
}

export function InternshipForm({ onSuccess }: InternshipFormProps = {}) {
  const [academicYear, setAcademicYear] = useState('');
  const [internshipTypes, setInternshipTypes] = useState<string[]>([]);

  const handleSubmit = async (data: InternshipFormData) => {
    await submitInternshipForm(data);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <FormWrapper
      schema={internshipFormSchema}
      onSubmit={handleSubmit}
      successMessage="Thank you for your internship application! We'll review your information and get back to you within 3-5 business days."
    >
      {(form) => (
        <>
          {/* Section 1: Personal Information */}
          <FormSection
            title="Personal Information"
            description="Tell us about yourself"
            icon={<User className="w-5 h-5 text-nmtsa-500" />}
          >
            <Input
              label="Full Name"
              {...form.register('fullName')}
              error={form.formState.errors.fullName?.message}
              required
              placeholder="John Doe"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <Input
                label="Email Address"
                type="email"
                {...form.register('email')}
                error={form.formState.errors.email?.message}
                required
                placeholder="john@example.com"
              />
              <Input
                label="Phone Number"
                type="tel"
                {...form.register('phone')}
                error={form.formState.errors.phone?.message}
                required
                placeholder="(602) 123-4567"
              />
            </div>

            <Textarea
              label="Address"
              {...form.register('address')}
              error={form.formState.errors.address?.message}
              rows={2}
              placeholder="Street address, City, State, ZIP (Optional)"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <Input
                label="University or School Name"
                {...form.register('schoolName')}
                error={form.formState.errors.schoolName?.message}
                required
                placeholder="Arizona State University"
              />
              <Input
                label="Major / Program of Study"
                {...form.register('major')}
                error={form.formState.errors.major?.message}
                required
                placeholder="Music Therapy"
              />
            </div>

            <div className="space-y-4">
              <Select
                label="Academic Year"
                {...form.register('academicYear')}
                error={form.formState.errors.academicYear?.message}
                options={academicYearOptions}
                required
                onChange={(e) => {
                  form.register('academicYear').onChange(e);
                  setAcademicYear(e.target.value);
                }}
              />

              {academicYear === 'other' && (
                <Input
                  label="Please specify your academic year"
                  {...form.register('academicYearOther')}
                  error={form.formState.errors.academicYearOther?.message}
                  placeholder="e.g., Post-baccalaureate, Non-degree seeking"
                />
              )}
            </div>
          </FormSection>

          {/* Section 2: Internship Details */}
          <FormSection
            title="Internship Details"
            description="What type of internship are you seeking?"
            icon={<Briefcase className="w-5 h-5 text-nmtsa-500" />}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Internship Type or Focus Area (check all that apply) <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {internshipTypeOptions.map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={internshipTypes.includes(option.value)}
                        onChange={(e) => {
                          const newValues = e.target.checked
                            ? [...internshipTypes, option.value]
                            : internshipTypes.filter((v) => v !== option.value);
                          setInternshipTypes(newValues);
                          form.setValue('internshipTypes', newValues);
                        }}
                        className="w-4 h-4 text-nmtsa-500 border-gray-300 rounded focus:ring-nmtsa-500"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
                {form.formState.errors.internshipTypes?.message && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span>⚠</span>
                    {form.formState.errors.internshipTypes?.message}
                  </p>
                )}
              </div>

              {internshipTypes.includes('other') && (
                <Input
                  label="Please specify other focus area"
                  {...form.register('internshipTypeOther')}
                  error={form.formState.errors.internshipTypeOther?.message}
                  placeholder="Describe your area of interest"
                />
              )}
            </div>

            <Select
              label="Desired Internship Term"
              {...form.register('desiredTerm')}
              error={form.formState.errors.desiredTerm?.message}
              options={desiredTermOptions}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <Input
                label="Start Date (estimated)"
                type="date"
                {...form.register('startDate')}
                error={form.formState.errors.startDate?.message}
              />
              <Input
                label="Expected End Date"
                type="date"
                {...form.register('endDate')}
                error={form.formState.errors.endDate?.message}
              />
            </div>

            <Input
              label="Number of Hours Required (if applicable)"
              {...form.register('hoursRequired')}
              error={form.formState.errors.hoursRequired?.message}
              placeholder="e.g., 120 hours total or 10 hours per week"
            />
          </FormSection>

          {/* Section 3: Experience & Goals */}
          <FormSection
            title="Experience & Goals"
            description="Tell us about your background and aspirations"
            icon={<Target className="w-5 h-5 text-nmtsa-500" />}
          >
            <Textarea
              label="Why are you interested in interning with NMTSA?"
              {...form.register('whyIntern')}
              error={form.formState.errors.whyIntern?.message}
              required
              rows={4}
              placeholder="Share what draws you to NMTSA and how this internship aligns with your career goals..."
            />

            <Textarea
              label="What specific skills or learning goals do you hope to gain?"
              {...form.register('learningGoals')}
              error={form.formState.errors.learningGoals?.message}
              required
              rows={4}
              placeholder="Describe the skills, knowledge, or competencies you want to develop..."
            />

            <Textarea
              label="List any relevant coursework, certifications, or experience"
              {...form.register('relevantExperience')}
              error={form.formState.errors.relevantExperience?.message}
              rows={4}
              placeholder="Include relevant courses, volunteer work, certifications, or prior experience (Optional)"
            />

            <Select
              label="Do you have prior experience working with individuals with disabilities or neurological conditions?"
              {...form.register('priorExperience')}
              error={form.formState.errors.priorExperience?.message}
              options={priorExperienceOptions}
              required
            />
          </FormSection>

          {/* Section 4: Availability & Logistics */}
          <FormSection
            title="Availability & Logistics"
            description="Help us understand your schedule and requirements"
            icon={<Calendar className="w-5 h-5 text-nmtsa-500" />}
          >
            <Textarea
              label="Weekly Availability (days/times)"
              {...form.register('weeklyAvailability')}
              error={form.formState.errors.weeklyAvailability?.message}
              required
              rows={3}
              placeholder="e.g., Mondays and Wednesdays 9am-3pm, Fridays 1pm-5pm"
            />

            <Select
              label="Will you be receiving academic credit for this internship?"
              {...form.register('receivingCredit')}
              error={form.formState.errors.receivingCredit?.message}
              options={receivingCreditOptions}
              required
            />

            <Select
              label="Does your school require a site agreement or supervisor signature?"
              {...form.register('requiresSiteAgreement')}
              error={form.formState.errors.requiresSiteAgreement?.message}
              options={siteAgreementOptions}
              required
            />
          </FormSection>

          {/* Section 5: Consent & Signature */}
          <FormSection
            title="Consent & Signature"
            description="Please review and sign"
            icon={<FileText className="w-5 h-5 text-nmtsa-500" />}
          >
            <Checkbox
              label="I authorize NMTSA staff to contact me about internship opportunities."
              {...form.register('consentToContact')}
              error={form.formState.errors.consentToContact?.message}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <Input
                label="Electronic Signature (type full name)"
                {...form.register('electronicSignature')}
                error={form.formState.errors.electronicSignature?.message}
                required
                placeholder="Type your full name"
              />
              <Input
                label="Date"
                type="date"
                {...form.register('signatureDate')}
                error={form.formState.errors.signatureDate?.message}
                required
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </FormSection>
        </>
      )}
    </FormWrapper>
  );
}
