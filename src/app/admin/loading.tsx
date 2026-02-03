import { PageSkeleton } from '@/components/ui'

export default function AdminLoading() {
    return (
        <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="flex justify-between items-center mb-6">
                <div className="h-8 bg-[--muted] rounded w-48" />
                <div className="h-10 bg-[--muted] rounded w-32" />
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-[--muted] rounded-xl p-6 h-32" />
                ))}
            </div>

            {/* Content skeleton */}
            <PageSkeleton />
        </div>
    )
}
