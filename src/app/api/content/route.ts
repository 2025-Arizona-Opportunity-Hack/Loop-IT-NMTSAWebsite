import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClientWithAuth, getBearerToken } from '@/lib/supabase/api'

/**
 * GET /api/content
 * Get page content by key or all content
 * Query params:
 *  - key (optional) - Get specific page content by key
 *  - keys (optional) - Get multiple page content items (comma-separated)
 */
export async function GET(request: NextRequest) {
  try {
    // Support both cookie and bearer token authentication
    const bearerToken = getBearerToken(request)
    const supabase = bearerToken 
      ? createClientWithAuth(bearerToken)
      : await createClient()
    const searchParams = request.nextUrl.searchParams
    const key = searchParams.get('key')
    const keys = searchParams.get('keys')

    if (key) {
      // Get single content item
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_key', key)
        .eq('is_active', true)
        .single()

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 404 }
        )
      }

      return NextResponse.json(data)
    } else if (keys) {
      // Get multiple content items
      const keyArray = keys.split(',').map(k => k.trim())
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .in('page_key', keyArray)
        .eq('is_active', true)

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        )
      }

      return NextResponse.json({ content: data || [] })
    } else {
      // Get all active content
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('is_active', true)

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        )
      }

      return NextResponse.json({ content: data || [] })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/content
 * Create or update page content (admin only)
 * Body: { page_key, title, content, metadata?, is_active? }
 * 
 * Uses upsert - if page_key exists, it will update; otherwise, it creates new content
 * Returns 201 for new content, 200 for updated content
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
    const { page_key, title, content, metadata, is_active } = body

    if (!page_key) {
      return NextResponse.json(
        { error: 'page_key is required' },
        { status: 400 }
      )
    }

    // Check if content with this page_key already exists
    const { data: existing } = await supabase
      .from('page_content')
      .select('id')
      .eq('page_key', page_key)
      .single()

    // Use upsert to handle duplicates - update if exists, insert if not
    const { data, error } = await supabase
      .from('page_content')
      .upsert({
        page_key,
        title,
        content,
        metadata,
        is_active: is_active !== undefined ? is_active : true,
      }, {
        onConflict: 'page_key'
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    // Return appropriate status code
    const statusCode = existing ? 200 : 201
    return NextResponse.json(data, { status: statusCode })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/content
 * Update page content by key (admin only)
 * Body: { page_key, title?, content?, metadata?, is_active? }
 */
export async function PATCH(request: NextRequest) {
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
    const { page_key, ...updateData } = body

    if (!page_key) {
      return NextResponse.json(
        { error: 'page_key is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('page_content')
      .update(updateData)
      .eq('page_key', page_key)
      .select()
      .single()

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
