import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="text-center">
                {/* Icon */}
                <div className="text-6xl mb-6">😕</div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-[--foreground] mb-4">
                    Không tìm thấy trang
                </h1>

                {/* Description */}
                <p className="text-[--muted-foreground] mb-8 max-w-md mx-auto">
                    Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-[--primary] text-[--primary-foreground] rounded-xl font-bold shadow-md hover:opacity-90 transition-opacity"
                    >
                        Về trang chủ
                    </Link>

                    <a
                        href="tel:115"
                        className="px-6 py-3 bg-[--emergency-red] text-white rounded-xl font-bold shadow-md hover:bg-[--emergency-red-dark] transition-colors"
                    >
                        📞 Gọi 115
                    </a>
                </div>

                {/* Emergency reminder */}
                <p className="mt-8 text-sm text-[--muted-foreground]">
                    Nếu bạn cần cấp cứu, hãy gọi <strong>115</strong> ngay!
                </p>
            </div>
        </div>
    )
}
