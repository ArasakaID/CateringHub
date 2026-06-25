import { Head, Link, router } from '@inertiajs/react';
import { useState, useRef, useMemo, useEffect, useCallback } from 'react';

// Helper: chunk array into pairs for 2-column grid
function chunkPairs(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i += 2) {
        result.push([arr[i], arr[i + 1]]);
    }
    return result;
}

// Local component for menu card image with error fallback
function MenuImage({ menu }) {
    const [errored, setErrored] = useState(false);
    const hasImage = !!menu.image;

    if (hasImage && !errored) {
        return (
            <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-full object-cover"
                onError={() => setErrored(true)}
            />
        );
    }

    return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" opacity="0.4">
            <path d="M3 3H21V21H3V3Z" stroke="#181c2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12C10.66 12 12 10.66 12 9C12 7.34 10.66 6 9 6C7.34 6 6 7.34 6 9C6 10.66 7.34 12 9 12Z" stroke="#181c2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 15L16 10L5 21" stroke="#181c2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export default function Search({ query: initialQuery, activeTag: initialTag, caterings, menus, keywords, cartCount }) {
    const [searchQuery, setSearchQuery] = useState(initialQuery || '');
    const [activeTag, setActiveTag] = useState(initialTag || '');
    const inputRef = useRef(null);
    const debounceRef = useRef(null);
    const tagScrollRef = useRef(null);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const scrollStartX = useRef(0);

    // Navigate with debounced search
    const triggerSearch = useCallback((q, tag) => {
        const params = new URLSearchParams();
        if (q) params.set('q', q);
        if (tag) params.set('tag', tag);
        const queryString = params.toString();
        router.visit(`/search${queryString ? '?' + queryString : ''}`, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, []);

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchQuery(val);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            triggerSearch(val, activeTag);
        }, 400);
    };

    const handleClear = () => {
        setSearchQuery('');
        inputRef.current?.focus();
        triggerSearch('', activeTag);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            triggerSearch(searchQuery, activeTag);
        }
    };

    const handleTagClick = (slug) => {
        const newTag = slug === activeTag ? '' : slug;
        setActiveTag(newTag);
        triggerSearch(searchQuery, newTag);
    };

    // Grab-to-scroll for keyword tags
    const handleTagMouseDown = useCallback((e) => {
        if (!tagScrollRef.current) return;
        isDragging.current = true;
        dragStartX.current = e.pageX - tagScrollRef.current.offsetLeft;
        scrollStartX.current = tagScrollRef.current.scrollLeft;
        tagScrollRef.current.style.cursor = 'grabbing';
        tagScrollRef.current.style.userSelect = 'none';
    }, []);

    const handleTagMouseMove = useCallback((e) => {
        if (!isDragging.current || !tagScrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - tagScrollRef.current.offsetLeft;
        const walk = (x - dragStartX.current) * 1.5;
        tagScrollRef.current.scrollLeft = scrollStartX.current - walk;
    }, []);

    const handleTagMouseUp = useCallback(() => {
        if (!tagScrollRef.current) return;
        isDragging.current = false;
        tagScrollRef.current.style.cursor = 'grab';
        tagScrollRef.current.style.removeProperty('user-select');
    }, []);

    // Auto-focus input on mount — removed to show default borderless state
    // useEffect(() => {
    //     inputRef.current?.focus();
    // }, []);

    // Menu cards rows
    const menuRows = useMemo(() => chunkPairs(menus), [menus]);

    return (
        <>
            <Head title="Cari - CateringHub" />

            <div className="min-h-screen bg-white" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* Inner wrapper — match Figma frame width 363px */}
                <div className="mx-auto" style={{ maxWidth: '363px' }}>
                {/* ===== 1. TOP BAR ===== */}
                <div className="px-[18px] pt-[50px] flex items-center justify-between">
                    {/* Back */}
                    <Link href={route('home')} className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0 cursor-pointer hover:bg-gray-200 transition">
                        <svg width="6" height="11" viewBox="0 0 6 11" fill="none">
                            <path d="M5 1L1 5.5L5 10" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>

                    {/* Title */}
                    <span className="text-[#181c2e] text-[17px]" style={{ lineHeight: '22px' }}>
                        Cari
                    </span>

                    {/* Cart — link ke Checkout */}
                    <div className="relative shrink-0">
                        <button
                            onClick={() => router.visit(route('checkout'))}
                            className="w-[45px] h-[45px] rounded-full bg-[#181c2e] flex items-center justify-center cursor-pointer hover:bg-gray-800 transition"
                        >
                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                                <path d="M1 1H3L3.4 3M3.4 3L5 15H17L19 5H3.4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="6" cy="19" r="1.5" stroke="white" strokeWidth="1.5"/>
                                <circle cx="16" cy="19" r="1.5" stroke="white" strokeWidth="1.5"/>
                            </svg>
                        </button>
                        <div className="absolute w-[25px] h-[25px] bg-[#ff7622] rounded-full flex items-center justify-center shadow-md ring-2 ring-white" style={{ top: '-6px', right: '-6px' }}>
                            <span className="text-white text-[11px] font-bold">{cartCount}</span>
                        </div>
                    </div>
                </div>

                {/* ===== 2. SEARCH INPUT ===== */}
                <div className="px-[18px] mt-[24px]">
                    <div className="bg-[#f6f6f6] rounded-[10px] h-[62px] w-full flex items-center px-5 gap-4 transition-all focus-within:ring-1 focus-within:ring-[#fc6e2a] focus-within:bg-white">
                        {/* Search icon */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                            <circle cx="8.5" cy="8.5" r="6.5" stroke="#a0a5ba" strokeWidth="2"/>
                            <path d="M13.5 13.5L18 18" stroke="#a0a5ba" strokeWidth="2" strokeLinecap="round"/>
                        </svg>

                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Catring amanda"
                            className="flex-1 bg-transparent text-[14px] text-[#676767] placeholder-[#676767] focus:outline-none border-0 ring-0 p-0 leading-[20px]"
                            style={{ outline: 'none', boxShadow: 'none', WebkitAppearance: 'none' }}
                        />

                        {/* Clear button — visible only when text exists */}
                        {searchQuery && (
                            <button
                                onClick={handleClear}
                                className="w-5 h-5 rounded-full bg-[#cdcdcf] flex items-center justify-center hover:bg-gray-400 transition shrink-0"
                            >
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M2 2L8 8M8 2L2 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* ===== 3. KEYWORD TAGS ===== */}
                {keywords.length > 0 && (
                    <div className="px-[18px] mt-[24px]">
                        <h2 className="text-[#32343e] text-[20px] mb-[14px]">Ktegori</h2>
                        <div
                            ref={tagScrollRef}
                            onMouseDown={handleTagMouseDown}
                            onMouseMove={handleTagMouseMove}
                            onMouseUp={handleTagMouseUp}
                            onMouseLeave={handleTagMouseUp}
                            className="flex gap-[15px] overflow-x-auto scrollbar-hide scroll-smooth pb-2 cursor-grab active:cursor-grabbing select-none"
                        >
                            {keywords.map((kw) => (
                                <button
                                    key={kw.id}
                                    onClick={() => handleTagClick(kw.slug)}
                                    className={`shrink-0 h-[46px] rounded-full px-[11px] border-2 transition-all duration-200 text-[16px] ${
                                        activeTag === kw.slug
                                            ? 'bg-[#ffd27c] border-[#ffd27c] text-[#181c2e] font-bold'
                                            : 'bg-transparent border-[#ededed] text-[#181c2e] hover:border-gray-300'
                                    }`}
                                >
                                    {kw.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ===== 4. REKOMENDASI KETRING ===== */}
                {caterings.length > 0 && (
                    <div className="px-[18px] mt-[30px]">
                        <h2 className="text-[#32343e] text-[20px] mb-[20px]">Rekomendasi Ketring</h2>
                        <div className="w-full">
                            {caterings.map((catering, idx) => (
                                <div key={catering.id}>
                                    <button
                                        onClick={() => router.visit(route('catering.show', { slug: catering.slug }))}
                                        className="w-full flex items-center gap-4 text-left"
                                        style={{ height: '64px' }}
                                    >
                                        {/* Logo / profile photo */}
                                        <div className="w-[60px] h-[50px] overflow-hidden shrink-0 bg-[#f6f6f6] flex items-center justify-center rounded-[10px]">
                                            {catering.logo ? (
                                                <img
                                                    src={catering.logo}
                                                    alt={catering.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                                />
                                            ) : null}
                                            <div className={`w-full h-full items-center justify-center ${catering.logo ? 'hidden' : 'flex'}`}>
                                                <span className="text-[#a0a5ba] text-[18px] font-bold">
                                                    {catering.name.charAt(0)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-[#32343e] text-[16px] truncate">{catering.name}</h3>
                                            <div className="flex items-center gap-1 mt-[2px]">
                                                <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                                                    <path d="M10 1L12.47 6.98L19 7.57L14 12.18L15.53 19L10 15.48L4.47 19L6 12.18L1 7.57L7.53 6.98L10 1Z" fill="#ff7622"/>
                                                </svg>
                                                <span className="text-[#181c2e] text-[16px]">{catering.rating}</span>
                                            </div>
                                        </div>
                                    </button>

                                    {/* Divider + gap (14px in Figma) */}
                                    {idx < caterings.length - 1 && (
                                        <div className="mt-[13px]">
                                            <div className="w-full h-[1px] bg-[#ebebeb]" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ===== 5. PAKET TERPOPULER ===== */}
                {menus.length > 0 && (
                    <div className="px-[18px] mt-[32px] pb-8">
                        <h2 className="text-[#181c2e] text-[20px] mb-[24px]">Paket Terpopuler</h2>

                        {/* Menu grid — 2 columns */}
                        {menuRows.length > 0 ? (
                            menuRows.map((row, rowIdx) => (
                                <div key={rowIdx} className={`flex gap-[21px] ${rowIdx > 0 ? 'mt-[28px]' : ''}`}>
                                    {row.filter(Boolean).map((menu) => (
                                        <div
                                            key={menu.id}
                                            onClick={() => router.visit(route('menu.show', { id: menu.id }))}
                                            className="w-[153px] bg-white rounded-[25px] cursor-pointer hover:-translate-y-1 transition-all duration-200"
                                            style={{
                                                boxShadow: '0 12px 30px rgba(150,150,154,0.15)',
                                            }}
                                        >
                                            {/* Image */}
                                            <div className="flex items-center justify-center mx-3 rounded-[15px] overflow-hidden bg-[#ffd27c] relative" style={{ height: '79px', top: '-12px' }}>
                                                <MenuImage menu={menu} />
                                            </div>

                                            {/* Content */}
                                            <div className="px-3 pt-[12px] pb-3">
                                                <h3 className="text-[15px] font-bold text-[#32343e] truncate">
                                                    {menu.name}
                                                </h3>
                                                <p className="text-[13px] text-[#646982] mt-[4px] truncate">
                                                    {menu.catering?.name || ''}
                                                </p>

                                                <div className="flex items-center justify-between mt-[12px]">
                                                    <span className="text-[16px] font-bold text-[#181c2e]">
                                                        Rp {Number(menu.price).toLocaleString('id-ID')}
                                                    </span>
                                                    {/* Plus button */}
                                                    <div className="w-[30px] h-[30px] rounded-full bg-[#f58d1d] flex items-center justify-center shadow-md cursor-pointer hover:bg-[#e07e14] transition">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                            <path d="M7 0V14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                                            <path d="M0 7H14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Rating */}
                                                <div className="flex items-center gap-1 mt-[8px]">
                                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                                        <path d="M10 1L12.47 6.98L19 7.57L14 12.18L15.53 19L10 15.48L4.47 19L6 12.18L1 7.57L7.53 6.98L10 1Z" fill="#ff7622"/>
                                                    </svg>
                                                    <span className="text-[#181c2e] text-[16px]">{menu.catering?.rating || '-'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Empty cell if odd count */}
                                    {row.filter(Boolean).length === 1 && <div className="flex-1" />}
                                </div>
                            ))
                        ) : null}
                    </div>
                )}

                {/* ===== EMPTY STATE ===== */}
                {caterings.length === 0 && menus.length === 0 && (
                    <div className="px-[18px] mt-[60px] text-center">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <circle cx="11" cy="11" r="7" stroke="#9CA3AF" strokeWidth="1.5"/>
                                <path d="M16.5 16.5L21 21" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <p className="text-gray-400 font-semibold text-[16px]">Tidak ada hasil ditemukan</p>
                        <p className="text-gray-300 text-[14px] mt-2">Coba kata kunci atau kategori yang berbeda</p>
                    </div>
                )}
                </div>{/* end inner wrapper */}
            </div>
        </>
    );
}
