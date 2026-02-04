'use client'

import Link from 'next/link'
import { useState } from 'react'

const navItems = [
    { href: '/', label: 'Trang chủ' },
    { href: '/fast', label: 'Test BE FAST' },
    { href: '/what-to-do-now', label: 'Cách xử lý' },
]

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-40 bg-[--background]/95 backdrop-blur-sm border-b border-[--border]">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-[--emergency-red] font-bold text-xl"
                    >
                        <span className="text-2xl">🚨</span>
                        <span>DOTQUY.NHANH</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-[--foreground] hover:text-[--emergency-red] transition-colors font-medium"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-[--foreground] hover:bg-[--muted] rounded-lg"
                        aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
                        aria-expanded={isMenuOpen}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-[--border] bg-[--background]">
                        {navItems.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block py-3 text-lg text-[--foreground] hover:text-[--emergency-red]"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    )
}
