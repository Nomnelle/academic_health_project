import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey);

// -------------- Base connexion with Supabase --------------

export async function signIn_Supabase(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if (error) {
        console.error('Error signing in Supabase :', error);
        return null;
    }

    return data;
}

export async function signOut_Supabase() {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.error('Error signing out Supabase :', error);
        return null;
    }
    return true;
}

export async function signUp_Supabase(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })
    if (error) {
        console.error('Error signing up Supabase :', error);
        return null;
    }

    return data;
}

export async function get_is_user_connected() {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.log('Utilisateur non connecté ou erreur de récupération Supabase :', userError);
        return null;
    }

    if (userData.user) {
        return true;
    } else {
        return false;
    }
}

// -------------- Supabase : Manage Rendez-vous --------------

export async function get_rendezvous(after_today : boolean = false) {
    const {data: userData, error: userError} = await supabase.auth.getUser();

    if (userError) {
        console.error('Utilisateur non connecté ou erreur de récupération Supabase:', userError);
        return null;
    }

    if (!userData) {
        console.error('Utilisateur non authentifié');
        return null;
    }

    if (after_today) {
        const { data, error } = await supabase
            .from('rendezvous')
            .select('*')
            .gt('date', new Date().toISOString())
        if (error) {
            console.error('Error fetching rendezvous Supabase:', error);
            return null;
        }
        return data;
    } else {
        const { data, error } = await supabase
            .from('rendezvous')
            .select('*')
        if (error) {
            console.error('Error fetching rendezvous Supabase :', error);
            return null;
        }
        return data;
    }
}

export async function addRendezvous(classic_user_id: string, adresse : string, start_date: string, end_date: string) {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error('Utilisateur non connecté ou erreur de récupération Supabase :', userError);
        return null;
    }

    const userId = userData.user.id;

    const { data, error } = await supabase
        .from('rendezvous')
        .insert([
            {
                user_id: classic_user_id,
                adresse: adresse,
                start_date: start_date,
                end_date: end_date,
                user_admin_id: userId
            }
        ]);

    if (error) {
        console.error('Erreur lors de l\'ajout du rendez-vous Supabase :', error);
        return null;
    }

    return data;

}

// -------------- Supabase : Manage Globalchat --------------

export async function send_message_globalchat(message: string) {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error('Utilisateur non connecté ou erreur de récupération Supabase :', userError);
        return null;
    }

    const userId = userData.user.id;

    const { data, error } = await supabase
        .from('globalchat')
        .insert([
            {
                message: message,
                id_user_admin: userId
            }
        ]);

    if (error) {
        console.error('Erreur lors de l\'envoi du message Supabase :', error);
        return null;
    }

    return data;
}

export async function get_globalchat() {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error('Utilisateur non connecté ou erreur de récupération Supabase :', userError);
        return null;
    }

    if (!userData) {
        console.error('Utilisateur non authentifié');
        return null;
    }

    const { data, error } = await supabase
        .from('globalchat')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
    if (error) {
        console.error('Erreur lors de la récupération des messages Supabase :', error);
        return null;
    }
    return data;
}
