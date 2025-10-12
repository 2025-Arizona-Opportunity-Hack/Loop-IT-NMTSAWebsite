import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClientWithAuth, getBearerToken } from '@/lib/supabase/api'

/**
 * GET /api/settings
 * Get site settings
 * Query params:
 *  - key (optional) - Get specific setting by key
 *  - keys (optional) - Get multiple settings (comma-separated)
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
      // Get single setting
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('setting_key', key)
        .single()

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 404 }
        )
      }

      return NextResponse.json(data)
    } else if (keys) {
      // Get multiple settings
      const keyArray = keys.split(',').map(k => k.trim())
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .in('setting_key', keyArray)

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        )
      }

      // Convert to key-value object
      const settings = data.reduce((acc, setting) => {
        acc[setting.setting_key] = setting.setting_value
        return acc
      }, {} as Record<string, string>)

      return NextResponse.json(settings)
    } else {
      // Get all settings
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        )
      }

      // Convert to key-value object
      const settings = data.reduce((acc, setting) => {
        acc[setting.setting_key] = setting.setting_value
        return acc
      }, {} as Record<string, string>)

      return NextResponse.json(settings)
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/settings
 * Create or update a site setting (admin only)
 * Body: { setting_key, setting_value, description? }
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
    const { setting_key, setting_value, description } = body

    if (!setting_key || !setting_value) {
      return NextResponse.json(
        { error: 'setting_key and setting_value are required' },
        { status: 400 }
      )
    }

    // Use upsert to create or update
    const { data, error } = await supabase
      .from('site_settings')
      .upsert(
        {
          setting_key,
          setting_value,
          description,
        },
        { onConflict: 'setting_key' }
      )
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

/**
 * PATCH /api/settings
 * Update a site setting (admin only)
 * Body: { setting_key, setting_value?, description? }
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
    const { setting_key, ...updateData } = body

    if (!setting_key) {
      return NextResponse.json(
        { error: 'setting_key is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('site_settings')
      .update(updateData)
      .eq('setting_key', setting_key)
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
