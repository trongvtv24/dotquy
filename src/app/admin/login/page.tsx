'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button, Card, Input } from '@/components/ui'
import Link from 'next/link'

export default function AdminLoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()

    // Check for error params
    const errorParam = searchParams.get('error')
    const errorMessage = errorParam === 'not_admin'
        ? 'Tài khoản này không có quyền admin.'
        : null

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const supabase = createClient()

            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (authError) {
                throw authError
            }

            if (!data.user) {
                throw new Error('Đăng nhập thất bại')
            }

            // Check if user is admin
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('is_admin')
                .eq('id', data.user.id)
                .single()

            if (profileError) {
                // Profile doesn't exist, create one
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await (supabase as any).from('profiles').insert([{
                    id: data.user.id,
                    is_admin: false,
                }])
                throw new Error('Tài khoản này không có quyền admin.')
            }

            const typedProfile = profile as { is_admin: boolean } | null
            if (!typedProfile?.is_admin) {
                await supabase.auth.signOut()
                throw new Error('Tài khoản này không có quyền admin.')
            }

            // Success - redirect to admin dashboard
            router.push('/admin')
            router.refresh()
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Đã có lỗi xảy ra')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[--muted]">
            <Card className="w-full max-w-md p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block mb-4">
                        <span className="text-3xl">🚨</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-[--foreground]">
                        Admin Login
                    </h1>
                    <p className="text-[--muted-foreground] mt-2">
                        DOTQUY.NHANH Administration
                    </p>
                </div>

                {/* Error Messages */}
                {(error || errorMessage) && (
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
                        {error || errorMessage}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1.5">
                            Email
                        </label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">
                            Mật khẩu
                        </label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                        isLoading={isLoading}
                    >
                        Đăng nhập
                    </Button>
                </form>

                {/* Back Link */}
                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-[--muted-foreground] hover:text-[--foreground]">
                        ← Về trang chủ
                    </Link>
                </div>
            </Card>
        </div>
    )
}
