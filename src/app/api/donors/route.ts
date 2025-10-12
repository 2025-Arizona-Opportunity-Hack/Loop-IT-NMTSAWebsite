import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClientWithAuth, getBearerToken } from '@/lib/supabase/api'

/**
 * POST /api/donors
 * Create new donor record
 * Body: { name, email, phone, address, donation_amount, donation_method, is_recurring, frequency, anonymous, message, metadata }
 */
export async function POST(request: NextRequest) {
  try {
    const bearerToken = getBearerToken(request)
    const supabase = bearerToken 
      ? createClientWithAuth(bearerToken)
      : await createClient()

    const body = await request.json()
    const { 
      name, 
      email, 
      phone, 
      address, 
      donation_amount, 
      donation_method, 
      is_recurring, 
      frequency, 
      anonymous, 
      message, 
      metadata 
    } = body

    // Validate required fields
    if (!name || !email || !donation_amount) {
      return NextResponse.json(
        { error: 'name, email, and donation_amount are required' },
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

    // Validate donation amount
    if (typeof donation_amount !== 'number' || donation_amount <= 0) {
      return NextResponse.json(
        { error: 'donation_amount must be a positive number' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('donors')
      .insert({
        name,
        email,
        phone,
        address,
        donation_amount,
        donation_method,
        is_recurring: is_recurring || false,
        frequency,
        anonymous: anonymous || false,
        message,
        metadata,
        tax_receipt_sent: false,
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
        message: 'Donation recorded successfully',
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
 * GET /api/donors
 * Get all donors (admin only)
 * Query params:
 *  - is_recurring (optional) - Filter by recurring status
 *  - anonymous (optional) - Filter by anonymous status
 *  - limit (optional) - Limit results (default: 50)
 */
export async function GET(request: NextRequest) {
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

    const searchParams = request.nextUrl.searchParams
    const is_recurring = searchParams.get('is_recurring')
    const anonymous = searchParams.get('anonymous')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = supabase
      .from('donors')
      .select('*')
      .order('donation_date', { ascending: false })
      .limit(limit)

    if (is_recurring !== null) {
      query = query.eq('is_recurring', is_recurring === 'true')
    }

    if (anonymous !== null) {
      query = query.eq('anonymous', anonymous === 'true')
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
