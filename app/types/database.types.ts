export type Json
  = | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.4'
  }
  public: {
    Tables: {
      brand_subscriptions: {
        Row: {
          brand_id: string | null
          created_at: string | null
          ends_at: string | null
          id: string
          is_active: boolean | null
          package_id: string | null
          starts_at: string
        }
        Insert: {
          brand_id?: string | null
          created_at?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          package_id?: string | null
          starts_at?: string
        }
        Update: {
          brand_id?: string | null
          created_at?: string | null
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          package_id?: string | null
          starts_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'brand_subscriptions_brand_id_fkey'
            columns: ['brand_id']
            isOneToOne: false
            referencedRelation: 'brands'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'brand_subscriptions_package_id_fkey'
            columns: ['package_id']
            isOneToOne: false
            referencedRelation: 'service_packages'
            referencedColumns: ['id']
          }
        ]
      }
      brands: {
        Row: {
          client_id: string | null
          created_at: string | null
          id: string
          industry: string | null
          logo_url: string | null
          name: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name: string
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'brands_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      content_distribution: {
        Row: {
          content_item_id: string | null
          id: string
          platform: Database['public']['Enums']['social_platform']
          scheduled_date: string | null
          specific_link: string | null
          status: Database['public']['Enums']['distribution_status'] | null
        }
        Insert: {
          content_item_id?: string | null
          id?: string
          platform: Database['public']['Enums']['social_platform']
          scheduled_date?: string | null
          specific_link?: string | null
          status?: Database['public']['Enums']['distribution_status'] | null
        }
        Update: {
          content_item_id?: string | null
          id?: string
          platform?: Database['public']['Enums']['social_platform']
          scheduled_date?: string | null
          specific_link?: string | null
          status?: Database['public']['Enums']['distribution_status'] | null
        }
        Relationships: [
          {
            foreignKeyName: 'content_distribution_content_item_id_fkey'
            columns: ['content_item_id']
            isOneToOne: false
            referencedRelation: 'content_items'
            referencedColumns: ['id']
          }
        ]
      }
      content_items: {
        Row: {
          assigned_employee_id: string | null
          created_at: string | null
          description: string | null
          format: Database['public']['Enums']['content_format']
          id: string
          media_url: string | null
          notes_client: string | null
          notes_employee: string | null
          plan_id: string | null
          status: Database['public']['Enums']['content_status'] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_employee_id?: string | null
          created_at?: string | null
          description?: string | null
          format: Database['public']['Enums']['content_format']
          id?: string
          media_url?: string | null
          notes_client?: string | null
          notes_employee?: string | null
          plan_id?: string | null
          status?: Database['public']['Enums']['content_status'] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_employee_id?: string | null
          created_at?: string | null
          description?: string | null
          format?: Database['public']['Enums']['content_format']
          id?: string
          media_url?: string | null
          notes_client?: string | null
          notes_employee?: string | null
          plan_id?: string | null
          status?: Database['public']['Enums']['content_status'] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'content_items_assigned_employee_id_fkey'
            columns: ['assigned_employee_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'content_items_plan_id_fkey'
            columns: ['plan_id']
            isOneToOne: false
            referencedRelation: 'content_plans'
            referencedColumns: ['id']
          }
        ]
      }
      content_plans: {
        Row: {
          brand_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          month: number
          year: number
        }
        Insert: {
          brand_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          month: number
          year: number
        }
        Update: {
          brand_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          month?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: 'content_plans_brand_id_fkey'
            columns: ['brand_id']
            isOneToOne: false
            referencedRelation: 'brands'
            referencedColumns: ['id']
          }
        ]
      }
      content_status_history: {
        Row: {
          changed_by_id: string | null
          comment: string | null
          content_item_id: string | null
          created_at: string | null
          id: string
          new_status: Database['public']['Enums']['content_status']
          old_status: Database['public']['Enums']['content_status'] | null
        }
        Insert: {
          changed_by_id?: string | null
          comment?: string | null
          content_item_id?: string | null
          created_at?: string | null
          id?: string
          new_status: Database['public']['Enums']['content_status']
          old_status?: Database['public']['Enums']['content_status'] | null
        }
        Update: {
          changed_by_id?: string | null
          comment?: string | null
          content_item_id?: string | null
          created_at?: string | null
          id?: string
          new_status?: Database['public']['Enums']['content_status']
          old_status?: Database['public']['Enums']['content_status'] | null
        }
        Relationships: [
          {
            foreignKeyName: 'content_status_history_changed_by_id_fkey'
            columns: ['changed_by_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'content_status_history_content_item_id_fkey'
            columns: ['content_item_id']
            isOneToOne: false
            referencedRelation: 'content_items'
            referencedColumns: ['id']
          }
        ]
      }
      leads: {
        Row: {
          created_at: string | null
          email: string
          id: string
          internal_status: Database['public']['Enums']['lead_status'] | null
          name: string
          phone: string | null
          project_description: string | null
          project_stage:
            | Database['public']['Enums']['project_stage_type']
            | null
          service_interest: string
          website_instagram: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          internal_status?: Database['public']['Enums']['lead_status'] | null
          name: string
          phone?: string | null
          project_description?: string | null
          project_stage?:
            | Database['public']['Enums']['project_stage_type']
            | null
          service_interest: string
          website_instagram?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          internal_status?: Database['public']['Enums']['lead_status'] | null
          name?: string
          phone?: string | null
          project_description?: string | null
          project_stage?:
            | Database['public']['Enums']['project_stage_type']
            | null
          service_interest?: string
          website_instagram?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          actor_id: string | null
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          is_read: boolean | null
          message_key: string
          params: Json | null
          title_key: string
          user_id: string | null
        }
        Insert: {
          actor_id?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_read?: boolean | null
          message_key: string
          params?: Json | null
          title_key: string
          user_id?: string | null
        }
        Update: {
          actor_id?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_read?: boolean | null
          message_key?: string
          params?: Json | null
          title_key?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'notifications_actor_id_fkey'
            columns: ['actor_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'notifications_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          role: Database['public']['Enums']['user_role'] | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id: string
          role?: Database['public']['Enums']['user_role'] | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          role?: Database['public']['Enums']['user_role'] | null
        }
        Relationships: []
      }
      service_packages: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          max_posts: number | null
          max_videos: number | null
          name: string
          price: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          max_posts?: number | null
          max_videos?: number | null
          name: string
          price?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          max_posts?: number | null
          max_videos?: number | null
          name?: string
          price?: number | null
        }
        Relationships: []
      }
      user_permissions: {
        Row: {
          granted_at: string | null
          granted_by: string | null
          id: string
          permission: string
          profile_id: string
        }
        Insert: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          permission: string
          profile_id: string
        }
        Update: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          permission?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_permissions_granted_by_fkey'
            columns: ['granted_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_permissions_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      change_content_status: {
        Args: {
          p_comment?: string
          p_item_id: string
          p_new_status: Database['public']['Enums']['content_status']
        }
        Returns: undefined
      }
      check_quota: {
        Args: {
          p_brand_id: string
          p_format: Database['public']['Enums']['content_format']
          p_plan_id: string
        }
        Returns: boolean
      }
      update_client_notes: {
        Args: { p_item_id: string, p_notes: string }
        Returns: undefined
      }
    }
    Enums: {
      content_format:
        | 'reel'
        | 'carousel'
        | 'video'
        | 'podcast'
        | 'post'
        | 'story'
      content_status:
        | 'pending'
        | 'in_progress'
        | 'waiting_approval'
        | 'approved'
      distribution_status:
        | 'pending'
        | 'scheduled'
        | 'published'
        | 'failed'
        | 'cancelled'
      lead_status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
      project_stage_type: 'idea' | 'in_development' | 'launched' | 'scaling'
      social_platform:
        | 'facebook'
        | 'instagram'
        | 'tiktok'
        | 'youtube'
        | 'x'
        | 'linkedin'
        | 'spotify'
      user_role: 'admin' | 'employee' | 'client'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
      & DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    & DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
      ? R
      : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables']
    & DefaultSchema['Views'])
    ? (DefaultSchema['Tables']
      & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema['Tables']
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema['Tables']
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema['Enums']
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema['CompositeTypes']
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      content_format: ['reel', 'carousel', 'video', 'podcast', 'post', 'story'],
      content_status: [
        'pending',
        'in_progress',
        'waiting_approval',
        'approved'
      ],
      distribution_status: [
        'pending',
        'scheduled',
        'published',
        'failed',
        'cancelled'
      ],
      lead_status: ['new', 'contacted', 'qualified', 'converted', 'lost'],
      project_stage_type: ['idea', 'in_development', 'launched', 'scaling'],
      social_platform: [
        'facebook',
        'instagram',
        'tiktok',
        'youtube',
        'x',
        'linkedin',
        'spotify'
      ],
      user_role: ['admin', 'employee', 'client']
    }
  }
} as const
