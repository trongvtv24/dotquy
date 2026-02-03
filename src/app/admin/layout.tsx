'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminGuard, useAdminUser } from '@/components/admin'

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/emergency-contacts', label: 'Danh bạ cấp cứu', icon: '📞' },
    { href: '/admin/feedback', label: 'Góp ý', icon: '💬' },
]

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminGuard>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AdminGuard>
    )
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const { user } = useAdminUser()

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/admin/login')
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-[--muted]">
            {/* Top Bar */}
            <header className="bg-[--background] border-b border-[--border] sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="font-bold text-lg flex items-center gap-2">
                            <span className="text-xl">🚨</span>
                            <span className="text-[--emergency-red]">Admin</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-sm text-[--muted-foreground] hover:text-[--foreground]"
                            target="_blank"
                        >
                            Xem site →
                        </Link>

                        <div className="flex items-center gap-3">
                            <span className="text-sm text-[--muted-foreground]">
                                {user?.email}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-sm text-[--emergency-red] hover:underline"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto flex">
                {/* Sidebar */}
                <aside className="w-64 min-h-[calc(100vh-64px)] bg-[--background] border-r border-[--border] p-4 hidden md:block">
                    <nav className="space-y-1">
                        {navItems.map(item => {
                            const isActive = pathname === item.href ||
                                (item.href !== '/admin' && pathname.startsWith(item.href))

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-lg font-medium
                                        transition-colors
                                        ${isActive
                                            ? 'bg-[--primary] text-[--primary-foreground]'
                                            : 'text-[--foreground] hover:bg-[--muted]'
                                        }
                                    `}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
