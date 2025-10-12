import { createClient } from '@/lib/supabase/client';
import type {
  ContactFormData,
  VolunteerFormData,
  DonationFormData,
  ServiceRequestFormData,
  InternshipFormData,
  EmploymentFormData,
  MusicLessonsFormData,
  ConsultationFormData,
  CorporateSponsorshipFormData,
} from './schemas';

// ============================================
// HELPER FUNCTIONS
// ============================================

async function saveFormSubmission(
  formType: string,
  name: string,
  email: string,
  phone: string | undefined,
  message: string | undefined,
  metadata: any
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('form_submissions')
    .insert({
      form_type: formType as any,
      name,
      email,
      phone: phone || null,
      message: message || null,
      metadata,
      status: 'pending',
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving form submission:', error);
    throw new Error('Failed to submit form. Please try again.');
  }

  return data;
}

// ============================================
// CONTACT FORM
// ============================================

export async function submitContactForm(data: ContactFormData) {
  await saveFormSubmission(
    'contact',
    data.name,
    data.email,
    data.phone,
    data.message,
    {
      subject: data.subject,
    }
  );
}

// ============================================
// VOLUNTEER FORM
// ============================================

export async function submitVolunteerForm(data: VolunteerFormData) {
  const supabase = createClient();

  // Save to form_submissions
  const submission = await saveFormSubmission(
    'volunteer',
    data.fullName,
    data.email,
    data.phone,
    data.whyVolunteer,
    {
      fullData: data,
    }
  );

  // Optionally create a volunteer record
  const { error: volunteerError } = await supabase
    .from('volunteers')
    .insert({
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      address: { full: data.address },
      emergency_contact: {
        name: data.emergencyContactName,
        phone: data.emergencyContactPhone,
        relationship: data.emergencyContactRelationship,
      },
      preferred_days: data.preferredDays,
      preferred_times: data.preferredTime,
      hours_per_week: data.hoursPerWeek,
      skills: data.skills,
      notes: data.whyVolunteer,
      metadata: {
        date_of_birth: data.dateOfBirth,
        previous_experience: data.previousExperience,
        musical_instruments: data.musicalInstruments,
        background_check_consent: data.backgroundCheckConsent,
        commitment_agreement: data.commitmentAgreement,
      },
      status: 'active',
    });

  if (volunteerError) {
    console.error('Error creating volunteer record:', volunteerError);
    // Don't throw - form submission was successful
  }

  return submission;
}

// ============================================
// DONATION FORM
// ============================================

export async function submitDonationForm(data: DonationFormData) {
  const supabase = createClient();

  // Save to form_submissions with correct form_type
  const submission = await saveFormSubmission(
    'donation',
    data.name,
    data.email,
    data.phone,
    data.message,
    {
      donorType: data.donorType,
      amount: data.amount,
      donationType: data.donationType,
      isAnonymous: data.isAnonymous,
      inHonorOf: data.inHonorOf,
      mailingAddress: data.mailingAddress,
    }
  );

  // Optionally create a donor record
  const { error: donorError } = await supabase
    .from('donors')
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      address: data.mailingAddress ? { full: data.mailingAddress } : null,
      donation_amount: data.amount,
      donation_date: new Date().toISOString().split('T')[0],
      payment_method: 'pending',
      notes: data.message,
      metadata: {
        donor_type: data.donorType,
        donation_type: data.donationType,
        is_anonymous: data.isAnonymous,
        in_honor_of: data.inHonorOf,
      },
    });

  if (donorError) {
    console.error('Error creating donor record:', donorError);
  }

  return submission;
}

// ============================================
// SERVICE REQUEST FORM
// ============================================

export async function submitServiceRequestForm(data: ServiceRequestFormData) {
  await saveFormSubmission(
    'service_request',
    data.contactName,
    data.contactEmail,
    data.contactPhone,
    data.goalDetails,
    {
      fullData: data,
    }
  );
}

// ============================================
// INTERNSHIP FORM
// ============================================

export async function submitInternshipForm(data: InternshipFormData) {
  const supabase = createClient();

  // Save to form_submissions with correct form_type
  const submission = await saveFormSubmission(
    'internship',
    data.fullName,
    data.email,
    data.phone,
    data.whyIntern,
    {
      fullData: data,
      academic: {
        school: data.schoolName,
        major: data.major,
        academic_year: data.academicYear,
        academic_year_other: data.academicYearOther,
      },
      internship_details: {
        types: data.internshipTypes,
        type_other: data.internshipTypeOther,
        desired_term: data.desiredTerm,
        start_date: data.startDate,
        end_date: data.endDate,
        hours_required: data.hoursRequired,
      },
      experience: {
        why_intern: data.whyIntern,
        learning_goals: data.learningGoals,
        relevant_experience: data.relevantExperience,
        prior_experience: data.priorExperience,
      },
      logistics: {
        weekly_availability: data.weeklyAvailability,
        receiving_credit: data.receivingCredit,
        requires_site_agreement: data.requiresSiteAgreement,
      },
      signature: {
        consent_to_contact: data.consentToContact,
        electronic_signature: data.electronicSignature,
        signature_date: data.signatureDate,
      },
    }
  );

  return submission;
}

// ============================================
// EMPLOYMENT FORM
// ============================================

export async function submitEmploymentForm(data: EmploymentFormData) {
  // Only save to form_submissions for employment applications
  // The employees table is for actual employees, not applicants
  return await saveFormSubmission(
    'employment',
    data.fullName,
    data.email,
    data.phone,
    data.additionalInfo,
    {
      fullData: data,
    }
  );
}

// ============================================
// MUSIC LESSONS FORM
// ============================================

export async function submitMusicLessonsForm(data: MusicLessonsFormData): Promise<void> {
  await saveFormSubmission(
    'music_lessons',
    data.studentName,
    data.email,
    data.phone,
    data.specialNeeds,
    {
      fullData: data,
    }
  );
}

// ============================================
// CONSULTATION FORM (Used for Volunteer Applications)
// ============================================

export async function submitConsultationForm(data: ConsultationFormData) {
  await saveFormSubmission(
    'consultation',
    data.fullName,
    data.email,
    data.phone,
    data.description,
    {
      fullData: data,
      organization: data.organization,
      job_title: data.jobTitle,
      consultation_type: data.consultationType,
      consultation_type_other: data.consultationTypeOther,
      preferred_format: data.preferredFormat,
      preferred_dates: data.preferredDates,
      estimated_participants: data.estimatedParticipants,
      previous_attendance: data.previousAttendance,
      how_did_you_hear: data.howDidYouHear,
      how_did_you_hear_other: data.howDidYouHearOther,
      additional_notes: data.additionalNotes,
    }
  );
}

// ============================================
// CORPORATE SPONSORSHIP FORM
// ============================================

export async function submitCorporateSponsorshipForm(data: CorporateSponsorshipFormData) {
  await saveFormSubmission(
    'corporate_sponsorship',
    data.contactName,
    data.contactEmail,
    data.contactPhone,
    data.partnershipGoals,
    {
      fullData: data,
    }
  );
}
