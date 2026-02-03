/**
 * Phone Number Utilities
 * Xử lý và validate số điện thoại cho tính năng gọi cấp cứu
 */

const FALLBACK_EMERGENCY = '115'

/**
 * Normalize số điện thoại: bỏ spaces, dấu chấm, ngoặc, gạch ngang
 * @param phone - Số điện thoại gốc
 * @returns Số đã normalize hoặc 115 nếu invalid
 */
export function normalizePhone(phone: string | null | undefined): string {
    if (!phone) return FALLBACK_EMERGENCY
    const normalized = phone.replace(/[\s.\-()]/g, '').trim()
    return normalized || FALLBACK_EMERGENCY
}

/**
 * Tạo tel: link cho mobile calling
 * @param phone - Số điện thoại
 * @returns tel: URL
 */
export function buildTelLink(phone: string | null | undefined): string {
    const normalized = normalizePhone(phone)
    return `tel:${normalized}`
}

/**
 * Validate số điện thoại cơ bản
 * @param phone - Số điện thoại
 * @returns true nếu hợp lệ
 */
export function isValidPhone(phone: string | null | undefined): boolean {
    if (!phone) return false
    const normalized = normalizePhone(phone)
    // Cho phép 3-15 chữ số, có thể bắt đầu bằng +
    return /^\+?[\d]{3,15}$/.test(normalized)
}

/**
 * Lấy số cấp cứu, fallback 115 nếu invalid
 * @param phone - Số điện thoại
 * @returns Số hợp lệ hoặc 115
 */
export function getEmergencyPhone(phone: string | null | undefined): string {
    return isValidPhone(phone) ? normalizePhone(phone) : FALLBACK_EMERGENCY
}

/**
 * Format số điện thoại để hiển thị
 * VD: 0258123456 → 0258 123 456
 */
export function formatPhoneDisplay(phone: string | null | undefined): string {
    const normalized = normalizePhone(phone)
    if (normalized === FALLBACK_EMERGENCY) return '115'

    // Nếu bắt đầu bằng 0, format theo Việt Nam
    if (normalized.startsWith('0') && normalized.length >= 10) {
        return `${normalized.slice(0, 4)} ${normalized.slice(4, 7)} ${normalized.slice(7)}`
    }

    return normalized
}
