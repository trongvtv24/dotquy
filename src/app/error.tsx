'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log error to console (could send to error tracking service)
        console.error('App error:', error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="text-center">
                {/* Icon */}
                <div className="text-6xl mb-6">⚠️</div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-[--foreground] mb-4">
                    Đã có lỗi xảy ra
                </h1>

                {/* Description */}
                <p className="text-[--muted-foreground] mb-8 max-w-md mx-auto">
                    Xin lỗi, có lỗi khi tải trang. Vui lòng thử lại.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-[--primary] text-[--primary-foreground] rounded-xl font-bold shadow-md hover:opacity-90 transition-opacity"
                    >
                        🔄 Thử lại
                    </button>

                    <Link
                        href="/"
                        className="px-6 py-3 bg-[--muted] text-[--foreground] rounded-xl font-bold border border-[--border] hover:bg-[--border] transition-colors"
                    >
                        Về trang chủ
                    </Link>
                </div>

                {/* Emergency reminder */}
                <div className="mt-8 p-4 bg-[--muted] rounded-xl inline-block">
                    <p className="text-sm text-[--muted-foreground] mb-2">
                        Cần cấp cứu?
                    </p>
                    <a
                        href="tel:115"
                        className="inline-block px-6 py-3 bg-[--emergency-red] text-white rounded-xl font-bold"
                    >
                        📞 Gọi 115
                    </a>
                </div>
            </div>
        </div>
    )
}
