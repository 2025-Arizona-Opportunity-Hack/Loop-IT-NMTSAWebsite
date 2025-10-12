import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClientWithAuth, getBearerToken } from '@/lib/supabase/api'

/**
 * POST /api/upload
 * Upload a file to Supabase Storage (admin only)
 * Body (multipart/form-data):
 *  - file: File
 *  - bucket: string (employee-photos | service-images)
 *  - path?: string (optional subfolder path)
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

    const formData = await request.formData()
    const file = formData.get('file') as File
    const bucket = formData.get('bucket') as string
    const pathPrefix = formData.get('path') as string | null

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      )
    }

    if (!bucket) {
      return NextResponse.json(
        { error: 'Bucket name is required' },
        { status: 400 }
      )
    }

    const validBuckets = ['employee-photos', 'service-images']
    if (!validBuckets.includes(bucket)) {
      return NextResponse.json(
        { error: 'Invalid bucket. Must be one of: employee-photos, service-images' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const filePath = pathPrefix ? `${pathPrefix}/${fileName}` : fileName

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const fileBuffer = new Uint8Array(arrayBuffer)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return NextResponse.json(
      {
        message: 'File uploaded successfully',
        data: {
          path: data.path,
          publicUrl,
          bucket,
        },
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
 * DELETE /api/upload
 * Delete a file from Supabase Storage (admin only)
 * Body: { bucket: string, paths: string[] }
 */
export async function DELETE(request: NextRequest) {
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
    const { bucket, paths } = body

    if (!bucket || !paths || !Array.isArray(paths)) {
      return NextResponse.json(
        { error: 'bucket and paths (array) are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .remove(paths)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Files deleted successfully',
      data,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
