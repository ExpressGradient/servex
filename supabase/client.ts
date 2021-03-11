import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_ANON_KEY
);

interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
    email_verified: boolean;
    updated_at: Date;
}

export const addUser = async (user: User) => {
    return await supabase.from("users").insert([{ ...user }], { upsert: true });
};

export default supabase;
