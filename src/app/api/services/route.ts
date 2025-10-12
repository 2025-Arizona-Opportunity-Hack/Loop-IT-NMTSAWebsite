import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClientWithAuth, getBearerToken } from '@/lib/supabase/api'

/**
 * GET /api/services
 * Fetch all active services
 * Query params:
 *  - category (optional) - Filter by category (training|support|resources|advocacy)
 *  - all=true (optional, admin only) - Get all services including inactive
 */
export async function GET(request: NextRequest) {
  try {
    // Support both cookie and bearer token authentication
    const bearerToken = getBearerToken(request)
    const supabase = bearerToken 
      ? createClientWithAuth(bearerToken)
      : await createClient()
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const showAll = searchParams.get('all') === 'true'

    let query = supabase
      .from('services')
      .select('*')
      .order('order_position', { ascending: true })

    // Filter by category if provided
    if (category) {
      const validCategories = ['training', 'support', 'resources', 'advocacy']
      if (validCategories.includes(category)) {
        query = query.eq('category', category as 'training' | 'support' | 'resources' | 'advocacy')
      }
    }

    // Check active status
    if (showAll) {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { data: profile } = await supabase
          .from('users_profile')
          .select('role')
          .eq('id', user.id)
          .single()

        if (profile?.role !== 'admin') {
          query = query.eq('is_active', true)
        }
      } else {
        query = query.eq('is_active', true)
      }
    } else {
      query = query.eq('is_active', true)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ services: data || [] })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/services
 * Create a new service (admin only)
 * Body: { title, description, category, image_url, order_position, is_active }
 */
export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { title, description, category, image_url, order_position, is_active } = body

    if (!title || !category) {
      return NextResponse.json(
        { error: 'Title and category are required' },
        { status: 400 }
      )
    }

    const validCategories = ['training', 'support', 'resources', 'advocacy']
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be one of: training, support, resources, advocacy' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('services')
      .insert({
        title,
        description,
        category,
        image_url,
        order_position: order_position || 0,
        is_active: is_active !== undefined ? is_active : true,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
