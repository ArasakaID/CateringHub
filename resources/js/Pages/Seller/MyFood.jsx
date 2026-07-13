import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import SellerTabBar from '@/Components/SellerTabBar';

const StarIcon = () => (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M8.5 1.5L10.6 6.1L15.5 6.8L11.9 10.3L12.8 15.2L8.5 12.9L4.2 15.2L5.1 10.3L1.5 6.8L6.4 6.1L8.5 1.5Z" stroke="#fb6d3a" strokeWidth="1" fill="#fb6d3a" />
    </svg>
);

const MoreIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="12" r="1" fill="#32343e" />
        <circle cx="12" cy="12" r="1" fill="#32343e" />
        <circle cx="18" cy="12" r="1" fill="#32343e" />
    </svg>
);

export default function MyFood({ menus, categories, activeTab: initialTab, totalItems }) {
    const [activeTab, setActiveTab] = useState(initialTab || 'all');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);

    const handleTabClick = (slug) => {
        setActiveTab(slug);
        router.get('/seller/my-food', { category: slug }, { preserveState: true, preserveScroll: true, replace: true });
    };

    const handleDelete = (menuId, e) => {
        e.stopPropagation();
        if (confirm('Hapus menu ini?')) {
            router.delete('/seller/menu/' + menuId, { preserveScroll: true });
        }
        setOpenMenu(null);
    };

    return (
        <>
            <Head title="My Food" />
            <div style={{ fontFamily: 'Sen, sans-serif', background: '#ffffff', minHeight: '100vh', position: 'relative' }}>
                {/* Top Bar */}
                <div style={{ display: 'flex', alignItems: 'center', padding: '24px 24px 0', gap: 16 }}>
                    <button
                        onClick={() => router.get('/seller/dashboard')}
                        style={{
                            width: 45, height: 45, borderRadius: '50%', background: '#ecf0f4',
                            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0
                        }}
                    >
                        <svg width="5" height="10" viewBox="0 0 5 10" fill="none">
                            <path d="M4 1L1 5L4 9" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <span style={{ fontSize: 17, color: '#181c2e', lineHeight: '22px' }}>List Catering</span>
                </div>

                {/* Tab Bar */}
                <div style={{ marginTop: 32, padding: '0 24px' }}>
                    <div style={{ display: 'flex', gap: 42, borderBottom: '1px solid #f6f8fa', paddingBottom: 16, position: 'relative' }}>
                        {['All', 'Acara', 'Harian', 'Snack', 'Minuman'].map((tab) => {
                            const slug = tab.toLowerCase();
                            const isActive = activeTab === slug;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => handleTabClick(slug)}
                                    style={{
                                        fontSize: 14,
                                        fontWeight: isActive ? 700 : 400,
                                        color: isActive ? '#fb6d3a' : '#32343e',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: 0,
                                        fontFamily: 'Sen, sans-serif',
                                        position: 'relative',
                                    }}
                                >
                                    {tab}
                                    {isActive && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: -17,
                                            left: -14,
                                            width: 47,
                                            height: 2,
                                            background: '#fb6d3a',
                                        }} />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Total Items */}
                <p style={{ margin: '18px 24px 0', fontSize: 14, color: '#9c9ba6' }}>
                    Total {String(totalItems).padStart(2, '0')} items
                </p>

                {/* Food List */}
                <div style={{ padding: '0 24px', marginTop: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {menus.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: '#9c9ba6', fontSize: 14 }}>
                            Belum ada menu.<br />Klik tombol + untuk menambah.
                        </div>
                    ) : (
                        menus.map((menu) => (
                            <div key={menu.id} style={{ position: 'relative' }}>
                                <div
                                    onClick={() => router.get('/seller/food/' + menu.id)}
                                    style={{ display: 'flex', gap: 12, cursor: 'pointer' }}
                                >
                                    <img
                                        src={menu.image ? (menu.image.startsWith('http') ? menu.image : '/storage/' + menu.image) : 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="102" height="102"><rect width="102" height="102" fill="#98a8b8" rx="20"/></svg>')}
                                        alt={menu.name}
                                        style={{ width: 102, height: 102, borderRadius: 20, objectFit: 'cover', flexShrink: 0, background: '#98a8b8' }}
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
                                        <span style={{ fontSize: 14, fontWeight: 700, color: '#32343e' }}>{menu.name}</span>
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(255,118,34,0.2)', borderRadius: 29, padding: '4px 12px', alignSelf: 'flex-start' }}>
                                            <span style={{ fontSize: 13.67, color: '#ff7622', lineHeight: '20px' }}>{menu.category?.name || 'Menu'}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <StarIcon />
                                            <span style={{ fontSize: 13.67, fontWeight: 700, color: '#fb6d3a' }}>{menu.rating || '0.0'}</span>
                                            <span style={{ fontSize: 13.67, color: '#afafaf' }}>({menu.review_count || 0} Review)</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 8 }}>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === menu.id ? null : menu.id); }}
                                            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                                        >
                                            <MoreIcon />
                                        </button>
                                        <span style={{ fontSize: 14, fontWeight: 700, color: '#32343e', textAlign: 'right' }}>
                                            Rp{parseInt(menu.price).toLocaleString('en-US')}/Box
                                        </span>
                                    </div>
                                </div>
                                {openMenu === menu.id && (
                                    <>
                                        <div
                                            onClick={() => setOpenMenu(null)}
                                            style={{ position: 'fixed', inset: 0, zIndex: 99 }}
                                        />
                                        <div style={{
                                            position: 'absolute', right: 0, top: 30, zIndex: 100,
                                            background: '#fff', borderRadius: 12,
                                            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                            padding: '8px 0', minWidth: 120,
                                        }}>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); router.get('/seller/food/' + menu.id + '/edit'); setOpenMenu(null); }}
                                                style={{ display: 'block', width: '100%', padding: '8px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 14, fontFamily: 'Sen, sans-serif', color: '#32343e' }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={(e) => handleDelete(menu.id, e)}
                                                style={{ display: 'block', width: '100%', padding: '8px 16px', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 14, fontFamily: 'Sen, sans-serif', color: '#e74c3c' }}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Bottom padding for tab bar */}
                <div style={{ height: 120 }} />

                {/* Sidebar Overlay */}
                {sidebarOpen && (
                    <div
                        onClick={() => setSidebarOpen(false)}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100 }}
                    >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: 280, height: '100%', background: '#fff', padding: 40, display: 'flex', flexDirection: 'column', gap: 24 }}
                    >
                        <div style={{ fontSize: 18, fontWeight: 700, color: '#181c2e', fontFamily: 'Sen, sans-serif', marginBottom: 8 }}>
                            Menu
                        </div>
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
                                style={{ fontSize: 16, color: '#32343e', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontFamily: 'Sen, sans-serif', padding: '4px 0' }}
                            >
                                {link.label}
                            </button>
                        ))}
                        <button
                            onClick={() => { setSidebarOpen(false); router.post('/logout'); }}
                            style={{ fontSize: 16, color: '#7d82a0', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontFamily: 'Sen, sans-serif', padding: '4px 0', marginTop: 16 }}
                        >
                            Keluar
                        </button>
                    </div>
                    </div>
                )}

                {/* Bottom Tab Bar */}
                <SellerTabBar currentPath="/seller/my-food" />
            </div>
        </>
    );
}
