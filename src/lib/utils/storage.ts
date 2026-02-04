/**
 * LocalStorage Utilities (Simplified)
 * Type-safe helpers cho localStorage operations
 */

const STORAGE_KEYS = {
    FAST_ANSWERS: 'fastAnswers',
} as const

/**
 * Lấy giá trị từ localStorage (client-side only)
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue

    try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue
    } catch {
        return defaultValue
    }
}

/**
 * Lưu giá trị vào localStorage
 */
export function setStorageItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return

    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch {
        // Silently fail - localStorage might be full or disabled
    }
}

/**
 * Xóa item khỏi localStorage
 */
export function removeStorageItem(key: string): void {
    if (typeof window === 'undefined') return

    try {
        localStorage.removeItem(key)
    } catch {
        // Silently fail
    }
}

// FAST answers (sessionStorage for wizard state)
export interface FastAnswers {
    balance?: boolean
    eyes?: boolean
    face?: boolean
    arm?: boolean
    speech?: boolean
}

export function getFastAnswers(): FastAnswers {
    if (typeof window === 'undefined') return {}

    try {
        const item = sessionStorage.getItem(STORAGE_KEYS.FAST_ANSWERS)
        return item ? JSON.parse(item) : {}
    } catch {
        return {}
    }
}

export function setFastAnswers(answers: FastAnswers): void {
    if (typeof window === 'undefined') return

    try {
        sessionStorage.setItem(STORAGE_KEYS.FAST_ANSWERS, JSON.stringify(answers))
    } catch {
        // Silently fail
    }
}

export function clearFastAnswers(): void {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem(STORAGE_KEYS.FAST_ANSWERS)
}
