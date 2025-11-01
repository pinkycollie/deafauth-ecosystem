export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  accessibility: {
    Tables: {
      communication_embeddings: {
        Row: {
          communication_type: string | null
          created_at: string | null
          embedding: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          communication_type?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: never
          user_id?: string | null
        }
        Update: {
          communication_type?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: never
          user_id?: string | null
        }
        Relationships: []
      }
      learning_feedback: {
        Row: {
          context: Json | null
          created_at: string | null
          feedback_score: number | null
          feedback_type: string
          id: number
          profile_id: number | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          feedback_score?: number | null
          feedback_type: string
          id?: never
          profile_id?: number | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          feedback_score?: number | null
          feedback_type?: string
          id?: never
          profile_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_feedback_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_logs: {
        Row: {
          additional_metadata: Json | null
          communication_mode: string | null
          id: number
          interaction_timestamp: string | null
          latency_ms: number | null
          service_type: string
          success_rate: number | null
          user_id: string | null
        }
        Insert: {
          additional_metadata?: Json | null
          communication_mode?: string | null
          id?: never
          interaction_timestamp?: string | null
          latency_ms?: number | null
          service_type: string
          success_rate?: number | null
          user_id?: string | null
        }
        Update: {
          additional_metadata?: Json | null
          communication_mode?: string | null
          id?: never
          interaction_timestamp?: string | null
          latency_ms?: number | null
          service_type?: string
          success_rate?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          adaptive_interface_settings: Json | null
          communication_preference: string[]
          created_at: string | null
          id: number
          language_modes: string[] | null
          sensory_needs: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          adaptive_interface_settings?: Json | null
          communication_preference: string[]
          created_at?: string | null
          id?: never
          language_modes?: string[] | null
          sensory_needs?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          adaptive_interface_settings?: Json | null
          communication_preference?: string[]
          created_at?: string | null
          id?: never
          language_modes?: string[] | null
          sensory_needs?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  ai_models: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  cron: {
    Tables: {
      job: {
        Row: {
          active: boolean
          command: string
          database: string
          jobid: number
          jobname: string | null
          nodename: string
          nodeport: number
          schedule: string
          username: string
        }
        Insert: {
          active?: boolean
          command: string
          database?: string
          jobid?: number
          jobname?: string | null
          nodename?: string
          nodeport?: number
          schedule: string
          username?: string
        }
        Update: {
          active?: boolean
          command?: string
          database?: string
          jobid?: number
          jobname?: string | null
          nodename?: string
          nodeport?: number
          schedule?: string
          username?: string
        }
        Relationships: []
      }
      job_run_details: {
        Row: {
          command: string | null
          database: string | null
          end_time: string | null
          job_pid: number | null
          jobid: number | null
          return_message: string | null
          runid: number
          start_time: string | null
          status: string | null
          username: string | null
        }
        Insert: {
          command?: string | null
          database?: string | null
          end_time?: string | null
          job_pid?: number | null
          jobid?: number | null
          return_message?: string | null
          runid?: number
          start_time?: string | null
          status?: string | null
          username?: string | null
        }
        Update: {
          command?: string | null
          database?: string | null
          end_time?: string | null
          job_pid?: number | null
          jobid?: number | null
          return_message?: string | null
          runid?: number
          start_time?: string | null
          status?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      alter_job: {
        Args: {
          active?: boolean
          command?: string
          database?: string
          job_id: number
          schedule?: string
          username?: string
        }
        Returns: undefined
      }
      schedule:
        | {
            Args: { command: string; job_name: string; schedule: string }
            Returns: number
          }
        | { Args: { command: string; schedule: string }; Returns: number }
      schedule_in_database: {
        Args: {
          active?: boolean
          command: string
          database: string
          job_name: string
          schedule: string
          username?: string
        }
        Returns: number
      }
      unschedule:
        | { Args: { job_name: string }; Returns: boolean }
        | { Args: { job_id: number }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  deaf_ecosystem: {
    Tables: {
      "api endpoints": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      organizations: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          deaf_led: boolean | null
          description: string | null
          email: string | null
          founded_year: number | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          mission_statement: string | null
          name: string
          organization_type: Database["deaf_ecosystem"]["Enums"]["organization_type"]
          phone: string | null
          postal_code: string | null
          service_categories: Database["deaf_ecosystem"]["Enums"]["service_category"][]
          short_name: string | null
          sign_language_support: string[] | null
          state: string | null
          updated_at: string | null
          verification_date: string | null
          verified: boolean | null
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          deaf_led?: boolean | null
          description?: string | null
          email?: string | null
          founded_year?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          mission_statement?: string | null
          name: string
          organization_type: Database["deaf_ecosystem"]["Enums"]["organization_type"]
          phone?: string | null
          postal_code?: string | null
          service_categories: Database["deaf_ecosystem"]["Enums"]["service_category"][]
          short_name?: string | null
          sign_language_support?: string[] | null
          state?: string | null
          updated_at?: string | null
          verification_date?: string | null
          verified?: boolean | null
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          deaf_led?: boolean | null
          description?: string | null
          email?: string | null
          founded_year?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          mission_statement?: string | null
          name?: string
          organization_type?: Database["deaf_ecosystem"]["Enums"]["organization_type"]
          phone?: string | null
          postal_code?: string | null
          service_categories?: Database["deaf_ecosystem"]["Enums"]["service_category"][]
          short_name?: string | null
          sign_language_support?: string[] | null
          state?: string | null
          updated_at?: string | null
          verification_date?: string | null
          verified?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      organization_summary: {
        Row: {
          country: string | null
          deaf_led: boolean | null
          description: string | null
          id: string | null
          name: string | null
          organization_type: string | null
          service_categories: string[] | null
          short_name: string | null
          sign_language_support: string[] | null
          verified: boolean | null
        }
        Insert: {
          country?: string | null
          deaf_led?: boolean | null
          description?: string | null
          id?: string | null
          name?: string | null
          organization_type?: never
          service_categories?: never
          short_name?: string | null
          sign_language_support?: string[] | null
          verified?: boolean | null
        }
        Update: {
          country?: string | null
          deaf_led?: boolean | null
          description?: string | null
          id?: string | null
          name?: string | null
          organization_type?: never
          service_categories?: never
          short_name?: string | null
          sign_language_support?: string[] | null
          verified?: boolean | null
        }
        Relationships: []
      }
    }
    Functions: {
      quick_org_search: {
        Args: { p_query?: string }
        Returns: {
          country: string
          deaf_led: boolean
          description: string
          id: string
          name: string
          organization_type: string
        }[]
      }
      search_organizations: {
        Args: {
          p_country?: string
          p_query?: string
          p_service_category?: string
          p_type?: string
        }
        Returns: {
          country: string
          deaf_led: boolean
          description: string
          id: string
          name: string
          organization_type: string
          verified: boolean
        }[]
      }
    }
    Enums: {
      organization_type:
        | "school"
        | "university"
        | "nonprofit"
        | "technology_company"
        | "consulting_firm"
        | "research_center"
        | "advocacy_group"
        | "interpreting_service"
        | "healthcare_provider"
        | "cultural_center"
        | "startup"
        | "government_agency"
        | "educational_resource"
        | "accessibility_service"
      service_category:
        | "education"
        | "employment"
        | "healthcare"
        | "legal_support"
        | "technology"
        | "communication_services"
        | "arts_culture"
        | "social_support"
        | "research"
        | "accessibility"
        | "sign_language_resources"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  deaf_storage: {
    Tables: {
      accessibility_resources: {
        Row: {
          created_at: string | null
          description: string | null
          file_path: string | null
          id: string
          last_updated: string | null
          metadata: Json | null
          resource_type: string
          supported_languages: string[] | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          file_path?: string | null
          id?: string
          last_updated?: string | null
          metadata?: Json | null
          resource_type: string
          supported_languages?: string[] | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          file_path?: string | null
          id?: string
          last_updated?: string | null
          metadata?: Json | null
          resource_type?: string
          supported_languages?: string[] | null
          title?: string
        }
        Relationships: []
      }
      document_shares: {
        Row: {
          created_at: string | null
          document_id: string | null
          expires_at: string | null
          id: string
          share_type: string | null
          shared_by_user_id: string | null
          shared_with_user_id: string | null
        }
        Insert: {
          created_at?: string | null
          document_id?: string | null
          expires_at?: string | null
          id?: string
          share_type?: string | null
          shared_by_user_id?: string | null
          shared_with_user_id?: string | null
        }
        Update: {
          created_at?: string | null
          document_id?: string | null
          expires_at?: string | null
          id?: string
          share_type?: string | null
          shared_by_user_id?: string | null
          shared_with_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_shares_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "user_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      gcp_resource_uploads: {
        Row: {
          access_level: string
          bucket_name: string
          created_at: string | null
          file_name: string
          file_size: number | null
          file_type: string
          id: string
          metadata: Json | null
          updated_at: string | null
          upload_status: string | null
          user_id: string | null
        }
        Insert: {
          access_level?: string
          bucket_name: string
          created_at?: string | null
          file_name: string
          file_size?: number | null
          file_type: string
          id?: string
          metadata?: Json | null
          updated_at?: string | null
          upload_status?: string | null
          user_id?: string | null
        }
        Update: {
          access_level?: string
          bucket_name?: string
          created_at?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string
          id?: string
          metadata?: Json | null
          updated_at?: string | null
          upload_status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sign_language_media: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          file_path: string
          id: string
          is_public: boolean | null
          language: string
          media_type: string
          tags: string[] | null
          thumbnail_path: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          file_path: string
          id?: string
          is_public?: boolean | null
          language: string
          media_type: string
          tags?: string[] | null
          thumbnail_path?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          file_path?: string
          id?: string
          is_public?: boolean | null
          language?: string
          media_type?: string
          tags?: string[] | null
          thumbnail_path?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_documents: {
        Row: {
          access_level: string | null
          created_at: string | null
          document_name: string
          document_type: string
          encrypted_content: string
          encryption_method: string
          id: string
          metadata: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access_level?: string | null
          created_at?: string | null
          document_name: string
          document_type: string
          encrypted_content: string
          encryption_method?: string
          id?: string
          metadata?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_level?: string | null
          created_at?: string | null
          document_name?: string
          document_type?: string
          encrypted_content?: string
          encryption_method?: string
          id?: string
          metadata?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      log_resource_upload: {
        Args: {
          p_access_level?: string
          p_bucket_name: string
          p_file_name: string
          p_file_size?: number
          p_file_type: string
          p_metadata?: Json
          p_user_id: string
        }
        Returns: string
      }
      update_resource_upload_status: {
        Args: {
          p_additional_metadata?: Json
          p_status: string
          p_upload_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  deaf_video: {
    Tables: {
      creators: {
        Row: {
          bio: string | null
          contact_email: string | null
          created_at: string | null
          deaf_auth_verified: boolean | null
          fibonrose_score: number | null
          id: string
          languages: string[] | null
          phone_number: string | null
          profile_picture_url: string | null
          specialties: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bio?: string | null
          contact_email?: string | null
          created_at?: string | null
          deaf_auth_verified?: boolean | null
          fibonrose_score?: number | null
          id?: string
          languages?: string[] | null
          phone_number?: string | null
          profile_picture_url?: string | null
          specialties?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bio?: string | null
          contact_email?: string | null
          created_at?: string | null
          deaf_auth_verified?: boolean | null
          fibonrose_score?: number | null
          id?: string
          languages?: string[] | null
          phone_number?: string | null
          profile_picture_url?: string | null
          specialties?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      matches: {
        Row: {
          assigned_by: string | null
          completed_at: string | null
          created_at: string | null
          creator_id: string | null
          deadline: string | null
          feedback: string | null
          id: string
          job_id: string
          rating: number | null
          status: Database["deaf_video"]["Enums"]["match_status"] | null
          video_id: string | null
        }
        Insert: {
          assigned_by?: string | null
          completed_at?: string | null
          created_at?: string | null
          creator_id?: string | null
          deadline?: string | null
          feedback?: string | null
          id?: string
          job_id: string
          rating?: number | null
          status?: Database["deaf_video"]["Enums"]["match_status"] | null
          video_id?: string | null
        }
        Update: {
          assigned_by?: string | null
          completed_at?: string | null
          created_at?: string | null
          creator_id?: string | null
          deadline?: string | null
          feedback?: string | null
          id?: string
          job_id?: string
          rating?: number | null
          status?: Database["deaf_video"]["Enums"]["match_status"] | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      transcriptions: {
        Row: {
          confidence_score: number | null
          content: string
          created_at: string | null
          created_by: string | null
          id: string
          language: string
          signspeak_processed: boolean | null
          transcription_type: string | null
          video_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          content: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          language: string
          signspeak_processed?: boolean | null
          transcription_type?: string | null
          video_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          language?: string
          signspeak_processed?: boolean | null
          transcription_type?: string | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transcriptions_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          accessibility_features: string[] | null
          asl_summary: string | null
          complexity_level: number | null
          content_warnings: string[] | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          duration_seconds: number | null
          fibonrose_score: number | null
          file_size_bytes: number | null
          id: string
          language: string | null
          status: Database["deaf_video"]["Enums"]["video_status"] | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          url: string
        }
        Insert: {
          accessibility_features?: string[] | null
          asl_summary?: string | null
          complexity_level?: number | null
          content_warnings?: string[] | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          duration_seconds?: number | null
          fibonrose_score?: number | null
          file_size_bytes?: number | null
          id?: string
          language?: string | null
          status?: Database["deaf_video"]["Enums"]["video_status"] | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          url: string
        }
        Update: {
          accessibility_features?: string[] | null
          asl_summary?: string | null
          complexity_level?: number | null
          content_warnings?: string[] | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          duration_seconds?: number | null
          fibonrose_score?: number | null
          file_size_bytes?: number | null
          id?: string
          language?: string | null
          status?: Database["deaf_video"]["Enums"]["video_status"] | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "videos_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      match_status:
        | "pending"
        | "accepted"
        | "completed"
        | "rejected"
        | "in_progress"
      video_status:
        | "uploading"
        | "processing"
        | "ready"
        | "matched"
        | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  deafauth: {
    Tables: {
      accessibility_profiles: {
        Row: {
          cognitive_support_needs: Json | null
          emergency_communication_preferences: Json | null
          hearing_tech_details: Json | null
          hearing_tech_used: boolean | null
          interpretation_preferences: Json | null
          language_preferences: Json | null
          last_updated: string | null
          mobility_accommodations: Json | null
          preferred_communication_methods: string[] | null
          screen_reader_details: Json | null
          screen_reader_used: boolean | null
          user_id: string
          visual_accommodation_needs: Json | null
        }
        Insert: {
          cognitive_support_needs?: Json | null
          emergency_communication_preferences?: Json | null
          hearing_tech_details?: Json | null
          hearing_tech_used?: boolean | null
          interpretation_preferences?: Json | null
          language_preferences?: Json | null
          last_updated?: string | null
          mobility_accommodations?: Json | null
          preferred_communication_methods?: string[] | null
          screen_reader_details?: Json | null
          screen_reader_used?: boolean | null
          user_id: string
          visual_accommodation_needs?: Json | null
        }
        Update: {
          cognitive_support_needs?: Json | null
          emergency_communication_preferences?: Json | null
          hearing_tech_details?: Json | null
          hearing_tech_used?: boolean | null
          interpretation_preferences?: Json | null
          language_preferences?: Json | null
          last_updated?: string | null
          mobility_accommodations?: Json | null
          preferred_communication_methods?: string[] | null
          screen_reader_details?: Json | null
          screen_reader_used?: boolean | null
          user_id?: string
          visual_accommodation_needs?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "accessibility_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      accommodation_histories: {
        Row: {
          accommodation_type: string
          created_at: string
          details: Json | null
          end_date: string | null
          id: number
          start_date: string
          user_id: string | null
        }
        Insert: {
          accommodation_type: string
          created_at?: string
          details?: Json | null
          end_date?: string | null
          id?: never
          start_date: string
          user_id?: string | null
        }
        Update: {
          accommodation_type?: string
          created_at?: string
          details?: Json | null
          end_date?: string | null
          id?: never
          start_date?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accommodation_histories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      auth_attempts: {
        Row: {
          additional_context: Json | null
          attempt_timestamp: string | null
          attempt_type: string | null
          id: number
          status: string | null
          user_id: string | null
        }
        Insert: {
          additional_context?: Json | null
          attempt_timestamp?: string | null
          attempt_type?: string | null
          id?: never
          status?: string | null
          user_id?: string | null
        }
        Update: {
          additional_context?: Json | null
          attempt_timestamp?: string | null
          attempt_type?: string | null
          id?: never
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      authentication_events: {
        Row: {
          accessibility_adaptations: Json | null
          auth_method: string | null
          created_at: string | null
          id: string
          performance_metrics: Json | null
          success_rate: number | null
          user_id: string | null
        }
        Insert: {
          accessibility_adaptations?: Json | null
          auth_method?: string | null
          created_at?: string | null
          id?: string
          performance_metrics?: Json | null
          success_rate?: number | null
          user_id?: string | null
        }
        Update: {
          accessibility_adaptations?: Json | null
          auth_method?: string | null
          created_at?: string | null
          id?: string
          performance_metrics?: Json | null
          success_rate?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "authentication_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      community_feedback: {
        Row: {
          created_at: string | null
          feedback_content: string | null
          feedback_phase: string | null
          feedback_type: string | null
          id: string
          impact_score: number | null
          is_verified_feedback: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          feedback_content?: string | null
          feedback_phase?: string | null
          feedback_type?: string | null
          id?: string
          impact_score?: number | null
          is_verified_feedback?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          feedback_content?: string | null
          feedback_phase?: string | null
          feedback_type?: string | null
          id?: string
          impact_score?: number | null
          is_verified_feedback?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      deafauth_users: {
        Row: {
          auth_method: string
          created_at: string
          deaf_identity: string | null
          email: string
          fibonrose_badge: string | null
          id: string
          pinksync_ready: boolean
          roles: string[] | null
          sign_lang: string
          sign_languages: Json | null
          username: string
        }
        Insert: {
          auth_method: string
          created_at?: string
          deaf_identity?: string | null
          email: string
          fibonrose_badge?: string | null
          id?: string
          pinksync_ready?: boolean
          roles?: string[] | null
          sign_lang?: string
          sign_languages?: Json | null
          username: string
        }
        Update: {
          auth_method?: string
          created_at?: string
          deaf_identity?: string | null
          email?: string
          fibonrose_badge?: string | null
          id?: string
          pinksync_ready?: boolean
          roles?: string[] | null
          sign_lang?: string
          sign_languages?: Json | null
          username?: string
        }
        Relationships: []
      }
      identity_insights: {
        Row: {
          community_influence_score: number | null
          interaction_preferences: Json | null
          last_updated: string | null
          predicted_needs: Json | null
          technology_proficiency: Json | null
          user_id: string
        }
        Insert: {
          community_influence_score?: number | null
          interaction_preferences?: Json | null
          last_updated?: string | null
          predicted_needs?: Json | null
          technology_proficiency?: Json | null
          user_id: string
        }
        Update: {
          community_influence_score?: number | null
          interaction_preferences?: Json | null
          last_updated?: string | null
          predicted_needs?: Json | null
          technology_proficiency?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "identity_insights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      portable_identity_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: number
          is_revoked: boolean
          token_hash: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: never
          is_revoked?: boolean
          token_hash: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: never
          is_revoked?: boolean
          token_hash?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portable_identity_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      privacy_consent: {
        Row: {
          analytics_consent: boolean | null
          can_be_contacted: boolean | null
          consent_given_at: string | null
          consent_version: string | null
          data_export_allowed: boolean | null
          data_processing_consent: boolean | null
          last_updated_at: string | null
          marketing_consent: boolean | null
          right_to_be_forgotten: boolean | null
          user_id: string
        }
        Insert: {
          analytics_consent?: boolean | null
          can_be_contacted?: boolean | null
          consent_given_at?: string | null
          consent_version?: string | null
          data_export_allowed?: boolean | null
          data_processing_consent?: boolean | null
          last_updated_at?: string | null
          marketing_consent?: boolean | null
          right_to_be_forgotten?: boolean | null
          user_id: string
        }
        Update: {
          analytics_consent?: boolean | null
          can_be_contacted?: boolean | null
          consent_given_at?: string | null
          consent_version?: string | null
          data_export_allowed?: boolean | null
          data_processing_consent?: boolean | null
          last_updated_at?: string | null
          marketing_consent?: boolean | null
          right_to_be_forgotten?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      professional_providers: {
        Row: {
          contact_email: string | null
          created_at: string | null
          deaf_awareness_certified: boolean | null
          id: string
          provider_name: string
          service_areas: string[] | null
          specialization: string[] | null
          trust_score: number | null
          updated_at: string | null
          verification_level:
            | Database["deafauth"]["Enums"]["verification_level"]
            | null
        }
        Insert: {
          contact_email?: string | null
          created_at?: string | null
          deaf_awareness_certified?: boolean | null
          id?: string
          provider_name: string
          service_areas?: string[] | null
          specialization?: string[] | null
          trust_score?: number | null
          updated_at?: string | null
          verification_level?:
            | Database["deafauth"]["Enums"]["verification_level"]
            | null
        }
        Update: {
          contact_email?: string | null
          created_at?: string | null
          deaf_awareness_certified?: boolean | null
          id?: string
          provider_name?: string
          service_areas?: string[] | null
          specialization?: string[] | null
          trust_score?: number | null
          updated_at?: string | null
          verification_level?:
            | Database["deafauth"]["Enums"]["verification_level"]
            | null
        }
        Relationships: []
      }
      risk_scoring_components: {
        Row: {
          accommodation_verification_level: number | null
          account_age_days: number | null
          auth_method_risk: number | null
          community_endorsement_score: number | null
          compliance_score: number | null
          device_consistency_score: number | null
          document_verification_status: boolean | null
          feedback_impact_score: number | null
          id: string
          identity_verification_level: number | null
          last_updated: string | null
          login_consistency_score: number | null
          multi_factor_status: boolean | null
          recent_failed_attempts: number | null
          total_risk_score: number | null
          user_id: string
        }
        Insert: {
          accommodation_verification_level?: number | null
          account_age_days?: number | null
          auth_method_risk?: number | null
          community_endorsement_score?: number | null
          compliance_score?: number | null
          device_consistency_score?: number | null
          document_verification_status?: boolean | null
          feedback_impact_score?: number | null
          id?: string
          identity_verification_level?: number | null
          last_updated?: string | null
          login_consistency_score?: number | null
          multi_factor_status?: boolean | null
          recent_failed_attempts?: number | null
          total_risk_score?: number | null
          user_id: string
        }
        Update: {
          accommodation_verification_level?: number | null
          account_age_days?: number | null
          auth_method_risk?: number | null
          community_endorsement_score?: number | null
          compliance_score?: number | null
          device_consistency_score?: number | null
          document_verification_status?: boolean | null
          feedback_impact_score?: number | null
          id?: string
          identity_verification_level?: number | null
          last_updated?: string | null
          login_consistency_score?: number | null
          multi_factor_status?: boolean | null
          recent_failed_attempts?: number | null
          total_risk_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "risk_scoring_components_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      risk_scoring_config: {
        Row: {
          active: boolean | null
          config_data: Json
          created_at: string | null
          id: string
          review_notes: string | null
          version: string
        }
        Insert: {
          active?: boolean | null
          config_data: Json
          created_at?: string | null
          id?: string
          review_notes?: string | null
          version: string
        }
        Update: {
          active?: boolean | null
          config_data?: Json
          created_at?: string | null
          id?: string
          review_notes?: string | null
          version?: string
        }
        Relationships: []
      }
      schema_migrations: {
        Row: {
          applied_at: string | null
          description: string | null
          version: string
        }
        Insert: {
          applied_at?: string | null
          description?: string | null
          version: string
        }
        Update: {
          applied_at?: string | null
          description?: string | null
          version?: string
        }
        Relationships: []
      }
      service_records: {
        Row: {
          created_at: string | null
          id: string
          service_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          service_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          service_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_records_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          id: string
          name: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_identities: {
        Row: {
          deaf_community_involvement: string[] | null
          sign_language_proficiency: number | null
          user_id: string
          verification_status: string | null
        }
        Insert: {
          deaf_community_involvement?: string[] | null
          sign_language_proficiency?: number | null
          user_id: string
          verification_status?: string | null
        }
        Update: {
          deaf_community_involvement?: string[] | null
          sign_language_proficiency?: number | null
          user_id?: string
          verification_status?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          communication_preferences: Json | null
          created_at: string
          email: string
          encrypted_profile_data: string
          google_sub: string | null
          id: string
          is_active: boolean
          last_login: string | null
          provider_tokens: Json | null
          stripe_customer_id: string | null
          updated_at: string | null
          user_id: string | null
          username: string
        }
        Insert: {
          communication_preferences?: Json | null
          created_at?: string
          email: string
          encrypted_profile_data: string
          google_sub?: string | null
          id?: string
          is_active?: boolean
          last_login?: string | null
          provider_tokens?: Json | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          username: string
        }
        Update: {
          communication_preferences?: Json | null
          created_at?: string
          email?: string
          encrypted_profile_data?: string
          google_sub?: string | null
          id?: string
          is_active?: boolean
          last_login?: string | null
          provider_tokens?: Json | null
          stripe_customer_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      user_verification: {
        Row: {
          created_at: string | null
          fibonrose_trust_token: string | null
          fibonrose_verification_status: string | null
          is_accommodation_eligible: boolean | null
          last_verification_attempt: string | null
          meets_fedramp_standards: boolean | null
          meets_section508_standards: boolean | null
          population_category: string | null
          preferred_overlay_type: string[] | null
          risk_score: number | null
          updated_at: string | null
          user_id: string
          verification_attempts: number | null
          verification_level:
            | Database["deafauth"]["Enums"]["verification_level"]
            | null
          verification_score: number | null
        }
        Insert: {
          created_at?: string | null
          fibonrose_trust_token?: string | null
          fibonrose_verification_status?: string | null
          is_accommodation_eligible?: boolean | null
          last_verification_attempt?: string | null
          meets_fedramp_standards?: boolean | null
          meets_section508_standards?: boolean | null
          population_category?: string | null
          preferred_overlay_type?: string[] | null
          risk_score?: number | null
          updated_at?: string | null
          user_id: string
          verification_attempts?: number | null
          verification_level?:
            | Database["deafauth"]["Enums"]["verification_level"]
            | null
          verification_score?: number | null
        }
        Update: {
          created_at?: string | null
          fibonrose_trust_token?: string | null
          fibonrose_verification_status?: string | null
          is_accommodation_eligible?: boolean | null
          last_verification_attempt?: string | null
          meets_fedramp_standards?: boolean | null
          meets_section508_standards?: boolean | null
          population_category?: string | null
          preferred_overlay_type?: string[] | null
          risk_score?: number | null
          updated_at?: string | null
          user_id?: string
          verification_attempts?: number | null
          verification_level?:
            | Database["deafauth"]["Enums"]["verification_level"]
            | null
          verification_score?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          accessibility_profile: Json | null
          compliance_status: Json | null
          created_at: string | null
          device_capabilities: Json | null
          id: string
          network_connections: string[] | null
          sign_language_preferences: string[] | null
          updated_at: string | null
          usage_patterns: Json | null
          verified_identity: boolean | null
        }
        Insert: {
          accessibility_profile?: Json | null
          compliance_status?: Json | null
          created_at?: string | null
          device_capabilities?: Json | null
          id?: string
          network_connections?: string[] | null
          sign_language_preferences?: string[] | null
          updated_at?: string | null
          usage_patterns?: Json | null
          verified_identity?: boolean | null
        }
        Update: {
          accessibility_profile?: Json | null
          compliance_status?: Json | null
          created_at?: string | null
          device_capabilities?: Json | null
          id?: string
          network_connections?: string[] | null
          sign_language_preferences?: string[] | null
          updated_at?: string | null
          usage_patterns?: Json | null
          verified_identity?: boolean | null
        }
        Relationships: []
      }
      visual_credentials: {
        Row: {
          biometric_hash: string
          biometric_type: string | null
          created_at: string | null
          id: number
          last_used_at: string | null
          user_id: string | null
        }
        Insert: {
          biometric_hash: string
          biometric_type?: string | null
          created_at?: string | null
          id?: never
          last_used_at?: string | null
          user_id?: string | null
        }
        Update: {
          biometric_hash?: string
          biometric_type?: string | null
          created_at?: string | null
          id?: never
          last_used_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_visual_feedback: {
        Args: { message?: string; status_type: string }
        Returns: Json
      }
      log_event: {
        Args: { p_action: string; p_details?: Json; p_user: string }
        Returns: string
      }
      update_user_verification_level: {
        Args: {
          p_admin_user_id?: string
          p_new_level: Database["deafauth"]["Enums"]["verification_level"]
          p_user_id: string
        }
        Returns: boolean
      }
      update_verification_level: {
        Args: {
          p_new_level: Database["deafauth"]["Enums"]["verification_level"]
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      verification_level:
        | "open_community"
        | "basic_verified"
        | "community_trusted"
        | "officially_verified"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  deafauth_oauth: {
    Tables: {
      providers: {
        Row: {
          client_id: string
          client_secret: string
          created_at: string | null
          id: string
          provider_name: string
          scopes: string[] | null
          updated_at: string | null
        }
        Insert: {
          client_id: string
          client_secret: string
          created_at?: string | null
          id?: string
          provider_name: string
          scopes?: string[] | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          client_secret?: string
          created_at?: string | null
          id?: string
          provider_name?: string
          scopes?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      upsert_provider: {
        Args: {
          p_client_id: string
          p_client_secret: string
          p_provider_name: string
          p_scopes?: string[]
        }
        Returns: string
      }
      validate_oauth_login: {
        Args: { p_email: string; p_provider_name: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  deafauth_sso: {
    Tables: {
      providers: {
        Row: {
          client_id: string
          client_secret: string
          created_at: string | null
          domains: string[]
          id: string
          issuer: string
          provider_name: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          client_secret: string
          created_at?: string | null
          domains: string[]
          id?: string
          issuer: string
          provider_name: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          client_secret?: string
          created_at?: string | null
          domains?: string[]
          id?: string
          issuer?: string
          provider_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      upsert_provider: {
        Args: {
          p_client_id: string
          p_client_secret: string
          p_domains: string[]
          p_issuer: string
          p_provider_name: string
        }
        Returns: string
      }
      validate_sso_login: {
        Args: { p_email: string; p_provider_name: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  ecosystem: {
    Tables: {
      badges: {
        Row: {
          badge_color: string | null
          badge_image_url: string | null
          badge_name: string
          badge_type: string | null
          blockchain_network: string | null
          created_at: string | null
          criteria: Json | null
          description: string | null
          id: string
          issuer: string | null
          nft_contract_address: string | null
          valid_from: string | null
          valid_until: string | null
          verification_method: string | null
        }
        Insert: {
          badge_color?: string | null
          badge_image_url?: string | null
          badge_name: string
          badge_type?: string | null
          blockchain_network?: string | null
          created_at?: string | null
          criteria?: Json | null
          description?: string | null
          id?: string
          issuer?: string | null
          nft_contract_address?: string | null
          valid_from?: string | null
          valid_until?: string | null
          verification_method?: string | null
        }
        Update: {
          badge_color?: string | null
          badge_image_url?: string | null
          badge_name?: string
          badge_type?: string | null
          blockchain_network?: string | null
          created_at?: string | null
          criteria?: Json | null
          description?: string | null
          id?: string
          issuer?: string | null
          nft_contract_address?: string | null
          valid_from?: string | null
          valid_until?: string | null
          verification_method?: string | null
        }
        Relationships: []
      }
      partnerships: {
        Row: {
          id: string
          partner_name: string | null
          partnership_type: string | null
          start_date: string | null
          status: string | null
        }
        Insert: {
          id: string
          partner_name?: string | null
          partnership_type?: string | null
          start_date?: string | null
          status?: string | null
        }
        Update: {
          id?: string
          partner_name?: string | null
          partnership_type?: string | null
          start_date?: string | null
          status?: string | null
        }
        Relationships: []
      }
      professional_directory: {
        Row: {
          blockchain_expertise: string[] | null
          business_name: string | null
          business_stage: string | null
          business_type: string | null
          certifications: Json | null
          created_at: string | null
          credentials: Json | null
          id: string
          industry_sectors: string[] | null
          is_open_to_opportunities: boolean | null
          languages: string[] | null
          networking_preferences: Json | null
          professional_name: string
          professional_summary: string | null
          professional_title: string | null
          skills: string[] | null
          specialties: string[] | null
          updated_at: string | null
          user_id: string | null
          web3_projects: Json | null
        }
        Insert: {
          blockchain_expertise?: string[] | null
          business_name?: string | null
          business_stage?: string | null
          business_type?: string | null
          certifications?: Json | null
          created_at?: string | null
          credentials?: Json | null
          id?: string
          industry_sectors?: string[] | null
          is_open_to_opportunities?: boolean | null
          languages?: string[] | null
          networking_preferences?: Json | null
          professional_name: string
          professional_summary?: string | null
          professional_title?: string | null
          skills?: string[] | null
          specialties?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          web3_projects?: Json | null
        }
        Update: {
          blockchain_expertise?: string[] | null
          business_name?: string | null
          business_stage?: string | null
          business_type?: string | null
          certifications?: Json | null
          created_at?: string | null
          credentials?: Json | null
          id?: string
          industry_sectors?: string[] | null
          is_open_to_opportunities?: boolean | null
          languages?: string[] | null
          networking_preferences?: Json | null
          professional_name?: string
          professional_summary?: string | null
          professional_title?: string | null
          skills?: string[] | null
          specialties?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          web3_projects?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "professional_directory_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          ecosystem_access: Json | null
          id: string
          parent_role: string | null
          permissions: Json | null
          role_description: string | null
          role_name: string
        }
        Insert: {
          created_at?: string | null
          ecosystem_access?: Json | null
          id?: string
          parent_role?: string | null
          permissions?: Json | null
          role_description?: string | null
          role_name: string
        }
        Update: {
          created_at?: string | null
          ecosystem_access?: Json | null
          id?: string
          parent_role?: string | null
          permissions?: Json | null
          role_description?: string | null
          role_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_parent_role_fkey"
            columns: ["parent_role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string | null
          blockchain_proof: Json | null
          id: string
          issued_date: string | null
          revoked: boolean | null
          user_id: string | null
        }
        Insert: {
          badge_id?: string | null
          blockchain_proof?: Json | null
          id?: string
          issued_date?: string | null
          revoked?: boolean | null
          user_id?: string | null
        }
        Update: {
          badge_id?: string | null
          blockchain_proof?: Json | null
          id?: string
          issued_date?: string | null
          revoked?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          accessibility_needs: Json | null
          auth_user_id: string | null
          blockchain_credentials: Json | null
          created_at: string | null
          deaf_community_involvement: Json | null
          ecosystem_roles: Json | null
          full_name: string | null
          id: string
          last_login: string | null
          preferred_communication_method: string | null
          preferred_name: string | null
          primary_role: string | null
          professional_domains: string[] | null
          secondary_roles: string[] | null
          updated_at: string | null
          verification_status: string | null
          wallet_addresses: Json | null
        }
        Insert: {
          accessibility_needs?: Json | null
          auth_user_id?: string | null
          blockchain_credentials?: Json | null
          created_at?: string | null
          deaf_community_involvement?: Json | null
          ecosystem_roles?: Json | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          preferred_communication_method?: string | null
          preferred_name?: string | null
          primary_role?: string | null
          professional_domains?: string[] | null
          secondary_roles?: string[] | null
          updated_at?: string | null
          verification_status?: string | null
          wallet_addresses?: Json | null
        }
        Update: {
          accessibility_needs?: Json | null
          auth_user_id?: string | null
          blockchain_credentials?: Json | null
          created_at?: string | null
          deaf_community_involvement?: Json | null
          ecosystem_roles?: Json | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          preferred_communication_method?: string | null
          preferred_name?: string | null
          primary_role?: string | null
          professional_domains?: string[] | null
          secondary_roles?: string[] | null
          updated_at?: string | null
          verification_status?: string | null
          wallet_addresses?: Json | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role_id: string | null
          user_id: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role_id?: string | null
          user_id?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role_id?: string | null
          user_id?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  ecosystem_identity: {
    Tables: {
      event_log: {
        Row: {
          created_at: string | null
          event_details: Json | null
          event_type: string
          id: number
          service_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_details?: Json | null
          event_type: string
          id?: number
          service_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_details?: Json | null
          event_type?: string
          id?: number
          service_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      identity_mappings: {
        Row: {
          id: string
          last_synced: string | null
          platform_name: string
          platform_user_id: string
          sync_status: Json | null
          user_id: string
        }
        Insert: {
          id?: string
          last_synced?: string | null
          platform_name: string
          platform_user_id: string
          sync_status?: Json | null
          user_id: string
        }
        Update: {
          id?: string
          last_synced?: string | null
          platform_name?: string
          platform_user_id?: string
          sync_status?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          access_levels: Json | null
          accessibility_needs: Json | null
          communication_preferences: Json | null
          consent_status: Json | null
          created_at: string | null
          deafauth_verified: boolean | null
          email: string
          fibonrose_compliance: boolean | null
          full_name: string | null
          id: string
          last_login: string | null
          phone: string | null
          pinksync_active: boolean | null
          preferred_language: string | null
          preferred_name: string | null
          roles: string[] | null
          trust_score: number | null
          updated_at: string | null
        }
        Insert: {
          access_levels?: Json | null
          accessibility_needs?: Json | null
          communication_preferences?: Json | null
          consent_status?: Json | null
          created_at?: string | null
          deafauth_verified?: boolean | null
          email: string
          fibonrose_compliance?: boolean | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          phone?: string | null
          pinksync_active?: boolean | null
          preferred_language?: string | null
          preferred_name?: string | null
          roles?: string[] | null
          trust_score?: number | null
          updated_at?: string | null
        }
        Update: {
          access_levels?: Json | null
          accessibility_needs?: Json | null
          communication_preferences?: Json | null
          consent_status?: Json | null
          created_at?: string | null
          deafauth_verified?: boolean | null
          email?: string
          fibonrose_compliance?: boolean | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          phone?: string | null
          pinksync_active?: boolean | null
          preferred_language?: string | null
          preferred_name?: string | null
          roles?: string[] | null
          trust_score?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      log_service_event: {
        Args: {
          p_event_details?: Json
          p_event_type: string
          p_service_name: string
          p_user_id: string
        }
        Returns: number
      }
      update_trust_score: {
        Args: { p_score_adjustment: number; p_user_id: string }
        Returns: number
      }
      update_user_roles: {
        Args: { p_roles: string[]; p_service_name: string; p_user_id: string }
        Returns: string[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  fibonrose: {
    Tables: {
      accessibility_metadata: {
        Row: {
          accessibility_features: string[] | null
          caption_quality: number | null
          id: string
          interpreter_name: string | null
          metadata: Json | null
          nft_id: string | null
          sign_language_type: string | null
          translation_quality: number | null
        }
        Insert: {
          accessibility_features?: string[] | null
          caption_quality?: number | null
          id?: string
          interpreter_name?: string | null
          metadata?: Json | null
          nft_id?: string | null
          sign_language_type?: string | null
          translation_quality?: number | null
        }
        Update: {
          accessibility_features?: string[] | null
          caption_quality?: number | null
          id?: string
          interpreter_name?: string | null
          metadata?: Json | null
          nft_id?: string | null
          sign_language_type?: string | null
          translation_quality?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "accessibility_metadata_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["id"]
          },
        ]
      }
      nft_collections: {
        Row: {
          blockchain: string | null
          contract_address: string | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          id: string
          is_verified: boolean | null
          metadata: Json | null
          name: string
          royalty_percentage: number | null
        }
        Insert: {
          blockchain?: string | null
          contract_address?: string | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_verified?: boolean | null
          metadata?: Json | null
          name: string
          royalty_percentage?: number | null
        }
        Update: {
          blockchain?: string | null
          contract_address?: string | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_verified?: boolean | null
          metadata?: Json | null
          name?: string
          royalty_percentage?: number | null
        }
        Relationships: []
      }
      nft_transactions: {
        Row: {
          blockchain_data: Json | null
          created_at: string | null
          currency: string | null
          from_user_id: string | null
          id: string
          nft_id: string | null
          price: number | null
          to_user_id: string | null
          transaction_hash: string | null
          transaction_type: string
        }
        Insert: {
          blockchain_data?: Json | null
          created_at?: string | null
          currency?: string | null
          from_user_id?: string | null
          id?: string
          nft_id?: string | null
          price?: number | null
          to_user_id?: string | null
          transaction_hash?: string | null
          transaction_type: string
        }
        Update: {
          blockchain_data?: Json | null
          created_at?: string | null
          currency?: string | null
          from_user_id?: string | null
          id?: string
          nft_id?: string | null
          price?: number | null
          to_user_id?: string | null
          transaction_hash?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "nft_transactions_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["id"]
          },
        ]
      }
      nfts: {
        Row: {
          category: Database["fibonrose"]["Enums"]["nft_category"]
          collection_id: string | null
          creator_id: string | null
          current_price: number | null
          description: string | null
          id: string
          last_transferred_at: string | null
          media_url: string | null
          metadata: Json | null
          mint_price: number | null
          minted_at: string | null
          owner_id: string | null
          status: Database["fibonrose"]["Enums"]["nft_status"] | null
          title: string
          token_id: string
        }
        Insert: {
          category: Database["fibonrose"]["Enums"]["nft_category"]
          collection_id?: string | null
          creator_id?: string | null
          current_price?: number | null
          description?: string | null
          id?: string
          last_transferred_at?: string | null
          media_url?: string | null
          metadata?: Json | null
          mint_price?: number | null
          minted_at?: string | null
          owner_id?: string | null
          status?: Database["fibonrose"]["Enums"]["nft_status"] | null
          title: string
          token_id: string
        }
        Update: {
          category?: Database["fibonrose"]["Enums"]["nft_category"]
          collection_id?: string | null
          creator_id?: string | null
          current_price?: number | null
          description?: string | null
          id?: string
          last_transferred_at?: string | null
          media_url?: string | null
          metadata?: Json | null
          mint_price?: number | null
          minted_at?: string | null
          owner_id?: string | null
          status?: Database["fibonrose"]["Enums"]["nft_status"] | null
          title?: string
          token_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nfts_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "nft_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          companies: Json | null
          created_at: string | null
          experience: Json | null
          full_name: string | null
          id: number
          services: Json | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          companies?: Json | null
          created_at?: string | null
          experience?: Json | null
          full_name?: string | null
          id?: never
          services?: Json | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          companies?: Json | null
          created_at?: string | null
          experience?: Json | null
          full_name?: string | null
          id?: never
          services?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      trust_profiles: {
        Row: {
          created_at: string | null
          cumulative_sales_amount: number | null
          id: string
          last_verified_at: string | null
          metadata: Json | null
          total_nfts_created: number | null
          total_nfts_owned: number | null
          trust_level: Database["fibonrose"]["Enums"]["trust_level"] | null
          user_id: string | null
          verification_score: number | null
        }
        Insert: {
          created_at?: string | null
          cumulative_sales_amount?: number | null
          id?: string
          last_verified_at?: string | null
          metadata?: Json | null
          total_nfts_created?: number | null
          total_nfts_owned?: number | null
          trust_level?: Database["fibonrose"]["Enums"]["trust_level"] | null
          user_id?: string | null
          verification_score?: number | null
        }
        Update: {
          created_at?: string | null
          cumulative_sales_amount?: number | null
          id?: string
          last_verified_at?: string | null
          metadata?: Json | null
          total_nfts_created?: number | null
          total_nfts_owned?: number | null
          trust_level?: Database["fibonrose"]["Enums"]["trust_level"] | null
          user_id?: string | null
          verification_score?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_trust_level: {
        Args: { p_user_id: string }
        Returns: Database["fibonrose"]["Enums"]["trust_level"]
      }
    }
    Enums: {
      nft_category:
        | "art"
        | "performance"
        | "educational"
        | "community"
        | "accessibility"
        | "sign_language"
        | "deaf_culture"
      nft_status: "minted" | "listed" | "transferred" | "burned" | "locked"
      trust_level: "unverified" | "basic" | "verified" | "trusted" | "elite"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  fibronrose: {
    Tables: {
      ai_feedback_loop: {
        Row: {
          accessibility_accommodation: number | null
          ai_model_updates: Json | null
          behavioral_observations: Json | null
          communication_effectiveness: number | null
          created_at: string | null
          cultural_sensitivity: number | null
          deaf_user_id: string | null
          feedback_verified: boolean | null
          id: string
          improvement_suggestions: Json | null
          interaction_patterns: Json | null
          overall_satisfaction: number | null
          professional_id: string | null
          service_quality: number | null
          service_session_id: string | null
          verification_method: string | null
        }
        Insert: {
          accessibility_accommodation?: number | null
          ai_model_updates?: Json | null
          behavioral_observations?: Json | null
          communication_effectiveness?: number | null
          created_at?: string | null
          cultural_sensitivity?: number | null
          deaf_user_id?: string | null
          feedback_verified?: boolean | null
          id?: string
          improvement_suggestions?: Json | null
          interaction_patterns?: Json | null
          overall_satisfaction?: number | null
          professional_id?: string | null
          service_quality?: number | null
          service_session_id?: string | null
          verification_method?: string | null
        }
        Update: {
          accessibility_accommodation?: number | null
          ai_model_updates?: Json | null
          behavioral_observations?: Json | null
          communication_effectiveness?: number | null
          created_at?: string | null
          cultural_sensitivity?: number | null
          deaf_user_id?: string | null
          feedback_verified?: boolean | null
          id?: string
          improvement_suggestions?: Json | null
          interaction_patterns?: Json | null
          overall_satisfaction?: number | null
          professional_id?: string | null
          service_quality?: number | null
          service_session_id?: string | null
          verification_method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_feedback_loop_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_professional_categories: {
        Row: {
          accuracy_score: number | null
          category_embeddings: string | null
          category_name: string
          classification_criteria: Json | null
          competency_requirements: Json | null
          created_at: string | null
          id: string
          last_ai_update: string | null
          parent_category: string | null
          required_skills: string[] | null
          suggested_certifications: string[] | null
          usage_frequency: number | null
        }
        Insert: {
          accuracy_score?: number | null
          category_embeddings?: string | null
          category_name: string
          classification_criteria?: Json | null
          competency_requirements?: Json | null
          created_at?: string | null
          id?: string
          last_ai_update?: string | null
          parent_category?: string | null
          required_skills?: string[] | null
          suggested_certifications?: string[] | null
          usage_frequency?: number | null
        }
        Update: {
          accuracy_score?: number | null
          category_embeddings?: string | null
          category_name?: string
          classification_criteria?: Json | null
          competency_requirements?: Json | null
          created_at?: string | null
          id?: string
          last_ai_update?: string | null
          parent_category?: string | null
          required_skills?: string[] | null
          suggested_certifications?: string[] | null
          usage_frequency?: number | null
        }
        Relationships: []
      }
      ai_service_matches: {
        Row: {
          accessibility_requirements: string[] | null
          ai_reasoning: Json | null
          budget_parameters: Json | null
          communication_preferences: string[] | null
          complexity_score: number | null
          confidence_level: number | null
          created_at: string | null
          deaf_user_id: string | null
          id: string
          location_constraints: Json | null
          match_accepted: boolean | null
          match_score: number | null
          matching_factors: Json | null
          outcome_feedback: Json | null
          professional_id: string | null
          satisfaction_rating: number | null
          service_category: string
          service_completed: boolean | null
          service_type: string
          urgency_level: number | null
        }
        Insert: {
          accessibility_requirements?: string[] | null
          ai_reasoning?: Json | null
          budget_parameters?: Json | null
          communication_preferences?: string[] | null
          complexity_score?: number | null
          confidence_level?: number | null
          created_at?: string | null
          deaf_user_id?: string | null
          id?: string
          location_constraints?: Json | null
          match_accepted?: boolean | null
          match_score?: number | null
          matching_factors?: Json | null
          outcome_feedback?: Json | null
          professional_id?: string | null
          satisfaction_rating?: number | null
          service_category: string
          service_completed?: boolean | null
          service_type: string
          urgency_level?: number | null
        }
        Update: {
          accessibility_requirements?: string[] | null
          ai_reasoning?: Json | null
          budget_parameters?: Json | null
          communication_preferences?: string[] | null
          complexity_score?: number | null
          confidence_level?: number | null
          created_at?: string | null
          deaf_user_id?: string | null
          id?: string
          location_constraints?: Json | null
          match_accepted?: boolean | null
          match_score?: number | null
          matching_factors?: Json | null
          outcome_feedback?: Json | null
          professional_id?: string | null
          satisfaction_rating?: number | null
          service_category?: string
          service_completed?: boolean | null
          service_type?: string
          urgency_level?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_service_matches_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      blockchain_anchors: {
        Row: {
          anchor_data: Json
          anchor_timestamp: string
          blockchain_type: string
          entity_id: string
          id: number
          transaction_hash: string
        }
        Insert: {
          anchor_data: Json
          anchor_timestamp?: string
          blockchain_type: string
          entity_id: string
          id?: never
          transaction_hash: string
        }
        Update: {
          anchor_data?: Json
          anchor_timestamp?: string
          blockchain_type?: string
          entity_id?: string
          id?: never
          transaction_hash?: string
        }
        Relationships: []
      }
      professionals: {
        Row: {
          accessibility_features: string[] | null
          ai_categories_secondary: string[] | null
          ai_category_primary: string
          ai_specialization_tags: string[] | null
          asl_proficiency_level: string | null
          availability_schedule: Json | null
          business_name: string | null
          certifications: Json | null
          competency_vector: string | null
          created_at: string | null
          cultural_competency_score: number | null
          deaf_clients_served: number | null
          deaf_community_experience: number | null
          education: Json | null
          full_name: string
          id: string
          last_active: string | null
          licenses: Json | null
          matching_preferences: Json | null
          performance_predictions: Json | null
          phone_number: string | null
          pricing_structure: Json | null
          professional_email: string | null
          quality_indicators: Json | null
          service_areas: string[] | null
          service_locations: Json | null
          service_methods: string[] | null
          skill_embeddings: string | null
          travel_radius: number | null
          trust_level: string | null
          trust_score: number | null
          updated_at: string | null
          user_id: string | null
          verification_status: string | null
          years_experience: number | null
        }
        Insert: {
          accessibility_features?: string[] | null
          ai_categories_secondary?: string[] | null
          ai_category_primary: string
          ai_specialization_tags?: string[] | null
          asl_proficiency_level?: string | null
          availability_schedule?: Json | null
          business_name?: string | null
          certifications?: Json | null
          competency_vector?: string | null
          created_at?: string | null
          cultural_competency_score?: number | null
          deaf_clients_served?: number | null
          deaf_community_experience?: number | null
          education?: Json | null
          full_name: string
          id?: string
          last_active?: string | null
          licenses?: Json | null
          matching_preferences?: Json | null
          performance_predictions?: Json | null
          phone_number?: string | null
          pricing_structure?: Json | null
          professional_email?: string | null
          quality_indicators?: Json | null
          service_areas?: string[] | null
          service_locations?: Json | null
          service_methods?: string[] | null
          skill_embeddings?: string | null
          travel_radius?: number | null
          trust_level?: string | null
          trust_score?: number | null
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
          years_experience?: number | null
        }
        Update: {
          accessibility_features?: string[] | null
          ai_categories_secondary?: string[] | null
          ai_category_primary?: string
          ai_specialization_tags?: string[] | null
          asl_proficiency_level?: string | null
          availability_schedule?: Json | null
          business_name?: string | null
          certifications?: Json | null
          competency_vector?: string | null
          created_at?: string | null
          cultural_competency_score?: number | null
          deaf_clients_served?: number | null
          deaf_community_experience?: number | null
          education?: Json | null
          full_name?: string
          id?: string
          last_active?: string | null
          licenses?: Json | null
          matching_preferences?: Json | null
          performance_predictions?: Json | null
          phone_number?: string | null
          pricing_structure?: Json | null
          professional_email?: string | null
          quality_indicators?: Json | null
          service_areas?: string[] | null
          service_locations?: Json | null
          service_methods?: string[] | null
          skill_embeddings?: string | null
          travel_radius?: number | null
          trust_level?: string | null
          trust_score?: number | null
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      reputation_scores: {
        Row: {
          entity_id: string
          id: string
          last_updated: string
          metadata: Json | null
          reputation_type: string
          trust_score: number
          validation_count: number | null
        }
        Insert: {
          entity_id: string
          id?: string
          last_updated?: string
          metadata?: Json | null
          reputation_type: string
          trust_score?: number
          validation_count?: number | null
        }
        Update: {
          entity_id?: string
          id?: string
          last_updated?: string
          metadata?: Json | null
          reputation_type?: string
          trust_score?: number
          validation_count?: number | null
        }
        Relationships: []
      }
      trust_relationships: {
        Row: {
          created_at: string
          id: number
          last_updated: string
          relationship_type: string
          source_entity_id: string
          target_entity_id: string
          trust_level: number
        }
        Insert: {
          created_at?: string
          id?: never
          last_updated?: string
          relationship_type: string
          source_entity_id: string
          target_entity_id: string
          trust_level?: number
        }
        Update: {
          created_at?: string
          id?: never
          last_updated?: string
          relationship_type?: string
          source_entity_id?: string
          target_entity_id?: string
          trust_level?: number
        }
        Relationships: []
      }
      validation_logs: {
        Row: {
          details: Json | null
          entity_id: string
          id: number
          result: boolean
          validation_timestamp: string
          validation_type: string
          validator_id: string
        }
        Insert: {
          details?: Json | null
          entity_id: string
          id?: never
          result: boolean
          validation_timestamp?: string
          validation_type: string
          validator_id: string
        }
        Update: {
          details?: Json | null
          entity_id?: string
          id?: never
          result?: boolean
          validation_timestamp?: string
          validation_type?: string
          validator_id?: string
        }
        Relationships: []
      }
      validation_requests: {
        Row: {
          created_at: string | null
          id: number
          message: string | null
          proof_id: number
          requester_id: string
          status: string | null
          validator_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          message?: string | null
          proof_id: number
          requester_id: string
          status?: string | null
          validator_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          message?: string | null
          proof_id?: number
          requester_id?: string
          status?: string | null
          validator_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_validation_task: {
        Args: {
          p_complexity_score?: number
          p_description?: string
          p_difficulty_level?: string
          p_metadata?: Json
          p_title: string
        }
        Returns: string
      }
      get_validator_performance: {
        Args: { p_validator_id?: string }
        Returns: {
          average_complexity: number
          average_review_time: number
          completed_tasks: number
          performance_score: number
          total_tasks: number
          validator_id: string
          validator_name: string
        }[]
      }
      log_analytics_event: {
        Args: { p_event_type: string; p_metadata?: Json; p_task_id?: string }
        Returns: string
      }
      update_validation_task: {
        Args: {
          p_metadata?: Json
          p_review_time?: number
          p_status?: string
          p_task_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  graphql: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      _internal_resolve: {
        Args: {
          extensions?: Json
          operationName?: string
          query: string
          variables?: Json
        }
        Returns: Json
      }
      comment_directive: { Args: { comment_: string }; Returns: Json }
      exception: { Args: { message: string }; Returns: string }
      get_schema_version: { Args: never; Returns: number }
      resolve: {
        Args: {
          extensions?: Json
          operationName?: string
          query: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  magician_agents: {
    Tables: {
      agent_interactions: {
        Row: {
          agent_id: string
          id: number
          input_data: Json
          interaction_timestamp: string
          interaction_type: string
          metadata: Json | null
          output_data: Json | null
          performance_score: number | null
        }
        Insert: {
          agent_id: string
          id?: never
          input_data: Json
          interaction_timestamp?: string
          interaction_type: string
          metadata?: Json | null
          output_data?: Json | null
          performance_score?: number | null
        }
        Update: {
          agent_id?: string
          id?: never
          input_data?: Json
          interaction_timestamp?: string
          interaction_type?: string
          metadata?: Json | null
          output_data?: Json | null
          performance_score?: number | null
        }
        Relationships: []
      }
      agents: {
        Row: {
          created_at: string
          id: string
          name: string
          role: string
          status: string | null
          updated_at: string
          version: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          role: string
          status?: string | null
          updated_at?: string
          version?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          role?: string
          status?: string | null
          updated_at?: string
          version?: string | null
        }
        Relationships: []
      }
      decision_trees: {
        Row: {
          agent_id: string
          created_at: string
          id: string
          last_updated: string
          serialized_tree: string
          tree_type: string
          version: number
        }
        Insert: {
          agent_id: string
          created_at?: string
          id?: string
          last_updated?: string
          serialized_tree: string
          tree_type: string
          version?: number
        }
        Update: {
          agent_id?: string
          created_at?: string
          id?: string
          last_updated?: string
          serialized_tree?: string
          tree_type?: string
          version?: number
        }
        Relationships: []
      }
      learning_patterns: {
        Row: {
          agent_id: string
          confidence_score: number
          discovered_at: string
          id: string
          is_active: boolean
          learning_data: Json
          pattern_type: string
        }
        Insert: {
          agent_id: string
          confidence_score: number
          discovered_at?: string
          id?: string
          is_active?: boolean
          learning_data: Json
          pattern_type: string
        }
        Update: {
          agent_id?: string
          confidence_score?: number
          discovered_at?: string
          id?: string
          is_active?: boolean
          learning_data?: Json
          pattern_type?: string
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          agent_id: string
          context: Json | null
          id: number
          measured_at: string
          metric_name: string
          metric_value: number
        }
        Insert: {
          agent_id: string
          context?: Json | null
          id?: never
          measured_at?: string
          metric_name: string
          metric_value: number
        }
        Update: {
          agent_id?: string
          context?: Json | null
          id?: never
          measured_at?: string
          metric_name?: string
          metric_value?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  magicians: {
    Tables: {
      model_performance_tracking: {
        Row: {
          accuracy_scores: Json | null
          bias_detection: Json | null
          created_at: string | null
          edge_case_handling: Json | null
          id: string
          improvement_suggestions: Json | null
          model_version: string | null
          provider: string | null
        }
        Insert: {
          accuracy_scores?: Json | null
          bias_detection?: Json | null
          created_at?: string | null
          edge_case_handling?: Json | null
          id?: string
          improvement_suggestions?: Json | null
          model_version?: string | null
          provider?: string | null
        }
        Update: {
          accuracy_scores?: Json | null
          bias_detection?: Json | null
          created_at?: string | null
          edge_case_handling?: Json | null
          id?: string
          improvement_suggestions?: Json | null
          model_version?: string | null
          provider?: string | null
        }
        Relationships: []
      }
      proprietary_benchmarks: {
        Row: {
          created_at: string | null
          ground_truth: Json | null
          human_evaluation: Json | null
          id: string
          improvement_metrics: Json | null
          provider_results: Json | null
          real_user_feedback: Json | null
          test_scenario: string | null
        }
        Insert: {
          created_at?: string | null
          ground_truth?: Json | null
          human_evaluation?: Json | null
          id?: string
          improvement_metrics?: Json | null
          provider_results?: Json | null
          real_user_feedback?: Json | null
          test_scenario?: string | null
        }
        Update: {
          created_at?: string | null
          ground_truth?: Json | null
          human_evaluation?: Json | null
          id?: string
          improvement_metrics?: Json | null
          provider_results?: Json | null
          real_user_feedback?: Json | null
          test_scenario?: string | null
        }
        Relationships: []
      }
      training_datasets: {
        Row: {
          contributor_demographics: Json | null
          created_at: string | null
          cultural_context: Json | null
          id: string
          quality_metrics: Json | null
          sign_language_type: string | null
          transcription_accuracy: number | null
          video_data_hash: string | null
        }
        Insert: {
          contributor_demographics?: Json | null
          created_at?: string | null
          cultural_context?: Json | null
          id?: string
          quality_metrics?: Json | null
          sign_language_type?: string | null
          transcription_accuracy?: number | null
          video_data_hash?: string | null
        }
        Update: {
          contributor_demographics?: Json | null
          created_at?: string | null
          cultural_context?: Json | null
          id?: string
          quality_metrics?: Json | null
          sign_language_type?: string | null
          transcription_accuracy?: number | null
          video_data_hash?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  mbtq: {
    Tables: {
      ai_learning_modules: {
        Row: {
          asl_video_url: string | null
          content_complexity: number | null
          generated_at: string | null
          id: string
          is_asl_supported: boolean | null
          last_viewed_at: string | null
          provider: string | null
          summary: string | null
          topic: string
          transcript: string | null
          user_id: string | null
          video_url: string | null
        }
        Insert: {
          asl_video_url?: string | null
          content_complexity?: number | null
          generated_at?: string | null
          id?: string
          is_asl_supported?: boolean | null
          last_viewed_at?: string | null
          provider?: string | null
          summary?: string | null
          topic: string
          transcript?: string | null
          user_id?: string | null
          video_url?: string | null
        }
        Update: {
          asl_video_url?: string | null
          content_complexity?: number | null
          generated_at?: string | null
          id?: string
          is_asl_supported?: boolean | null
          last_viewed_at?: string | null
          provider?: string | null
          summary?: string | null
          topic?: string
          transcript?: string | null
          user_id?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_learning_modules_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          context: Json | null
          created_at: string | null
          id: string
          ip_address: unknown
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          context?: Json | null
          created_at?: string | null
          id?: string
          ip_address?: unknown
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          context?: Json | null
          created_at?: string | null
          id?: string
          ip_address?: unknown
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      business_ideas: {
        Row: {
          accessibility_root: string | null
          created_at: string | null
          detailed_description: string
          disadvantaged_status:
            | Database["mbtq"]["Enums"]["disadvantaged_status"][]
            | null
          economic_alignment_assessment: string | null
          has_us_operations: boolean | null
          id: number
          idea_embedding: string | null
          idea_title: string
          industry: Database["mbtq"]["Enums"]["industry"] | null
          is_for_profit: boolean | null
          is_majority_owned_by_us_citizens: boolean | null
          monetization: string | null
          number_of_employees: number | null
          problem: string | null
          recommendations: string | null
          sba_eligibility_assessment: string | null
          sba_focus_area: Database["mbtq"]["Enums"]["sba_focus_area"] | null
          solution: string | null
          status: string | null
          target_audience: string | null
          technologies: string[] | null
          updated_at: string | null
          user_id: string | null
          validation_score: number | null
        }
        Insert: {
          accessibility_root?: string | null
          created_at?: string | null
          detailed_description: string
          disadvantaged_status?:
            | Database["mbtq"]["Enums"]["disadvantaged_status"][]
            | null
          economic_alignment_assessment?: string | null
          has_us_operations?: boolean | null
          id?: never
          idea_embedding?: string | null
          idea_title: string
          industry?: Database["mbtq"]["Enums"]["industry"] | null
          is_for_profit?: boolean | null
          is_majority_owned_by_us_citizens?: boolean | null
          monetization?: string | null
          number_of_employees?: number | null
          problem?: string | null
          recommendations?: string | null
          sba_eligibility_assessment?: string | null
          sba_focus_area?: Database["mbtq"]["Enums"]["sba_focus_area"] | null
          solution?: string | null
          status?: string | null
          target_audience?: string | null
          technologies?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          validation_score?: number | null
        }
        Update: {
          accessibility_root?: string | null
          created_at?: string | null
          detailed_description?: string
          disadvantaged_status?:
            | Database["mbtq"]["Enums"]["disadvantaged_status"][]
            | null
          economic_alignment_assessment?: string | null
          has_us_operations?: boolean | null
          id?: never
          idea_embedding?: string | null
          idea_title?: string
          industry?: Database["mbtq"]["Enums"]["industry"] | null
          is_for_profit?: boolean | null
          is_majority_owned_by_us_citizens?: boolean | null
          monetization?: string | null
          number_of_employees?: number | null
          problem?: string | null
          recommendations?: string | null
          sba_eligibility_assessment?: string | null
          sba_focus_area?: Database["mbtq"]["Enums"]["sba_focus_area"] | null
          solution?: string | null
          status?: string | null
          target_audience?: string | null
          technologies?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          validation_score?: number | null
        }
        Relationships: []
      }
      community_reputation: {
        Row: {
          ideas_validated: number | null
          last_calculated: string | null
          trust_score: number | null
          user_id: string
          validation_score: number | null
        }
        Insert: {
          ideas_validated?: number | null
          last_calculated?: string | null
          trust_score?: number | null
          user_id: string
          validation_score?: number | null
        }
        Update: {
          ideas_validated?: number | null
          last_calculated?: string | null
          trust_score?: number | null
          user_id?: string
          validation_score?: number | null
        }
        Relationships: []
      }
      design_violations: {
        Row: {
          created_at: string | null
          id: number
          user_id: string | null
          violation_details: Json | null
          violation_type: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          user_id?: string | null
          violation_details?: Json | null
          violation_type: string
        }
        Update: {
          created_at?: string | null
          id?: never
          user_id?: string | null
          violation_details?: Json | null
          violation_type?: string
        }
        Relationships: []
      }
      ecosystem_communication_log: {
        Row: {
          accessibility_mode: string | null
          created_at: string | null
          error_details: Json | null
          gu_consumed: number | null
          id: string
          message_type: string
          processing_time_ms: number | null
          source_service: string
          status: string | null
          target_service: string
        }
        Insert: {
          accessibility_mode?: string | null
          created_at?: string | null
          error_details?: Json | null
          gu_consumed?: number | null
          id?: string
          message_type: string
          processing_time_ms?: number | null
          source_service: string
          status?: string | null
          target_service: string
        }
        Update: {
          accessibility_mode?: string | null
          created_at?: string | null
          error_details?: Json | null
          gu_consumed?: number | null
          id?: string
          message_type?: string
          processing_time_ms?: number | null
          source_service?: string
          status?: string | null
          target_service?: string
        }
        Relationships: []
      }
      ecosystem_contributions: {
        Row: {
          contribution_details: Json | null
          contribution_type: string | null
          created_at: string | null
          id: string
          impact_score: number | null
          user_id: string | null
        }
        Insert: {
          contribution_details?: Json | null
          contribution_type?: string | null
          created_at?: string | null
          id?: string
          impact_score?: number | null
          user_id?: string | null
        }
        Update: {
          contribution_details?: Json | null
          contribution_type?: string | null
          created_at?: string | null
          id?: string
          impact_score?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      financial_integrations: {
        Row: {
          active: boolean | null
          encrypted_access_token: string | null
          external_id: string
          id: string
          last_synced_at: string | null
          linked_at: string | null
          provider: string | null
          sync_status: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          encrypted_access_token?: string | null
          external_id: string
          id?: string
          last_synced_at?: string | null
          linked_at?: string | null
          provider?: string | null
          sync_status?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          encrypted_access_token?: string | null
          external_id?: string
          id?: string
          last_synced_at?: string | null
          linked_at?: string | null
          provider?: string | null
          sync_status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_integrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      idea_validations: {
        Row: {
          id: number
          idea_id: number | null
          validated_at: string | null
          validation_notes: string | null
          validation_score: number | null
          validator_id: string | null
        }
        Insert: {
          id?: never
          idea_id?: number | null
          validated_at?: string | null
          validation_notes?: string | null
          validation_score?: number | null
          validator_id?: string | null
        }
        Update: {
          id?: never
          idea_id?: number | null
          validated_at?: string | null
          validation_notes?: string | null
          validation_score?: number | null
          validator_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "idea_validations_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
        ]
      }
      ideas: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: number
          metadata: Json | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: never
          metadata?: Json | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: never
          metadata?: Json | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      insurance_needs: {
        Row: {
          coverage_amount: number | null
          coverage_gap: boolean | null
          coverage_type: Database["mbtq"]["Enums"]["coverage_type"] | null
          current_provider: string | null
          has_ai_assistance: boolean | null
          id: string
          next_review_date: string | null
          premium_estimate: number | null
          reviewed_at: string | null
          risk_assessment_score: number | null
          user_id: string | null
        }
        Insert: {
          coverage_amount?: number | null
          coverage_gap?: boolean | null
          coverage_type?: Database["mbtq"]["Enums"]["coverage_type"] | null
          current_provider?: string | null
          has_ai_assistance?: boolean | null
          id?: string
          next_review_date?: string | null
          premium_estimate?: number | null
          reviewed_at?: string | null
          risk_assessment_score?: number | null
          user_id?: string | null
        }
        Update: {
          coverage_amount?: number | null
          coverage_gap?: boolean | null
          coverage_type?: Database["mbtq"]["Enums"]["coverage_type"] | null
          current_provider?: string | null
          has_ai_assistance?: boolean | null
          id?: string
          next_review_date?: string | null
          premium_estimate?: number | null
          reviewed_at?: string | null
          risk_assessment_score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insurance_needs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_leads: {
        Row: {
          deaf_friendly: boolean | null
          id: string
          notes: Json | null
          provider_id: string | null
          referred_at: string | null
          service_type: Database["mbtq"]["Enums"]["service_type"]
          specialization: string | null
          status: Database["mbtq"]["Enums"]["referral_status"] | null
          user_id: string | null
        }
        Insert: {
          deaf_friendly?: boolean | null
          id?: string
          notes?: Json | null
          provider_id?: string | null
          referred_at?: string | null
          service_type: Database["mbtq"]["Enums"]["service_type"]
          specialization?: string | null
          status?: Database["mbtq"]["Enums"]["referral_status"] | null
          user_id?: string | null
        }
        Update: {
          deaf_friendly?: boolean | null
          id?: string
          notes?: Json | null
          provider_id?: string | null
          referred_at?: string | null
          service_type?: Database["mbtq"]["Enums"]["service_type"]
          specialization?: string | null
          status?: Database["mbtq"]["Enums"]["referral_status"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_leads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_profiles: {
        Row: {
          dependents: number | null
          estimated_deductions: number | null
          estimated_income: number | null
          filing_status: Database["mbtq"]["Enums"]["filing_status"] | null
          id: string
          last_filed_at: string | null
          metadata: Json | null
          next_filing_deadline: string | null
          submission_method: string | null
          tax_complexity_score: number | null
          tax_year: number | null
          user_id: string | null
        }
        Insert: {
          dependents?: number | null
          estimated_deductions?: number | null
          estimated_income?: number | null
          filing_status?: Database["mbtq"]["Enums"]["filing_status"] | null
          id?: string
          last_filed_at?: string | null
          metadata?: Json | null
          next_filing_deadline?: string | null
          submission_method?: string | null
          tax_complexity_score?: number | null
          tax_year?: number | null
          user_id?: string | null
        }
        Update: {
          dependents?: number | null
          estimated_deductions?: number | null
          estimated_income?: number | null
          filing_status?: Database["mbtq"]["Enums"]["filing_status"] | null
          id?: string
          last_filed_at?: string | null
          metadata?: Json | null
          next_filing_deadline?: string | null
          submission_method?: string | null
          tax_complexity_score?: number | null
          tax_year?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          accessibility_needs: Json | null
          created_at: string | null
          deaf_verified: boolean | null
          full_name: string
          id: string
          last_active_at: string | null
          preferred_communication: string[] | null
          sign_language_preference: string | null
          user_embedding: string | null
        }
        Insert: {
          accessibility_needs?: Json | null
          created_at?: string | null
          deaf_verified?: boolean | null
          full_name: string
          id: string
          last_active_at?: string | null
          preferred_communication?: string[] | null
          sign_language_preference?: string | null
          user_embedding?: string | null
        }
        Update: {
          accessibility_needs?: Json | null
          created_at?: string | null
          deaf_verified?: boolean | null
          full_name?: string
          id?: string
          last_active_at?: string | null
          preferred_communication?: string[] | null
          sign_language_preference?: string | null
          user_embedding?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_and_validate_idea: {
        Args: {
          p_industries: Database["mbtq"]["Enums"]["industry"][]
          p_sba_focus_area: Database["mbtq"]["Enums"]["sba_focus_area"]
        }
        Returns: Json
      }
      get_recent_ideas: {
        Args: { p_limit?: number; p_offset?: number }
        Returns: Json
      }
      log_design_violation: {
        Args: { p_details: Json; p_user_id: string; p_violation_type: string }
        Returns: undefined
      }
    }
    Enums: {
      coverage_type:
        | "health"
        | "life"
        | "disability"
        | "property"
        | "vision"
        | "dental"
      disadvantaged_status:
        | "Not Applicable"
        | "Person with a Disability (including Deafness)"
        | "Woman"
        | "Service-Disabled Veteran"
        | "Other Disadvantaged Group"
      filing_status:
        | "single"
        | "married_joint"
        | "married_separate"
        | "head_of_household"
        | "qualifying_widow"
      industry:
        | "Technology"
        | "Healthcare"
        | "Green Energy"
        | "Manufacturing"
        | "Accessibility Tech"
        | "Education"
        | "Retail"
      referral_status:
        | "pending"
        | "contacted"
        | "in_progress"
        | "completed"
        | "closed"
      sba_focus_area:
        | "SBIR/STTR (Research & Development)"
        | "Deaf and Hard-of-Hearing Community"
        | "8(a) Business Development"
        | "Veteran-Owned"
        | "General Loan"
      service_type:
        | "tax_preparation"
        | "financial_planning"
        | "insurance_consultation"
        | "legal_advice"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  net: {
    Tables: {
      _http_response: {
        Row: {
          content: string | null
          content_type: string | null
          created: string
          error_msg: string | null
          headers: Json | null
          id: number | null
          status_code: number | null
          timed_out: boolean | null
        }
        Insert: {
          content?: string | null
          content_type?: string | null
          created?: string
          error_msg?: string | null
          headers?: Json | null
          id?: number | null
          status_code?: number | null
          timed_out?: boolean | null
        }
        Update: {
          content?: string | null
          content_type?: string | null
          created?: string
          error_msg?: string | null
          headers?: Json | null
          id?: number | null
          status_code?: number | null
          timed_out?: boolean | null
        }
        Relationships: []
      }
      http_request_queue: {
        Row: {
          body: string | null
          headers: Json
          id: number
          method: string
          timeout_milliseconds: number
          url: string
        }
        Insert: {
          body?: string | null
          headers: Json
          id?: number
          method: string
          timeout_milliseconds: number
          url: string
        }
        Update: {
          body?: string | null
          headers?: Json
          id?: number
          method?: string
          timeout_milliseconds?: number
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      _await_response: { Args: { request_id: number }; Returns: boolean }
      _encode_url_with_params_array: {
        Args: { params_array: string[]; url: string }
        Returns: string
      }
      _http_collect_response: {
        Args: { async?: boolean; request_id: number }
        Returns: Database["net"]["CompositeTypes"]["http_response_result"]
        SetofOptions: {
          from: "*"
          to: "http_response_result"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      _urlencode_string: { Args: { string: string }; Returns: string }
      check_worker_is_up: { Args: never; Returns: undefined }
      http_collect_response: {
        Args: { async?: boolean; request_id: number }
        Returns: Database["net"]["CompositeTypes"]["http_response_result"]
        SetofOptions: {
          from: "*"
          to: "http_response_result"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_delete: {
        Args: {
          headers?: Json
          params?: Json
          timeout_milliseconds?: number
          url: string
        }
        Returns: number
      }
      http_get: {
        Args: {
          headers?: Json
          params?: Json
          timeout_milliseconds?: number
          url: string
        }
        Returns: number
      }
      http_post: {
        Args: {
          body?: Json
          headers?: Json
          params?: Json
          timeout_milliseconds?: number
          url: string
        }
        Returns: number
      }
      worker_restart: { Args: never; Returns: boolean }
    }
    Enums: {
      request_status: "PENDING" | "SUCCESS" | "ERROR"
    }
    CompositeTypes: {
      http_response: {
        status_code: number | null
        headers: Json | null
        body: string | null
      }
      http_response_result: {
        status: Database["net"]["Enums"]["request_status"] | null
        message: string | null
        response: Database["net"]["CompositeTypes"]["http_response"] | null
      }
    }
  }
  performance: {
    Tables: {
      cross_provider_insights: {
        Row: {
          best_combinations: Json | null
          cost_optimization_strategies: Json | null
          created_at: string | null
          id: string
          optimization_rules: Json | null
          performance_predictions: Json | null
        }
        Insert: {
          best_combinations?: Json | null
          cost_optimization_strategies?: Json | null
          created_at?: string | null
          id?: string
          optimization_rules?: Json | null
          performance_predictions?: Json | null
        }
        Update: {
          best_combinations?: Json | null
          cost_optimization_strategies?: Json | null
          created_at?: string | null
          id?: string
          optimization_rules?: Json | null
          performance_predictions?: Json | null
        }
        Relationships: []
      }
      real_time_metrics: {
        Row: {
          accuracy_score: number | null
          cost_efficiency: number | null
          error_rate: number | null
          id: string
          provider: string | null
          response_time: number | null
          timestamp: string | null
          user_satisfaction: number | null
        }
        Insert: {
          accuracy_score?: number | null
          cost_efficiency?: number | null
          error_rate?: number | null
          id?: string
          provider?: string | null
          response_time?: number | null
          timestamp?: string | null
          user_satisfaction?: number | null
        }
        Update: {
          accuracy_score?: number | null
          cost_efficiency?: number | null
          error_rate?: number | null
          id?: string
          provider?: string | null
          response_time?: number | null
          timestamp?: string | null
          user_satisfaction?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  pgmq_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      archive: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      delete: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      pop: {
        Args: { queue_name: string }
        Returns: unknown[]
        SetofOptions: {
          from: "*"
          to: "message_record"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      read: {
        Args: { n: number; queue_name: string; sleep_seconds: number }
        Returns: unknown[]
        SetofOptions: {
          from: "*"
          to: "message_record"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      send: {
        Args: { message: Json; queue_name: string; sleep_seconds?: number }
        Returns: number[]
      }
      send_batch: {
        Args: { messages: Json[]; queue_name: string; sleep_seconds?: number }
        Returns: number[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  pinksync: {
    Tables: {
      accessibility_settings: {
        Row: {
          caption_enabled: boolean | null
          id: string
          preferred_language: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          caption_enabled?: boolean | null
          id?: string
          preferred_language?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          caption_enabled?: boolean | null
          id?: string
          preferred_language?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: number
          performed_by: string
          session_id: number | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: never
          performed_by: string
          session_id?: number | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: never
          performed_by?: string
          session_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_workflows: {
        Row: {
          api_providers_used: string[] | null
          created_at: string | null
          id: string
          optimization_rules: Json | null
          performance_scores: Json | null
          updated_at: string | null
          user_id: string | null
          user_satisfaction: number | null
          workflow_type: string | null
        }
        Insert: {
          api_providers_used?: string[] | null
          created_at?: string | null
          id?: string
          optimization_rules?: Json | null
          performance_scores?: Json | null
          updated_at?: string | null
          user_id?: string | null
          user_satisfaction?: number | null
          workflow_type?: string | null
        }
        Update: {
          api_providers_used?: string[] | null
          created_at?: string | null
          id?: string
          optimization_rules?: Json | null
          performance_scores?: Json | null
          updated_at?: string | null
          user_id?: string | null
          user_satisfaction?: number | null
          workflow_type?: string | null
        }
        Relationships: []
      }
      cross_provider_analytics: {
        Row: {
          anthropic_performance: Json | null
          best_practice_patterns: Json | null
          created_at: string | null
          google_performance: Json | null
          id: string
          openai_performance: Json | null
          optimization_algorithms: Json | null
        }
        Insert: {
          anthropic_performance?: Json | null
          best_practice_patterns?: Json | null
          created_at?: string | null
          google_performance?: Json | null
          id?: string
          openai_performance?: Json | null
          optimization_algorithms?: Json | null
        }
        Update: {
          anthropic_performance?: Json | null
          best_practice_patterns?: Json | null
          created_at?: string | null
          google_performance?: Json | null
          id?: string
          openai_performance?: Json | null
          optimization_algorithms?: Json | null
        }
        Relationships: []
      }
      device_sync: {
        Row: {
          device_id: string | null
          id: string
          last_seen: string | null
          user_id: string
        }
        Insert: {
          device_id?: string | null
          id?: string
          last_seen?: string | null
          user_id: string
        }
        Update: {
          device_id?: string | null
          id?: string
          last_seen?: string | null
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          author_id: string
          content: Json
          created_at: string | null
          id: number
          parent_id: number | null
          session_id: number | null
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: Json
          created_at?: string | null
          id?: never
          parent_id?: number | null
          session_id?: number | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: Json
          created_at?: string | null
          id?: never
          parent_id?: number | null
          session_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      neural_optimization: {
        Row: {
          api_routing_decisions: Json | null
          cost_optimization: Json | null
          created_at: string | null
          input_characteristics: Json | null
          latency_optimization: Json | null
          performance_improvements: Json | null
          workflow_id: string
        }
        Insert: {
          api_routing_decisions?: Json | null
          cost_optimization?: Json | null
          created_at?: string | null
          input_characteristics?: Json | null
          latency_optimization?: Json | null
          performance_improvements?: Json | null
          workflow_id: string
        }
        Update: {
          api_routing_decisions?: Json | null
          cost_optimization?: Json | null
          created_at?: string | null
          input_characteristics?: Json | null
          latency_optimization?: Json | null
          performance_improvements?: Json | null
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "neural_optimization_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: true
            referencedRelation: "automation_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      session_logs: {
        Row: {
          action: string | null
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          action?: string | null
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      session_participants: {
        Row: {
          joined_at: string | null
          last_active_at: string | null
          role: string
          session_id: number
          user_id: string
        }
        Insert: {
          joined_at?: string | null
          last_active_at?: string | null
          role?: string
          session_id: number
          user_id: string
        }
        Update: {
          joined_at?: string | null
          last_active_at?: string | null
          role?: string
          session_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string | null
          description: string | null
          expires_at: string | null
          id: number
          owner_id: string
          settings: Json | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: never
          owner_id: string
          settings?: Json | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: never
          owner_id?: string
          settings?: Json | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      accessibility_preferences: {
        Row: {
          created_at: string | null
          id: string
          preferred_sign_languages:
            | Database["public"]["Enums"]["accessibility_mode"][]
            | null
          preferred_transcript_format: string[] | null
          requires_captions: boolean | null
          requires_sign_language: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          preferred_sign_languages?:
            | Database["public"]["Enums"]["accessibility_mode"][]
            | null
          preferred_transcript_format?: string[] | null
          requires_captions?: boolean | null
          requires_sign_language?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          preferred_sign_languages?:
            | Database["public"]["Enums"]["accessibility_mode"][]
            | null
          preferred_transcript_format?: string[] | null
          requires_captions?: boolean | null
          requires_sign_language?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      accessibility_support_requests: {
        Row: {
          details: Json | null
          id: number
          requested_at: string | null
          resolved_at: string | null
          status: string | null
          support_type: string | null
          user_id: string | null
        }
        Insert: {
          details?: Json | null
          id?: number
          requested_at?: string | null
          resolved_at?: string | null
          status?: string | null
          support_type?: string | null
          user_id?: string | null
        }
        Update: {
          details?: Json | null
          id?: number
          requested_at?: string | null
          resolved_at?: string | null
          status?: string | null
          support_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      accounts: {
        Row: {
          account_name: string
          account_type: string
          account_uuid: string | null
          balance: number | null
          created_at: string | null
          currency: string
          id: number
          metadata: Json | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          account_name: string
          account_type: string
          account_uuid?: string | null
          balance?: number | null
          created_at?: string | null
          currency?: string
          id?: never
          metadata?: Json | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          account_name?: string
          account_type?: string
          account_uuid?: string | null
          balance?: number | null
          created_at?: string | null
          currency?: string
          id?: never
          metadata?: Json | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      agencies: {
        Row: {
          contact_profile_id: number | null
          created_at: string | null
          id: number
          name: string
          public_record_url: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          contact_profile_id?: number | null
          created_at?: string | null
          id?: never
          name: string
          public_record_url?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          contact_profile_id?: number | null
          created_at?: string | null
          id?: never
          name?: string
          public_record_url?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agencies_contact_profile_id_fkey"
            columns: ["contact_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_runs: {
        Row: {
          agent_name: string
          agent_role: string | null
          duration_ms: number | null
          error_message: string | null
          executed_at: string | null
          id: string
          inputs: Json | null
          next_action: string | null
          next_action_reason: string | null
          outputs: Json | null
          phase_id: string | null
          project_id: string
          sources: string[] | null
          status: string
          tokens_used: number | null
        }
        Insert: {
          agent_name: string
          agent_role?: string | null
          duration_ms?: number | null
          error_message?: string | null
          executed_at?: string | null
          id?: string
          inputs?: Json | null
          next_action?: string | null
          next_action_reason?: string | null
          outputs?: Json | null
          phase_id?: string | null
          project_id: string
          sources?: string[] | null
          status?: string
          tokens_used?: number | null
        }
        Update: {
          agent_name?: string
          agent_role?: string | null
          duration_ms?: number | null
          error_message?: string | null
          executed_at?: string | null
          id?: string
          inputs?: Json | null
          next_action?: string | null
          next_action_reason?: string | null
          outputs?: Json | null
          phase_id?: string | null
          project_id?: string
          sources?: string[] | null
          status?: string
          tokens_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_runs_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "lifecycle_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_runs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "active_projects_dashboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_runs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      agents_registry: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          spec: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          spec?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          spec?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_generation_logs: {
        Row: {
          created_at: string | null
          generation_type: string | null
          id: string
          prompt: string | null
          units_consumed: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          generation_type?: string | null
          id?: string
          prompt?: string | null
          units_consumed?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          generation_type?: string | null
          id?: string
          prompt?: string | null
          units_consumed?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_models: {
        Row: {
          created_at: string | null
          endpoint_url: string
          id: number
          model_name: string
          version: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint_url: string
          id?: never
          model_name: string
          version?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint_url?: string
          id?: never
          model_name?: string
          version?: string | null
        }
        Relationships: []
      }
      ai_processing_allocation: {
        Row: {
          allocation_id: string
          model_type: string | null
          node_ids: string[] | null
          priority_level: number | null
          processing_requirements: Json | null
        }
        Insert: {
          allocation_id: string
          model_type?: string | null
          node_ids?: string[] | null
          priority_level?: number | null
          processing_requirements?: Json | null
        }
        Update: {
          allocation_id?: string
          model_type?: string | null
          node_ids?: string[] | null
          priority_level?: number | null
          processing_requirements?: Json | null
        }
        Relationships: []
      }
      ai_system_routing: {
        Row: {
          context: Json
          created_at: string | null
          id: string
          lifecycle_stage: string
          persona_id: string
          primary_system: string
          processing_time: number | null
          request_type: string
          response_data: Json | null
          success: boolean | null
          user_id: string | null
          workflow_id: string | null
        }
        Insert: {
          context: Json
          created_at?: string | null
          id?: string
          lifecycle_stage: string
          persona_id: string
          primary_system: string
          processing_time?: number | null
          request_type: string
          response_data?: Json | null
          success?: boolean | null
          user_id?: string | null
          workflow_id?: string | null
        }
        Update: {
          context?: Json
          created_at?: string | null
          id?: string
          lifecycle_stage?: string
          persona_id?: string
          primary_system?: string
          processing_time?: number | null
          request_type?: string
          response_data?: Json | null
          success?: boolean | null
          user_id?: string | null
          workflow_id?: string | null
        }
        Relationships: []
      }
      analytics_insights: {
        Row: {
          accessibility_metrics: Json
          community_metrics: Json
          dashboard_config: Json
          engagement_metrics: Json
          generated_at: string | null
          id: string
          insights: Json
          lifecycle_metrics: Json
          lifecycle_stage: string
          persona_id: string
          recommendations: Json
          user_id: string | null
        }
        Insert: {
          accessibility_metrics: Json
          community_metrics: Json
          dashboard_config: Json
          engagement_metrics: Json
          generated_at?: string | null
          id?: string
          insights: Json
          lifecycle_metrics: Json
          lifecycle_stage: string
          persona_id: string
          recommendations: Json
          user_id?: string | null
        }
        Update: {
          accessibility_metrics?: Json
          community_metrics?: Json
          dashboard_config?: Json
          engagement_metrics?: Json
          generated_at?: string | null
          id?: string
          insights?: Json
          lifecycle_metrics?: Json
          lifecycle_stage?: string
          persona_id?: string
          recommendations?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      api_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          name: string
          parent_category_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: never
          is_active?: boolean | null
          name: string
          parent_category_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: never
          is_active?: boolean | null
          name?: string
          parent_category_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_categories_parent_category_id_fkey"
            columns: ["parent_category_id"]
            isOneToOne: false
            referencedRelation: "api_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      api_endpoints: {
        Row: {
          authentication_required: boolean | null
          category_id: number
          contact_email: string | null
          created_at: string | null
          description: string | null
          endpoint_path: string
          http_method: string
          id: number
          is_active: boolean | null
          is_public: boolean | null
          name: string
          rate_limit: Json | null
          request_schema: Json | null
          response_schema: Json | null
          updated_at: string | null
        }
        Insert: {
          authentication_required?: boolean | null
          category_id: number
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          endpoint_path: string
          http_method: string
          id?: never
          is_active?: boolean | null
          is_public?: boolean | null
          name: string
          rate_limit?: Json | null
          request_schema?: Json | null
          response_schema?: Json | null
          updated_at?: string | null
        }
        Update: {
          authentication_required?: boolean | null
          category_id?: number
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          endpoint_path?: string
          http_method?: string
          id?: never
          is_active?: boolean | null
          is_public?: boolean | null
          name?: string
          rate_limit?: Json | null
          request_schema?: Json | null
          response_schema?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_endpoints_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "api_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      api_pathways: {
        Row: {
          application_id: string
          category_id: number | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string | null
          steps: Json | null
          updated_at: string | null
        }
        Insert: {
          application_id: string
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug?: string | null
          steps?: Json | null
          updated_at?: string | null
        }
        Update: {
          application_id?: string
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string | null
          steps?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_pathways_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "api_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          cover_letter: string | null
          created_at: string | null
          id: string
          interview_prep_notes: Json | null
          job_id: string
          resume_version: string | null
          status: string | null
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          interview_prep_notes?: Json | null
          job_id: string
          resume_version?: string | null
          status?: string | null
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          interview_prep_notes?: Json | null
          job_id?: string
          resume_version?: string | null
          status?: string | null
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      approved_service_providers: {
        Row: {
          approved_services: Json
          compliance_rating: number | null
          id: number
          is_active: boolean | null
          npi_number: string | null
          provider_name: string
          provider_type: string
        }
        Insert: {
          approved_services: Json
          compliance_rating?: number | null
          id?: never
          is_active?: boolean | null
          npi_number?: string | null
          provider_name: string
          provider_type: string
        }
        Update: {
          approved_services?: Json
          compliance_rating?: number | null
          id?: never
          is_active?: boolean | null
          npi_number?: string | null
          provider_name?: string
          provider_type?: string
        }
        Relationships: []
      }
      artifacts: {
        Row: {
          agent_run_id: string | null
          artifact_name: string
          artifact_type: string
          checksum: string | null
          content: Json
          created_at: string | null
          expires_at: string | null
          file_size_bytes: number | null
          id: string
          is_latest: boolean | null
          project_id: string
          supersedes: string | null
          version: number
          visibility: string | null
        }
        Insert: {
          agent_run_id?: string | null
          artifact_name: string
          artifact_type: string
          checksum?: string | null
          content: Json
          created_at?: string | null
          expires_at?: string | null
          file_size_bytes?: number | null
          id?: string
          is_latest?: boolean | null
          project_id: string
          supersedes?: string | null
          version?: number
          visibility?: string | null
        }
        Update: {
          agent_run_id?: string | null
          artifact_name?: string
          artifact_type?: string
          checksum?: string | null
          content?: Json
          created_at?: string | null
          expires_at?: string | null
          file_size_bytes?: number | null
          id?: string
          is_latest?: boolean | null
          project_id?: string
          supersedes?: string | null
          version?: number
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artifacts_agent_run_id_fkey"
            columns: ["agent_run_id"]
            isOneToOne: false
            referencedRelation: "agent_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "active_projects_dashboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_supersedes_fkey"
            columns: ["supersedes"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
        ]
      }
      asl_signatures: {
        Row: {
          created_at: string | null
          device_info: Json | null
          environmental_factors: Json | null
          id: string
          keypoints: Json | null
          last_used_at: string | null
          signature_hash: string | null
          signature_type: string | null
          success_rate: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          environmental_factors?: Json | null
          id?: string
          keypoints?: Json | null
          last_used_at?: string | null
          signature_hash?: string | null
          signature_type?: string | null
          success_rate?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          environmental_factors?: Json | null
          id?: string
          keypoints?: Json | null
          last_used_at?: string | null
          signature_hash?: string | null
          signature_type?: string | null
          success_rate?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asl_signatures_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "deaf_users"
            referencedColumns: ["id"]
          },
        ]
      }
      audience_resonance_feedback: {
        Row: {
          content_segment_id: number | null
          created_at: string | null
          cultural_relevance: number | null
          emotional_resonance: number | null
          explanation_clarity: number | null
          id: number
          recommended_improvements: string[] | null
          specific_feedback: string | null
          user_id: string | null
        }
        Insert: {
          content_segment_id?: number | null
          created_at?: string | null
          cultural_relevance?: number | null
          emotional_resonance?: number | null
          explanation_clarity?: number | null
          id?: never
          recommended_improvements?: string[] | null
          specific_feedback?: string | null
          user_id?: string | null
        }
        Update: {
          content_segment_id?: number | null
          created_at?: string | null
          cultural_relevance?: number | null
          emotional_resonance?: number | null
          explanation_clarity?: number | null
          id?: never
          recommended_improvements?: string[] | null
          specific_feedback?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audience_resonance_feedback_content_segment_id_fkey"
            columns: ["content_segment_id"]
            isOneToOne: false
            referencedRelation: "content_segments"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          id: number
          operation: string
          payload: Json | null
          performed_by: string
          row_id: number | null
          table_name: string
          ts: string | null
        }
        Insert: {
          id?: never
          operation: string
          payload?: Json | null
          performed_by: string
          row_id?: number | null
          table_name: string
          ts?: string | null
        }
        Update: {
          id?: never
          operation?: string
          payload?: Json | null
          performed_by?: string
          row_id?: number | null
          table_name?: string
          ts?: string | null
        }
        Relationships: []
      }
      authentication_methods: {
        Row: {
          backup_methods: string[] | null
          created_at: string | null
          emergency_contact: string | null
          id: string
          last_used_at: string | null
          method_status: string | null
          method_type: string | null
          mfa_enabled: boolean | null
          preferred_notification_methods: string[] | null
          user_id: string | null
        }
        Insert: {
          backup_methods?: string[] | null
          created_at?: string | null
          emergency_contact?: string | null
          id?: string
          last_used_at?: string | null
          method_status?: string | null
          method_type?: string | null
          mfa_enabled?: boolean | null
          preferred_notification_methods?: string[] | null
          user_id?: string | null
        }
        Update: {
          backup_methods?: string[] | null
          created_at?: string | null
          emergency_contact?: string | null
          id?: string
          last_used_at?: string | null
          method_status?: string | null
          method_type?: string | null
          mfa_enabled?: boolean | null
          preferred_notification_methods?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "authentication_methods_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "deaf_users"
            referencedColumns: ["id"]
          },
        ]
      }
      authtoken: {
        Row: {
          created_at: string | null
          email: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: never
          name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: never
          name?: string | null
        }
        Relationships: []
      }
      bad_example: {
        Row: {
          small_count: number | null
        }
        Insert: {
          small_count?: number | null
        }
        Update: {
          small_count?: number | null
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          content: string
          created_at: string | null
          id: number
          parent_comment_id: number | null
          post_id: number | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: never
          parent_comment_id?: number | null
          post_id?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: never
          parent_comment_id?: number | null
          post_id?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "blog_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          content: string
          created_at: string | null
          excerpt: string | null
          id: number
          published_at: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: never
          published_at?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: never
          published_at?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      brand_assets: {
        Row: {
          accessibility_statement: string | null
          brand_color_accent: string | null
          brand_color_primary: string | null
          brand_color_secondary: string | null
          brand_name: string
          brand_slug: string
          created_at: string | null
          deaf_community_commitment: string | null
          description: string | null
          favicon_url: string | null
          founding_date: string | null
          id: string
          legal_entity_name: string | null
          logo_dark_url: string | null
          logo_url: string | null
          mission_statement: string | null
          parent_ecosystem: string | null
          platform_links: Json | null
          primary_email: string | null
          registration_number: string | null
          social_handles: Json | null
          status: string | null
          support_email: string | null
          tagline: string | null
          updated_at: string | null
          version: string | null
          website_url: string | null
        }
        Insert: {
          accessibility_statement?: string | null
          brand_color_accent?: string | null
          brand_color_primary?: string | null
          brand_color_secondary?: string | null
          brand_name: string
          brand_slug: string
          created_at?: string | null
          deaf_community_commitment?: string | null
          description?: string | null
          favicon_url?: string | null
          founding_date?: string | null
          id?: string
          legal_entity_name?: string | null
          logo_dark_url?: string | null
          logo_url?: string | null
          mission_statement?: string | null
          parent_ecosystem?: string | null
          platform_links?: Json | null
          primary_email?: string | null
          registration_number?: string | null
          social_handles?: Json | null
          status?: string | null
          support_email?: string | null
          tagline?: string | null
          updated_at?: string | null
          version?: string | null
          website_url?: string | null
        }
        Update: {
          accessibility_statement?: string | null
          brand_color_accent?: string | null
          brand_color_primary?: string | null
          brand_color_secondary?: string | null
          brand_name?: string
          brand_slug?: string
          created_at?: string | null
          deaf_community_commitment?: string | null
          description?: string | null
          favicon_url?: string | null
          founding_date?: string | null
          id?: string
          legal_entity_name?: string | null
          logo_dark_url?: string | null
          logo_url?: string | null
          mission_statement?: string | null
          parent_ecosystem?: string | null
          platform_links?: Json | null
          primary_email?: string | null
          registration_number?: string | null
          social_handles?: Json | null
          status?: string | null
          support_email?: string | null
          tagline?: string | null
          updated_at?: string | null
          version?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      branding_colors: {
        Row: {
          created_at: string
          description: string | null
          hex_value: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          hex_value: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          hex_value?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      brief_usage_tracking: {
        Row: {
          briefs_generated: number | null
          month_year: string | null
          user_id: string | null
        }
        Insert: {
          briefs_generated?: number | null
          month_year?: string | null
          user_id?: string | null
        }
        Update: {
          briefs_generated?: number | null
          month_year?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      business_formations: {
        Row: {
          bank_account_status: string | null
          business_name: string
          compliance_checks: Json | null
          created_at: string | null
          domain_name: string | null
          ein: string | null
          id: string
          idea_id: string | null
          incorporation_status: string | null
          stripe_account_id: string | null
          user_id: string | null
        }
        Insert: {
          bank_account_status?: string | null
          business_name: string
          compliance_checks?: Json | null
          created_at?: string | null
          domain_name?: string | null
          ein?: string | null
          id?: string
          idea_id?: string | null
          incorporation_status?: string | null
          stripe_account_id?: string | null
          user_id?: string | null
        }
        Update: {
          bank_account_status?: string | null
          business_name?: string
          compliance_checks?: Json | null
          created_at?: string | null
          domain_name?: string | null
          ein?: string | null
          id?: string
          idea_id?: string | null
          incorporation_status?: string | null
          stripe_account_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_formations_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          certification_name: string
          certification_url: string | null
          expiration_date: string | null
          id: string
          issue_date: string | null
          issuing_organization: string | null
          user_id: string | null
        }
        Insert: {
          certification_name: string
          certification_url?: string | null
          expiration_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_organization?: string | null
          user_id?: string | null
        }
        Update: {
          certification_name?: string
          certification_url?: string | null
          expiration_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_organization?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      chatgpt_chunks: {
        Row: {
          chunk_index: number
          conversation_id: string
          created_at: string
          embedding: string
          id: string
          text: string
        }
        Insert: {
          chunk_index: number
          conversation_id: string
          created_at?: string
          embedding: string
          id?: string
          text: string
        }
        Update: {
          chunk_index?: number
          conversation_id?: string
          created_at?: string
          embedding?: string
          id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatgpt_chunks_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chatgpt_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      chatgpt_conversations: {
        Row: {
          created_at: string
          id: string
          payload: Json
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          payload: Json
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          payload?: Json
          user_id?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          agency_id: number | null
          assistive_tech_needs: string | null
          communication_notes: string | null
          company_id: number | null
          created_at: string | null
          deaf_related_skills: string[] | null
          id: number
          interpreter_needed: boolean | null
          preferred_communication: string | null
          profile_id: number | null
          status: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          agency_id?: number | null
          assistive_tech_needs?: string | null
          communication_notes?: string | null
          company_id?: number | null
          created_at?: string | null
          deaf_related_skills?: string[] | null
          id?: never
          interpreter_needed?: boolean | null
          preferred_communication?: string | null
          profile_id?: number | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          agency_id?: number | null
          assistive_tech_needs?: string | null
          communication_notes?: string | null
          company_id?: number | null
          created_at?: string | null
          deaf_related_skills?: string[] | null
          id?: never
          interpreter_needed?: boolean | null
          preferred_communication?: string | null
          profile_id?: number | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clients_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clients_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      coaches: {
        Row: {
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      communication_preferences: {
        Row: {
          additional_communication_needs: string | null
          id: string
          needs_asl_interpreter: boolean | null
          needs_captioning: boolean | null
          notify_app: boolean | null
          notify_email: boolean | null
          notify_text: boolean | null
          prefers_email: boolean | null
          prefers_text_chat: boolean | null
          prefers_video_calls: boolean | null
          prefers_video_relay: boolean | null
          primary_language: string
          secondary_language: string | null
          user_id: string | null
        }
        Insert: {
          additional_communication_needs?: string | null
          id?: string
          needs_asl_interpreter?: boolean | null
          needs_captioning?: boolean | null
          notify_app?: boolean | null
          notify_email?: boolean | null
          notify_text?: boolean | null
          prefers_email?: boolean | null
          prefers_text_chat?: boolean | null
          prefers_video_calls?: boolean | null
          prefers_video_relay?: boolean | null
          primary_language: string
          secondary_language?: string | null
          user_id?: string | null
        }
        Update: {
          additional_communication_needs?: string | null
          id?: string
          needs_asl_interpreter?: boolean | null
          needs_captioning?: boolean | null
          notify_app?: boolean | null
          notify_email?: boolean | null
          notify_text?: boolean | null
          prefers_email?: boolean | null
          prefers_text_chat?: boolean | null
          prefers_video_calls?: boolean | null
          prefers_video_relay?: boolean | null
          primary_language?: string
          secondary_language?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      communication_session_logs: {
        Row: {
          communication_modality: string | null
          id: number
          initiator_id: string | null
          recipient_id: string | null
          session_end: string | null
          session_quality: Json | null
          session_start: string | null
        }
        Insert: {
          communication_modality?: string | null
          id?: number
          initiator_id?: string | null
          recipient_id?: string | null
          session_end?: string | null
          session_quality?: Json | null
          session_start?: string | null
        }
        Update: {
          communication_modality?: string | null
          id?: number
          initiator_id?: string | null
          recipient_id?: string | null
          session_end?: string | null
          session_quality?: Json | null
          session_start?: string | null
        }
        Relationships: []
      }
      community_proposals: {
        Row: {
          description: string | null
          id: string
          proposal_type: string | null
          proposed_by: string | null
          status: string | null
          title: string
          total_votes: number | null
          votes_against: number | null
          votes_for: number | null
          voting_end: string | null
          voting_start: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          proposal_type?: string | null
          proposed_by?: string | null
          status?: string | null
          title: string
          total_votes?: number | null
          votes_against?: number | null
          votes_for?: number | null
          voting_end?: string | null
          voting_start?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          proposal_type?: string | null
          proposed_by?: string | null
          status?: string | null
          title?: string
          total_votes?: number | null
          votes_against?: number | null
          votes_for?: number | null
          voting_end?: string | null
          voting_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_proposals_proposed_by_fkey"
            columns: ["proposed_by"]
            isOneToOne: false
            referencedRelation: "ecosystem_users"
            referencedColumns: ["id"]
          },
        ]
      }
      community_validations: {
        Row: {
          confidence_score: number | null
          id: string
          user_id: string | null
          validated_at: string | null
          validation_type: string | null
          validator_profile_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          id?: string
          user_id?: string | null
          validated_at?: string | null
          validation_type?: string | null
          validator_profile_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          id?: string
          user_id?: string | null
          validated_at?: string | null
          validation_type?: string | null
          validator_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_validations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ecosystem_users"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string | null
          id: number
          name: string
          owner_profile_id: number | null
          public_record_url: string | null
          status: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          name: string
          owner_profile_id?: number | null
          public_record_url?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          name?: string
          owner_profile_id?: number | null
          public_record_url?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_owner_profile_id_fkey"
            columns: ["owner_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_scans: {
        Row: {
          auto_fixable: boolean | null
          id: string
          issues_found: Json | null
          next_scan_at: string | null
          passed: boolean
          project_id: string
          recommendations: Json | null
          scan_type: string
          scanned_at: string | null
          score: number | null
          source: string
        }
        Insert: {
          auto_fixable?: boolean | null
          id?: string
          issues_found?: Json | null
          next_scan_at?: string | null
          passed: boolean
          project_id: string
          recommendations?: Json | null
          scan_type: string
          scanned_at?: string | null
          score?: number | null
          source: string
        }
        Update: {
          auto_fixable?: boolean | null
          id?: string
          issues_found?: Json | null
          next_scan_at?: string | null
          passed?: boolean
          project_id?: string
          recommendations?: Json | null
          scan_type?: string
          scanned_at?: string | null
          score?: number | null
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_scans_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "active_projects_dashboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compliance_scans_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      content_creators: {
        Row: {
          audience_resonance_score: number | null
          avatar_preference: string | null
          background_context: Json | null
          communication_styles: string[] | null
          content_guidelines_agreement: boolean | null
          created_at: string | null
          creator_type: string[] | null
          id: number
          last_updated: string | null
          platform_verified: boolean | null
          representation_tags: string[] | null
          total_content_hours: number | null
          user_id: string | null
        }
        Insert: {
          audience_resonance_score?: number | null
          avatar_preference?: string | null
          background_context?: Json | null
          communication_styles?: string[] | null
          content_guidelines_agreement?: boolean | null
          created_at?: string | null
          creator_type?: string[] | null
          id?: never
          last_updated?: string | null
          platform_verified?: boolean | null
          representation_tags?: string[] | null
          total_content_hours?: number | null
          user_id?: string | null
        }
        Update: {
          audience_resonance_score?: number | null
          avatar_preference?: string | null
          background_context?: Json | null
          communication_styles?: string[] | null
          content_guidelines_agreement?: boolean | null
          created_at?: string | null
          creator_type?: string[] | null
          id?: never
          last_updated?: string | null
          platform_verified?: boolean | null
          representation_tags?: string[] | null
          total_content_hours?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      content_localizations: {
        Row: {
          id: string
          language: string | null
          last_updated: string | null
          original_content_id: string | null
          translated_content: string | null
          translation_quality_score: number | null
        }
        Insert: {
          id?: string
          language?: string | null
          last_updated?: string | null
          original_content_id?: string | null
          translated_content?: string | null
          translation_quality_score?: number | null
        }
        Update: {
          id?: string
          language?: string | null
          last_updated?: string | null
          original_content_id?: string | null
          translated_content?: string | null
          translation_quality_score?: number | null
        }
        Relationships: []
      }
      content_segments: {
        Row: {
          content_style: string | null
          contextual_tags: string[] | null
          created_at: string | null
          creator_id: number | null
          id: number
          last_updated: string | null
          pinksync_video_id: string | null
          resonance_score: number | null
          target_age_groups: unknown
          target_deaf_experience_levels: string[] | null
          topic_domains: string[] | null
          video_url: string
          view_count: number | null
        }
        Insert: {
          content_style?: string | null
          contextual_tags?: string[] | null
          created_at?: string | null
          creator_id?: number | null
          id?: never
          last_updated?: string | null
          pinksync_video_id?: string | null
          resonance_score?: number | null
          target_age_groups?: unknown
          target_deaf_experience_levels?: string[] | null
          topic_domains?: string[] | null
          video_url: string
          view_count?: number | null
        }
        Update: {
          content_style?: string | null
          contextual_tags?: string[] | null
          created_at?: string | null
          creator_id?: number | null
          id?: never
          last_updated?: string | null
          pinksync_video_id?: string | null
          resonance_score?: number | null
          target_age_groups?: unknown
          target_deaf_experience_levels?: string[] | null
          topic_domains?: string[] | null
          video_url?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_segments_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "content_creators"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_monetization_profile: {
        Row: {
          accessibility_bonus_multiplier: number | null
          accessibility_points: number | null
          creator_tier: string | null
          id: number
          last_updated: string | null
          total_video_tokens_earned: number | null
          total_videos_created: number | null
          total_views: number | null
          user_id: string | null
          view_token_multiplier: number | null
        }
        Insert: {
          accessibility_bonus_multiplier?: number | null
          accessibility_points?: number | null
          creator_tier?: string | null
          id?: never
          last_updated?: string | null
          total_video_tokens_earned?: number | null
          total_videos_created?: number | null
          total_views?: number | null
          user_id?: string | null
          view_token_multiplier?: number | null
        }
        Update: {
          accessibility_bonus_multiplier?: number | null
          accessibility_points?: number | null
          creator_tier?: string | null
          id?: never
          last_updated?: string | null
          total_video_tokens_earned?: number | null
          total_videos_created?: number | null
          total_views?: number | null
          user_id?: string | null
          view_token_multiplier?: number | null
        }
        Relationships: []
      }
      creators: {
        Row: {
          bio: string | null
          created_at: string | null
          id: number
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          id?: never
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          id?: never
          user_id?: string
        }
        Relationships: []
      }
      dao_proposals: {
        Row: {
          created_at: string | null
          description: string | null
          expires_at: string | null
          id: number
          proposer_id: string
          status: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: never
          proposer_id: string
          status?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: never
          proposer_id?: string
          status?: string | null
          title?: string | null
        }
        Relationships: []
      }
      dao_votes: {
        Row: {
          created_at: string | null
          id: number
          proposal_id: number
          vote: boolean | null
          voter_id: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          proposal_id: number
          vote?: boolean | null
          voter_id: string
        }
        Update: {
          created_at?: string | null
          id?: never
          proposal_id?: number
          vote?: boolean | null
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dao_votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "dao_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      deaf_profiles: {
        Row: {
          assistive_technologies: string[] | null
          communication_preference: string[] | null
          created_at: string | null
          hearing_status: string | null
          id: number
          interpreter_needed: boolean | null
          last_login: string | null
          preferred_communication_method: string | null
          sign_language_proficiency: string | null
          user_id: string | null
        }
        Insert: {
          assistive_technologies?: string[] | null
          communication_preference?: string[] | null
          created_at?: string | null
          hearing_status?: string | null
          id?: never
          interpreter_needed?: boolean | null
          last_login?: string | null
          preferred_communication_method?: string | null
          sign_language_proficiency?: string | null
          user_id?: string | null
        }
        Update: {
          assistive_technologies?: string[] | null
          communication_preference?: string[] | null
          created_at?: string | null
          hearing_status?: string | null
          id?: never
          interpreter_needed?: boolean | null
          last_login?: string | null
          preferred_communication_method?: string | null
          sign_language_proficiency?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      deaf_resources: {
        Row: {
          area_served: string | null
          contact_info: string | null
          cost_details: string | null
          created_at: string | null
          created_by: string | null
          description: string
          id: string
          is_free: boolean | null
          name: string
          notes: string | null
          resource_type: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          area_served?: string | null
          contact_info?: string | null
          cost_details?: string | null
          created_at?: string | null
          created_by?: string | null
          description: string
          id?: string
          is_free?: boolean | null
          name: string
          notes?: string | null
          resource_type: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          area_served?: string | null
          contact_info?: string | null
          cost_details?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string
          id?: string
          is_free?: boolean | null
          name?: string
          notes?: string | null
          resource_type?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deaf_resources_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "coaches"
            referencedColumns: ["id"]
          },
        ]
      }
      deaf_users: {
        Row: {
          accessibility_requirements: Json | null
          assistive_technologies: Json | null
          auth_user_id: string | null
          communication_preference: string[] | null
          created_at: string | null
          deaf_culture_connection: string | null
          first_name: string | null
          hearing_loss_onset: string | null
          hearing_loss_type: string | null
          id: string
          last_name: string | null
          name_sign: string | null
          preferred_name: string | null
          primary_language: string | null
          sign_language_variants: string[] | null
          updated_at: string | null
        }
        Insert: {
          accessibility_requirements?: Json | null
          assistive_technologies?: Json | null
          auth_user_id?: string | null
          communication_preference?: string[] | null
          created_at?: string | null
          deaf_culture_connection?: string | null
          first_name?: string | null
          hearing_loss_onset?: string | null
          hearing_loss_type?: string | null
          id?: string
          last_name?: string | null
          name_sign?: string | null
          preferred_name?: string | null
          primary_language?: string | null
          sign_language_variants?: string[] | null
          updated_at?: string | null
        }
        Update: {
          accessibility_requirements?: Json | null
          assistive_technologies?: Json | null
          auth_user_id?: string | null
          communication_preference?: string[] | null
          created_at?: string | null
          deaf_culture_connection?: string | null
          first_name?: string | null
          hearing_loss_onset?: string | null
          hearing_loss_type?: string | null
          id?: string
          last_name?: string | null
          name_sign?: string | null
          preferred_name?: string | null
          primary_language?: string | null
          sign_language_variants?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      deafauth_user: {
        Row: {
          auth_method: Database["public"]["Enums"]["AuthMethod"]
          created_at: string | null
          deaf_identity: Database["public"]["Enums"]["DeafIdentity"] | null
          email: string
          fibonrose_badge: string | null
          id: string
          pinksync_ready: boolean | null
          roles: string[] | null
          sign_language: string | null
          username: string
        }
        Insert: {
          auth_method: Database["public"]["Enums"]["AuthMethod"]
          created_at?: string | null
          deaf_identity?: Database["public"]["Enums"]["DeafIdentity"] | null
          email: string
          fibonrose_badge?: string | null
          id?: string
          pinksync_ready?: boolean | null
          roles?: string[] | null
          sign_language?: string | null
          username: string
        }
        Update: {
          auth_method?: Database["public"]["Enums"]["AuthMethod"]
          created_at?: string | null
          deaf_identity?: Database["public"]["Enums"]["DeafIdentity"] | null
          email?: string
          fibonrose_badge?: string | null
          id?: string
          pinksync_ready?: boolean | null
          roles?: string[] | null
          sign_language?: string | null
          username?: string
        }
        Relationships: []
      }
      decision_logs: {
        Row: {
          action_taken: string
          agent_run_id: string | null
          condition_met: boolean
          confidence_score: number | null
          decided_at: string | null
          decision_point: string
          evaluation_data: Json | null
          id: string
          next_phase: string | null
          phase_id: string | null
          previous_phase: string | null
          project_id: string
          reasoning: string | null
          trigger_condition: string
        }
        Insert: {
          action_taken: string
          agent_run_id?: string | null
          condition_met: boolean
          confidence_score?: number | null
          decided_at?: string | null
          decision_point: string
          evaluation_data?: Json | null
          id?: string
          next_phase?: string | null
          phase_id?: string | null
          previous_phase?: string | null
          project_id: string
          reasoning?: string | null
          trigger_condition: string
        }
        Update: {
          action_taken?: string
          agent_run_id?: string | null
          condition_met?: boolean
          confidence_score?: number | null
          decided_at?: string | null
          decision_point?: string
          evaluation_data?: Json | null
          id?: string
          next_phase?: string | null
          phase_id?: string | null
          previous_phase?: string | null
          project_id?: string
          reasoning?: string | null
          trigger_condition?: string
        }
        Relationships: [
          {
            foreignKeyName: "decision_logs_agent_run_id_fkey"
            columns: ["agent_run_id"]
            isOneToOne: false
            referencedRelation: "agent_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_logs_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "lifecycle_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_logs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "active_projects_dashboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_logs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      dee_platform_tracking: {
        Row: {
          id: number
          last_activity: string | null
          platform_name: string
          platform_tier: string | null
          total_videos: number | null
          total_views: number | null
          unique_viewers: number | null
        }
        Insert: {
          id?: never
          last_activity?: string | null
          platform_name: string
          platform_tier?: string | null
          total_videos?: number | null
          total_views?: number | null
          unique_viewers?: number | null
        }
        Update: {
          id?: never
          last_activity?: string | null
          platform_name?: string
          platform_tier?: string | null
          total_videos?: number | null
          total_views?: number | null
          unique_viewers?: number | null
        }
        Relationships: []
      }
      development_projects: {
        Row: {
          accessibility_level: string
          accessibility_score: number | null
          architecture: Json
          compliance_checks: Json | null
          created_at: string | null
          id: string
          persona_id: string
          project_type: string
          requirements: Json
          scaffolding: Json | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          accessibility_level: string
          accessibility_score?: number | null
          architecture: Json
          compliance_checks?: Json | null
          created_at?: string | null
          id?: string
          persona_id: string
          project_type: string
          requirements: Json
          scaffolding?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          accessibility_level?: string
          accessibility_score?: number | null
          architecture?: Json
          compliance_checks?: Json | null
          created_at?: string | null
          id?: string
          persona_id?: string
          project_type?: string
          requirements?: Json
          scaffolding?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      devices: {
        Row: {
          created_at: string | null
          device_id: string
          device_name: string | null
          device_type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          device_id: string
          device_name?: string | null
          device_type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          device_id?: string
          device_name?: string | null
          device_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      directory: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          location: string | null
          name: string
          website: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          name: string
          website?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          name?: string
          website?: string | null
        }
        Relationships: []
      }
      directory_entries: {
        Row: {
          category: string | null
          description: string | null
          id: string
          is_fibonrose_partner: boolean | null
          location: string | null
          name: string
          services: string[] | null
          website: string | null
        }
        Insert: {
          category?: string | null
          description?: string | null
          id?: string
          is_fibonrose_partner?: boolean | null
          location?: string | null
          name: string
          services?: string[] | null
          website?: string | null
        }
        Update: {
          category?: string | null
          description?: string | null
          id?: string
          is_fibonrose_partner?: boolean | null
          location?: string | null
          name?: string
          services?: string[] | null
          website?: string | null
        }
        Relationships: []
      }
      domains: {
        Row: {
          click_tracking: boolean | null
          created_at: string | null
          domain_id: string
          id: number
          name: string
          open_tracking: boolean | null
          status: string | null
          updated_at: string | null
          verified_at: string | null
        }
        Insert: {
          click_tracking?: boolean | null
          created_at?: string | null
          domain_id: string
          id?: never
          name: string
          open_tracking?: boolean | null
          status?: string | null
          updated_at?: string | null
          verified_at?: string | null
        }
        Update: {
          click_tracking?: boolean | null
          created_at?: string | null
          domain_id?: string
          id?: never
          name?: string
          open_tracking?: boolean | null
          status?: string | null
          updated_at?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      earning_events: {
        Row: {
          amount: number
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: number
          profile_id: number
          service_id: number | null
          status: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: never
          profile_id: number
          service_id?: number | null
          status?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: never
          profile_id?: number
          service_id?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "earning_events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "earning_events_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      ecosystem_users: {
        Row: {
          accessibility_preferences: Json | null
          community_trust_score: number | null
          created_at: string | null
          deaf_auth_id: string
          id: string
          last_authenticated: string | null
          primary_sign_language: string | null
          verification_level: string | null
        }
        Insert: {
          accessibility_preferences?: Json | null
          community_trust_score?: number | null
          created_at?: string | null
          deaf_auth_id: string
          id?: string
          last_authenticated?: string | null
          primary_sign_language?: string | null
          verification_level?: string | null
        }
        Update: {
          accessibility_preferences?: Json | null
          community_trust_score?: number | null
          created_at?: string | null
          deaf_auth_id?: string
          id?: string
          last_authenticated?: string | null
          primary_sign_language?: string | null
          verification_level?: string | null
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          details: Json | null
          id: number
          status: string | null
          subject: string | null
          timestamp: string | null
          to: string
        }
        Insert: {
          details?: Json | null
          id?: never
          status?: string | null
          subject?: string | null
          timestamp?: string | null
          to: string
        }
        Update: {
          details?: Json | null
          id?: never
          status?: string | null
          subject?: string | null
          timestamp?: string | null
          to?: string
        }
        Relationships: []
      }
      email_queue: {
        Row: {
          body: string | null
          created_at: string | null
          domain: string | null
          id: number
          next_retry_at: string | null
          retry_count: number | null
          subject: string | null
          to: string
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          domain?: string | null
          id?: never
          next_retry_at?: string | null
          retry_count?: number | null
          subject?: string | null
          to: string
        }
        Update: {
          body?: string | null
          created_at?: string | null
          domain?: string | null
          id?: never
          next_retry_at?: string | null
          retry_count?: number | null
          subject?: string | null
          to?: string
        }
        Relationships: []
      }
      email_video_logs: {
        Row: {
          browser: string | null
          device_type: string | null
          email_template: string | null
          file_size_bytes: number | null
          id: number
          ip_country: string | null
          ip_region: string | null
          language: string
          metadata_id: number | null
          organization_id: string | null
          platform_id: string | null
          thumbnail_url: string | null
          total_watch_time: unknown
          tracking_id: string
          tracking_platform: string | null
          tracking_source: string | null
          tracking_version: string | null
          user_email: string | null
          user_id: string | null
          user_role: string | null
          video_key: string | null
          video_type: string
          video_url: string | null
          view_count: number | null
          viewed_at: string | null
        }
        Insert: {
          browser?: string | null
          device_type?: string | null
          email_template?: string | null
          file_size_bytes?: number | null
          id?: never
          ip_country?: string | null
          ip_region?: string | null
          language: string
          metadata_id?: number | null
          organization_id?: string | null
          platform_id?: string | null
          thumbnail_url?: string | null
          total_watch_time?: unknown
          tracking_id: string
          tracking_platform?: string | null
          tracking_source?: string | null
          tracking_version?: string | null
          user_email?: string | null
          user_id?: string | null
          user_role?: string | null
          video_key?: string | null
          video_type: string
          video_url?: string | null
          view_count?: number | null
          viewed_at?: string | null
        }
        Update: {
          browser?: string | null
          device_type?: string | null
          email_template?: string | null
          file_size_bytes?: number | null
          id?: never
          ip_country?: string | null
          ip_region?: string | null
          language?: string
          metadata_id?: number | null
          organization_id?: string | null
          platform_id?: string | null
          thumbnail_url?: string | null
          total_watch_time?: unknown
          tracking_id?: string
          tracking_platform?: string | null
          tracking_source?: string | null
          tracking_version?: string | null
          user_email?: string | null
          user_id?: string | null
          user_role?: string | null
          video_key?: string | null
          video_type?: string
          video_url?: string | null
          view_count?: number | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_video_logs_metadata_id_fkey"
            columns: ["metadata_id"]
            isOneToOne: false
            referencedRelation: "video_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_video_logs_video_key_fkey"
            columns: ["video_key"]
            isOneToOne: false
            referencedRelation: "video_metadata"
            referencedColumns: ["video_key"]
          },
        ]
      }
      employer_partners: {
        Row: {
          accommodation_details: string | null
          company_name: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          created_by: string | null
          deaf_employees_count: number | null
          deaf_friendly_rating: number | null
          has_interpreter_services: boolean | null
          id: string
          industry: string
          location: string | null
          notes: string | null
          primary_contact: string | null
          updated_at: string | null
        }
        Insert: {
          accommodation_details?: string | null
          company_name: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          created_by?: string | null
          deaf_employees_count?: number | null
          deaf_friendly_rating?: number | null
          has_interpreter_services?: boolean | null
          id?: string
          industry: string
          location?: string | null
          notes?: string | null
          primary_contact?: string | null
          updated_at?: string | null
        }
        Update: {
          accommodation_details?: string | null
          company_name?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          created_by?: string | null
          deaf_employees_count?: number | null
          deaf_friendly_rating?: number | null
          has_interpreter_services?: boolean | null
          id?: string
          industry?: string
          location?: string | null
          notes?: string | null
          primary_contact?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_partners_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "coaches"
            referencedColumns: ["id"]
          },
        ]
      }
      error_logs: {
        Row: {
          created_at: string | null
          error_details: Json | null
          error_message: string | null
          error_type: string
          id: number
          resolved: boolean | null
        }
        Insert: {
          created_at?: string | null
          error_details?: Json | null
          error_message?: string | null
          error_type: string
          id?: never
          resolved?: boolean | null
        }
        Update: {
          created_at?: string | null
          error_details?: Json | null
          error_message?: string | null
          error_type?: string
          id?: never
          resolved?: boolean | null
        }
        Relationships: []
      }
      evolution_requirements: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string
          from_persona: string
          id: string
          requirement_type: string
          threshold_value: number
          to_persona: string
          weight: number | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description: string
          from_persona: string
          id?: string
          requirement_type: string
          threshold_value: number
          to_persona: string
          weight?: number | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: string
          from_persona?: string
          id?: string
          requirement_type?: string
          threshold_value?: number
          to_persona?: string
          weight?: number | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          comment: string | null
          created_at: string | null
          id: number
          proposal_id: number
          rating: number | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: never
          proposal_id: number
          rating?: number | null
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: never
          proposal_id?: number
          rating?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      fibonrose_verification_types: {
        Row: {
          category: string | null
          description: string | null
          id: number
          minimum_holder_tier: string | null
          name: string
          required_nfts: string[] | null
          trust_weight: number | null
        }
        Insert: {
          category?: string | null
          description?: string | null
          id?: number
          minimum_holder_tier?: string | null
          name: string
          required_nfts?: string[] | null
          trust_weight?: number | null
        }
        Update: {
          category?: string | null
          description?: string | null
          id?: number
          minimum_holder_tier?: string | null
          name?: string
          required_nfts?: string[] | null
          trust_weight?: number | null
        }
        Relationships: []
      }
      fibonrose_verifications: {
        Row: {
          blockchain_proof: string | null
          created_at: string | null
          id: number
          metadata: Json | null
          nft_contracts: string[] | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          verification_type_id: number | null
        }
        Insert: {
          blockchain_proof?: string | null
          created_at?: string | null
          id?: number
          metadata?: Json | null
          nft_contracts?: string[] | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_type_id?: number | null
        }
        Update: {
          blockchain_proof?: string | null
          created_at?: string | null
          id?: number
          metadata?: Json | null
          nft_contracts?: string[] | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_type_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fibonrose_verifications_verification_type_id_fkey"
            columns: ["verification_type_id"]
            isOneToOne: false
            referencedRelation: "fibonrose_verification_types"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          accessibility_tags: string[] | null
          caption: string | null
          created_at: string
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string | null
          id: number
          is_sign_language: boolean | null
          language: string | null
          transcript: string | null
          user_id: string
        }
        Insert: {
          accessibility_tags?: string[] | null
          caption?: string | null
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: never
          is_sign_language?: boolean | null
          language?: string | null
          transcript?: string | null
          user_id: string
        }
        Update: {
          accessibility_tags?: string[] | null
          caption?: string | null
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: never
          is_sign_language?: boolean | null
          language?: string | null
          transcript?: string | null
          user_id?: string
        }
        Relationships: []
      }
      formation_logs: {
        Row: {
          created_at: string | null
          external_reference: Json | null
          formation_id: string | null
          id: string
          stage: string
          status: string
        }
        Insert: {
          created_at?: string | null
          external_reference?: Json | null
          formation_id?: string | null
          id?: string
          stage: string
          status: string
        }
        Update: {
          created_at?: string | null
          external_reference?: Json | null
          formation_id?: string | null
          id?: string
          stage?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "formation_logs_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "business_formations"
            referencedColumns: ["id"]
          },
        ]
      }
      generation_units: {
        Row: {
          consumed_units: number | null
          id: string
          last_reset: string | null
          plan_tier: string | null
          total_units: number | null
          user_id: string | null
        }
        Insert: {
          consumed_units?: number | null
          id?: string
          last_reset?: string | null
          plan_tier?: string | null
          total_units?: number | null
          user_id?: string | null
        }
        Update: {
          consumed_units?: number | null
          id?: string
          last_reset?: string | null
          plan_tier?: string | null
          total_units?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      good_example: {
        Row: {
          big_count: number | null
          small_count: number | null
        }
        Insert: {
          big_count?: number | null
          small_count?: number | null
        }
        Update: {
          big_count?: number | null
          small_count?: number | null
        }
        Relationships: []
      }
      gu_claims: {
        Row: {
          claimed_at: string | null
          gu_amount: number
          id: number
          reason: string | null
          user_id: string
        }
        Insert: {
          claimed_at?: string | null
          gu_amount: number
          id?: never
          reason?: string | null
          user_id: string
        }
        Update: {
          claimed_at?: string | null
          gu_amount?: number
          id?: never
          reason?: string | null
          user_id?: string
        }
        Relationships: []
      }
      gu_donations: {
        Row: {
          donated_at: string | null
          gu_amount: number
          id: number
          message: string | null
          user_id: string
        }
        Insert: {
          donated_at?: string | null
          gu_amount: number
          id?: never
          message?: string | null
          user_id: string
        }
        Update: {
          donated_at?: string | null
          gu_amount?: number
          id?: never
          message?: string | null
          user_id?: string
        }
        Relationships: []
      }
      gu_pool: {
        Row: {
          id: number
          total_gu: number
          updated_at: string | null
        }
        Insert: {
          id?: never
          total_gu?: number
          updated_at?: string | null
        }
        Update: {
          id?: never
          total_gu?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      ideas: {
        Row: {
          created_at: string | null
          description: Json | null
          id: string
          status: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: Json | null
          id?: string
          status?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: Json | null
          id?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      iep_service_mappings: {
        Row: {
          allowed_service_types: Json
          compliance_rules: Json | null
          id: number
          iep_reference_number: string
          max_spending_limits: Json
          required_documentation: Json | null
        }
        Insert: {
          allowed_service_types: Json
          compliance_rules?: Json | null
          id?: never
          iep_reference_number: string
          max_spending_limits: Json
          required_documentation?: Json | null
        }
        Update: {
          allowed_service_types?: Json
          compliance_rules?: Json | null
          id?: never
          iep_reference_number?: string
          max_spending_limits?: Json
          required_documentation?: Json | null
        }
        Relationships: []
      }
      insights: {
        Row: {
          complexity: number | null
          confidence_score: number | null
          created_at: string
          embedding: string | null
          id: string
          is_featured: boolean | null
          recommendation: string
          summary: string
          title: string
          topic: string
          trend: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          complexity?: number | null
          confidence_score?: number | null
          created_at?: string
          embedding?: string | null
          id?: string
          is_featured?: boolean | null
          recommendation: string
          summary: string
          title: string
          topic: string
          trend: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          complexity?: number | null
          confidence_score?: number | null
          created_at?: string
          embedding?: string | null
          id?: string
          is_featured?: boolean | null
          recommendation?: string
          summary?: string
          title?: string
          topic?: string
          trend?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      interpreter_requests: {
        Row: {
          id: number
          notes: string | null
          requested_at: string | null
          scheduled_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          id?: never
          notes?: string | null
          requested_at?: string | null
          scheduled_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          id?: never
          notes?: string | null
          requested_at?: string | null
          scheduled_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      investments: {
        Row: {
          company_name: string
          current_valuation: number | null
          exit_date: string | null
          id: number
          initial_amount: number
          investment_date: string | null
          investment_type: string
          investment_uuid: string | null
          ownership_percentage: number | null
          status: string | null
        }
        Insert: {
          company_name: string
          current_valuation?: number | null
          exit_date?: string | null
          id?: never
          initial_amount: number
          investment_date?: string | null
          investment_type: string
          investment_uuid?: string | null
          ownership_percentage?: number | null
          status?: string | null
        }
        Update: {
          company_name?: string
          current_valuation?: number | null
          exit_date?: string | null
          id?: never
          initial_amount?: number
          investment_date?: string | null
          investment_type?: string
          investment_uuid?: string | null
          ownership_percentage?: number | null
          status?: string | null
        }
        Relationships: []
      }
      irs_501c_types: {
        Row: {
          code: string
          description: string
        }
        Insert: {
          code: string
          description: string
        }
        Update: {
          code?: string
          description?: string
        }
        Relationships: []
      }
      job_listings: {
        Row: {
          captioning_available: boolean | null
          communication_accessibility_details: Json | null
          deaf_friendliness_score: number | null
          description: string
          employer_id: string | null
          expiration_date: string | null
          id: string
          interpreter_provided: boolean | null
          location: string | null
          posted_date: string | null
          remote_work_options: string[] | null
          salary_range: unknown
          sign_language_support: boolean | null
          title: string
        }
        Insert: {
          captioning_available?: boolean | null
          communication_accessibility_details?: Json | null
          deaf_friendliness_score?: number | null
          description: string
          employer_id?: string | null
          expiration_date?: string | null
          id?: string
          interpreter_provided?: boolean | null
          location?: string | null
          posted_date?: string | null
          remote_work_options?: string[] | null
          salary_range?: unknown
          sign_language_support?: boolean | null
          title: string
        }
        Update: {
          captioning_available?: boolean | null
          communication_accessibility_details?: Json | null
          deaf_friendliness_score?: number | null
          description?: string
          employer_id?: string | null
          expiration_date?: string | null
          id?: string
          interpreter_provided?: boolean | null
          location?: string | null
          posted_date?: string | null
          remote_work_options?: string[] | null
          salary_range?: unknown
          sign_language_support?: boolean | null
          title?: string
        }
        Relationships: []
      }
      job_matches: {
        Row: {
          compliance_score: number | null
          cosine_score: number | null
          created_at: string | null
          id: string
          job_id: string
          status: string | null
          user_id: string
        }
        Insert: {
          compliance_score?: number | null
          cosine_score?: number | null
          created_at?: string | null
          id?: string
          job_id: string
          status?: string | null
          user_id: string
        }
        Update: {
          compliance_score?: number | null
          cosine_score?: number | null
          created_at?: string | null
          id?: string
          job_id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_matches_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_matching_intelligence: {
        Row: {
          compatibility_matrix: Json | null
          id: string
          job_listing_id: string | null
          match_reasoning: Json | null
          matching_timestamp: string | null
          profile_id: string | null
          recommended_skill_bridges: string[] | null
        }
        Insert: {
          compatibility_matrix?: Json | null
          id?: string
          job_listing_id?: string | null
          match_reasoning?: Json | null
          matching_timestamp?: string | null
          profile_id?: string | null
          recommended_skill_bridges?: string[] | null
        }
        Update: {
          compatibility_matrix?: Json | null
          id?: string
          job_listing_id?: string | null
          match_reasoning?: Json | null
          matching_timestamp?: string | null
          profile_id?: string | null
          recommended_skill_bridges?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "job_matching_intelligence_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "vr4deaf_professional_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_matching_scores: {
        Row: {
          compatibility_score: number | null
          job_listing_id: string | null
          last_evaluated: string | null
          match_reasons: Json | null
          profile_id: string | null
        }
        Insert: {
          compatibility_score?: number | null
          job_listing_id?: string | null
          last_evaluated?: string | null
          match_reasons?: Json | null
          profile_id?: string | null
        }
        Update: {
          compatibility_score?: number | null
          job_listing_id?: string | null
          last_evaluated?: string | null
          match_reasons?: Json | null
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_matching_scores_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "vr4deaf_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_profiles: {
        Row: {
          created_at: string | null
          experience_level: string | null
          id: string
          industries: string[] | null
          location: string | null
          portfolio_url: string | null
          preferred_roles: string[] | null
          resume_url: string | null
          skills: string[] | null
          updated_at: string | null
          user_id: string
          work_authorization: string | null
        }
        Insert: {
          created_at?: string | null
          experience_level?: string | null
          id?: string
          industries?: string[] | null
          location?: string | null
          portfolio_url?: string | null
          preferred_roles?: string[] | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
          user_id: string
          work_authorization?: string | null
        }
        Update: {
          created_at?: string | null
          experience_level?: string | null
          id?: string
          industries?: string[] | null
          location?: string | null
          portfolio_url?: string | null
          preferred_roles?: string[] | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
          user_id?: string
          work_authorization?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          accommodation_details: string | null
          asl_environment: boolean | null
          company_name: string
          contact_info: string | null
          created_at: string | null
          created_by: string | null
          description: string
          expiration_date: string | null
          id: string
          is_deaf_friendly: boolean | null
          is_partner_employer: boolean | null
          is_remote: boolean | null
          location: string
          posting_date: string
          posting_url: string | null
          requirements: string | null
          salary_range: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          accommodation_details?: string | null
          asl_environment?: boolean | null
          company_name: string
          contact_info?: string | null
          created_at?: string | null
          created_by?: string | null
          description: string
          expiration_date?: string | null
          id?: string
          is_deaf_friendly?: boolean | null
          is_partner_employer?: boolean | null
          is_remote?: boolean | null
          location: string
          posting_date?: string
          posting_url?: string | null
          requirements?: string | null
          salary_range?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          accommodation_details?: string | null
          asl_environment?: boolean | null
          company_name?: string
          contact_info?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string
          expiration_date?: string | null
          id?: string
          is_deaf_friendly?: boolean | null
          is_partner_employer?: boolean | null
          is_remote?: boolean | null
          location?: string
          posting_date?: string
          posting_url?: string | null
          requirements?: string | null
          salary_range?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "coaches"
            referencedColumns: ["id"]
          },
        ]
      }
      lifecycle_personas: {
        Row: {
          active: boolean | null
          created_at: string | null
          evolution_progress: number | null
          evolution_requirements: Json | null
          evolved_at: string | null
          evolved_from: string | null
          id: string
          persona_id: string
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          evolution_progress?: number | null
          evolution_requirements?: Json | null
          evolved_at?: string | null
          evolved_from?: string | null
          id?: string
          persona_id: string
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          evolution_progress?: number | null
          evolution_requirements?: Json | null
          evolved_at?: string | null
          evolved_from?: string | null
          id?: string
          persona_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      lifecycle_phases: {
        Row: {
          agents_executed: string[] | null
          blocked_reason: string | null
          entered_at: string | null
          exited_at: string | null
          id: string
          phase_name: string
          project_id: string
          status: string | null
          total_agent_runs: number | null
          trigger_details: Json | null
          triggered_by: string | null
        }
        Insert: {
          agents_executed?: string[] | null
          blocked_reason?: string | null
          entered_at?: string | null
          exited_at?: string | null
          id?: string
          phase_name: string
          project_id: string
          status?: string | null
          total_agent_runs?: number | null
          trigger_details?: Json | null
          triggered_by?: string | null
        }
        Update: {
          agents_executed?: string[] | null
          blocked_reason?: string | null
          entered_at?: string | null
          exited_at?: string | null
          id?: string
          phase_name?: string
          project_id?: string
          status?: string | null
          total_agent_runs?: number | null
          trigger_details?: Json | null
          triggered_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lifecycle_phases_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "active_projects_dashboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lifecycle_phases_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_agent_metrics: {
        Row: {
          agent_id: number | null
          id: number
          metric_key: string
          metric_value: number | null
          recorded_at: string | null
        }
        Insert: {
          agent_id?: number | null
          id?: never
          metric_key: string
          metric_value?: number | null
          recorded_at?: string | null
        }
        Update: {
          agent_id?: number | null
          id?: never
          metric_key?: string
          metric_value?: number | null
          recorded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "magician_agent_metrics_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "magicians_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_agent_runs: {
        Row: {
          agent_id: number
          created_at: string | null
          finished_at: string | null
          id: number
          input: Json | null
          logs: Json | null
          output: Json | null
          run_type: string
          started_at: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          agent_id: number
          created_at?: string | null
          finished_at?: string | null
          id?: never
          input?: Json | null
          logs?: Json | null
          output?: Json | null
          run_type: string
          started_at?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          agent_id?: number
          created_at?: string | null
          finished_at?: string | null
          id?: never
          input?: Json | null
          logs?: Json | null
          output?: Json | null
          run_type?: string
          started_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "magician_agent_runs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "magicians_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_agent_steps: {
        Row: {
          action: string | null
          created_at: string | null
          detail: Json | null
          id: number
          name: string | null
          run_id: number
          step_index: number
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          detail?: Json | null
          id?: never
          name?: string | null
          run_id: number
          step_index: number
        }
        Update: {
          action?: string | null
          created_at?: string | null
          detail?: Json | null
          id?: never
          name?: string | null
          run_id?: number
          step_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "magician_agent_steps_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "magician_agent_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_agent_tool_calls: {
        Row: {
          created_at: string | null
          duration_ms: number | null
          id: number
          request: Json | null
          response: Json | null
          run_id: number
          tool_name: string
        }
        Insert: {
          created_at?: string | null
          duration_ms?: number | null
          id?: never
          request?: Json | null
          response?: Json | null
          run_id: number
          tool_name: string
        }
        Update: {
          created_at?: string | null
          duration_ms?: number | null
          id?: never
          request?: Json | null
          response?: Json | null
          run_id?: number
          tool_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "magician_agent_tool_calls_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "magician_agent_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_agent_user: {
        Row: {
          agent_id: number
          created_at: string | null
          credentials: Json | null
          id: number
          role: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agent_id: number
          created_at?: string | null
          credentials?: Json | null
          id?: never
          role?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agent_id?: number
          created_at?: string | null
          credentials?: Json | null
          id?: never
          role?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "magician_agent_user_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "magicians_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_ai_feedback: {
        Row: {
          comments: string | null
          created_at: string | null
          id: number
          metadata: Json | null
          output_id: number | null
          rating: number | null
          run_id: number | null
          user_id: string
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          id?: never
          metadata?: Json | null
          output_id?: number | null
          rating?: number | null
          run_id?: number | null
          user_id: string
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          id?: never
          metadata?: Json | null
          output_id?: number | null
          rating?: number | null
          run_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "magician_ai_feedback_output_id_fkey"
            columns: ["output_id"]
            isOneToOne: false
            referencedRelation: "magician_ai_outputs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "magician_ai_feedback_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "magician_agent_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_ai_outputs: {
        Row: {
          created_at: string | null
          id: number
          metadata: Json | null
          produced_by_run: number | null
          project_id: number
          storage_ref: string | null
          tenant_id: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          metadata?: Json | null
          produced_by_run?: number | null
          project_id: number
          storage_ref?: string | null
          tenant_id: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          metadata?: Json | null
          produced_by_run?: number | null
          project_id?: number
          storage_ref?: string | null
          tenant_id?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "magician_ai_outputs_produced_by_run_fkey"
            columns: ["produced_by_run"]
            isOneToOne: false
            referencedRelation: "magician_agent_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "magician_ai_outputs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "magician_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_ai_queue: {
        Row: {
          agent_id: number | null
          created_at: string | null
          id: number
          payload: Json | null
          priority: number | null
          scheduled_at: string | null
          status: string | null
        }
        Insert: {
          agent_id?: number | null
          created_at?: string | null
          id?: never
          payload?: Json | null
          priority?: number | null
          scheduled_at?: string | null
          status?: string | null
        }
        Update: {
          agent_id?: number | null
          created_at?: string | null
          id?: never
          payload?: Json | null
          priority?: number | null
          scheduled_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "magician_ai_queue_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "magicians_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_escalations: {
        Row: {
          agent_run_id: string | null
          assigned_at: string | null
          assigned_to: string | null
          context: Json | null
          created_at: string | null
          id: string
          project_id: string
          reason: string
          resolution: Json | null
          resolution_notes: string | null
          resolved_at: string | null
          status: string | null
          urgency: string
        }
        Insert: {
          agent_run_id?: string | null
          assigned_at?: string | null
          assigned_to?: string | null
          context?: Json | null
          created_at?: string | null
          id?: string
          project_id: string
          reason: string
          resolution?: Json | null
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: string | null
          urgency?: string
        }
        Update: {
          agent_run_id?: string | null
          assigned_at?: string | null
          assigned_to?: string | null
          context?: Json | null
          created_at?: string | null
          id?: string
          project_id?: string
          reason?: string
          resolution?: Json | null
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: string | null
          urgency?: string
        }
        Relationships: [
          {
            foreignKeyName: "magician_escalations_agent_run_id_fkey"
            columns: ["agent_run_id"]
            isOneToOne: false
            referencedRelation: "agent_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "magician_escalations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "active_projects_dashboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "magician_escalations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_idea_submissions: {
        Row: {
          created_at: string | null
          id: number
          idea: Json | null
          metadata: Json | null
          project_id: number
          status: string | null
          tenant_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          idea?: Json | null
          metadata?: Json | null
          project_id: number
          status?: string | null
          tenant_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          idea?: Json | null
          metadata?: Json | null
          project_id?: number
          status?: string | null
          tenant_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "magician_idea_submissions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "magician_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_media_tasks: {
        Row: {
          created_at: string | null
          created_by: string | null
          finished_at: string | null
          id: number
          project_id: number
          result: Json | null
          source: Json | null
          started_at: string | null
          status: string | null
          task_type: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          finished_at?: string | null
          id?: never
          project_id: number
          result?: Json | null
          source?: Json | null
          started_at?: string | null
          status?: string | null
          task_type: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          finished_at?: string | null
          id?: never
          project_id?: number
          result?: Json | null
          source?: Json | null
          started_at?: string | null
          status?: string | null
          task_type?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "magician_media_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "magician_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_outputs: {
        Row: {
          conversation_id: string | null
          created_at: string
          data: Json
          id: string
          type: string
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          data: Json
          id?: string
          type: string
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          data?: Json
          id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "magician_outputs_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chatgpt_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_project_analytics: {
        Row: {
          id: number
          payload: Json | null
          project_id: number
          recorded_at: string | null
          tenant_id: string
        }
        Insert: {
          id?: never
          payload?: Json | null
          project_id: number
          recorded_at?: string | null
          tenant_id: string
        }
        Update: {
          id?: never
          payload?: Json | null
          project_id?: number
          recorded_at?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "magician_project_analytics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "magician_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_project_tasks: {
        Row: {
          assignee: string | null
          created_at: string | null
          description: string | null
          due_at: string | null
          id: number
          payload: Json | null
          project_id: number
          status: string | null
          tenant_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          assignee?: string | null
          created_at?: string | null
          description?: string | null
          due_at?: string | null
          id?: never
          payload?: Json | null
          project_id: number
          status?: string | null
          tenant_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          assignee?: string | null
          created_at?: string | null
          description?: string | null
          due_at?: string | null
          id?: never
          payload?: Json | null
          project_id?: number
          status?: string | null
          tenant_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "magician_project_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "magician_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_projects: {
        Row: {
          config: Json | null
          created_at: string | null
          created_by: string | null
          id: number
          metadata: Json | null
          name: string
          subdomain: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: never
          metadata?: Json | null
          name: string
          subdomain?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: never
          metadata?: Json | null
          name?: string
          subdomain?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      magician_user_preferences: {
        Row: {
          created_at: string | null
          id: number
          preferences: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          preferences?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: never
          preferences?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      magician_workflow_logs: {
        Row: {
          created_at: string | null
          event_type: string
          id: number
          payload: Json | null
          project_id: number
          tenant_id: string
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: never
          payload?: Json | null
          project_id: number
          tenant_id: string
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: never
          payload?: Json | null
          project_id?: number
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "magician_workflow_logs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "magician_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      magician_workflow_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: number
          name: string
          template: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: never
          name: string
          template?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: never
          name?: string
          template?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      magicians_360: {
        Row: {
          delivered_at: string | null
          id: number
          proposal_id: number
        }
        Insert: {
          delivered_at?: string | null
          id?: never
          proposal_id: number
        }
        Update: {
          delivered_at?: string | null
          id?: never
          proposal_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "magicians_360_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      magicians_agents: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          metadata: Json | null
          name: string
          spec: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: never
          metadata?: Json | null
          name: string
          spec?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: never
          metadata?: Json | null
          name?: string
          spec?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      magicians_emails: {
        Row: {
          from: string
          html: string | null
          id: number
          processed: boolean | null
          subject: string | null
          text: string | null
          timestamp: string | null
          to: string
        }
        Insert: {
          from: string
          html?: string | null
          id?: never
          processed?: boolean | null
          subject?: string | null
          text?: string | null
          timestamp?: string | null
          to: string
        }
        Update: {
          from?: string
          html?: string | null
          id?: never
          processed?: boolean | null
          subject?: string | null
          text?: string | null
          timestamp?: string | null
          to?: string
        }
        Relationships: []
      }
      market_data: {
        Row: {
          career_path: string
          fetched_at: string | null
          id: number
          in_demand_skills: string[] | null
          salary_range: string | null
          source: string | null
          user_id: string
        }
        Insert: {
          career_path: string
          fetched_at?: string | null
          id?: never
          in_demand_skills?: string[] | null
          salary_range?: string | null
          source?: string | null
          user_id: string
        }
        Update: {
          career_path?: string
          fetched_at?: string | null
          id?: never
          in_demand_skills?: string[] | null
          salary_range?: string | null
          source?: string | null
          user_id?: string
        }
        Relationships: []
      }
      mergers_acquisitions: {
        Row: {
          acquiring_company: string
          announcement_date: string | null
          deal_structure: Json | null
          deal_type: string
          deal_uuid: string | null
          expected_close_date: string | null
          id: number
          status: string | null
          target_company: string
          total_deal_value: number
        }
        Insert: {
          acquiring_company: string
          announcement_date?: string | null
          deal_structure?: Json | null
          deal_type: string
          deal_uuid?: string | null
          expected_close_date?: string | null
          id?: never
          status?: string | null
          target_company: string
          total_deal_value: number
        }
        Update: {
          acquiring_company?: string
          announcement_date?: string | null
          deal_structure?: Json | null
          deal_type?: string
          deal_uuid?: string | null
          expected_close_date?: string | null
          id?: never
          status?: string | null
          target_company?: string
          total_deal_value?: number
        }
        Relationships: []
      }
      mesh_nodes: {
        Row: {
          geographical_region: string | null
          last_sync_timestamp: string | null
          node_id: string
          node_type: string | null
          processing_capacity: number | null
          reliability_score: number | null
        }
        Insert: {
          geographical_region?: string | null
          last_sync_timestamp?: string | null
          node_id: string
          node_type?: string | null
          processing_capacity?: number | null
          reliability_score?: number | null
        }
        Update: {
          geographical_region?: string | null
          last_sync_timestamp?: string | null
          node_id?: string
          node_type?: string | null
          processing_capacity?: number | null
          reliability_score?: number | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: number
          user_id: number
        }
        Insert: {
          content: string
          created_at?: string
          id?: never
          user_id: number
        }
        Update: {
          content?: string
          created_at?: string
          id?: never
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      network_messages: {
        Row: {
          id: number
          message: string
          sent_at: string | null
          source_user: string
          target_user: string
        }
        Insert: {
          id?: never
          message: string
          sent_at?: string | null
          source_user: string
          target_user: string
        }
        Update: {
          id?: never
          message?: string
          sent_at?: string | null
          source_user?: string
          target_user?: string
        }
        Relationships: []
      }
      organization_users: {
        Row: {
          added_at: string | null
          id: number
          organization_id: number | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          added_at?: string | null
          id?: never
          organization_id?: number | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          added_at?: string | null
          id?: never
          organization_id?: number | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_users_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizational_licenses"
            referencedColumns: ["id"]
          },
        ]
      }
      organizational_licenses: {
        Row: {
          contract_end_date: string | null
          contract_start_date: string | null
          id: number
          organization_name: string
          primary_contact_email: string | null
          seats_used: number | null
          status: string | null
          tier_id: number | null
          total_seats: number | null
        }
        Insert: {
          contract_end_date?: string | null
          contract_start_date?: string | null
          id?: never
          organization_name: string
          primary_contact_email?: string | null
          seats_used?: number | null
          status?: string | null
          tier_id?: number | null
          total_seats?: number | null
        }
        Update: {
          contract_end_date?: string | null
          contract_start_date?: string | null
          id?: never
          organization_name?: string
          primary_contact_email?: string | null
          seats_used?: number | null
          status?: string | null
          tier_id?: number | null
          total_seats?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "organizational_licenses_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "pricing_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          accessibility_commitment: string | null
          created_at: string | null
          description: string | null
          domain: string | null
          founded_date: string | null
          github_org_id: number | null
          github_org_name: string | null
          id: string
          is_public: boolean | null
          is_verified: boolean | null
          name: string
          primary_focus: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          accessibility_commitment?: string | null
          created_at?: string | null
          description?: string | null
          domain?: string | null
          founded_date?: string | null
          github_org_id?: number | null
          github_org_name?: string | null
          id?: string
          is_public?: boolean | null
          is_verified?: boolean | null
          name: string
          primary_focus?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          accessibility_commitment?: string | null
          created_at?: string | null
          description?: string | null
          domain?: string | null
          founded_date?: string | null
          github_org_id?: number | null
          github_org_name?: string | null
          id?: string
          is_public?: boolean | null
          is_verified?: boolean | null
          name?: string
          primary_focus?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      password_failed_verification_attempts: {
        Row: {
          id: number
          last_failed_at: string
          user_id: string
        }
        Insert: {
          id?: number
          last_failed_at: string
          user_id: string
        }
        Update: {
          id?: number
          last_failed_at?: string
          user_id?: string
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          id: number
          measured_at: string | null
          metric_name: string
          metric_value: number | null
          proposal_id: number
        }
        Insert: {
          id?: never
          measured_at?: string | null
          metric_name: string
          metric_value?: number | null
          proposal_id: number
        }
        Update: {
          id?: never
          measured_at?: string | null
          metric_name?: string
          metric_value?: number | null
          proposal_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          created_at: string | null
          id: number
          permission: string
          role_id: number
        }
        Insert: {
          created_at?: string | null
          id?: never
          permission: string
          role_id: number
        }
        Update: {
          created_at?: string | null
          id?: never
          permission?: string
          role_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_permission_role"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      persona_capabilities: {
        Row: {
          active: boolean | null
          ai_agents_required: Json | null
          capability_name: string
          created_at: string | null
          description: string | null
          id: string
          permissions_granted: Json | null
          persona_id: string
          required_trust_level: number | null
        }
        Insert: {
          active?: boolean | null
          ai_agents_required?: Json | null
          capability_name: string
          created_at?: string | null
          description?: string | null
          id?: string
          permissions_granted?: Json | null
          persona_id: string
          required_trust_level?: number | null
        }
        Update: {
          active?: boolean | null
          ai_agents_required?: Json | null
          capability_name?: string
          created_at?: string | null
          description?: string | null
          id?: string
          permissions_granted?: Json | null
          persona_id?: string
          required_trust_level?: number | null
        }
        Relationships: []
      }
      persona_evolutions: {
        Row: {
          evolution_date: string | null
          from_persona: string
          id: string
          notes: string | null
          requirements_met: Json
          success: boolean | null
          to_persona: string
          user_id: string | null
        }
        Insert: {
          evolution_date?: string | null
          from_persona: string
          id?: string
          notes?: string | null
          requirements_met: Json
          success?: boolean | null
          to_persona: string
          user_id?: string | null
        }
        Update: {
          evolution_date?: string | null
          from_persona?: string
          id?: string
          notes?: string | null
          requirements_met?: Json
          success?: boolean | null
          to_persona?: string
          user_id?: string | null
        }
        Relationships: []
      }
      persona_verifications: {
        Row: {
          created_at: string | null
          id: number
          status: string
          updated_at: string | null
          user_id: string
          verification_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          status: string
          updated_at?: string | null
          user_id: string
          verification_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          status?: string
          updated_at?: string | null
          user_id?: string
          verification_id?: string
        }
        Relationships: []
      }
      pink_sync: {
        Row: {
          id: number
          proposal_id: number
          synced_at: string | null
        }
        Insert: {
          id?: never
          proposal_id: number
          synced_at?: string | null
        }
        Update: {
          id?: never
          proposal_id?: number
          synced_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pink_sync_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      pinksync_accessibility_profiles: {
        Row: {
          accessibility_level: string | null
          assistive_technologies: string[] | null
          communication_modalities: string[] | null
          created_at: string | null
          hearing_status: string | null
          preferred_languages: string[] | null
          support_requirements: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accessibility_level?: string | null
          assistive_technologies?: string[] | null
          communication_modalities?: string[] | null
          created_at?: string | null
          hearing_status?: string | null
          preferred_languages?: string[] | null
          support_requirements?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accessibility_level?: string | null
          assistive_technologies?: string[] | null
          communication_modalities?: string[] | null
          created_at?: string | null
          hearing_status?: string | null
          preferred_languages?: string[] | null
          support_requirements?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      preferences: {
        Row: {
          assistive_technologies:
            | Database["public"]["Enums"]["assistive_tech_preference"][]
            | null
          created_at: string | null
          emergency_contact_method: string | null
          emergency_sign_language_proficiency: boolean | null
          id: string
          interpretation_preference:
            | Database["public"]["Enums"]["interpretation_preference"]
            | null
          light_sensitivity: boolean | null
          needs_captions: boolean | null
          needs_sign_language_interpreter: boolean | null
          noise_sensitivity: boolean | null
          preferred_communication_context: string | null
          preferred_communication_mode:
            | Database["public"]["Enums"]["communication_mode"]
            | null
          preferred_communication_speed: string | null
          preferred_learning_style: string | null
          prefers_visual_communication: boolean | null
          primary_sign_language:
            | Database["public"]["Enums"]["sign_language_preference"]
            | null
          professional_communication_needs: string | null
          secondary_sign_languages: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assistive_technologies?:
            | Database["public"]["Enums"]["assistive_tech_preference"][]
            | null
          created_at?: string | null
          emergency_contact_method?: string | null
          emergency_sign_language_proficiency?: boolean | null
          id?: string
          interpretation_preference?:
            | Database["public"]["Enums"]["interpretation_preference"]
            | null
          light_sensitivity?: boolean | null
          needs_captions?: boolean | null
          needs_sign_language_interpreter?: boolean | null
          noise_sensitivity?: boolean | null
          preferred_communication_context?: string | null
          preferred_communication_mode?:
            | Database["public"]["Enums"]["communication_mode"]
            | null
          preferred_communication_speed?: string | null
          preferred_learning_style?: string | null
          prefers_visual_communication?: boolean | null
          primary_sign_language?:
            | Database["public"]["Enums"]["sign_language_preference"]
            | null
          professional_communication_needs?: string | null
          secondary_sign_languages?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assistive_technologies?:
            | Database["public"]["Enums"]["assistive_tech_preference"][]
            | null
          created_at?: string | null
          emergency_contact_method?: string | null
          emergency_sign_language_proficiency?: boolean | null
          id?: string
          interpretation_preference?:
            | Database["public"]["Enums"]["interpretation_preference"]
            | null
          light_sensitivity?: boolean | null
          needs_captions?: boolean | null
          needs_sign_language_interpreter?: boolean | null
          noise_sensitivity?: boolean | null
          preferred_communication_context?: string | null
          preferred_communication_mode?:
            | Database["public"]["Enums"]["communication_mode"]
            | null
          preferred_communication_speed?: string | null
          preferred_learning_style?: string | null
          prefers_visual_communication?: boolean | null
          primary_sign_language?:
            | Database["public"]["Enums"]["sign_language_preference"]
            | null
          professional_communication_needs?: string | null
          secondary_sign_languages?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      pricing_tiers: {
        Row: {
          created_at: string | null
          export_allowed: boolean | null
          id: number
          max_research_briefs: number | null
          monthly_price: number | null
          name: string
          sign_speak_support: boolean | null
          updated_at: string | null
          visual_synthesis_level: string | null
        }
        Insert: {
          created_at?: string | null
          export_allowed?: boolean | null
          id?: never
          max_research_briefs?: number | null
          monthly_price?: number | null
          name: string
          sign_speak_support?: boolean | null
          updated_at?: string | null
          visual_synthesis_level?: string | null
        }
        Update: {
          created_at?: string | null
          export_allowed?: boolean | null
          id?: never
          max_research_briefs?: number | null
          monthly_price?: number | null
          name?: string
          sign_speak_support?: boolean | null
          updated_at?: string | null
          visual_synthesis_level?: string | null
        }
        Relationships: []
      }
      professional_development: {
        Row: {
          certification_earned: string | null
          closed_captioning: boolean | null
          completion_date: string | null
          completion_status: string | null
          course_name: string
          id: string
          provider: string | null
          sign_language_interpretation: boolean | null
          skill_tags: string[] | null
          transcript_available: boolean | null
          user_profile_id: string | null
        }
        Insert: {
          certification_earned?: string | null
          closed_captioning?: boolean | null
          completion_date?: string | null
          completion_status?: string | null
          course_name: string
          id?: string
          provider?: string | null
          sign_language_interpretation?: boolean | null
          skill_tags?: string[] | null
          transcript_available?: boolean | null
          user_profile_id?: string | null
        }
        Update: {
          certification_earned?: string | null
          closed_captioning?: boolean | null
          completion_date?: string | null
          completion_status?: string | null
          course_name?: string
          id?: string
          provider?: string | null
          sign_language_interpretation?: boolean | null
          skill_tags?: string[] | null
          transcript_available?: boolean | null
          user_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "professional_development_user_profile_id_fkey"
            columns: ["user_profile_id"]
            isOneToOne: false
            referencedRelation: "vr4deaf_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          accessibility_preference: string | null
          created_at: string
          id: number
          last_clerk_sync: string | null
          sync_attempts: number | null
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          accessibility_preference?: string | null
          created_at?: string
          id?: never
          last_clerk_sync?: string | null
          sync_attempts?: number | null
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          accessibility_preference?: string | null
          created_at?: string
          id?: never
          last_clerk_sync?: string | null
          sync_attempts?: number | null
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      project_steps: {
        Row: {
          created_at: string | null
          id: number
          input_data: Json | null
          result_data: Json | null
          step_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          input_data?: Json | null
          result_data?: Json | null
          step_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: never
          input_data?: Json | null
          result_data?: Json | null
          step_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          business_name: string
          business_type: string | null
          created_at: string | null
          current_phase: string
          fibonrose_badges: Json | null
          fibonrose_score: number | null
          id: string
          is_active: boolean | null
          is_archived: boolean | null
          location_city: string | null
          location_state: string | null
          owner_email: string | null
          owner_id: string
          owner_name: string
          phase_started_at: string | null
          source: string | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          business_name: string
          business_type?: string | null
          created_at?: string | null
          current_phase?: string
          fibonrose_badges?: Json | null
          fibonrose_score?: number | null
          id?: string
          is_active?: boolean | null
          is_archived?: boolean | null
          location_city?: string | null
          location_state?: string | null
          owner_email?: string | null
          owner_id: string
          owner_name: string
          phase_started_at?: string | null
          source?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          business_name?: string
          business_type?: string | null
          created_at?: string | null
          current_phase?: string
          fibonrose_badges?: Json | null
          fibonrose_score?: number | null
          id?: string
          is_active?: boolean | null
          is_archived?: boolean | null
          location_city?: string | null
          location_state?: string | null
          owner_email?: string | null
          owner_id?: string
          owner_name?: string
          phase_started_at?: string | null
          source?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      proposal_votes: {
        Row: {
          proposal_id: string
          vote_type: string | null
          voted_at: string | null
          voter_id: string
        }
        Insert: {
          proposal_id: string
          vote_type?: string | null
          voted_at?: string | null
          voter_id: string
        }
        Update: {
          proposal_id?: string
          vote_type?: string | null
          voted_at?: string | null
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposal_votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "community_proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposal_votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "ecosystem_users"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          ai_output: Json | null
          created_at: string | null
          id: number
          payload: Json
          reviewed_at: string | null
          trust_score: number | null
          video_request_id: number
        }
        Insert: {
          ai_output?: Json | null
          created_at?: string | null
          id?: never
          payload: Json
          reviewed_at?: string | null
          trust_score?: number | null
          video_request_id: number
        }
        Update: {
          ai_output?: Json | null
          created_at?: string | null
          id?: never
          payload?: Json
          reviewed_at?: string | null
          trust_score?: number | null
          video_request_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "proposals_video_request_id_fkey"
            columns: ["video_request_id"]
            isOneToOne: false
            referencedRelation: "video_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      provisioning_events: {
        Row: {
          attempts: number
          created_at: string | null
          event_type: string
          id: string
          last_error: string | null
          partner_url: string | null
          payload: Json | null
          status: string
        }
        Insert: {
          attempts?: number
          created_at?: string | null
          event_type: string
          id?: string
          last_error?: string | null
          partner_url?: string | null
          payload?: Json | null
          status?: string
        }
        Update: {
          attempts?: number
          created_at?: string | null
          event_type?: string
          id?: string
          last_error?: string | null
          partner_url?: string | null
          payload?: Json | null
          status?: string
        }
        Relationships: []
      }
      reputation_events: {
        Row: {
          created_at: string | null
          description: string | null
          event_type: string
          id: number
          proof_id: number | null
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_type: string
          id?: never
          proof_id?: number | null
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_type?: string
          id?: never
          proof_id?: number | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reputation_events_proof_id_fkey"
            columns: ["proof_id"]
            isOneToOne: false
            referencedRelation: "visual_proofs"
            referencedColumns: ["id"]
          },
        ]
      }
      research_briefs: {
        Row: {
          brief_content: Json | null
          created_at: string | null
          id: number
          query_embedding: string | null
          sign_speak_transcript: string | null
          synthesis_complexity: number | null
          token_usage: number | null
          topic: string
          user_id: string | null
          visual_assets: Json | null
        }
        Insert: {
          brief_content?: Json | null
          created_at?: string | null
          id?: never
          query_embedding?: string | null
          sign_speak_transcript?: string | null
          synthesis_complexity?: number | null
          token_usage?: number | null
          topic: string
          user_id?: string | null
          visual_assets?: Json | null
        }
        Update: {
          brief_content?: Json | null
          created_at?: string | null
          id?: never
          query_embedding?: string | null
          sign_speak_transcript?: string | null
          synthesis_complexity?: number | null
          token_usage?: number | null
          topic?: string
          user_id?: string | null
          visual_assets?: Json | null
        }
        Relationships: []
      }
      rewards: {
        Row: {
          id: number
          last_earned_at: string | null
          profile_id: number
          total_earned: number | null
          updated_at: string | null
        }
        Insert: {
          id?: never
          last_earned_at?: string | null
          profile_id: number
          total_earned?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: never
          last_earned_at?: string | null
          profile_id?: number
          total_earned?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rewards_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      service_routing_rules: {
        Row: {
          additional_routing_logic: Json | null
          id: string
          priority_level: number | null
          service_category: string
          sign_language: string | null
          target_department: string
        }
        Insert: {
          additional_routing_logic?: Json | null
          id?: string
          priority_level?: number | null
          service_category: string
          sign_language?: string | null
          target_department: string
        }
        Update: {
          additional_routing_logic?: Json | null
          id?: string
          priority_level?: number | null
          service_category?: string
          sign_language?: string | null
          target_department?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: never
          name: string
        }
        Update: {
          description?: string | null
          id?: never
          name?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: number
          session_token: string
          user_id: number
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: never
          session_token: string
          user_id: number
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: never
          session_token?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_session_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sign_in_logs: {
        Row: {
          communication_mode: string | null
          id: number
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          communication_mode?: string | null
          id?: never
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          communication_mode?: string | null
          id?: never
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sign_language_submissions: {
        Row: {
          additional_context: string | null
          ai_interpretation: Json | null
          confidence_score: number | null
          id: string
          priority_level: number | null
          processing_timestamp: string | null
          recommended_department: string | null
          requires_captioning: boolean | null
          requires_human_interpreter: boolean | null
          service_category: string
          sign_language: string
          status: string | null
          submission_timestamp: string | null
          user_id: string | null
          video_url: string
        }
        Insert: {
          additional_context?: string | null
          ai_interpretation?: Json | null
          confidence_score?: number | null
          id?: string
          priority_level?: number | null
          processing_timestamp?: string | null
          recommended_department?: string | null
          requires_captioning?: boolean | null
          requires_human_interpreter?: boolean | null
          service_category: string
          sign_language: string
          status?: string | null
          submission_timestamp?: string | null
          user_id?: string | null
          video_url: string
        }
        Update: {
          additional_context?: string | null
          ai_interpretation?: Json | null
          confidence_score?: number | null
          id?: string
          priority_level?: number | null
          processing_timestamp?: string | null
          recommended_department?: string | null
          requires_captioning?: boolean | null
          requires_human_interpreter?: boolean | null
          service_category?: string
          sign_language?: string
          status?: string | null
          submission_timestamp?: string | null
          user_id?: string | null
          video_url?: string
        }
        Relationships: []
      }
      sign_language_variants: {
        Row: {
          cultural_nuances: Json | null
          dialect: string | null
          id: string
          language_name: string | null
          region: string | null
          sample_videos: string[] | null
          translation_accuracy: number | null
        }
        Insert: {
          cultural_nuances?: Json | null
          dialect?: string | null
          id?: string
          language_name?: string | null
          region?: string | null
          sample_videos?: string[] | null
          translation_accuracy?: number | null
        }
        Update: {
          cultural_nuances?: Json | null
          dialect?: string | null
          id?: string
          language_name?: string | null
          region?: string | null
          sample_videos?: string[] | null
          translation_accuracy?: number | null
        }
        Relationships: []
      }
      storage_mappings: {
        Row: {
          bucket_name: string
          content_length: number | null
          content_type: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          object_path: string
          provider: string
          user_id: string | null
        }
        Insert: {
          bucket_name: string
          content_length?: number | null
          content_type?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          object_path: string
          provider: string
          user_id?: string | null
        }
        Update: {
          bucket_name?: string
          content_length?: number | null
          content_type?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          object_path?: string
          provider?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          active: boolean | null
          end_date: string | null
          gu_allocation: number
          id: number
          plan: string
          start_date: string | null
          user_id: string
        }
        Insert: {
          active?: boolean | null
          end_date?: string | null
          gu_allocation?: number
          id?: never
          plan?: string
          start_date?: string | null
          user_id: string
        }
        Update: {
          active?: boolean | null
          end_date?: string | null
          gu_allocation?: number
          id?: never
          plan?: string
          start_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string | null
          confirmation_number: string | null
          created_at: string
          id: string
          is_escalated: boolean | null
          last_updated_at: string | null
          priority_score: number | null
          resolution_details: string | null
          status: string | null
          suggested_next_step: string | null
          summary: string
          urgency: string | null
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          confirmation_number?: string | null
          created_at?: string
          id?: string
          is_escalated?: boolean | null
          last_updated_at?: string | null
          priority_score?: number | null
          resolution_details?: string | null
          status?: string | null
          suggested_next_step?: string | null
          summary: string
          urgency?: string | null
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          confirmation_number?: string | null
          created_at?: string
          id?: string
          is_escalated?: boolean | null
          last_updated_at?: string | null
          priority_score?: number | null
          resolution_details?: string | null
          status?: string | null
          suggested_next_step?: string | null
          summary?: string
          urgency?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sync_identities: {
        Row: {
          active_contexts: string[] | null
          data_sovereignty_preferences: Json | null
          decentralized_id: string | null
          sync_id: string
          verifiable_credentials: Json | null
        }
        Insert: {
          active_contexts?: string[] | null
          data_sovereignty_preferences?: Json | null
          decentralized_id?: string | null
          sync_id: string
          verifiable_credentials?: Json | null
        }
        Update: {
          active_contexts?: string[] | null
          data_sovereignty_preferences?: Json | null
          decentralized_id?: string | null
          sync_id?: string
          verifiable_credentials?: Json | null
        }
        Relationships: []
      }
      tokenized_transactions: {
        Row: {
          id: number
          iep_alignment_code: string
          metadata: Json | null
          service_category: string
          service_provider_id: number | null
          token_amount: number
          transaction_date: string | null
          transaction_status: string | null
          usd_equivalent: number
          voc_rehab_account_id: number | null
        }
        Insert: {
          id?: never
          iep_alignment_code: string
          metadata?: Json | null
          service_category: string
          service_provider_id?: number | null
          token_amount: number
          transaction_date?: string | null
          transaction_status?: string | null
          usd_equivalent: number
          voc_rehab_account_id?: number | null
        }
        Update: {
          id?: never
          iep_alignment_code?: string
          metadata?: Json | null
          service_category?: string
          service_provider_id?: number | null
          token_amount?: number
          transaction_date?: string | null
          transaction_status?: string | null
          usd_equivalent?: number
          voc_rehab_account_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tokenized_transactions_service_provider_id_fkey"
            columns: ["service_provider_id"]
            isOneToOne: false
            referencedRelation: "approved_service_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tokenized_transactions_voc_rehab_account_id_fkey"
            columns: ["voc_rehab_account_id"]
            isOneToOne: false
            referencedRelation: "voc_rehab_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions_ledger: {
        Row: {
          amount: number
          blockchain_hash: string | null
          currency: string
          destination_account_id: number | null
          id: number
          metadata: Json | null
          source_account_id: number | null
          status: string | null
          timestamp: string | null
          transaction_type: string
          transaction_uuid: string | null
        }
        Insert: {
          amount: number
          blockchain_hash?: string | null
          currency: string
          destination_account_id?: number | null
          id?: never
          metadata?: Json | null
          source_account_id?: number | null
          status?: string | null
          timestamp?: string | null
          transaction_type: string
          transaction_uuid?: string | null
        }
        Update: {
          amount?: number
          blockchain_hash?: string | null
          currency?: string
          destination_account_id?: number | null
          id?: never
          metadata?: Json | null
          source_account_id?: number | null
          status?: string | null
          timestamp?: string | null
          transaction_type?: string
          transaction_uuid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_destination_account"
            columns: ["destination_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_source_account"
            columns: ["source_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      translation_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          original_text: string | null
          status: string | null
          translation_method: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          original_text?: string | null
          status?: string | null
          translation_method?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          original_text?: string | null
          status?: string | null
          translation_method?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      trust_factors: {
        Row: {
          active: boolean | null
          description: string | null
          id: number
          name: string
          weight: number
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id?: number
          name: string
          weight: number
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: number
          name?: string
          weight?: number
        }
        Relationships: []
      }
      trust_history: {
        Row: {
          changed_by: string | null
          id: number
          new_score: number
          previous_score: number | null
          reason: string | null
          timestamp: string | null
          user_id: string
        }
        Insert: {
          changed_by?: string | null
          id?: number
          new_score: number
          previous_score?: number | null
          reason?: string | null
          timestamp?: string | null
          user_id: string
        }
        Update: {
          changed_by?: string | null
          id?: number
          new_score?: number
          previous_score?: number | null
          reason?: string | null
          timestamp?: string | null
          user_id?: string
        }
        Relationships: []
      }
      trust_scores: {
        Row: {
          confidence_level: number
          id: number
          last_updated: string | null
          score: number
          user_id: string
        }
        Insert: {
          confidence_level: number
          id?: number
          last_updated?: string | null
          score: number
          user_id: string
        }
        Update: {
          confidence_level?: number
          id?: number
          last_updated?: string | null
          score?: number
          user_id?: string
        }
        Relationships: []
      }
      user_brand_roles: {
        Row: {
          brand_id: string | null
          created_at: string | null
          id: string
          role: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          brand_id?: string | null
          created_at?: string | null
          id?: string
          role: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          brand_id?: string | null
          created_at?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_brand_roles_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_communication_preferences: {
        Row: {
          accessibility_needs: Json | null
          communication_mode: string | null
          last_updated: string | null
          preferred_sign_language: string | null
          preferred_text_language: string | null
          user_id: string
        }
        Insert: {
          accessibility_needs?: Json | null
          communication_mode?: string | null
          last_updated?: string | null
          preferred_sign_language?: string | null
          preferred_text_language?: string | null
          user_id: string
        }
        Update: {
          accessibility_needs?: Json | null
          communication_mode?: string | null
          last_updated?: string | null
          preferred_sign_language?: string | null
          preferred_text_language?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_compliance_records: {
        Row: {
          case_manager_notes: string | null
          compliance_status: string | null
          id: string
          intervention_history: Json | null
          last_compliance_check: string | null
          next_review_date: string | null
          program_name: string | null
          regulatory_requirements: Json | null
          user_id: string | null
        }
        Insert: {
          case_manager_notes?: string | null
          compliance_status?: string | null
          id?: string
          intervention_history?: Json | null
          last_compliance_check?: string | null
          next_review_date?: string | null
          program_name?: string | null
          regulatory_requirements?: Json | null
          user_id?: string | null
        }
        Update: {
          case_manager_notes?: string | null
          compliance_status?: string | null
          id?: string
          intervention_history?: Json | null
          last_compliance_check?: string | null
          next_review_date?: string | null
          program_name?: string | null
          regulatory_requirements?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_compliance_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_credits: {
        Row: {
          last_updated: string | null
          total_credits: number | null
          user_id: string
        }
        Insert: {
          last_updated?: string | null
          total_credits?: number | null
          user_id: string
        }
        Update: {
          last_updated?: string | null
          total_credits?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_factor_scores: {
        Row: {
          evidence: string | null
          factor_id: number | null
          id: number
          score: number
          timestamp: string | null
          user_id: string
        }
        Insert: {
          evidence?: string | null
          factor_id?: number | null
          id?: number
          score: number
          timestamp?: string | null
          user_id: string
        }
        Update: {
          evidence?: string | null
          factor_id?: number | null
          id?: number
          score?: number
          timestamp?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_factor_scores_factor_id_fkey"
            columns: ["factor_id"]
            isOneToOne: false
            referencedRelation: "trust_factors"
            referencedColumns: ["id"]
          },
        ]
      }
      user_learning_journeys: {
        Row: {
          completion_status: string | null
          id: string
          last_activity_at: string | null
          module_content: Json | null
          module_type: string | null
          personalized_recommendations: Json | null
          progress_percentage: number | null
          started_at: string | null
          user_id: string | null
        }
        Insert: {
          completion_status?: string | null
          id?: string
          last_activity_at?: string | null
          module_content?: Json | null
          module_type?: string | null
          personalized_recommendations?: Json | null
          progress_percentage?: number | null
          started_at?: string | null
          user_id?: string | null
        }
        Update: {
          completion_status?: string | null
          id?: string
          last_activity_at?: string | null
          module_content?: Json | null
          module_type?: string | null
          personalized_recommendations?: Json | null
          progress_percentage?: number | null
          started_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_journeys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          city: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          first_name: string
          gender: string | null
          id: string
          last_name: string
          phone_number: string | null
          postal_code: string | null
          profile_completion_percentage: number | null
          state: string | null
          street_address: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          first_name: string
          gender?: string | null
          id?: string
          last_name: string
          phone_number?: string | null
          postal_code?: string | null
          profile_completion_percentage?: number | null
          state?: string | null
          street_address?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string
          phone_number?: string | null
          postal_code?: string | null
          profile_completion_percentage?: number | null
          state?: string | null
          street_address?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          role_id: number
          user_id: number
        }
        Insert: {
          created_at?: string | null
          role_id: number
          user_id: number
        }
        Update: {
          created_at?: string | null
          role_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_role"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          end_date: string | null
          id: number
          last_renewed_at: string | null
          next_billing_date: string | null
          start_date: string | null
          status: string | null
          stripe_subscription_id: string | null
          tier_id: number | null
          user_id: string | null
        }
        Insert: {
          end_date?: string | null
          id?: never
          last_renewed_at?: string | null
          next_billing_date?: string | null
          start_date?: string | null
          status?: string | null
          stripe_subscription_id?: string | null
          tier_id?: number | null
          user_id?: string | null
        }
        Update: {
          end_date?: string | null
          id?: never
          last_renewed_at?: string | null
          next_billing_date?: string | null
          start_date?: string | null
          status?: string | null
          stripe_subscription_id?: string | null
          tier_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "pricing_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: number
          password_hash: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: never
          password_hash: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: never
          password_hash?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      validation_events: {
        Row: {
          created_at: string | null
          earning_event_id: number
          id: number
          validation_data: Json | null
          validation_result: string
          validator_profile_id: number
        }
        Insert: {
          created_at?: string | null
          earning_event_id: number
          id?: never
          validation_data?: Json | null
          validation_result: string
          validator_profile_id: number
        }
        Update: {
          created_at?: string | null
          earning_event_id?: number
          id?: never
          validation_data?: Json | null
          validation_result?: string
          validator_profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "validation_events_earning_event_id_fkey"
            columns: ["earning_event_id"]
            isOneToOne: false
            referencedRelation: "earning_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "validation_events_validator_profile_id_fkey"
            columns: ["validator_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_logs: {
        Row: {
          file_name: string
          file_size: number
          file_type: string
          id: number
          status: string | null
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          file_name: string
          file_size: number
          file_type: string
          id?: number
          status?: string | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          file_name?: string
          file_size?: number
          file_type?: string
          id?: number
          status?: string | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      verification_types: {
        Row: {
          description: string | null
          display_name: string
          icon: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          display_name: string
          icon?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          display_name?: string
          icon?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      verifications: {
        Row: {
          blockchain_hash: string | null
          created_at: string | null
          data: Json | null
          id: number
          status: Database["public"]["Enums"]["verification_status"] | null
          type_id: number | null
          user_id: string | null
          validated_by: string | null
          verified_at: string | null
        }
        Insert: {
          blockchain_hash?: string | null
          created_at?: string | null
          data?: Json | null
          id?: number
          status?: Database["public"]["Enums"]["verification_status"] | null
          type_id?: number | null
          user_id?: string | null
          validated_by?: string | null
          verified_at?: string | null
        }
        Update: {
          blockchain_hash?: string | null
          created_at?: string | null
          data?: Json | null
          id?: number
          status?: Database["public"]["Enums"]["verification_status"] | null
          type_id?: number | null
          user_id?: string | null
          validated_by?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verifications_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "verification_types"
            referencedColumns: ["id"]
          },
        ]
      }
      video_content: {
        Row: {
          accessibility_score: number | null
          audio_description: string | null
          base_token_reward: number | null
          category: string
          comments_count: number | null
          content_license: string | null
          content_metadata: Json | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          engagement_score: number | null
          has_captions: boolean | null
          has_sign_language: boolean | null
          id: number
          last_updated: string | null
          likes_count: number | null
          share_count: number | null
          thumbnail_url: string | null
          title: string
          total_token_earnings: number | null
          video_url: string
          views_count: number | null
        }
        Insert: {
          accessibility_score?: number | null
          audio_description?: string | null
          base_token_reward?: number | null
          category: string
          comments_count?: number | null
          content_license?: string | null
          content_metadata?: Json | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          engagement_score?: number | null
          has_captions?: boolean | null
          has_sign_language?: boolean | null
          id?: never
          last_updated?: string | null
          likes_count?: number | null
          share_count?: number | null
          thumbnail_url?: string | null
          title: string
          total_token_earnings?: number | null
          video_url: string
          views_count?: number | null
        }
        Update: {
          accessibility_score?: number | null
          audio_description?: string | null
          base_token_reward?: number | null
          category?: string
          comments_count?: number | null
          content_license?: string | null
          content_metadata?: Json | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          engagement_score?: number | null
          has_captions?: boolean | null
          has_sign_language?: boolean | null
          id?: never
          last_updated?: string | null
          likes_count?: number | null
          share_count?: number | null
          thumbnail_url?: string | null
          title?: string
          total_token_earnings?: number | null
          video_url?: string
          views_count?: number | null
        }
        Relationships: []
      }
      video_metadata: {
        Row: {
          accessibility_score: number | null
          captions_url: string | null
          created_at: string | null
          description: string | null
          duration: unknown
          file_size_bytes: number | null
          id: number
          language: string
          last_updated: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string | null
          transcript_url: string | null
          video_key: string
          video_type: string
          video_url: string
        }
        Insert: {
          accessibility_score?: number | null
          captions_url?: string | null
          created_at?: string | null
          description?: string | null
          duration?: unknown
          file_size_bytes?: number | null
          id?: never
          language: string
          last_updated?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          transcript_url?: string | null
          video_key: string
          video_type: string
          video_url: string
        }
        Update: {
          accessibility_score?: number | null
          captions_url?: string | null
          created_at?: string | null
          description?: string | null
          duration?: unknown
          file_size_bytes?: number | null
          id?: never
          language?: string
          last_updated?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          transcript_url?: string | null
          video_key?: string
          video_type?: string
          video_url?: string
        }
        Relationships: []
      }
      video_monetization_log: {
        Row: {
          accessibility_bonus_tokens: number | null
          id: number
          interaction_type: string | null
          like_tokens: number | null
          metadata: Json | null
          share_tokens: number | null
          timestamp: string | null
          total_tokens_earned: number
          user_id: string | null
          video_id: number | null
          view_duration_seconds: number | null
          view_tokens: number | null
        }
        Insert: {
          accessibility_bonus_tokens?: number | null
          id?: never
          interaction_type?: string | null
          like_tokens?: number | null
          metadata?: Json | null
          share_tokens?: number | null
          timestamp?: string | null
          total_tokens_earned?: number
          user_id?: string | null
          video_id?: number | null
          view_duration_seconds?: number | null
          view_tokens?: number | null
        }
        Update: {
          accessibility_bonus_tokens?: number | null
          id?: never
          interaction_type?: string | null
          like_tokens?: number | null
          metadata?: Json | null
          share_tokens?: number | null
          timestamp?: string | null
          total_tokens_earned?: number
          user_id?: string | null
          video_id?: number | null
          view_duration_seconds?: number | null
          view_tokens?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "video_monetization_log_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "video_content"
            referencedColumns: ["id"]
          },
        ]
      }
      video_requests: {
        Row: {
          created_at: string | null
          id: number
          status: string
          storage_path: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          status?: string
          storage_path: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: never
          status?: string
          storage_path?: string
          user_id?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          accessibility_mode:
            | Database["public"]["Enums"]["accessibility_mode"][]
            | null
          confidence_score: number | null
          created_at: string | null
          fibronrose_score: number | null
          file_size: number
          id: string
          is_asl_ready: boolean | null
          original_filename: string
          processed_at: string | null
          processing_attempts: number | null
          status: Database["public"]["Enums"]["video_status"] | null
          storage_path: string
          transcript: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accessibility_mode?:
            | Database["public"]["Enums"]["accessibility_mode"][]
            | null
          confidence_score?: number | null
          created_at?: string | null
          fibronrose_score?: number | null
          file_size: number
          id?: string
          is_asl_ready?: boolean | null
          original_filename: string
          processed_at?: string | null
          processing_attempts?: number | null
          status?: Database["public"]["Enums"]["video_status"] | null
          storage_path: string
          transcript?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accessibility_mode?:
            | Database["public"]["Enums"]["accessibility_mode"][]
            | null
          confidence_score?: number | null
          created_at?: string | null
          fibronrose_score?: number | null
          file_size?: number
          id?: string
          is_asl_ready?: boolean | null
          original_filename?: string
          processed_at?: string | null
          processing_attempts?: number | null
          status?: Database["public"]["Enums"]["video_status"] | null
          storage_path?: string
          transcript?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      visual_proofs: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          proof_type: string
          status: string | null
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: never
          proof_type: string
          status?: string | null
          url: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: never
          proof_type?: string
          status?: string | null
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      voc_rehab_accounts: {
        Row: {
          disability_category: string | null
          federal_program: string
          funding_end_date: string
          funding_start_date: string | null
          id: number
          iep_reference_number: string
          metadata: Json | null
          remaining_balance: number
          state_agency: string
          status: string | null
          token_balance: number | null
          token_conversion_rate: number | null
          total_funding_allocation: number
          user_id: string | null
        }
        Insert: {
          disability_category?: string | null
          federal_program: string
          funding_end_date: string
          funding_start_date?: string | null
          id?: never
          iep_reference_number: string
          metadata?: Json | null
          remaining_balance: number
          state_agency: string
          status?: string | null
          token_balance?: number | null
          token_conversion_rate?: number | null
          total_funding_allocation: number
          user_id?: string | null
        }
        Update: {
          disability_category?: string | null
          federal_program?: string
          funding_end_date?: string
          funding_start_date?: string | null
          id?: never
          iep_reference_number?: string
          metadata?: Json | null
          remaining_balance?: number
          state_agency?: string
          status?: string | null
          token_balance?: number | null
          token_conversion_rate?: number | null
          total_funding_allocation?: number
          user_id?: string | null
        }
        Relationships: []
      }
      vocational_background: {
        Row: {
          current_employment_status: string | null
          education_level: string | null
          id: string
          preferred_industries: string[] | null
          preferred_job_types: string[] | null
          primary_skills: string[] | null
          secondary_skills: string[] | null
          user_id: string | null
          workplace_accommodation_needs: string | null
          years_of_experience: number | null
        }
        Insert: {
          current_employment_status?: string | null
          education_level?: string | null
          id?: string
          preferred_industries?: string[] | null
          preferred_job_types?: string[] | null
          primary_skills?: string[] | null
          secondary_skills?: string[] | null
          user_id?: string | null
          workplace_accommodation_needs?: string | null
          years_of_experience?: number | null
        }
        Update: {
          current_employment_status?: string | null
          education_level?: string | null
          id?: string
          preferred_industries?: string[] | null
          preferred_job_types?: string[] | null
          primary_skills?: string[] | null
          secondary_skills?: string[] | null
          user_id?: string | null
          workplace_accommodation_needs?: string | null
          years_of_experience?: number | null
        }
        Relationships: []
      }
      vocational_rehabilitation_journey: {
        Row: {
          current_status: string | null
          id: string
          last_updated: string | null
          outcome_tracking: Json | null
          profile_id: string | null
          rehabilitation_stages: Json | null
          support_network: Json | null
        }
        Insert: {
          current_status?: string | null
          id?: string
          last_updated?: string | null
          outcome_tracking?: Json | null
          profile_id?: string | null
          rehabilitation_stages?: Json | null
          support_network?: Json | null
        }
        Update: {
          current_status?: string | null
          id?: string
          last_updated?: string | null
          outcome_tracking?: Json | null
          profile_id?: string | null
          rehabilitation_stages?: Json | null
          support_network?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "vocational_rehabilitation_journey_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "vr4deaf_professional_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vr_business_specialists: {
        Row: {
          contact_phone: string | null
          created_at: string | null
          email: string
          expertise: string[]
          id: string
          is_active: boolean | null
          name: string
          specialties: string[] | null
          updated_at: string | null
          years_of_experience: number | null
        }
        Insert: {
          contact_phone?: string | null
          created_at?: string | null
          email: string
          expertise: string[]
          id?: string
          is_active?: boolean | null
          name: string
          specialties?: string[] | null
          updated_at?: string | null
          years_of_experience?: number | null
        }
        Update: {
          contact_phone?: string | null
          created_at?: string | null
          email?: string
          expertise?: string[]
          id?: string
          is_active?: boolean | null
          name?: string
          specialties?: string[] | null
          updated_at?: string | null
          years_of_experience?: number | null
        }
        Relationships: []
      }
      vr4deaf: {
        Row: {
          id: number
          proposal_id: number
          pushed_at: string | null
        }
        Insert: {
          id?: never
          proposal_id: number
          pushed_at?: string | null
        }
        Update: {
          id?: never
          proposal_id?: number
          pushed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vr4deaf_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      vr4deaf_emails: {
        Row: {
          from: string
          html: string | null
          id: number
          processed: boolean | null
          subject: string | null
          text: string | null
          timestamp: string | null
          to: string
        }
        Insert: {
          from: string
          html?: string | null
          id?: never
          processed?: boolean | null
          subject?: string | null
          text?: string | null
          timestamp?: string | null
          to: string
        }
        Update: {
          from?: string
          html?: string | null
          id?: never
          processed?: boolean | null
          subject?: string | null
          text?: string | null
          timestamp?: string | null
          to?: string
        }
        Relationships: []
      }
      vr4deaf_professional_profiles: {
        Row: {
          accessibility_needs: Json | null
          career_trajectory: Json | null
          communication_matrix: Json | null
          id: string
          last_updated: string | null
          professional_identity: Json | null
          professional_resilience_score: number | null
          skill_ecosystem: Json | null
          user_id: string | null
        }
        Insert: {
          accessibility_needs?: Json | null
          career_trajectory?: Json | null
          communication_matrix?: Json | null
          id?: string
          last_updated?: string | null
          professional_identity?: Json | null
          professional_resilience_score?: number | null
          skill_ecosystem?: Json | null
          user_id?: string | null
        }
        Update: {
          accessibility_needs?: Json | null
          career_trajectory?: Json | null
          communication_matrix?: Json | null
          id?: string
          last_updated?: string | null
          professional_identity?: Json | null
          professional_resilience_score?: number | null
          skill_ecosystem?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vr4deaf_professional_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ecosystem_users"
            referencedColumns: ["id"]
          },
        ]
      }
      vr4deaf_profiles: {
        Row: {
          additional_disabilities: string[] | null
          career_objectives: string[] | null
          certification_goals: string[] | null
          current_employment_status: string | null
          desired_industries: string[] | null
          education_level: string | null
          hearing_loss_level: number | null
          id: string
          last_updated: string | null
          preferred_communication_modes: string[] | null
          primary_profession: string | null
          secondary_skills: string[] | null
          training_interests: string[] | null
          user_id: string | null
          workplace_accommodations: Json | null
          years_experience: number | null
        }
        Insert: {
          additional_disabilities?: string[] | null
          career_objectives?: string[] | null
          certification_goals?: string[] | null
          current_employment_status?: string | null
          desired_industries?: string[] | null
          education_level?: string | null
          hearing_loss_level?: number | null
          id?: string
          last_updated?: string | null
          preferred_communication_modes?: string[] | null
          primary_profession?: string | null
          secondary_skills?: string[] | null
          training_interests?: string[] | null
          user_id?: string | null
          workplace_accommodations?: Json | null
          years_experience?: number | null
        }
        Update: {
          additional_disabilities?: string[] | null
          career_objectives?: string[] | null
          certification_goals?: string[] | null
          current_employment_status?: string | null
          desired_industries?: string[] | null
          education_level?: string | null
          hearing_loss_level?: number | null
          id?: string
          last_updated?: string | null
          preferred_communication_modes?: string[] | null
          primary_profession?: string | null
          secondary_skills?: string[] | null
          training_interests?: string[] | null
          user_id?: string | null
          workplace_accommodations?: Json | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vr4deaf_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "ecosystem_users"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          created_at: string | null
          description: string | null
          email: string
          id: number
          username: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          email: string
          id?: never
          username?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          email?: string
          id?: never
          username?: string | null
        }
        Relationships: []
      }
      webhook_subscriptions: {
        Row: {
          active: boolean | null
          created_at: string | null
          created_by: string | null
          events: string[]
          filters: Json | null
          id: string
          secret_hash: string
          url: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          created_by?: string | null
          events: string[]
          filters?: Json | null
          id?: string
          secret_hash: string
          url: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          created_by?: string | null
          events?: string[]
          filters?: Json | null
          id?: string
          secret_hash?: string
          url?: string
        }
        Relationships: []
      }
      work_history: {
        Row: {
          company_name: string
          employment_type: string | null
          end_date: string | null
          id: string
          industry: string | null
          is_current_job: boolean | null
          job_description: string | null
          job_title: string
          start_date: string
          user_id: string | null
        }
        Insert: {
          company_name: string
          employment_type?: string | null
          end_date?: string | null
          id?: string
          industry?: string | null
          is_current_job?: boolean | null
          job_description?: string | null
          job_title: string
          start_date: string
          user_id?: string | null
        }
        Update: {
          company_name?: string
          employment_type?: string | null
          end_date?: string | null
          id?: string
          industry?: string | null
          is_current_job?: boolean | null
          job_description?: string | null
          job_title?: string
          start_date?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      active_projects_dashboard: {
        Row: {
          business_name: string | null
          current_phase: string | null
          fibonrose_score: number | null
          id: string | null
          last_compliance_scan: string | null
          owner_name: string | null
          phase_started: string | null
          total_agent_runs: number | null
          total_artifacts: number | null
        }
        Relationships: []
      }
      agent_performance: {
        Row: {
          agent_name: string | null
          agent_role: string | null
          avg_duration_ms: number | null
          failed_runs: number | null
          success_rate: number | null
          successful_runs: number | null
          total_runs: number | null
          total_tokens: number | null
        }
        Relationships: []
      }
      public_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          companies: Json | null
          experience: Json | null
          full_name: string | null
          id: number | null
          services: Json | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          companies?: Json | null
          experience?: Json | null
          full_name?: string | null
          id?: number | null
          services?: Json | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          companies?: Json | null
          experience?: Json | null
          full_name?: string | null
          id?: number | null
          services?: Json | null
        }
        Relationships: []
      }
      video_performance_daily: {
        Row: {
          avg_views_per_user: number | null
          language: string | null
          total_views: number | null
          unique_viewers: number | null
          video_type: string | null
          view_date: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      adaptive_otp_rate_limit: {
        Args: { user_email: string }
        Returns: boolean
      }
      anonymize_user_data: { Args: { p_user_id: string }; Returns: undefined }
      calculate_content_resonance: {
        Args: { p_content_segment_id: number }
        Returns: number
      }
      calculate_risk_score: { Args: { p_user_id: string }; Returns: number }
      calculate_trust_score: {
        Args: { p_user_id: string }
        Returns: {
          score: number
          tier_color: string
          tier_name: string
          verification_count: number
        }[]
      }
      can_access_sensitivity_level: {
        Args: { required_level: string }
        Returns: boolean
      }
      check_otp_risk: { Args: { user_email: string }; Returns: unknown }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      donate_unused_gu: { Args: never; Returns: undefined }
      gdpr_delete_user_data: {
        Args: { target_user_id: string }
        Returns: boolean
      }
      generate_accessibility_report: {
        Args: { p_user_id: string }
        Returns: Json
      }
      generate_api_key: {
        Args: { p_tier?: string; p_user_id: string }
        Returns: string
      }
      generate_insight_embedding: {
        Args: { p_insight_id: string }
        Returns: undefined
      }
      generate_micro_content: {
        Args: {
          p_content_duration_seconds: number
          p_creator_id: number
          p_emotional_hook: string
          p_social_cause_tag: string
          p_video_url: string
        }
        Returns: Json
      }
      generate_query_plan: {
        Args: { p_query: string }
        Returns: {
          execution_time: number
          planning_time: number
          query_plan: string
        }[]
      }
      generate_ticket_confirmation: { Args: never; Returns: string }
      get_current_user_id: { Args: never; Returns: string }
      is_admin: { Args: never; Returns: boolean }
      is_allowed_region: { Args: never; Returns: boolean }
      log_migration_attempt: {
        Args: { p_description: string; p_success: boolean; p_version: string }
        Returns: undefined
      }
      migrate_sign_language_support: { Args: never; Returns: boolean }
      process_educational_video: {
        Args: { p_processor_id: string; p_video_id: number }
        Returns: Json
      }
      pseudonymize_data: {
        Args: { p_data: Json; p_salt?: string }
        Returns: Json
      }
      record_video_interaction: {
        Args: {
          p_interaction_type: string
          p_user_id: string
          p_video_id: number
          p_view_duration_seconds?: number
        }
        Returns: Json
      }
      register_agent: {
        Args: { agent_id: string; agent_name: string; agent_spec?: Json }
        Returns: Json
      }
      register_content_creator: {
        Args: {
          p_avatar_preference: string
          p_background_context?: Json
          p_communication_styles: string[]
          p_creator_types: string[]
          p_representation_tags: string[]
          p_user_id: string
        }
        Returns: Json
      }
      run_performance_test_suite: {
        Args: never
        Returns: {
          baseline_ms: number
          improvement_percentage: number
          optimized_ms: number
          query_name: string
        }[]
      }
      semantic_search_insights: {
        Args: { p_limit?: number; p_min_similarity?: number; p_query: string }
        Returns: {
          id: string
          similarity: number
          title: string
          topic: string
        }[]
      }
      submit_educational_video: {
        Args: {
          p_content_creator_id: string
          p_content_type: string
          p_education_level: string
          p_sign_language_mode: string
          p_subject_area: string
          p_video_url: string
        }
        Returns: Json
      }
      sync_user_identity: {
        Args: {
          p_platform: string
          p_platform_user_id: string
          p_user_id: string
        }
        Returns: Json
      }
      track_viral_impact: {
        Args: {
          p_comment_depth: number
          p_micro_content_id: number
          p_share_count: number
        }
        Returns: Json
      }
      transfer_funds: {
        Args: {
          destination_account_id: number
          source_account_id: number
          transfer_amount: number
          transfer_currency: string
        }
        Returns: Json
      }
      unregister_agent: { Args: { agent_id: string }; Returns: Json }
      update_missing_embeddings: { Args: never; Returns: undefined }
      update_risk_scoring_config: {
        Args: { p_config: Json; p_review_notes?: string }
        Returns: string
      }
      upload_content_segment: {
        Args: {
          p_content_style: string
          p_contextual_tags?: string[]
          p_creator_id: number
          p_target_age_groups: unknown
          p_target_deaf_experience_levels: string[]
          p_topic_domains: string[]
          p_video_url: string
        }
        Returns: Json
      }
      upload_video_content: {
        Args: {
          p_category: string
          p_creator_id: string
          p_description: string
          p_has_captions?: boolean
          p_has_sign_language?: boolean
          p_title: string
          p_video_url: string
        }
        Returns: Json
      }
    }
    Enums: {
      accessibility_mode: "ASL" | "LSF" | "BSL" | "Captions" | "Multilingual"
      assistive_tech_preference:
        | "Hearing_Aid"
        | "Cochlear_Implant"
        | "Caption_Devices"
        | "Visual_Alerts"
        | "FM_System"
        | "None"
      authmethod:
        | "email_password"
        | "sso"
        | "oauth_google"
        | "oauth_microsoft"
        | "sign_language_verification"
      AuthMethod: "SUPABASE" | "CLERK" | "WALLET"
      communication_mode:
        | "Sign_Language"
        | "Oral"
        | "Cued_Speech"
        | "Total_Communication"
        | "Bilingual"
        | "Tactile_Sign"
      contract_status:
        | "draft"
        | "pending"
        | "active"
        | "suspended"
        | "completed"
        | "disputed"
        | "terminated"
      deafidentity: "deaf" | "hard_of_hearing" | "hearing_ally" | "interpreter"
      DeafIdentity: "BLACK_DEAF" | "LATINX_DEAF" | "OTHER"
      interpretation_preference:
        | "Live_Interpreter"
        | "Video_Relay"
        | "Written_Translation"
        | "AI_Translation"
        | "None"
      sign_language_dialect:
        | "ASL"
        | "BSL"
        | "LSF"
        | "DGS"
        | "ISL"
        | "LIBRAS"
        | "CSL"
        | "JSL"
        | "SSL"
        | "other"
      sign_language_preference: "ASL" | "BSL" | "LSF" | "CSL" | "ISL" | "Other"
      sign_language_proficiency:
        | "none"
        | "beginner"
        | "conversational"
        | "native"
        | "professional"
      transaction_type:
        | "employment"
        | "service"
        | "product_sale"
        | "intellectual_property"
        | "collaboration"
        | "real_estate"
        | "investment"
        | "educational"
        | "healthcare"
        | "creative_work"
        | "deaf_community_service"
      trust_level: "Basic" | "Verified" | "Trusted" | "Admin"
      verification_status: "PENDING" | "VERIFIED" | "REJECTED"
      video_status: "uploaded" | "processing" | "transcribed" | "error"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  realtime: {
    Tables: {
      messages: {
        Row: {
          event: string | null
          extension: string
          id: string
          inserted_at: string
          payload: Json | null
          private: boolean | null
          topic: string
          updated_at: string
        }
        Insert: {
          event?: string | null
          extension: string
          id?: string
          inserted_at?: string
          payload?: Json | null
          private?: boolean | null
          topic: string
          updated_at?: string
        }
        Update: {
          event?: string | null
          extension?: string
          id?: string
          inserted_at?: string
          payload?: Json | null
          private?: boolean | null
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages_2025_10_07: {
        Row: {
          event: string | null
          extension: string
          id: string
          inserted_at: string
          payload: Json | null
          private: boolean | null
          topic: string
          updated_at: string
        }
        Insert: {
          event?: string | null
          extension: string
          id?: string
          inserted_at?: string
          payload?: Json | null
          private?: boolean | null
          topic: string
          updated_at?: string
        }
        Update: {
          event?: string | null
          extension?: string
          id?: string
          inserted_at?: string
          payload?: Json | null
          private?: boolean | null
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages_2025_10_08: {
        Row: {
          event: string | null
          extension: string
          id: string
          inserted_at: string
          payload: Json | null
          private: boolean | null
          topic: string
          updated_at: string
        }
        Insert: {
          event?: string | null
          extension: string
          id?: string
          inserted_at?: string
          payload?: Json | null
          private?: boolean | null
          topic: string
          updated_at?: string
        }
        Update: {
          event?: string | null
          extension?: string
          id?: string
          inserted_at?: string
          payload?: Json | null
          private?: boolean | null
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages_2025_10_09: {
        Row: {
          event: string | null
          extension: string
          id: string
          inserted_at: string
          payload: Json | null
          private: boolean | null
          topic: string
          updated_at: string
        }
        Insert: {
          event?: string | null
          extension: string
          id?: string
          inserted_at?: string
          payload?: Json | null
          private?: boolean | null
          topic: string
          updated_at?: string
        }
        Update: {
          event?: string | null
          extension?: string
          id?: string
          inserted_at?: string
          payload?: Json | null
          private?: boolean | null
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages_2025_10_10: {
        Row: {
          event: string | null
          extension: string
          id: string
          inserted_at: string
          payload: Json | null
          private: boolean | null
          topic: string
          updated_at: string
        }
        Insert: {
          event?: string | null
          extension: string
          id?: string
          inserted_at?: string
          payload?: Json | null
          private?: boolean | null
          topic: string
          updated_at?: string
        }
        Update: {
          event?: string | null
          extension?: string
          id?: string
          inserted_at?: string
          payload?: Json | null
          private?: boolean | null
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages_2025_10_11: {
        Row: {
          event: string | null
          extension: string
          id: string
          inserted_at: string
          payload: Json | null
          private: boolean | null
          topic: string
          updated_at: string
        }
        Insert: {
          event?: string | null
          extension: string
          id?: string
          inserted_at?: string
          payload?: Json | null
          private?: boolean | null
          topic: string
          updated_at?: string
        }
        Update: {
          event?: string | null
          extension?: string
          id?: string
          inserted_at?: string
          payload?: Json | null
          private?: boolean | null
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      schema_migrations: {
        Row: {
          inserted_at: string | null
          version: number
        }
        Insert: {
          inserted_at?: string | null
          version: number
        }
        Update: {
          inserted_at?: string | null
          version?: number
        }
        Relationships: []
      }
      subscription: {
        Row: {
          claims: Json
          claims_role: unknown
          created_at: string
          entity: unknown
          filters: Database["realtime"]["CompositeTypes"]["user_defined_filter"][]
          id: number
          subscription_id: string
        }
        Insert: {
          claims: Json
          claims_role?: unknown
          created_at?: string
          entity: unknown
          filters?: Database["realtime"]["CompositeTypes"]["user_defined_filter"][]
          id?: never
          subscription_id: string
        }
        Update: {
          claims?: Json
          claims_role?: unknown
          created_at?: string
          entity?: unknown
          filters?: Database["realtime"]["CompositeTypes"]["user_defined_filter"][]
          id?: never
          subscription_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      apply_rls: {
        Args: { max_record_bytes?: number; wal: Json }
        Returns: Database["realtime"]["CompositeTypes"]["wal_rls"][]
        SetofOptions: {
          from: "*"
          to: "wal_rls"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      broadcast_changes: {
        Args: {
          event_name: string
          level?: string
          new: Record<string, unknown>
          old: Record<string, unknown>
          operation: string
          table_name: string
          table_schema: string
          topic_name: string
        }
        Returns: undefined
      }
      build_prepared_statement_sql: {
        Args: {
          columns: Database["realtime"]["CompositeTypes"]["wal_column"][]
          entity: unknown
          prepared_statement_name: string
        }
        Returns: string
      }
      cast: { Args: { type_: unknown; val: string }; Returns: Json }
      check_equality_op: {
        Args: {
          op: Database["realtime"]["Enums"]["equality_op"]
          type_: unknown
          val_1: string
          val_2: string
        }
        Returns: boolean
      }
      is_visible_through_filters: {
        Args: {
          columns: Database["realtime"]["CompositeTypes"]["wal_column"][]
          filters: Database["realtime"]["CompositeTypes"]["user_defined_filter"][]
        }
        Returns: boolean
      }
      list_changes: {
        Args: {
          max_changes: number
          max_record_bytes: number
          publication: unknown
          slot_name: unknown
        }
        Returns: Database["realtime"]["CompositeTypes"]["wal_rls"][]
        SetofOptions: {
          from: "*"
          to: "wal_rls"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      quote_wal2json: { Args: { entity: unknown }; Returns: string }
      send: {
        Args: { event: string; payload: Json; private?: boolean; topic: string }
        Returns: undefined
      }
      to_regrole: { Args: { role_name: string }; Returns: unknown }
      topic: { Args: never; Returns: string }
    }
    Enums: {
      action: "INSERT" | "UPDATE" | "DELETE" | "TRUNCATE" | "ERROR"
      equality_op: "eq" | "neq" | "lt" | "lte" | "gt" | "gte" | "in"
    }
    CompositeTypes: {
      user_defined_filter: {
        column_name: string | null
        op: Database["realtime"]["Enums"]["equality_op"] | null
        value: string | null
      }
      wal_column: {
        name: string | null
        type_name: string | null
        type_oid: unknown
        value: Json | null
        is_pkey: boolean | null
        is_selectable: boolean | null
      }
      wal_rls: {
        wal: Json | null
        is_rls_enabled: boolean | null
        subscription_ids: string[] | null
        errors: string[] | null
      }
    }
  }
  referrals: {
    Tables: {
      external_referrals: {
        Row: {
          created_at: string | null
          id: number
          referral_context: Json | null
          referral_destination: string
          referral_source: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          referral_context?: Json | null
          referral_destination: string
          referral_source: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          referral_context?: Json | null
          referral_destination?: string
          referral_source?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  revenue: {
    Tables: {
      api_usage: {
        Row: {
          enterprise_tier: boolean | null
          id: string
          optimization_premium: number | null
          pricing_tier: string | null
          provider: string | null
          timestamp: string | null
          usage_amount: number | null
          user_id: string | null
        }
        Insert: {
          enterprise_tier?: boolean | null
          id?: string
          optimization_premium?: number | null
          pricing_tier?: string | null
          provider?: string | null
          timestamp?: string | null
          usage_amount?: number | null
          user_id?: string | null
        }
        Update: {
          enterprise_tier?: boolean | null
          id?: string
          optimization_premium?: number | null
          pricing_tier?: string | null
          provider?: string | null
          timestamp?: string | null
          usage_amount?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      data_licensing: {
        Row: {
          created_at: string | null
          customer_name: string | null
          data_asset_type: string | null
          id: string
          license_end_date: string | null
          license_start_date: string | null
          license_value: number | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          customer_name?: string | null
          data_asset_type?: string | null
          id?: string
          license_end_date?: string | null
          license_start_date?: string | null
          license_value?: number | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          customer_name?: string | null
          data_asset_type?: string | null
          id?: string
          license_end_date?: string | null
          license_start_date?: string | null
          license_value?: number | null
          status?: string | null
        }
        Relationships: []
      }
      platform_revenue: {
        Row: {
          contract_end_date: string | null
          contract_start_date: string | null
          created_at: string | null
          customer_id: string | null
          id: string
          recurring: boolean | null
          revenue_amount: number | null
          service_type: string | null
        }
        Insert: {
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          recurring?: boolean | null
          revenue_amount?: number | null
          service_type?: string | null
        }
        Update: {
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          recurring?: boolean | null
          revenue_amount?: number | null
          service_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  sign_language_support: {
    Tables: {
      conversation_contexts: {
        Row: {
          communication_preferences: Json | null
          complexity_score: number | null
          context_summary: string | null
          id: string
          last_interaction: string | null
          primary_language: string | null
          sentiment_score: number | null
          session_start: string | null
          signing_dialect: string | null
          total_interactions: number | null
          user_id: string | null
        }
        Insert: {
          communication_preferences?: Json | null
          complexity_score?: number | null
          context_summary?: string | null
          id?: string
          last_interaction?: string | null
          primary_language?: string | null
          sentiment_score?: number | null
          session_start?: string | null
          signing_dialect?: string | null
          total_interactions?: number | null
          user_id?: string | null
        }
        Update: {
          communication_preferences?: Json | null
          complexity_score?: number | null
          context_summary?: string | null
          id?: string
          last_interaction?: string | null
          primary_language?: string | null
          sentiment_score?: number | null
          session_start?: string | null
          signing_dialect?: string | null
          total_interactions?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      knowledge_mappings: {
        Row: {
          confidence_score: number | null
          id: string
          interpreted_query_hash: string | null
          last_matched_at: string | null
          matched_document_ids: string[] | null
        }
        Insert: {
          confidence_score?: number | null
          id?: string
          interpreted_query_hash?: string | null
          last_matched_at?: string | null
          matched_document_ids?: string[] | null
        }
        Update: {
          confidence_score?: number | null
          id?: string
          interpreted_query_hash?: string | null
          last_matched_at?: string | null
          matched_document_ids?: string[] | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_department: string | null
          conversation_context_id: string | null
          created_at: string | null
          english_text: string | null
          escalation_required: boolean | null
          human_interpreter_needed: boolean | null
          id: string
          original_sign_video_url: string | null
          priority_level: string | null
          semantic_interpretation: Json | null
          spanish_text: string | null
          status: string | null
          ticket_subtype: string | null
          ticket_type: string
          translated_text: string
          translation_confidence: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_department?: string | null
          conversation_context_id?: string | null
          created_at?: string | null
          english_text?: string | null
          escalation_required?: boolean | null
          human_interpreter_needed?: boolean | null
          id?: string
          original_sign_video_url?: string | null
          priority_level?: string | null
          semantic_interpretation?: Json | null
          spanish_text?: string | null
          status?: string | null
          ticket_subtype?: string | null
          ticket_type: string
          translated_text: string
          translation_confidence?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_department?: string | null
          conversation_context_id?: string | null
          created_at?: string | null
          english_text?: string | null
          escalation_required?: boolean | null
          human_interpreter_needed?: boolean | null
          id?: string
          original_sign_video_url?: string | null
          priority_level?: string | null
          semantic_interpretation?: Json | null
          spanish_text?: string | null
          status?: string | null
          ticket_subtype?: string | null
          ticket_type?: string
          translated_text?: string
          translation_confidence?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_conversation_context_id_fkey"
            columns: ["conversation_context_id"]
            isOneToOne: false
            referencedRelation: "conversation_contexts"
            referencedColumns: ["id"]
          },
        ]
      }
      translation_quality_logs: {
        Row: {
          correction_applied: boolean | null
          dialect_complexity_score: number | null
          id: string
          logged_at: string | null
          potential_misinterpretation_flags: Json | null
          reviewed_by_human: boolean | null
          semantic_match_score: number | null
          system_confidence_level: number | null
          ticket_id: string | null
          translation_accuracy: number | null
        }
        Insert: {
          correction_applied?: boolean | null
          dialect_complexity_score?: number | null
          id?: string
          logged_at?: string | null
          potential_misinterpretation_flags?: Json | null
          reviewed_by_human?: boolean | null
          semantic_match_score?: number | null
          system_confidence_level?: number | null
          ticket_id?: string | null
          translation_accuracy?: number | null
        }
        Update: {
          correction_applied?: boolean | null
          dialect_complexity_score?: number | null
          id?: string
          logged_at?: string | null
          potential_misinterpretation_flags?: Json | null
          reviewed_by_human?: boolean | null
          semantic_match_score?: number | null
          system_confidence_level?: number | null
          ticket_id?: string | null
          translation_accuracy?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "translation_quality_logs_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_accessibility_profiles: {
        Row: {
          additional_support_needs: Json | null
          communication_speed_preference: string | null
          preferred_follow_up_method: string[] | null
          preferred_sign_language: string | null
          regional_dialect: string | null
          user_id: string
        }
        Insert: {
          additional_support_needs?: Json | null
          communication_speed_preference?: string | null
          preferred_follow_up_method?: string[] | null
          preferred_sign_language?: string | null
          regional_dialect?: string | null
          user_id: string
        }
        Update: {
          additional_support_needs?: Json | null
          communication_speed_preference?: string | null
          preferred_follow_up_method?: string[] | null
          preferred_sign_language?: string | null
          regional_dialect?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  staging_validation: {
    Tables: {
      performance_test_matches: {
        Row: {
          assigned_by: string | null
          completed_at: string | null
          created_at: string | null
          creator_id: string | null
          deadline: string | null
          feedback: string | null
          id: string | null
          job_id: string | null
          rating: number | null
          status: Database["deaf_video"]["Enums"]["match_status"] | null
          video_id: string | null
        }
        Insert: {
          assigned_by?: string | null
          completed_at?: string | null
          created_at?: string | null
          creator_id?: string | null
          deadline?: string | null
          feedback?: string | null
          id?: string | null
          job_id?: string | null
          rating?: number | null
          status?: Database["deaf_video"]["Enums"]["match_status"] | null
          video_id?: string | null
        }
        Update: {
          assigned_by?: string | null
          completed_at?: string | null
          created_at?: string | null
          creator_id?: string | null
          deadline?: string | null
          feedback?: string | null
          id?: string | null
          job_id?: string | null
          rating?: number | null
          status?: Database["deaf_video"]["Enums"]["match_status"] | null
          video_id?: string | null
        }
        Relationships: []
      }
      performance_test_profiles: {
        Row: {
          accessibility_preference: string | null
          created_at: string | null
          id: number | null
          updated_at: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          accessibility_preference?: string | null
          created_at?: string | null
          id?: number | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          accessibility_preference?: string | null
          created_at?: string | null
          id?: number | null
          updated_at?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      performance_test_videos: {
        Row: {
          accessibility_features: string[] | null
          asl_summary: string | null
          complexity_level: number | null
          content_warnings: string[] | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          duration_seconds: number | null
          fibonrose_score: number | null
          file_size_bytes: number | null
          id: string | null
          language: string | null
          status: Database["deaf_video"]["Enums"]["video_status"] | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          accessibility_features?: string[] | null
          asl_summary?: string | null
          complexity_level?: number | null
          content_warnings?: string[] | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          duration_seconds?: number | null
          fibonrose_score?: number | null
          file_size_bytes?: number | null
          id?: string | null
          language?: string | null
          status?: Database["deaf_video"]["Enums"]["video_status"] | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          accessibility_features?: string[] | null
          asl_summary?: string | null
          complexity_level?: number | null
          content_warnings?: string[] | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          duration_seconds?: number | null
          fibonrose_score?: number | null
          file_size_bytes?: number | null
          id?: string | null
          language?: string | null
          status?: Database["deaf_video"]["Enums"]["video_status"] | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string | null
        }
        Relationships: []
      }
      buckets_analytics: {
        Row: {
          created_at: string
          format: string
          id: string
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          format?: string
          id: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          format?: string
          id?: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          level: number | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      prefixes: {
        Row: {
          bucket_id: string
          created_at: string | null
          level: number
          name: string
          updated_at: string | null
        }
        Insert: {
          bucket_id: string
          created_at?: string | null
          level?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string
          created_at?: string | null
          level?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prefixes_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_prefixes: {
        Args: { _bucket_id: string; _name: string }
        Returns: undefined
      }
      can_insert_object: {
        Args: { bucketid: string; metadata: Json; name: string; owner: string }
        Returns: undefined
      }
      delete_leaf_prefixes: {
        Args: { bucket_ids: string[]; names: string[] }
        Returns: undefined
      }
      delete_prefix: {
        Args: { _bucket_id: string; _name: string }
        Returns: boolean
      }
      extension: { Args: { name: string }; Returns: string }
      filename: { Args: { name: string }; Returns: string }
      foldername: { Args: { name: string }; Returns: string[] }
      get_level: { Args: { name: string }; Returns: number }
      get_prefix: { Args: { name: string }; Returns: string }
      get_prefixes: { Args: { name: string }; Returns: string[] }
      get_size_by_bucket: {
        Args: never
        Returns: {
          bucket_id: string
          size: number
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
          prefix_param: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_token?: string
          prefix_param: string
          start_after?: string
        }
        Returns: {
          id: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      lock_top_prefixes: {
        Args: { bucket_ids: string[]; names: string[] }
        Returns: undefined
      }
      operation: { Args: never; Returns: string }
      search: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_legacy_v1: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_v1_optimised: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_v2: {
        Args: {
          bucket_name: string
          levels?: number
          limits?: number
          prefix: string
          sort_column?: string
          sort_column_after?: string
          sort_order?: string
          start_after?: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      buckettype: "STANDARD" | "ANALYTICS"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  supabase_functions: {
    Tables: {
      hooks: {
        Row: {
          created_at: string
          hook_name: string
          hook_table_id: number
          id: number
          request_id: number | null
        }
        Insert: {
          created_at?: string
          hook_name: string
          hook_table_id: number
          id?: number
          request_id?: number | null
        }
        Update: {
          created_at?: string
          hook_name?: string
          hook_table_id?: number
          id?: number
          request_id?: number | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          inserted_at: string
          version: string
        }
        Insert: {
          inserted_at?: string
          version: string
        }
        Update: {
          inserted_at?: string
          version?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  team_sync: {
    Tables: {
      task_comments: {
        Row: {
          comment_text: string
          created_at: string | null
          id: number
          metadata: Json | null
          task_id: number | null
          user_id: string | null
        }
        Insert: {
          comment_text: string
          created_at?: string | null
          id?: never
          metadata?: Json | null
          task_id?: number | null
          user_id?: string | null
        }
        Update: {
          comment_text?: string
          created_at?: string | null
          id?: never
          metadata?: Json | null
          task_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "task_comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_dependencies: {
        Row: {
          blocking_task_id: number | null
          dependency_type: string | null
          dependent_task_id: number | null
          id: number
        }
        Insert: {
          blocking_task_id?: number | null
          dependency_type?: string | null
          dependent_task_id?: number | null
          id?: never
        }
        Update: {
          blocking_task_id?: number | null
          dependency_type?: string | null
          dependent_task_id?: number | null
          id?: never
        }
        Relationships: [
          {
            foreignKeyName: "task_dependencies_blocking_task_id_fkey"
            columns: ["blocking_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_dependencies_dependent_task_id_fkey"
            columns: ["dependent_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          complexity: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          due_date: string | null
          estimated_hours: number | null
          id: number
          metadata: Json | null
          priority: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          complexity?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: never
          metadata?: Json | null
          priority?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          complexity?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: never
          metadata?: Json | null
          priority?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          id: string
          joined_at: string | null
          role: string | null
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          id: string
          joined_at?: string | null
          role?: string | null
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          joined_at?: string | null
          role?: string | null
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  tsaba: {
    Tables: {
      users: {
        Row: {
          account_type: string | null
          capabilities: Json | null
          communication_modes: string[] | null
          consent_preferences: Json | null
          country: string | null
          created_at: string | null
          display_name: Json | null
          email: string
          global_user_id: string | null
          id: string
          international_id: string | null
          language_capabilities: Json | null
          last_login: string | null
          preferred_locales: string[] | null
          region: string | null
          roles: string[] | null
          spoken_languages: string[] | null
          status: string | null
          tax_identification: Json | null
          timezone: string | null
          username: string
        }
        Insert: {
          account_type?: string | null
          capabilities?: Json | null
          communication_modes?: string[] | null
          consent_preferences?: Json | null
          country?: string | null
          created_at?: string | null
          display_name?: Json | null
          email: string
          global_user_id?: string | null
          id?: string
          international_id?: string | null
          language_capabilities?: Json | null
          last_login?: string | null
          preferred_locales?: string[] | null
          region?: string | null
          roles?: string[] | null
          spoken_languages?: string[] | null
          status?: string | null
          tax_identification?: Json | null
          timezone?: string | null
          username: string
        }
        Update: {
          account_type?: string | null
          capabilities?: Json | null
          communication_modes?: string[] | null
          consent_preferences?: Json | null
          country?: string | null
          created_at?: string | null
          display_name?: Json | null
          email?: string
          global_user_id?: string | null
          id?: string
          international_id?: string | null
          language_capabilities?: Json | null
          last_login?: string | null
          preferred_locales?: string[] | null
          region?: string | null
          roles?: string[] | null
          spoken_languages?: string[] | null
          status?: string | null
          tax_identification?: Json | null
          timezone?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  universal_contracts: {
    Tables: {
      transaction_interactions: {
        Row: {
          actor_wallet: string
          blockchain_network: string | null
          id: string
          interaction_hash: string | null
          interaction_type: string | null
          milestone_number: number | null
          occurred_at: string | null
          progress_percentage: number | null
          transaction_id: string | null
        }
        Insert: {
          actor_wallet: string
          blockchain_network?: string | null
          id?: string
          interaction_hash?: string | null
          interaction_type?: string | null
          milestone_number?: number | null
          occurred_at?: string | null
          progress_percentage?: number | null
          transaction_id?: string | null
        }
        Update: {
          actor_wallet?: string
          blockchain_network?: string | null
          id?: string
          interaction_hash?: string | null
          interaction_type?: string | null
          milestone_number?: number | null
          occurred_at?: string | null
          progress_percentage?: number | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_interactions_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transaction_registry"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction_registry: {
        Row: {
          arbitration_mechanism: string | null
          blockchain_network: string | null
          communication_preferences: Json | null
          compliance_requirements: Json | null
          conditions: Json | null
          contract_type: Database["public"]["Enums"]["transaction_type"]
          counterparty_wallet: string
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          initiator_wallet: string
          interpreter_required: boolean | null
          jurisdiction: string | null
          last_updated: string | null
          milestones: Json | null
          sign_language_accessibility: boolean | null
          status: Database["public"]["Enums"]["contract_status"] | null
          terms: Json
          title: string
          total_value: number | null
          transaction_hash: string | null
          version: number | null
        }
        Insert: {
          arbitration_mechanism?: string | null
          blockchain_network?: string | null
          communication_preferences?: Json | null
          compliance_requirements?: Json | null
          conditions?: Json | null
          contract_type: Database["public"]["Enums"]["transaction_type"]
          counterparty_wallet: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          initiator_wallet: string
          interpreter_required?: boolean | null
          jurisdiction?: string | null
          last_updated?: string | null
          milestones?: Json | null
          sign_language_accessibility?: boolean | null
          status?: Database["public"]["Enums"]["contract_status"] | null
          terms: Json
          title: string
          total_value?: number | null
          transaction_hash?: string | null
          version?: number | null
        }
        Update: {
          arbitration_mechanism?: string | null
          blockchain_network?: string | null
          communication_preferences?: Json | null
          compliance_requirements?: Json | null
          conditions?: Json | null
          contract_type?: Database["public"]["Enums"]["transaction_type"]
          counterparty_wallet?: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          initiator_wallet?: string
          interpreter_required?: boolean | null
          jurisdiction?: string | null
          last_updated?: string | null
          milestones?: Json | null
          sign_language_accessibility?: boolean | null
          status?: Database["public"]["Enums"]["contract_status"] | null
          terms?: Json
          title?: string
          total_value?: number | null
          transaction_hash?: string | null
          version?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  user_metadata: {
    Tables: {
      profile: {
        Row: {
          accessibility_requirements: Json | null
          assistive_technologies: string[] | null
          captioning_needed: boolean | null
          communication_speed: string | null
          community_involvement: string[] | null
          created_at: string | null
          cultural_affiliations: string[] | null
          current_profession: string | null
          data_sharing_consent: boolean | null
          date_of_birth: string | null
          deaf_identity:
            | Database["user_metadata"]["Enums"]["deaf_identity"]
            | null
          educational_institutions: string[] | null
          first_name: string | null
          gender: string | null
          hearing_loss_percentage: number | null
          hearing_status:
            | Database["user_metadata"]["Enums"]["hearing_status"]
            | null
          highest_education_level: string | null
          id: string
          identity_verified: boolean | null
          industry: string | null
          interpreter_needed: boolean | null
          last_name: string | null
          last_updated: string | null
          preferred_contact_method: string | null
          preferred_name: string | null
          preferred_sign_languages: string[] | null
          primary_communication_mode:
            | Database["user_metadata"]["Enums"]["communication_mode"]
            | null
          profile_visibility: string | null
          pronouns: string | null
          secondary_communication_modes:
            | Database["user_metadata"]["Enums"]["communication_mode"][]
            | null
          sign_language_proficiency: Json | null
          spoken_languages: string[] | null
          user_id: string
          verification_method: string | null
          years_of_experience: number | null
        }
        Insert: {
          accessibility_requirements?: Json | null
          assistive_technologies?: string[] | null
          captioning_needed?: boolean | null
          communication_speed?: string | null
          community_involvement?: string[] | null
          created_at?: string | null
          cultural_affiliations?: string[] | null
          current_profession?: string | null
          data_sharing_consent?: boolean | null
          date_of_birth?: string | null
          deaf_identity?:
            | Database["user_metadata"]["Enums"]["deaf_identity"]
            | null
          educational_institutions?: string[] | null
          first_name?: string | null
          gender?: string | null
          hearing_loss_percentage?: number | null
          hearing_status?:
            | Database["user_metadata"]["Enums"]["hearing_status"]
            | null
          highest_education_level?: string | null
          id?: string
          identity_verified?: boolean | null
          industry?: string | null
          interpreter_needed?: boolean | null
          last_name?: string | null
          last_updated?: string | null
          preferred_contact_method?: string | null
          preferred_name?: string | null
          preferred_sign_languages?: string[] | null
          primary_communication_mode?:
            | Database["user_metadata"]["Enums"]["communication_mode"]
            | null
          profile_visibility?: string | null
          pronouns?: string | null
          secondary_communication_modes?:
            | Database["user_metadata"]["Enums"]["communication_mode"][]
            | null
          sign_language_proficiency?: Json | null
          spoken_languages?: string[] | null
          user_id: string
          verification_method?: string | null
          years_of_experience?: number | null
        }
        Update: {
          accessibility_requirements?: Json | null
          assistive_technologies?: string[] | null
          captioning_needed?: boolean | null
          communication_speed?: string | null
          community_involvement?: string[] | null
          created_at?: string | null
          cultural_affiliations?: string[] | null
          current_profession?: string | null
          data_sharing_consent?: boolean | null
          date_of_birth?: string | null
          deaf_identity?:
            | Database["user_metadata"]["Enums"]["deaf_identity"]
            | null
          educational_institutions?: string[] | null
          first_name?: string | null
          gender?: string | null
          hearing_loss_percentage?: number | null
          hearing_status?:
            | Database["user_metadata"]["Enums"]["hearing_status"]
            | null
          highest_education_level?: string | null
          id?: string
          identity_verified?: boolean | null
          industry?: string | null
          interpreter_needed?: boolean | null
          last_name?: string | null
          last_updated?: string | null
          preferred_contact_method?: string | null
          preferred_name?: string | null
          preferred_sign_languages?: string[] | null
          primary_communication_mode?:
            | Database["user_metadata"]["Enums"]["communication_mode"]
            | null
          profile_visibility?: string | null
          pronouns?: string | null
          secondary_communication_modes?:
            | Database["user_metadata"]["Enums"]["communication_mode"][]
            | null
          sign_language_proficiency?: Json | null
          spoken_languages?: string[] | null
          user_id?: string
          verification_method?: string | null
          years_of_experience?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      community_profiles: {
        Row: {
          current_profession: string | null
          deaf_identity:
            | Database["user_metadata"]["Enums"]["deaf_identity"]
            | null
          first_name: string | null
          hearing_status:
            | Database["user_metadata"]["Enums"]["hearing_status"]
            | null
          id: string | null
          industry: string | null
          preferred_name: string | null
          preferred_sign_languages: string[] | null
          primary_communication_mode:
            | Database["user_metadata"]["Enums"]["communication_mode"]
            | null
        }
        Insert: {
          current_profession?: string | null
          deaf_identity?:
            | Database["user_metadata"]["Enums"]["deaf_identity"]
            | null
          first_name?: string | null
          hearing_status?:
            | Database["user_metadata"]["Enums"]["hearing_status"]
            | null
          id?: string | null
          industry?: string | null
          preferred_name?: string | null
          preferred_sign_languages?: string[] | null
          primary_communication_mode?:
            | Database["user_metadata"]["Enums"]["communication_mode"]
            | null
        }
        Update: {
          current_profession?: string | null
          deaf_identity?:
            | Database["user_metadata"]["Enums"]["deaf_identity"]
            | null
          first_name?: string | null
          hearing_status?:
            | Database["user_metadata"]["Enums"]["hearing_status"]
            | null
          id?: string | null
          industry?: string | null
          preferred_name?: string | null
          preferred_sign_languages?: string[] | null
          primary_communication_mode?:
            | Database["user_metadata"]["Enums"]["communication_mode"]
            | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_public_profile: {
        Args: { p_user_id: string }
        Returns: {
          current_profession: string
          deaf_identity: Database["user_metadata"]["Enums"]["deaf_identity"]
          first_name: string
          industry: string
          preferred_name: string
          primary_communication_mode: Database["user_metadata"]["Enums"]["communication_mode"]
        }[]
      }
    }
    Enums: {
      communication_mode:
        | "ASL"
        | "Signed English"
        | "Oral"
        | "Cued Speech"
        | "Total Communication"
        | "Tactile Sign"
        | "Written Communication"
      deaf_identity:
        | "Deaf of Deaf"
        | "Hearing Family"
        | "Late Deafened"
        | "Hard of Hearing"
        | "Cochlear Implant Community"
        | "Sign Language User"
        | "Oral Deaf"
      hearing_status:
        | "Deaf"
        | "Hard of Hearing"
        | "Late Deafened"
        | "Cochlear Implant User"
        | "Hearing Aid User"
        | "Hearing"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  vault: {
    Tables: {
      secrets: {
        Row: {
          created_at: string
          description: string
          id: string
          key_id: string | null
          name: string | null
          nonce: string | null
          secret: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          key_id?: string | null
          name?: string | null
          nonce?: string | null
          secret: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          key_id?: string | null
          name?: string | null
          nonce?: string | null
          secret?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      decrypted_secrets: {
        Row: {
          created_at: string | null
          decrypted_secret: string | null
          description: string | null
          id: string | null
          key_id: string | null
          name: string | null
          nonce: string | null
          secret: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          decrypted_secret?: never
          description?: string | null
          id?: string | null
          key_id?: string | null
          name?: string | null
          nonce?: string | null
          secret?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          decrypted_secret?: never
          description?: string | null
          id?: string | null
          key_id?: string | null
          name?: string | null
          nonce?: string | null
          secret?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _crypto_aead_det_decrypt: {
        Args: {
          additional: string
          context?: string
          key_id: number
          message: string
          nonce?: string
        }
        Returns: string
      }
      _crypto_aead_det_encrypt: {
        Args: {
          additional: string
          context?: string
          key_id: number
          message: string
          nonce?: string
        }
        Returns: string
      }
      _crypto_aead_det_noncegen: { Args: never; Returns: string }
      create_secret: {
        Args: {
          new_description?: string
          new_key_id?: string
          new_name?: string
          new_secret: string
        }
        Returns: string
      }
      update_secret: {
        Args: {
          new_description?: string
          new_key_id?: string
          new_name?: string
          new_secret?: string
          secret_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  vr4deaf: {
    Tables: {
      accessibility_feedback: {
        Row: {
          created_at: string | null
          detailed_feedback: string | null
          experience_id: string | null
          feedback_type: string | null
          id: string
          rating: number | null
          suggested_improvement: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          detailed_feedback?: string | null
          experience_id?: string | null
          feedback_type?: string | null
          id?: string
          rating?: number | null
          suggested_improvement?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          detailed_feedback?: string | null
          experience_id?: string | null
          feedback_type?: string | null
          id?: string
          rating?: number | null
          suggested_improvement?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accessibility_feedback_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accessibility_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_interpreters: {
        Row: {
          availability: Json | null
          certification_level: string | null
          created_at: string | null
          hourly_rate: number | null
          id: string
          sign_language_expertise:
            | Database["vr4deaf"]["Enums"]["accessibility_mode"][]
            | null
          specialization: string[] | null
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          availability?: Json | null
          certification_level?: string | null
          created_at?: string | null
          hourly_rate?: number | null
          id?: string
          sign_language_expertise?:
            | Database["vr4deaf"]["Enums"]["accessibility_mode"][]
            | null
          specialization?: string[] | null
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          availability?: Json | null
          certification_level?: string | null
          created_at?: string | null
          hourly_rate?: number | null
          id?: string
          sign_language_expertise?:
            | Database["vr4deaf"]["Enums"]["accessibility_mode"][]
            | null
          specialization?: string[] | null
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "community_interpreters_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          attendance_status: string | null
          event_id: string | null
          id: string
          registration_time: string | null
          user_id: string | null
        }
        Insert: {
          attendance_status?: string | null
          event_id?: string | null
          id?: string
          registration_time?: string | null
          user_id?: string | null
        }
        Update: {
          attendance_status?: string | null
          event_id?: string | null
          id?: string
          registration_time?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "virtual_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_embeddings: {
        Row: {
          created_at: string | null
          embedding: string | null
          embedding_model: string | null
          experience_id: string
        }
        Insert: {
          created_at?: string | null
          embedding?: string | null
          embedding_model?: string | null
          experience_id: string
        }
        Update: {
          created_at?: string | null
          embedding?: string | null
          embedding_model?: string | null
          experience_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_embeddings_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: true
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          accessibility_modes: Database["vr4deaf"]["Enums"]["accessibility_mode"][]
          content_rating: Database["vr4deaf"]["Enums"]["content_rating"] | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          device_compatibility: Database["vr4deaf"]["Enums"]["device_compatibility"][]
          difficulty_level: number | null
          duration_minutes: number | null
          experience_type: Database["vr4deaf"]["Enums"]["experience_type"]
          id: string
          interaction_types:
            | Database["vr4deaf"]["Enums"]["interaction_type"][]
            | null
          is_verified: boolean | null
          language_support: string[] | null
          max_participants: number | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          vr_asset_url: string
        }
        Insert: {
          accessibility_modes: Database["vr4deaf"]["Enums"]["accessibility_mode"][]
          content_rating?: Database["vr4deaf"]["Enums"]["content_rating"] | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          device_compatibility: Database["vr4deaf"]["Enums"]["device_compatibility"][]
          difficulty_level?: number | null
          duration_minutes?: number | null
          experience_type: Database["vr4deaf"]["Enums"]["experience_type"]
          id?: string
          interaction_types?:
            | Database["vr4deaf"]["Enums"]["interaction_type"][]
            | null
          is_verified?: boolean | null
          language_support?: string[] | null
          max_participants?: number | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          vr_asset_url: string
        }
        Update: {
          accessibility_modes?: Database["vr4deaf"]["Enums"]["accessibility_mode"][]
          content_rating?: Database["vr4deaf"]["Enums"]["content_rating"] | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          device_compatibility?: Database["vr4deaf"]["Enums"]["device_compatibility"][]
          difficulty_level?: number | null
          duration_minutes?: number | null
          experience_type?: Database["vr4deaf"]["Enums"]["experience_type"]
          id?: string
          interaction_types?:
            | Database["vr4deaf"]["Enums"]["interaction_type"][]
            | null
          is_verified?: boolean | null
          language_support?: string[] | null
          max_participants?: number | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          vr_asset_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "experiences_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_experience_progress: {
        Row: {
          accessibility_feedback: Json | null
          completion_percentage: number | null
          end_time: string | null
          experience_id: string | null
          id: string
          notes: string | null
          score: number | null
          start_time: string | null
          user_id: string | null
        }
        Insert: {
          accessibility_feedback?: Json | null
          completion_percentage?: number | null
          end_time?: string | null
          experience_id?: string | null
          id?: string
          notes?: string | null
          score?: number | null
          start_time?: string | null
          user_id?: string | null
        }
        Update: {
          accessibility_feedback?: Json | null
          completion_percentage?: number | null
          end_time?: string | null
          experience_id?: string | null
          id?: string
          notes?: string | null
          score?: number | null
          start_time?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_experience_progress_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_experience_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          accessibility_needs: Json | null
          avatar_preferences: Json | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          hearing_status: string | null
          id: string
          last_active_at: string | null
          preferred_sign_language:
            | Database["vr4deaf"]["Enums"]["accessibility_mode"][]
            | null
          username: string
        }
        Insert: {
          accessibility_needs?: Json | null
          avatar_preferences?: Json | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          hearing_status?: string | null
          id: string
          last_active_at?: string | null
          preferred_sign_language?:
            | Database["vr4deaf"]["Enums"]["accessibility_mode"][]
            | null
          username: string
        }
        Update: {
          accessibility_needs?: Json | null
          avatar_preferences?: Json | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          hearing_status?: string | null
          id?: string
          last_active_at?: string | null
          preferred_sign_language?:
            | Database["vr4deaf"]["Enums"]["accessibility_mode"][]
            | null
          username?: string
        }
        Relationships: []
      }
      virtual_events: {
        Row: {
          accessibility_modes:
            | Database["vr4deaf"]["Enums"]["accessibility_mode"][]
            | null
          created_at: string | null
          description: string | null
          end_time: string
          event_type: string | null
          experience_id: string | null
          host_id: string | null
          id: string
          max_participants: number | null
          registration_required: boolean | null
          start_time: string
          title: string
        }
        Insert: {
          accessibility_modes?:
            | Database["vr4deaf"]["Enums"]["accessibility_mode"][]
            | null
          created_at?: string | null
          description?: string | null
          end_time: string
          event_type?: string | null
          experience_id?: string | null
          host_id?: string | null
          id?: string
          max_participants?: number | null
          registration_required?: boolean | null
          start_time: string
          title: string
        }
        Update: {
          accessibility_modes?:
            | Database["vr4deaf"]["Enums"]["accessibility_mode"][]
            | null
          created_at?: string | null
          description?: string | null
          end_time?: string
          event_type?: string | null
          experience_id?: string | null
          host_id?: string | null
          id?: string
          max_participants?: number | null
          registration_required?: boolean | null
          start_time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "virtual_events_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "virtual_events_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      recommend_experiences: {
        Args: { p_limit?: number; p_user_id: string }
        Returns: {
          recommended_experience_id: string
          similarity_score: number
        }[]
      }
    }
    Enums: {
      accessibility_mode:
        | "asl"
        | "bsl"
        | "international_sign"
        | "tactile_sign"
        | "cued_speech"
        | "visual_phonics"
      content_rating: "general" | "educational" | "mature" | "professional"
      device_compatibility:
        | "oculus_quest"
        | "htc_vive"
        | "valve_index"
        | "playstation_vr"
        | "windows_mixed_reality"
        | "mobile_ar"
      experience_type:
        | "educational"
        | "social"
        | "therapeutic"
        | "professional_training"
        | "cultural"
        | "entertainment"
        | "accessibility_simulation"
      interaction_type:
        | "avatar_interaction"
        | "sign_language_chat"
        | "gesture_recognition"
        | "haptic_feedback"
        | "lip_reading_simulation"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  web3: {
    Tables: {
      nft_collections: {
        Row: {
          collection_name: string
          collection_symbol: string
          collection_type: string | null
          contract_address: string
          created_at: string | null
          creator_wallet: string | null
          id: string
          last_updated: string | null
          network: string
          royalty_percentage: number | null
          thirdweb_drop_contract_id: string | null
        }
        Insert: {
          collection_name: string
          collection_symbol: string
          collection_type?: string | null
          contract_address: string
          created_at?: string | null
          creator_wallet?: string | null
          id?: string
          last_updated?: string | null
          network: string
          royalty_percentage?: number | null
          thirdweb_drop_contract_id?: string | null
        }
        Update: {
          collection_name?: string
          collection_symbol?: string
          collection_type?: string | null
          contract_address?: string
          created_at?: string | null
          creator_wallet?: string | null
          id?: string
          last_updated?: string | null
          network?: string
          royalty_percentage?: number | null
          thirdweb_drop_contract_id?: string | null
        }
        Relationships: []
      }
      nft_ownership: {
        Row: {
          acquired_at: string | null
          acquisition_price: number | null
          collection_id: string | null
          current_value: number | null
          id: string
          metadata: Json | null
          token_id: string
          user_id: string | null
        }
        Insert: {
          acquired_at?: string | null
          acquisition_price?: number | null
          collection_id?: string | null
          current_value?: number | null
          id?: string
          metadata?: Json | null
          token_id: string
          user_id?: string | null
        }
        Update: {
          acquired_at?: string | null
          acquisition_price?: number | null
          collection_id?: string | null
          current_value?: number | null
          id?: string
          metadata?: Json | null
          token_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nft_ownership_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "nft_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      token_holdings: {
        Row: {
          created_at: string | null
          id: string
          last_updated: string | null
          locked_balance: number | null
          network: string
          staked_amount: number | null
          staking_end_time: string | null
          staking_start_time: string | null
          staking_status: string | null
          thirdweb_contract_id: string | null
          token_contract_address: string
          token_name: string
          token_symbol: string
          token_type: string | null
          total_balance: number
          total_rewards_earned: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_updated?: string | null
          locked_balance?: number | null
          network: string
          staked_amount?: number | null
          staking_end_time?: string | null
          staking_start_time?: string | null
          staking_status?: string | null
          thirdweb_contract_id?: string | null
          token_contract_address: string
          token_name: string
          token_symbol: string
          token_type?: string | null
          total_balance?: number
          total_rewards_earned?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_updated?: string | null
          locked_balance?: number | null
          network?: string
          staked_amount?: number | null
          staking_end_time?: string | null
          staking_start_time?: string | null
          staking_status?: string | null
          thirdweb_contract_id?: string | null
          token_contract_address?: string
          token_name?: string
          token_symbol?: string
          token_type?: string | null
          total_balance?: number
          total_rewards_earned?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      wallet_connections: {
        Row: {
          created_at: string | null
          first_connected_at: string | null
          id: string
          last_connected_at: string | null
          networks: string[] | null
          thirdweb_connection_status: string | null
          thirdweb_wallet_id: string | null
          updated_at: string | null
          user_id: string | null
          verification_level: string | null
          wallet_address: string
          wallet_type: string | null
        }
        Insert: {
          created_at?: string | null
          first_connected_at?: string | null
          id?: string
          last_connected_at?: string | null
          networks?: string[] | null
          thirdweb_connection_status?: string | null
          thirdweb_wallet_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_level?: string | null
          wallet_address: string
          wallet_type?: string | null
        }
        Update: {
          created_at?: string | null
          first_connected_at?: string | null
          id?: string
          last_connected_at?: string | null
          networks?: string[] | null
          thirdweb_connection_status?: string | null
          thirdweb_wallet_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_level?: string | null
          wallet_address?: string
          wallet_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  accessibility: {
    Enums: {},
  },
  ai_models: {
    Enums: {},
  },
  cron: {
    Enums: {},
  },
  deaf_ecosystem: {
    Enums: {
      organization_type: [
        "school",
        "university",
        "nonprofit",
        "technology_company",
        "consulting_firm",
        "research_center",
        "advocacy_group",
        "interpreting_service",
        "healthcare_provider",
        "cultural_center",
        "startup",
        "government_agency",
        "educational_resource",
        "accessibility_service",
      ],
      service_category: [
        "education",
        "employment",
        "healthcare",
        "legal_support",
        "technology",
        "communication_services",
        "arts_culture",
        "social_support",
        "research",
        "accessibility",
        "sign_language_resources",
      ],
    },
  },
  deaf_storage: {
    Enums: {},
  },
  deaf_video: {
    Enums: {
      match_status: [
        "pending",
        "accepted",
        "completed",
        "rejected",
        "in_progress",
      ],
      video_status: ["uploading", "processing", "ready", "matched", "archived"],
    },
  },
  deafauth: {
    Enums: {
      verification_level: [
        "open_community",
        "basic_verified",
        "community_trusted",
        "officially_verified",
      ],
    },
  },
  deafauth_oauth: {
    Enums: {},
  },
  deafauth_sso: {
    Enums: {},
  },
  ecosystem: {
    Enums: {},
  },
  ecosystem_identity: {
    Enums: {},
  },
  fibonrose: {
    Enums: {
      nft_category: [
        "art",
        "performance",
        "educational",
        "community",
        "accessibility",
        "sign_language",
        "deaf_culture",
      ],
      nft_status: ["minted", "listed", "transferred", "burned", "locked"],
      trust_level: ["unverified", "basic", "verified", "trusted", "elite"],
    },
  },
  fibronrose: {
    Enums: {},
  },
  graphql: {
    Enums: {},
  },
  graphql_public: {
    Enums: {},
  },
  magician_agents: {
    Enums: {},
  },
  magicians: {
    Enums: {},
  },
  mbtq: {
    Enums: {
      coverage_type: [
        "health",
        "life",
        "disability",
        "property",
        "vision",
        "dental",
      ],
      disadvantaged_status: [
        "Not Applicable",
        "Person with a Disability (including Deafness)",
        "Woman",
        "Service-Disabled Veteran",
        "Other Disadvantaged Group",
      ],
      filing_status: [
        "single",
        "married_joint",
        "married_separate",
        "head_of_household",
        "qualifying_widow",
      ],
      industry: [
        "Technology",
        "Healthcare",
        "Green Energy",
        "Manufacturing",
        "Accessibility Tech",
        "Education",
        "Retail",
      ],
      referral_status: [
        "pending",
        "contacted",
        "in_progress",
        "completed",
        "closed",
      ],
      sba_focus_area: [
        "SBIR/STTR (Research & Development)",
        "Deaf and Hard-of-Hearing Community",
        "8(a) Business Development",
        "Veteran-Owned",
        "General Loan",
      ],
      service_type: [
        "tax_preparation",
        "financial_planning",
        "insurance_consultation",
        "legal_advice",
      ],
    },
  },
  net: {
    Enums: {
      request_status: ["PENDING", "SUCCESS", "ERROR"],
    },
  },
  performance: {
    Enums: {},
  },
  pgmq_public: {
    Enums: {},
  },
  pinksync: {
    Enums: {},
  },
  public: {
    Enums: {
      accessibility_mode: ["ASL", "LSF", "BSL", "Captions", "Multilingual"],
      assistive_tech_preference: [
        "Hearing_Aid",
        "Cochlear_Implant",
        "Caption_Devices",
        "Visual_Alerts",
        "FM_System",
        "None",
      ],
      authmethod: [
        "email_password",
        "sso",
        "oauth_google",
        "oauth_microsoft",
        "sign_language_verification",
      ],
      AuthMethod: ["SUPABASE", "CLERK", "WALLET"],
      communication_mode: [
        "Sign_Language",
        "Oral",
        "Cued_Speech",
        "Total_Communication",
        "Bilingual",
        "Tactile_Sign",
      ],
      contract_status: [
        "draft",
        "pending",
        "active",
        "suspended",
        "completed",
        "disputed",
        "terminated",
      ],
      deafidentity: ["deaf", "hard_of_hearing", "hearing_ally", "interpreter"],
      DeafIdentity: ["BLACK_DEAF", "LATINX_DEAF", "OTHER"],
      interpretation_preference: [
        "Live_Interpreter",
        "Video_Relay",
        "Written_Translation",
        "AI_Translation",
        "None",
      ],
      sign_language_dialect: [
        "ASL",
        "BSL",
        "LSF",
        "DGS",
        "ISL",
        "LIBRAS",
        "CSL",
        "JSL",
        "SSL",
        "other",
      ],
      sign_language_preference: ["ASL", "BSL", "LSF", "CSL", "ISL", "Other"],
      sign_language_proficiency: [
        "none",
        "beginner",
        "conversational",
        "native",
        "professional",
      ],
      transaction_type: [
        "employment",
        "service",
        "product_sale",
        "intellectual_property",
        "collaboration",
        "real_estate",
        "investment",
        "educational",
        "healthcare",
        "creative_work",
        "deaf_community_service",
      ],
      trust_level: ["Basic", "Verified", "Trusted", "Admin"],
      verification_status: ["PENDING", "VERIFIED", "REJECTED"],
      video_status: ["uploaded", "processing", "transcribed", "error"],
    },
  },
  realtime: {
    Enums: {
      action: ["INSERT", "UPDATE", "DELETE", "TRUNCATE", "ERROR"],
      equality_op: ["eq", "neq", "lt", "lte", "gt", "gte", "in"],
    },
  },
  referrals: {
    Enums: {},
  },
  revenue: {
    Enums: {},
  },
  sign_language_support: {
    Enums: {},
  },
  staging_validation: {
    Enums: {},
  },
  storage: {
    Enums: {
      buckettype: ["STANDARD", "ANALYTICS"],
    },
  },
  supabase_functions: {
    Enums: {},
  },
  team_sync: {
    Enums: {},
  },
  tsaba: {
    Enums: {},
  },
  universal_contracts: {
    Enums: {},
  },
  user_metadata: {
    Enums: {
      communication_mode: [
        "ASL",
        "Signed English",
        "Oral",
        "Cued Speech",
        "Total Communication",
        "Tactile Sign",
        "Written Communication",
      ],
      deaf_identity: [
        "Deaf of Deaf",
        "Hearing Family",
        "Late Deafened",
        "Hard of Hearing",
        "Cochlear Implant Community",
        "Sign Language User",
        "Oral Deaf",
      ],
      hearing_status: [
        "Deaf",
        "Hard of Hearing",
        "Late Deafened",
        "Cochlear Implant User",
        "Hearing Aid User",
        "Hearing",
      ],
    },
  },
  vault: {
    Enums: {},
  },
  vr4deaf: {
    Enums: {
      accessibility_mode: [
        "asl",
        "bsl",
        "international_sign",
        "tactile_sign",
        "cued_speech",
        "visual_phonics",
      ],
      content_rating: ["general", "educational", "mature", "professional"],
      device_compatibility: [
        "oculus_quest",
        "htc_vive",
        "valve_index",
        "playstation_vr",
        "windows_mixed_reality",
        "mobile_ar",
      ],
      experience_type: [
        "educational",
        "social",
        "therapeutic",
        "professional_training",
        "cultural",
        "entertainment",
        "accessibility_simulation",
      ],
      interaction_type: [
        "avatar_interaction",
        "sign_language_chat",
        "gesture_recognition",
        "haptic_feedback",
        "lip_reading_simulation",
      ],
    },
  },
  web3: {
    Enums: {},
  },
} as const
