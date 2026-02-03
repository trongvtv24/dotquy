'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getSelectedProvinceSlug, setSelectedProvinceSlug } from '@/lib/utils/storage'
import type { Province } from '@/lib/types/database'

interface ProvinceSelectorProps {
    onSelect?: (province: Province | null) => void
    showLabel?: boolean
    className?: string
}

export function ProvinceSelector({
    onSelect,
    showLabel = true,
    className = ''
}: ProvinceSelectorProps) {
    const [provinces, setProvinces] = useState<Province[]>([])
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Load provinces from Supabase
    useEffect(() => {
        async function loadProvinces() {
            try {
                const supabase = createClient()
                const { data, error } = await supabase
                    .from('provinces')
                    .select('*')
                    .order('name')

                if (error) throw error
                setProvinces(data || [])
            } catch (error) {
                console.error('Failed to load provinces:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadProvinces()

        // Restore from localStorage
        const saved = getSelectedProvinceSlug()
        if (saved) {
            setSelectedSlug(saved)
        }
    }, [])

    // Filter provinces by search
    const filteredProvinces = useMemo(() => {
        if (!searchQuery.trim()) return provinces

        const query = searchQuery.toLowerCase().trim()
        return provinces.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.slug.includes(query)
        )
    }, [provinces, searchQuery])

    // Get selected province object
    const selectedProvince = useMemo(() => {
        return provinces.find(p => p.slug === selectedSlug) || null
    }, [provinces, selectedSlug])

    // Handle selection
    const handleSelect = (province: Province) => {
        setSelectedSlug(province.slug)
        setSelectedProvinceSlug(province.slug)
        setIsOpen(false)
        setSearchQuery('')

        // Dispatch custom event for FloatingCallButton
        window.dispatchEvent(new CustomEvent('provinceChanged'))

        onSelect?.(province)
    }

    // Clear selection
    const handleClear = () => {
        setSelectedSlug(null)
        setSelectedProvinceSlug('')
        onSelect?.(null)
        window.dispatchEvent(new CustomEvent('provinceChanged'))
    }

    return (
        <div className={`relative ${className}`}>
            {showLabel && (
                <label className="block text-sm font-medium text-[--foreground] mb-1.5">
                    Chọn tỉnh/TP để hiển thị số cấp cứu địa phương
                </label>
            )}

            {/* Selected display / Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
          w-full px-4 py-3 min-h-[48px]
          bg-[--background] border border-[--border] rounded-lg
          flex items-center justify-between
          text-left
          hover:border-[--primary] transition-colors
        `}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <span className={selectedProvince ? 'text-[--foreground]' : 'text-[--muted-foreground]'}>
                    {isLoading ? 'Đang tải...' : selectedProvince?.name || 'Chọn tỉnh/thành phố...'}
                </span>
                <span className="text-[--muted-foreground]">
                    {isOpen ? '▲' : '▼'}
                </span>
            </button>

            {/* Clear button */}
            {selectedProvince && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-[--muted-foreground] hover:text-[--foreground]"
                    aria-label="Xóa lựa chọn"
                >
                    ✕
                </button>
            )}

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-[--background] border border-[--border] rounded-lg shadow-lg max-h-64 overflow-hidden">
                    {/* Search input */}
                    <div className="p-2 border-b border-[--border]">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Tìm tỉnh/thành phố..."
                            className="w-full px-3 py-2 bg-[--muted] border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[--primary]"
                            autoFocus
                        />
                    </div>

                    {/* Province list */}
                    <ul
                        role="listbox"
                        className="overflow-y-auto max-h-48"
                    >
                        {filteredProvinces.length === 0 ? (
                            <li className="px-4 py-3 text-sm text-[--muted-foreground]">
                                Không tìm thấy tỉnh/TP
                            </li>
                        ) : (
                            filteredProvinces.map(province => (
                                <li
                                    key={province.id}
                                    role="option"
                                    aria-selected={province.slug === selectedSlug}
                                    onClick={() => handleSelect(province)}
                                    className={`
                    px-4 py-3 cursor-pointer
                    hover:bg-[--muted] transition-colors
                    ${province.slug === selectedSlug ? 'bg-[--muted] font-medium' : ''}
                  `}
                                >
                                    {province.name}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}
