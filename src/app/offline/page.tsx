import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Ngoại tuyến - DOTQUY.NHANH',
    description: 'Thông tin cấp cứu đột quỵ khi không có mạng',
}

/**
 * Offline Fallback Page
 * - Hardcoded emergency info (không cần network)
 * - Luôn khả dụng khi mất mạng
 */
export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-[--background] px-4 py-8 pb-24">
            {/* Offline Banner */}
            <div className="bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800 rounded-xl p-4 mb-6 text-center">
                <p className="font-bold text-amber-800 dark:text-amber-200">
                    📴 Bạn đang offline
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Trang này chứa thông tin cấp cứu cơ bản
                </p>
            </div>

            {/* Emergency Call */}
            <section className="mb-8">
                <h1 className="text-2xl font-bold text-center text-[--emergency-red] mb-6">
                    🚨 GỌI CẤP CỨU NGAY
                </h1>

                <a
                    href="tel:115"
                    className="block w-full bg-[--emergency-red] text-white text-center py-6 rounded-2xl text-3xl font-bold shadow-lg active:bg-[--emergency-red-dark] mb-4"
                >
                    📞 115
                </a>

                <p className="text-center text-[--muted-foreground] text-sm">
                    Đường dây nóng cấp cứu y tế toàn quốc
                </p>
            </section>

            {/* BE FAST Signs */}
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">🧠 Dấu hiệu đột quỵ (BE FAST)</h2>

                <div className="space-y-3">
                    <div className="bg-[--muted] rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-[--emergency-red] w-10">B</span>
                            <div>
                                <p className="font-bold">Balance - Thăng bằng</p>
                                <p className="text-sm text-[--muted-foreground]">Đột ngột mất thăng bằng, chóng mặt</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[--muted] rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-[--emergency-red] w-10">E</span>
                            <div>
                                <p className="font-bold">Eyes - Mắt</p>
                                <p className="text-sm text-[--muted-foreground]">Mờ mắt, mất thị lực 1 hoặc 2 mắt</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[--muted] rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-[--emergency-red] w-10">F</span>
                            <div>
                                <p className="font-bold">Face - Mặt</p>
                                <p className="text-sm text-[--muted-foreground]">Méo mặt, miệng lệch một bên</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[--muted] rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-[--emergency-red] w-10">A</span>
                            <div>
                                <p className="font-bold">Arms - Tay</p>
                                <p className="text-sm text-[--muted-foreground]">Yếu hoặc liệt 1 tay, không nâng được</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[--muted] rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-[--emergency-red] w-10">S</span>
                            <div>
                                <p className="font-bold">Speech - Nói</p>
                                <p className="text-sm text-[--muted-foreground]">Nói khó, nói ngọng, không hiểu lời</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[--emergency-red] text-white rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold w-10">T</span>
                            <div>
                                <p className="font-bold">Time - Thời gian</p>
                                <p className="text-sm opacity-90">GỌI 115 NGAY! Mỗi phút đều quan trọng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What to do */}
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">✅ Việc cần làm</h2>

                <div className="bg-[--muted] rounded-xl p-4 space-y-3">
                    <div className="flex items-start gap-3">
                        <span className="text-green-500">✓</span>
                        <p>GỌI 115 ngay lập tức</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500">✓</span>
                        <p>Ghi nhớ thời điểm bắt đầu triệu chứng</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500">✓</span>
                        <p>Đặt người bệnh nằm nghiêng, đầu cao hơn thân</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500">✓</span>
                        <p>Nới lỏng quần áo, thắt lưng</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500">✓</span>
                        <p>Ở bên cạnh, trấn an người bệnh</p>
                    </div>
                </div>
            </section>

            {/* What NOT to do */}
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">❌ KHÔNG làm</h2>

                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-4 space-y-3">
                    <div className="flex items-start gap-3">
                        <span className="text-red-500">✗</span>
                        <p>KHÔNG cho ăn uống khi chưa tỉnh</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-red-500">✗</span>
                        <p>KHÔNG tự ý cho uống thuốc</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-red-500">✗</span>
                        <p>KHÔNG chích máu đầu ngón tay/tai</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-red-500">✗</span>
                        <p>KHÔNG để người bệnh tự đi lại</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-red-500">✗</span>
                        <p>KHÔNG đợi triệu chứng tự hết</p>
                    </div>
                </div>
            </section>

            {/* Golden Time */}
            <section className="mb-8">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl p-6 text-center">
                    <p className="text-lg font-bold mb-2">⏰ THỜI GIAN VÀNG</p>
                    <p className="text-4xl font-black mb-2">4.5 GIỜ</p>
                    <p className="text-sm opacity-90">
                        Điều trị trong 4.5 giờ đầu giúp giảm tối đa tổn thương não
                    </p>
                </div>
            </section>

            {/* Retry Connection */}
            <section className="text-center">
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-[--muted] rounded-xl font-medium"
                >
                    🔄 Thử kết nối lại
                </Link>
            </section>
        </div>
    )
}
