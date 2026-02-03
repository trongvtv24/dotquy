'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface AdminGuardProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

/**
 * Client-side admin guard component
 * Checks if user is authenticated and has admin role
 */
export function AdminGuard({ children, fallback }: AdminGuardProps) {
    const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthorized'>('loading')
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    useEffect(() => {
        async function checkAdmin() {
            const supabase = createClient()

            // Check if user is logged in
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                setStatus('unauthorized')
                router.push('/admin/login')
                return
            }

            setUser(user)

            // Check if user is admin
            const { data: profile } = await supabase
                .from('profiles')
                .select('is_admin')
                .eq('id', user.id)
                .single()

            const typedProfile = profile as { is_admin: boolean } | null
            if (!typedProfile || !typedProfile.is_admin) {
                setStatus('unauthorized')
                router.push('/admin/login?error=not_admin')
                return
            }

            setStatus('authenticated')
        }

        checkAdmin()
    }, [router])

    if (status === 'loading') {
        return fallback || (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin h-8 w-8 border-4 border-[--primary] border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-[--muted-foreground]">Đang kiểm tra quyền...</p>
                </div>
            </div>
        )
    }

    if (status === 'unauthorized') {
        return null // Will redirect
    }

    return <>{children}</>
}

/**
 * Hook to get current admin user
 */
export function useAdminUser() {
    const [user, setUser] = useState<User | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchUser() {
            const supabase = createClient()

            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                setUser(user)

                const { data: profile } = await supabase
                    .from('profiles')
                    .select('is_admin')
                    .eq('id', user.id)
                    .single()

                const typedProfile = profile as { is_admin: boolean } | null
                setIsAdmin(typedProfile?.is_admin || false)
            }

            setIsLoading(false)
        }

        fetchUser()
    }, [])

    return { user, isAdmin, isLoading }
}
