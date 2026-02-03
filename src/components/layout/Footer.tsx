import Link from 'next/link'

export function Footer() {
    return (
        <footer className="bg-[--muted] border-t border-[--border] py-8 mb-16 md:mb-0">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="font-bold text-[--foreground] mb-3">DOTQUY.NHANH</h3>
                        <p className="text-sm text-[--muted-foreground]">
                            Hỗ trợ nhận biết và phản ứng nhanh với đột quỵ.
                            Mỗi phút trì hoãn có thể gây tổn thương não vĩnh viễn.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-[--foreground] mb-3">Liên kết nhanh</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/fast" className="text-[--muted-foreground] hover:text-[--emergency-red]">
                                    Test BE FAST
                                </Link>
                            </li>
                            <li>
                                <Link href="/what-to-do-now" className="text-[--muted-foreground] hover:text-[--emergency-red]">
                                    Làm gì khi nghi đột quỵ
                                </Link>
                            </li>
                            <li>
                                <Link href="/learn" className="text-[--muted-foreground] hover:text-[--emergency-red]">
                                    Tìm hiểu về đột quỵ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Emergency */}
                    <div>
                        <h3 className="font-bold text-[--foreground] mb-3">Cấp cứu</h3>
                        <a
                            href="tel:115"
                            className="inline-flex items-center gap-2 text-[--emergency-red] font-bold text-xl hover:underline"
                        >
                            📞 115
                        </a>
                        <p className="text-sm text-[--muted-foreground] mt-2">
                            Số cấp cứu toàn quốc
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-[--border] text-center text-sm text-[--muted-foreground]">
                    <p>© 2026 DOTQUY.NHANH. Thông tin y tế, không thay thế chẩn đoán.</p>
                </div>
            </div>
        </footer>
    )
}
