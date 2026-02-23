import { Metadata } from 'next'
import Link from 'next/link'
import { DoDoNotList } from '@/components/emergency'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
    title: 'Làm gì khi nghi đột quỵ - DOTQUY.NHANH',
    description: 'Hướng dẫn chi tiết những điều NÊN làm và KHÔNG NÊN làm khi nghi ngờ người thân bị đột quỵ.',
}

export default function WhatToDoNowPage() {
    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-[--foreground] mb-2">
                    ✅ Làm gì khi nghi đột quỵ?
                </h1>
                <p className="text-[--muted-foreground]">
                    Hướng dẫn xử lý trong lúc chờ cấp cứu
                </p>
            </div>

            {/* Priority Alert */}
            <div className="bg-[--emergency-red] text-white rounded-xl p-4 mb-6 text-center">
                <p className="text-lg font-bold mb-1">
                    🚨 VIỆC ĐẦU TIÊN: ĐI CẤP CỨU
                </p>
                <p className="text-sm opacity-90">
                    Đến cơ sở y tế gần nhất ngay lập tức
                </p>
            </div>

            {/* DO / DON'T Full List */}
            <section className="mb-8">
                <DoDoNotList variant="full" />
            </section>

            {/* Time Importance - Simplified */}
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    🕐 Ghi nhớ thời gian quan trọng
                </h2>
                <div className="bg-[--muted] rounded-xl p-4">
                    <p className="text-[--muted-foreground] mb-3">
                        Bác sĩ sẽ hỏi: <strong className="text-[--foreground]">&quot;Lần cuối bệnh nhân bình thường là lúc nào?&quot;</strong>
                    </p>
                    <p className="text-sm text-[--muted-foreground]">
                        💡 <strong>Mẹo:</strong> Ghi vào giấy hoặc nhớ trong đầu ngay lập tức!
                    </p>
                </div>
            </section>

            {/* Additional Tips */}
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">
                    💡 Mẹo hữu ích
                </h2>
                <div className="space-y-3">
                    <div className="bg-[--background] border border-[--border] rounded-xl p-4">
                        <h3 className="font-semibold mb-2">📸 Chụp ảnh/quay video</h3>
                        <p className="text-sm text-[--muted-foreground]">
                            Nếu có thể, quay video triệu chứng (mặt lệch, tay yếu) để cho bác sĩ xem.
                        </p>
                    </div>
                    <div className="bg-[--background] border border-[--border] rounded-xl p-4">
                        <h3 className="font-semibold mb-2">💊 Ghi nhớ thuốc đang dùng</h3>
                        <p className="text-sm text-[--muted-foreground]">
                            Mang theo toa thuốc hoặc liệt kê các thuốc bệnh nhân đang sử dụng.
                        </p>
                    </div>
                    <div className="bg-[--background] border border-[--border] rounded-xl p-4">
                        <h3 className="font-semibold mb-2">🏥 Nới lỏng quần áo</h3>
                        <p className="text-sm text-[--muted-foreground]">
                            Nới lỏng cổ áo, thắt lưng để bệnh nhân dễ thở hơn.
                        </p>
                    </div>
                </div>
            </section>

            {/* Actions */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link href="/call-script">
                    <Button variant="primary" size="lg" className="w-full">
                        📞 Nói gì khi gọi cấp cứu?
                    </Button>
                </Link>
                <Link href="/">
                    <Button variant="outline" size="lg" className="w-full">
                        ← Về trang chủ
                    </Button>
                </Link>
            </section>
        </div>
    )
}
