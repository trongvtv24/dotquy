'use client'

import { useState, useEffect } from 'react'
import { getSelectedProvinceSlug } from '@/lib/utils/storage'
import { buildTelLink, getEmergencyPhone, formatPhoneDisplay } from '@/lib/utils/phone'
import { createClient } from '@/lib/supabase/client'
import type { EmergencyContact, Province } from '@/lib/types/database'

const FALLBACK_PHONE = '115'

interface FloatingCallButtonProps {
    className?: string
    size?: 'md' | 'lg'
}

export function FloatingCallButton({ className = '', size = 'lg' }: FloatingCallButtonProps) {
    const [contact, setContact] = useState<EmergencyContact | null>(null)
    const [province, setProvince] = useState<Province | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadEmergencyContact() {
            setIsLoading(true)

            const provinceSlug = getSelectedProvinceSlug()

            if (!provinceSlug) {
                setIsLoading(false)
                return
            }

            try {
                const supabase = createClient()

                // Get province and its active emergency contact
                const { data: provinceData, error: provinceError } = await supabase
                    .from('provinces')
                    .select('*')
                    .eq('slug', provinceSlug)
                    .single()

                if (provinceError || !provinceData) {
                    setIsLoading(false)
                    return
                }

                setProvince(provinceData as Province)

                const { data: contactData } = await supabase
                    .from('emergency_contacts')
                    .select('*')
                    .eq('province_id', (provinceData as Province).id)
                    .eq('status', 'active')
                    .limit(1)
                    .single()

                setContact(contactData ? (contactData as EmergencyContact) : null)
            } catch (error) {
                console.error('Failed to load emergency contact:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadEmergencyContact()

        // Listen for storage changes (when province is changed)
        const handleStorageChange = () => {
            loadEmergencyContact()
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('provinceChanged', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('provinceChanged', handleStorageChange)
        }
    }, [])

    const phoneNumber = contact?.emergency_phone
        ? getEmergencyPhone(contact.emergency_phone)
        : FALLBACK_PHONE

    const displayPhone = formatPhoneDisplay(phoneNumber)
    const telLink = buildTelLink(phoneNumber)

    const sizeStyles = {
        md: 'px-6 py-3 text-lg min-h-[52px]',
        lg: 'px-8 py-4 text-xl min-h-[64px]',
    }

    return (
        <div className={`floating-cta ${className}`}>
            <a
                href={telLink}
                className={`
          w-full
          bg-[--emergency-red] hover:bg-[--emergency-red-dark]
          text-white font-bold
          rounded-xl
          inline-flex items-center justify-center gap-3
          shadow-xl
          transition-all duration-150
          animate-pulse
          ${sizeStyles[size]}
        `}
                aria-label={`Gọi cấp cứu ${displayPhone}`}
            >
                <span className="text-2xl">📞</span>
                <span>
                    GỌI {displayPhone}
                </span>
            </a>

            {/* Sub text */}
            <p className="text-center text-sm text-[--muted-foreground] mt-2">
                {isLoading ? (
                    'Đang tải...'
                ) : province ? (
                    <>Cấp cứu tại {province.name}</>
                ) : (
                    <>Số cấp cứu toàn quốc</>
                )}
            </p>
        </div>
    )
}
