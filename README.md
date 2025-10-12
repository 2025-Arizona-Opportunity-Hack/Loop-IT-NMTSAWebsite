# NMTSA Website - Loop IT

> Transforming lives through music and neuroscience

## Team "Loop IT"

- **Smit Patel** - [GitHub](https://github.com/smit30patel)
- **Shubham Tiwari** - [GitHub](https://github.com/shubham17tiwari)
- **Kirtan Thummar** - [GitHub](https://github.com/VanGoghCode)

**Slack Channel:** [#loopit](https://opportunity-hack.slack.com/app_redirect?channel=loopit)

## Problem Statement

Neurologic Music Therapy Services of Arizona (NMTSA) needed a modern, accessible website platform to better represent their mission and streamline operations for managing donors, volunteers, interns, and merchandise sales.

## Solution

A full-stack web application with:
- Modern, responsive design built with Next.js 14 and Tailwind CSS
- Secure admin dashboard with role-based access control
- Comprehensive management systems for volunteers, interns, donors, and merchandise
- RESTful API for all data operations
- Row-level security for data protection

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Forms:** React Hook Form with Zod validation
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Hosting:** Vercel

## Key Features

### 🔐 Admin Dashboard
- Role-based access control (admin/employee/intern/volunteer)
- Content management system
- User management

### 🛍️ Marketplace
- Product catalog with categories
- Inventory management
- Order tracking and management

### 💰 Donor Management
- Donation tracking
- Recurring donation support
- Tax receipt tracking

### 🤝 Volunteer & Intern Management
- Profile management
- Hours tracking and verification
- Background check tracking
- Mentor assignment

### 📝 Content Management
- Dynamic page content
- Service offerings
- Employee profiles

### 📋 Custom Forms System
- React Hook Form with Zod validation
- Modal-based form interface for better UX
- Contact, volunteer, internship, donation, and service request forms
- Direct Supabase integration
- Type-safe form handling
- **Active Forms:**
  - ✅ Contact Form
  - ✅ Volunteer Application (Professional Consultation)
  - ✅ Internship Application
  - ✅ Service Request Forms

### 🎯 Get Involved Features
- Interactive card-based interface
- Detailed information modals for each opportunity
- Inline form applications with validation
- Volunteer, Internship, and Employment opportunities
- Real-time form submission with success feedback

## API Endpoints

All endpoints support CRUD operations where applicable:

- `/api/content` - Page content management
- `/api/services` - Service offerings
- `/api/employees` - Staff management
- `/api/merchandise` - Product catalog
- `/api/orders` - Order management
- `/api/donors` - Donor tracking
- `/api/volunteers` - Volunteer management
- `/api/volunteer-hours` - Hours tracking
- `/api/interns` - Intern management
- `/api/intern-hours` - Intern hours tracking
- `/api/forms` - Form submissions
- `/api/settings` - Site configuration
- `/api/upload` - File uploads

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- Supabase account

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/2025-Arizona-Opportunity-Hack/Loop-IT-NMTSAWebsite.git
cd Loop-IT-NMTSAWebsite
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Setup database**

Run migrations in order from `supabase/migrations/`:
- `001_initial_schema.sql`
- `002_fix_rls_recursion.sql`
- `003_add_marketplace_donors_tracking.sql`

Then run `supabase/create_first_admin.sql` to create your admin user.

5. **Start development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Available Commands

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run linter
```

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard
│   │   ├── api/            # API routes
│   │   ├── login/          # Auth pages
│   │   ├── about/          # About page
│   │   ├── programs/       # Programs pages
│   │   ├── get-involved/   # Get involved page
│   │   └── page.tsx        # Homepage
│   ├── components/
│   │   ├── forms/          # Custom form system
│   │   │   ├── ContactForm.tsx           # Contact form
│   │   │   ├── ConsultationForm.tsx      # Volunteer application
│   │   │   ├── InternshipForm.tsx        # Internship application
│   │   │   └── FormComponents.tsx        # Reusable form UI
│   │   ├── HomePage.tsx        # Homepage component
│   │   ├── GetInvolvedPage.tsx # Get involved with modals
│   │   ├── ContactPage.tsx     # Contact page
│   │   └── [other pages]       # Other page components
│   ├── lib/
│   │   ├── forms/          # Form schemas & actions
│   │   │   ├── schemas.ts  # Zod validation schemas
│   │   │   └── actions.ts  # Form submission handlers
│   │   └── supabase/       # Database utilities
│   └── middleware.ts       # Auth middleware
├── supabase/               # Database migrations
└── public/                 # Static assets
```

## Forms Documentation

### Active Forms

#### 1. **Volunteer Application (Professional Consultation)**
Modal-based form accessible from Get Involved page. Includes:
- Section 1: Contact Information (Name, Organization, Job Title, Email, Phone)
- Section 2: Consultation Details (Type, Description, Format, Dates, Participants)
- Section 3: Additional Information (Previous Attendance, Referral Source, Notes)

**Features:**
- Professional consultation requests
- Training and observation visits
- Guest lectures and research collaboration
- Conditional "Other" fields for flexible responses

#### 2. **Internship Application**
Comprehensive modal-based application form with:
- Section 1: Personal Information (Name, Email, Phone, Address, School, Major, Academic Year)
- Section 2: Internship Details (Focus Areas, Term, Dates, Hours Required)
- Section 3: Experience & Goals (Motivation, Learning Objectives, Prior Experience)
- Section 4: Availability & Logistics (Schedule, Academic Credit, Site Agreement)
- Section 5: Consent & Signature (Electronic signature with date)

**Features:**
- Multi-checkbox selection for internship types
- Date pickers for start/end dates
- Conditional fields based on selections
- Auto-populated signature date
- Full form validation with Zod

#### 3. **Contact Form**
Standard contact form with subject selection and message field.

### Form Submission Flow

1. User clicks on card or "Apply" button
2. Information modal appears with full details (optional viewing)
3. User clicks "Apply for [Role]" button
4. Form modal opens with relevant application
5. User fills out form with real-time validation
6. On submit, data is saved to Supabase `form_submissions` table
7. Success message displayed
8. Modal auto-closes after 3 seconds

### Adding New Forms

See `FORMS_QUICK_START.md` for complete guide on creating new forms.

**Schema Location:** `src/lib/forms/schemas.ts`
**Action Location:** `src/lib/forms/actions.ts`
**Component Location:** `src/components/forms/`

---

## Recent Updates (October 2025)

### Get Involved Page Enhancement
- ✅ Added modal-based information display for all opportunities
- ✅ Implemented Volunteer Application form (Professional Consultation)
- ✅ Implemented Internship Application form with full validation
- ✅ Removed expanding cards in favor of modal popups
- ✅ Added "Click for more details" interaction on cards
- ✅ Separate modals for info viewing and form submission
- ✅ Auto-close feature for successful form submissions

### Form System Improvements
- ✅ Updated form schemas for new application types
- ✅ Integrated React Hook Form with modal system
- ✅ Added comprehensive field validation
- ✅ Implemented conditional field rendering
- ✅ Enhanced user feedback and error handling

---

**Previous Status:**
- ✅ Contact Form - Ready to use
- ⏳ 8 additional forms - Schemas ready, need components

**Current Status:**
- ✅ Contact Form - Active
- ✅ Volunteer Application (Consultation) - Active
- ✅ Internship Application - Active
- ⏳ Donation Form - Schema ready
- ⏳ Service Request Form - Schema ready
- ⏳ Music Lessons Form - Schema ready
- ⏳ Employment Application - Schema ready
- ⏳ Corporate Sponsorship - Schema ready

## Links

- **Nonprofit:** [NMTSA](https://ohack.dev/nonprofit/coDhSpsyG5uqgpmm0SdS)
- **Hackathon:** [2025 Fall Opportunity Hack](https://www.ohack.dev/hack/2025_fall)
- **DevPost:** [Submit here](https://opportunity-hack-2025-arizona.devpost.com/)

## License

MIT License
