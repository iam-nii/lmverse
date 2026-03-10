import {create} from "zustand";
import { Session, User } from "@supabase/supabase-js";

type AuthState = {
    user: User | null
    session: Session | null
    loading: boolean 
    setSession: (session: Session | null) => void
}


export const useAuthStore = create<AuthState>((set)=>({
 user: null,
 session: null,
 loading: true,

//  Actions
 setSession: (session)=> set({
    session,
    user: session?.user ?? null,
    loading: false
 })
}))