import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClientWithAuth, getBearerToken } from '@/lib/supabase/api'

/**
 * POST /api/forms
 * Submit a form (contact, volunteer, or client inquiry)
 * Body: { form_type, name, email, phone?, message?, metadata? }
 */
export async function POST(request: NextRequest) {
  try {
    // Support both cookie and bearer token authentication
    const bearerToken = getBearerToken(request)
    const supabase = bearerToken 
      ? createClientWithAuth(bearerToken)
      : await createClient()
    const body = await request.json()

    const { form_type, name, email, phone, message, metadata } = body

    // Validate required fields
    if (!form_type || !name || !email) {
      return NextResponse.json(
        { error: 'form_type, name, and email are required' },
        { status: 400 }
      )
    }

    // Validate form_type
    const validFormTypes = ['volunteer', 'contact', 'client_inquiry']
    if (!validFormTypes.includes(form_type)) {
      return NextResponse.json(
        { error: 'Invalid form_type. Must be one of: volunteer, contact, client_inquiry' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('form_submissions')
      .insert({
        form_type,
        name,
        email,
        phone,
        message,
        metadata,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Form submitted successfully',
        data 
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/forms
 * Get all form submissions (admin only)
 * Query params:
 *  - form_type (optional) - Filter by form type
 *  - status (optional) - Filter by status (pending|reviewed|resolved)
 *  - limit (optional) - Limit results (default: 50)
 */
export async function GET(request: NextRequest) {
  try {
    // Support both cookie and bearer token authentication
    const bearerToken = getBearerToken(request)
    const supabase = bearerToken 
      ? createClientWithAuth(bearerToken)
      : await createClient()

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: profile } = await supabase
      .from('users_profile')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const form_type = searchParams.get('form_type')
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    // Validate and filter by form_type if provided
    if (form_type) {
      const validFormTypes = ['volunteer', 'contact', 'client_inquiry']
      if (validFormTypes.includes(form_type)) {
        query = query.eq('form_type', form_type as 'volunteer' | 'contact' | 'client_inquiry')
      }
    }

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
