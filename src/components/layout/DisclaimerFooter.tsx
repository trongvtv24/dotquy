import Link from 'next/link'

export function DisclaimerFooter() {
    return (
        <div className="bg-[--muted] border-t border-[--border] py-4 px-4 text-center">
            <p className="text-sm text-[--muted-foreground] max-w-2xl mx-auto">
                <strong>⚠️ Lưu ý:</strong> Website này cung cấp thông tin y tế để hỗ trợ nhận biết đột quỵ,
                <strong> không thay thế chẩn đoán và điều trị của bác sĩ</strong>.
                Khi nghi ngờ đột quỵ, hãy đi cấp cứu ngay.{' '}
                <Link href="/about" className="underline hover:text-[--emergency-red]">
                    Tìm hiểu thêm
                </Link>
            </p>
        </div>
    )
}
