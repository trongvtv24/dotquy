'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button, Card, Input } from '@/components/ui'
import type { EmergencyContact, Province } from '@/lib/types/database'
import Link from 'next/link'

interface ContactForm {
    hospital_name: string
    emergency_phone: string
    address: string
    map_url: string
    province_id: string
    status: string
    source_name: string
}

export default function EditEmergencyContactPage() {
    const router = useRouter()
    const params = useParams()
    const contactId = params.id as string
    const isNew = contactId === 'new'

    const [form, setForm] = useState<ContactForm>({
        hospital_name: '',
        emergency_phone: '',
        address: '',
        map_url: '',
        province_id: '',
        status: 'needs_verify',
        source_name: '',
    })
    const [provinces, setProvinces] = useState<Province[]>([])
    const [isLoading, setIsLoading] = useState(!isNew)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        loadData()
    }, [contactId])

    async function loadData() {
        const supabase = createClient()

        // Load provinces
        const { data: provincesData } = await supabase
            .from('provinces')
            .select('*')
            .order('name')

        setProvinces((provincesData || []) as Province[])

        // Load existing contact if editing
        if (!isNew) {
            const { data: contact, error } = await supabase
                .from('emergency_contacts')
                .select('*')
                .eq('id', contactId)
                .single()

            if (error || !contact) {
                setError('Không tìm thấy số cấp cứu này')
                setIsLoading(false)
                return
            }

            const typedContact = contact as EmergencyContact
            setForm({
                hospital_name: typedContact.hospital_name,
                emergency_phone: typedContact.emergency_phone,
                address: typedContact.address || '',
                map_url: typedContact.map_url || '',
                province_id: typedContact.province_id,
                status: typedContact.status || 'needs_verify',
                source_name: typedContact.source_name || '',
            })
        }

        setIsLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        setError(null)

        // Validation
        if (!form.hospital_name.trim()) {
            setError('Vui lòng nhập tên bệnh viện')
            setIsSaving(false)
            return
        }
        if (!form.emergency_phone.trim()) {
            setError('Vui lòng nhập số điện thoại')
            setIsSaving(false)
            return
        }
        if (!form.province_id) {
            setError('Vui lòng chọn tỉnh/thành phố')
            setIsSaving(false)
            return
        }

        try {
            const supabase = createClient()

            const contactData = {
                hospital_name: form.hospital_name.trim(),
                emergency_phone: form.emergency_phone.trim(),
                address: form.address.trim() || null,
                map_url: form.map_url.trim() || null,
                province_id: form.province_id,
                status: form.status,
                source_name: form.source_name.trim() || null,
                ...(form.status === 'active' ? { last_verified_at: new Date().toISOString() } : {}),
            }

            if (isNew) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { error } = await (supabase as any)
                    .from('emergency_contacts')
                    .insert([contactData])

                if (error) throw error
            } else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { error } = await (supabase as any)
                    .from('emergency_contacts')
                    .update(contactData)
                    .eq('id', contactId)

                if (error) throw error
            }

            router.push('/admin/emergency-contacts')
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Đã có lỗi xảy ra')
            }
        } finally {
            setIsSaving(false)
        }
    }

    const updateField = (field: keyof ContactForm, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-[--primary] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-[--muted-foreground]">Đang tải...</p>
            </div>
        )
    }

    return (
        <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/emergency-contacts" className="text-[--muted-foreground] hover:text-[--foreground]">
                    ← Quay lại
                </Link>
                <h1 className="text-2xl font-bold">
                    {isNew ? 'Thêm số cấp cứu' : 'Sửa số cấp cứu'}
                </h1>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <Card className="p-6 mb-6">
                    <h2 className="font-bold mb-4">Thông tin bệnh viện</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Tên bệnh viện <span className="text-[--emergency-red]">*</span>
                            </label>
                            <Input
                                value={form.hospital_name}
                                onChange={(e) => updateField('hospital_name', e.target.value)}
                                placeholder="VD: Bệnh viện Chợ Rẫy"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Số điện thoại cấp cứu <span className="text-[--emergency-red]">*</span>
                            </label>
                            <Input
                                value={form.emergency_phone}
                                onChange={(e) => updateField('emergency_phone', e.target.value)}
                                placeholder="VD: 1900 5678 90"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">
                                Tỉnh/Thành phố <span className="text-[--emergency-red]">*</span>
                            </label>
                            <select
                                value={form.province_id}
                                onChange={(e) => updateField('province_id', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-[--border] bg-[--background] text-[--foreground]"
                                required
                            >
                                <option value="">Chọn tỉnh/thành phố</option>
                                {provinces.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Địa chỉ</label>
                            <Input
                                value={form.address}
                                onChange={(e) => updateField('address', e.target.value)}
                                placeholder="VD: 201B Nguyễn Chí Thanh, Q.5, TP.HCM"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Link bản đồ</label>
                            <Input
                                type="url"
                                value={form.map_url}
                                onChange={(e) => updateField('map_url', e.target.value)}
                                placeholder="https://maps.google.com/..."
                            />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 mb-6">
                    <h2 className="font-bold mb-4">Trạng thái & Nguồn</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Trạng thái</label>
                            <select
                                value={form.status}
                                onChange={(e) => updateField('status', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-[--border] bg-[--background] text-[--foreground]"
                            >
                                <option value="needs_verify">Cần xác minh</option>
                                <option value="active">Hoạt động (đã xác minh)</option>
                                <option value="inactive">Ngừng hoạt động</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Nguồn thông tin</label>
                            <Input
                                value={form.source_name}
                                onChange={(e) => updateField('source_name', e.target.value)}
                                placeholder="VD: Website chính thức, Sở Y tế..."
                            />
                        </div>
                    </div>
                </Card>

                <div className="flex gap-3">
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        isLoading={isSaving}
                    >
                        {isNew ? 'Thêm mới' : 'Lưu thay đổi'}
                    </Button>

                    <Link href="/admin/emergency-contacts">
                        <Button type="button" variant="outline" size="lg">
                            Hủy
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    )
}
