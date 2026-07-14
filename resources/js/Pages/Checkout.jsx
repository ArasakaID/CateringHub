import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo, useCallback, useRef, useEffect } from 'react';

export default function Checkout({ items, total, catering, userAddress, userPhone, userAddresses, activeAddress }) {
    const [cartItems, setCartItems] = useState(items);
    const [showJadwal, setShowJadwal] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [editingAddress, setEditingAddress] = useState(false);
    const [address, setAddress] = useState(userAddress || '');
    const [phone, setPhone] = useState(userPhone || '');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [notes, setNotes] = useState('');
    const [placing, setPlacing] = useState(false);
    const [dragY, setDragY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [popupExpanded, setPopupExpanded] = useState(false);
    const [showSlideUp, setShowSlideUp] = useState(true);
    const popupRef = useRef(null);
    const dragState = useRef({ startY: 0, currentY: 0 });

    // Lock body scroll when popup is open
    useEffect(() => {
        if (showPopup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showPopup]);

    const deliveryFee = 0;
    const subtotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [cartItems]);
    const totalWithFee = subtotal + deliveryFee;

    const DRAG_THRESHOLD = 120;

    const handleCheckToggle = (itemId) => {
        setCartItems(prev => prev.map(item =>
            item.id === itemId
                ? { ...item, checked: !(item.checked ?? true) }
                : item
        ));
        fetch(route('cart.toggle'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ item_id: itemId }),
        }).catch(() => {});
    };

    const handleQtyChange = (itemId, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id !== itemId) return item;
            const newQty = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQty };
        }));
        const newQty = Math.max(1, (cartItems.find(i => i.id === itemId)?.quantity ?? 1) + delta);
        fetch(route('cart.update'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ item_id: itemId, quantity: newQty }),
        }).catch(() => {});
    };

    const handleTouchStart = useCallback((e) => {
        const y = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        dragState.current = { startY: y, currentY: 0 };
        setDragY(0);
        setIsDragging(true);
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!isDragging) return;
        const y = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        const delta = y - dragState.current.startY;
        const newY = delta < 0 ? Math.max(delta, -80) : delta;
        dragState.current.currentY = newY;
        setDragY(newY);
    }, [isDragging]);

    const closePopup = useCallback(() => {
        setShowPopup(false);
        setPopupExpanded(false);
        setShowBreakdown(false);
    }, []);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
        const finalY = dragState.current.currentY;

        if (finalY > DRAG_THRESHOLD) {
            closePopup();
        } else if (finalY < -50) {
            setPopupExpanded(true);
        }
        setDragY(0);
        dragState.current = { startY: 0, currentY: 0 };
    }, []);

    const handlePlaceOrder = () => {
        if (placing) return;
        if (!address.trim()) {
            setEditingAddress(true);
            return;
        }
        setPlacing(true);

        router.post(route('checkout.place'), {
            delivery_address: address,
            phone: phone,
            delivery_date: deliveryDate,
            delivery_time: deliveryTime,
            notes: notes,
        }, {
            onFinish: () => setPlacing(false),
        });
    };

    const formatOption = (opts) => {
        if (!opts || opts.length === 0) return '';
        return opts.map(o => `${o.toUpperCase()} (1x)`).join(', ');
    };

    const today = new Date().toISOString().split('T')[0];

    const infoContent = (
        <>
            {/* Total + Alamat row — side by side */}
            <div className="flex items-center justify-between mb-[4px]">
                <div className="flex items-center gap-2">
                    <span className="text-[14px]" style={{ color: showPopup ? '#121223' : '#ffffff' }}>
                        Total:
                    </span>
                    <span
                        className="text-[24px] font-bold"
                        style={{ color: showPopup ? '#181c2e' : '#ffffff' }}
                    >
                        Rp {totalWithFee.toLocaleString('id-ID')}
                    </span>
                </div>
            </div>

            <p className="text-[#a0a5ba] text-[10px] mb-[4px]">
                *harga sudah termasuk pajak
            </p>

            {(showBreakdown || showPopup) && (
                <div className="bg-[#f8f9fb] rounded-[12px] p-4 mb-[4px] space-y-2">
                    <div className="flex justify-between text-[14px]">
                        <span className="text-[#a0a5ba]">Subtotal</span>
                        <span className="text-[#181c2e]">Rp {subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                        <span className="text-[#a0a5ba]">Ongkos Kirim</span>
                        <span className="text-[#181c2e]">Rp {deliveryFee.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                        <span className="text-[#a0a5ba]">Pajak (PPN)</span>
                        <span className="text-[#181c2e]">Termasuk</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between text-[16px] font-bold">
                        <span className="text-[#121223]">Total</span>
                        <span className="text-[#181c2e]">Rp {totalWithFee.toLocaleString('id-ID')}</span>
                    </div>
                </div>
            )}
        </>
    );

    return (
        <>
            <Head title="Keranjang Belanja - CateringHub" />

            <div className="min-h-screen bg-[#131927] mx-auto relative max-w-md" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* ===== TOP BAR ===== */}
                <div className="px-6 pt-[50px] flex items-center justify-between">
                    <button
                        onClick={() => window.history.back()}
                        className="w-[45px] h-[45px] rounded-full flex items-center justify-center shrink-0 cursor-pointer hover:opacity-80 transition"
                        style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: 'none' }}
                    >
                        <svg width="6" height="11" viewBox="0 0 6 11" fill="none">
                            <path d="M5 1L1 5.5L5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <span className="text-white text-[17px] leading-[22px]">
                        Keranjang Belanja
                    </span>

                    <Link
                        href={route('menu.show', { id: items[0]?.menu_id || 1 })}
                        className="text-[#ff7622] text-[14px] underline cursor-pointer hover:opacity-80 transition shrink-0"
                    >
                        EDIT Items
                    </Link>
                </div>

                {/* ===== CATERING HEADER ===== */}
                {catering?.name && (
                    <div className="px-6 mt-[24px]">
                        <div className="flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M3 3H21V21H3V3Z" stroke="#ff7622" strokeWidth="1.5"/>
                                <path d="M9 12C10.66 12 12 10.66 12 9C12 7.34 10.66 6 9 6C7.34 6 6 7.34 6 9C6 10.66 7.34 12 9 12Z" stroke="#ff7622" strokeWidth="1.5"/>
                                <path d="M21 15L16 10L5 21" stroke="#ff7622" strokeWidth="1.5"/>
                            </svg>
                            <span className="text-white text-[14px] font-bold">{catering.name}</span>
                        </div>
                    </div>
                )}

                {/* ===== FOOD ITEMS LIST ===== */}
                <div className="px-6 mt-[36px] space-y-[37px] pb-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-5"
                            style={{ height: '117px' }}
                        >
                            {/* Image */}
                            <div
                                className="w-[136px] h-full rounded-[25px] overflow-hidden shrink-0 bg-[#ffd27c]"
                                style={{ boxShadow: '12px 12px 30px rgba(248,130,34,0.15)' }}
                            >
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" opacity="0.4">
                                            <path d="M3 3H21V21H3V3Z" stroke="#181c2e" strokeWidth="1.5"/>
                                            <path d="M9 12C10.66 12 12 10.66 12 9C12 7.34 10.66 6 9 6C7.34 6 6 7.34 6 9C6 10.66 7.34 12 9 12Z" stroke="#181c2e" strokeWidth="1.5"/>
                                            <path d="M21 15L16 10L5 21" stroke="#181c2e" strokeWidth="1.5"/>
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                                <div>
                                    <h3 className="text-white text-[18px] truncate">{item.name}</h3>
                                    {item.options && item.options.length > 0 && (
                                        <p className="text-white text-[12px] mt-[2px]" style={{ opacity: 0.5 }}>
                                            {formatOption(item.options)}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-white text-[20px] font-bold">
                                        Rp {Number(item.price).toLocaleString('id-ID')}
                                    </span>

                                    {/* Qty selector */}
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleQtyChange(item.id, -1)}
                                            disabled={item.quantity <= 1}
                                            className="w-[24px] h-[24px] rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
                                                <path d="M0 1H8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                        </button>
                                        <span className="text-white text-[16px] font-bold min-w-[28px] text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQtyChange(item.id, 1)}
                                            className="w-[24px] h-[24px] rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition"
                                        >
                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                <path d="M4 0V8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M0 4H8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Check icon */}
                            <div className="flex items-start pt-2 shrink-0">
                                <div
                                    className="w-[27px] h-[27px] rounded-full flex items-center justify-center cursor-pointer transition"
                                    style={{ backgroundColor: (item.checked ?? true) ? '#059c6a' : '#999999' }}
                                    onClick={() => handleCheckToggle(item.id)}
                                >
                                    {(item.checked ?? true) && (
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M3 7L5.5 9.5L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ===== SPACER ===== */}
                <div className="h-[280px]" />

                {/* ===== BASE STATE: INFO + KONFIRMASI BUTTON (WHITE TEXT ON DARK BG) ===== */}
                {!showPopup && (
                    <div
                        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-10 max-w-md"
                        style={{ backgroundColor: '#131927' }}
                    >
                        <div className="px-6 pb-[36px] pt-[16px]">
                            {infoContent}

                            {/* KONFIRMASI button — langsung di atas background gelap (tanpa white card) */}
                            <button
                                onClick={() => { setShowPopup(true); setShowSlideUp(true); }}
                                className="w-full h-[67px] bg-[#ff7622] rounded-[12px] flex items-center justify-center cursor-pointer hover:bg-[#e5681a] transition active:scale-[0.98]"
                                style={{ boxShadow: '0 8px 20px rgba(255,118,34,0.3)' }}
                            >
                                <span className="text-white text-[14px] font-bold uppercase tracking-wide">
                                    KONFIRMASI
                                </span>
                            </button>
                        </div>
                    </div>
                )}

                {/* ===== POPUP STATE: WHITE CARD DENGAN ALAMAT, TOTAL, PLACE ORDER ===== */}
                {showPopup && (
                    <div className="fixed inset-0 z-20 flex items-end justify-center"
                         style={{ margin: '0 auto', left: 0, right: 0 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={closePopup}
                        />

                        {/* Popup card — white, rounded-t-[24px], draggable */}
                        <div
                            ref={popupRef}
                            className="relative bg-white w-full max-w-md rounded-t-[24px] overflow-y-auto styled-scrollbar"
                            style={{
                                maxHeight: '85vh',
                                transform: `translateY(${Math.max(0, dragY)}px)`,
                                transition: isDragging ? 'none' : 'transform 0.3s ease-out, max-height 0.3s ease-out',
                                animation: showSlideUp && dragY === 0 ? 'slideUp 0.3s ease-out' : 'none',
                                touchAction: 'none',
                            }}
                            onAnimationEnd={() => setShowSlideUp(false)}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onMouseMove={handleTouchMove}
                            onMouseUp={handleTouchEnd}
                            onMouseLeave={handleTouchEnd}
                        >
                            {/* Drag Handle — sticky at top */}
                            <div className="sticky top-0 z-10 bg-white"
                                onTouchStart={handleTouchStart}
                                onMouseDown={handleTouchStart}
                            >
                                <div className="flex justify-center pt-[14px] pb-[12px] cursor-grab active:cursor-grabbing">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 8H21" stroke="#131927" strokeWidth="1.5" strokeLinecap="round"/>
                                        <path d="M3 12H21" stroke="#131927" strokeWidth="1.5" strokeLinecap="round"/>
                                        <path d="M3 16H21" stroke="#131927" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </div>
                            </div>

                            {/* Content area with padding */}
                            <div className="px-6 pb-[32px]">

                            {/* ALAMAT PENGIRIMAN */}
                            <div className="flex items-center justify-between mb-[12px]">
                                <span className="text-[#a0a5ba] text-[14px]">ALAMAT PENGIRIMAN</span>
                                <button
                                    onClick={() => setEditingAddress(!editingAddress)}
                                    className="text-[#ff7622] text-[14px] underline cursor-pointer hover:opacity-80 transition"
                                >
                                    {editingAddress ? 'SIMPAN' : 'UBAH'}
                                </button>
                            </div>

                            {/* Address field */}
                            {editingAddress ? (
                                <div className="space-y-3 mb-[20px]">
                                    {/* Saved addresses selector */}
                                    {userAddresses && userAddresses.length > 0 && (
                                        <div className="space-y-2 mb-3">
                                            <label className="text-[#a0a5ba] text-[12px]">Alamat tersimpan</label>
                                            {userAddresses.map((addr) => (
                                                <button
                                                    key={addr.id}
                                                    onClick={() => {
                                                        setAddress(addr.address + (addr.detail ? ', ' + addr.detail : ''));
                                                        setEditingAddress(false);
                                                    }}
                                                    className={`w-full text-left p-3 rounded-[10px] transition ${
                                                        address.includes(addr.address) ? 'bg-orange-50 border border-[#ff7622]' : 'bg-[#f0f5fa]'
                                                    }`}
                                                >
                                                    <span className="font-semibold text-[#32343e] text-[14px]">{addr.label}</span>
                                                    <p className="text-[#6b6e82] text-[12px] truncate">
                                                        {addr.address}{addr.detail ? ', ' + addr.detail : ''}
                                                    </p>
                                                </button>
                                            ))}
                                            <div className="text-center pt-1">
                                                <button
                                                    onClick={() => router.get(route('location.index'))}
                                                    className="text-[#ff7622] text-[12px] font-semibold hover:underline"
                                                >
                                                    + Kelola alamat
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Masukkan alamat pengiriman"
                                        className="w-full h-[50px] bg-[#f0f5fa] rounded-[10px] px-4 text-[#32343e] text-[16px] focus:outline-none focus:ring-1 focus:ring-[#ff7622]"
                                    />
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Nomor telepon"
                                        className="w-full h-[50px] bg-[#f0f5fa] rounded-[10px] px-4 text-[#32343e] text-[16px] focus:outline-none focus:ring-1 focus:ring-[#ff7622]"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-[67px] bg-[#f0f5fa] rounded-[10px] px-4 flex items-center mb-[20px]">
                                    <span className="text-[#32343e] text-[16px]" style={{ opacity: 0.5 }}>
                                        {address || 'Condong Catur, Sleman Regency'}
                                    </span>
                                </div>
                            )}

                            {/* Jadwal Pengiriman */}
                            {showJadwal && (
                                <div className="mb-[16px]">
                                    <span className="text-[#a0a5ba] text-[14px] block mb-[8px]">JADWAL PENGIRIMAN</span>
                                    <div className="flex gap-3">
                                        <input
                                            type="date"
                                            value={deliveryDate}
                                            onChange={(e) => setDeliveryDate(e.target.value)}
                                            min={today}
                                            className="flex-1 h-[50px] bg-[#f0f5fa] rounded-[10px] px-4 text-[#32343e] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#ff7622]"
                                        />
                                        <select
                                            value={deliveryTime}
                                            onChange={(e) => setDeliveryTime(e.target.value)}
                                            className="flex-1 h-[50px] bg-[#f0f5fa] rounded-[10px] px-4 text-[#32343e] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#ff7622]"
                                        >
                                            <option value="">Pilih waktu</option>
                                            <option value="08:00-10:00">08:00 - 10:00</option>
                                            <option value="10:00-12:00">10:00 - 12:00</option>
                                            <option value="12:00-14:00">12:00 - 14:00</option>
                                            <option value="14:00-16:00">14:00 - 16:00</option>
                                            <option value="16:00-18:00">16:00 - 18:00</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Info (Total, breakdown, etc.) inside popup — dark text on white bg */}
                            {infoContent}

                            {/* Place ORder button */}
                            <button
                                onClick={handlePlaceOrder}
                                disabled={placing}
                                className="w-full h-[67px] bg-[#ff7622] rounded-[12px] flex items-center justify-center cursor-pointer hover:bg-[#e5681a] transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <span className="text-white text-[14px] font-bold uppercase tracking-wide">
                                    {placing ? 'Memproses...' : 'Place ORder'}
                                </span>
                            </button>
                            </div>
                        </div>

                        <style>{`
                            @keyframes slideUp {
                                from { transform: translateY(100%); }
                                to { transform: translateY(0); }
                            }
                        `}</style>
                    </div>
                )}
            </div>
        </>
    );
}
