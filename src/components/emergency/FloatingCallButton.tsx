'use client'

interface FloatingCallButtonProps {
    className?: string
    size?: 'md' | 'lg'
    mode?: 'floating' | 'inline'
}

export function FloatingCallButton({
    className = '',
    size = 'lg',
    mode = 'floating'
}: FloatingCallButtonProps) {
    const phoneNumber = '115'
    const telLink = `tel:${phoneNumber}`

    const sizeStyles = {
        md: 'px-6 py-3 text-lg min-h-[52px]',
        lg: 'px-8 py-4 text-xl min-h-[64px]',
    }

    const wrapperClass = mode === 'floating'
        ? `floating-cta ${className}`
        : `${className}`

    const buttonClass = `
          w-full
          bg-[--emergency-red] hover:bg-[--emergency-red-dark]
          text-white font-bold
          rounded-xl
          inline-flex items-center justify-center gap-3
          shadow-xl
          transition-all duration-150
          ${sizeStyles[size]}
          ${mode === 'floating' ? 'animate-pulse' : ''}
    `

    return null;
}
