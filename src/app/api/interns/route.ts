import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClientWithAuth, getBearerToken } from '@/lib/supabase/api'

/**
 * POST /api/interns
 * Create new intern (admin only)
 * Body: { user_id, name, email, phone, address, emergency_contact, school_name, major, graduation_date, start_date, end_date, mentor_name, mentor_email, department, position_title, stipend_amount, academic_credit, notes, metadata }
 */
export async function POST(request: NextRequest) {
  try {
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

    const body = await request.json()
    const { 
      user_id, 
      name, 
      email, 
      phone, 
      address, 
      emergency_contact, 
      school_name,
      major,
      graduation_date,
      start_date,
      end_date,
      mentor_name,
      mentor_email,
      department,
      position_title,
      stipend_amount,
      academic_credit,
      notes, 
      metadata 
    } = body

    // Validate required fields
    if (!name || !email || !start_date || !position_title) {
      return NextResponse.json(
        { error: 'name, email, start_date, and position_title are required' },
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
      .from('interns')
      .insert({
        user_id,
        name,
        email,
        phone,
        address,
        emergency_contact,
        school_name,
        major,
        graduation_date,
        start_date,
        end_date,
        mentor_name,
        mentor_email,
        department,
        position_title,
        status: 'active',
        stipend_amount,
        academic_credit: academic_credit || false,
        notes,
        metadata,
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
        message: 'Intern created successfully',
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
 * GET /api/interns
 * Get all interns (admin and volunteer role can access)
 * Query params:
 *  - status (optional) - Filter by status
 *  - limit (optional) - Limit results (default: 50)
 */
export async function GET(request: NextRequest) {
  try {
    const bearerToken = getBearerToken(request)
    const supabase = bearerToken 
      ? createClientWithAuth(bearerToken)
      : await createClient()

    // Check if user is admin or volunteer
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

    if (!profile || !['admin', 'volunteer'].includes(profile.role)) {
      return NextResponse.json(
        { error: 'Forbidden: Admin or Volunteer access required' },
        { status: 403 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = supabase
      .from('interns')
      .select('*')
      .order('start_date', { ascending: false })
      .limit(limit)

    if (status) {
      const validStatuses = ['active', 'inactive', 'completed', 'on_hold']
      if (validStatuses.includes(status)) {
        query = query.eq('status', status as 'active' | 'inactive' | 'completed' | 'on_hold')
      }
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
