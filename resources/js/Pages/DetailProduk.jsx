import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function DetailProduk({ menu, catering, relatedMenus }) {
    const [qty, setQty] = useState(1);
    const [optionQtys, setOptionQtys] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const [imageError, setImageError] = useState(false);

    const options = menu.options || [];

    const totalPrice = menu.price * qty;

    const decreaseQty = () => {
        if (qty > 1) setQty(qty - 1);
    };

    const increaseQty = () => {
        setQty(qty + 1);
    };

    const getOptionQty = (optionName) => {
        return optionQtys[optionName] || 0;
    };

    const decreaseOption = (optionName) => {
        setOptionQtys((prev) => {
            const current = prev[optionName] || 0;
            if (current <= 0) return prev;
            return { ...prev, [optionName]: current - 1 };
        });
    };

    const increaseOption = (optionName) => {
        setOptionQtys((prev) => ({
            ...prev,
            [optionName]: (prev[optionName] || 0) + 1,
        }));
    };

    return (
        <>
            <Head title={`${menu.name} - CateringHub`} />

            <div className="min-h-screen bg-white" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* ===== TOP BAR ===== */}
                <div className="px-6 pt-[50px] flex items-center justify-between">
                    {/* Back button */}
                    <Link
                        href={route('catering.show', catering.slug)}
                        className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0 cursor-pointer hover:bg-gray-200 transition"
                    >
                        <svg width="6" height="11" viewBox="0 0 6 11" fill="none">
                            <path d="M5 1L1 5.5L5 10" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>

                    {/* Title */}
                    <span
                        className="text-[#181c2e] text-[17px] leading-[22px]"
                    >
                        Detail Produk
                    </span>

                    {/* Spacer to balance back button */}
                    <div className="w-[45px]" />
                </div>

                {/* ===== HERO IMAGE ===== */}
                <div className="px-6 mt-[24px]">
                    <div className="relative w-full rounded-[32px] overflow-hidden bg-[#ffd27c]"
                         style={{ height: '184px' }}
                    >
                        {menu.image && !imageError ? (
                            <img
                                src={menu.image}
                                alt={menu.name}
                                className="w-full h-full object-cover"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" opacity="0.4">
                                    <path d="M3 3H21V21H3V3Z" stroke="#181c2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9 12C10.66 12 12 10.66 12 9C12 7.34 10.66 6 9 6C7.34 6 6 7.34 6 9C6 10.66 7.34 12 9 12Z" stroke="#181c2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21 15L16 10L5 21" stroke="#181c2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        )}

                        {/* Save icon — Heart */}
                        <button
                            onClick={() => setIsSaved(!isSaved)}
                            className="absolute top-[16px] right-[16px] w-[37px] h-[37px] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12 21C12 21 4 15 4 9.5C4 6.46 6.46 4 9.5 4C11.19 4 12.71 4.82 13.67 6.06C14.22 5.38 14.97 4.88 15.84 4.67C16.14 4.59 16.45 4.55 16.76 4.55C17.35 4.55 17.93 4.68 18.46 4.93C19.65 5.5 20.5 6.74 20.5 8.15C20.5 8.35 20.48 8.55 20.44 8.75"
                                    stroke={isSaved ? '#ff7622' : 'white'}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    fill={isSaved ? '#ff7622' : 'none'}
                                />
                                <path
                                    d="M18.5 10.5V16.5"
                                    stroke={isSaved ? '#ff7622' : 'white'}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M15.5 13.5H21.5"
                                    stroke={isSaved ? '#ff7622' : 'white'}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ===== CATERING PROFILE PILL ===== */}
                <div className="px-6 mt-[16px]">
                    <Link
                        href={route('catering.show', catering.slug)}
                        className="inline-flex items-center gap-2 h-[47px] px-3 rounded-full border border-[#e9e9e9] bg-white cursor-pointer hover:bg-gray-50 transition"
                    >
                        {/* Catering logo */}
                        <div className="w-[21px] h-[21px] rounded-full overflow-hidden bg-gray-200 shrink-0">
                            {catering.logo ? (
                                <img
                                    src={catering.logo}
                                    alt={catering.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#ecf0f4]">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a0a5ba" strokeWidth="2">
                                        <circle cx="12" cy="8" r="4"/>
                                        <path d="M4 21C4 16.58 7.58 13 12 13C16.42 13 20 16.58 20 21"/>
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Catering name */}
                        <span className="text-[#181c2e] text-[14px] font-medium">
                            {catering.name}
                        </span>
                    </Link>
                </div>

                {/* ===== PRODUCT NAME ===== */}
                <div className="px-6 mt-[20px]">
                    <h1 className="text-[#181c2e] text-[20px] font-bold">
                        {menu.name}
                    </h1>
                </div>

                {/* ===== DESCRIPTION ===== */}
                {menu.description && (
                    <div className="px-6 mt-[8px]">
                        <p
                            className="text-[#a0a5ba] text-[14px] leading-[24px]"
                        >
                            {menu.description}
                        </p>
                    </div>
                )}

                {/* ===== INFO BAR ===== */}
                <div className="px-6 mt-[20px] flex items-center gap-8">
                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                        <svg className="w-[20px] h-[20px]" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 1L12.47 6.98L19 7.57L14 12.18L15.53 19L10 15.48L4.47 19L6 12.18L1 7.57L7.53 6.98L10 1Z" fill="#ff7622"/>
                        </svg>
                        <span className="text-[#181c2e] text-[16px] font-bold">
                            {catering.rating}
                        </span>
                    </div>

                    {/* Delivery */}
                    <div className="flex items-center gap-1.5">
                        <svg className="w-[23px] h-[16px]" width="23" height="16" viewBox="0 0 23 16" fill="none">
                            <path d="M0 0V2H14V6V8V11H8.2207C7.67163 10.3907 6.88492 10 6 10C5.11508 10 4.32837 10.3907 3.7793 11H3V10L5 8H1V13H3C3 14.657 4.343 16 6 16C7.657 16 9 14.657 9 13H15C15 14.657 16.343 16 18 16C19.657 16 21 14.657 21 13H22H23V8L20.2754 2.55273C20.1064 2.21373 19.7618 2 19.3828 2H16V0H0ZM1 4V6H8V4H1ZM16 4H18.7637L19.7637 6H16V4ZM16 8H20.7637L21 8.47266V11H20.2207C19.6716 10.3907 18.8849 10 18 10C17.2279 10 16.5316 10.3002 16 10.7793V8ZM6 11.75C6.689 11.75 7.25 12.311 7.25 13C7.25 13.689 6.689 14.25 6 14.25C5.311 14.25 4.75 13.689 4.75 13C4.75 12.311 5.311 11.75 6 11.75ZM18 11.75C18.689 11.75 19.25 12.311 19.25 13C19.25 13.689 18.689 14.25 18 14.25C17.311 14.25 16.75 13.689 16.75 13C16.75 12.311 17.311 11.75 18 11.75Z" fill="#ff7622"/>
                        </svg>
                        <span className="text-[#181c2e] text-[14px]">
                            {catering.delivery_type === 'free' ? 'Antar' : catering.delivery_type}
                        </span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-1.5">
                        <svg className="w-[20px] h-[20px]" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="8.5" stroke="#ff7622" strokeWidth="2"/>
                            <path d="M10 6V10.5L13 13" stroke="#ff7622" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span className="text-[#181c2e] text-[14px]">{catering.delivery_time}</span>
                    </div>
                </div>

                {/* ===== PILIHAN (OPTIONS) ===== */}
                {options.length > 0 && (
                    <div className="px-6 mt-[28px]">
                        <h3
                            className="text-[#32343e] text-[13px] font-bold uppercase mb-[16px]"
                            style={{ letterSpacing: '0.02em' }}
                        >
                            PILIHAN
                        </h3>

                        <div className="flex flex-col gap-[18px]">
                            {options.map((option, idx) => {
                                const optionName = typeof option === 'string' ? option : option.name;
                                const optQty = getOptionQty(optionName);

                                return (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between"
                                    >
                                        {/* Option name */}
                                        <span className="text-[#181c2e] text-[15px]">
                                            {optionName}
                                        </span>

                                        {/* Quantity counter — unified capsule */}
                                        <div
                                            className="flex items-center bg-[#757575] rounded-full"
                                        >
                                            {/* Minus */}
                                            <button
                                                onClick={() => decreaseOption(optionName)}
                                                disabled={optQty <= 0}
                                                className="w-[28px] h-[28px] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#888] transition disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
                                                    <path d="M0 1H8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                                </svg>
                                            </button>

                                            {/* Qty number */}
                                            <span className="text-white text-[16px] font-bold min-w-[32px] text-center">
                                                {optQty}
                                            </span>

                                            {/* Plus */}
                                            <button
                                                onClick={() => increaseOption(optionName)}
                                                className="w-[28px] h-[28px] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#888] transition"
                                            >
                                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                    <path d="M4 0V8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                                    <path d="M0 4H8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ===== SPACER FOR BOTTOM SHEET ===== */}
                <div className="h-[200px]" />

                {/* ===== BOTTOM SHEET ADD TO CART ===== */}
                <div
                    className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-10"
                    style={{ maxWidth: '430px' }}
                >
                    <div
                        className="bg-[#f0f5fa] px-6 pt-[24px] pb-[32px]"
                        style={{
                            borderRadius: '24px 24px 0 0',
                            boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
                        }}
                    >
                        <div className="flex items-center justify-between mb-[20px]">
                            {/* Price */}
                            <span className="text-[#181c2e] text-[28px] font-bold">
                                Rp {totalPrice.toLocaleString('id-ID')}
                            </span>

                            {/* Qty Selector — unified dark capsule */}
                            <div
                                className="flex items-center bg-[#121223] rounded-full"
                                style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}
                            >
                                {/* Minus */}
                                <button
                                    onClick={decreaseQty}
                                    disabled={qty <= 1}
                                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                                        <path d="M0 1H10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>

                                {/* Qty number */}
                                <span className="text-white text-[16px] font-bold min-w-[40px] text-center">
                                    {qty}
                                </span>

                                {/* Plus */}
                                <button
                                    onClick={increaseQty}
                                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                                >
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M5 0V10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M0 5H10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Masuk keranjang button */}
                        <button
                            className="w-full h-[62px] bg-[#ff7622] rounded-[12px] flex items-center justify-center cursor-pointer hover:bg-[#e5681a] transition active:scale-[0.98]"
                        >
                            <span className="text-white text-[16px] font-bold uppercase tracking-wide">
                                Masuk keranjang
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
