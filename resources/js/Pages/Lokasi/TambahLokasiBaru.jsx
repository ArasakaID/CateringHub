import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function TambahLokasiBaru({ address = null, pendingLocation = { latitude: null, longitude: null, city: null } }) {
    const isEditing = !!address;
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const [L, setL] = useState(null);

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

    useEffect(() => {
        import('leaflet').then((leaflet) => {
            const L = leaflet.default || leaflet;
            setL(() => L);

            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            });
        });
    }, []);

    useEffect(() => {
        if (!L || mapInstance.current) return;

        import('leaflet/dist/leaflet.css').then(() => {
            const lat = form.latitude ? parseFloat(form.latitude) : -7.7956;
            const lng = form.longitude ? parseFloat(form.longitude) : 110.3695;

            const map = L.map(mapRef.current, {
                center: [lat, lng],
                zoom: 14,
                zoomControl: false,
                attributionControl: false,
                dragging: false,
                scrollWheelZoom: false,
                touchZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                keyboard: false,
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);

            // Custom orange circle pin (matching Figma)
            const orangeIcon = L.divIcon({
                className: '',
                html: `
                    <div style="position:relative;width:50px;height:50px;display:flex;align-items:center;justify-content:center;">
                        <div style="position:absolute;width:30px;height:30px;border-radius:50%;background-color:#fb6d3a;opacity:0.2;top:50%;left:50%;transform:translate(-50%,-50%);"></div>
                        <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
                            <ellipse cx="11" cy="11.5" rx="10.5" ry="10.5" fill="#fb6d3a"/>
                            <circle cx="11" cy="11" r="4" fill="white"/>
                            <path d="M11 22V29" stroke="#fb6d3a" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                    </div>
                `,
                iconSize: [50, 50],
                iconAnchor: [25, 50],
            });

            L.marker([lat, lng], { icon: orangeIcon }).addTo(map);

            mapInstance.current = map;
            setTimeout(() => map.invalidateSize(), 100);
        });

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [L]);

    const latNum = form.latitude ? parseFloat(form.latitude) : null;
    const lngNum = form.longitude ? parseFloat(form.longitude) : null;

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

            {/* Map Area with floating back button */}
            <div className="relative w-full overflow-hidden" style={{ height: '295px' }}>
                {/* Back Button — floating over map */}
                <div className="absolute top-4 left-4 z-[1001]">
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

                {/* Map */}
                <div ref={mapRef} className="absolute inset-0 w-full h-full" />

                {/* Tooltip — centered above pin */}
                <div
                    className="absolute z-[1000]"
                    style={{
                        top: 'calc(50% - 85px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    <div className="relative flex flex-col items-center">
                        <div
                            style={{
                                backgroundColor: '#32343e',
                                borderRadius: '3px',
                                padding: '4px 8px',
                                fontFamily: 'Poppins, sans-serif',
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
                        ALAMAT
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ fontSize: '14px' }}>📍</span>
                        <input
                            type="text"
                            value={form.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            placeholder="Jl. Ringroad Utara, Ngropoh, Condongcatrur"
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
                            PROVINSI
                        </label>
                        <input
                            type="text"
                            value={form.province}
                            onChange={(e) => handleChange('province', e.target.value)}
                            placeholder="Di Yogyakarta"
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
                                fontWeight: 400,
                                color: '#32343e',
                                letterSpacing: '0.02em',
                            }}
                        >
                            KODE POS
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
                        DETAIL LAINNYA
                    </label>
                    <input
                        type="text"
                        value={form.detail}
                        onChange={(e) => handleChange('detail', e.target.value)}
                        placeholder="Sebelah rumah kuning"
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
                        TANDAI SEBAGAI
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
                <div className="pb-8 flex justify-center">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center justify-center"
                        style={{
                            width: '327px',
                            maxWidth: '100%',
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
                        }}
                    >
                        {submitting ? 'Menyimpan...' : isEditing ? 'SIMPAN PERUBAHAN' : 'SIMPAN ALAMAT'}
                    </button>
                </div>
            </form>
        </div>
    );
}
