import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// POST - Approve employee application
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { id } = params;
    const body = await request.json();

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("users_profile")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Validate required fields
    if (!body.role) {
      return NextResponse.json(
        { error: "Role is required" },
        { status: 400 }
      );
    }

    // Call the stored procedure to approve application
    const { data, error } = await supabase.rpc("approve_employee_application", {
      application_id: id,
      admin_id: user.id,
      assigned_role: body.role,
      assigned_department: body.department || null,
      assigned_salary: body.salary || null,
      assigned_start_date: body.start_date || null,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Application approved successfully",
      employee_id: data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
