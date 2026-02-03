'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface ToastProps {
    message: string
    type?: 'success' | 'error' | 'warning' | 'info'
    duration?: number
    onClose?: () => void
    isVisible: boolean
}

const typeStyles = {
    success: 'bg-green-600 text-white',
    error: 'bg-[--emergency-red] text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-600 text-white',
}

const typeIcons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ',
}

export function Toast({
    message,
    type = 'info',
    duration = 3000,
    onClose,
    isVisible
}: ToastProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (isVisible && duration > 0 && onClose) {
            const timer = setTimeout(onClose, duration)
            return () => clearTimeout(timer)
        }
    }, [isVisible, duration, onClose])

    if (!mounted || !isVisible) return null

    return createPortal(
        <div
            role="alert"
            aria-live="polite"
            className={`
        fixed bottom-24 left-1/2 -translate-x-1/2 z-50
        px-4 py-3 rounded-lg shadow-lg
        flex items-center gap-2
        animate-in slide-in-from-bottom-4 fade-in duration-300
        ${typeStyles[type]}
      `}
        >
            <span className="text-lg">{typeIcons[type]}</span>
            <span className="font-medium">{message}</span>
            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-2 p-1 hover:opacity-70 transition-opacity"
                    aria-label="Đóng thông báo"
                >
                    ✕
                </button>
            )}
        </div>,
        document.body
    )
}

// Toast hook for easier usage
export function useToast() {
    const [toast, setToast] = useState<Omit<ToastProps, 'isVisible' | 'onClose'> | null>(null)

    const showToast = (message: string, type: ToastProps['type'] = 'info', duration = 3000) => {
        setToast({ message, type, duration })
    }

    const hideToast = () => setToast(null)

    const ToastComponent = toast ? (
        <Toast
            {...toast}
            isVisible={true}
            onClose={hideToast}
        />
    ) : null

    return { showToast, hideToast, ToastComponent }
}
