import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import SellerTabBar from '@/Components/SellerTabBar';

function formatRupiah(amount) {
    return 'Rp' + Math.round(amount).toLocaleString('id-ID');
}

function RevenueChart({ data }) {
    if (!data || data.length === 0) {
        return <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9c9ba6', fontSize: 12, fontFamily: 'Sen, sans-serif' }}>Belum ada pendapatan</div>;
    }

    const values = data.map(d => d.value);
    const maxVal = Math.max(...values, 1);
    const chartWidth = 290;
    const chartHeight = 80;
    const padding = 0;
    const drawWidth = chartWidth;
    const drawHeight = chartHeight;

    const points = values.map((v, i) => {
        const x = padding + (i / (values.length - 1)) * drawWidth;
        const y = chartHeight - (v / maxVal) * drawHeight;
        return `${x},${y}`;
    }).join(' ');

    const areaPoints = `${padding},${chartHeight} ${points} ${chartWidth},${chartHeight}`;

    const maxIdx = values.indexOf(maxVal);
    const tooltipX = padding + (maxIdx / (values.length - 1)) * drawWidth;
    const tooltipY = chartHeight - (maxVal / maxVal) * drawHeight;

    return (
        <div style={{ position: 'relative', height: chartHeight + 30, marginTop: 8 }}>
            <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fb6d3a" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#fb6d3a" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <polygon points={areaPoints} fill="url(#chartGrad)" />
                <polyline
                    points={points}
                    fill="none"
                    stroke="#fb6d3a"
                    strokeWidth="2.62"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
                {maxVal > 0 && (
                <div style={{
                    position: 'absolute', left: tooltipX - 30, top: tooltipY - 30,
                    background: '#32343e', borderRadius: 5, padding: '4px 8px',
                    color: '#ffffff', fontSize: 14, fontWeight: 700, fontFamily: 'Sen, sans-serif',
                    whiteSpace: 'nowrap',
                }}>
                    ${Math.round(maxVal).toLocaleString('en-US')}
                    <div style={{
                        position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)',
                        width: 0, height: 0, borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent', borderTop: '5px solid #32343e',
                    }} />
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                {data.map((d, i) => (
                    <span key={i} style={{ fontSize: 9, color: '#9c9ba6', fontFamily: 'Sen, sans-serif', width: 26, textAlign: 'center' }}>
                        {d.label}
                    </span>
                ))}
            </div>
        </div>
    );
}

function PopularItem({ item }) {
    return (
        <div style={{
            width: 150, minWidth: 150, borderRadius: 18, overflow: 'hidden',
            background: '#98a8b8', height: 153,
        }}>
            {item.image && !item.image.startsWith('http') ? (
                <img src={`/storage/${item.image}`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : item.image ? (
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : null}
        </div>
    );
}

export default function SellerDashboard({ catering, stats, totalRevenue, revenueChartData, reviewsSummary, popularItems }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const pageStyle = {
        fontFamily: 'Sen, sans-serif',
        minHeight: '100vh',
        background: '#f7f8f9',
        paddingBottom: 100,
    };

    return (
        <>
            <Head title="Seller Dashboard" />

            <div style={pageStyle}>
                {/* Top Bar */}
                <div style={{
                    display: 'flex', alignItems: 'center', padding: '16px 24px 12px',
                    gap: 16,
                }}>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        style={{
                            width: 45, height: 45, borderRadius: '50%', background: '#ffffff',
                            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', flexShrink: 0,
                        }}
                    >
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                            <line x1="2" y1="2" x2="18" y2="2" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" />
                            <line x1="2" y1="8" x2="14" y2="8" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" />
                            <line x1="2" y1="14" x2="18" y2="14" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#fc6e2a', textTransform: 'uppercase', letterSpacing: 0 }}>Location</div>
                        <div style={{ fontSize: 14, color: '#676767' }}>
                            {catering?.address || 'Office'}
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none" style={{ marginLeft: 4, verticalAlign: 'middle' }}>
                                <path d="M1 1.5L5.5 6L10 1.5" stroke="#181c2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    <div style={{
                        width: 45, height: 45, borderRadius: '50%', background: '#98a8b8',
                        flexShrink: 0,
                    }} />
                </div>

                {/* Stat Cards */}
                <div style={{ display: 'flex', gap: 13, padding: '0 24px', marginBottom: 16 }}>
                    <div style={{
                        flex: 1, background: '#ffffff', borderRadius: 20, padding: '16px 12px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}>
                        <span style={{ fontSize: 52, fontWeight: 700, color: '#32343e', lineHeight: 1 }}>{stats.runningOrders}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#838799', marginTop: 8, textAlign: 'center' }}>Pesanan diterima</span>
                    </div>

                    <div style={{
                        flex: 1, background: '#ffffff', borderRadius: 20, padding: '16px 12px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}>
                        <span style={{ fontSize: 52, fontWeight: 700, color: '#32343e', lineHeight: 1 }}>{stats.orderRequests}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#838799', marginTop: 8, textAlign: 'center' }}>
                            Permintaan<br />pesanan
                        </span>
                    </div>
                </div>

                {/* Revenue Card */}
                <div style={{ margin: '0 24px 16px', background: '#ffffff', borderRadius: 20, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontSize: 14, color: '#32343e' }}>Total Revenue</span>
                        <span style={{ fontSize: 14, color: '#fb6d3a', textDecoration: 'underline', cursor: 'pointer' }}>See Details</span>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#32343e', marginBottom: 8 }}>
                        {formatRupiah(totalRevenue)}
                    </div>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        border: '1px solid #e8eaed', borderRadius: 7, padding: '6px 8px',
                        marginBottom: 8,
                    }}>
                        <span style={{ fontSize: 12, color: '#9c9ba6', fontFamily: 'Sen, sans-serif' }}>Daily</span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M4 5.5L7 8.5L10 5.5" stroke="#181c2e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <RevenueChart data={revenueChartData} />
                </div>

                {/* Reviews Card */}
                <div style={{ margin: '0 24px 16px', background: '#ffffff', borderRadius: 20, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: 14, color: '#32343e' }}>Reviews</span>
                        <span style={{ fontSize: 14, color: '#fb6d3a', textDecoration: 'underline', cursor: 'pointer' }}>See All Reviews</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {reviewsSummary.count > 0 ? (
                            <>
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                                    <path d="M13 2L16.09 9.02L23.58 10.45L18 15.81L19.18 23.36L13 19.54L6.82 23.36L8 15.81L2.42 10.45L9.91 9.02L13 2Z" fill="#fb6d3a" />
                                </svg>
                                <span style={{ fontSize: 22, fontWeight: 700, color: '#fb6d3a' }}>{reviewsSummary.average}</span>
                                <span style={{ fontSize: 14, color: '#32343e' }}>
                                    Total {reviewsSummary.count} Reviews
                                </span>
                            </>
                        ) : (
                            <span style={{ fontSize: 14, color: '#9c9ba6', fontFamily: 'Sen, sans-serif' }}>Belum ada review</span>
                        )}
                    </div>
                </div>

                {/* Popular Items */}
                <div style={{ margin: '0 24px', background: '#ffffff', borderRadius: 20, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: 14, color: '#32343e' }}>Populer Items This Weeks</span>
                        <span style={{ fontSize: 14, color: '#fb6d3a', textDecoration: 'underline', cursor: 'pointer' }}>See All</span>
                    </div>
                    {popularItems.length > 0 ? (
                        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
                            {popularItems.map(item => (
                                <PopularItem key={item.id} item={item} />
                            ))}
                            {popularItems.length > 2 && (
                                <div style={{
                                    width: 16, minWidth: 16, height: 153, background: '#ffffff',
                                    borderRadius: '0 20px 20px 0',
                                }} />
                            )}
                        </div>
                    ) : (
                        <div style={{
                            height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#9c9ba6', fontSize: 14, fontFamily: 'Sen, sans-serif',
                        }}>
                            Belum ada menu populer
                        </div>
                    )}
                </div>

                {/* Sidebar overlay */}
                {sidebarOpen && (
                    <div style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 60,
                    }} onClick={() => setSidebarOpen(false)}>
                        <div style={{
                            position: 'absolute', left: 0, top: 0, bottom: 0, width: 280,
                            background: '#ffffff', padding: 24,
                        }} onClick={e => e.stopPropagation()}>
                            <div style={{ fontSize: 18, fontWeight: 700, color: '#181c2e', fontFamily: 'Sen, sans-serif', marginBottom: 24 }}>
                                {catering?.name || 'Seller'}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {[
                                    { label: 'Dashboard', path: '/seller/dashboard' },
                                    { label: 'My Food', path: '/seller/my-food' },
                                    { label: 'Running Orders', path: '/seller/running-orders' },
                                    { label: 'Reviews', path: '/seller/reviews' },
                                    { label: 'Settings', path: '/seller/menu' },
                                ].map(link => (
                                    <button
                                        key={link.label}
                                        onClick={() => { setSidebarOpen(false); router.visit(link.path); }}
                                        style={{
                                            background: 'none', border: 'none', textAlign: 'left',
                                            fontSize: 16, color: '#32343e', fontFamily: 'Sen, sans-serif',
                                            cursor: 'pointer', padding: '8px 0',
                                        }}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <SellerTabBar currentPath="/seller/dashboard" />
            </div>
        </>
    );
}
