export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      donors: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          address: Json | null
          donation_amount: number
          donation_date: string
          donation_method: string | null
          is_recurring: boolean
          frequency: string | null
          anonymous: boolean
          message: string | null
          tax_receipt_sent: boolean
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          address?: Json | null
          donation_amount: number
          donation_date?: string
          donation_method?: string | null
          is_recurring?: boolean
          frequency?: string | null
          anonymous?: boolean
          message?: string | null
          tax_receipt_sent?: boolean
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          address?: Json | null
          donation_amount?: number
          donation_date?: string
          donation_method?: string | null
          is_recurring?: boolean
          frequency?: string | null
          anonymous?: boolean
          message?: string | null
          tax_receipt_sent?: boolean
          metadata?: Json | null
          created_at?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          id: string
          name: string
          role: string
          bio: string | null
          image_url: string | null
          order_position: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          bio?: string | null
          image_url?: string | null
          order_position?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          bio?: string | null
          image_url?: string | null
          order_position?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          id: string
          form_type: 'volunteer' | 'contact' | 'client_inquiry'
          name: string
          email: string
          phone: string | null
          message: string | null
          metadata: Json | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          form_type: 'volunteer' | 'contact' | 'client_inquiry'
          name: string
          email: string
          phone?: string | null
          message?: string | null
          metadata?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          form_type?: 'volunteer' | 'contact' | 'client_inquiry'
          name?: string
          email?: string
          phone?: string | null
          message?: string | null
          metadata?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      intern_hours: {
        Row: {
          id: string
          intern_id: string
          project: string
          description: string | null
          hours: number
          activity_date: string
          supervisor_name: string | null
          verified: boolean
          verified_by: string | null
          verified_at: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          intern_id: string
          project: string
          description?: string | null
          hours: number
          activity_date: string
          supervisor_name?: string | null
          verified?: boolean
          verified_by?: string | null
          verified_at?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          intern_id?: string
          project?: string
          description?: string | null
          hours?: number
          activity_date?: string
          supervisor_name?: string | null
          verified?: boolean
          verified_by?: string | null
          verified_at?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "intern_hours_intern_id_fkey"
            columns: ["intern_id"]
            isOneToOne: false
            referencedRelation: "interns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intern_hours_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      interns: {
        Row: {
          id: string
          user_id: string | null
          name: string
          email: string
          phone: string | null
          address: Json | null
          emergency_contact: Json | null
          school_name: string | null
          major: string | null
          graduation_date: string | null
          start_date: string
          end_date: string | null
          mentor_name: string | null
          mentor_email: string | null
          department: string | null
          position_title: string
          status: 'active' | 'inactive' | 'completed' | 'on_hold'
          total_hours: number
          stipend_amount: number | null
          academic_credit: boolean
          performance_reviews: Json
          notes: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          email: string
          phone?: string | null
          address?: Json | null
          emergency_contact?: Json | null
          school_name?: string | null
          major?: string | null
          graduation_date?: string | null
          start_date: string
          end_date?: string | null
          mentor_name?: string | null
          mentor_email?: string | null
          department?: string | null
          position_title: string
          status?: 'active' | 'inactive' | 'completed' | 'on_hold'
          total_hours?: number
          stipend_amount?: number | null
          academic_credit?: boolean
          performance_reviews?: Json
          notes?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          email?: string
          phone?: string | null
          address?: Json | null
          emergency_contact?: Json | null
          school_name?: string | null
          major?: string | null
          graduation_date?: string | null
          start_date?: string
          end_date?: string | null
          mentor_name?: string | null
          mentor_email?: string | null
          department?: string | null
          position_title?: string
          status?: 'active' | 'inactive' | 'completed' | 'on_hold'
          total_hours?: number
          stipend_amount?: number | null
          academic_credit?: boolean
          performance_reviews?: Json
          notes?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interns_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      merchandise: {
        Row: {
          id: string
          name: string
          description: string | null
          category: 'apparel' | 'accessories' | 'digital' | 'other'
          price: number
          stock_quantity: number
          image_url: string | null
          images: Json
          is_active: boolean
          featured: boolean
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category?: 'apparel' | 'accessories' | 'digital' | 'other'
          price: number
          stock_quantity?: number
          image_url?: string | null
          images?: Json
          is_active?: boolean
          featured?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: 'apparel' | 'accessories' | 'digital' | 'other'
          price?: number
          stock_quantity?: number
          image_url?: string | null
          images?: Json
          is_active?: boolean
          featured?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          order_number: string
          customer_name: string
          customer_email: string
          customer_phone: string | null
          shipping_address: Json
          items: Json
          subtotal: number
          tax: number
          shipping_cost: number
          total: number
          status: 'pending' | 'processing' | 'completed' | 'cancelled'
          payment_method: string | null
          payment_status: string
          notes: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          customer_name: string
          customer_email: string
          customer_phone?: string | null
          shipping_address: Json
          items: Json
          subtotal: number
          tax?: number
          shipping_cost?: number
          total: number
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          payment_method?: string | null
          payment_status?: string
          notes?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string | null
          shipping_address?: Json
          items?: Json
          subtotal?: number
          tax?: number
          shipping_cost?: number
          total?: number
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          payment_method?: string | null
          payment_status?: string
          notes?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_content: {
        Row: {
          id: string
          page_key: string
          title: string | null
          content: string | null
          metadata: Json | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          page_key: string
          title?: string | null
          content?: string | null
          metadata?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          page_key?: string
          title?: string | null
          content?: string | null
          metadata?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          id: string
          title: string
          description: string | null
          category: 'training' | 'support' | 'resources' | 'advocacy'
          image_url: string | null
          order_position: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category: 'training' | 'support' | 'resources' | 'advocacy'
          image_url?: string | null
          order_position?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: 'training' | 'support' | 'resources' | 'advocacy'
          image_url?: string | null
          order_position?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      volunteer_hours: {
        Row: {
          id: string
          volunteer_id: string
          activity: string
          description: string | null
          hours: number
          activity_date: string
          supervisor_name: string | null
          verified: boolean
          verified_by: string | null
          verified_at: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          volunteer_id: string
          activity: string
          description?: string | null
          hours: number
          activity_date: string
          supervisor_name?: string | null
          verified?: boolean
          verified_by?: string | null
          verified_at?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          volunteer_id?: string
          activity?: string
          description?: string | null
          hours?: number
          activity_date?: string
          supervisor_name?: string | null
          verified?: boolean
          verified_by?: string | null
          verified_at?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_hours_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_hours_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      volunteers: {
        Row: {
          id: string
          user_id: string | null
          name: string
          email: string
          phone: string | null
          address: Json | null
          emergency_contact: Json | null
          skills: string[]
          interests: string[]
          availability: Json | null
          status: 'active' | 'inactive' | 'completed' | 'on_hold'
          total_hours: number
          background_check_completed: boolean
          background_check_date: string | null
          orientation_completed: boolean
          orientation_date: string | null
          notes: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          email: string
          phone?: string | null
          address?: Json | null
          emergency_contact?: Json | null
          skills?: string[]
          interests?: string[]
          availability?: Json | null
          status?: 'active' | 'inactive' | 'completed' | 'on_hold'
          total_hours?: number
          background_check_completed?: boolean
          background_check_date?: string | null
          orientation_completed?: boolean
          orientation_date?: string | null
          notes?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          email?: string
          phone?: string | null
          address?: Json | null
          emergency_contact?: Json | null
          skills?: string[]
          interests?: string[]
          availability?: Json | null
          status?: 'active' | 'inactive' | 'completed' | 'on_hold'
          total_hours?: number
          background_check_completed?: boolean
          background_check_date?: string | null
          orientation_completed?: boolean
          orientation_date?: string | null
          notes?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users_profile: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'volunteer' | 'user'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'volunteer' | 'user'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'volunteer' | 'user'
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      user_role: 'admin' | 'volunteer' | 'user'
      form_type: 'volunteer' | 'contact' | 'client_inquiry'
      service_category: 'training' | 'support' | 'resources' | 'advocacy'
      merchandise_category: 'apparel' | 'accessories' | 'digital' | 'other'
      order_status: 'pending' | 'processing' | 'completed' | 'cancelled'
      tracking_status: 'active' | 'inactive' | 'completed' | 'on_hold'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never
