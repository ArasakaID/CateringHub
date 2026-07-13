import { Head, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import SellerTabBar from '@/Components/SellerTabBar';

const backArrow = (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
        <path d="M6 11L1 6L6 1" stroke="#32343E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const uploadIcon = (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
        <path d="M4 10L8 6L12 10" stroke="#523BB1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6V15" stroke="#523BB1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.3333 12.6667C16.075 12.2528 16.648 11.5831 16.9541 10.7812C17.2602 9.97936 17.2803 9.09358 17.0111 8.27839C16.7418 7.4632 16.1998 6.76863 15.4792 6.32124C14.7586 5.87384 13.9025 5.70021 13.0667 5.82667H12.1C11.8628 4.94247 11.398 4.13382 10.7517 3.48132C10.1053 2.82882 9.29869 2.35429 8.40986 2.10467C7.52103 1.85505 6.58072 1.83809 5.68322 2.05537C4.78572 2.27264 3.96014 2.71687 3.28667 3.34444C2.61319 3.97201 2.11365 4.76239 1.83551 5.6423C1.55737 6.52222 1.50863 7.46135 1.69385 8.36693C1.87908 9.27252 2.29159 10.1136 2.88889 10.8" stroke="#523BB1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 10L8 6L4 10" stroke="#523BB1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const checkIcon = (
    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
        <path d="M1 3L3 5L7 1" stroke="#FB6D3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const menuIcon = (
    <svg width="11" height="10" viewBox="0 0 11 10" fill="none">
        <line x1="1" y1="1.5" x2="10" y2="1.5" stroke="#9C9BA6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="1" y1="5" x2="8" y2="5" stroke="#9C9BA6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="1" y1="8.5" x2="9" y2="8.5" stroke="#9C9BA6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const inputStyle = {
    width: 327, height: 50, background: '#fdfdfd', border: '1px solid #e8eaed',
    borderRadius: 10, padding: '0 16px', fontSize: 12, fontFamily: 'Sen, sans-serif',
    color: '#32343e', letterSpacing: '0.02em', outline: 'none',
};

const labelStyle = {
    fontSize: 13, fontFamily: 'Sen, sans-serif', color: '#32343e',
    letterSpacing: '0.02em', marginBottom: 8, display: 'block',
};

const textareaStyle = {
    width: '100%', height: 103, background: '#fdfdfd', border: '1px solid #e8eaed',
    borderRadius: 8, padding: 16, fontSize: 12, fontFamily: 'Sen, sans-serif',
    color: '#32343e', letterSpacing: '0.02em', outline: 'none', resize: 'none',
    boxSizing: 'border-box',
};

export default function AddMenu({ categories }) {
    const fileInputRefs = [useRef(null), useRef(null), useRef(null)];
    const [form, setForm] = useState({
        name: '',
        price: '',
        unit: 'Box',
        category_id: categories.length > 0 ? categories[0].id : '',
        ingredients: '',
        extras: '',
        images: [null, null, null],
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleReset = () => {
        setForm({
            name: '',
            price: '',
            unit: 'Box',
            category_id: categories.length > 0 ? categories[0].id : '',
            ingredients: '',
            extras: '',
            images: [null, null, null],
        });
        setErrors({});
    };

    const handleImageUpload = (index, e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const newImages = [...form.images];
            newImages[index] = ev.target.result;
            update('images', newImages);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Nama menu harus diisi';
        if (!form.price || isNaN(form.price) || Number(form.price) <= 0) newErrors.price = 'Harga harus diisi';
        if (!form.category_id) newErrors.category_id = 'Kategori harus dipilih';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setSubmitting(true);
        router.post('/seller/menu', {
            name: form.name,
            price: form.price,
            unit: form.unit,
            category_id: form.category_id,
            ingredients: form.ingredients,
            extras: form.extras,
            images: form.images.filter(Boolean),
        }, {
            onError: (errs) => { setErrors(errs); setSubmitting(false); },
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <>
            <Head title="Tambah Menu" />
            <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: 'Sen, sans-serif', paddingBottom: 100 }}>
                {/* Top Bar */}
                <div style={{ padding: '50px 24px 0', display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <div style={{ width: 45, height: 45, borderRadius: '50%', background: '#ecf0f4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => router.visit('/seller/my-food')}>
                        {backArrow}
                    </div>
                    <span style={{ marginLeft: 16, fontSize: 17, fontFamily: 'Sen, sans-serif', color: '#32343e' }}>Tambah Menu</span>
                    <span onClick={handleReset} style={{ marginLeft: 'auto', fontSize: 14, fontFamily: 'Sen, sans-serif', color: '#fb6d3a', cursor: 'pointer' }}>Reset</span>
                </div>

                {/* Form Fields */}
                <div style={{ padding: '0 24px', marginTop: 24 }}>
                    {/* Nama Menu */}
                    <label style={labelStyle}>Nama Menu</label>
                    <input
                        style={{ ...inputStyle, borderColor: errors.name ? '#fb6d3a' : '#e8eaed' }}
                        placeholder="Mazalichiken Halim"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                    />

                    {/* Upload photo/video */}
                    <label style={{ ...labelStyle, marginTop: 24 }}>Upload photo/video</label>
                    <div style={{ display: 'flex', gap: 11 }}>
                        {[0, 1, 2].map(idx => (
                            <div key={idx} onClick={() => fileInputRefs[idx].current.click()} style={{ cursor: 'pointer' }}>
                                {form.images[idx] ? (
                                    <div style={{ width: 111, height: 101, borderRadius: 20, overflow: 'hidden' }}>
                                        <img src={form.images[idx]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ) : idx === 0 ? (
                                    <div style={{ width: 111, height: 101, borderRadius: 20, background: '#98a8b8' }} />
                                ) : (
                                    <div style={{
                                        width: 111, height: 101, background: '#fdfdfd', border: '1px dashed #e8eaed',
                                        borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center',
                                        justifyContent: 'center', gap: 6,
                                    }}>
                                        {uploadIcon}
                                        <span style={{ fontSize: 13, fontFamily: 'Sen, sans-serif', color: '#9c9ba6' }}>Add</span>
                                    </div>
                                )}
                                <input ref={fileInputRefs[idx]} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageUpload(idx, e)} />
                            </div>
                        ))}
                    </div>

                    {/* Price + Unit */}
                    <label style={{ ...labelStyle, marginTop: 24 }}>PRice</label>
                    <div style={{ display: 'flex', gap: 11 }}>
                        <div style={{
                            width: 148, height: 42, background: '#fdfdfd', border: '1px solid #e8eaed',
                            borderRadius: 10, display: 'flex', alignItems: 'center', overflow: 'hidden',
                        }}>
                            <input
                                style={{
                                    flex: 1, height: '100%', border: 'none', background: 'transparent',
                                    padding: '0 12px', fontSize: 14, fontFamily: 'Sen, sans-serif',
                                    color: '#32343e', letterSpacing: '0.02em', outline: 'none',
                                }}
                                placeholder="Rp.xxxx"
                                value={form.price}
                                onChange={e => update('price', e.target.value)}
                            />
                            <div style={{ width: 1, height: 20, background: '#e8eaed', flexShrink: 0 }} />
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 4, padding: '0 8px',
                                fontSize: 14, fontFamily: 'Sen, sans-serif', color: '#9c9ba6',
                                letterSpacing: '0.02em', height: '100%', cursor: 'pointer',
                            }} onClick={() => {
                                const units = ['Box', 'Porsi', 'Unit'];
                                const idx = units.indexOf(form.unit);
                                update('unit', units[(idx + 1) % units.length]);
                            }}>
                                {form.unit}
                                {menuIcon}
                            </div>
                        </div>
                    </div>
                    {errors.price && <span style={{ fontSize: 11, color: '#fb6d3a', marginTop: 4, display: 'block' }}>{errors.price}</span>}

                    {/* Kategori */}
                    <label style={{ ...labelStyle, marginTop: 24 }}>Kategori</label>
                    <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap' }}>
                        {categories.map(cat => {
                            const checked = form.category_id === cat.id;
                            return (
                                <div key={cat.id} onClick={() => update('category_id', cat.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                                    <div style={{
                                        width: 18, height: 18, borderRadius: 3,
                                        border: checked ? '1px solid #fb6d3a' : '1px solid #e8eaed',
                                        background: checked ? 'transparent' : '#fdfdfd',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {checked && checkIcon}
                                    </div>
                                    <span style={{ fontSize: 13, fontFamily: 'Sen, sans-serif', color: '#9c9ba6', letterSpacing: '0.02em' }}>{cat.name}</span>
                                </div>
                            );
                        })}
                    </div>
                    {errors.category_id && <span style={{ fontSize: 11, color: '#fb6d3a', marginTop: 4, display: 'block' }}>{errors.category_id}</span>}

                    {/* Isi menu */}
                    <label style={{ ...labelStyle, marginTop: 24 }}>Isi menu</label>
                    <textarea
                        style={textareaStyle}
                        value={form.ingredients}
                        onChange={e => update('ingredients', e.target.value)}
                    />

                    {/* TAMBAHAN (opsional) */}
                    <label style={{ ...labelStyle, marginTop: 24 }}>TAMBAHAN (opsional)</label>
                    <textarea
                        style={textareaStyle}
                        value={form.extras}
                        onChange={e => update('extras', e.target.value)}
                    />

                    {/* SAVE Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        style={{
                            width: 327, height: 62, background: '#ff7622', borderRadius: 10,
                            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: submitting ? 'not-allowed' : 'pointer', marginTop: 24, opacity: submitting ? 0.7 : 1,
                        }}
                    >
                        <span style={{ fontSize: 18, fontFamily: 'Sen, sans-serif', color: '#ffffff' }}>SAVE</span>
                    </button>
                </div>
                <SellerTabBar currentPath="/seller/add-menu" />
            </div>
        </>
    );
}