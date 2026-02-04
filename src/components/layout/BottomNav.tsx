'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { href: '/', label: 'Trang chủ', icon: '🏠' },
    { href: '/fast', label: 'BE FAST', icon: '⚡' },
    { href: '/what-to-do-now', label: 'Làm gì', icon: '✓' },
]

export function BottomNav() {
    const pathname = usePathname()

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-40 bg-[--background]/95 backdrop-blur-sm border-t border-[--border] md:hidden safe-area-pb"
            aria-label="Bottom navigation"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map(item => {
                    const isActive = pathname === item.href ||
                        (item.href !== '/' && pathname.startsWith(item.href))

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                flex flex-col items-center justify-center
                min-w-[64px] min-h-[44px] px-2 py-1
                text-xs font-medium
                transition-colors
                ${isActive
                                    ? 'text-[--emergency-red]'
                                    : 'text-[--muted-foreground] hover:text-[--foreground]'
                                }
              `}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <span className="text-xl mb-0.5">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
