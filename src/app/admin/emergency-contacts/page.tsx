'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button, Card, Badge, Input } from '@/components/ui'
import type { EmergencyContact, Province } from '@/lib/types/database'

interface ContactWithProvince extends EmergencyContact {
    provinces?: { name: string; slug: string }
}

export default function EmergencyContactsPage() {
    const [contacts, setContacts] = useState<ContactWithProvince[]>([])
    const [provinces, setProvinces] = useState<Province[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<string>('all')
    const [selectedProvince, setSelectedProvince] = useState<string>('all')
    const searchParams = useSearchParams()

    // Get initial status from URL params
    useEffect(() => {
        const statusParam = searchParams.get('status')
        if (statusParam) {
            setSelectedStatus(statusParam)
        }
    }, [searchParams])

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        const supabase = createClient()

        // Load provinces
        const { data: provincesData } = await supabase
            .from('provinces')
            .select('*')
            .order('name')

        setProvinces((provincesData || []) as Province[])

        // Load contacts with province info
        const { data: contactsData } = await supabase
            .from('emergency_contacts')
            .select('*, provinces(name, slug)')
            .order('created_at', { ascending: false })

        setContacts((contactsData || []) as ContactWithProvince[])
        setIsLoading(false)
    }

    async function deleteContact(id: string) {
        if (!confirm('Bạn có chắc muốn xóa số cấp cứu này?')) return

        const supabase = createClient()
        const { error } = await supabase
            .from('emergency_contacts')
            .delete()
            .eq('id', id)

        if (error) {
            alert('Lỗi khi xóa: ' + error.message)
            return
        }

        // Refresh data
        loadData()
    }

    async function updateStatus(id: string, newStatus: string) {
        const supabase = createClient()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any)
            .from('emergency_contacts')
            .update({
                status: newStatus,
                last_verified_at: newStatus === 'active' ? new Date().toISOString() : undefined
            })
            .eq('id', id)

        if (error) {
            alert('Lỗi khi cập nhật: ' + error.message)
            return
        }

        loadData()
    }

    // Filter contacts
    const filteredContacts = contacts.filter(contact => {
        // Status filter
        if (selectedStatus !== 'all' && contact.status !== selectedStatus) {
            return false
        }

        // Province filter
        if (selectedProvince !== 'all' && contact.province_id !== selectedProvince) {
            return false
        }

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            const matchesHospital = contact.hospital_name.toLowerCase().includes(query)
            const matchesPhone = contact.emergency_phone.includes(query)
            const matchesProvince = contact.provinces?.name.toLowerCase().includes(query)

            if (!matchesHospital && !matchesPhone && !matchesProvince) {
                return false
            }
        }

        return true
    })

    const statusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge variant="success">Hoạt động</Badge>
            case 'needs_verify':
                return <Badge variant="warning">Cần xác minh</Badge>
            case 'inactive':
                return <Badge variant="default">Ngừng hoạt động</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Danh bạ cấp cứu</h1>
                <Link href="/admin/emergency-contacts/new">
                    <Button variant="primary">
                        ➕ Thêm mới
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <Card className="p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium mb-1.5">Tìm kiếm</label>
                        <Input
                            type="text"
                            placeholder="Tên bệnh viện, số điện thoại..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium mb-1.5">Trạng thái</label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-[--border] bg-[--background] text-[--foreground]"
                        >
                            <option value="all">Tất cả</option>
                            <option value="active">Hoạt động</option>
                            <option value="needs_verify">Cần xác minh</option>
                            <option value="inactive">Ngừng hoạt động</option>
                        </select>
                    </div>

                    {/* Province Filter */}
                    <div>
                        <label className="block text-sm font-medium mb-1.5">Tỉnh/TP</label>
                        <select
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-[--border] bg-[--background] text-[--foreground]"
                        >
                            <option value="all">Tất cả tỉnh/TP</option>
                            {provinces.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </Card>

            {/* Results */}
            {isLoading ? (
                <div className="text-center py-12">
                    <div className="animate-spin h-8 w-8 border-4 border-[--primary] border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-[--muted-foreground]">Đang tải...</p>
                </div>
            ) : filteredContacts.length === 0 ? (
                <Card className="p-8 text-center">
                    <p className="text-[--muted-foreground]">Không tìm thấy kết quả</p>
                </Card>
            ) : (
                <div className="space-y-3">
                    <p className="text-sm text-[--muted-foreground]">
                        Tìm thấy {filteredContacts.length} kết quả
                    </p>

                    {filteredContacts.map(contact => (
                        <Card key={contact.id} className="p-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-bold">{contact.hospital_name}</h3>
                                        {statusBadge(contact.status || 'needs_verify')}
                                    </div>

                                    <p className="text-lg font-mono text-[--primary] mb-2">
                                        📞 {contact.emergency_phone}
                                    </p>

                                    <div className="text-sm text-[--muted-foreground] space-y-1">
                                        {contact.provinces && (
                                            <p>📍 {contact.provinces.name}</p>
                                        )}
                                        {contact.address && (
                                            <p>🏥 {contact.address}</p>
                                        )}
                                        {contact.last_verified_at && (
                                            <p>
                                                ✅ Xác minh: {new Date(contact.last_verified_at).toLocaleDateString('vi-VN')}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2">
                                    <Link href={`/admin/emergency-contacts/${contact.id}/edit`}>
                                        <Button variant="outline" size="sm" className="w-full">
                                            ✏️ Sửa
                                        </Button>
                                    </Link>

                                    {contact.status === 'needs_verify' && (
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => updateStatus(contact.id, 'active')}
                                        >
                                            ✅ Xác minh
                                        </Button>
                                    )}

                                    {contact.status === 'active' && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => updateStatus(contact.id, 'inactive')}
                                        >
                                            🚫 Tắt
                                        </Button>
                                    )}

                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => deleteContact(contact.id)}
                                    >
                                        🗑️ Xóa
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
