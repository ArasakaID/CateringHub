import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import ConfirmDialog from '@/Components/ConfirmDialog';

export default function Pesanan({ orders }) {
    const [activeTab, setActiveTab] = useState('ongoing');
    const [processingId, setProcessingId] = useState(null);
    const [cancelTarget, setCancelTarget] = useState(null); // { id, cateringName }

    // Show cancel confirmation dialog
    const showCancelDialog = (orderId, cateringName) => {
        setCancelTarget({ id: orderId, cateringName });
    };

    // Execute cancel after confirmation
    const confirmCancel = () => {
        if (!cancelTarget) return;
        setProcessingId(cancelTarget.id);
        router.post(route('pesanan.cancel', cancelTarget.id), {}, {
            onFinish: () => {
                setProcessingId(null);
                setCancelTarget(null);
            },
        });
    };

    // Filter orders based on active tab
    const ongoingOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status));
    const historyOrders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status));
    const filteredOrders = activeTab === 'history' ? historyOrders : ongoingOrders;

    const isOngoing = activeTab === 'ongoing';
    const isHistory = activeTab === 'history';

    const handleReorder = (orderId) => {
        setProcessingId(orderId);
        router.post(route('pesanan.reorder', orderId), {}, {
            onFinish: () => setProcessingId(null),
        });
    };

    const handleTrackOrder = (orderId) => {
        router.visit(route('tracking.show', orderId));
    };

    const handleRate = () => {
        Swal.fire({
            icon: 'info',
            title: 'Info',
            text: 'Fitur rating akan segera tersedia.',
            confirmButtonColor: '#fc6e2a',
        });
    };

    const formatPrice = (price) => {
        return 'Rp ' + Number(price).toLocaleString('id-ID');
    };

    const getBadgeInfo = (status) => {
        if (status === 'delivered') {
            return { label: 'Completed', color: '#059c6a' };
        }
        if (status === 'cancelled') {
            return { label: 'Canceled', color: '#ff0000' };
        }
        return null;
    };

    const hasBadge = (status) => status === 'delivered' || status === 'cancelled';

    const BackArrow = () => (
        <svg width="6" height="11" viewBox="0 0 6 11" fill="none">
            <path d="M5 1L1 5.5L5 10" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    const MoreIcon = () => (
        <svg width="16" height="4" viewBox="0 0 16 4" fill="none">
            <circle cx="2" cy="2" r="1.5" stroke="#181c2e" strokeWidth="2"/>
            <circle cx="8" cy="2" r="1.5" stroke="#181c2e" strokeWidth="2"/>
            <circle cx="14" cy="2" r="1.5" stroke="#181c2e" strokeWidth="2"/>
        </svg>
    );

    return (
        <>
            <Head title="Pesanan - CateringHub" />

            <div className="min-h-screen bg-white" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* ===== TOP BAR ===== */}
                <div className="px-6 pt-[50px] flex items-center justify-between">
                    {/* Back */}
                    <Link
                        href={route('home')}
                        className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0 cursor-pointer hover:bg-gray-200 transition"
                    >
                        <BackArrow />
                    </Link>

                    {/* Title */}
                    <span className="text-[#181c2e] text-[17px] leading-[22px]">
                        Pesanan
                    </span>

                    {/* More button */}
                    <button
                        className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0 cursor-pointer hover:bg-gray-200 transition"
                    >
                        <MoreIcon />
                    </button>
                </div>

                {/* ===== TAB BAR ===== */}
                <div className="mt-[24px] flex justify-center border-b" style={{ gap: '80px', borderColor: '#ced7df' }}>
                    {/* Berlangsung Tab */}
                    <button
                        onClick={() => setActiveTab('ongoing')}
                        className="text-[14px] pb-[12px] cursor-pointer transition-all"
                        style={{
                            color: isOngoing ? '#ff7622' : '#a5a7b9',
                            fontWeight: isOngoing ? 700 : 400,
                            borderBottom: isOngoing ? '2px solid #ff7622' : '2px solid transparent',
                            marginBottom: '-1px',
                        }}
                    >
                        Berlangsung
                    </button>

                    {/* Riwayat Tab */}
                    <button
                        onClick={() => setActiveTab('history')}
                        className="text-[14px] pb-[12px] cursor-pointer transition-all"
                        style={{
                            color: isHistory ? '#ff7622' : '#a5a7b9',
                            fontWeight: isHistory ? 700 : 400,
                            borderBottom: isHistory ? '2px solid #ff7622' : '2px solid transparent',
                            marginBottom: '-1px',
                        }}
                    >
                        Riwayat
                    </button>
                </div>

                {/* ===== ORDER LIST ===== */}
                <div className="px-6 mt-[16px]">
                    {filteredOrders.length === 0 ? (
                        /* ===== EMPTY STATE ===== */
                        <div className="flex flex-col items-center justify-center mt-[80px] text-center">
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                <rect x="10" y="20" width="60" height="48" rx="8" stroke="#a0a5ba" strokeWidth="3" fill="none"/>
                                <line x1="10" y1="34" x2="70" y2="34" stroke="#a0a5ba" strokeWidth="2" strokeLinecap="round"/>
                                <circle cx="40" cy="46" r="6" stroke="#a0a5ba" strokeWidth="2" fill="none"/>
                                <path d="M28 60L34 54" stroke="#a0a5ba" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M52 60L46 54" stroke="#a0a5ba" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <p className="text-[#a0a5ba] text-[16px] mt-[20px]">
                                {isOngoing
                                    ? 'Belum ada pesanan berlangsung'
                                    : 'Belum ada riwayat pesanan'}
                            </p>
                            <Link
                                href={route('home')}
                                className="mt-[16px] px-[24px] py-[10px] rounded-[10px] text-[14px] font-bold cursor-pointer hover:opacity-80 transition"
                                style={{ backgroundColor: '#ff7622', color: '#ffffff' }}
                            >
                                Mulai Belanja
                            </Link>
                        </div>
                    ) : (
                        <div style={{ marginTop: '12px' }}>
                            {filteredOrders.map((order) => {
                                const badge = getBadgeInfo(order.status);
                                const showBadge = hasBadge(order.status);
                                const isOngoingOrder = !showBadge;

                                return (
                                    <div key={order.id} style={{ marginBottom: '24px' }}>
                                        {/* ===== CATEGORY LABEL (use first item's menu_name or "Pesanan") ===== */}
                                        <div className="flex items-center justify-between pt-[16px] pb-[4px]">
                                            <span className="text-[14px]" style={{ color: '#181c2e' }}>
                                                {order.items.length > 0 ? order.items[0].menu_name : 'Pesanan'}
                                            </span>

                                            {/* Status badge (History only) */}
                                            {badge && (
                                                <span className="text-[14px] font-bold" style={{ color: badge.color }}>
                                                    {badge.label}
                                                </span>
                                            )}
                                        </div>

                                        {/* Separator line */}
                                        <div className="w-full h-[1px] my-[8px]" style={{ backgroundColor: '#eef2f6' }} />

                                        {/* ===== ORDER CARD ===== */}
                                        <div className="flex items-start" style={{ gap: '14px' }}>
                                            {/* Image placeholder */}
                                            <div
                                                className="w-[60px] h-[60px] rounded-[8px] shrink-0 flex items-center justify-center"
                                                style={{ backgroundColor: '#98a8b8' }}
                                            >
                                                {order.catering?.image ? (
                                                    <img
                                                        src={order.catering.image}
                                                        alt={order.catering.name}
                                                        className="w-full h-full object-cover rounded-[8px]"
                                                    />
                                                ) : (
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <rect x="4" y="2" width="16" height="20" rx="3" stroke="white" strokeWidth="2" fill="none"/>
                                                        <line x1="8" y1="8" x2="16" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                                        <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                                        <line x1="8" y1="16" x2="12" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                                    </svg>
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                {/* Row 1: Name + Order # */}
                                                <div className="flex items-start justify-between">
                                                    <span
                                                        className="text-[14px] truncate"
                                                        style={{
                                                            color: '#181c2e',
                                                            fontWeight: badge ? 700 : 400,
                                                            maxWidth: '175px',
                                                        }}
                                                    >
                                                        {order.catering?.name || 'Catering'}
                                                    </span>
                                                    <span
                                                        className="text-[14px] shrink-0 ml-[8px]"
                                                        style={{ color: '#6b6e82', textDecoration: 'underline' }}
                                                    >
                                                        {order.order_number}
                                                    </span>
                                                </div>

                                                {/* Row 2: Price + separator + date/items */}
                                                <div className="flex items-center mt-[4px]" style={{ gap: '14px' }}>
                                                    <span className="text-[14px] font-bold" style={{ color: '#181c2e' }}>
                                                        {formatPrice(order.total)}
                                                    </span>

                                                    {/* Vertical separator */}
                                                    <div className="w-[16px] h-[1px]" style={{ backgroundColor: '#caccda', transform: 'rotate(90deg)' }} />

                                                    {/* Date (history) or items count */}
                                                    {isHistory ? (
                                                        <span className="text-[12px] truncate" style={{ color: '#6b6e82' }}>
                                                            {order.created_at}
                                                            <span className="inline-block w-[4px] h-[4px] rounded-full mx-[6px] align-middle" style={{ backgroundColor: '#6b6e82' }} />
                                                            {order.items_count} Items
                                                        </span>
                                                    ) : (
                                                        <span className="text-[12px]" style={{ color: '#6b6e82' }}>
                                                            {order.items_count} Items
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* ===== ACTION BUTTONS ===== */}
                                        <div className="flex mt-[16px]" style={{ gap: '10px' }}>
                                            {isOngoingOrder ? (
                                                <>
                                                    {/* Track Order — filled */}
                                                    <button
                                                        onClick={() => handleTrackOrder(order.id)}
                                                        className="flex-1 h-[39px] rounded-[8px] flex items-center justify-center cursor-pointer hover:opacity-80 transition text-[12px] font-bold"
                                                        style={{ backgroundColor: '#ff7622', color: '#ffffff' }}
                                                    >
                                                        Track Order
                                                    </button>

                                                    {/* Cancel — outline */}
                                                    <button
                                                        onClick={() => showCancelDialog(order.id, order.catering?.name)}
                                                        disabled={processingId === order.id}
                                                        className="flex-1 h-[39px] rounded-[8px] flex items-center justify-center cursor-pointer hover:opacity-80 transition text-[12px] font-bold disabled:opacity-50"
                                                        style={{
                                                            border: '1px solid #ff7622',
                                                            color: '#ff7622',
                                                            backgroundColor: 'transparent',
                                                        }}
                                                    >
                                                        {processingId === order.id ? '...' : 'Cancel'}
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    {/* Rate — outline */}
                                                    <button
                                                        onClick={handleRate}
                                                        className="flex-1 h-[39px] rounded-[8px] flex items-center justify-center cursor-pointer hover:opacity-80 transition text-[12px] font-bold"
                                                        style={{
                                                            border: '1px solid #ff7622',
                                                            color: '#ff7622',
                                                            backgroundColor: 'transparent',
                                                        }}
                                                    >
                                                        Rate
                                                    </button>

                                                    {/* Re-Order — filled */}
                                                    <button
                                                        onClick={() => handleReorder(order.id)}
                                                        disabled={processingId === order.id}
                                                        className="flex-1 h-[39px] rounded-[8px] flex items-center justify-center cursor-pointer hover:opacity-80 transition text-[12px] font-bold disabled:opacity-50"
                                                        style={{ backgroundColor: '#ff7622', color: '#ffffff' }}
                                                    >
                                                        {processingId === order.id ? '...' : 'Re-Order'}
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Bottom padding for scroll */}
                <div className="h-[40px]" />
            </div>

            {/* ===== CANCEL CONFIRMATION DIALOG ===== */}
            <ConfirmDialog
                isOpen={cancelTarget !== null}
                title="Batalkan Pesanan"
                message={`Apakah Anda yakin ingin membatalkan pesanan dari ${cancelTarget?.cateringName || 'Catering'}?`}
                onConfirm={confirmCancel}
                onCancel={() => setCancelTarget(null)}
            />
        </>
    );
}
