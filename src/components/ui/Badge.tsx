import { type ReactNode } from 'react'

export interface BadgeProps {
    children: ReactNode
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
    size?: 'sm' | 'md'
    className?: string
}

const variantStyles = {
    default: 'bg-[--muted] text-[--foreground]',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
}

const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
}

export function Badge({
    children,
    variant = 'default',
    size = 'md',
    className = ''
}: BadgeProps) {
    return (
        <span
            className={`
        inline-flex items-center justify-center
        font-medium rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
        >
            {children}
        </span>
    )
}

// Verification status badge
export function VerificationBadge({
    status
}: {
    status: 'active' | 'needs_verify' | 'inactive'
}) {
    const configs = {
        active: { variant: 'success' as const, text: '✓ Đã xác minh' },
        needs_verify: { variant: 'warning' as const, text: '⚠ Cần xác minh' },
        inactive: { variant: 'danger' as const, text: '✗ Không hoạt động' },
    }

    const config = configs[status]

    return (
        <Badge variant={config.variant} size="sm">
            {config.text}
        </Badge>
    )
}
