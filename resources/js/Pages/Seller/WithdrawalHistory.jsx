import { Head, router } from '@inertiajs/react';
import SellerTabBar from '@/Components/SellerTabBar';

function formatRupiah(amount) {
    return 'Rp' + Math.round(amount).toLocaleString('en-US');
}

export default function WithdrawalHistory({ withdrawals, totalWithdrawn, balance }) {
    return (
        <>
            <Head title="Withdrawal History" />
            <div style={{ fontFamily: 'Sen, sans-serif', background: '#f7f8f9', minHeight: '100vh', paddingBottom: 100 }}>
                <div style={{ padding: '50px 24px 0', display: 'flex', alignItems: 'center', background: '#ffffff' }}>
                    <div style={{ width: 45, height: 45, borderRadius: '50%', background: '#ecf0f4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => router.visit('/seller/menu')}>
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 11L1 6L6 1" stroke="#32343E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div style={{ marginLeft: 16, fontSize: 17, fontWeight: 700, color: '#181c2e' }}>Withdrawal History</div>
                </div>

                {/* Balance Summary */}
                <div style={{ margin: '24px 24px 0', background: '#ffffff', borderRadius: 20, padding: 24, boxShadow: '0 12px 30px rgba(150,150,154,0.10)', display: 'flex', gap: 24 }}>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontSize: 12, color: '#838799', fontFamily: 'Sen, sans-serif' }}>Balance</div>
                        <div style={{ fontSize: 28, fontWeight: 700, color: '#32343e', fontFamily: 'Sen, sans-serif', marginTop: 4 }}>{formatRupiah(balance)}</div>
                    </div>
                    <div style={{ width: 1, background: '#e8eaed' }} />
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontSize: 12, color: '#838799', fontFamily: 'Sen, sans-serif' }}>Withdrawn</div>
                        <div style={{ fontSize: 28, fontWeight: 700, color: '#fb6d3a', fontFamily: 'Sen, sans-serif', marginTop: 4 }}>{formatRupiah(totalWithdrawn)}</div>
                    </div>
                </div>

                {/* Withdrawal List */}
                <div style={{ margin: '16px 24px 0', paddingBottom: 24 }}>
                    {withdrawals.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 60, color: '#9c9ba6', fontSize: 14, background: '#ffffff', borderRadius: 20, fontFamily: 'Sen, sans-serif' }}>
                            Belum ada penarikan
                        </div>
                    ) : (
                        withdrawals.map((w, i) => (
                            <div key={w.id} style={{ background: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: '0 12px 30px rgba(150,150,154,0.10)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: '#32343e', fontFamily: 'Sen, sans-serif' }}>{formatRupiah(w.amount)}</div>
                                        <div style={{ fontSize: 12, color: '#9c9ba6', marginTop: 4, fontFamily: 'Sen, sans-serif' }}>{w.created_at}</div>
                                        <div style={{ fontSize: 12, color: '#838799', marginTop: 2, fontFamily: 'Sen, sans-serif' }}>{w.method}</div>
                                    </div>
                                    <div style={{
                                        padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700,
                                        fontFamily: 'Sen, sans-serif',
                                        background: w.status === 'completed' ? '#e8f5e9' : w.status === 'pending' ? '#fff3e0' : '#ffebee',
                                        color: w.status === 'completed' ? '#2e7d32' : w.status === 'pending' ? '#e65100' : '#c62828',
                                    }}>
                                        {w.status === 'completed' ? 'Success' : w.status === 'pending' ? 'Pending' : 'Failed'}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <SellerTabBar currentPath="/seller/menu" />
            </div>
        </>
    );
}
