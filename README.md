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
│   │   └── page.tsx        # Homepage
│   ├── components/         # React components
│   ├── lib/
│   │   └── supabase/       # Database utilities
│   └── middleware.ts       # Auth middleware
├── supabase/               # Database migrations
└── public/                 # Static assets
```

## Links

- **Nonprofit:** [NMTSA](https://ohack.dev/nonprofit/coDhSpsyG5uqgpmm0SdS)
- **Hackathon:** [2025 Fall Opportunity Hack](https://www.ohack.dev/hack/2025_fall)
- **DevPost:** [Submit here](https://opportunity-hack-2025-arizona.devpost.com/)

## License

MIT License
