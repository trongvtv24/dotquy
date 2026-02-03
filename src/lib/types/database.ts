/**
 * Database Types for DOTQUY.NHANH
 * Auto-generated types based on Supabase schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      provinces: {
        Row: {
          id: string
          slug: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          created_at?: string
        }
      }
      emergency_contacts: {
        Row: {
          id: string
          province_id: string
          hospital_name: string
          emergency_phone: string
          address: string | null
          map_url: string | null
          source_name: string | null
          source_url: string | null
          last_verified_at: string | null
          status: 'active' | 'needs_verify' | 'inactive'
          note: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          province_id: string
          hospital_name: string
          emergency_phone: string
          address?: string | null
          map_url?: string | null
          source_name?: string | null
          source_url?: string | null
          last_verified_at?: string | null
          status?: 'active' | 'needs_verify' | 'inactive'
          note?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          province_id?: string
          hospital_name?: string
          emergency_phone?: string
          address?: string | null
          map_url?: string | null
          source_name?: string | null
          source_url?: string | null
          last_verified_at?: string | null
          status?: 'active' | 'needs_verify' | 'inactive'
          note?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      content_articles: {
        Row: {
          id: string
          slug: string
          title: string
          category: 'learn' | 'prevention' | 'recovery'
          level: number
          summary_30s: string | null
          body_md: string | null
          faq_md: string | null
          sources: Json
          status: 'draft' | 'review' | 'published'
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          category: 'learn' | 'prevention' | 'recovery'
          level?: number
          summary_30s?: string | null
          body_md?: string | null
          faq_md?: string | null
          sources?: Json
          status?: 'draft' | 'review' | 'published'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          category?: 'learn' | 'prevention' | 'recovery'
          level?: number
          summary_30s?: string | null
          body_md?: string | null
          faq_md?: string | null
          sources?: Json
          status?: 'draft' | 'review' | 'published'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      feedback: {
        Row: {
          id: string
          type: 'wrong_number' | 'content' | 'suggestion' | 'other'
          province_id: string | null
          article_id: string | null
          message: string
          email: string | null
          status: 'new' | 'reviewed' | 'resolved'
          created_at: string
        }
        Insert: {
          id?: string
          type: 'wrong_number' | 'content' | 'suggestion' | 'other'
          province_id?: string | null
          article_id?: string | null
          message: string
          email?: string | null
          status?: 'new' | 'reviewed' | 'resolved'
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'wrong_number' | 'content' | 'suggestion' | 'other'
          province_id?: string | null
          article_id?: string | null
          message?: string
          email?: string | null
          status?: 'new' | 'reviewed' | 'resolved'
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string | null
          is_admin: boolean
          created_at: string
        }
        Insert: {
          id: string
          email?: string | null
          is_admin?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          is_admin?: boolean
          created_at?: string
        }
      }
      analytics_events: {
        Row: {
          id: string
          event_name: string
          province_id: string | null
          meta: Json
          created_at: string
        }
        Insert: {
          id?: string
          event_name: string
          province_id?: string | null
          meta?: Json
          created_at?: string
        }
        Update: {
          id?: string
          event_name?: string
          province_id?: string | null
          meta?: Json
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type Province = Database['public']['Tables']['provinces']['Row']
export type EmergencyContact = Database['public']['Tables']['emergency_contacts']['Row']
export type ContentArticle = Database['public']['Tables']['content_articles']['Row']
export type Feedback = Database['public']['Tables']['feedback']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type AnalyticsEvent = Database['public']['Tables']['analytics_events']['Row']

// Insert types
export type ProvinceInsert = Database['public']['Tables']['provinces']['Insert']
export type EmergencyContactInsert = Database['public']['Tables']['emergency_contacts']['Insert']
export type FeedbackInsert = Database['public']['Tables']['feedback']['Insert']

// With relations
export type EmergencyContactWithProvince = EmergencyContact & {
  provinces: Province
}
