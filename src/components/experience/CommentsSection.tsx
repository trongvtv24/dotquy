'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Comment {
    id: string
    author_name: string
    content: string
    created_at: string
}

export default function CommentsSection({ postSlug }: { postSlug: string }) {
    const supabase = createClient()
    const [comments, setComments] = useState<Comment[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Form states
    const [authorName, setAuthorName] = useState('')
    const [content, setContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    // Word count calculation
    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
    const CONTENT_LIMIT = 500
    const isOverLimit = wordCount > CONTENT_LIMIT

    useEffect(() => {
        async function fetchComments() {
            try {
                const { data, error } = await supabase
                    .from('comments')
                    .select('id, author_name, content, created_at')
                    .eq('post_slug', postSlug)
                    .order('created_at', { ascending: false })

                if (error) throw error
                setComments(data || [])
            } catch (err) {
                console.error('Error fetching comments:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchComments()
    }, [postSlug, supabase])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!content.trim()) {
            setError('Vui lòng nhập nội dung bình luận.')
            return
        }

        if (isOverLimit) {
            setError(`Nội dung không được vươt quá ${CONTENT_LIMIT} chữ.`)
            return
        }

        setIsSubmitting(true)
        const finalAuthorName = authorName.trim() || 'Ẩn danh'

        try {
            const newComment = {
                post_slug: postSlug,
                author_name: finalAuthorName,
                content: content.trim()
            }

            const { data, error } = await supabase
                .from('comments')
                .insert([newComment])
                .select()

            if (error) throw error

            // Update UI optimistically if response has data
            if (data && data[0]) {
                setComments([data[0] as Comment, ...comments])
            }

            // Reset form
            setContent('')
            setAuthorName('')
        } catch (err) {
            console.error('Error submitting comment:', err)
            setError('Có lỗi xảy ra khi gửi bình luận. Vui lòng thử lại sau.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()

        // Very basic relative time
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMins / 60)
        const diffDays = Math.floor(diffHours / 24)

        if (diffMins < 1) return 'Vừa xong'
        if (diffMins < 60) return `${diffMins} phút trước`
        if (diffHours < 24) return `${diffHours} giờ trước`
        if (diffDays < 7) return `${diffDays} ngày trước`

        return date.toLocaleDateString('vi-VN')
    }

    return (
        <div className="mt-16 pt-10 border-t border-[--border]">
            <h3 className="text-2xl font-bold text-[--foreground] mb-8">Bình luận suy nghĩ của bạn</h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-12 bg-[--muted] p-6 rounded-2xl border border-[--border]">
                {error && (
                    <div className="mb-4 p-3 bg-[--emergency-red] bg-opacity-10 text-[--emergency-red] rounded-lg text-sm border border-[--emergency-red]">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Tên của bạn (hoặc để trống để ẩn danh)"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[--border] bg-[--background] text-[--foreground] focus:outline-none focus:ring-2 focus:ring-[--foreground] transition-shadow"
                        maxLength={50}
                    />
                </div>

                <div className="mb-2 relative">
                    <textarea
                        placeholder="Chia sẻ suy nghĩ của bạn về kinh nghiệm này..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl border bg-[--background] text-[--foreground] focus:outline-none focus:ring-2 transition-shadow resize-none ${isOverLimit
                                ? 'border-[--emergency-red] focus:ring-[--emergency-red]'
                                : 'border-[--border] focus:ring-[--foreground]'
                            }`}
                        required
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <div className={`text-sm font-medium ${isOverLimit ? 'text-[--emergency-red]' : 'text-[--muted-foreground]'}`}>
                        {wordCount} / {CONTENT_LIMIT} chữ
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting || isOverLimit || !content.trim()}
                        className="px-6 py-2.5 bg-[--foreground] text-[--background] rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Đang gửi...' : 'Gửi bình luận'}
                    </button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
                {isLoading ? (
                    <div className="text-center text-[--muted-foreground] py-8">Đang tải bình luận...</div>
                ) : comments.length === 0 ? (
                    <div className="text-center text-[--muted-foreground] py-12 border border-dashed border-[--border] rounded-2xl">
                        Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ suy nghĩ!
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-[--muted] border border-[--border] rounded-full flex items-center justify-center text-lg font-bold text-[--foreground]">
                                {comment.author_name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 bg-[--background] border border-[--border] p-5 rounded-2xl rounded-tl-none shadow-sm">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h4 className="font-bold text-[--foreground]">{comment.author_name}</h4>
                                    <time className="text-xs text-[--muted-foreground]">{formatDate(comment.created_at)}</time>
                                </div>
                                <p className="text-[--foreground] text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
