import { Head, Link, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function Tracking({ order, courier, trackingLogs, eta, isAdvanced }) {
    const [pageLoading, setPageLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [cardHeightPx, setCardHeightPx] = useState(MIN_COLLAPSED_VH);
    const startY = useRef(0);
    const currentHeight = useRef(0);
    const cardHeightRef = useRef(0);
    const contentRef = useRef(null);
    const contentInnerRef = useRef(null);

    const EXPANDED_VH = 65;
    const MIN_COLLAPSED_VH = 22;

    // Measure content height and set initial collapsed size
    useEffect(() => {
        if (contentInnerRef.current) {
            const inner = contentInnerRef.current;
            const padding = 40;
            requestAnimationFrame(() => {
                const contentH = inner.scrollHeight + padding;
                const vh = (contentH / window.innerHeight) * 100;
                const collapsed = Math.max(MIN_COLLAPSED_VH, Math.min(vh, EXPANDED_VH));
                cardHeightRef.current = collapsed;
                currentHeight.current = collapsed;
                setCardHeightPx(collapsed);
            });
        }
    }, [order.status]);

    // Drag handlers (based on vh units for card height)
    const COLLAPSED_VH = cardHeightPx !== null ? Math.min(cardHeightPx, EXPANDED_VH) : MIN_COLLAPSED_VH;

    const handleDragStart = (clientY) => {
        setIsDragging(true);
        startY.current = clientY;
        currentHeight.current = cardHeightRef.current;
    };

    const handleDragMove = (clientY) => {
        if (!isDragging) return;
        const delta = startY.current - clientY;
        const vh = window.innerHeight;
        const deltaVh = (delta / vh) * 100;
        const newVh = Math.max(COLLAPSED_VH, Math.min(EXPANDED_VH, currentHeight.current + deltaVh));
        cardHeightRef.current = newVh;
        setCardHeightPx(newVh);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        const midPoint = (COLLAPSED_VH + EXPANDED_VH) / 2;
        const expanded = cardHeightRef.current > midPoint;
        setIsExpanded(expanded);
        const target = expanded ? EXPANDED_VH : COLLAPSED_VH;
        cardHeightRef.current = target;
        setCardHeightPx(target);
        currentHeight.current = target;
    };

    // Touch events
    const onTouchStart = (e) => handleDragStart(e.touches[0].clientY);
    const onTouchMove = (e) => handleDragMove(e.touches[0].clientY);
    const onTouchEnd = () => handleDragEnd();

    // Mouse events
    const onMouseDown = (e) => { e.preventDefault(); handleDragStart(e.clientY); };

    // Global mouse listener for drag outside element
    useEffect(() => {
        if (!isDragging) return;
        const handleGlobalMouseMove = (e) => handleDragMove(e.clientY);
        const handleGlobalMouseUp = () => handleDragEnd();
        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDragging]);

    // Auto-advance order status with per-step timing
    useEffect(() => {
        if (order.status === 'delivered' || order.status === 'completed' || order.status === 'cancelled') {
            return;
        }

        const delay = ({
            'pending': 3000,
            'confirmed': 3000,
            'preparing': 3000,
            'picked_up': 60000,
            'arriving_soon': 120000,
        })[order.status] || 60000;

        const timer = setTimeout(async () => {
            try {
                await fetch(route('tracking.advance', order.id), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                });
                router.reload({ preserveScroll: true, only: ['order', 'trackingLogs', 'isAdvanced', 'courier'] });
            } catch (e) {
                // Silently fail
            }
        }, delay);
        return () => clearTimeout(timer);
    }, [order.id, order.status]);

    // ===== LOADING SKELETON =====
    if (pageLoading) {
        return (
            <div className="min-h-screen bg-white" style={{ fontFamily: 'Sen, sans-serif' }}>
                <div className="px-6 pt-[50px] flex items-center justify-between">
                    <div className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] animate-pulse" />
                    <div className="w-[100px] h-[22px] rounded bg-[#ecf0f4] animate-pulse" />
                    <div className="w-[45px]" />
                </div>
                <div className="mt-[80px] mx-6 space-y-4">
                    <div className="h-[200px] rounded-[24px] bg-[#ecf0f4] animate-pulse" />
                    <div className="h-[40px] w-[70%] rounded bg-[#ecf0f4] animate-pulse mx-auto" />
                    <div className="h-[20px] w-[50%] rounded bg-[#ecf0f4] animate-pulse mx-auto" />
                    <div className="space-y-3 mt-[30px]">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-[17px] h-[17px] rounded-full bg-[#ecf0f4] animate-pulse" />
                                <div className="h-[16px] w-[200px] rounded bg-[#ecf0f4] animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // ===== ERROR / EMPTY STATE =====
    if (!order || !order.id) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6" style={{ fontFamily: 'Sen, sans-serif' }}>
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="30" stroke="#a0a5ba" strokeWidth="3" fill="none" strokeDasharray="4 4"/>
                    <path d="M40 28V44" stroke="#a0a5ba" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="40" cy="54" r="3" fill="#a0a5ba"/>
                </svg>
                <p className="text-[#a0a5ba] text-[16px] mt-[20px]">Data tracking tidak ditemukan</p>
                <Link
                    href={route('pesanan')}
                    className="mt-[16px] px-[24px] py-[10px] rounded-[10px] text-[14px] font-bold cursor-pointer hover:opacity-80 transition"
                    style={{ backgroundColor: '#ff7622', color: '#ffffff' }}
                >
                    Kembali ke Pesanan
                </Link>
            </div>
        );
    }

    const formatPrice = (price) => {
        return 'Rp ' + Number(price).toLocaleString('id-ID');
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
    };

    const formatTime = (date) => {
        const d = new Date(date);
        const hours = d.getHours().toString().padStart(2, '0');
        const mins = d.getMinutes().toString().padStart(2, '0');
        return `${hours}:${mins}`;
    };

    // Back Arrow icon
    const BackArrow = () => (
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M6 1L1 6L6 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    // Phone icon
    const PhoneIcon = () => (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M15.75 13.125V15.375C15.75 15.775 15.4267 16.125 15.0333 16.17C14.0552 16.2806 13.0679 16.2325 12.1076 16.0277C11.1473 15.8229 10.2269 15.4643 9.3825 14.9625M9.3825 14.9625C7.79378 14.0449 6.42192 12.7988 5.3475 11.3025C4.6395 10.3058 4.10537 9.19268 3.765 8.0175C3.56182 7.2897 3.44745 6.53824 3.4243 5.78065C3.40114 5.02306 3.46943 4.26467 3.62677 3.52509C3.68019 3.26487 3.82932 3.03492 4.04494 2.87523C4.26056 2.71554 4.52885 2.6365 4.80172 2.65275H7.125C7.418 2.65275 7.68172 2.841 7.77825 3.11325L8.646 5.3445C8.70687 5.50965 8.71773 5.68943 8.67722 5.8609C8.63672 6.03238 8.5468 6.18756 8.418 6.306L6.75075 7.872C7.43563 9.2281 8.43765 10.3907 9.66975 11.25L11.379 9.639C11.5125 9.51297 11.6875 9.4375 11.8725 9.426C12.0575 9.4145 12.2405 9.4678 12.3885 9.576L14.7352 10.404C15.0008 10.4955 15.183 10.743 15.183 11.025V13.125C15.183 13.317 15.1072 13.5008 14.9727 13.637C14.8382 13.7732 14.6552 13.85 14.463 13.85" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    // Chat icon
    const ChatIcon = () => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M19 11C19 12.78 18.4722 14.42 17.5556 15.76L19 19L15.78 17.59C14.5 18.36 13 18.84 11.4 18.98C10.17 19.09 9 19 8 18.66C6.35 19.56 4.43 20 2.5 20C2 20 1.5 18.5 2.5 17.5L3 17C0.5 14.5 0 11.5 1 8.5C1 8.5 2 10 4 10.5C3.5 9.5 3 8.5 3 7C3 4.5 5 2 8.5 2C10.5 2 12 2.5 13 3.5C13 3.5 13 3.5 13.5 3.5C15 3.5 16.5 4.5 17.5 5.5C18.5 6.5 19 8 19 11Z" stroke="#ff7622" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    // Checkmark icon
    const CheckIcon = ({ color = 'white' }) => (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    // Loader/Spinner icon
    const LoaderIcon = () => (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" stroke="white" strokeWidth="1.5" strokeDasharray="2 2"/>
        </svg>
    );

    // Double check icon
    const DoubleCheckIcon = ({ color = '#a0a5ba' }) => (
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M1 5L3.5 7.5L8 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 5L8.5 7.5L13 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    // Pin icon
    const PinIcon = () => (
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M8 0C3.86 0 0 3.5 0 8C0 13 7 19 8 19C9 19 16 13 16 8C16 3.5 12.14 0 8 0ZM8 10.5C6.62 10.5 5.5 9.38 5.5 8C5.5 6.62 6.62 5.5 8 5.5C9.38 5.5 10.5 6.62 10.5 8C10.5 9.38 9.38 10.5 8 10.5Z" fill="white"/>
        </svg>
    );

    // Courier photo fallback
    const courierPhoto = courier?.photo || null;

    // Restaurant image fallback
    const restaurantImage = order.catering?.image || null;

    // Steps configuration — always show in fixed order, mark completed via logs
    const FLOW = [
        { status: 'confirmed', label: 'Your order has been received' },
        { status: 'preparing', label: 'The restaurant is preparing your food' },
        { status: 'picked_up', label: 'Your order has been picked up for delivery' },
        { status: 'arriving_soon', label: 'Order arriving soon!' },
        { status: 'delivered', label: 'Order delivered' },
    ];

    const currentStepIdx = FLOW.findIndex(f => f.status === order.status);

    const steps = FLOW.map((s, i) => ({
        label: s.label,
        status: s.status,
        isCompleted: i < currentStepIdx || (i === currentStepIdx && order.status === 'delivered'),
        isActive: i === currentStepIdx && order.status !== 'delivered',
    }));

    return (
        <>
            <Head title="Track Order - CateringHub" />

            <div className="min-h-screen bg-white relative" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* ===== MAP BACKGROUND ===== */}
                <div className="absolute inset-0 z-0" style={{ backgroundColor: '#d0d9e1' }}>
                    {/* Minimal map background — clean flat placeholder */}
                    <svg width="100%" height="100%" viewBox="0 0 375 812" preserveAspectRatio="none">
                        <rect width="375" height="812" fill="#d0d9e1" />
                    </svg>

                    {/* Route line — gradient stroke */}
                    <svg width="375" height="812" viewBox="0 0 375 812" className="absolute top-0 left-0 pointer-events-none">
                        <defs>
                            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffa800"/>
                                <stop offset="100%" stopColor="#f45e3d"/>
                            </linearGradient>
                        </defs>
                        <path
                            d="M40 230 L 65 190 L 125 180 L 200 145 L 255 100 L 305 75"
                            stroke="url(#routeGradient)"
                            strokeWidth="7"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    {/* Destination pin (customer's home) — upper-right */}
                    <div className="absolute" style={{ top: '58px', left: '300px' }}>
                        {isAdvanced ? (
                            <>
                                {/* Outer ring */}
                                <div className="absolute rounded-full" style={{
                                    width: '84px', height: '84px',
                                    backgroundColor: 'rgba(255, 194, 36, 0.1)',
                                    left: '-33px', top: '-33px',
                                }} />
                                {/* Middle ring */}
                                <div className="absolute rounded-full" style={{
                                    width: '62px', height: '62px',
                                    backgroundColor: 'rgba(255, 194, 36, 0.6)',
                                    left: '-22px', top: '-22px',
                                }} />
                                {/* Inner circle */}
                                <div className="w-[17px] h-[17px] rounded-full border-4 relative z-10"
                                    style={{ borderColor: '#ffb800', backgroundColor: 'white' }}
                                />
                            </>
                        ) : (
                            <div className="w-[17px] h-[17px] rounded-full border-4"
                                style={{ borderColor: '#ffb800', backgroundColor: 'white' }}
                            />
                        )}
                    </div>

                    {/* Origin pin (restaurant) — lower-left */}
                    <div className="absolute flex items-center justify-center" style={{
                        width: '62px', height: '62px',
                        backgroundColor: '#f14237',
                        borderRadius: '50%',
                        top: '210px', left: '15px',
                    }}>
                        <PinIcon />
                    </div>
                </div>

                {/* ===== TOP BAR (absolute over map) ===== */}
                <div className="relative z-20 px-6 pt-[50px] flex items-center justify-between">
                    <Link
                        href={route('pesanan')}
                        className="w-[56px] h-[56px] rounded-full bg-[#212029] flex items-center justify-center shrink-0 cursor-pointer hover:opacity-80 transition"
                    >
                        <BackArrow />
                    </Link>

                    <span className="text-[#181c2e] text-[26px]" style={{ lineHeight: '32px', fontWeight: 400 }}>
                        Track Order
                    </span>

                    {/* Spacer to balance layout */}
                    <div className="w-[56px]" />
                </div>

                {/* ===== BOTTOM CARD (Draggable) ===== */}
                <div
                    className="fixed bottom-0 left-1/2 z-20 w-full max-w-md"
                    style={{
                        transform: 'translateX(-50%)',
                    }}
                >
                    <div
                        ref={contentRef}
                        className="bg-white rounded-t-[24px] shadow-lg relative overflow-hidden"
                        style={{
                            boxShadow: '0 -2px 40px rgba(58, 119, 153, 0.15)',
                            height: cardHeightPx !== null ? `${cardHeightPx}vh` : 'auto',
                            maxHeight: cardHeightPx !== null ? `${cardHeightPx}vh` : 'auto',
                            transition: isDragging ? 'none' : 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1), max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Drag Handle — only this area triggers drag */}
                        <div
                            className="flex justify-center pt-[8px] pb-[2px] cursor-grab active:cursor-grabbing"
                            style={{ touchAction: 'none' }}
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                            onMouseDown={onMouseDown}
                        >
                            <div className="w-[70px] h-[7px] rounded-[80px]"
                                style={{ backgroundColor: '#d8e3ed' }}
                            />
                        </div>

                        <div ref={contentInnerRef} className="px-[24px] pb-[20px] overflow-y-auto styled-scrollbar"
                            style={{
                                height: cardHeightPx !== null ? `calc(${cardHeightPx}vh - 30px)` : 'auto',
                                WebkitOverflowScrolling: 'touch',
                            }}
                        >
                            {/* ===== RESTAURANT INFO ===== */}
                            <div className="flex items-start gap-[14px] mt-[4px]">
                                {/* Restaurant image */}
                                <div className="w-[63px] h-[63px] rounded-[10px] shrink-0 overflow-hidden"
                                    style={{ backgroundColor: '#c4c4c4' }}
                                >
                                    {restaurantImage ? (
                                        <img src={restaurantImage} alt={order.catering?.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <rect x="3" y="3" width="18" height="18" rx="3" stroke="white" strokeWidth="2"/>
                                                <path d="M9 12L11 14L15 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-[18px] truncate" style={{ color: '#181c2e', fontWeight: 600 }}>
                                        {order.catering?.name || 'Restaurant'}
                                    </p>
                                    <p className="text-[14px] mt-[2px]" style={{ color: '#a0a5ba' }}>
                                        Ordered at {formatDate(order.created_at)}
                                    </p>
                                    <div className="flex flex-wrap gap-x-[12px] mt-[2px]">
                                        {order.items?.slice(0, 3).map((item) => (
                                            <span key={item.id} className="text-[13px]" style={{ color: '#646982' }}>
                                                {item.quantity}x {item.menu_name}
                                            </span>
                                        ))}
                                        {order.items?.length > 3 && (
                                            <span className="text-[13px]" style={{ color: '#646982' }}>
                                                +{order.items.length - 3} other items
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* ===== ETA SECTION ===== */}
                            <div className="mt-[14px] text-center">
                                <p className="text-[26px] font-extrabold" style={{ color: '#181c2e' }}>
                                    {eta}
                                </p>
                                <p className="text-[13px] mt-[1px]" style={{ color: '#a0a5ba' }}>
                                    Estimated delivery time
                                </p>
                            </div>

                            {/* ===== TIMELINE ===== */}
                            <div className="mt-[12px]">
                                {steps.map((step, index) => (
                                    <div key={index} className="flex items-start gap-[12px]">
                                        {/* Timeline circle + line */}
                                        <div className="flex flex-col items-center">
                                            <div
                                                className="w-[17px] h-[17px] rounded-full flex items-center justify-center shrink-0"
                                                style={{
                                                    backgroundColor: step.isCompleted || step.isActive ? '#ff7622' : '#bfbcba',
                                                }}
                                            >
                                                {step.isCompleted ? (
                                                    <CheckIcon color="white" />
                                                ) : step.isActive ? (
                                                    <LoaderIcon />
                                                ) : null}
                                            </div>

                                            {/* Connecting line */}
                                            {index < steps.length - 1 && (
                                                <div className="w-[1px] h-[16px] mt-[2px]"
                                                    style={{
                                                        backgroundColor: step.isCompleted ? '#ff7622' : '#a0a5ba',
                                                    }}
                                                />
                                            )}
                                        </div>

                                        {/* Step label */}
                                        <div className="flex-1 pb-[8px]">
                                            <p className="text-[13px]" style={{
                                                color: step.isActive ? '#ff7622' : '#a0a5ba',
                                                fontWeight: step.isActive ? 700 : 400,
                                            }}>
                                                {step.label}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ===== COURIER CONTACT ===== */}
                            {courier && (
                                <div className="mt-[16px] pt-[12px]" style={{ borderTop: '1px solid #eef2f6' }}>
                                    <div className="flex items-center gap-[12px]">
                                        {/* Courier photo */}
                                        <div className="w-[54px] h-[54px] rounded-full shrink-0 overflow-hidden"
                                            style={{ backgroundColor: '#c4c4c4' }}
                                        >
                                            {courierPhoto ? (
                                                <img src={courierPhoto} alt={courier.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/>
                                                        <path d="M4 20C4 17 8 15 12 15C16 15 20 17 20 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Name + role */}
                                        <div className="flex-1">
                                            <p className="text-[18px] font-bold" style={{ color: '#181c2e' }}>
                                                {courier.name}
                                            </p>
                                            <p className="text-[13px]" style={{ color: '#a0a5ba', lineHeight: '20px' }}>
                                                Courier
                                            </p>
                                        </div>

                                        {/* Call icon */}
                                        <Link
                                            href={route('tracking.call', order.id)}
                                            className="relative w-[45px] h-[45px] rounded-full flex items-center justify-center shrink-0 cursor-pointer hover:opacity-80 transition"
                                            style={{ backgroundColor: '#ff7622' }}
                                        >
                                            {/* Glow effect */}
                                            <div className="absolute rounded-full"
                                                style={{
                                                    width: '39px', height: '26px',
                                                    backgroundColor: 'rgba(255, 118, 34, 0.6)',
                                                    filter: 'blur(8px)',
                                                    top: '50%', left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                }}
                                            />
                                            <span className="relative z-10"><PhoneIcon /></span>
                                        </Link>

                                        {/* Chat icon */}
                                        <Link
                                            href={route('tracking.chat', order.id)}
                                            className="w-[45px] h-[45px] rounded-full flex items-center justify-center shrink-0 cursor-pointer hover:opacity-80 transition"
                                            style={{
                                                backgroundColor: 'white',
                                                border: '1px solid #ff7622',
                                            }}
                                        >
                                            <ChatIcon />
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* ===== EMPTY COURIER STATE ===== */}
                            {!courier && (
                                <div className="mt-[24px] pt-[16px] text-center" style={{ borderTop: '1px solid #eef2f6' }}>
                                    <p className="text-[14px]" style={{ color: '#a0a5ba' }}>
                                        Menghubungkan kurir...
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
