import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
        console.error('Supabase credentials missing! Check environment variables.', {
            hasUrl: !!url,
            hasKey: !!key,
            env: process.env.NODE_ENV
        })
    }

    return createBrowserClient(url!, key!)
}
