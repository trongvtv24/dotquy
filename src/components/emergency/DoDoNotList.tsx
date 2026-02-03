import { Card, CardTitle, CardContent } from '@/components/ui'

const DO_ITEMS = [
    { icon: '📞', text: 'Gọi cấp cứu 115 hoặc số địa phương' },
    { icon: '⏰', text: 'Ghi lại giờ khởi phát / lần cuối bình thường' },
    { icon: '🛏️', text: 'Để người bệnh nằm yên, đầu hơi cao' },
    { icon: '👀', text: 'Theo dõi ý thức và hơi thở' },
    { icon: '📋', text: 'Chuẩn bị thông tin: triệu chứng, thuốc, bệnh nền' },
]

const DONT_ITEMS = [
    { icon: '🍽️', text: 'KHÔNG cho ăn uống (nguy cơ sặc)' },
    { icon: '💊', text: 'KHÔNG tự ý cho uống thuốc' },
    { icon: '⏳', text: 'KHÔNG chờ "tự hết" - mỗi phút đều quan trọng' },
    { icon: '🚗', text: 'Hạn chế tự lái xe, ưu tiên gọi cấp cứu' },
]

interface DoDoNotListProps {
    variant?: 'full' | 'compact'
    className?: string
}

export function DoDoNotList({ variant = 'full', className = '' }: DoDoNotListProps) {
    const displayDo = variant === 'compact' ? DO_ITEMS.slice(0, 3) : DO_ITEMS
    const displayDont = variant === 'compact' ? DONT_ITEMS.slice(0, 2) : DONT_ITEMS

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
            {/* DO Card */}
            <Card variant="do" padding="lg">
                <CardTitle className="text-[--emergency-green] flex items-center gap-2 mb-4">
                    <span className="text-xl">✓</span>
                    NÊN LÀM
                </CardTitle>
                <CardContent>
                    <ul className="space-y-3">
                        {displayDo.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="text-lg flex-shrink-0">{item.icon}</span>
                                <span className="text-[--foreground]">{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* DON'T Card */}
            <Card variant="dont" padding="lg">
                <CardTitle className="text-[--emergency-red] flex items-center gap-2 mb-4">
                    <span className="text-xl">✗</span>
                    KHÔNG LÀM
                </CardTitle>
                <CardContent>
                    <ul className="space-y-3">
                        {displayDont.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="text-lg flex-shrink-0">{item.icon}</span>
                                <span className="text-[--foreground]">{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

// Individual list components
export function DoList({ className = '' }: { className?: string }) {
    return (
        <Card variant="do" padding="lg" className={className}>
            <CardTitle className="text-[--emergency-green] flex items-center gap-2 mb-4">
                <span className="text-xl">✓</span>
                NÊN LÀM
            </CardTitle>
            <CardContent>
                <ul className="space-y-3">
                    {DO_ITEMS.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

export function DontList({ className = '' }: { className?: string }) {
    return (
        <Card variant="dont" padding="lg" className={className}>
            <CardTitle className="text-[--emergency-red] flex items-center gap-2 mb-4">
                <span className="text-xl">✗</span>
                KHÔNG LÀM
            </CardTitle>
            <CardContent>
                <ul className="space-y-3">
                    {DONT_ITEMS.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
