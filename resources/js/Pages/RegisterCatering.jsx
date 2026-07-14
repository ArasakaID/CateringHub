import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const BackIcon = () => (
    <svg width="5" height="10" viewBox="0 0 5 10" fill="none">
        <path d="M4 1L1 5L4 9" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

function StepIndicator({ current }) {
    return (
        <div className="flex items-center justify-center px-6 py-4" style={{ gap: '0' }}>
            {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                    <div
                        className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[12px] font-bold font-sen"
                        style={{
                            background: step <= current ? '#ff7622' : '#e0e0e0',
                            color: '#ffffff',
                        }}
                    >
                        {step}
                    </div>
                    {step < 3 && (
                        <div
                            className="h-[1px] mx-2"
                            style={{
                                width: '74px',
                                background: step < current ? '#ff7622' : '#cccccc',
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

const UploadIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 13V15H5V13H3V15C3 16.1 3.9 17 5 17H15C16.1 17 17 16.1 17 15V13H15Z" fill="#131927" />
        <path d="M9 3H11V11H9V3Z" fill="#131927" />
        <path d="M6 6L10 2L14 6H11V10H9V6H6Z" fill="#131927" />
    </svg>
);

export default function RegisterCatering({ user, step: initStep, catering_id: initCateringId, submitted }) {
    const { errors } = usePage().props;
    const [step, setStep] = useState(initStep || 1);
    const [cateringId, setCateringId] = useState(initCateringId || null);
    const [submitting, setSubmitting] = useState(false);

    // Step 1 fields
    const [name, setName] = useState('');
    const [slogan, setSlogan] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    // Step 2 fields
    const [ownerName, setOwnerName] = useState(user?.name || '');
    const [ownerNik, setOwnerNik] = useState('');
    const [ownerPhone, setOwnerPhone] = useState(user?.phone || '');
    const [ownerAddress, setOwnerAddress] = useState(user?.address || '');

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLogo(file);
        const reader = new FileReader();
        reader.onload = (ev) => setLogoPreview(ev.target.result);
        reader.readAsDataURL(file);
    };

    const handleStep1 = (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData();
        formData.append('name', name);
        if (slogan) formData.append('slogan', slogan);
        if (description) formData.append('description', description);
        if (logo) formData.append('logo', logo);

        router.post(route('register.catering.step1'), formData, {
            onSuccess: (page) => {
                setStep(2);
                setCateringId(page.props.catering_id);
                setSubmitting(false);
            },
            onError: () => setSubmitting(false),
            preserveState: true,
        });
    };

    const handleStep2 = (e) => {
        e.preventDefault();
        setSubmitting(true);
        router.post(route('register.catering.step2'), {
            catering_id: cateringId,
            owner_name: ownerName,
            owner_nik: ownerNik,
            owner_phone: ownerPhone,
            owner_address: ownerAddress,
        }, {
            onSuccess: (page) => {
                setStep(3);
                setSubmitting(false);
            },
            onError: () => setSubmitting(false),
            preserveState: true,
        });
    };

    const handleSubmit = () => {
        setSubmitting(true);
        router.post(route('register.catering.submit'), {
            catering_id: cateringId,
        }, {
            onSuccess: () => setSubmitting(false),
            onError: () => setSubmitting(false),
            preserveState: true,
        });
    };

    const handleBack = () => {
        if (step === 1) {
            router.visit('/home');
        } else if (step === 2) {
            setStep(1);
        } else {
            setStep(2);
        }
    };

    const titleMap = {
        1: 'Form Usaha Catering',
        2: 'Verifikasi Data',
        3: 'Proses Verifikasi',
    };

    if (submitted) {
        return (
            <>
                <Head title="Proses Verifikasi" />
                <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Sen, sans-serif' }}>
                    <div className="flex items-center px-6 pt-[50px] pb-4" style={{ gap: '16px' }}>
                        <button onClick={() => router.visit('/home')} className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0">
                            <BackIcon />
                        </button>
                        <span className="text-[#181c2e] text-[17px] font-sen">Proses Verifikasi</span>
                    </div>
                    <StepIndicator current={3} />
                    <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
                        <img src="/images/logo-signup.png" alt="CateringHub" className="w-[184px] h-[77px] mb-8" />
                        <p className="text-[#a0a5ba] text-[14px] font-sen text-center leading-relaxed">
                            Tunggu proses Verifikasi dari pihak CateringHub selama 1hari......
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={titleMap[step]} />
            <div className="min-h-screen bg-white" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* Top Bar */}
                <div className="flex items-center px-6 pt-[50px] pb-4" style={{ gap: '16px' }}>
                    <button
                        onClick={handleBack}
                        className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0"
                    >
                        <BackIcon />
                    </button>
                    <span className="text-[#181c2e] text-[17px] font-sen">{titleMap[step]}</span>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-[#f0f4f9] mx-6" />

                {/* Step Indicator */}
                <StepIndicator current={step} />

                {/* Step 1: Form Usaha Catering */}
                {step === 1 && (
                    <form onSubmit={handleStep1} className="px-6 pb-8 space-y-5">
                        <div>
                            <label className="text-[#32343e] text-[13px] font-sen block mb-2">nama Toko catering</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Cat'ring"
                                required
                                className="w-full h-[56px] bg-[#f0f5fa] rounded-[10px] px-4 text-[14px] font-sen text-[#6b6e82] outline-none border-none"
                                style={{ fontFamily: 'Sen, sans-serif' }}
                            />
                            {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="text-[#32343e] text-[13px] font-sen block mb-2">Slogan catering (opsional)</label>
                            <input
                                type="text"
                                value={slogan}
                                onChange={(e) => setSlogan(e.target.value)}
                                placeholder="Cat'rings"
                                className="w-full h-[56px] bg-[#f0f5fa] rounded-[10px] px-4 text-[14px] font-sen text-[#6b6e82] outline-none border-none"
                                style={{ fontFamily: 'Sen, sans-serif' }}
                            />
                        </div>

                        <div>
                            <label className="text-[#32343e] text-[13px] font-sen block mb-2">Deskripsi (opsional)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Deskripsikan usaha cateringmu...."
                                rows={4}
                                className="w-full bg-[#f0f5fa] rounded-[8px] px-4 py-3 text-[14px] font-sen text-[#a0a5ba] outline-none border-none resize-none"
                                style={{ fontFamily: 'Sen, sans-serif', minHeight: '103px' }}
                            />
                        </div>

                        <div>
                            <label className="text-[#32343e] text-[13px] font-sen block mb-2">Upload logo foto</label>
                            <div className="flex items-center gap-4">
                                <label className="w-[64px] h-[64px] bg-[#f0f5fa] rounded-[20px] flex items-center justify-center cursor-pointer overflow-hidden shrink-0">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <UploadIcon />
                                    )}
                                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                                </label>
                                <span className="text-[#a0a5ba] text-[12px] font-sen">Besar file maksimum 10 megabytes (10Mb)</span>
                            </div>
                            {errors.logo && <p className="text-red-500 text-[11px] mt-1">{errors.logo}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full h-[62px] bg-[#ff7622] rounded-[12px] text-white text-[16px] font-bold font-sen flex items-center justify-center mt-6"
                            style={{ fontFamily: 'Sen, sans-serif' }}
                        >
                            {submitting ? 'Menyimpan...' : 'Save'}
                        </button>
                    </form>
                )}

                {/* Step 2: Verifikasi Data */}
                {step === 2 && (
                    <form onSubmit={handleStep2} className="px-6 pb-8 space-y-5">
                        <div>
                            <label className="text-[#32343e] text-[13px] font-sen block mb-2">nama pemilik</label>
                            <input
                                type="text"
                                value={ownerName}
                                onChange={(e) => setOwnerName(e.target.value)}
                                required
                                className="w-full h-[56px] bg-[#f0f5fa] rounded-[10px] px-4 text-[14px] font-sen text-[#6b6e82] outline-none border-none"
                                style={{ fontFamily: 'Sen, sans-serif' }}
                            />
                            {errors.owner_name && <p className="text-red-500 text-[11px] mt-1">{errors.owner_name}</p>}
                        </div>

                        <div>
                            <label className="text-[#32343e] text-[13px] font-sen block mb-2">NIK</label>
                            <input
                                type="text"
                                value={ownerNik}
                                onChange={(e) => setOwnerNik(e.target.value)}
                                placeholder="20004411...."
                                required
                                className="w-full h-[56px] bg-[#f0f5fa] rounded-[10px] px-4 text-[14px] font-sen text-[#6b6e82] outline-none border-none"
                                style={{ fontFamily: 'Sen, sans-serif' }}
                            />
                            {errors.owner_nik && <p className="text-red-500 text-[11px] mt-1">{errors.owner_nik}</p>}
                        </div>

                        <div>
                            <label className="text-[#32343e] text-[13px] font-sen block mb-2">No HP</label>
                            <input
                                type="text"
                                value={ownerPhone}
                                onChange={(e) => setOwnerPhone(e.target.value)}
                                placeholder="086573xxxx"
                                required
                                className="w-full h-[56px] bg-[#f0f5fa] rounded-[10px] px-4 text-[14px] font-sen text-[#6b6e82] outline-none border-none"
                                style={{ fontFamily: 'Sen, sans-serif' }}
                            />
                            {errors.owner_phone && <p className="text-red-500 text-[11px] mt-1">{errors.owner_phone}</p>}
                        </div>

                        <div>
                            <label className="text-[#32343e] text-[13px] font-sen block mb-2">Alamat</label>
                            <textarea
                                value={ownerAddress}
                                onChange={(e) => setOwnerAddress(e.target.value)}
                                placeholder="Alamat usaha cateringmu...."
                                rows={4}
                                required
                                className="w-full bg-[#f0f5fa] rounded-[8px] px-4 py-3 text-[14px] font-sen text-[#a0a5ba] outline-none border-none resize-none"
                                style={{ fontFamily: 'Sen, sans-serif', minHeight: '103px' }}
                            />
                            {errors.owner_address && <p className="text-red-500 text-[11px] mt-1">{errors.owner_address}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full h-[62px] bg-[#ff7622] rounded-[12px] text-white text-[16px] font-bold font-sen flex items-center justify-center mt-6"
                            style={{ fontFamily: 'Sen, sans-serif' }}
                        >
                            {submitting ? 'Menyimpan...' : 'Save'}
                        </button>
                    </form>
                )}

                {/* Step 3: Proses Verifikasi */}
                {step === 3 && (
                    <div className="px-6 pb-8">
                        <div className="flex flex-col items-center justify-center py-16">
                            <img src="/images/logo-signup.png" alt="CateringHub" className="w-[184px] h-[77px] mb-8" />
                            <p className="text-[#a0a5ba] text-[14px] font-sen text-center leading-relaxed">
                                Tunggu proses Verifikasi dari pihak CateringHub selama 1hari......
                            </p>
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="w-full h-[62px] bg-[#ff7622] rounded-[12px] text-white text-[16px] font-bold font-sen flex items-center justify-center mt-8"
                                style={{ fontFamily: 'Sen, sans-serif', maxWidth: '327px' }}
                            >
                                {submitting ? 'Mengirim...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
