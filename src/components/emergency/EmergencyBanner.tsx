import Link from 'next/link'

interface EmergencyBannerProps {
    message?: string
    showCallButton?: boolean
    phone?: string
    className?: string
}

export function EmergencyBanner({
    message = '🚨 Có dấu hiệu nghi ngờ đột quỵ! Gọi cấp cứu NGAY.',
    showCallButton = true,
    phone = '115',
    className = ''
}: EmergencyBannerProps) {
    return (
        <div
            role="alert"
            className={`
        bg-[--emergency-red] text-white
        py-4 px-6
        ${className}
      `}
        >
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="font-bold text-lg text-center md:text-left">
                    {message}
                </p>

                {showCallButton && (
                    <div className="flex items-center gap-3">
                        <Link
                            href="/call-script"
                            className="
                inline-flex items-center gap-2
                bg-white text-[--emergency-red]
                px-6 py-2 rounded-full
                font-bold text-lg
                hover:bg-gray-100 transition-colors
                min-h-[48px]
              "
                        >
                            📞 Nói gì khi gọi?
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

// Compact version for smaller spaces
export function EmergencyBannerCompact({
    className = ''
}: {
    className?: string
}) {
    return (
        <div
            role="alert"
            className={`
        bg-[--emergency-red] text-white
        py-2 px-4 text-center
        ${className}
      `}
        >
            <span className="font-medium">
                🚨 Nghi đột quỵ?
                <Link href="/call-script" className="underline font-bold ml-2 hover:no-underline">
                    Hãy đi cấp cứu ngay!
                </Link>
            </span>
        </div>
    )
}
