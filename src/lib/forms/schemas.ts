import { z } from 'zod';

// ============================================
// VALIDATION SCHEMAS
// ============================================

// Base schemas for common fields
export const emailSchema = z.string().email('Please enter a valid email address');
export const phoneSchema = z.string().regex(/^[\d\s\-\(\)]+$/, 'Please enter a valid phone number').optional().or(z.literal(''));
export const nameSchema = z.string().min(2, 'Name must be at least 2 characters');
export const messageSchema = z.string().min(10, 'Message must be at least 10 characters');

// ============================================
// CONTACT FORMS
// ============================================

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: z.string().min(1, 'Please select a subject'),
  message: messageSchema,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================
// VOLUNTEER APPLICATION
// ============================================

export const volunteerFormSchema = z.object({
  // Personal Information
  fullName: nameSchema,
  email: emailSchema,
  phone: z.string().min(10, 'Phone number is required'),
  address: z.string().min(5, 'Address is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  
  // Emergency Contact
  emergencyContactName: nameSchema,
  emergencyContactPhone: z.string().min(10, 'Emergency contact phone is required'),
  emergencyContactRelationship: z.string().min(1, 'Relationship is required'),
  
  // Availability
  preferredDays: z.array(z.string()).min(1, 'Select at least one day'),
  preferredTime: z.array(z.string()).min(1, 'Select at least one time slot'),
  hoursPerWeek: z.number().min(4, 'Minimum 4 hours per week').max(40),
  
  // Experience
  previousExperience: z.string(),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  musicalInstruments: z.string(),
  whyVolunteer: z.string().min(50, 'Please provide at least 50 characters'),
  
  // Agreements
  backgroundCheckConsent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to a background check',
  }),
  commitmentAgreement: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the 6-month commitment',
  }),
});

export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;

// ============================================
// DONATION FORM
// ============================================

export const donationFormSchema = z.object({
  donorType: z.enum(['individual', 'organization']),
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  amount: z.number().min(1, 'Amount must be at least $1'),
  donationType: z.enum(['one-time', 'monthly']),
  isAnonymous: z.boolean().default(false),
  inHonorOf: z.string().optional(),
  message: z.string().optional(),
  mailingAddress: z.string().optional(),
});

export type DonationFormData = z.infer<typeof donationFormSchema>;

// ============================================
// THERAPY SERVICE REQUEST
// ============================================

export const serviceRequestFormSchema = z.object({
  // Contact Information
  contactName: nameSchema,
  contactEmail: emailSchema,
  contactPhone: z.string().min(10, 'Phone number is required'),
  relationshipToClient: z.string().min(1, 'Please specify your relationship'),
  
  // Client Information
  clientName: nameSchema,
  clientAge: z.number().min(0).max(150),
  clientDOB: z.string().optional(),
  
  // Medical Information
  primaryDiagnosis: z.string().min(1, 'Please select a diagnosis'),
  diagnosisDetails: z.string().min(10, 'Please provide additional details'),
  diagnosisDate: z.string().optional(),
  currentMedications: z.string().optional(),
  
  // Therapy Goals
  therapyGoals: z.array(z.string()).min(1, 'Select at least one goal'),
  goalDetails: z.string().min(20, 'Please describe your goals in detail'),
  
  // Scheduling
  preferredDays: z.array(z.string()).min(1, 'Select at least one day'),
  preferredTime: z.string().min(1, 'Select a preferred time'),
  sessionType: z.enum(['individual', 'group', 'either']),
  
  // Insurance
  hasInsurance: z.boolean(),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
  insurancePhone: z.string().optional(),
  
  // Additional
  howDidYouHear: z.string().min(1, 'Please let us know how you found us'),
  mobilityNeeds: z.string().optional(),
  additionalComments: z.string().optional(),
});

export type ServiceRequestFormData = z.infer<typeof serviceRequestFormSchema>;

// ============================================
// INTERNSHIP APPLICATION
// ============================================

export const internshipFormSchema = z.object({
  // Section 1: Personal Information
  fullName: nameSchema,
  email: emailSchema,
  phone: z.string().min(10, 'Phone number is required'),
  address: z.string().optional(),
  
  // Academic Information
  schoolName: z.string().min(1, 'School name is required'),
  major: z.string().min(1, 'Major/program is required'),
  academicYear: z.string().min(1, 'Please select your academic year'),
  academicYearOther: z.string().optional(),
  
  // Section 2: Internship Details
  internshipTypes: z.array(z.string()).min(1, 'Select at least one focus area'),
  internshipTypeOther: z.string().optional(),
  desiredTerm: z.string().min(1, 'Please select desired internship term'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  hoursRequired: z.string().optional(),
  
  // Section 3: Experience & Goals
  whyIntern: z.string().min(20, 'Please provide at least 20 characters'),
  learningGoals: z.string().min(20, 'Please provide at least 20 characters'),
  relevantExperience: z.string().optional(),
  priorExperience: z.string().min(1, 'Please select an option'),
  
  // Section 4: Availability & Logistics
  weeklyAvailability: z.string().min(10, 'Please describe your availability'),
  receivingCredit: z.string().min(1, 'Please select an option'),
  requiresSiteAgreement: z.string().min(1, 'Please select an option'),
  
  // Section 5: Consent & Signature
  consentToContact: z.boolean().refine((val) => val === true, {
    message: 'You must consent to be contacted',
  }),
  electronicSignature: z.string().min(2, 'Please type your full name'),
  signatureDate: z.string().min(1, 'Date is required'),
});

export type InternshipFormData = z.infer<typeof internshipFormSchema>;

// ============================================
// EMPLOYMENT APPLICATION
// ============================================

export const employmentFormSchema = z.object({
  // Personal
  fullName: nameSchema,
  email: emailSchema,
  phone: z.string().min(10, 'Phone number is required'),
  linkedinProfile: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  
  // Qualifications
  highestDegree: z.enum(['bachelors', 'masters', 'doctorate', 'other']),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  isBoardCertified: z.enum(['yes', 'no', 'in_progress']),
  certificationNumber: z.string().optional(),
  hasArizonaLicense: z.enum(['yes', 'no', 'will_obtain']),
  yearsExperience: z.number().min(0),
  
  // Experience
  neurologicExperience: z.string().min(20, 'Please describe your experience'),
  specializations: z.array(z.string()).min(1, 'Select at least one specialization'),
  
  // Position
  positionType: z.enum(['full-time', 'part-time', 'contract', 'per-diem']),
  desiredStartDate: z.string().min(1, 'Desired start date is required'),
  salaryExpectations: z.string().optional(),
  
  // Availability
  availableEvenings: z.enum(['yes', 'no', 'sometimes']),
  availableWeekends: z.enum(['yes', 'no', 'sometimes']),
  
  // Additional
  howDidYouHear: z.string().min(1, 'Please let us know how you found this position'),
  additionalInfo: z.string().optional(),
});

export type EmploymentFormData = z.infer<typeof employmentFormSchema>;

// ============================================
// MUSIC LESSONS ENROLLMENT
// ============================================

export const musicLessonsFormSchema = z.object({
  studentName: nameSchema,
  studentAge: z.number().min(1).max(150),
  email: emailSchema,
  phone: z.string().min(10, 'Phone number is required'),
  parentGuardianName: z.string().optional(),
  
  previousExperience: z.string(),
  preferredInstrument: z.string().min(1, 'Please select an instrument'),
  preferredDays: z.array(z.string()).min(1, 'Select at least one day'),
  preferredTime: z.string().min(1, 'Select a preferred time'),
  specialNeeds: z.string().optional(),
});

export type MusicLessonsFormData = z.infer<typeof musicLessonsFormSchema>;

// ============================================
// PROFESSIONAL CONSULTATION
// ============================================

export const consultationFormSchema = z.object({
  // Section 1: Contact Information
  fullName: nameSchema,
  organization: z.string().min(1, 'Organization name is required'),
  jobTitle: z.string().optional(),
  email: emailSchema,
  phone: z.string().min(10, 'Phone number is required'),
  
  // Section 2: Consultation Details
  consultationType: z.string().min(1, 'Please select consultation type'),
  consultationTypeOther: z.string().optional(),
  description: z.string().min(20, 'Please provide at least 20 characters'),
  preferredFormat: z.string().min(1, 'Please select preferred format'),
  preferredDates: z.string().optional(),
  estimatedParticipants: z.string().optional(),
  
  // Section 3: Additional Information
  previousAttendance: z.string().min(1, 'Please select an option'),
  howDidYouHear: z.string().min(1, 'Please let us know how you heard about this'),
  howDidYouHearOther: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export type ConsultationFormData = z.infer<typeof consultationFormSchema>;

// ============================================
// CORPORATE SPONSORSHIP
// ============================================

export const corporateSponsorshipFormSchema = z.object({
  // Company
  companyName: z.string().min(1, 'Company name is required'),
  industry: z.string().min(1, 'Industry is required'),
  companyWebsite: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  companyAddress: z.string(),
  
  // Contact
  contactName: nameSchema,
  contactTitle: z.string().min(1, 'Title/position is required'),
  contactEmail: emailSchema,
  contactPhone: z.string().min(10, 'Phone number is required'),
  
  // Sponsorship
  sponsorshipLevel: z.string().min(1, 'Please select a sponsorship level'),
  areasOfInterest: z.array(z.string()).min(1, 'Select at least one area'),
  partnershipGoals: z.string().min(50, 'Please describe your goals'),
  specificCauses: z.string().optional(),
  csrPriorities: z.string().optional(),
  
  // Recognition
  recognitionPreferences: z.array(z.string()).min(1, 'Select at least one preference'),
  employeeEngagement: z.array(z.string()),
  
  // Timeline
  preferredStartDate: z.string().optional(),
  budgetCycle: z.string().min(1, 'Budget cycle is required'),
  decisionTimeline: z.string().min(1, 'Decision timeline is required'),
  
  // Additional
  howDidYouHear: z.string().min(1, 'Please let us know how you found us'),
  additionalQuestions: z.string().optional(),
});

export type CorporateSponsorshipFormData = z.infer<typeof corporateSponsorshipFormSchema>;
