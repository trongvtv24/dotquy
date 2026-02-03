/**
 * Time Utilities
 * Format và xử lý thời gian cho "Giờ lần cuối bình thường"
 */

/**
 * Format Date thành chuỗi hiển thị tiếng Việt
 * VD: "14:30 ngày 02/02/2026"
 */
export function formatTimeDisplay(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date

    const hours = d.getHours().toString().padStart(2, '0')
    const minutes = d.getMinutes().toString().padStart(2, '0')
    const day = d.getDate().toString().padStart(2, '0')
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const year = d.getFullYear()

    return `${hours}:${minutes} ngày ${day}/${month}/${year}`
}

/**
 * Format thời gian ngắn gọn (chỉ giờ:phút)
 */
export function formatTimeShort(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date

    const hours = d.getHours().toString().padStart(2, '0')
    const minutes = d.getMinutes().toString().padStart(2, '0')

    return `${hours}:${minutes}`
}

/**
 * Tính thời gian đã trôi qua từ timestamp
 * VD: "2 giờ 15 phút trước"
 */
export function getElapsedTime(timestamp: Date | string): string {
    const start = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
    const now = new Date()

    const diffMs = now.getTime() - start.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    if (diffMinutes < 1) return 'Vừa xong'
    if (diffMinutes < 60) return `${diffMinutes} phút trước`

    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60

    if (minutes === 0) return `${hours} giờ trước`
    return `${hours} giờ ${minutes} phút trước`
}

/**
 * Format cho call script
 * VD: "Lần cuối bình thường lúc 14:30 (khoảng 2 giờ trước)"
 */
export function formatForCallScript(timestamp: Date | string): string {
    const time = formatTimeShort(timestamp)
    const elapsed = getElapsedTime(timestamp)

    return `Lần cuối bình thường lúc ${time} (${elapsed})`
}

/**
 * Get recorded time from localStorage (wrapper for storage functions)
 * Returns the timestamp string or null if not set
 */
export function getRecordedTime(): string | null {
    if (typeof window === 'undefined') return null

    try {
        const data = localStorage.getItem('lastKnownWell')
        if (!data) return null

        const parsed = JSON.parse(data)
        return parsed?.timestamp || null
    } catch {
        return null
    }
}
