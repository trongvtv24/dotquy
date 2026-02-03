/**
 * Loading Skeleton Component
 * Dùng cho loading states trong app
 */

interface SkeletonProps {
    className?: string
    variant?: 'text' | 'circular' | 'rectangular'
    width?: string | number
    height?: string | number
}

export function Skeleton({
    className = '',
    variant = 'rectangular',
    width,
    height
}: SkeletonProps) {
    const baseClasses = 'animate-pulse bg-[--muted]'

    const variantClasses = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    }

    const style: React.CSSProperties = {}
    if (width) style.width = typeof width === 'number' ? `${width}px` : width
    if (height) style.height = typeof height === 'number' ? `${height}px` : height

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={style}
            aria-hidden="true"
        />
    )
}

/**
 * Card Skeleton - For loading cards
 */
export function CardSkeleton() {
    return (
        <div className="bg-[--background] rounded-xl border border-[--border] p-4">
            <div className="flex items-center gap-4">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="flex-1 space-y-2">
                    <Skeleton height={20} width="60%" />
                    <Skeleton height={16} width="40%" />
                </div>
            </div>
        </div>
    )
}

/**
 * Page Loading Skeleton
 */
export function PageSkeleton() {
    return (
        <div className="animate-pulse p-4 space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <Skeleton height={32} width="50%" />
                <Skeleton height={16} width="70%" />
            </div>

            {/* Content */}
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}

/**
 * Emergency Button Loading
 */
export function EmergencyButtonSkeleton() {
    return (
        <Skeleton
            className="w-full h-20 rounded-2xl"
            variant="rectangular"
        />
    )
}
