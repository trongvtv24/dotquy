'use client'

import Link from 'next/link'
import { ProvinceSelector, TimeRecorder, DoDoNotList, EmergencyBanner } from '@/components/emergency'
import { FastWizard } from '@/components/fast'
import { Button, Card } from '@/components/ui'
import { useState, useEffect } from 'react'
import { getFastAnswers, type FastAnswers } from '@/lib/utils/storage'

export default function HomePage() {
  const [showFastWizard, setShowFastWizard] = useState(false)
  const [fastResult, setFastResult] = useState<{ hasPositive: boolean; answers: FastAnswers } | null>(null)

  // Check for existing FAST result
  useEffect(() => {
    const savedAnswers = getFastAnswers()
    if (savedAnswers) {
      const hasPositive = Object.values(savedAnswers).some(v => v === true)
      if (hasPositive) {
        setFastResult({ hasPositive, answers: savedAnswers })
      }
    }
  }, [])

  const handleFastComplete = (hasPositive: boolean, answers: FastAnswers) => {
    setFastResult({ hasPositive, answers })
    setShowFastWizard(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Emergency Banner - Show if FAST positive */}
      {fastResult?.hasPositive && (
        <div className="mb-6">
          <EmergencyBanner />
        </div>
      )}

      {/* Hero Section */}
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[--foreground] mb-3">
          🚨 NGHI ĐỘT QUỴ?
        </h1>
        <p className="text-lg text-[--muted-foreground] mb-2">
          <strong className="text-[--emergency-red]">Đừng chờ &quot;xem sao&quot;.</strong>
        </p>
        <p className="text-[--muted-foreground]">
          Mỗi phút trì hoãn đều quan trọng.
        </p>
      </section>

      {/* Province Selector */}
      <section className="mb-8">
        <ProvinceSelector showLabel className="w-full" />
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 gap-4 mb-8">
        <Button
          variant="secondary"
          size="lg"
          className="w-full text-lg py-6"
          onClick={() => setShowFastWizard(true)}
        >
          ⚡ Bắt đầu BE FAST (15 giây)
        </Button>

        <Link href="/what-to-do-now" className="block">
          <Button variant="outline" size="lg" className="w-full">
            ✅ Tôi nên làm gì trong lúc chờ?
          </Button>
        </Link>
      </section>

      {/* BE FAST Wizard Modal */}
      {showFastWizard && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[--background] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-[--border] flex items-center justify-between">
              <h2 className="text-lg font-bold">Test BE FAST</h2>
              <button
                onClick={() => setShowFastWizard(false)}
                className="p-2 hover:bg-[--muted] rounded-lg"
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <FastWizard onComplete={handleFastComplete} />
            </div>
          </div>
        </div>
      )}

      {/* BE FAST Quick Info */}
      <section className="mb-8">
        <Card variant="outline" className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            ⚡ BE FAST là gì?
          </h2>
          <p className="text-[--muted-foreground] mb-4">
            Công thức nhớ <strong>5 dấu hiệu đột quỵ</strong>.
            Chỉ cần <strong className="text-[--emergency-red]">1 dấu hiệu</strong> → gọi cấp cứu ngay.
          </p>
          <div className="grid grid-cols-5 gap-2 text-center text-sm">
            <div className="bg-[--muted] rounded-lg p-2">
              <div className="text-2xl mb-1">🧍</div>
              <div className="font-bold text-[--emergency-red]">B</div>
              <div className="text-xs text-[--muted-foreground]">Balance</div>
            </div>
            <div className="bg-[--muted] rounded-lg p-2">
              <div className="text-2xl mb-1">👁️</div>
              <div className="font-bold text-[--emergency-red]">E</div>
              <div className="text-xs text-[--muted-foreground]">Eyes</div>
            </div>
            <div className="bg-[--muted] rounded-lg p-2">
              <div className="text-2xl mb-1">😮</div>
              <div className="font-bold text-[--emergency-red]">F</div>
              <div className="text-xs text-[--muted-foreground]">Face</div>
            </div>
            <div className="bg-[--muted] rounded-lg p-2">
              <div className="text-2xl mb-1">💪</div>
              <div className="font-bold text-[--emergency-red]">A</div>
              <div className="text-xs text-[--muted-foreground]">Arm</div>
            </div>
            <div className="bg-[--muted] rounded-lg p-2">
              <div className="text-2xl mb-1">🗣️</div>
              <div className="font-bold text-[--emergency-red]">S</div>
              <div className="text-xs text-[--muted-foreground]">Speech</div>
            </div>
          </div>
        </Card>
      </section>

      {/* DO / DON'T Quick View */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          📋 Làm gì / Không làm gì
        </h2>
        <DoDoNotList variant="compact" />
        <Link href="/what-to-do-now" className="block mt-3">
          <Button variant="ghost" size="sm" className="w-full">
            Xem chi tiết hơn →
          </Button>
        </Link>
      </section>

      {/* Time Recorder */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          🕐 Ghi nhớ thời gian quan trọng
        </h2>
        <TimeRecorder />
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-2 gap-3 mb-8">
        <Link href="/call-script">
          <Card variant="outline" className="p-4 h-full hover:border-[--primary] transition-colors text-center">
            <div className="text-2xl mb-2">📞</div>
            <div className="font-medium text-sm">Nói gì khi gọi cấp cứu?</div>
          </Card>
        </Link>
        <Link href="/fast">
          <Card variant="outline" className="p-4 h-full hover:border-[--primary] transition-colors text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-medium text-sm">Test BE FAST đầy đủ</div>
          </Card>
        </Link>
      </section>
    </div>
  )
}
