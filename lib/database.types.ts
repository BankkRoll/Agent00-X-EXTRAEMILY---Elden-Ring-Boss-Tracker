export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bosses: {
        Row: {
          id: string;
          name: string;
          status: "Not Started" | "In Progress" | "Completed" | null;
          start_time: string | null;
          end_time: string | null;
          level_emily: number | null;
          level_agent: number | null;
          death_count_emily: number | null;
          death_count_agent: number | null;
          clip_link: string | null;
          order_index: number;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          status?: "Not Started" | "In Progress" | "Completed" | null;
          start_time?: string | null;
          end_time?: string | null;
          level_emily?: number | null;
          level_agent?: number | null;
          death_count_emily?: number | null;
          death_count_agent?: number | null;
          clip_link?: string | null;
          order_index: number;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          status?: "Not Started" | "In Progress" | "Completed" | null;
          start_time?: string | null;
          end_time?: string | null;
          level_emily?: number | null;
          level_agent?: number | null;
          death_count_emily?: number | null;
          death_count_agent?: number | null;
          clip_link?: string | null;
          order_index?: number;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      boss_status: "Not Started" | "In Progress" | "Completed";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Boss = Database["public"]["Tables"]["bosses"]["Row"];
export type BossInsert = Database["public"]["Tables"]["bosses"]["Insert"];
export type BossUpdate = Database["public"]["Tables"]["bosses"]["Update"];

export type BossStatus = "Not Started" | "In Progress" | "Completed";

export interface BossWithStats extends Boss {
  duration?: string | null;
  totalDeaths?: number;
  averageLevel?: number;
}

export interface BossFormData {
  name: string;
  status: BossStatus;
  start_time: string | null;
  end_time: string | null;
  level_emily: number;
  level_agent: number;
  death_count_emily: number;
  death_count_agent: number;
  clip_link: string | null;
  order_index: number;
}

export interface ProgressStats {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  completionPercentage: number;
  totalDeaths: number;
  averageLevelEmily: number;
  averageLevelAgent: number;
}

export interface BossFilters {
  status?: BossStatus | "all";
  search?: string;
}

export type BossSortField =
  | "name"
  | "status"
  | "order_index"
  | "created_at"
  | "updated_at";
export type BossSortOrder = "asc" | "desc";

export interface BossSort {
  field: BossSortField;
  order: BossSortOrder;
}
