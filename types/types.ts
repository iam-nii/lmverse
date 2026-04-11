import { routing } from "@/i18n/routing";
import { User, Session } from "@supabase/supabase-js";
export type Locale = (typeof routing.locales)[number];

export type MenuItemId =
  | "dashboard"
  | "courses"
  | "teachers"
  | "settings"
  | "profile"
  | "subscription";

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selected: MenuItemId; // current active menu item
  onSelect: (id: MenuItemId) => void; // callback when an item is clicked
}
export interface MainContentProps {
  selectedItem: MenuItemId;
}

export interface Tutor {
  id: string;
  about: string;
  experience: string;
  is_approved: boolean;
  email: string;
  full_name: string;
  phone_number: string;
  role: string;
  status: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
}

export interface Tutors {
  tutors: Tutor[];
}

export interface IStudent {
  id: string;
  about: string;
  email: string;
  full_name: string;
  phone_number: string;
  role: string;
  status: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
}

export interface Students {
  students: IStudent[];
}

export type AppRole = "admin" | "tutor" | "student" | "pending";

export type AuthState = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  role: AppRole | null; // Add role to store
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setRole: (role: AppRole | null) => void; // Add setRole action
  logout: () => void; // Add logout action
};

export type FormValues = {
  title: string;
  description: string;
  fileKey: string;
  price: number;
  level: string;
  smallDescription: string;
  slug: string;
  status: string;
};
