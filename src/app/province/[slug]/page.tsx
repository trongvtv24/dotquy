import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button, Card, Badge } from '@/components/ui'
import type { Province, EmergencyContact } from '@/lib/types/database'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const supabase = await createClient()

    const { data: province } = await supabase
        .from('provinces')
        .select('name')
        .eq('slug', slug)
        .single()

    if (!province) {
        return {
            title: 'Không tìm thấy tỉnh - DOTQUY.NHANH',
        }
    }

    const typedProvince = province as { name: string }

    return {
        title: `Số cấp cứu ${typedProvince.name} - DOTQUY.NHANH`,
        description: `Số điện thoại cấp cứu đột quỵ tại ${typedProvince.name}. Gọi ngay khi có dấu hiệu đột quỵ.`,
    }
}

export default async function ProvincePage({ params }: PageProps) {
    const { slug } = await params
    const supabase = await createClient()

    // Get province
    const { data: province, error: provinceError } = await supabase
        .from('provinces')
        .select('*')
        .eq('slug', slug)
        .single()

    if (provinceError || !province) {
        notFound()
    }

    const typedProvince = province as Province

    // Get emergency contacts for this province
    const { data: contacts } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq('province_id', typedProvince.id)
        .in('status', ['active', 'needs_verify'])
        .order('status', { ascending: true })

    const typedContacts = (contacts || []) as EmergencyContact[]

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="mb-6">
                <Link href="/" className="text-[--primary] hover:underline text-sm mb-2 inline-block">
                    ← Về trang chủ
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-[--foreground]">
                    📍 Cấp cứu tại {typedProvince.name}
                </h1>
            </div>

            {/* Fallback 115 */}
            <Card variant="emergency" className="mb-6">
                <div className="text-center">
                    <p className="text-lg mb-2">Số cấp cứu toàn quốc</p>
                    <a
                        href="tel:115"
                        className="text-4xl md:text-5xl font-bold hover:underline"
                    >
                        📞 115
                    </a>
                    <p className="text-sm mt-2 opacity-90">
                        Luôn hoạt động 24/7. Gọi ngay nếu không liên lạc được số địa phương.
                    </p>
                </div>
            </Card>

            {/* Local Emergency Contacts */}
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">
                    🏥 Bệnh viện tại {typedProvince.name}
                </h2>

                {typedContacts.length === 0 ? (
                    <Card className="text-center py-8">
                        <p className="text-[--muted-foreground] mb-3">
                            Chưa có thông tin bệnh viện tại {typedProvince.name}.
                        </p>
                        <p className="text-sm text-[--muted-foreground]">
                            Vui lòng gọi <strong>115</strong> để được hỗ trợ.
                        </p>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {typedContacts.map(contact => (
                            <Card key={contact.id} className="relative">
                                {/* Status Badge */}
                                {contact.status === 'needs_verify' && (
                                    <Badge variant="warning" className="absolute top-3 right-3">
                                        ⚠️ Chưa xác minh
                                    </Badge>
                                )}

                                <h3 className="font-bold text-lg mb-2 pr-24">
                                    {contact.hospital_name}
                                </h3>

                                {/* Phone */}
                                <a
                                    href={`tel:${contact.emergency_phone}`}
                                    className="inline-flex items-center gap-2 text-xl font-bold text-[--emergency-red] hover:underline mb-3"
                                >
                                    📞 {contact.emergency_phone}
                                </a>

                                {/* Address */}
                                {contact.address && (
                                    <p className="text-sm text-[--muted-foreground] mb-2">
                                        📍 {contact.address}
                                    </p>
                                )}

                                {/* Map Link */}
                                {contact.map_url && (
                                    <a
                                        href={contact.map_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[--primary] hover:underline"
                                    >
                                        🗺️ Xem trên bản đồ →
                                    </a>
                                )}

                                {/* Verification Info */}
                                {contact.last_verified_at && (
                                    <p className="text-xs text-[--muted-foreground] mt-3 pt-3 border-t border-[--border]">
                                        Xác minh lần cuối: {new Date(contact.last_verified_at).toLocaleDateString('vi-VN')}
                                        {contact.source_name && ` • Nguồn: ${contact.source_name}`}
                                    </p>
                                )}
                            </Card>
                        ))}
                    </div>
                )}
            </section>

            {/* Warning */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                    ⚠️ <strong>Lưu ý:</strong> Thông tin có thể thay đổi. Nếu không liên lạc được,
                    hãy gọi ngay <strong>115</strong>.
                </p>
            </div>

            {/* Report Wrong Number */}
            <div className="text-center">
                <Link href="/feedback">
                    <Button variant="ghost" size="sm">
                        📝 Báo số sai / Góp ý thông tin
                    </Button>
                </Link>
            </div>
        </div>
    )
}
