import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function DaftarLokasi({ addresses = [] }) {
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = (id) => {
        setDeleteConfirm(id);
    };

    const confirmDelete = () => {
        if (!deleteConfirm) return;
        setDeleting(true);
        router.delete(route('location.destroy', deleteConfirm), {
            onFinish: () => {
                setDeleting(false);
                setDeleteConfirm(null);
            },
            preserveScroll: true,
        });
    };

    const cancelDelete = () => {
        setDeleteConfirm(null);
    };

    const handleSetActive = (id) => {
        router.post(route('location.set-active', id), {}, {
            preserveScroll: true,
        });
    };

    const getLabelIcon = (label) => {
        switch (label) {
            case 'Rumah':
                return (
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 8L9 1L17 8V19C17 19.5523 16.5523 20 16 20H2C1.44772 20 1 19.5523 1 19V8Z" stroke="#2790c3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 20V10H12V20" stroke="#2790c3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                );
            case 'Kantor':
                return (
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 17V7C1 5.89543 1.89543 5 3 5H7V3C7 1.89543 7.89543 1 9 1H11C12.1046 1 13 1.89543 13 3V5H17C18.1046 5 19 5.89543 19 7V17M1 17H19M1 17H0M19 17H20M7 5H13M7 5V17H13V5" stroke="#a03bb1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 9H11V11H9V9Z" fill="#a03bb1"/>
                        <path d="M9 13H11V15H9V13Z" fill="#a03bb1"/>
                    </svg>
                );
            default:
                return (
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="6" r="4" stroke="#2790c3" strokeWidth="2"/>
                        <path d="M1 19C1 15.134 4.13401 12 8 12H10C13.866 12 17 15.134 17 19" stroke="#2790c3" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                );
        }
    };

    const getIconBgColor = (label) => {
        switch (label) {
            case 'Rumah': return '#2790c3';
            case 'Kantor': return '#a03bb1';
            default: return '#2790c3';
        }
    };

    const formatAddress = (addr) => {
        const parts = [addr.address, addr.province, addr.postal_code].filter(Boolean);
        return parts.join(', ');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Sen, sans-serif' }}>
            <Head title="Alamat Saya" />

            {/* Top Bar */}
            <div className="flex items-center px-4 py-3">
                <button
                    onClick={() => window.history.length > 1 ? window.history.back() : router.get(route('home'))}
                    className="flex items-center justify-center"
                    style={{
                        width: '45px',
                        height: '45px',
                        backgroundColor: '#ecf0f4',
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L1.70711 8.29289C1.31658 8.68342 1.31658 9.31658 1.70711 9.70711L9 17" stroke="#32343e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <span
                    className="ml-4"
                    style={{
                        fontFamily: 'Sen, sans-serif',
                        fontSize: '17px',
                        fontWeight: 400,
                        color: '#32343e',
                    }}
                >
                    Alamat Saya
                </span>
            </div>

            {/* Address List */}
            <div className="flex-1 px-6 overflow-y-auto">
                {addresses.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center mt-20">
                        <div
                            className="flex items-center justify-center mb-4"
                            style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: '#f0f5fa',
                                borderRadius: '50%',
                            }}
                        >
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#a0a5ba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#a0a5ba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <p
                            className="text-center"
                            style={{
                                fontFamily: 'Sen, sans-serif',
                                fontSize: '16px',
                                color: '#a0a5ba',
                            }}
                        >
                            Belum ada alamat tersimpan
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 pt-2">
                        {addresses.map((addr) => (
                            <div
                                key={addr.id}
                                className="relative flex items-start p-4"
                                style={{
                                    backgroundColor: '#f0f5fa',
                                    borderRadius: '16px',
                                    minHeight: '101px',
                                }}
                            >
                                {/* Label Icon */}
                                <div
                                    className="flex items-center justify-center flex-shrink-0"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        backgroundColor: '#ffffff',
                                        borderRadius: '8px',
                                    }}
                                >
                                    {getLabelIcon(addr.label)}
                                </div>

                                {/* Address Info */}
                                <div className="ml-3 flex-1 min-w-0">
                                    <h3
                                        className="mb-1"
                                        style={{
                                            fontFamily: 'Sen, sans-serif',
                                            fontSize: '14px',
                                            fontWeight: 400,
                                            color: '#32343e',
                                        }}
                                    >
                                        {addr.label}
                                    </h3>
                                    <p
                                        className="truncate"
                                        style={{
                                            fontFamily: 'Sen, sans-serif',
                                            fontSize: '12px',
                                            color: '#6b6e82',
                                            opacity: 0.5,
                                        }}
                                    >
                                        {formatAddress(addr)}
                                    </p>

                                    {/* Active Badge */}
                                    {addr.is_active && (
                                        <span
                                            className="inline-block mt-1 px-2 py-0.5 text-xs rounded"
                                            style={{
                                                backgroundColor: '#ff7622',
                                                color: '#ffffff',
                                                fontSize: '10px',
                                            }}
                                        >
                                            Aktif
                                        </span>
                                    )}
                                </div>

                                {/* Action Icons */}
                                <div className="flex items-center gap-3 ml-2 flex-shrink-0">
                                    {/* Set Active */}
                                    {!addr.is_active && (
                                        <button
                                            onClick={() => handleSetActive(addr.id)}
                                            className="flex items-center justify-center"
                                            title="Set active"
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '4px',
                                            }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#a0a5ba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    )}

                                    {/* Edit */}
                                    <Link
                                        href={route('location.edit', addr.id)}
                                        className="flex items-center justify-center"
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '4px',
                                        }}
                                    >
                                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.2929 1.29289C11.6834 0.902369 12.3166 0.902369 12.7071 1.29289L14.7071 3.29289C15.0976 3.68342 15.0976 4.31658 14.7071 4.70711L5 14.4142L1 15L1.58579 11L11.2929 1.29289Z" stroke="#fb6d3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </Link>

                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDelete(addr.id)}
                                        className="flex items-center justify-center"
                                        title="Delete"
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '4px',
                                        }}
                                    >
                                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 4H13M2 4L3 14C3 14.5304 3.21071 15.0391 3.58579 15.4142C3.96086 15.7893 4.46957 16 5 16H9C9.53043 16 10.0391 15.7893 10.4142 15.4142C10.7893 15.0391 11 14.5304 11 14L12 4M4 4V2C4 1.46957 4.21071 0.960859 4.58579 0.585786C4.96086 0.210714 5.46957 0 6 0H8C8.53043 0 9.03914 0.210714 9.41421 0.585786C9.78929 0.960859 10 1.46957 10 2V4" stroke="#fb6d3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Spacer for button */}
                <div className="h-24" />
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
                    <div
                        className="bg-white rounded-2xl p-6 w-full max-w-sm"
                        style={{ fontFamily: 'Sen, sans-serif' }}
                    >
                        <h3 className="text-lg font-semibold text-[#32343e] mb-2">Hapus Alamat?</h3>
                        <p className="text-sm text-[#6b6e82] mb-6">
                            Alamat ini akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={cancelDelete}
                                className="flex-1 py-3 rounded-xl text-sm font-semibold text-[#32343e]"
                                style={{ backgroundColor: '#ecf0f4', border: 'none', cursor: 'pointer' }}
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={deleting}
                                className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
                                style={{
                                    backgroundColor: '#ff7622',
                                    border: 'none',
                                    cursor: deleting ? 'not-allowed' : 'pointer',
                                    opacity: deleting ? 0.7 : 1,
                                }}
                            >
                                {deleting ? 'Menghapus...' : 'Hapus'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tambah alamat baru Button */}
            <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-6 pt-2" style={{ background: 'linear-gradient(to top, white 60%, transparent)' }}>
                <Link
                    href={route('location.create')}
                    className="flex items-center justify-center"
                    style={{
                        width: '327px',
                        height: '62px',
                        backgroundColor: '#ff7622',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontFamily: 'Sen, sans-serif',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#ffffff',
                    }}
                >
                    Tambah alamat baru
                </Link>
            </div>
        </div>
    );
}
