'use client'

import { forwardRef, type ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'emergency' | 'secondary' | 'outline' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    fullWidth?: boolean
    isLoading?: boolean
}

const variantStyles = {
    primary: 'bg-[--primary] hover:opacity-90 text-[--primary-foreground] shadow-md',
    emergency: 'bg-[--emergency-red] hover:bg-[--emergency-red-dark] text-white shadow-lg',
    secondary: 'bg-[--muted] hover:bg-[--border] text-[--foreground] border border-[--border]',
    outline: 'bg-transparent hover:bg-[--muted] text-[--foreground] border border-[--border]',
    ghost: 'bg-transparent hover:bg-[--muted] text-[--foreground]',
    danger: 'bg-transparent hover:bg-red-50 text-[--emergency-red] border border-[--emergency-red]',
}

const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm min-h-[36px]',
    md: 'px-4 py-2 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[52px]',
    xl: 'px-8 py-4 text-xl min-h-[56px] font-bold',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        className = '',
        variant = 'secondary',
        size = 'md',
        fullWidth = false,
        isLoading = false,
        disabled,
        children,
        ...props
    }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={`
          inline-flex items-center justify-center gap-2
          font-semibold rounded-lg
          transition-all duration-150 ease-in-out
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--primary]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Đang tải...
                    </>
                ) : children}
            </button>
        )
    }
)

Button.displayName = 'Button'
