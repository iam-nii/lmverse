import {createClient} from "@/lib/supabase/client";
import { tutorVerificationEmail } from "../email";

export async function VerifyTutor(id:string){
    const supabase = createClient();

    try{
        const {error} = await supabase
        .from('tutors')
        .update({
            is_approved:true,
            verified_at: new Date().toISOString()
        })
        .eq('user_id',id)
        if(error) throw error;

        // Get tutor details for email
        const {data:tutor} = await supabase
        .from('users')
        .select('*')
        .eq('id',id)
        .single()

        await tutorVerificationEmail(tutor.email, tutor.full_name);


        return {success: true}

    }catch(error){
        console.log('Verification failed:', error)

        if(error instanceof Error)
        return {success: false, error: error.message}

        return {success: false, error:String(error)}

    }

}

