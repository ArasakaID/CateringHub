import { Head, Link, router } from '@inertiajs/react';

export default function SimpanLokasiSukses({ from = '' }) {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center" style={{ fontFamily: 'Sen, sans-serif' }}>
            <Head title="Lokasi Tersimpan" />

            <div className="flex-1 flex flex-col items-center justify-center px-6">
                <div className="flex flex-col items-center relative w-full" style={{ maxWidth: '327px' }}>

                    <div className="relative flex items-center justify-center" style={{ width: 260, height: 130 }}>
                        <svg className="absolute" style={{ top: '32px', right: '17px' }} width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="#fb6d3a" opacity="0.4" />
                        </svg>

                        <svg className="absolute" style={{ top: '0px', left: '68px' }} width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="#fb6d3a" opacity="0.4" />
                        </svg>

                        <svg className="absolute" style={{ top: '80px', left: '194px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0L9.5 5.5L16 8L9.5 10.5L8 16L6.5 10.5L0 8L6.5 5.5Z" fill="#fb6d3a" />
                        </svg>

                        <svg className="absolute" style={{ top: '66px', left: '60px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0L9.5 5.5L16 8L9.5 10.5L8 16L6.5 10.5L0 8L6.5 5.5Z" fill="#fb6d3a" />
                        </svg>

                        <svg className="absolute" style={{ top: '128px', left: '0px' }} width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <circle cx="4.5" cy="4.5" r="4.5" fill="#fb6d3a" opacity="0.4" />
                        </svg>

                        <svg className="absolute" style={{ top: '102px', left: '231px' }} width="29" height="29" viewBox="0 0 30 30" fill="none">
                            <circle cx="15" cy="15" r="14.8" fill="#fb6d3a" opacity="0.4" />
                        </svg>

                        <svg className="absolute" style={{ top: '0px', left: '125px' }} width="29" height="29" viewBox="0 0 30 30" fill="none">
                            <circle cx="15" cy="15" r="14.8" fill="#fb6d3a" opacity="0.4" />
                        </svg>

                        <svg className="absolute" style={{ top: '102px', right: '17px' }} width="29" height="29" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 0L18 11L30 15L18 19L15 30L12 19L0 15L12 11Z" fill="#fb6d3a" opacity="0.4" />
                        </svg>

                        <svg className="absolute" style={{ top: '56px', left: '2px' }} width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <ellipse cx="5" cy="5" rx="5" ry="5" fill="#fb6d3a" opacity="0.3" />
                        </svg>

                        <svg className="absolute" style={{ top: '56px', left: '151px' }} width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <ellipse cx="5" cy="5" rx="5" ry="5" fill="#fb6d3a" opacity="0.3" />
                        </svg>

                        <div className="relative flex items-center justify-center">
                            <svg width="99" height="99" viewBox="0 0 99 99" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="49.5" cy="49.5" r="49.5" fill="#fb6d3a" />
                                <path d="M29 50.5L42.5 63.5L71 36" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    <p className="text-center" style={{ marginTop: '55px', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '22px', color: '#333333', lineHeight: '33px' }}>
                        Lokasi telah di simpan
                    </p>

                    <button
                        onClick={() => router.visit(route('location.index'), { replace: true })}
                        className="w-full flex items-center justify-center"
                        style={{
                            marginTop: '55px',
                            height: '62px',
                            backgroundColor: '#ff7622',
                            borderRadius: '10px',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: 'Sen, sans-serif',
                            fontSize: '18px',
                            fontWeight: 400,
                            color: '#ffffff',
                            boxSizing: 'border-box',
                        }}
                    >
                        OK
                    </button>

                </div>
            </div>
        </div>
    );
}
