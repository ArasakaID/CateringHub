import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';

// Helper: chunk array into pairs for 2-column grid
function chunkPairs(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i += 2) {
        result.push([arr[i], arr[i + 1]]);
    }
    return result;
}

export default function CateringAcara({ catering, keywords }) {
    const [activeKeyword, setActiveKeyword] = useState(
        keywords.length > 0 ? keywords[0].name : ''
    );

    const filteredMenus = useMemo(() => {
        if (!activeKeyword) return [];
        return catering.menus.filter(menu => menu.category?.name === activeKeyword);
    }, [catering.menus, activeKeyword]);

    const menuRows = useMemo(() => chunkPairs(filteredMenus), [filteredMenus]);

    return (
        <>
            <Head title={`${catering.name} - CateringHub`} />

            <div className="min-h-screen bg-white" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* ===== TOP BAR ===== */}
                <div className="px-6 pt-[50px] flex items-center justify-between">
                    {/* Back */}
                    <Link href={route('home')} className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0 cursor-pointer hover:bg-gray-200 transition">
                        <svg width="6" height="11" viewBox="0 0 6 11" fill="none">
                            <path d="M5 1L1 5.5L5 10" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>

                    {/* Title */}
                    <span className="text-[#181c2e] text-[20px] font-bold">Profile Catering</span>

                    {/* More */}
                    <div className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0 cursor-pointer hover:bg-gray-200 transition">
                        <div className="flex gap-[3px]">
                            <div className="w-[2px] h-[2px] rounded-full bg-[#181c2e]"/>
                            <div className="w-[2px] h-[2px] rounded-full bg-[#181c2e]"/>
                            <div className="w-[2px] h-[2px] rounded-full bg-[#181c2e]"/>
                        </div>
                    </div>
                </div>

                {/* ===== RESTAURANT IMAGE ===== */}
                <div className="px-6 mt-[32px]">
                    <div className="relative w-full h-[200px]">
                        {/* Image wrapper with rounded corners and overflow clip */}
                        <div className="absolute inset-0 rounded-[32px] overflow-hidden bg-[#ffa027]">
                            {catering.image ? (
                                <img
                                    src={catering.image}
                                    alt={catering.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                />
                            ) : null}
                            {/* Fallback placeholder */}
                            <div className={`absolute inset-0 items-center justify-center ${catering.image ? 'hidden' : 'flex'}`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" opacity="0.15">
                                    <circle cx="60" cy="60" r="60" fill="white"/>
                                </svg>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-[200px] h-[200px] opacity-20">
                                <svg viewBox="0 0 200 200" fill="none">
                                    <circle cx="150" cy="150" r="100" fill="white"/>
                                </svg>
                            </div>
                            <div className="absolute bottom-0 left-4">
                                <svg width="100" height="80" viewBox="0 0 100 80" fill="none" opacity="0.3">
                                    <ellipse cx="50" cy="70" rx="45" ry="10" fill="white"/>
                                    <path d="M30 55C30 40 45 25 50 20C55 25 70 40 70 55" stroke="white" strokeWidth="2"/>
                                </svg>
                            </div>
                        </div>
                        </div>{/* closes image wrapper */}

                        {/* ===== PROFILE PHOTO OVERLAY ===== */}
                        <div className="absolute -bottom-[40px] left-[26px] w-[80px] h-[80px] rounded-full border-[4px] border-white overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.15)] bg-white">
                            {catering.logo ? (
                                <img
                                    src={catering.logo}
                                    alt={catering.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            <div className={`w-full h-full ${catering.logo ? 'hidden' : 'flex'} items-center justify-center bg-[#fc6e2a] text-white text-[28px] font-bold`}>
                                {catering.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== RESTAURANT INFO ===== */}
                <div className="px-6 mt-[40px]">
                    <h1 className="text-[#181c2e] text-[24px] font-bold">
                        {catering.name}
                    </h1>

                    <p className="text-[#a0a5ba] text-[15px] mt-[6px] leading-[26px]">
                        {catering.description}
                    </p>

                    {/* Info bar */}
                    <div className="flex items-center mt-[22px] gap-0">
                        {/* Rating */}
                        <div className="flex items-center gap-1.5">
                            <svg className="w-[20px] h-[20px]" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 1L12.47 6.98L19 7.57L14 12.18L15.53 19L10 15.48L4.47 19L6 12.18L1 7.57L7.53 6.98L10 1Z" fill="#ff7622"/>
                            </svg>
                            <span className="text-[#181c2e] text-[16px] font-bold">{catering.rating}</span>
                        </div>

                        <div className="w-[3px] h-[3px] rounded-full bg-[#a0a5ba] mx-3"/>

                        {/* Delivery */}
                        <div className="flex items-center gap-1.5">
                            <svg className="w-[23px] h-[16px]" width="23" height="16" viewBox="0 0 23 16" fill="none">
                                <path d="M0 0V2H14V6V8V11H8.2207C7.67163 10.3907 6.88492 10 6 10C5.11508 10 4.32837 10.3907 3.7793 11H3V10L5 8H1V13H3C3 14.657 4.343 16 6 16C7.657 16 9 14.657 9 13H15C15 14.657 16.343 16 18 16C19.657 16 21 14.657 21 13H22H23V8L20.2754 2.55273C20.1064 2.21373 19.7618 2 19.3828 2H16V0H0ZM1 4V6H8V4H1ZM16 4H18.7637L19.7637 6H16V4ZM16 8H20.7637L21 8.47266V11H20.2207C19.6716 10.3907 18.8849 10 18 10C17.2279 10 16.5316 10.3002 16 10.7793V8ZM6 11.75C6.689 11.75 7.25 12.311 7.25 13C7.25 13.689 6.689 14.25 6 14.25C5.311 14.25 4.75 13.689 4.75 13C4.75 12.311 5.311 11.75 6 11.75ZM18 11.75C18.689 11.75 19.25 12.311 19.25 13C19.25 13.689 18.689 14.25 18 14.25C17.311 14.25 16.75 13.689 16.75 13C16.75 12.311 17.311 11.75 18 11.75Z" fill="#ff7622"/>
                            </svg>
                            <span className="text-[#181c2e] text-[14px]">
                                {catering.delivery_type === 'free' ? 'Free' : catering.delivery_type}
                            </span>
                        </div>

                        <div className="w-[3px] h-[3px] rounded-full bg-[#a0a5ba] mx-3"/>

                        {/* Time */}
                        <div className="flex items-center gap-1.5">
                            <svg className="w-[20px] h-[20px]" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="8.5" stroke="#ff7622" strokeWidth="2"/>
                                <path d="M10 6V10.5L13 13" stroke="#ff7622" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <span className="text-[#181c2e] text-[14px]">{catering.delivery_time}</span>
                        </div>
                    </div>

                    {/* Review link */}
                    <button
                        onClick={() => router.visit(route('catering.reviews', catering.slug))}
                        className="mt-[14px] text-[#ff7622] text-[14px] font-bold flex items-center gap-1.5"
                    >
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                            <path d="M10 1L12.47 6.98L19 7.57L14 12.18L15.53 19L10 15.48L4.47 19L6 12.18L1 7.57L7.53 6.98L10 1Z" fill="#ff7622"/>
                        </svg>
                        Lihat Review ({catering.review_count})
                    </button>
                </div>

                {/* ===== KEYWORDS ===== */}
                {keywords.length > 0 && (
                    <div className="px-6 mt-[36px]">
                        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                            {keywords.map((kw) => (
                                <button
                                    key={kw.id}
                                    onClick={() => setActiveKeyword(kw.name)}
                                    className={`shrink-0 h-[52px] rounded-[33px] px-6 border-2 transition-all duration-200 text-[17px] ${
                                        activeKeyword === kw.name
                                            ? 'bg-[#ffd27c] border-[#ffd27c] text-[#181c2e] font-bold'
                                            : 'bg-transparent border-[#ededed] text-[#181c2e] hover:border-gray-300'
                                    }`}
                                    style={{ letterSpacing: '-0.33px' }}
                                >
                                    {kw.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ===== SECTION TITLE ===== */}
                {activeKeyword && (
                    <div className="px-6 mt-[36px]">
                        <h2 className="text-[#181c2e] text-[22px] font-bold">
                            {activeKeyword} ({filteredMenus.length})
                        </h2>
                    </div>
                )}

                {/* ===== MENU GRID ===== */}
                <div className="px-6 mt-[24px] pb-8">
                    {menuRows.length > 0 ? (
                        menuRows.map((row, rowIdx) => (
                            <div key={rowIdx} className={`flex gap-[21px] ${rowIdx > 0 ? 'mt-[24px]' : ''}`}>
                                {row.filter(Boolean).map((menu, colIdx) => (
                                    <div
                                        key={menu.id}
                                        onClick={() => router.visit(route('menu.show', { id: menu.id }))}
                                        className="flex-1 bg-white rounded-[25px] overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-200"
                                        style={{
                                            boxShadow: '0 15px 40px rgba(150,150,154,0.20)',
                                        }}
                                    >
                                        {/* Image */}
                                        <div className="h-[95px] mx-3 mt-3 rounded-[15px] flex items-center justify-center relative overflow-hidden bg-[#ffd27c]">
                                            {menu.image ? (
                                                <img
                                                    src={menu.image}
                                                    alt={menu.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            ) : (
                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" opacity="0.4">
                                                    <path d="M3 3H21V21H3V3Z" stroke="#181c2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M9 12C10.66 12 12 10.66 12 9C12 7.34 10.66 6 9 6C7.34 6 6 7.34 6 9C6 10.66 7.34 12 9 12Z" stroke="#181c2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M21 15L16 10L5 21" stroke="#181c2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="px-3 pt-[8px] pb-3 relative">
                                            <h3 className="text-[17px] font-bold text-[#32343e] truncate">
                                                {menu.name}
                                            </h3>
                                            <p className="text-[13px] text-[#646982] mt-[3px] truncate">
                                                {catering.name}
                                            </p>

                                            <div className="flex items-center justify-between mt-[6px]">
                                                <span className="text-[18px] font-bold text-[#181c2e]">
                                                    Rp {Number(menu.price).toLocaleString('id-ID')}
                                                </span>
                                                {/* Plus button */}
                                                <div className="w-[32px] h-[32px] rounded-full bg-[#f58d1d] flex items-center justify-center shadow-sm cursor-pointer hover:bg-[#e07e14] transition">
                                                    <svg width="11" height="10" viewBox="0 0 11 10" fill="none">
                                                        <path d="M5.5 0V10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                                        <path d="M0.5 5H10.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Rating */}
                                            <div className="flex items-center gap-1 mt-[4px]">
                                                <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                                                    <path d="M10 1L12.47 6.98L19 7.57L14 12.18L15.53 19L10 15.48L4.47 19L6 12.18L1 7.57L7.53 6.98L10 1Z" fill="#ff7622"/>
                                                </svg>
                                                <span className="text-[16px] text-[#181c2e]">{catering.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* Empty cell if odd count */}
                                {row.filter(Boolean).length === 1 && <div className="flex-1" />}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="9" stroke="#9CA3AF" strokeWidth="1.5"/>
                                    <path d="M8 10C8 10 9.5 12 12 12C14.5 12 16 10 16 10" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                                    <circle cx="9" cy="9" r="1" fill="#9CA3AF"/>
                                    <circle cx="15" cy="9" r="1" fill="#9CA3AF"/>
                                </svg>
                            </div>
                            <p className="text-gray-400 font-medium text-[16px]">Tidak ada menu</p>
                            <p className="text-gray-300 text-[14px] mt-2">Belum ada menu untuk kategori ini</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
