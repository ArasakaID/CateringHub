import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Pembayaran({ order, total, paymentMethods, savedCards }) {
    const [selectedMethod, setSelectedMethod] = useState('qris');
    const [processing, setProcessing] = useState(false);

    const showSavedCards = selectedMethod === 'mastercard' || selectedMethod === 'visa';

    const handleBayar = () => {
        if (processing) return;
        setProcessing(true);

        router.post(route('pembayaran.proses'), {
            order_id: order.id,
            payment_method: selectedMethod,
        }, {
            onFinish: () => setProcessing(false),
        });
    };

    const isSelected = (methodId) => selectedMethod === methodId;

    // QRIS methods: show QR + CEK STATUS
    const isQris = selectedMethod === 'qris';

    // Cash/bank methods: show placeholder info
    const isCash = selectedMethod === 'cash';
    const isBank = ['bca', 'mandiri', 'bri'].includes(selectedMethod);

    // SVG icon for each payment method
    const PaymentIcon = ({ type }) => {
        switch (type) {
            case 'cash':
                return (
                    <img src="/images/figma-cash-icon.png" alt="Tunai" width="28" height="28" />
                );
            case 'qris':
                return (
                    <img src="/images/figma-qris-logo.png" alt="QRIS" width="52" height="20" />
                );
            case 'mastercard':
                return (
                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                        <circle cx="10" cy="10" r="9" fill="#eb001b"/>
                        <circle cx="18" cy="10" r="9" fill="#f79e1b"/>
                        <circle cx="18" cy="10" r="9" fill="#ff5f00" opacity="0.5"/>
                        <ellipse cx="14" cy="10" rx="4.5" ry="9" fill="#ff5f00"/>
                    </svg>
                );
            case 'bca':
                return (
                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                        <rect x="1" y="3" width="26" height="14" rx="2" fill="#0066ae"/>
                        <text x="14" y="13" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">BCA</text>
                    </svg>
                );
            case 'mandiri':
                return (
                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                        <rect x="1" y="3" width="26" height="14" rx="2" fill="#004a8f"/>
                        <text x="14" y="13" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="Arial">MANDIRI</text>
                    </svg>
                );
            case 'bri':
                return (
                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                        <rect x="1" y="3" width="26" height="14" rx="2" fill="#00529c"/>
                        <text x="14" y="13" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">BRI</text>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Head title="Pembayaran - CateringHub" />

            <div className="min-h-screen bg-white" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* ===== TOP BAR ===== */}
                <div className="px-6 pt-[50px] flex items-center justify-between">
                    {/* Back */}
                    <Link
                        href={route('home')}
                        className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0 cursor-pointer hover:bg-gray-200 transition"
                    >
                        <svg width="6" height="11" viewBox="0 0 6 11" fill="none">
                            <path d="M5 1L1 5.5L5 10" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>

                    {/* Title */}
                    <span className="text-[#181c2e] text-[17px] leading-[22px]">
                        Pembayaran
                    </span>

                    {/* Spacer to balance back button */}
                    <div className="w-[45px]" />
                </div>

                {/* ===== METODE PEMBAYARAN ===== */}
                <div className="px-6 mt-[36px]">
                    <h2 className="text-[#181c2e] text-[16px] font-bold mb-[16px]">
                        Metode Pembayaran
                    </h2>

                    {/* Grid 3 columns — fixed 85×72 cards */}
                    <div
                        className="grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 85px)',
                            gap: '12px',
                            justifyContent: 'center',
                        }}
                    >
                        {paymentMethods.map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setSelectedMethod(method.id)}
                                className="relative flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:opacity-85"
                                style={{
                                    width: '85px',
                                    height: '72px',
                                    borderRadius: '9.6px',
                                    backgroundColor: isSelected(method.id) ? '#ffffff' : '#f0f5fa',
                                    border: isSelected(method.id) ? '2px solid #ff7622' : '2px solid transparent',
                                }}
                            >
                                {/* Check icon - top-right when selected */}
                                {isSelected(method.id) && (
                                    <div
                                        className="absolute w-[24px] h-[24px] rounded-full flex items-center justify-center"
                                        style={{
                                            backgroundColor: '#ff7622',
                                            border: '2px solid #ffffff',
                                            top: '-7px',
                                            right: '-7px',
                                        }}
                                    >
                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                            <path d="M1.5 5L4.5 8L10.5 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                )}

                                {/* Icon */}
                                <div className="mb-[4px]">
                                    <PaymentIcon type={method.icon_type} />
                                </div>

                                {/* Label */}
                                <span className="text-[14px]" style={{ color: '#464e57' }}>
                                    {method.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ===== QR CODE (only for QRIS) ===== */}
                {isQris && (
                    <div className="px-6 mt-[36px] flex flex-col items-center">
                        {/* QR Code Image from Figma — no border radius, drop shadow */}
                        <img
                            src="/images/figma-qr-code.png"
                            alt="QRIS QR Code"
                            className="w-[253px] h-[253px]"
                            style={{
                                boxShadow: '4px 4px 4px rgba(0,0,0,0.25)',
                            }}
                        />

                        {/* CEK STATUS Button */}
                        <button
                            className="w-full max-w-[327px] h-[62px] flex items-center justify-center mt-[24px] cursor-pointer hover:opacity-80 transition rounded-[10px]"
                            style={{ backgroundColor: '#f0f5fa' }}
                        >
                            <span className="text-[14px] font-bold" style={{ color: '#ff7622' }}>
                                CEK STATUS
                            </span>
                        </button>
                    </div>
                )}

                {/* ===== INFO PLACEHOLDER for cash/bank methods ===== */}
                {(isCash || isBank) && (
                    <div className="px-6 mt-[50px] flex flex-col items-center">
                        <div className="w-[253px] h-[160px] rounded-[20px] bg-[#f0f5fa] flex flex-col items-center justify-center">
                            {isCash ? (
                                <>
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <rect x="2" y="10" width="44" height="28" rx="6" stroke="#ff7622" strokeWidth="3"/>
                                        <circle cx="24" cy="24" r="8" stroke="#ff7622" strokeWidth="3"/>
                                        <path d="M6 18H10" stroke="#ff7622" strokeWidth="3" strokeLinecap="round"/>
                                        <path d="M38 30H42" stroke="#ff7622" strokeWidth="3" strokeLinecap="round"/>
                                    </svg>
                                    <p className="text-[#464e57] text-[14px] mt-[12px]">
                                        Bayar langsung ke kasir
                                    </p>
                                </>
                            ) : (
                                <>
                                    <svg width="48" height="36" viewBox="0 0 48 36" fill="none">
                                        <rect x="2" y="6" width="44" height="28" rx="4" stroke="#ff7622" strokeWidth="3"/>
                                        <line x1="2" y1="16" x2="46" y2="16" stroke="#ff7622" strokeWidth="2" strokeLinecap="round"/>
                                        <text x="24" y="26" textAnchor="middle" fill="#464e57" fontSize="9" fontWeight="bold" fontFamily="Arial">
                                            {selectedMethod.toUpperCase()}
                                        </text>
                                    </svg>
                                    <p className="text-[#464e57] text-[14px] mt-[12px]">
                                        Transfer ke {selectedMethod === 'bca' ? 'BCA' : selectedMethod === 'mandiri' ? 'Mandiri' : 'BRI'}
                                    </p>
                                    <p className="text-[#a0a5ba] text-[11px] mt-[4px]">
                                        No. Rekening akan ditampilkan
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* ===== SAVED CARDS (State 2 — when card method is selected) ===== */}
                {showSavedCards && (
                    <div className="px-6 mt-[36px]">
                        <h3 className="text-[#a0a5ba] text-[13px] mb-[12px] uppercase tracking-wide">
                            Kartu Tersimpan
                        </h3>

                        {/* Saved cards list */}
                        <div className="space-y-[12px]">
                            {savedCards.length > 0 ? (
                                savedCards.map((card) => (
                                    <div
                                        key={card.id}
                                        className="w-full rounded-[10px] px-[20px] relative flex items-center justify-between"
                                        style={{
                                            backgroundColor: '#f4f5f7',
                                            height: '82px',
                                        }}
                                    >
                                        <div className="flex flex-col justify-center" style={{ gap: '12px' }}>
                                            {/* Row 1: Cardholder name */}
                                            <p className="text-[#32343e] text-[16px] font-bold" style={{ fontFamily: 'Sen, sans-serif' }}>
                                                {card.cardholder_name}
                                            </p>

                                            {/* Row 2: Logo + masked number + last 4 */}
                                            <div className="flex items-center" style={{ gap: '10px' }}>
                                                {/* Card logo */}
                                                {card.card_type === 'mastercard' ? (
                                                    <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
                                                        <rect width="28" height="18" rx="3.6" fill="#2d2d2d"/>
                                                        <circle cx="9.75" cy="9" r="5.5" fill="#ff5023"/>
                                                        <ellipse cx="14" cy="9" rx="3.25" ry="5.5" fill="#ffcd00"/>
                                                        <circle cx="18.25" cy="9" r="5.5" fill="#ff5023"/>
                                                    </svg>
                                                ) : (
                                                    <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
                                                        <rect width="28" height="18" rx="3" fill="#1a1f71"/>
                                                        <text x="14" y="13" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="Arial">VISA</text>
                                                    </svg>
                                                )}

                                                {/* Masked number */}
                                                <span className="text-[16px]" style={{ color: '#32343e', opacity: 0.5, fontFamily: 'Sen, sans-serif' }}>
                                                    *************
                                                </span>

                                                {/* Last 4 digits */}
                                                <span className="text-[16px]" style={{ color: '#32343e', fontFamily: 'Sen, sans-serif' }}>
                                                    {card.last_four}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Arrow down */}
                                        <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                                            <path d="M1 1L5 5.5L9 1" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[#a0a5ba] text-[14px] text-center py-[16px]">
                                    Belum ada kartu tersimpan
                                </p>
                            )}

                            {/* ADD NEW Button — vertical layout: text above, icon below */}
                            <button
                                className="w-full h-[62px] rounded-[10px] flex flex-col items-center justify-center gap-[6px] cursor-pointer hover:opacity-80 transition"
                                style={{
                                    backgroundColor: '#ffffff',
                                    border: '2px solid #f0f5fa',
                                }}
                            >
                                <span className="text-[14px] font-bold" style={{ color: '#ff7622' }}>
                                    Add New
                                </span>
                                {/* Plus icon (silang diputar 45°) */}
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M7 0V14" stroke="#ff7622" strokeWidth="2.5" strokeLinecap="round"/>
                                    <path d="M0 7H14" stroke="#ff7622" strokeWidth="2.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* ===== TOTAL & BAYAR ===== */}
                <div className="px-6 mt-[50px] pb-[80px]">
                    <div className="flex items-baseline justify-between">
                        <span className="text-[16px]" style={{ color: '#121223', fontFamily: 'Sen, sans-serif', lineHeight: '24px' }}>
                            Total:
                        </span>
                        <span className="text-[30px]" style={{ color: '#181c2e', fontFamily: 'Sen, sans-serif', lineHeight: '36px' }}>
                            Rp {Number(total).toLocaleString('id-ID')}
                        </span>
                    </div>

                    {/* Bayar sekarang Button */}
                    <button
                        onClick={handleBayar}
                        disabled={processing}
                        className="w-full h-[62px] rounded-[12px] flex items-center justify-center mt-[20px] cursor-pointer hover:bg-[#e5681a] transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#ff7622' }}
                    >
                        <span className="text-white text-[14px] font-bold uppercase tracking-wide">
                            {processing ? 'Memproses...' : 'Bayar sekarang'}
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
}
