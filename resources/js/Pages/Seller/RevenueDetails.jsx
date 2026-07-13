import { Head, router } from '@inertiajs/react';
import SellerTabBar from '@/Components/SellerTabBar';

export default function RevenueDetails() {
    return (
        <>
            <Head title="Revenue Details" />
            <div style={{ fontFamily: 'Sen, sans-serif', background: '#f7f8f9', minHeight: '100vh', paddingBottom: 100 }}>
                <div style={{ padding: '50px 24px 0', display: 'flex', alignItems: 'center', background: '#ffffff' }}>
                    <div style={{ width: 45, height: 45, borderRadius: '50%', background: '#ecf0f4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => router.visit('/seller/dashboard')}>
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 11L1 6L6 1" stroke="#32343E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ marginLeft: 16, fontSize: 17, fontFamily: 'Sen, sans-serif', color: '#32343e' }}>Revenue Details</span>
                </div>
                <div style={{ padding: 40, textAlign: 'center', color: '#9c9ba6', fontSize: 14 }}>
                    Halaman revenue details akan diimplementasi
                </div>
                <SellerTabBar currentPath="/seller/dashboard" />
            </div>
        </>
    );
}
