import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import SellerTabBar from '@/Components/SellerTabBar';

export default function PersonalInfo({ user, catering }) {
    const [editing, setEditing] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        catering_name: catering?.name || '',
        catering_address: catering?.address || '',
    });

    const handleSave = () => {
        put('/seller/personal-info', {
            preserveScroll: true,
            onSuccess: () => setEditing(false),
        });
    };

    const FieldRow = ({ label, value }) => (
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0', gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} />
            <div>
                <div style={{ fontSize: 12, color: '#6b6e82', fontFamily: 'Sen, sans-serif' }}>{label}</div>
                <div style={{ fontSize: 14, color: '#32343e', fontFamily: 'Sen, sans-serif', fontWeight: 700, marginTop: 2 }}>{value}</div>
            </div>
        </div>
    );

    const EditField = ({ label, name, type = 'text' }) => (
        <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: '#6b6e82', fontFamily: 'Sen, sans-serif', marginBottom: 4, display: 'block' }}>{label}</label>
            <input
                type={type}
                value={data[name]}
                onChange={e => setData(name, e.target.value)}
                style={{
                    width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #e8eaed',
                    fontSize: 14, fontFamily: 'Sen, sans-serif', color: '#32343e', outline: 'none', background: '#f6f8fa',
                    boxSizing: 'border-box',
                }}
            />
            {errors[name] && <div style={{ fontSize: 11, color: '#e74c3c', marginTop: 4 }}>{errors[name]}</div>}
        </div>
    );

    return (
        <>
            <Head title="Personal Info" />
            <div style={{ fontFamily: 'Sen, sans-serif', background: '#ffffff', minHeight: '100vh', paddingBottom: 100 }}>
                {/* Top Bar */}
                <div style={{ display: 'flex', alignItems: 'center', padding: '50px 24px 0', gap: 16 }}>
                    <div style={{ width: 45, height: 45, borderRadius: '50%', background: '#ecf0f4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => router.visit('/seller/menu')}>
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 11L1 6L6 1" stroke="#32343E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div style={{ flex: 1, fontSize: 17, color: '#181c2e' }}>Informasi Pribadi</div>
                    <span
                        onClick={() => editing ? handleSave() : setEditing(true)}
                        style={{ fontSize: 14, color: '#ff7622', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'Sen, sans-serif' }}
                    >
                        {editing ? 'SAVE' : 'EDIT'}
                    </span>
                </div>

                {/* Profile Photo + Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '24px 24px 0' }}>
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#98a8b8', flexShrink: 0 }} />
                    <div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: '#181c2e', fontFamily: 'Sen, sans-serif' }}>{user.name}</div>
                        <div style={{ fontSize: 14, color: '#a0a5ba', fontFamily: 'Sen, sans-serif', marginTop: 4 }}>Seller</div>
                    </div>
                </div>

                {/* Info Card */}
                <div style={{ margin: '24px 24px 0', background: '#f6f8fa', borderRadius: 16, padding: '8px 20px' }}>
                    {editing ? (
                        <>
                            <EditField label="Nama" name="name" />
                            <EditField label="Email" name="email" type="email" />
                            <EditField label="No. Telepon" name="phone" />
                            {catering && (
                                <>
                                    <EditField label="Nama Catering" name="catering_name" />
                                    <EditField label="Alamat" name="catering_address" />
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <FieldRow label="Nama" value={user.name} />
                            <div style={{ height: 1, background: '#e8eaed' }} />
                            <FieldRow label="Email" value={user.email} />
                            <div style={{ height: 1, background: '#e8eaed' }} />
                            <FieldRow label="No. Telepon" value={user.phone || '-'} />
                            {catering && (
                                <>
                                    <div style={{ height: 1, background: '#e8eaed' }} />
                                    <FieldRow label="Alamat" value={catering.address || '-'} />
                                </>
                            )}
                        </>
                    )}
                </div>
                <SellerTabBar currentPath="/seller/menu" />
            </div>
        </>
    );
}
