import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Sign Up" />

            <div className="min-h-screen bg-[#131927] mx-auto relative" style={{ maxWidth: 430, fontFamily: 'Sen, sans-serif' }}>
                {/* ===== BACK BUTTON ===== */}
                <Link
                    href={route('login')}
                    className="absolute top-[50px] left-[24px] z-20 w-[45px] h-[45px] rounded-full bg-white flex items-center justify-center cursor-pointer hover:shadow-md transition shadow-sm"
                >
                    <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 1L1 6L5 11" stroke="#5e616f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Link>

                {/* ===== LOGO ===== */}
                <div className="absolute top-[83px] left-1/2 -translate-x-1/2 z-20">
                    <img src="/images/logo-signup.png" alt="CateringHub" className="w-[184px] h-[77px]" />
                </div>

                {/* ===== WHITE CARD ===== */}
                <div className="pt-[233px]">
                    <div className="bg-white rounded-t-[24px] px-6 pb-[100px] min-h-[579px]">
                        {/* Title */}
                        <h1 className="text-center pt-[51px] text-[30px] font-bold text-black">
                            Sign Up
                        </h1>

                        {/* Form */}
                        <form onSubmit={submit} className="mt-[24px]">
                            {/* Name Field */}
                            <div>
                                <label className="block text-[13px] text-[#32343e] mb-[10px]">
                                    Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="Lahadalia"
                                        className="w-full h-[62px] bg-[#f0f5fa] rounded-[10px] px-[20px] text-[14px] text-[#a0a5ba] placeholder-[#a0a5ba] focus:outline-none focus:ring-2 focus:ring-[#ff7622]/30 focus:bg-white transition border-0"
                                        required
                                        autoComplete="name"
                                    />
                                </div>
                                <InputError message={errors.name} className="mt-2 text-[12px]" />
                            </div>

                            {/* Email Field */}
                            <div className="mt-[24px]">
                                <label className="block text-[13px] text-[#32343e] mb-[10px]">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="bahlul@sawit.co"
                                        className="w-full h-[62px] bg-[#f0f5fa] rounded-[10px] px-[20px] text-[14px] text-[#a0a5ba] placeholder-[#a0a5ba] focus:outline-none focus:ring-2 focus:ring-[#ff7622]/30 focus:bg-white transition border-0"
                                        required
                                        autoComplete="username"
                                    />
                                </div>
                                <InputError message={errors.email} className="mt-2 text-[12px]" />
                            </div>

                            {/* Password Field */}
                            <div className="mt-[24px]">
                                <label className="block text-[13px] text-[#32343e] mb-[10px]">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={e => { setData('password', e.target.value); setData('password_confirmation', e.target.value); }}
                                        placeholder="**********"
                                        className="w-full h-[62px] bg-[#f0f5fa] rounded-[10px] px-[20px] text-[14px] text-[#a0a5ba] placeholder-[#a0a5ba] focus:outline-none focus:ring-2 focus:ring-[#ff7622]/30 focus:bg-white transition border-0 tracking-[2px] placeholder:tracking-[4.75px]"
                                        required
                                        autoComplete="new-password"
                                    />
                                    {/* Eye toggle */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-[18px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] flex items-center justify-center"
                                    >
                                        {showPassword ? (
                                            /* Eye-open icon */
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 3C4.36364 3 1.25818 5.32 0 8.5C1.25818 11.68 4.36364 14 8 14C11.6364 14 14.7418 11.68 16 8.5C14.7418 5.32 11.6364 3 8 3Z" stroke="#a0a5ba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <circle cx="8" cy="8.5" r="2.5" stroke="#a0a5ba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        ) : (
                                            /* Eye-off icon */
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.41 9.41C9.20805 9.62018 8.96753 9.78959 8.70159 9.9086C8.43564 10.0276 8.14916 10.0939 7.85807 10.1039C7.56698 10.1139 7.27678 10.0675 7.00357 9.96718C6.73036 9.8669 6.47929 9.71463 6.26284 9.50725C6.04638 9.29987 5.86974 9.04147 5.74249 8.75531C5.61524 8.46915 5.53969 8.16049 5.51987 7.84455C5.50005 7.52861 5.53637 7.21178 5.62682 6.91014C5.71727 6.60851 5.85991 6.32776 6.04676 6.083" stroke="#a0a5ba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M11.9249 11.925C10.7384 12.7481 9.39965 13.0837 8.00044 12.8945" stroke="#a0a5ba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M14.0891 10.089C14.6673 9.246 15.124 8.388 15.4545 7.545" stroke="#a0a5ba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M2.72727 13.273L13.2727 2.72754" stroke="#a0a5ba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M0.54541 7.545C0.827302 8.245 1.18341 8.936 1.61341 9.591" stroke="#a0a5ba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M4.36365 4.909C5.21065 4.197 6.22665 3.757 7.27275 3.636" stroke="#a0a5ba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M10.9091 4.636C9.96027 4.048 8.92318 3.763 7.7796 3.843" stroke="#a0a5ba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-2 text-[12px]" />
                            </div>

                            {/* Sign Up Button */}
                            <div className="mt-[24px]">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-[62px] bg-[#ff7622] rounded-[12px] text-white text-[14px] font-bold hover:bg-[#ff6a1a] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {processing ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                    ) : (
                                        'Sign Up'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
