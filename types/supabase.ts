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
      followed_marketers: {
        Row: {
          channel_id: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          channel_id?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          channel_id?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      marketer_accounts: {
        Row: {
          channel_id: string | null
          email: string | null
          id: number
          password_hash: string | null
          wallet_address: string | null
        }
        Insert: {
          channel_id?: string | null
          email?: string | null
          id?: number
          password_hash?: string | null
          wallet_address?: string | null
        }
        Update: {
          channel_id?: string | null
          email?: string | null
          id?: number
          password_hash?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      marketer_data: {
        Row: {
          average_peak_multiplier: number | null
          channel_id: string | null
          channel_link: string | null
          channel_name: string | null
          id: number
        }
        Insert: {
          average_peak_multiplier?: number | null
          channel_id?: string | null
          channel_link?: string | null
          channel_name?: string | null
          id?: number
        }
        Update: {
          average_peak_multiplier?: number | null
          channel_id?: string | null
          channel_link?: string | null
          channel_name?: string | null
          id?: number
        }
        Relationships: []
      }
      TelegramTokenData: {
        Row: {
          auto_update: number | null
          chain: string | null
          channel_id: string
          channel_link: string | null
          channel_name: string | null
          contract: string | null
          id: number
          initialMarketCap: number | null
          lastUpdated: string | null
          liquidity: number | null
          marketCap: number | null
          pair_name: string | null
          peak_multiplier: number | null
          priceHistory_12hr: number | null
          priceHistory_1hr: number | null
          priceHistory_24hr: number | null
          priceHistory_5min: number | null
        }
        Insert: {
          auto_update?: number | null
          chain?: string | null
          channel_id: string
          channel_link?: string | null
          channel_name?: string | null
          contract?: string | null
          id?: number
          initialMarketCap?: number | null
          lastUpdated?: string | null
          liquidity?: number | null
          marketCap?: number | null
          pair_name?: string | null
          peak_multiplier?: number | null
          priceHistory_12hr?: number | null
          priceHistory_1hr?: number | null
          priceHistory_24hr?: number | null
          priceHistory_5min?: number | null
        }
        Update: {
          auto_update?: number | null
          chain?: string | null
          channel_id?: string
          channel_link?: string | null
          channel_name?: string | null
          contract?: string | null
          id?: number
          initialMarketCap?: number | null
          lastUpdated?: string | null
          liquidity?: number | null
          marketCap?: number | null
          pair_name?: string | null
          peak_multiplier?: number | null
          priceHistory_12hr?: number | null
          priceHistory_1hr?: number | null
          priceHistory_24hr?: number | null
          priceHistory_5min?: number | null
        }
        Relationships: []
      }
      token_upvotes: {
        Row: {
          id: number
          token_contract: string | null
          upvote: number | null
          user_id: number | null
        }
        Insert: {
          id?: number
          token_contract?: string | null
          upvote?: number | null
          user_id?: number | null
        }
        Update: {
          id?: number
          token_contract?: string | null
          upvote?: number | null
          user_id?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          access_level: number | null
          id: string
          password_hash: string | null
          subscription_expires: string | null
          username: string | null
          wallet_address: string | null
        }
        Insert: {
          access_level?: number | null
          id?: string
          password_hash?: string | null
          subscription_expires?: string | null
          username?: string | null
          wallet_address?: string | null
        }
        Update: {
          access_level?: number | null
          id?: string
          password_hash?: string | null
          subscription_expires?: string | null
          username?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      my_view: {
        Row: {
          channel_name: string | null
        }
        Insert: {
          channel_name?: string | null
        }
        Update: {
          channel_name?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_channel_name: {
        Args: Record<PropertyKey, never>
        Returns: {
          channel_name: string
        }[]
      }
      get_channel_names: {
        Args: Record<PropertyKey, never>
        Returns: {
          channel_name: string
        }[]
      }
      get_marketers: {
        Args: {
          search_query: string
        }
        Returns: {
          channel_name: string
          channel_id: string
          channel_link: string
          average: number
        }[]
      }
      get_test: {
        Args: {
          tablename: string
        }
        Returns: {
          channel_name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
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
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
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
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
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
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
