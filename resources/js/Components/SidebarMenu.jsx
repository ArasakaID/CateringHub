import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function SidebarMenu({ user, show, onClose }) {
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = () => {
        setLoggingOut(true);
        router.post(route('logout'));
    };

    const BackIcon = () => (
        <svg width="5" height="10" viewBox="0 0 5 10" fill="none">
            <path d="M4 1L1 5L4 9" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const MoreIcon = () => (
        <svg width="16" height="4" viewBox="0 0 16 4" fill="none">
            <circle cx="2" cy="2" r="1.5" stroke="#181c2e" strokeWidth="2" />
            <circle cx="8" cy="2" r="1.5" stroke="#181c2e" strokeWidth="2" />
            <circle cx="14" cy="2" r="1.5" stroke="#181c2e" strokeWidth="2" />
        </svg>
    );

    const ChevronRight = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M11 8L15 12L11 16" stroke="#747783" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const PersonIcon = () => (
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <path d="M1 13V11.6667C1 9.82572 2.49238 8.33333 4.33333 8.33333H7.66667C9.50762 8.33333 11 9.82572 11 11.6667V13" stroke="#fb6f3d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 5.66667C7.47276 5.66667 8.66667 4.47276 8.66667 3C8.66667 1.52724 7.47276 0.333333 6 0.333333C4.52724 0.333333 3.33333 1.52724 3.33333 3C3.33333 4.47276 4.52724 5.66667 6 5.66667Z" stroke="#fb6f3d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const MapIcon = () => (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 12.7273C7 12.7273 12 9.45455 12 5.72727C12 3.93421 10.6569 2.45455 7 2.45455C3.34315 2.45455 2 3.93421 2 5.72727C2 9.45455 7 12.7273 7 12.7273Z" stroke="#413dfb" strokeWidth="1.27" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 5.72729C7.41421 5.72729 7.75 5.3915 7.75 4.97729C7.75 4.56305 7.41421 4.22729 7 4.22729C6.58579 4.22729 6.25 4.56305 6.25 4.97729C6.25 5.3915 6.58579 5.72729 7 5.72729Z" fill="#413dfb" />
        </svg>
    );

    const CartIcon = () => (
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
            <path d="M1 1H3.5L5.5 11H13L15.5 3.5H4" stroke="#369bff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="5.5" cy="15.5" r="1.5" fill="#369bff" />
            <circle cx="12.5" cy="15.5" r="1.5" fill="#369bff" />
        </svg>
    );

    const HeartIcon = () => (
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <path d="M8 13C8 13 1 9.66667 1 4.66667C1 2.82762 2.49238 1.33333 4.33333 1.33333C5.53571 1.33333 6.60238 1.9219 7.25 2.83333C7.89762 1.9219 8.96429 1.33333 10.1667 1.33333C12.0076 1.33333 13.5 2.82762 13.5 4.66667C13.5 9.66667 8 13 8 13Z" stroke="#b33dfb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const ChatIcon = () => (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 7C13 10.3137 10.3137 13 7 13C5.90729 13 4.87143 12.7446 3.9464 12.29C3.63665 12.135 3.44468 12.0575 3.30363 12.0159C3.16769 11.9757 3.10498 11.9648 2.98162 11.9551C2.85256 11.945 2.67745 11.9563 2.4685 11.9758L1.3459 12.0779C1.05517 12.1047 0.909806 12.118 0.809291 12.0479C0.720308 11.9865 0.665178 11.8889 0.659801 11.7832C0.653656 11.6617 0.722914 11.4866 0.861429 11.1364L1.35957 9.88513C1.44553 9.67895 1.48851 9.57586 1.49529 9.46319C1.50119 9.36472 1.48778 9.26903 1.45232 9.17753C1.40694 9.06095 1.32075 8.92701 1.14839 8.65914C0.76525 8.06271 0.55 7.35759 0.55 6.6C0.55 3.38614 3.2697 0.599998 7 0.599998C10.7303 0.599998 13 3.38614 13 6.6V7Z" stroke="#ffaa2a" strokeWidth="1.1"/>
        </svg>
    );

    const CardIcon = () => (
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <rect x="0.5" y="0.5" width="15" height="11" rx="1.5" stroke="#369bff" strokeWidth="1.17" />
            <line x1="0.5" y1="4.5" x2="15.5" y2="4.5" stroke="#369bff" strokeWidth="1.17" />
        </svg>
    );

    const FaqIcon = () => (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="8" stroke="#fb6d3a" strokeWidth="1.68" />
            <circle cx="9" cy="12.5" r="0.5" fill="#fb6d3a" />
            <path d="M9 10.5V9.5C9.82843 9.5 10.5 8.82843 10.5 8C10.5 7.17157 9.82843 6.5 9 6.5C8.17157 6.5 7.5 7.17157 7.5 8" stroke="#fb6d3a" strokeWidth="1.68" strokeLinecap="round" />
        </svg>
    );

    const ChefIcon = () => (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 8.5L7 13L13 8.5" stroke="#2ae1e1" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 5.5L7 10L13 5.5" stroke="#2ae1e1" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 1L1 5.5L7 10L13 5.5L7 1Z" stroke="#2ae1e1" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const GearIcon = () => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" stroke="#413dfb" strokeWidth="1.2" />
            <path d="M8 0.5V2.5" stroke="#413dfb" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M8 13.5V15.5" stroke="#413dfb" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M2.5 8H0.5" stroke="#413dfb" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M15.5 8H13.5" stroke="#413dfb" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    );

    const LogoutIcon = () => (
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M5 14H1.5C0.947715 14 0.5 13.5523 0.5 13V3C0.5 2.44772 0.947715 2 1.5 2H5" stroke="#fb4a59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 11.5L13.5 8L10 4.5" stroke="#fb4a59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.5 8H4.5" stroke="#fb4a59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const MenuItem = ({ icon, label, href, onClick, iconColor }) => (
        <div className="flex items-center justify-between h-10 px-0" style={{ minHeight: '40px' }}>
            {href ? (
                <Link href={href} className="flex items-center flex-1" style={{ gap: '14px' }}>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                        <div style={{ color: iconColor }}>{icon}</div>
                    </div>
                    <span className="text-[#32343e] text-base font-sen">{label}</span>
                </Link>
            ) : (
                <button onClick={onClick} className="flex items-center flex-1 text-left" style={{ gap: '14px' }}>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                        <div style={{ color: iconColor }}>{icon}</div>
                    </div>
                    <span className="text-[#32343e] text-base font-sen">{label}</span>
                </button>
            )}
            <div className="shrink-0">
                <ChevronRight />
            </div>
        </div>
    );

    const avatarUrl = user?.avatar
        ? `/storage/${user.avatar}`
        : null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
                    show ? 'bg-black/50 opacity-100' : 'bg-black/0 opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />

            {/* Sidebar Panel */}
            <div
                className={`absolute top-0 left-0 h-full bg-white z-50 shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out ${
                    show ? 'translate-x-0' : '-translate-x-full'
                }`}
                style={{ width: '375px', maxWidth: '100vw' }}
            >
                {/* Top Bar */}
                <div className="flex items-center px-6 pt-[50px]" style={{ gap: '16px' }}>
                    <button
                        onClick={onClose}
                        className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0"
                    >
                        <BackIcon />
                    </button>
                    <span className="text-[#181c2e] text-[17px] font-sen" style={{ lineHeight: '22px' }}>
                        Profile
                    </span>
                    <div className="ml-auto w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0">
                        <MoreIcon />
                    </div>
                </div>

                {/* Profile Card */}
                <div className="flex items-center mt-[24px] px-6" style={{ gap: '16px' }}>
                    <div className="w-[100px] h-[100px] rounded-full overflow-hidden shrink-0 bg-[#f0f5fa]">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                    <circle cx="30" cy="30" r="28" stroke="#d0d5dd" strokeWidth="1.5" />
                                    <circle cx="30" cy="22" r="8" stroke="#d0d5dd" strokeWidth="1.5" />
                                    <path d="M12 50C12 40 20 34 30 34C40 34 48 40 48 50" stroke="#d0d5dd" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-[#32343e] text-[20px] font-bold font-sen truncate">
                            {user?.name || 'User'}
                        </h2>
                        <p className="text-[#a0a5ba] text-[14px] font-sen mt-[8px] truncate" style={{ lineHeight: '24px' }}>
                            {user?.bio || 'Pecinta menu rumahan'}
                        </p>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="px-6 mt-[24px] space-y-5">
                    {/* Group 1: Informasi & Alamat */}
                    <div className="bg-[#f6f8fa] rounded-[16px] px-5 py-6 flex flex-col gap-y-[18px]">
                        <MenuItem
                            icon={<PersonIcon />}
                            label="Informasi Pribadi"
                            href={route('profile.info')}
                        />
                        <MenuItem
                            icon={<MapIcon />}
                            label="Alamat Pengiriman"
                            href={route('location.index')}
                        />
                    </div>

                    {/* Group 2: Belanja */}
                    <div className="bg-[#f6f8fa] rounded-[16px] px-5 py-6 flex flex-col gap-y-[18px]">
                        <MenuItem
                            icon={<CartIcon />}
                            label="Keranjang Belanja"
                            href={route('checkout')}
                        />
                        <MenuItem
                            icon={<HeartIcon />}
                            label="Menu Favorit"
                            href={route('home')}
                        />
                        <MenuItem
                            icon={<ChatIcon />}
                            label="Messages"
                            href={route('messages.index')}
                        />
                        <MenuItem
                            icon={<CardIcon />}
                            label="Metode Pembayaran"
                            href={route('home')}
                        />
                        <MenuItem
                            icon={<BellIcon />}
                            label="Messages"
                            href={route('messages.index')}
                        />
                    </div>

                    {/* Group 3: Lainnya */}
                    <div className="bg-[#f6f8fa] rounded-[16px] px-5 py-6 flex flex-col gap-y-[18px]">
                        <MenuItem
                            icon={<FaqIcon />}
                            label="Tanya Jawab (FAQ)"
                            href={route('home')}
                        />
                        <MenuItem
                            icon={<ChefIcon />}
                            label="Buka Catering"
                            href={route('register.catering')}
                        />
                        <MenuItem
                            icon={<GearIcon />}
                            label="Pengaturan"
                            href={route('profile.edit')}
                        />
                    </div>

                    {/* Logout */}
                    <div className="bg-[#f6f8fa] rounded-[16px] overflow-hidden mb-6">
                        <button
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="flex items-center justify-between w-full h-20 px-5"
                        >
                            <div className="flex items-center" style={{ gap: '14px' }}>
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                                    <LogoutIcon />
                                </div>
                                <span className="text-[#32343e] text-[15px] font-sen">
                                    {loggingOut ? 'Logging out...' : 'Log Out'}
                                </span>
                            </div>
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
