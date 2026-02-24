import { notFound } from 'next/navigation'
import { experiences } from '@/lib/experiences'
import Link from 'next/link'
import { ReactNode } from 'react'
import CommentsSection from '@/components/experience/CommentsSection'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params
    const post = experiences.find((exp) => exp.slug === slug)
    if (!post) {
        return {
            title: 'Bài viết không tồn tại',
        }
    }

    return {
        title: `${post.title} - DOTQUY.NHANH`,
        description: post.summary,
    }
}

const renderContent = (content: ReactNode | string) => {
    if (typeof content !== 'string') return content;

    const parseText = (text: string) => {
        const boldParts = text.split(/(\*\*.*?\*\*)/g);
        return boldParts.map((bPart, i) => {
            if (bPart.startsWith('**') && bPart.endsWith('**')) {
                return <strong key={i} className="font-bold">{bPart.slice(2, -2)}</strong>;
            }

            const italicParts = bPart.split(/(\*.*?\*)/g);
            return italicParts.map((iPart, j) => {
                if (iPart.startsWith('*') && iPart.endsWith('*') && !iPart.includes('**')) {
                    return <em key={`${i}-${j}`} className="italic">{iPart.slice(1, -1)}</em>;
                }
                return iPart;
            });
        });
    };

    return content.split('\n').map((paragraph, index) => {
        if (!paragraph.trim()) return <div key={index} className="h-2"></div>;

        return (
            <p key={index} className="mb-4 text-lg text-[--foreground] leading-relaxed whitespace-pre-wrap">
                {parseText(paragraph)}
            </p>
        );
    });
}

export default async function ExperienceArticlePage({ params }: PageProps) {
    const { slug } = await params
    const post = experiences.find((exp) => exp.slug === slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Link
                href="/experience"
                className="inline-flex items-center text-[--muted-foreground] hover:text-[--foreground] mb-8 transition-colors"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Quay lại danh sách
            </Link>

            <article className="bg-[--background] rounded-2xl p-6 md:p-10 border border-[--border] shadow-sm">
                <header className="mb-10 text-center border-b border-[--border] pb-8">
                    <div className="text-sm text-[--emergency-red] font-semibold mb-3">
                        📅 {post.date}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-[--foreground] mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-2">
                        {post.keywords.map((word) => (
                            <span
                                key={word}
                                className="text-xs px-3 py-1 bg-[--muted] text-[--muted-foreground] rounded-full font-medium"
                            >
                                #{word}
                            </span>
                        ))}
                    </div>
                </header>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div className="bg-[--muted] p-6 rounded-xl mb-8 border-l-4 border-[--emergency-red]">
                        <p className="text-[--muted-foreground] font-medium m-0">
                            {post.summary}
                        </p>
                    </div>

                    <div className="article-content">
                        {post.content ? renderContent(post.content) : (
                            <p className="text-center text-[--muted-foreground] italic py-10">
                                Bài viết đang được cập nhật...
                            </p>
                        )}
                    </div>
                </div>
            </article>

            {/* Comments Section */}
            <CommentsSection postSlug={post.slug} />

            {/* Call to action */}
            <div className="mt-12 bg-[--muted] rounded-2xl p-8 text-center border border-[--border]">
                <h3 className="text-xl font-bold mb-4">Chia sẻ kinh nghiệm của bạn</h3>
                <p className="text-[--muted-foreground] mb-6">
                    Mỗi câu chuyện là một bài học quý giá giúp cộng đồng phòng tránh và xử lý đột quỵ tốt hơn.
                </p>
                <Link href="/">
                    <button className="px-8 py-3 bg-[--foreground] text-[--background] rounded-xl font-bold hover:opacity-90 transition-opacity">
                        Về trang chủ
                    </button>
                </Link>
            </div>
        </div>
    )
}
