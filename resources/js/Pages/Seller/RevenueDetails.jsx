import { Head, router } from '@inertiajs/react';
import SellerTabBar from '@/Components/SellerTabBar';

function formatRupiah(amount) {
    return 'Rp' + Math.round(amount).toLocaleString('en-US');
}

const statCardStyle = {
    flex: 1, background: '#ffffff', borderRadius: 20, padding: 16,
    boxShadow: '0 12px 30px rgba(150,150,154,0.10)',
};

export default function RevenueDetails({ totalRevenue, dailyRevenue, weeklyRevenue, monthlyRevenue, transactions }) {
    return (
        <>
            <Head title="Revenue Details" />
            <div style={{ fontFamily: 'Sen, sans-serif', background: '#f7f8f9', minHeight: '100vh', paddingBottom: 100 }}>
                <div style={{ padding: '50px 24px 0', display: 'flex', alignItems: 'center', background: '#ffffff' }}>
                    <div style={{ width: 45, height: 45, borderRadius: '50%', background: '#ecf0f4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => router.visit('/seller/dashboard')}>
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 11L1 6L6 1" stroke="#32343E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div style={{ marginLeft: 16, fontSize: 17, fontWeight: 700, color: '#181c2e' }}>Revenue Details</div>
                </div>

                {/* Revenue Stats */}
                <div style={{ padding: '24px 24px 0', display: 'flex', gap: 12 }}>
                    <div style={statCardStyle}>
                        <div style={{ fontSize: 12, color: '#838799' }}>Daily</div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: '#32343e', marginTop: 4 }}>{formatRupiah(dailyRevenue)}</div>
                    </div>
                    <div style={statCardStyle}>
                        <div style={{ fontSize: 12, color: '#838799' }}>Weekly</div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: '#32343e', marginTop: 4 }}>{formatRupiah(weeklyRevenue)}</div>
                    </div>
                </div>
                <div style={{ padding: '12px 24px 0', display: 'flex', gap: 12 }}>
                    <div style={statCardStyle}>
                        <div style={{ fontSize: 12, color: '#838799' }}>Monthly</div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: '#32343e', marginTop: 4 }}>{formatRupiah(monthlyRevenue)}</div>
                    </div>
                    <div style={statCardStyle}>
                        <div style={{ fontSize: 12, color: '#838799' }}>Total</div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: '#fb6d3a', marginTop: 4 }}>{formatRupiah(totalRevenue)}</div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div style={{ margin: '24px 24px 0', background: '#ffffff', borderRadius: 20, padding: 16, boxShadow: '0 12px 30px rgba(150,150,154,0.10)' }}>
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#181c2e', marginBottom: 16 }}>Recent Transactions</div>
                    {transactions.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 40, color: '#9c9ba6', fontSize: 14 }}>Belum ada transaksi</div>
                    ) : (
                        transactions.map((t, i) => (
                            <div key={t.id}>
                                {i > 0 && <div style={{ height: 1, background: '#f0f0f0', margin: '12px 0' }} />}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: '#32343e' }}>#{t.order_number}</div>
                                        <div style={{ fontSize: 12, color: '#9c9ba6', marginTop: 2 }}>{t.created_at}</div>
                                        <div style={{ fontSize: 12, color: '#838799', marginTop: 2 }}>{t.item_count} items</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: '#32343e' }}>{formatRupiah(t.total)}</div>
                                        <div style={{
                                            fontSize: 11, padding: '2px 8px', borderRadius: 4, display: 'inline-block', marginTop: 4,
                                            background: t.status === 'delivered' ? '#e8f5e9' : t.status === 'cancelled' ? '#ffebee' : '#fff3e0',
                                            color: t.status === 'delivered' ? '#2e7d32' : t.status === 'cancelled' ? '#c62828' : '#e65100',
                                        }}>{t.status}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <SellerTabBar currentPath="/seller/dashboard" />
            </div>
        </>
    );
}
