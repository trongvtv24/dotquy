'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { href: '/', label: 'Cấp cứu', icon: '🚨' },
    { href: '/fast', label: 'BE FAST', icon: '⚡' },
    { href: '/what-to-do-now', label: 'Làm gì', icon: '✓' },
    { href: '/learn', label: 'Học', icon: '📚' },
]

export function BottomNav() {
    const pathname = usePathname()

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-40 bg-[--background] border-t border-[--border] md:hidden"
            aria-label="Bottom navigation"
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
