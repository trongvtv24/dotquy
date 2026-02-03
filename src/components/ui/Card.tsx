import { type ReactNode } from 'react'

export interface CardProps {
    children: ReactNode
    variant?: 'default' | 'outline' | 'filled' | 'emergency' | 'do' | 'dont'
    className?: string
    padding?: 'sm' | 'md' | 'lg'
}

const variantStyles = {
    default: 'bg-[--background] border border-[--border]',
    outline: 'bg-transparent border border-[--border]',
    filled: 'bg-[--muted] border-none',
    emergency: 'bg-[--emergency-red] text-white border-none',
    do: 'bg-[--background] border-l-4 border-l-[--emergency-green] border border-[--border]',
    dont: 'bg-[--background] border-l-4 border-l-[--emergency-red] border border-[--border]',
}

const paddingStyles = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
}

export function Card({
    children,
    variant = 'default',
    className = '',
    padding = 'md'
}: CardProps) {
    return (
        <div
            className={`
        rounded-xl shadow-sm
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${className}
      `}
        >
            {children}
        </div>
    )
}

// Card Header component
export function CardHeader({
    children,
    className = ''
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div className={`mb-3 ${className}`}>
            {children}
        </div>
    )
}

// Card Title component  
export function CardTitle({
    children,
    className = ''
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <h3 className={`text-lg font-bold text-[--foreground] ${className}`}>
            {children}
        </h3>
    )
}

// Card Content component
export function CardContent({
    children,
    className = ''
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div className={`text-[--foreground] ${className}`}>
            {children}
        </div>
    )
}
