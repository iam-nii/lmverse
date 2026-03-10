"use client"
// Syncing zustand with supabase
import { ReactNode, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/AuthStore";

interface Props{
    children: ReactNode
}

export function AuthProvider({children}:Props){
    const setSession = useAuthStore((state)=>state.setSession);
    const supabase = createClient();

    useEffect(()=>{
        supabase.auth.getSession().then(({data})=>{
            setSession(data.session);
        })
        const {data: listener} = supabase.auth.onAuthStateChange((event, session)=>{
            setSession(session)
        })
        
        return ()=> listener.subscription.unsubscribe();
        
    },[])

    return children;
}