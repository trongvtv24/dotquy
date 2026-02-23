'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { getFastAnswers, setFastAnswers, clearFastAnswers, type FastAnswers } from '@/lib/utils/storage'

// BE FAST steps configuration
const FAST_STEPS = [
    {
        key: 'balance' as const,
        letter: 'B',
        title: 'Balance - Thăng bằng',
        question: 'Người bệnh có đột ngột chóng mặt, đi loạng choạng, hoặc mất thăng bằng không?',
        description: 'Quan sát xem họ có khó đứng vững, đi lảo đảo, hoặc mất phối hợp động tác không.',
        yesText: 'Có, mất thăng bằng',
        noText: 'Không, bình thường',
    },
    {
        key: 'eyes' as const,
        letter: 'E',
        title: 'Eyes - Thị lực',
        question: 'Người bệnh có đột ngột mờ mắt, nhìn đôi, hoặc mất thị lực một bên không?',
        description: 'Hỏi họ xem có thấy mờ, thấy 2 hình, hoặc không thấy một phần trong tầm nhìn không.',
        yesText: 'Có, vấn đề thị lực',
        noText: 'Không, nhìn bình thường',
    },
    {
        key: 'face' as const,
        letter: 'F',
        title: 'Face - Mặt',
        question: 'Mặt có bị lệch, méo miệng khi cười hoặc nói không?',
        description: 'Yêu cầu họ cười hoặc nhe răng. Quan sát xem một bên mặt có rũ xuống không.',
        yesText: 'Có, mặt bị lệch/méo',
        noText: 'Không, mặt cân đối',
    },
    {
        key: 'arm' as const,
        letter: 'A',
        title: 'Arm - Tay/Chân',
        question: 'Một bên tay hoặc chân có yếu, tê, hoặc không nâng lên được không?',
        description: 'Yêu cầu họ giơ cả hai tay lên. Quan sát xem một bên có rơi xuống không.',
        yesText: 'Có, yếu/tê một bên',
        noText: 'Không, hai bên bình thường',
    },
    {
        key: 'speech' as const,
        letter: 'S',
        title: 'Speech - Lời nói',
        question: 'Người bệnh có nói khó, nói ngọng, không hiểu lời, hoặc không nói được không?',
        description: 'Yêu cầu họ lặp lại một câu đơn giản như "Trời hôm nay đẹp quá".',
        yesText: 'Có, vấn đề lời nói',
        noText: 'Không, nói bình thường',
    },
]

interface FastWizardProps {
    onComplete?: (hasPositive: boolean, answers: FastAnswers) => void
    className?: string
}

export function FastWizard({ onComplete, className = '' }: FastWizardProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState<FastAnswers>({})
    const [isComplete, setIsComplete] = useState(false)

    // Load saved answers on mount
    useEffect(() => {
        const saved = getFastAnswers()
        if (Object.keys(saved).length > 0) {
            setAnswers(saved)
        }
    }, [])

    // Save answers when changed
    useEffect(() => {
        if (Object.keys(answers).length > 0) {
            setFastAnswers(answers)
        }
    }, [answers])

    const currentStepData = FAST_STEPS[currentStep]
    const totalSteps = FAST_STEPS.length

    const handleAnswer = useCallback((value: boolean) => {
        const newAnswers = { ...answers, [currentStepData.key]: value }
        setAnswers(newAnswers)

        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            // Complete!
            setIsComplete(true)
            const hasPositive = Object.values(newAnswers).some(v => v === true)
            onComplete?.(hasPositive, newAnswers)
        }
    }, [answers, currentStep, totalSteps, currentStepData, onComplete])

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleRestart = () => {
        clearFastAnswers()
        setAnswers({})
        setCurrentStep(0)
        setIsComplete(false)
    }

    // Check if any answer is positive
    const hasPositiveAnswer = Object.values(answers).some(v => v === true)
    const positiveCount = Object.values(answers).filter(v => v === true).length

    if (isComplete) {
        return <FastResult hasPositive={hasPositiveAnswer} positiveCount={positiveCount} onRestart={handleRestart} />
    }

    return (
        <div className={`${className}`}>
            {/* Progress bar */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[--muted-foreground]">
                        Bước {currentStep + 1} / {totalSteps}
                    </span>
                    <span className="text-sm font-medium text-[--muted-foreground]">
                        {Math.round(((currentStep + 1) / totalSteps) * 100)}%
                    </span>
                </div>
                <div className="h-2 bg-[--muted] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[--emergency-red] transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            {/* Step letter badges */}
            <div className="flex justify-center gap-2 mb-6">
                {FAST_STEPS.map((step, index) => {
                    const answer = answers[step.key]
                    const isAnswered = answer !== undefined
                    const isCurrent = index === currentStep

                    return (
                        <div
                            key={step.key}
                            className={`
                w-10 h-10 rounded-full
                flex items-center justify-center
                font-bold text-lg
                transition-all
                ${isCurrent
                                    ? 'bg-[var(--emergency-red)] text-white scale-110'
                                    : isAnswered
                                        ? answer
                                            ? 'bg-red-100 text-[var(--emergency-red)] border-2 border-[var(--emergency-red)]'
                                            : 'bg-green-100 text-green-600 border-2 border-green-600'
                                        : 'bg-[--muted] text-[--muted-foreground]'
                                }
              `}
                        >
                            {step.letter}
                        </div>
                    )
                })}
            </div>

            {/* Current step */}
            <div className="bg-[--muted] rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-[--foreground] mb-3">
                    {currentStepData.title}
                </h2>
                <p className="text-lg text-[--foreground] mb-4">
                    {currentStepData.question}
                </p>
                <p className="text-sm text-[var(--emergency-red)] font-bold">
                    💡 {currentStepData.description}
                </p>
            </div>

            {/* Answer buttons */}
            <div className="space-y-3 mb-6">
                <Button
                    variant="danger"
                    size="lg"
                    fullWidth
                    onClick={() => handleAnswer(true)}
                    className="justify-start text-left"
                >
                    <span className="text-xl mr-2">⚠️</span>
                    {currentStepData.yesText}
                </Button>

                <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    onClick={() => handleAnswer(false)}
                    className="justify-start text-left"
                >
                    <span className="text-xl mr-2">✓</span>
                    {currentStepData.noText}
                </Button>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button
                    variant="ghost"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                >
                    ← Quay lại
                </Button>

                <Button
                    variant="ghost"
                    onClick={handleRestart}
                >
                    Làm lại từ đầu
                </Button>
            </div>

            {/* Warning if positive detected */}
            {hasPositiveAnswer && (
                <div className="mt-6 p-4 bg-red-50 border border-[--emergency-red] rounded-xl">
                    <p className="text-[--emergency-red] font-medium text-center">
                        ⚠️ Đã phát hiện {positiveCount} dấu hiệu nghi ngờ.
                        Hoàn thành test hoặc gọi cấp cứu ngay!
                    </p>
                </div>
            )}
        </div>
    )
}

// Result component
interface FastResultProps {
    hasPositive: boolean
    positiveCount: number
    onRestart: () => void
}

function FastResult({ hasPositive, positiveCount, onRestart }: FastResultProps) {
    return (
        <div className="text-center">
            {hasPositive ? (
                <>
                    {/* Positive result - Emergency! */}
                    <div className="bg-[--emergency-red] text-white rounded-xl p-8 mb-6">
                        <span className="text-6xl block mb-4">🚨</span>
                        <h2 className="text-2xl font-bold mb-2">
                            PHÁT HIỆN {positiveCount} DẤU HIỆU
                        </h2>
                        <p className="text-lg opacity-90">
                            Có dấu hiệu nghi ngờ đột quỵ. Hãy đi cấp cứu NGAY!
                        </p>
                    </div>

                    <Link
                        href="/call-script"
                        className="
              w-full
              bg-[--primary] hover:opacity-90
              text-white font-bold text-xl
              py-5 px-8 rounded-xl
              inline-flex items-center justify-center gap-3
              shadow-xl mb-4 min-h-[64px]
            "
                    >
                        📞 Nói gì khi gọi cấp cứu?
                    </Link>

                    <p className="text-[--muted-foreground] mb-4">
                        Mỗi phút trì hoãn có thể gây tổn thương não vĩnh viễn.
                    </p>
                </>
            ) : (
                <>
                    {/* Negative result */}
                    <div className="bg-green-50 border-2 border-green-600 rounded-xl p-8 mb-6">
                        <span className="text-6xl block mb-4">✓</span>
                        <h2 className="text-2xl font-bold text-green-700 mb-2">
                            KHÔNG PHÁT HIỆN DẤU HIỆU
                        </h2>
                        <p className="text-green-600">
                            Không có dấu hiệu BE FAST điển hình tại thời điểm này.
                        </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-400 rounded-xl p-4 mb-6">
                        <p className="text-yellow-800 text-sm">
                            <strong>⚠️ Lưu ý:</strong> Đây không phải chẩn đoán y khoa.
                            Nếu triệu chứng tiếp tục hoặc bạn vẫn lo ngại,
                            hãy liên hệ cơ sở y tế để được tư vấn.
                        </p>
                    </div>
                </>
            )}

            <Button
                variant="secondary"
                onClick={onRestart}
                className="mt-4"
            >
                Làm lại test
            </Button>
        </div>
    )
}
