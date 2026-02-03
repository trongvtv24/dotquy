'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui'

interface Stats {
    provinces: number
    contacts: number
    needsVerify: number
    feedback: number
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats>({
        provinces: 0,
        contacts: 0,
        needsVerify: 0,
        feedback: 0,
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadStats() {
            const supabase = createClient()

            // Get provinces count
            const { count: provincesCount } = await supabase
                .from('provinces')
                .select('*', { count: 'exact', head: true })

            // Get contacts count
            const { count: contactsCount } = await supabase
                .from('emergency_contacts')
                .select('*', { count: 'exact', head: true })

            // Get needs_verify count
            const { count: needsVerifyCount } = await supabase
                .from('emergency_contacts')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'needs_verify')

            // Get new feedback count
            const { count: feedbackCount } = await supabase
                .from('feedback')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'new')

            setStats({
                provinces: provincesCount || 0,
                contacts: contactsCount || 0,
                needsVerify: needsVerifyCount || 0,
                feedback: feedbackCount || 0,
            })
            setIsLoading(false)
        }

        loadStats()
    }, [])

    const statCards = [
        {
            label: 'Tỉnh/TP',
            value: stats.provinces,
            icon: '🗺️',
            color: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
        },
        {
            label: 'Số cấp cứu',
            value: stats.contacts,
            icon: '📞',
            href: '/admin/emergency-contacts',
            color: 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400',
        },
        {
            label: 'Cần xác minh',
            value: stats.needsVerify,
            icon: '⚠️',
            href: '/admin/emergency-contacts?status=needs_verify',
            color: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400',
        },
        {
            label: 'Góp ý mới',
            value: stats.feedback,
            icon: '💬',
            href: '/admin/feedback',
            color: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400',
        },
    ]

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map(item => (
                    <Card
                        key={item.label}
                        className={`p-6 ${item.color}`}
                    >
                        {item.href ? (
                            <Link href={item.href} className="block">
                                <div className="text-3xl mb-2">{item.icon}</div>
                                <div className="text-3xl font-bold mb-1">
                                    {isLoading ? '...' : item.value}
                                </div>
                                <div className="text-sm opacity-80">{item.label}</div>
                            </Link>
                        ) : (
                            <>
                                <div className="text-3xl mb-2">{item.icon}</div>
                                <div className="text-3xl font-bold mb-1">
                                    {isLoading ? '...' : item.value}
                                </div>
                                <div className="text-sm opacity-80">{item.label}</div>
                            </>
                        )}
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <h2 className="text-xl font-bold mb-4">Thao tác nhanh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/admin/emergency-contacts/new">
                    <Card className="p-4 hover:border-[--primary] transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="text-3xl">➕</div>
                            <div>
                                <h3 className="font-bold">Thêm số cấp cứu</h3>
                                <p className="text-sm text-[--muted-foreground]">
                                    Thêm số điện thoại cấp cứu mới
                                </p>
                            </div>
                        </div>
                    </Card>
                </Link>

                <Link href="/admin/emergency-contacts?status=needs_verify">
                    <Card className="p-4 hover:border-[--primary] transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="text-3xl">✅</div>
                            <div>
                                <h3 className="font-bold">Xác minh số điện thoại</h3>
                                <p className="text-sm text-[--muted-foreground]">
                                    {stats.needsVerify} số đang chờ xác minh
                                </p>
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>
        </div>
    )
}
