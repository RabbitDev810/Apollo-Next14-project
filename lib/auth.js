import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

export const SessionConnect = async ({req, res}) => {
  const supabase = createPagesServerClient({ req, res })
   try {
    const { data: { session } } = await supabase.auth.getSession()

    if(session) {
      return { session }
    } else {
      return { session: null }
    }

  } catch (error) {
    console.error("Error:", error.message);
    return { session: null };
  }
};
