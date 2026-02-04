/**
 * Phone Number Utilities (Simplified)
 * Xử lý số điện thoại
 */

const EMERGENCY_NUMBER = '115'

/**
 * Tạo tel: link cho mobile calling
 */
export function buildTelLink(phone?: string | null): string {
    return `tel:${phone || EMERGENCY_NUMBER}`
}

/**
 * Lấy số cấp cứu, mặc định 115
 */
export function getEmergencyPhone(): string {
    return EMERGENCY_NUMBER
}
