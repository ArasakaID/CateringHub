import { Head, Link } from '@inertiajs/react';

export default function SimpanLokasiSukses({ from = '' }) {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center" style={{ fontFamily: 'Sen, sans-serif' }}>
            <Head title="Lokasi Tersimpan" />

            {/* Success Illustration */}
            <div className="flex flex-col items-center">
                {/* Decorative dots */}
                <div className="relative w-[260px] h-[181px] flex items-center justify-center">
                    {/* Background decorative elements */}
                    <svg
                        className="absolute"
                        width="260"
                        height="181"
                        viewBox="0 0 260 181"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ top: '-20px', left: '-10px' }}
                    >
                        <circle cx="231" cy="32" r="8" fill="#fb6d3a" opacity="0.4" />
                        <circle cx="60" cy="66" r="8" fill="#fb6d3a" opacity="0.4" />
                        <circle cx="194" cy="80" r="8" fill="#fb6d3a" opacity="0.4" transform="rotate(-8.2, 194, 80)" />
                        <circle cx="0" cy="128" r="4.5" fill="#fb6d3a" opacity="0.4" />
                        <circle cx="231" cy="102" r="14.8" fill="#fb6d3a" opacity="0.4" />
                        <circle cx="68" cy="0" r="14.8" fill="#fb6d3a" opacity="0.4" />
                    </svg>

                    {/* Sparkle dots */}
                    <svg
                        className="absolute"
                        width="260"
                        height="181"
                        viewBox="0 0 260 181"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <ellipse cx="151" cy="56" rx="5" ry="5" fill="#fb6d3a" opacity="0.3" />
                        <ellipse cx="2" cy="112" rx="5" ry="5" fill="#fb6d3a" opacity="0.3" />
                    </svg>

                    {/* Checkmark Circle */}
                    <div className="relative flex items-center justify-center">
                        <svg width="99" height="99" viewBox="0 0 99 99" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="49.5" cy="49.5" r="49.5" fill="#fb6d3a" />
                            <path d="M29 50.5L42.5 63.5L71 36" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Success Text */}
                <p
                    className="mt-8 text-center"
                    style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                        fontSize: '22px',
                        color: '#333333',
                    }}
                >
                    Lokasi telah di simpan
                </p>

                {/* Ok Button */}
                <Link
                    href={route('location.index')}
                    className="flex items-center justify-center mt-12"
                    style={{
                        width: '327px',
                        height: '60px',
                        backgroundColor: '#ff7622',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontFamily: 'Sen, sans-serif',
                        fontSize: '18px',
                        fontWeight: 400,
                        color: '#ffffff',
                    }}
                >
                    Ok
                </Link>
            </div>
        </div>
    );
}
