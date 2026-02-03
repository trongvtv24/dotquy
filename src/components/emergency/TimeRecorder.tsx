'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import {
    getLastKnownWell,
    setLastKnownWell,
    clearLastKnownWell,
    type LastKnownWellData
} from '@/lib/utils/storage'
import { formatTimeDisplay, getElapsedTime } from '@/lib/utils/time'

interface TimeRecorderProps {
    className?: string
    onTimeRecorded?: (data: LastKnownWellData) => void
}

export function TimeRecorder({ className = '', onTimeRecorded }: TimeRecorderProps) {
    const [recordedTime, setRecordedTime] = useState<LastKnownWellData | null>(null)
    const [manualTime, setManualTime] = useState('')
    const [showManualInput, setShowManualInput] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const saved = getLastKnownWell()
        if (saved) {
            setRecordedTime(saved)
        }
    }, [])

    // Record current time as "now"
    const recordNow = () => {
        const data: LastKnownWellData = {
            timestamp: new Date().toISOString(),
            isManual: false,
        }
        setLastKnownWell(data)
        setRecordedTime(data)
        onTimeRecorded?.(data)
    }

    // Record manual time
    const recordManual = () => {
        if (!manualTime) return

        // Parse HH:mm format
        const [hours, minutes] = manualTime.split(':').map(Number)
        const now = new Date()
        now.setHours(hours, minutes, 0, 0)

        // If time is in future, assume yesterday
        if (now > new Date()) {
            now.setDate(now.getDate() - 1)
        }

        const data: LastKnownWellData = {
            timestamp: now.toISOString(),
            isManual: true,
        }
        setLastKnownWell(data)
        setRecordedTime(data)
        setShowManualInput(false)
        setManualTime('')
        onTimeRecorded?.(data)
    }

    // Clear recorded time
    const handleClear = () => {
        clearLastKnownWell()
        setRecordedTime(null)
    }

    if (!mounted) {
        return <div className={`${className} min-h-[120px]`} />
    }

    return (
        <div className={`bg-[--muted] rounded-xl p-4 ${className}`}>
            <h3 className="font-bold text-[--foreground] mb-3 flex items-center gap-2">
                <span>⏰</span>
                Giờ lần cuối bình thường
            </h3>

            <p className="text-sm text-[--muted-foreground] mb-4">
                Ghi lại thời điểm người bệnh hoàn toàn bình thường lần cuối.
                Thông tin này rất quan trọng cho bác sĩ.
            </p>

            {recordedTime ? (
                // Display recorded time
                <div className="bg-[--background] rounded-lg p-4 border border-[--border]">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-lg font-bold text-[--foreground]">
                                {formatTimeDisplay(recordedTime.timestamp)}
                            </p>
                            <p className="text-sm text-[--emergency-red] mt-1">
                                {getElapsedTime(recordedTime.timestamp)}
                            </p>
                            {recordedTime.isManual && (
                                <p className="text-xs text-[--muted-foreground] mt-2">
                                    (Thời gian nhập thủ công)
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handleClear}
                            className="text-[--muted-foreground] hover:text-[--emergency-red] p-1"
                            aria-label="Xóa thời gian đã ghi"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ) : (
                // Not recorded yet
                <div className="space-y-3">
                    {!showManualInput ? (
                        <>
                            <Button
                                variant="secondary"
                                fullWidth
                                onClick={recordNow}
                                className="justify-start"
                            >
                                <span>📍</span>
                                Ghi ngay bây giờ
                            </Button>

                            <Button
                                variant="ghost"
                                fullWidth
                                onClick={() => setShowManualInput(true)}
                                className="justify-start text-[--muted-foreground]"
                            >
                                <span>✏️</span>
                                Nhập giờ khác...
                            </Button>
                        </>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    type="time"
                                    value={manualTime}
                                    onChange={(e) => setManualTime(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-[--border] rounded-lg bg-[--background] text-lg"
                                    aria-label="Nhập giờ lần cuối bình thường"
                                />
                                <Button
                                    variant="secondary"
                                    onClick={recordManual}
                                    disabled={!manualTime}
                                >
                                    Lưu
                                </Button>
                            </div>
                            <button
                                onClick={() => {
                                    setShowManualInput(false)
                                    setManualTime('')
                                }}
                                className="text-sm text-[--muted-foreground] hover:underline"
                            >
                                ← Quay lại
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
