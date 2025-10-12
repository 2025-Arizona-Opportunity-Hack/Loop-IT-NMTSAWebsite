import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClientWithAuth, getBearerToken } from '@/lib/supabase/api'

/**
 * POST /api/volunteer-hours
 * Create new volunteer hours entry
 * Body: { volunteer_id, activity, description, hours, activity_date, supervisor_name, metadata }
 */
export async function POST(request: NextRequest) {
  try {
    const bearerToken = getBearerToken(request)
    const supabase = bearerToken 
      ? createClientWithAuth(bearerToken)
      : await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { volunteer_id, activity, description, hours, activity_date, supervisor_name, metadata } = body

    // Validate required fields
    if (!volunteer_id || !activity || !hours || !activity_date) {
      return NextResponse.json(
        { error: 'volunteer_id, activity, hours, and activity_date are required' },
        { status: 400 }
      )
    }

    // Validate hours
    if (typeof hours !== 'number' || hours <= 0) {
      return NextResponse.json(
        { error: 'hours must be a positive number' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('volunteer_hours')
      .insert({
        volunteer_id,
        activity,
        description,
        hours,
        activity_date,
        supervisor_name,
        metadata,
        verified: false,
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
        message: 'Volunteer hours logged successfully',
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
 * GET /api/volunteer-hours
 * Get volunteer hours
 * Query params:
 *  - volunteer_id (optional) - Filter by volunteer
 *  - verified (optional) - Filter by verification status
 *  - limit (optional) - Limit results (default: 50)
 */
export async function GET(request: NextRequest) {
  try {
    const bearerToken = getBearerToken(request)
    const supabase = bearerToken 
      ? createClientWithAuth(bearerToken)
      : await createClient()

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
    const volunteer_id = searchParams.get('volunteer_id')
    const verified = searchParams.get('verified')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = supabase
      .from('volunteer_hours')
      .select('*')
      .order('activity_date', { ascending: false })
      .limit(limit)

    if (volunteer_id) {
      query = query.eq('volunteer_id', volunteer_id)
    }

    if (verified !== null) {
      query = query.eq('verified', verified === 'true')
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
