'use client'

import { useState } from 'react'
import { Button, Card, Input } from '@/components/ui'
import Link from 'next/link'

interface CallScriptData {
    patientName: string
    patientAge: string
    patientGender: 'male' | 'female' | ''
    symptoms: string[]
    address: string
    lastNormalTime: string
}

const SYMPTOM_OPTIONS = [
    { id: 'face', label: 'Mặt bị lệch/méo' },
    { id: 'arm', label: 'Yếu/liệt tay hoặc chân' },
    { id: 'speech', label: 'Nói khó/nói ngọng' },
    { id: 'balance', label: 'Chóng mặt, mất thăng bằng' },
    { id: 'vision', label: 'Mờ mắt, nhìn đôi' },
    { id: 'headache', label: 'Đau đầu dữ dội đột ngột' },
    { id: 'confusion', label: 'Lú lẫn, không hiểu' },
]

export default function CallScriptPage() {
    const [step, setStep] = useState<'form' | 'script'>('form')
    const [data, setData] = useState<CallScriptData>({
        patientName: '',
        patientAge: '',
        patientGender: '',
        symptoms: [],
        address: '',
        lastNormalTime: '',
    })
    const [copied, setCopied] = useState(false)

    const toggleSymptom = (symptomId: string) => {
        setData(prev => ({
            ...prev,
            symptoms: prev.symptoms.includes(symptomId)
                ? prev.symptoms.filter(s => s !== symptomId)
                : [...prev.symptoms, symptomId],
        }))
    }

    const generateScript = (): string => {
        const genderText = data.patientGender === 'male' ? 'nam' : data.patientGender === 'female' ? 'nữ' : ''
        const symptomsText = data.symptoms
            .map(id => SYMPTOM_OPTIONS.find(s => s.id === id)?.label)
            .filter(Boolean)
            .join(', ')

        let script = `Xin chào, tôi nghi người thân bị ĐỘT QUỴ.`

        if (data.patientName || data.patientAge || genderText) {
            script += `\n\nBệnh nhân: ${data.patientName || '[Tên]'}${data.patientAge ? `, ${data.patientAge} tuổi` : ''}${genderText ? `, ${genderText}` : ''}.`
        }

        if (symptomsText) {
            script += `\n\nTriệu chứng: ${symptomsText}.`
        }

        if (data.lastNormalTime) {
            script += `\n\nLần cuối bình thường: ${data.lastNormalTime}.`
        }

        if (data.address) {
            script += `\n\nĐịa chỉ: ${data.address}.`
        }

        script += `\n\nXin cấp cứu đến ngay!`

        return script
    }

    const copyScript = async () => {
        const script = generateScript()
        try {
            await navigator.clipboard.writeText(script)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setStep('script')
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-[--foreground] mb-2">
                    📞 Nói gì khi gọi cấp cứu?
                </h1>
                <p className="text-[--muted-foreground]">
                    Tạo script nhanh để gọi điện cho cấp cứu
                </p>
            </div>

            {step === 'form' ? (
                <form onSubmit={handleSubmit}>
                    {/* Quick Info */}
                    <div className="bg-[--muted] rounded-xl p-4 mb-6">
                        <p className="text-sm text-[--muted-foreground]">
                            💡 <strong>Mẹo:</strong> Điền sẵn thông tin để đỡ lúng túng khi gọi.
                            Có thể bỏ trống nếu chưa biết.
                        </p>
                    </div>

                    {/* Patient Info */}
                    <Card variant="outline" className="p-4 mb-4">
                        <h2 className="font-bold mb-4">👤 Thông tin bệnh nhân</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Tên (không bắt buộc)</label>
                                <Input
                                    type="text"
                                    placeholder="VD: Nguyễn Văn A"
                                    value={data.patientName}
                                    onChange={e => setData(prev => ({ ...prev, patientName: e.target.value }))}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Tuổi</label>
                                    <Input
                                        type="number"
                                        placeholder="VD: 65"
                                        value={data.patientAge}
                                        onChange={e => setData(prev => ({ ...prev, patientAge: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Giới tính</label>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setData(prev => ({ ...prev, patientGender: 'male' }))}
                                            className={`flex-1 py-2.5 px-3 rounded-lg border font-medium transition-colors ${data.patientGender === 'male'
                                                ? 'bg-[--primary] text-[--primary-foreground] border-[--primary]'
                                                : 'bg-[--background] border-[--border] hover:border-[--primary]'
                                                }`}
                                        >
                                            Nam
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setData(prev => ({ ...prev, patientGender: 'female' }))}
                                            className={`flex-1 py-2.5 px-3 rounded-lg border font-medium transition-colors ${data.patientGender === 'female'
                                                ? 'bg-[--primary] text-[--primary-foreground] border-[--primary]'
                                                : 'bg-[--background] border-[--border] hover:border-[--primary]'
                                                }`}
                                        >
                                            Nữ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Symptoms */}
                    <Card variant="outline" className="p-4 mb-4">
                        <h2 className="font-bold mb-4">🩺 Triệu chứng (chọn nhiều)</h2>

                        <div className="grid grid-cols-1 gap-2">
                            {SYMPTOM_OPTIONS.map(symptom => (
                                <button
                                    key={symptom.id}
                                    type="button"
                                    onClick={() => toggleSymptom(symptom.id)}
                                    className={`p-3 rounded-lg border text-left font-medium transition-colors ${data.symptoms.includes(symptom.id)
                                        ? 'bg-[--emergency-red] text-white border-[--emergency-red]'
                                        : 'bg-[--background] border-[--border] hover:border-[--emergency-red]'
                                        }`}
                                >
                                    {data.symptoms.includes(symptom.id) ? '✓ ' : '○ '}
                                    {symptom.label}
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Time & Address */}
                    <Card variant="outline" className="p-4 mb-6">
                        <h2 className="font-bold mb-4">📍 Thời gian & Địa chỉ</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">
                                    Lần cuối bình thường
                                </label>
                                <Input
                                    type="text"
                                    placeholder="VD: 14:30 hôm nay"
                                    value={data.lastNormalTime}
                                    onChange={e => setData(prev => ({ ...prev, lastNormalTime: e.target.value }))}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5">Địa chỉ hiện tại</label>
                                <Input
                                    type="text"
                                    placeholder="VD: 123 Nguyễn Huệ, Q1, TP.HCM"
                                    value={data.address}
                                    onChange={e => setData(prev => ({ ...prev, address: e.target.value }))}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Submit */}
                    <Button type="submit" variant="primary" size="lg" className="w-full">
                        Tạo script gọi cấp cứu →
                    </Button>
                </form>
            ) : (
                <div>
                    {/* Generated Script */}
                    <Card variant="filled" className="p-4 mb-4">
                        <h2 className="font-bold mb-3">📋 Script của bạn</h2>
                        <div className="bg-[--background] border border-[--border] rounded-lg p-4 whitespace-pre-line text-[--foreground]">
                            {generateScript()}
                        </div>
                    </Card>

                    {/* Actions */}
                    <div className="space-y-3 mb-6">
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full"
                            onClick={copyScript}
                        >
                            {copied ? '✓ Đã copy!' : '📋 Copy script'}
                        </Button>

                        <a
                            href="tel:115"
                            className="block w-full"
                        >
                            <Button
                                variant="danger"
                                size="lg"
                                className="w-full"
                            >
                                📞 Gọi 115 ngay
                            </Button>
                        </a>

                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full"
                            onClick={() => setStep('form')}
                        >
                            ← Sửa thông tin
                        </Button>
                    </div>

                    {/* Tips */}
                    <div className="bg-[--muted] rounded-xl p-4">
                        <h3 className="font-bold mb-2">💡 Khi gọi điện</h3>
                        <ul className="text-sm text-[--muted-foreground] space-y-1">
                            <li>• Nói rõ ràng, chậm rãi</li>
                            <li>• Bình tĩnh, không hoảng loạn</li>
                            <li>• Đọc script hoặc nhìn vào để nhớ</li>
                            <li>• Nghe hướng dẫn từ tổng đài</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Back Link */}
            <div className="mt-6 text-center">
                <Link href="/" className="text-[--primary] hover:underline">
                    ← Về trang chủ
                </Link>
            </div>
        </div>
    )
}
