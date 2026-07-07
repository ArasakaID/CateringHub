import { Link, Head } from '@inertiajs/react';

const BackIcon = () => (
    <svg width="5" height="10" viewBox="0 0 5 10" fill="none">
        <path d="M4 1L1 5L4 9" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PersonIcon = () => (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
        <path d="M1 13V11.6667C1 9.82572 2.49238 8.33333 4.33333 8.33333H7.66667C9.50762 8.33333 11 9.82572 11 11.6667V13" stroke="#fb6f3d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 5.66667C7.47276 5.66667 8.66667 4.47276 8.66667 3C8.66667 1.52724 7.47276 0.333333 6 0.333333C4.52724 0.333333 3.33333 1.52724 3.33333 3C3.33333 4.47276 4.52724 5.66667 6 5.66667Z" stroke="#fb6f3d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const EmailIcon = () => (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
        <rect x="0.5" y="0.5" width="17" height="13" rx="1.5" stroke="#413dfb" strokeWidth="1.17" />
        <path d="M1 1L9 8L17 1" stroke="#413dfb" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CallIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M14.5 11.5V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5C7.97715 14.5 3.5 10.0228 3.5 4.5C3.5 3.94772 3.94772 3.5 4.5 3.5H6.5C6.77614 3.5 7 3.72386 7 4C7 4.74024 7.10524 5.45885 7.30515 6.13747C7.3851 6.40302 7.2838 6.68778 7.05 6.85L5.95 7.6C6.73573 9.16163 8.03837 10.4643 9.6 11.25L10.35 10.15C10.5122 9.9162 10.797 9.8149 11.0625 9.89485C11.7412 10.0948 12.4598 10.2 13.2 10.2C13.4761 10.2 13.7 10.4239 13.7 10.7V12.5H14.5Z" stroke="#369bff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const MapIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 12.7273C7 12.7273 12 9.45455 12 5.72727C12 3.93421 10.6569 2.45455 7 2.45455C3.34315 2.45455 2 3.93421 2 5.72727C2 9.45455 7 12.7273 7 12.7273Z" stroke="#413dfb" strokeWidth="1.27" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 5.72729C7.41421 5.72729 7.75 5.3915 7.75 4.97729C7.75 4.56305 7.41421 4.22729 7 4.22729C6.58579 4.22729 6.25 4.56305 6.25 4.97729C6.25 5.3915 6.58579 5.72729 7 5.72729Z" fill="#413dfb" />
    </svg>
);

export default function InformasiPribadi({ auth, user }) {
    const avatarUrl = user?.avatar
        ? `/storage/${user.avatar}`
        : null;

    const InfoRow = ({ icon, label, value }) => (
        <div className="flex items-center py-0" style={{ minHeight: '40px' }}>
            <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                    {icon}
                </div>
                <div>
                    <p className="text-[#32343e] text-[14px] font-sen">{label}</p>
                    <p className="text-[#6b6e82] text-[14px] font-sen">{value || '-'}</p>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Head title="Informasi Pribadi" />

            <div className="min-h-screen bg-white" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* Top Bar */}
                <div className="flex items-center px-6 pt-[50px]" style={{ gap: '16px' }}>
                    <Link
                        href={route('home')}
                        className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0"
                    >
                        <BackIcon />
                    </Link>
                    <span className="text-[#181c2e] text-[17px] font-sen" style={{ lineHeight: '22px' }}>
                        Informasi Pribadi
                    </span>
                    <Link
                        href={route('profile.edit-profile')}
                        className="ml-auto text-[#ff7622] text-[14px] font-sen underline"
                        style={{ lineHeight: '24px' }}
                    >
                        EDIT
                    </Link>
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

                {/* Info Card */}
                <div className="mx-6 mt-[24px] bg-[#f6f8fa] rounded-[16px] px-5 py-6 space-y-5">
                    <InfoRow
                        icon={<PersonIcon />}
                        label="nama"
                        value={user?.name}
                    />
                    <InfoRow
                        icon={<EmailIcon />}
                        label="Email"
                        value={user?.email}
                    />
                    <InfoRow
                        icon={<CallIcon />}
                        label="NOmor telepon"
                        value={user?.phone}
                    />
                    <InfoRow
                        icon={<MapIcon />}
                        label="alamat saat ini"
                        value={user?.address}
                    />
                </div>
            </div>
        </>
    );
}
