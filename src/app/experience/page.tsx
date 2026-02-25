import { Metadata } from 'next'
import { Card, CardTitle, CardContent } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Kinh nghiệm thực tế - DOTQUY.NHANH',
    description: 'Chia sẻ kinh nghiệm thực tế trong quá trình phòng, chống và xử lý các tình huống khi người thân bị đột quỵ.',
}

import { experiences } from '@/lib/experiences'

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
                {experiences.map((exp) => (
                    <Link href={`/experience/${exp.slug}`} key={exp.slug} className="block group">
                        <Card className="flex flex-col h-full group-hover:shadow-lg transition-shadow border-[--border]">
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
                    </Link>
                ))}
            </div>

            {/* Call to action */}
            <div className="mt-16 bg-[--muted] rounded-2xl p-8 text-center border border-[--border]">
                <h3 className="text-xl font-bold mb-4">Bạn cũng muốn chia sẻ câu chuyện?</h3>
                <p className="text-[--muted-foreground] mb-6">
                    Những kinh nghiệm quý báu của bạn có thể giúp ích cho rất nhiều gia đình khác trong lúc hoạn nạn.
                </p>
                <Link href="/" className="inline-block px-8 py-3 bg-[--foreground] text-[--background] rounded-xl font-bold hover:opacity-90 transition-opacity">
                    Quay lại trang chính
                </Link>
            </div>
        </div>
    )
}
