import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import SellerTabBar from '@/Components/SellerTabBar';

const backArrow = (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
        <path d="M6 11L1 6L6 1" stroke="#32343E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const handleCloseStyle = { width: 60, height: 6, background: '#c1c8d2', borderRadius: 25, margin: '16px auto 0' };

const tagColors = { breakfast: '#ff7622', brunch: '#18cfe8', lunch: '#fb6d3a', dinner: '#413dfb' };

function getTagColor(name) {
    const lower = (name || '').toLowerCase();
    if (lower.includes('breakfast')) return tagColors.breakfast;
    if (lower.includes('brunch')) return tagColors.brunch;
    if (lower.includes('lunch') || lower.includes('snack')) return tagColors.lunch;
    if (lower.includes('dinner') || lower.includes('harian')) return tagColors.dinner;
    return '#ed7a63';
}

function formatPrice(amount) {
    return '$' + Number(amount).toLocaleString('en-US');
}

export default function RunningOrders({ runningOrders, runningCount, orderRequestCount }) {
    const [showOverlay, setShowOverlay] = useState(true);

    const handleDone = (order) => {
        router.post('/seller/orders/' + order.id + '/done', {}, {
            preserveScroll: true,
            onSuccess: () => { if (runningOrders.length <= 1) setShowOverlay(false); },
        });
    };

    const handleCancel = (order) => {
        if (confirm('Cancel order ' + order.order_number + '?')) {
            router.post('/seller/orders/' + order.id + '/cancel', {}, {
                preserveScroll: true,
                onSuccess: () => { if (runningOrders.length <= 1) setShowOverlay(false); },
            });
        }
    };

    return (
        <>
            <Head title="Running Orders" />
            <div style={{ minHeight: '100vh', background: '#f7f8f9', fontFamily: 'Sen, sans-serif', paddingBottom: 100, position: 'relative' }}>
                {/* Top Bar */}
                <div style={{ padding: '50px 24px 0', display: 'flex', alignItems: 'center', background: '#ffffff' }}>
                    <div style={{ width: 45, height: 45, borderRadius: '50%', background: '#ecf0f4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => router.visit('/seller/dashboard')}>
                        {backArrow}
                    </div>
                    <span style={{ marginLeft: 16, fontSize: 17, fontFamily: 'Sen, sans-serif', color: '#32343e' }}>Running Orders</span>
                </div>

                {/* Stat Cards */}
                <div style={{ padding: '20px 24px', display: 'flex', gap: 13 }}>
                    <div style={{ flex: 1, background: '#ffffff', borderRadius: 20, padding: '18px 20px', boxShadow: '0 12px 30px rgba(150,150,154,0.10)' }}>
                        <div style={{ fontSize: 14, fontFamily: 'Sen, sans-serif', color: '#32343e' }}>Running Orders</div>
                        <div style={{ fontSize: 32, fontWeight: 700, fontFamily: 'Sen, sans-serif', color: '#181c2e', marginTop: 4 }}>{runningCount}</div>
                    </div>
                    <div style={{ flex: 1, background: '#ffffff', borderRadius: 20, padding: '18px 20px', boxShadow: '0 12px 30px rgba(150,150,154,0.10)' }}>
                        <div style={{ fontSize: 14, fontFamily: 'Sen, sans-serif', color: '#32343e' }}>Order Request</div>
                        <div style={{ fontSize: 32, fontWeight: 700, fontFamily: 'Sen, sans-serif', color: '#181c2e', marginTop: 4 }}>{orderRequestCount}</div>
                    </div>
                </div>

                {/* Dark overlay + Bottom Sheet */}
                {showOverlay && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 40, display: 'flex', alignItems: 'flex-end' }}>
                        {/* Dark bg */}
                        <div style={{ position: 'absolute', inset: 0, background: '#273f55', opacity: 0.7 }} onClick={() => setShowOverlay(false)} />

                        {/* Sheet */}
                        <div style={{ position: 'relative', width: '100%', maxWidth: 430, margin: '0 auto', height: 659, background: '#ffffff', borderRadius: '25px 25px 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            {/* Handle */}
                            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 16 }}>
                                <div style={{ width: 60, height: 6, background: '#c1c8d2', borderRadius: 25 }} />
                            </div>

                            {/* Header */}
                            <div style={{ padding: '16px 24px 16px' }}>
                                <span style={{ fontSize: 17, fontFamily: 'Sen, sans-serif', color: '#181c2e' }}>{runningCount} Running Orders</span>
                            </div>

                            {/* Order List */}
                            <div style={{ flex: 1, overflow: 'auto', padding: '0 24px' }}>
                                {runningOrders.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: 60, color: '#9c9ba6', fontSize: 14, fontFamily: 'Sen, sans-serif' }}>
                                        No running orders
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        {runningOrders.map(order => {
                                            const item = order.items && order.items[0];
                                            const menuName = item ? item.menu_name : 'Menu';

                                            return (
                                                <div key={order.id} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
                                                    {/* Image placeholder */}
                                                    <div style={{ width: 102, height: 102, borderRadius: 20, background: '#98a8b8', flexShrink: 0 }} />

                                                    {/* Info */}
                                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                        <span style={{ fontSize: 14, fontFamily: 'Sen, sans-serif', color: '#ed7a63' }}>#{order.order_number}</span>
                                                        <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'Sen, sans-serif', color: '#32343e', marginTop: 2 }}>{menuName}</span>
                                                        {order.items && order.items.length > 1 && (
                                                            <span style={{ fontSize: 11, background: '#ffeee8', color: '#ed7a63', borderRadius: 4, padding: '2px 8px', alignSelf: 'flex-start', marginTop: 4, fontFamily: 'Sen, sans-serif' }}>
                                                                +{order.items.length - 1} items
                                                            </span>
                                                        )}
                                                        <div style={{ fontSize: 18, fontFamily: 'Sen, sans-serif', color: '#32343e', marginTop: 4 }}>
                                                            {formatPrice(order.total)}
                                                        </div>
                                                        {/* Action buttons */}
                                                        <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                                                            <button onClick={() => handleDone(order)} style={{ width: 61, height: 36, background: '#ff7622', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: 'Sen, sans-serif', color: '#ffffff' }}>
                                                                Done
                                                            </button>
                                                            <button onClick={() => handleCancel(order)} style={{ width: 70, height: 36, borderRadius: 9, border: '1px solid #ff3326', background: 'transparent', cursor: 'pointer', fontSize: 14, fontFamily: 'Sen, sans-serif', color: '#ff3326' }}>
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <SellerTabBar currentPath="/seller/running-orders" />
            </div>
        </>
    );
}