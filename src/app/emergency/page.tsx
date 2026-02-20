import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Khẩn cấp - DOTQUY.NHANH',
    description: 'Trang khẩn cấp tối giản. Gọi cấp cứu ngay khi nghi đột quỵ.',
}

export default function EmergencyPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-[--emergency-red]/5">
            {/* Urgent Message */}
            <div className="text-center mb-8">
                <div className="text-6xl mb-4">🚨</div>
                <h1 className="text-3xl md:text-4xl font-bold text-[--emergency-red] mb-2">
                    NGHI ĐỘT QUỴ?
                </h1>
                <p className="text-xl text-[--foreground] font-medium">
                    GỌI CẤP CỨU NGAY
                </p>
            </div>



            {/* Quick Reminders */}
            <div className="max-w-md w-full space-y-4 mb-8">
                <div className="bg-[--background] border border-[--border] rounded-xl p-4">
                    <h2 className="font-bold text-lg mb-3 text-[--foreground]">
                        ✅ LÀM NGAY
                    </h2>
                    <ul className="space-y-2 text-[--foreground]">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600">•</span>
                            <span>Gọi cấp cứu ngay lập tức</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600">•</span>
                            <span>Ghi nhớ giờ triệu chứng bắt đầu</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600">•</span>
                            <span>Để người bệnh nằm nghiêng, đầu cao</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-[--background] border border-[--border] rounded-xl p-4">
                    <h2 className="font-bold text-lg mb-3 text-[--emergency-red]">
                        ⛔ KHÔNG LÀM
                    </h2>
                    <ul className="space-y-2 text-[--foreground]">
                        <li className="flex items-start gap-2">
                            <span className="text-[--emergency-red]">•</span>
                            <span>Không cho ăn uống</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[--emergency-red]">•</span>
                            <span>Không tự ý dùng thuốc</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[--emergency-red]">•</span>
                            <span>Không chờ &quot;xem sao&quot;</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href="/"
                    className="px-6 py-3 bg-[--muted] hover:bg-[--muted]/80 rounded-lg text-center font-medium transition-colors"
                >
                    ← Về trang chủ
                </Link>
                <Link
                    href="/call-script"
                    className="px-6 py-3 bg-[--primary] text-[--primary-foreground] hover:opacity-90 rounded-lg text-center font-medium transition-opacity"
                >
                    📞 Nói gì khi gọi cấp cứu?
                </Link>
            </div>
        </div>
    )
}
