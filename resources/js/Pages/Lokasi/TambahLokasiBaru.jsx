import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function TambahLokasiBaru({ address = null, pendingLocation = { latitude: null, longitude: null, city: null } }) {
    const isEditing = !!address;

    const [form, setForm] = useState({
        label: address?.label || 'Rumah',
        address: address?.address || '',
        province: address?.province || '',
        postal_code: address?.postal_code || '',
        detail: address?.detail || '',
        latitude: address?.latitude || pendingLocation?.latitude || '',
        longitude: address?.longitude || pendingLocation?.longitude || '',
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const labels = ['Rumah', 'Kantor', 'Lainya'];

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!form.address.trim()) newErrors.address = 'Alamat wajib diisi';
        if (!form.label) newErrors.label = 'Pilih label alamat';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);

        const data = {
            label: form.label,
            address: form.address,
            province: form.province,
            postal_code: form.postal_code,
            detail: form.detail,
            latitude: form.latitude ? parseFloat(form.latitude) : null,
            longitude: form.longitude ? parseFloat(form.longitude) : null,
        };

        if (isEditing) {
            router.put(route('location.update', address.id), data, {
                onFinish: () => setSubmitting(false),
                onError: () => setSubmitting(false),
            });
        } else {
            router.post(route('location.store'), data, {
                onFinish: () => setSubmitting(false),
                onError: () => setSubmitting(false),
            });
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Sen, sans-serif' }}>
            <Head title={isEditing ? 'Edit Alamat' : 'Tambah Lokasi Baru'} />

            {/* Back Button */}
            <div className="px-4 pt-4 pb-2">
                <button
                    onClick={() => window.history.length > 1 ? window.history.back() : router.get(route('location.index'))}
                    className="flex items-center justify-center"
                    style={{
                        width: '45px',
                        height: '45px',
                        backgroundColor: '#32343e',
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L1.70711 8.29289C1.31658 8.68342 1.31658 9.31658 1.70711 9.70711L9 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            {/* Map Area */}
            <div
                className="relative w-full overflow-hidden"
                style={{
                    height: '295px',
                    backgroundColor: '#c4c4c4',
                    backgroundImage: form.latitude ? `url(https://tile.openstreetmap.org/14/9353/10428.png)` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Tooltip */}
                <div
                    className="absolute z-10"
                    style={{
                        top: '16px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    <div className="relative flex flex-col items-center">
                        <div
                            style={{
                                backgroundColor: '#32343e',
                                borderRadius: '3px',
                                padding: '4px 10px',
                                fontFamily: 'Sen, sans-serif',
                                fontSize: '9px',
                                color: '#ffffff',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Sesuaikan lokasi kamu
                        </div>
                        <div
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: '5px solid transparent',
                                borderRight: '5px solid transparent',
                                borderTop: '6px solid #32343e',
                            }}
                        />
                    </div>
                </div>

                {/* Pin */}
                <div
                    className="absolute z-10"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -100%)',
                    }}
                >
                    {/* Glow */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: '#fb6d3a',
                            opacity: 0.2,
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                    {/* Pin */}
                    <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="10" cy="10.5" rx="10" ry="10" fill="#fb6d3a"/>
                        <circle cx="10" cy="10" r="3.5" fill="white"/>
                        <path d="M10 20V27" stroke="#fb6d3a" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 px-6 pt-4 overflow-y-auto" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* Alamat */}
                <div className="mb-4">
                    <label
                        className="block mb-1"
                        style={{
                            fontFamily: 'Sen, sans-serif',
                            fontSize: '14px',
                            fontWeight: 400,
                            color: '#32343e',
                            letterSpacing: '0.02em',
                        }}
                    >
                        alamat
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ fontSize: '14px' }}>📍</span>
                        <input
                            type="text"
                            value={form.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            placeholder="jl. ringroad utara, Ngropoh, Condongcatrur"
                            style={{
                                width: '100%',
                                height: '50px',
                                backgroundColor: '#f0f5fa',
                                borderRadius: '10px',
                                border: errors.address ? '1px solid #ff4444' : 'none',
                                padding: '0 16px 0 40px',
                                fontFamily: 'Sen, sans-serif',
                                fontSize: '12px',
                                color: '#6b6e82',
                                letterSpacing: '0.02em',
                                outline: 'none',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                </div>

                {/* Provinsi + Kode Pos (side by side) */}
                <div className="flex gap-3 mb-4">
                    <div className="flex-1">
                        <label
                            className="block mb-1"
                            style={{
                                fontFamily: 'Sen, sans-serif',
                                fontSize: '14px',
                                fontWeight: 400,
                                color: '#32343e',
                                letterSpacing: '0.02em',
                            }}
                        >
                            provinsi
                        </label>
                        <input
                            type="text"
                            value={form.province}
                            onChange={(e) => handleChange('province', e.target.value)}
                            placeholder="di yogyakarta"
                            style={{
                                width: '100%',
                                height: '50px',
                                backgroundColor: '#f0f5fa',
                                borderRadius: '10px',
                                border: 'none',
                                padding: '0 16px',
                                fontFamily: 'Sen, sans-serif',
                                fontSize: '12px',
                                color: '#6b6e82',
                                letterSpacing: '0.02em',
                                outline: 'none',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    <div className="flex-1">
                        <label
                            className="block mb-1"
                            style={{
                                fontFamily: 'Sen, sans-serif',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#32343e',
                                letterSpacing: '0.02em',
                            }}
                        >
                            Kode pos
                        </label>
                        <input
                            type="text"
                            value={form.postal_code}
                            onChange={(e) => handleChange('postal_code', e.target.value)}
                            placeholder="55883"
                            style={{
                                width: '100%',
                                height: '50px',
                                backgroundColor: '#f0f5fa',
                                borderRadius: '10px',
                                border: 'none',
                                padding: '0 16px',
                                fontFamily: 'Sen, sans-serif',
                                fontSize: '12px',
                                color: '#6b6e82',
                                letterSpacing: '0.02em',
                                outline: 'none',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                </div>

                {/* Detail lainnya */}
                <div className="mb-4">
                    <label
                        className="block mb-1"
                        style={{
                            fontFamily: 'Sen, sans-serif',
                            fontSize: '14px',
                            fontWeight: 400,
                            color: '#32343e',
                            letterSpacing: '0.02em',
                        }}
                    >
                        Detail lainnya
                    </label>
                    <input
                        type="text"
                        value={form.detail}
                        onChange={(e) => handleChange('detail', e.target.value)}
                        placeholder="sebelah rumah kuning"
                        style={{
                            width: '100%',
                            height: '50px',
                            backgroundColor: '#f0f5fa',
                            borderRadius: '10px',
                            border: 'none',
                            padding: '0 16px',
                            fontFamily: 'Sen, sans-serif',
                            fontSize: '12px',
                            color: '#6b6e82',
                            letterSpacing: '0.02em',
                            outline: 'none',
                            boxSizing: 'border-box',
                        }}
                    />
                </div>

                {/* Label Tags */}
                <div className="mb-6">
                    <label
                        className="block mb-2"
                        style={{
                            fontFamily: 'Sen, sans-serif',
                            fontSize: '14px',
                            fontWeight: 400,
                            color: '#32343e',
                            letterSpacing: '0.02em',
                        }}
                    >
                        Tandai sebagai
                    </label>
                    <div className="flex gap-3">
                        {labels.map((label) => (
                            <button
                                key={label}
                                type="button"
                                onClick={() => handleChange('label', label)}
                                style={{
                                    width: '94px',
                                    height: '45px',
                                    borderRadius: '22.5px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontFamily: 'Sen, sans-serif',
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    color: form.label === label ? '#ffffff' : '#32343e',
                                    backgroundColor: form.label === label ? '#f58d1d' : '#f0f5fa',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pb-8">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center justify-center w-full"
                        style={{
                            width: '100%',
                            maxWidth: '327px',
                            height: '62px',
                            backgroundColor: '#ff7622',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: submitting ? 'not-allowed' : 'pointer',
                            opacity: submitting ? 0.7 : 1,
                            fontFamily: 'Sen, sans-serif',
                            fontSize: '14px',
                            fontWeight: 700,
                            color: '#ffffff',
                            margin: '0 auto',
                        }}
                    >
                        {submitting ? 'Menyimpan...' : isEditing ? 'simpan perubahan' : 'simpan alamat'}
                    </button>
                </div>
            </form>
        </div>
    );
}
