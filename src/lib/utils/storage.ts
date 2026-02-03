/**
 * LocalStorage Utilities
 * Type-safe helpers cho localStorage operations
 */

const STORAGE_KEYS = {
    SELECTED_PROVINCE: 'selectedProvinceSlug',
    LAST_KNOWN_WELL: 'lastKnownWell',
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
        console.warn('Failed to save to localStorage:', key)
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
        console.warn('Failed to remove from localStorage:', key)
    }
}

// Province storage helpers
export function getSelectedProvinceSlug(): string | null {
    return getStorageItem<string | null>(STORAGE_KEYS.SELECTED_PROVINCE, null)
}

export function setSelectedProvinceSlug(slug: string): void {
    setStorageItem(STORAGE_KEYS.SELECTED_PROVINCE, slug)
}

export function clearSelectedProvince(): void {
    removeStorageItem(STORAGE_KEYS.SELECTED_PROVINCE)
}

// Last Known Well storage helpers
export interface LastKnownWellData {
    timestamp: string // ISO string
    isManual: boolean
}

export function getLastKnownWell(): LastKnownWellData | null {
    return getStorageItem<LastKnownWellData | null>(STORAGE_KEYS.LAST_KNOWN_WELL, null)
}

export function setLastKnownWell(data: LastKnownWellData): void {
    setStorageItem(STORAGE_KEYS.LAST_KNOWN_WELL, data)
}

export function clearLastKnownWell(): void {
    removeStorageItem(STORAGE_KEYS.LAST_KNOWN_WELL)
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
        console.warn('Failed to save FAST answers')
    }
}

export function clearFastAnswers(): void {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem(STORAGE_KEYS.FAST_ANSWERS)
}
