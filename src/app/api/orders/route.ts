import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClientWithAuth, getBearerToken } from '@/lib/supabase/api'

/**
 * POST /api/orders
 * Create new order
 * Body: { customer_name, customer_email, customer_phone, shipping_address, items, subtotal, tax, shipping_cost, total, payment_method, notes }
 */
export async function POST(request: NextRequest) {
  try {
    const bearerToken = getBearerToken(request)
    const supabase = bearerToken 
      ? createClientWithAuth(bearerToken)
      : await createClient()

    const body = await request.json()
    const { 
      customer_name, 
      customer_email, 
      customer_phone, 
      shipping_address, 
      items, 
      subtotal, 
      tax, 
      shipping_cost, 
      total, 
      payment_method, 
      notes 
    } = body

    // Validate required fields
    if (!customer_name || !customer_email || !shipping_address || !items || !subtotal || !total) {
      return NextResponse.json(
        { error: 'customer_name, customer_email, shipping_address, items, subtotal, and total are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customer_email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'items must be a non-empty array' },
        { status: 400 }
      )
    }

    // Generate unique order number
    const order_number = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`

    const { data, error } = await supabase
      .from('orders')
      .insert({
        order_number,
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        items,
        subtotal,
        tax: tax || 0,
        shipping_cost: shipping_cost || 0,
        total,
        payment_method,
        payment_status: 'pending',
        status: 'pending',
        notes,
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
        message: 'Order created successfully',
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
 * GET /api/orders
 * Get all orders (admin only)
 * Query params:
 *  - status (optional) - Filter by status
 *  - customer_email (optional) - Filter by customer email
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
    const status = searchParams.get('status')
    const customer_email = searchParams.get('customer_email')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (status) {
      const validStatuses = ['pending', 'processing', 'completed', 'cancelled']
      if (validStatuses.includes(status)) {
        query = query.eq('status', status as 'pending' | 'processing' | 'completed' | 'cancelled')
      }
    }

    if (customer_email) {
      query = query.eq('customer_email', customer_email)
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
