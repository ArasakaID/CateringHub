import { Link, Head, useForm } from '@inertiajs/react';
import { useRef } from 'react';

const BackIcon = () => (
    <svg width="5" height="10" viewBox="0 0 5 10" fill="none">
        <path d="M4 1L1 5L4 9" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PencilIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M11.5 1.5L14.5 4.5L5.5 13.5L2 14L2.5 10.5L11.5 1.5Z" stroke="white" strokeWidth="1.31" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 3L13 7" stroke="white" strokeWidth="1.31" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function EditProfile({ auth, user }) {
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.bio || '',
        avatar: null,
    });

    const avatarUrl = data.avatar
        ? URL.createObjectURL(data.avatar)
        : user?.avatar
            ? `/storage/${user.avatar}`
            : null;

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setData('avatar', e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('profile.update-info'), {
            preserveScroll: true,
            onSuccess: () => {
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    return (
        <>
            <Head title="Edit Profile" />

            <div className="min-h-screen bg-white" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* Top Bar */}
                <div className="flex items-center px-6 pt-[50px]" style={{ gap: '16px' }}>
                    <Link
                        href={route('profile.info')}
                        className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0"
                    >
                        <BackIcon />
                    </Link>
                    <span className="text-[#181c2e] text-[17px] font-sen" style={{ lineHeight: '22px' }}>
                        Edit Profile
                    </span>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Profile Photo */}
                    <div className="flex justify-center mt-[24px]">
                        <div className="relative" style={{ width: '130px', height: '130px' }}>
                            <div className="w-[130px] h-[130px] rounded-full overflow-hidden bg-[#f0f5fa]">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg width="78" height="78" viewBox="0 0 60 60" fill="none">
                                            <circle cx="30" cy="30" r="28" stroke="#d0d5dd" strokeWidth="1.5" />
                                            <circle cx="30" cy="22" r="8" stroke="#d0d5dd" strokeWidth="1.5" />
                                            <path d="M12 50C12 40 20 34 30 34C40 34 48 40 48 50" stroke="#d0d5dd" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={handleAvatarClick}
                                className="absolute bottom-0 right-0 w-[41px] h-[41px] rounded-full bg-[#ff7622] flex items-center justify-center shadow-md hover:bg-[#e5651a] transition-colors"
                            >
                                <PencilIcon />
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="px-6 mt-[32px] space-y-5">
                        {/* Nama Lengkap */}
                        <div>
                            <label className="text-[#32343e] text-[14px] font-sen block mb-[8px]">
                                nama lengkap
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full h-[56px] bg-[#f0f5fa] rounded-[10px] px-5 text-[#6b6e82] text-[14px] font-sen outline-none border-0 focus:ring-2 focus:ring-[#ff7622]/30 hover:bg-[#e8edf2] transition-colors duration-150"
                                placeholder="Nama lengkap"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1 font-sen">{errors.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-[#32343e] text-[14px] font-sen block mb-[8px]">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full h-[56px] bg-[#f0f5fa] rounded-[10px] px-5 text-[#6b6e82] text-[14px] font-sen outline-none border-0 focus:ring-2 focus:ring-[#ff7622]/30 hover:bg-[#e8edf2] transition-colors duration-150"
                                placeholder="Email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1 font-sen">{errors.email}</p>
                            )}
                        </div>

                        {/* Nomor Telepon */}
                        <div>
                            <label className="text-[#32343e] text-[14px] font-sen block mb-[8px]">
                                Nomor telepon
                            </label>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full h-[56px] bg-[#f0f5fa] rounded-[10px] px-5 text-[#6b6e82] text-[14px] font-sen outline-none border-0 focus:ring-2 focus:ring-[#ff7622]/30 hover:bg-[#e8edf2] transition-colors duration-150"
                                placeholder="Nomor telepon"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs mt-1 font-sen">{errors.phone}</p>
                            )}
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="text-[#32343e] text-[13px] font-sen block mb-[8px]">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                className="w-full h-[103px] bg-[#f0f5fa] rounded-[8px] px-5 py-4 text-[#a0a5ba] text-[14px] font-sen outline-none border-0 resize-none focus:ring-2 focus:ring-[#ff7622]/30 hover:bg-[#e8edf2] transition-colors duration-150"
                                placeholder="Deskripsi diri"
                                style={{ lineHeight: '24px' }}
                            />
                            {errors.bio && (
                                <p className="text-red-500 text-xs mt-1 font-sen">{errors.bio}</p>
                            )}
                        </div>

                        {errors.avatar && (
                            <p className="text-red-500 text-xs font-sen">{errors.avatar}</p>
                        )}

                        {recentlySuccessful && (
                            <p className="text-[#059c6a] text-sm font-sen text-center">
                                Profile berhasil diperbarui!
                            </p>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="px-6 mt-[32px] mb-8">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-[62px] bg-[#ff7622] rounded-[12px] text-white text-[16px] font-bold font-sen flex items-center justify-center hover:bg-[#e5651a] transition-colors disabled:opacity-60"
                        >
                            {processing ? 'Menyimpan...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
