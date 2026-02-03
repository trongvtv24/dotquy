import { PageSkeleton } from '@/components/ui'

export default function Loading() {
    return (
        <div className="min-h-screen">
            {/* Hero skeleton */}
            <div className="bg-gradient-to-b from-[--muted] to-[--background] p-4 pt-8 pb-12">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-[--border] rounded w-3/4 mx-auto" />
                    <div className="h-6 bg-[--border] rounded w-1/2 mx-auto" />
                    <div className="h-20 bg-[--border] rounded-2xl mt-6" />
                </div>
            </div>

            {/* Content skeleton */}
            <PageSkeleton />
        </div>
    )
}
