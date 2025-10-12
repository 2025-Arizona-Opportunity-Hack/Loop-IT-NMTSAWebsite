import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClientWithAuth, getBearerToken } from '@/lib/supabase/api'

/**
 * POST /api/merchandise
 * Create new merchandise (admin only)
 * Body: { name, description, category, price, stock_quantity, image_url, images, featured, metadata }
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
    const { name, description, category, price, stock_quantity, image_url, images, featured, metadata } = body

    // Validate required fields
    if (!name || !category || price === undefined) {
      return NextResponse.json(
        { error: 'name, category, and price are required' },
        { status: 400 }
      )
    }

    // Validate price
    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json(
        { error: 'price must be a positive number' },
        { status: 400 }
      )
    }

    // Validate category
    const validCategories = ['apparel', 'accessories', 'digital', 'other']
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be one of: apparel, accessories, digital, other' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('merchandise')
      .insert({
        name,
        description,
        category,
        price,
        stock_quantity: stock_quantity || 0,
        image_url,
        images: images || [],
        featured: featured || false,
        metadata,
        is_active: true,
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
        message: 'Merchandise created successfully',
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
 * GET /api/merchandise
 * Get all merchandise
 * Query params:
 *  - category (optional) - Filter by category
 *  - featured (optional) - Filter by featured status
 *  - active (optional) - Filter by active status (default: true for public, all for admin)
 *  - limit (optional) - Limit results (default: 50)
 */
export async function GET(request: NextRequest) {
  try {
    const bearerToken = getBearerToken(request)
    const supabase = bearerToken 
      ? createClientWithAuth(bearerToken)
      : await createClient()

    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const active = searchParams.get('active')
    const limit = parseInt(searchParams.get('limit') || '50')

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    let isAdmin = false

    if (user) {
      const { data: profile } = await supabase
        .from('users_profile')
        .select('role')
        .eq('id', user.id)
        .single()

      isAdmin = profile?.role === 'admin'
    }

    let query = supabase
      .from('merchandise')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit)

    // Non-admin users can only see active merchandise
    if (!isAdmin) {
      query = query.eq('is_active', true)
    } else if (active !== null) {
      query = query.eq('is_active', active === 'true')
    }

    if (category) {
      const validCategories = ['apparel', 'accessories', 'digital', 'other'] as const
      if (validCategories.includes(category as any)) {
        query = query.eq('category', category as 'apparel' | 'accessories' | 'digital' | 'other')
      }
    }

    if (featured !== null) {
      query = query.eq('featured', featured === 'true')
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
