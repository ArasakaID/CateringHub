import { Head, Link, router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function PembayaranBerhasil({ order }) {
    // Auto-redirect after 30 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            router.visit(route('pesanan'));
        }, 30000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head title="Pembayaran Berhasil - CateringHub" />

            <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* ===== ILLUSTRASI + TEKS ===== */}
                <div className="flex flex-col items-center justify-start flex-1 px-6" style={{ paddingTop: '180px' }}>
                    {/* Success Illustration */}
                    <img
                        src="/images/figma-success-illustration.png"
                        alt="Pembayaran Berhasil"
                        className="w-[230px] h-[215px]"
                        style={{ objectFit: 'contain' }}
                    />

                    {/* Title */}
                    <h1
                        className="text-[24px] font-bold mt-[36px] text-center"
                        style={{ color: '#111a2c', fontFamily: 'Sen, sans-serif', lineHeight: '32px' }}
                    >
                        Selamat!
                    </h1>

                    {/* Description — max-width 195px agar 3 baris */}
                    <p
                        className="text-[14px] mt-[16px] text-center"
                        style={{
                            color: '#525c67',
                            opacity: 0.6,
                            lineHeight: '24px',
                            maxWidth: '195px',
                        }}
                    >
                        Pembayaran selesai, tinggal nunggu info dari Catering!
                    </p>
                </div>

                {/* ===== BUTTON ===== */}
                <div className="px-6 pb-[60px]">
                    <Link
                        href={route('pesanan')}
                        className="w-full h-[64px] rounded-[12px] flex items-center justify-center cursor-pointer hover:bg-[#e5681a] transition active:scale-[0.98]"
                        style={{ backgroundColor: '#ff7622', maxWidth: '342px', margin: '0 auto' }}
                    >
                        <span className="text-white text-[16px] font-bold uppercase" style={{ fontFamily: 'Sen, sans-serif' }}>
                            Lihat pesanan
                        </span>
                    </Link>
                </div>
            </div>
        </>
    );
}
