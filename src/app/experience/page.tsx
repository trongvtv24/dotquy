import { Metadata } from 'next'
import { Card, CardTitle, CardContent } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Kinh nghiệm thực tế - DOTQUY.NHANH',
    description: 'Chia sẻ kinh nghiệm thực tế trong quá trình phòng, chống và xử lý các tình huống khi người thân bị đột quỵ.',
}

const EXPERIENCES = [
    {
        title: 'Biến cố ngày 16/12/2025: Những dấu hiệu đầu tiên của bà nội',
        date: '16/12/2025',
        keywords: ['Mất thăng bằng', 'Méo miệng', 'Sơ cứu'],
        summary: 'Chia sẻ về khoảnh khắc phát hiện bà nội có những dấu hiệu lạ và cách chúng tôi xử lý bước đầu tại nhà.'
    },
    {
        title: 'Hành trình di chuyển đến Trung tâm Đột quỵ Bệnh viện Bạch Mai',
        date: '24/12/2025',
        keywords: ['Bạch Mai', 'Chuyển viện', 'Cấp cứu'],
        summary: 'Quy trình và những lưu ý quan trọng khi quyết định chuyển tuyến điều trị chuyên sâu cho người bệnh.'
    },
    {
        title: 'Kinh nghiệm chăm sóc bệnh nhân tại Trung tâm Đột quỵ',
        date: '30/12/2025',
        keywords: ['Chăm sóc', 'Vật lý trị liệu', 'Dinh dưỡng'],
        summary: 'Những điều cần lưu ý khi chăm sóc người thân tại khoa hồi sức cấp cứu và quá trình phối hợp với bác sĩ.'
    },
    {
        title: 'Bài học về "Thời gian vàng" trong cấp cứu đột quỵ',
        date: '05/01/2026',
        keywords: ['4.5 giờ', 'Cấp cứu', 'Não bộ'],
        summary: 'Tại sao thời gian lại quyết định sự sống còn và khả năng phục hồi của người bệnh sau đột quỵ.'
    },
    {
        title: 'Chuẩn bị tâm lý và đồ dùng cho người nhà bệnh nhân',
        date: '10/01/2026',
        keywords: ['Tâm lý', 'Chuẩn bị', 'Kinh nghiệm'],
        summary: 'Kinh nghiệm chuẩn bị đồ đạc và giữ vững tinh thần để đồng hành cùng người thân trong chặng đường dài.'
    },
    {
        title: 'Phòng ngừa tái phát sau đợt điều trị tại Bạch Mai',
        date: '20/01/2026',
        keywords: ['Phòng ngừa', 'Tái khám', 'Thuốc'],
        summary: 'Các biện pháp duy trì sức khỏe và kiểm soát huyết áp sau khi bệnh nhân ổn định và ra viện.'
    }
]

export default function ExperiencePage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header section */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-[--foreground] mb-4">
                    📖 Kinh nghiệm thực tế
                </h1>
                <p className="text-[--muted-foreground] max-w-3xl mx-auto text-lg">
                    Dự án này được xây dựng dựa trên câu chuyện thực tế của gia đình tôi, khi bà nội bị đột quỵ ngày 16/12/2025
                    và được điều trị tại Trung tâm Đột quỵ - Bệnh viện Bạch Mai từ ngày 24/12/2025.
                </p>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EXPERIENCES.map((exp, index) => (
                    <Card key={index} className="flex flex-col h-full hover:shadow-lg transition-shadow border-[--border]">
                        <div className="p-5 flex flex-col h-full">
                            <div className="text-sm text-[--emergency-red] font-semibold mb-2">
                                📅 {exp.date}
                            </div>
                            <h2 className="text-xl font-bold text-[--foreground] mb-3 leading-tight min-h-[3.5rem]">
                                {exp.title}
                            </h2>
                            <p className="text-[--muted-foreground] text-sm mb-4 line-clamp-3">
                                {exp.summary}
                            </p>
                            <div className="mt-auto pt-4 border-t border-[--border]">
                                <div className="flex flex-wrap gap-2">
                                    {exp.keywords.map(word => (
                                        <span
                                            key={word}
                                            className="text-[10px] px-2 py-1 bg-[--muted] text-[--muted-foreground] rounded-full font-medium"
                                        >
                                            #{word}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Call to action */}
            <div className="mt-16 bg-[--muted] rounded-2xl p-8 text-center border border-[--border]">
                <h3 className="text-xl font-bold mb-4">Bạn cũng muốn chia sẻ câu chuyện?</h3>
                <p className="text-[--muted-foreground] mb-6">
                    Những kinh nghiệm quý báu của bạn có thể giúp ích cho rất nhiều gia đình khác trong lúc hoạn nạn.
                </p>
                <Link href="/">
                    <button className="px-8 py-3 bg-[--foreground] text-[--background] rounded-xl font-bold hover:opacity-90 transition-opacity">
                        Quay lại trang chính
                    </button>
                </Link>
            </div>
        </div>
    )
}
