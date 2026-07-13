import { Head, router, useForm } from '@inertiajs/react';
import SellerTabBar from '@/Components/SellerTabBar';

export default function SellerSettings({ user, catering }) {
    const { data, setData, post, processing } = useForm({
        is_open: catering?.is_open !== false,
    });

    const SettingsRow = ({ icon, label, right, onClick }) => (
        <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', padding: '16px 16px', cursor: onClick ? 'pointer' : 'default' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {icon}
            </div>
            <span style={{ flex: 1, marginLeft: 14, fontSize: 16, fontFamily: 'Sen, sans-serif', color: '#32343e' }}>{label}</span>
            {right}
        </div>
    );

    const divider = <div style={{ height: 1, background: '#e8eaed', marginLeft: 78, marginRight: 16 }} />;

    const PersonIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#FB6F3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#FB6F3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    const MapIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#413DFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#413DFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    const BellIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8" stroke="#FFAA2A" strokeWidth="1.5" strokeLinecap="round"/><path d="M10.3 21C10.5 21.3 10.7 21.6 11 21.8C11.3 22 11.6 22.1 12 22.1C12.4 22.1 12.7 22 13 21.8C13.3 21.6 13.5 21.3 13.7 21" stroke="#FFAA2A" strokeWidth="1.5" strokeLinecap="round"/></svg>;
    const CartIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#369BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 6H21" stroke="#369BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#369BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    const ChevronRight = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11 8L15 12L11 16" stroke="#747783" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

    return (
        <>
            <Head title="Settings" />
            <div style={{ fontFamily: 'Sen, sans-serif', background: '#ffffff', minHeight: '100vh', paddingBottom: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '50px 24px 0', gap: 16 }}>
                    <div style={{ width: 45, height: 45, borderRadius: '50%', background: '#ecf0f4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => router.visit('/seller/menu')}>
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 11L1 6L6 1" stroke="#32343E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div style={{ flex: 1, fontSize: 17, color: '#181c2e' }}>Profile</div>
                    <div style={{ width: 45, height: 45, borderRadius: '50%', background: '#ecf0f4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <svg width="16" height="4" viewBox="0 0 16 4" fill="none"><circle cx="2" cy="2" r="2" fill="#181c2e"/><circle cx="8" cy="2" r="2" fill="#181c2e"/><circle cx="14" cy="2" r="2" fill="#181c2e"/></svg>
                    </div>
                </div>

                {/* Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '24px 24px 0' }}>
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#98a8b8', flexShrink: 0 }} />
                    <div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: '#32343e', fontFamily: 'Sen, sans-serif' }}>{user.name}</div>
                        <div style={{ fontSize: 14, color: '#a0a5ba', fontFamily: 'Sen, sans-serif', marginTop: 4 }}>Seller</div>
                    </div>
                </div>

                {/* Card 1 */}
                <div style={{ margin: '24px 24px 0', background: '#f6f8fa', borderRadius: 16 }}>
                    <SettingsRow icon={<PersonIcon />} label="Informasi Pribadi" right={<ChevronRight />} onClick={() => router.visit('/seller/personal-info')} />
                    {divider}
                    <SettingsRow icon={<MapIcon />} label="Alamat Pengiriman" right={<ChevronRight />} />
                </div>

                {/* Card 2 */}
                <div style={{ margin: '12px 24px 0', background: '#f6f8fa', borderRadius: 16 }}>
                    <SettingsRow icon={<BellIcon />} label="Notifikasi" right={
                        <div style={{ position: 'relative' }}>
                            <div
                                onClick={() => { setData('is_open', !data.is_open); post('/seller/settings', { preserveScroll: true }); }}
                                style={{
                                    width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
                                    background: data.is_open ? '#ff7622' : '#d0d0d0',
                                    position: 'relative', transition: 'background 0.2s',
                                }}
                            >
                                <div style={{
                                    width: 20, height: 20, borderRadius: '50%', background: '#ffffff',
                                    position: 'absolute', top: 2,
                                    left: data.is_open ? 22 : 2, transition: 'left 0.2s',
                                }} />
                            </div>
                        </div>
                    } />
                    {divider}
                    <SettingsRow icon={<CartIcon />} label="Metode Pembayaran" right={<ChevronRight />} />
                </div>

                <SellerTabBar currentPath="/seller/menu" />
            </div>
        </>
    );
}
