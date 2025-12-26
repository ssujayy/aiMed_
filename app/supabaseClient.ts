import { createClient } from "@supabase/supabase-js";

export function createSupabase(session: any | null) {
  const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const token = await session!.getToken({ template: "supabase" });
          const headers = new Headers(options?.headers);
          headers.set("Authorization", `Bearer ${token}`);
          return fetch(url, { ...options, headers });
        },
      },
    }
  );

  return supabase;
}
