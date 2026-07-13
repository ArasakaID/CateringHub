import { Head, router, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import SellerTabBar from '@/Components/SellerTabBar';

function formatRupiah(amount) {
    return 'Rp' + Math.round(amount).toLocaleString('en-US');
}

function RevenueChart({ data }) {
    if (!data || data.length === 0) {
        return <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9c9ba6', fontSize: 12, fontFamily: 'Sen, sans-serif' }}>Belum ada pendapatan</div>;
    }

    const rawValues = data.map(d => d.value);
    const maxVal = Math.max(...rawValues);
    const hasData = maxVal > 0;

    const values = rawValues.map((v, i) => {
        if (i === 0 || i === rawValues.length - 1) return v;
        return (rawValues[i - 1] + v + rawValues[i + 1]) / 3;
    });

    const chartMax = hasData ? maxVal : 1;
    const chartWidth = 290;
    const chartHeight = 80;
    const drawWidth = chartWidth;

    const points = values.map((v, i) => {
        const x = (i / (values.length - 1)) * drawWidth;
        const y = chartHeight - (v / chartMax) * chartHeight;
        return [x, y];
    });

    const smoothPath = points.map((p, i) => {
        if (i === 0) return `M${p[0]},${p[1]}`;
        const prev = points[i - 1];
        const cpx1 = prev[0] + (p[0] - prev[0]) * 0.4;
        const cpx2 = p[0] - (p[0] - prev[0]) * 0.4;
        return `C${cpx1},${prev[1]} ${cpx2},${p[1]} ${p[0]},${p[1]}`;
    }).join(' ');

    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];
    const areaPath = `${smoothPath} L${lastPoint[0]},${chartHeight} L${firstPoint[0]},${chartHeight} Z`;

    const [hoverIdx, setHoverIdx] = useState(-1);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const step = drawWidth / (data.length - 1);
        const idx = Math.round(mx / step);
        setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)));
    };

    const handleMouseLeave = () => setHoverIdx(-1);

    const gap = drawWidth / (data.length - 1);

    return (
        <div style={{ position: 'relative', height: chartHeight + 30, marginTop: 8 }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fb6d3a" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#fb6d3a" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path d={areaPath} fill="url(#chartGrad)" />
                <path
                    d={smoothPath}
                    fill="none"
                    stroke="#fb6d3a"
                    strokeWidth="2.62"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {hasData && hoverIdx >= 0 && (
                    <>
                        <line x1={points[hoverIdx][0]} y1={0} x2={points[hoverIdx][0]} y2={chartHeight} stroke="#fb6d3a" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                        <circle cx={points[hoverIdx][0]} cy={points[hoverIdx][1]} r="4" fill="#ffffff" stroke="#fb6d3a" strokeWidth="2" />
                    </>
                )}
            </svg>
            {hasData && hoverIdx >= 0 && data[hoverIdx].value > 0 && (
                <div style={{
                    position: 'absolute', left: Math.min(Math.max(points[hoverIdx][0] - 50, 0), chartWidth - 100),
                    top: -8,
                    background: '#32343e', borderRadius: 8, padding: '6px 12px',
                    color: '#ffffff', fontSize: 14, fontWeight: 700, fontFamily: 'Sen, sans-serif',
                    whiteSpace: 'nowrap', zIndex: 10,
                }}>
                    {formatRupiah(data[hoverIdx].value)}
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, position: 'relative' }}>
                {data.map((d, i) => (
                    <span key={i} style={{ fontSize: 9, color: '#9c9ba6', fontFamily: 'Sen, sans-serif', width: 26, textAlign: 'center', textTransform: 'uppercase' }}>
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

const periodOptions = ['Daily', 'Weekly', 'Monthly'];

export default function SellerDashboard({ catering, stats, totalRevenue, revenueChartData, reviewsSummary, popularItems }) {
    const { url } = usePage();
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    const initialPeriod = urlParams.get('period') || 'daily';
    const periodLabel = initialPeriod.charAt(0).toUpperCase() + initialPeriod.slice(1);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [period, setPeriod] = useState(periodLabel);
    const [periodOpen, setPeriodOpen] = useState(false);
    const periodRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (periodRef.current && !periodRef.current.contains(e.target)) setPeriodOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                <div style={{ display: 'flex', gap: 11, padding: '0 24px', marginBottom: 24 }}>
                    <div style={{
                        flex: 1, background: '#ffffff', borderRadius: 28, padding: '16px 12px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    }}>
                        <span style={{ fontSize: 52, fontWeight: 700, color: '#32343e', lineHeight: 1 }}>{stats.runningOrders}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#838799', marginTop: 8, textAlign: 'center', textTransform: 'uppercase' }}>Pesanan diterima</span>
                    </div>

                    <div style={{
                        flex: 1, background: '#ffffff', borderRadius: 28, padding: '16px 12px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    }}>
                        <span style={{ fontSize: 52, fontWeight: 700, color: '#32343e', lineHeight: 1 }}>{stats.orderRequests}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#838799', marginTop: 8, textAlign: 'center', textTransform: 'uppercase' }}>
                            Permintaan<br />pesanan
                        </span>
                    </div>
                </div>

                {/* Revenue Card */}
                <div style={{ margin: '0 24px 16px', background: '#ffffff', borderRadius: 28, padding: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontSize: 14, color: '#32343e' }}>Total Revenue</span>
                        <span style={{ fontSize: 14, color: '#fb6d3a', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => router.visit('/seller/revenue-details')}>See Details</span>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#32343e', marginBottom: 8 }}>
                        {formatRupiah(totalRevenue)}
                    </div>
                    <div ref={periodRef} style={{ position: 'relative', display: 'inline-block', marginBottom: 8 }}>
                        <div
                            onClick={() => setPeriodOpen(!periodOpen)}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 5, minWidth: 76,
                                border: '1px solid #e8eaed', borderRadius: 7, padding: '6px 8px',
                                cursor: 'pointer',
                            }}
                        >
                            <span style={{ fontSize: 12, color: '#9c9ba6', fontFamily: 'Sen, sans-serif' }}>{period}</span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M4 5.5L7 8.5L10 5.5" stroke="#181c2e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        {periodOpen && (
                            <div style={{
                                position: 'absolute', top: '100%', left: 0, zIndex: 10,
                                background: '#ffffff', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                minWidth: 100, overflow: 'hidden',
                            }}>
                                {periodOptions.map(p => (
                                    <div
                                        key={p} onClick={() => { setPeriod(p); setPeriodOpen(false); router.get('/seller/dashboard', { period: p.toLowerCase() }, { preserveState: true, preserveScroll: true, replace: true }); }}
                                        style={{
                                            padding: '10px 12px', fontSize: 12, fontFamily: 'Sen, sans-serif',
                                            color: period === p ? '#ff7622' : '#32343e',
                                            background: period === p ? '#fff1f2' : 'transparent',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {p}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <RevenueChart data={revenueChartData} />
                </div>

                {/* Reviews Card */}
                <div style={{ margin: '0 24px 16px', background: '#ffffff', borderRadius: 28, padding: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: 14, color: '#32343e' }}>Reviews</span>
                        <span style={{ fontSize: 14, color: '#fb6d3a', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => router.visit('/seller/reviews')}>See All Reviews</span>
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
                <div style={{ margin: '0 24px', background: '#ffffff', borderRadius: 28, padding: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: 14, color: '#32343e' }}>Populer Items This Weeks</span>
                        <span style={{ fontSize: 14, color: '#fb6d3a', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => router.visit('/seller/my-food')}>See All</span>
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
                                <button
                                    onClick={() => { setSidebarOpen(false); router.visit('/seller/reviews'); }}
                                    style={{
                                        background: 'none', border: 'none', textAlign: 'left',
                                        fontSize: 16, color: '#32343e', fontFamily: 'Sen, sans-serif',
                                        cursor: 'pointer', padding: '8px 0',
                                    }}
                                >
                                    Reviews
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <SellerTabBar currentPath="/seller/dashboard" />
            </div>
        </>
    );
}
