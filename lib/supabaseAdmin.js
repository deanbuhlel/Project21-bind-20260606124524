import { createClient } from '@supabase/supabase-js';

// Note: This client is for server-side operations only.
// Never expose SUPABASE_SERVICE_ROLE_KEY to the client.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
