import { Metadata } from 'next'
import { FastWizard } from '@/components/fast'

export const metadata: Metadata = {
    title: 'Test BE FAST - DOTQUY.NHANH',
    description: 'Kiểm tra 5 dấu hiệu đột quỵ BE FAST trong 15 giây. Chỉ cần 1 dấu hiệu CÓ là cần gọi cấp cứu.',
}

export default function FastPage() {
    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-[--foreground] mb-2">
                    ⚡ Test BE FAST
                </h1>
                <p className="text-[--muted-foreground]">
                    Kiểm tra 5 dấu hiệu đột quỵ trong <strong>15 giây</strong>
                </p>
            </div>

            {/* Important Note */}
            <div className="bg-[--emergency-red]/10 border border-[--emergency-red]/20 rounded-xl p-4 mb-6">
                <p className="text-center text-[--foreground] font-medium">
                    ⚠️ Chỉ cần <strong className="text-[--emergency-red]">1 câu trả lời &quot;CÓ&quot;</strong> →
                    <span className="text-[--emergency-red]"> gọi cấp cứu ngay!</span>
                </p>
            </div>

            {/* Fast Wizard */}
            <FastWizard />

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-[--muted] rounded-xl">
                <h2 className="font-bold mb-3">💡 Về BE FAST</h2>
                <div className="space-y-2 text-sm text-[--muted-foreground]">
                    <p>
                        <strong className="text-[--foreground]">BE FAST</strong> là công thức giúp nhận biết đột quỵ nhanh chóng,
                        được khuyến cáo bởi các tổ chức y tế trên thế giới.
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>B</strong>alance - Mất thăng bằng</li>
                        <li><strong>E</strong>yes - Thị lực bất thường</li>
                        <li><strong>F</strong>ace - Mặt bị lệch/méo</li>
                        <li><strong>A</strong>rm - Yếu tay/chân</li>
                        <li><strong>S</strong>peech - Nói khó/nói ngọng</li>
                    </ul>
                    <p className="mt-2">
                        <strong className="text-[--emergency-red]">T = Time</strong> - Thời gian là vàng!
                        Gọi cấp cứu ngay khi có bất kỳ dấu hiệu nào.
                    </p>
                </div>
            </div>
        </div>
    )
}
