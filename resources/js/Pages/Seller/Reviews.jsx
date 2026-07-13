import { Head, router } from '@inertiajs/react';
import SellerTabBar from '@/Components/SellerTabBar';

export default function SellerReviews({ reviews, averageRating, totalReviews }) {
    const stars = (rating) => {
        const arr = [];
        for (let i = 1; i <= 5; i++) {
            arr.push(
                <svg key={i} width="16" height="16" viewBox="0 0 26 26" fill="none" style={{ marginRight: 2 }}>
                    <path d="M13 2L16.09 9.02L23.58 10.45L18 15.81L19.18 23.36L13 19.54L6.82 23.36L8 15.81L2.42 10.45L9.91 9.02L13 2Z" fill={i <= rating ? '#fb6d3a' : '#e0e0e0'} />
                </svg>
            );
        }
        return arr;
    };

    return (
        <>
            <Head title="Reviews" />
            <div style={{ fontFamily: 'Sen, sans-serif', background: '#f7f8f9', minHeight: '100vh', paddingBottom: 100 }}>
                <div style={{ padding: '50px 24px 0', display: 'flex', alignItems: 'center', background: '#ffffff' }}>
                    <div style={{ width: 45, height: 45, borderRadius: '50%', background: '#ecf0f4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => router.visit('/seller/dashboard')}>
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 11L1 6L6 1" stroke="#32343E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div style={{ marginLeft: 16, fontSize: 17, fontWeight: 700, color: '#181c2e' }}>Reviews</div>
                </div>

                {/* Rating Summary */}
                <div style={{ margin: '24px 24px 0', background: '#ffffff', borderRadius: 20, padding: 24, boxShadow: '0 12px 30px rgba(150,150,154,0.10)', display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 48, fontWeight: 700, color: '#fb6d3a' }}>{averageRating}</div>
                        <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 4 }}>{stars(Math.round(averageRating))}</div>
                        <div style={{ fontSize: 12, color: '#838799', marginTop: 4 }}>{totalReviews} Reviews</div>
                    </div>
                    <div style={{ flex: 1 }}>
                        {[5, 4, 3, 2, 1].map(star => {
                            const count = reviews.filter(r => Math.round(r.rating) === star).length;
                            const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                            return (
                                <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontSize: 12, color: '#838799', minWidth: 30 }}>{star} ★</span>
                                    <div style={{ flex: 1, height: 6, background: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
                                        <div style={{ width: pct + '%', height: '100%', background: '#fb6d3a', borderRadius: 3 }} />
                                    </div>
                                    <span style={{ fontSize: 12, color: '#838799', minWidth: 20, textAlign: 'right' }}>{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Review List */}
                <div style={{ margin: '16px 24px 0', paddingBottom: 24 }}>
                    {reviews.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 60, color: '#9c9ba6', fontSize: 14, background: '#ffffff', borderRadius: 20 }}>
                            Belum ada review
                        </div>
                    ) : (
                        reviews.map((r, i) => (
                            <div key={r.id} style={{ background: '#ffffff', borderRadius: 20, padding: 16, marginBottom: 12, boxShadow: '0 12px 30px rgba(150,150,154,0.10)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: '#32343e' }}>{r.user_name}</div>
                                        <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>{stars(r.rating)}</div>
                                    </div>
                                    <span style={{ fontSize: 11, color: '#9c9ba6' }}>{r.created_at}</span>
                                </div>
                                {r.comment && <div style={{ fontSize: 14, color: '#676767', marginTop: 8, lineHeight: 1.5 }}>{r.comment}</div>}
                            </div>
                        ))
                    )}
                </div>
                <SellerTabBar currentPath="/seller/dashboard" />
            </div>
        </>
    );
}
