import { Head, router } from '@inertiajs/react';
import { useState, useRef, useCallback } from 'react';

// Category icons dari Figma
const categoryIcons = {
    semua: (
        <div className="w-full h-full rounded-2xl overflow-hidden bg-[#ffd27c] flex items-center justify-center">
            <img src="/images/icons/category-semua.png" alt="Semua" className="w-full h-full object-cover" />
        </div>
    ),
    harian: (
        <div className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
            <img src="/images/icons/category-harian.png" alt="Harian" className="w-full h-full object-cover" />
        </div>
    ),
    snack: (
        <div className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
            <img src="/images/icons/category-snack.png" alt="Snack" className="w-full h-full object-cover" />
        </div>
    ),
    acara: (
        <div className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
            <img src="/images/icons/category-acara.png" alt="Acara" className="w-full h-full object-cover" />
        </div>
    ),
    minuman: (
        <div className="w-full h-full rounded-2xl overflow-hidden bg-[#D6FFE4] flex items-center justify-center">
            <svg viewBox="0 0 44 44" fill="none" className="w-full h-full p-2.5">
                <rect x="8" y="6" width="28" height="32" rx="4" fill="#ff7622" opacity="0.8"/>
                <rect x="8" y="6" width="28" height="6" rx="2" fill="#ff7622" opacity="0.5"/>
                <line x1="12" y1="18" x2="32" y2="18" stroke="white" strokeWidth="1.5"/>
            </svg>
        </div>
    ),
    kue: (
        <div className="w-full h-full rounded-2xl overflow-hidden bg-[#FFD6E4] flex items-center justify-center">
            <svg viewBox="0 0 44 44" fill="none" className="w-full h-full p-2">
                <rect x="10" y="16" width="24" height="18" rx="3" fill="#ff7622" opacity="0.8"/>
                <circle cx="16" cy="24" r="2" fill="white"/>
                <circle cx="22" cy="24" r="2" fill="white"/>
                <circle cx="28" cy="24" r="2" fill="white"/>
                <circle cx="16" cy="29" r="1.5" fill="#ff7622"/>
                <circle cx="22" cy="29" r="1.5" fill="#ff7622"/>
                <circle cx="28" cy="29" r="1.5" fill="#ff7622"/>
            </svg>
        </div>
    ),
};

export default function Home({ auth, categories, caterings, cartCount, userAddresses, activeAddress }) {
    const [selectedCategory, setSelectedCategory] = useState('semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState(activeAddress
        ? `${activeAddress.label}: ${activeAddress.address?.substring(0, 20)}...`
        : 'Pilih lokasimu');
    const [showLocation, setShowLocation] = useState(false);
    const scrollRef = useRef(null);
    const searchRef = useRef(null);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const scrollStartX = useRef(0);

    const filteredCaterings = caterings.filter(c => {
        const cat = categories.find(cat => cat.slug === selectedCategory);
        if (selectedCategory !== 'semua' && cat && c.category_id !== cat.id) return false;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            return c.name.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q);
        }
        return true;
    });

    // Grab-to-scroll handlers
    const handleMouseDown = useCallback((e) => {
        if (!scrollRef.current) return;
        isDragging.current = true;
        dragStartX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollStartX.current = scrollRef.current.scrollLeft;
        scrollRef.current.style.cursor = 'grabbing';
        scrollRef.current.style.userSelect = 'none';
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging.current || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - dragStartX.current) * 1.5;
        scrollRef.current.scrollLeft = scrollStartX.current - walk;
    }, []);

    const handleMouseUp = useCallback(() => {
        if (!scrollRef.current) return;
        isDragging.current = false;
        scrollRef.current.style.cursor = 'grab';
        scrollRef.current.style.removeProperty('user-select');
    }, []);

    return (
        <>
            <Head title="CateringHub" />

            <div className="min-h-screen bg-white" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* ===== TOP BAR ===== */}
                <div className="px-6 pt-[50px] flex items-start justify-between">
                    {/* Menu */}
                    <div className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0 cursor-pointer hover:bg-gray-200 transition">
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1H15" stroke="#181C2E" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M1 6H15" stroke="#181C2E" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M1 11H9" stroke="#181C2E" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>

                    {/* Location */}
                    <div className="relative text-left">
                        <div className="text-[#fc6e2a] text-[12px] font-bold tracking-[0.5px]">DIANTAR KE</div>
                        <button
                            onClick={() => setShowLocation(!showLocation)}
                            className="flex items-center gap-1 mt-0.5"
                        >
                            <span className="text-[#676767] text-[14px]">{location}</span>
                            <img src="/images/icons/chevron-down.svg" alt="▼" className={`w-[10px] h-[7px] transition-transform duration-200 ${showLocation ? 'rotate-180' : ''}`} />
                        </button>

                        {showLocation && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] py-2 z-20 min-w-[220px]">
                                {(!userAddresses || userAddresses.length === 0) ? (
                                    <div className="px-5 py-3 text-sm text-gray-400 text-center">
                                        <p className="mb-2">Belum ada alamat</p>
                                        <button
                                            onClick={() => router.get(route('location.access'))}
                                            className="text-[#fc6e2a] font-semibold hover:underline"
                                        >
                                            Tambah alamat
                                        </button>
                                    </div>
                                ) : (
                                    userAddresses.map((addr) => (
                                        <button
                                            key={addr.id}
                                            onClick={() => {
                                                setLocation(`${addr.label}: ${addr.address.substring(0, 20)}...`);
                                                setShowLocation(false);
                                                router.post(route('location.set-active', addr.id), {}, {
                                                    preserveScroll: true,
                                                    preserveState: true,
                                                });
                                            }}
                                            className={`block w-full text-left px-5 py-2.5 text-sm transition ${
                                                addr.is_active ? 'text-[#fc6e2a] font-bold bg-orange-50' : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            {addr.is_active && (
                                                <svg className="inline mr-2 -mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M2 6L5 9L10 3" stroke="#fc6e2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            )}
                                            <span className="font-medium">{addr.label}</span>
                                            <span className="text-gray-400 ml-1 truncate">{addr.address.substring(0, 25)}</span>
                                        </button>
                                    ))
                                )}
                                {auth && auth.user && (
                                    <div className="border-t border-gray-100 mt-1 pt-1">
                                        <button
                                            onClick={() => router.get(route('location.index'))}
                                            className="block w-full text-left px-5 py-2.5 text-sm text-[#fc6e2a] font-semibold hover:bg-orange-50 transition"
                                        >
                                            Kelola alamat
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Cart — link ke Checkout */}
                    <div className="relative shrink-0 pt-1">
                        <button
                            onClick={() => router.visit(route('checkout'))}
                            className="w-[45px] h-[45px] rounded-full bg-[#181c2e] flex items-center justify-center cursor-pointer hover:bg-gray-800 transition"
                        >
                            <img src="/images/icons/cart.svg" alt="Cart" className="w-[20px] h-[22px]" />
                        </button>
                        <div className="absolute top-0 right-0 w-[22px] h-[22px] bg-[#ff7622] rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
                            <span className="text-white text-[11px] font-bold">{cartCount}</span>
                        </div>
                    </div>
                </div>

                {/* ===== GREETING ===== */}
                <div className="px-6 mt-[24px]">
                    <h1 className="text-[#1e1d1d] text-[16px]" style={{ fontWeight: 500 }}>
                        Halo User, Selamat Datang!
                    </h1>
                </div>

                {/* ===== SEARCH ===== */}
                <div className="px-6 mt-[16px]">
                    <div className="bg-[#f6f6f6] rounded-[10px] h-[62px] flex items-center px-5 gap-3 transition-all focus-within:ring-2 focus-within:ring-orange-300 focus-within:bg-white">
                        <img src="/images/icons/search.svg" alt="Search" className="w-[15px] h-[15px] shrink-0" />
                        <input
                            ref={searchRef}
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search dishes, restaurants"
                            className="flex-1 bg-transparent text-[14px] text-[#676767] placeholder-[#676767] focus:outline-none border-0 ring-0"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}
                                className="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center hover:bg-gray-400 transition shrink-0"
                            >
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M2 2L8 8M8 2L2 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* ===== SEMUA KATEGORI ===== */}
                <div className="mt-[24px]">
                    <div className="px-6 flex items-center justify-between mb-[18px]">
                        <h2 className="text-[#32343e] text-[20px]" style={{ fontWeight: 500 }}>Semua kategori</h2>
                        <button className="flex items-center gap-1.5 text-[#333333] text-[16px] opacity-70 hover:opacity-100 transition tracking-[-0.33px]">
                            See All
                            <img src="/images/icons/arrow-right.svg" alt="→" className="w-[5px] h-[10px]" />
                        </button>
                    </div>

                    <div
                        ref={scrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-6 pb-2 cursor-grab active:cursor-grabbing select-none"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`shrink-0 flex items-center gap-3 h-[60px] rounded-full pl-[6px] pr-5 transition-all duration-200 ${
                                    selectedCategory === cat.slug
                                        ? 'bg-[#ffd27c] shadow-[0_10px_30px_rgba(239,230,225,1)]'
                                        : 'bg-white shadow-[0_12px_30px_rgba(150,150,154,0.12)] hover:shadow-[0_12px_30px_rgba(150,150,154,0.2)]'
                                }`}
                            >
                                <div className="w-[44px] h-[44px] rounded-[23px] overflow-hidden shrink-0 flex items-center justify-center bg-[#f6f6f6]">
                                    {categoryIcons[cat.slug] || (
                                        <span className="text-xl">🍽️</span>
                                    )}
                                </div>
                                <span className="text-[#32343e] text-[14px] font-bold whitespace-nowrap">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ===== CATERING TERSEDIA ===== */}
                <div className="mt-[44px]">
                    <div className="px-6 flex items-center justify-between mb-[18px]">
                        <h2 className="text-[#32343e] text-[20px]" style={{ fontWeight: 500 }}>Catering Tersedia</h2>
                        <button className="flex items-center gap-1.5 text-[#333333] text-[16px] opacity-70 hover:opacity-100 transition tracking-[-0.33px]">
                            See All
                            <img src="/images/icons/arrow-right.svg" alt="→" className="w-[5px] h-[10px]" />
                        </button>
                    </div>

                    <div className="px-6 pb-8">
                        {filteredCaterings.length > 0 ? (
                            <div className="flex flex-col gap-[18px]">
                                {filteredCaterings.map((catering) => (
                                    <div
                                        key={catering.id}
                                        onClick={() => router.visit(route('catering.show', { slug: catering.slug }))}
                                        className="bg-white border border-gray-100/80 shadow-[0_12px_30px_rgba(150,150,154,0.15)] hover:shadow-[0_12px_30px_rgba(150,150,154,0.25)] transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                                    >
                                        {/* Image */}
                                        <div className="h-[137px] relative rounded-[10px] overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 mx-[1px] mt-[1px]">
                                            {catering.image ? (
                                                <img
                                                    src={catering.image}
                                                    alt={catering.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                                />
                                            ) : null}
                                            <div className={`absolute inset-0 items-center justify-center ${catering.image ? 'hidden' : 'flex'}`}>
                                                <div className="w-20 h-20 rounded-full bg-white/60 backdrop-blur flex items-center justify-center shadow-inner">
                                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                                                        <path d="M3 3H21V21H3V3Z" stroke="#ff7622" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                                                        <path d="M9 12C10.66 12 12 10.66 12 9C12 7.34 10.66 6 9 6C7.34 6 6 7.34 6 9C6 10.66 7.34 12 9 12Z" stroke="#ff7622" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                                                        <path d="M21 15L16 10L5 21" stroke="#ff7622" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-4 pt-[22px] pb-[18px]">
                                            {/* Name */}
                                            <h3 className="text-[#181c2e] text-[20px]" style={{ fontWeight: 500 }}>
                                                {catering.name}
                                            </h3>

                                            {/* Subtitle */}
                                            <p className="text-[#80869e] text-[14px] mt-[5px]">
                                                {catering.category?.name} - {catering.name} - {catering.delivery_type}
                                            </p>

                                            {/* Icons row */}
                                            <div className="flex items-center mt-[14px]">
                                                {/* Rating */}
                                                <div className="flex items-center gap-1.5">
                                                    <img src="/images/icons/star.svg" alt="★" className="w-[20px] h-[20px]" />
                                                    <span className="text-[#181c2e] text-[16px] font-bold">{catering.rating}</span>
                                                </div>

                                                {/* Divider dot */}
                                                <div className="w-[3px] h-[3px] rounded-full bg-[#a0a5ba] mx-3"/>

                                                {/* Delivery */}
                                                <div className="flex items-center gap-1.5">
                                                    <img src="/images/icons/delivery.svg" alt="Delivery" className="w-[23px] h-[16px]" />
                                                    <span className="text-[#181c2e] text-[14px]">
                                                        {catering.delivery_fee > 0 ? `Rp${catering.delivery_fee.toLocaleString()}` : 'Free'}
                                                    </span>
                                                </div>

                                                {/* Divider dot */}
                                                <div className="w-[3px] h-[3px] rounded-full bg-[#a0a5ba] mx-3"/>

                                                {/* Reviews */}
                                                <div className="flex items-center gap-1.5">
                                                    <img src="/images/icons/review.svg" alt="Review" className="w-[20px] h-[20px]" />
                                                    <span className="text-[#181c2e] text-[14px] font-bold">
                                                        {catering.review_count} Reviews
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                        <circle cx="11" cy="11" r="7" stroke="#9CA3AF" strokeWidth="1.5"/>
                                        <path d="M16.5 16.5L21 21" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <p className="text-gray-400 font-medium text-[16px]">Tidak ada catering ditemukan</p>
                                <p className="text-gray-300 text-[14px] mt-2">Coba kata kunci lain atau kategori berbeda</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

