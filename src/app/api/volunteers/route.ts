import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClientWithAuth, getBearerToken } from '@/lib/supabase/api'

/**
 * POST /api/volunteers
 * Create new volunteer (admin only)
 * Body: { user_id, name, email, phone, address, emergency_contact, skills, interests, availability, notes, metadata }
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
      skills, 
      interests, 
      availability, 
      notes, 
      metadata 
    } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'name and email are required' },
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
      .from('volunteers')
      .insert({
        user_id,
        name,
        email,
        phone,
        address,
        emergency_contact,
        skills: skills || [],
        interests: interests || [],
        availability,
        status: 'active',
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
        message: 'Volunteer created successfully',
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
 * GET /api/volunteers
 * Get all volunteers (admin and volunteer role can access)
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
      .from('volunteers')
      .select('*')
      .order('created_at', { ascending: false })
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
