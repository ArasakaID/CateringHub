import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function CallScreen({ order, courier }) {
    const [isSpeakerOn, setIsSpeakerOn] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [callStatus, setCallStatus] = useState('ringing');
    const [callDuration, setCallDuration] = useState(0);
    const timerRef = useRef(null);
    const audioRef = useRef(null);

    const courierPhoto = courier?.photo || null;
    const courierName = courier?.name || 'Courier';

    // Audio playback
    useEffect(() => {
        const audio = new Audio('/calls/grup apa ini.mp3');
        audio.loop = true;
        audio.volume = 0.7;
        audioRef.current = audio;

        if (callStatus === 'ringing') {
            audio.play().catch(() => {});
        }

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    // Stop ringing when connected/ended
    useEffect(() => {
        if (callStatus !== 'ringing' && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [callStatus]);

    // Auto-progress call: ringing → connected → ended
    useEffect(() => {
        const ringingTimer = setTimeout(() => {
            setCallStatus('connected');
            setCallDuration(0);
        }, 2000);

        const endTimer = setTimeout(() => {
            setCallStatus('ended');
        }, 6000);

        return () => {
            clearTimeout(ringingTimer);
            clearTimeout(endTimer);
        };
    }, []);

    // Duration timer when connected
    useEffect(() => {
        if (callStatus === 'connected') {
            timerRef.current = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [callStatus]);

    const formatDuration = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const getStatusText = () => {
        switch (callStatus) {
            case 'ringing': return 'Berdering.......';
            case 'connected': return formatDuration(callDuration);
            case 'ended': return 'Panggilan Ditutup oleh Driver';
            default: return '';
        }
    };

    const handleEndCall = () => {
        setCallStatus('ended');
    };

    const handleBack = () => {
        router.visit(route('tracking.show', order.id));
    };

    // Phone-off icon
    const PhoneOffIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10.68 13.31C9.49 12.18 8.64 10.75 8.21 9.14L10.68 11.61L10.67 11.6C10.4 11.5 10.1 11.46 9.8 11.5C9.47 11.54 9.17 11.66 8.93 11.85L6.87 13.6C6.74 13.71 6.66 13.87 6.66 14.04V15.57L3.47 14.5C3.18 14.4 2.85 14.41 2.57 14.53C2.29 14.65 2.07 14.87 1.97 15.14L1.06 17.61C0.94 17.93 1 18.3 1.21 18.56C2 19.5 3.13 20.09 4.37 20.2C4.41 20.2 4.45 20.2 4.49 20.2C6.74 20.2 8.87 19.35 10.53 17.8C11.38 17.01 12.11 16.1 12.68 15.12M22 21L2 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    // Phone icon (for connected state)
    const PhoneIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92V19.5C22 19.9 21.7 20.2 21.3 20.3C19.9 20.5 18.4 20.5 16.9 20.1C16.5 20 16.2 19.8 16 19.5L13.5 16.7C13.2 16.3 13.2 15.7 13.5 15.4L15.3 13.6C15.5 13.4 15.6 13.1 15.5 12.9C14.8 11.3 13.8 9.9 12.5 8.7C12.3 8.5 12 8.5 11.8 8.6L10 10.4C9.7 10.7 9.1 10.7 8.7 10.4L5.9 7.9C5.6 7.7 5.5 7.3 5.5 7C5.5 6.7 5.6 6.4 5.9 6.1L7.7 4.3C8 4 8.5 3.9 8.9 4.1L11.3 5.5C11.5 5.6 11.8 5.9 11.8 6.1C11.9 6.3 11.9 6.5 11.8 6.7C11.8 6.9 11.8 7 11.8 7.2M15.5 5.5C16.7 6.3 17.7 7.3 18.5 8.5M16.5 3C18.5 4.3 20.1 6 21.3 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    // Speaker icon
    const SpeakerIcon = () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 7.5C15.6 8.5 16 9.7 16 11C16 12.3 15.6 13.5 15 14.5M17 5C18.2 6.8 19 9.2 19 12C19 14.8 18.2 17.2 17 19M11 2L6 7H2V15H6L11 20V2Z" stroke={callStatus === 'connected' ? '#ffffff' : '#181c2e'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    // Mute icon
    const MuteIcon = () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 8V11C15 11.5 14.9 12 14.7 12.4M9 5V2C9 1.4 9.4 1 10 1C10.6 1 11 1.4 11 2V8M11 11.9C11 12.5 10.6 14 10 14C8.6 14 7.5 12.9 7.5 11.5V10M17 17L3 3M12.5 16.5C11.6 17.4 10.3 18 9 18C6.2 18 4 15.8 4 13V11" stroke={callStatus === 'connected' ? '#ffffff' : '#181c2e'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    // Phone icon for connected
    const PhoneConnectedIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92V19.5C22 19.9 21.7 20.2 21.3 20.3C19.9 20.5 18.4 20.5 16.9 20.1C16.5 20 16.2 19.8 16 19.5L13.5 16.7C13.2 16.3 13.2 15.7 13.5 15.4L15.3 13.6C15.5 13.4 15.6 13.1 15.5 12.9C14.8 11.3 13.8 9.9 12.5 8.7C12.3 8.5 12 8.5 11.8 8.6L10 10.4C9.7 10.7 9.1 10.7 8.7 10.4L5.9 7.9C5.6 7.7 5.5 7.3 5.5 7C5.5 6.7 5.6 6.4 5.9 6.1L7.7 4.3C8 4 8.5 3.9 8.9 4.1L11.3 5.5C11.5 5.6 11.8 5.9 11.8 6.1C11.9 6.3 11.9 6.5 11.8 6.7C11.8 6.9 11.8 7 11.8 7.2M15.5 5.5C16.7 6.3 17.7 7.3 18.5 8.5M16.5 3C18.5 4.3 20.1 6 21.3 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    return (
        <>
            <Head title="Call - CateringHub" />

            <div className="min-h-screen relative" style={{
                fontFamily: 'Sen, sans-serif',
                backgroundColor: '#121223',
            }}>
                {/* ===== BLUR OVERLAY ===== */}
                <div className="absolute inset-0"
                    style={{
                        backgroundColor: 'rgba(39, 63, 85, 0.67)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                    }}
                />

                {/* ===== ENDED STATE — full overlay ===== */}
                {callStatus === 'ended' ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6">
                        <div className="w-[105px] h-[105px] rounded-full overflow-hidden"
                            style={{ backgroundColor: '#c4c4c4' }}
                        >
                            {courierPhoto ? (
                                <img src={courierPhoto} alt={courierName} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/>
                                        <path d="M4 20C4 17 8 15 12 15C16 15 20 17 20 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                        <p className="text-[20px] font-bold mt-[16px] text-white">{courierName}</p>
                        <p className="text-[16px] mt-[4px]" style={{ color: '#ff6b6b' }}>
                            Panggilan Ditutup oleh Driver
                        </p>
                        <button
                            onClick={handleBack}
                            className="w-full h-[62px] rounded-[12px] flex items-center justify-center font-bold text-[16px] mt-[40px] cursor-pointer hover:opacity-80 transition"
                            style={{
                                backgroundColor: '#ff7622',
                                color: 'white',
                                maxWidth: '327px',
                            }}
                        >
                            Kembali
                        </button>
                    </div>
                ) : (
                    /* ===== BOTTOM SHEET (ringing / connected) ===== */
                    <div className="absolute bottom-0 left-1/2 w-full max-w-md"
                        style={{
                            transform: 'translateX(-50%)',
                        }}
                    >
                        <div className="bg-white rounded-t-[24px] px-[24px] pb-[40px] pt-[40px] flex flex-col items-center">
                            {/* Profile photo */}
                            <div className="w-[105px] h-[105px] rounded-full overflow-hidden"
                                style={{ backgroundColor: '#c4c4c4' }}
                            >
                                {courierPhoto ? (
                                    <img src={courierPhoto} alt={courierName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/>
                                            <path d="M4 20C4 17 8 15 12 15C16 15 20 17 20 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Name */}
                            <p className="text-[20px] font-bold mt-[16px]" style={{ color: '#181c2e' }}>
                                {courierName}
                            </p>

                            {/* Status */}
                            <p className="text-[16px] mt-[4px] flex items-center gap-2" style={{ color: callStatus === 'connected' ? '#059c6a' : '#979797' }}>
                                {callStatus === 'connected' && (
                                    <span className="w-[8px] h-[8px] rounded-full bg-[#059c6a] animate-pulse" />
                                )}
                                {getStatusText()}
                            </p>

                            {/* ===== CALL ACTION BUTTONS ===== */}
                            <div className="flex items-center justify-center mt-[32px]" style={{ gap: '24px' }}>
                                {/* Speaker */}
                                <button
                                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                                    className="w-[48px] h-[48px] rounded-full flex items-center justify-center transition-all cursor-pointer hover:opacity-80"
                                    style={{
                                        backgroundColor: callStatus === 'connected'
                                            ? (isSpeakerOn ? '#ff7622' : 'rgba(255,255,255,0.15)')
                                            : (isSpeakerOn ? '#ff7622' : '#ecf0f4'),
                                    }}
                                >
                                    <SpeakerIcon />
                                </button>

                                {/* End Call */}
                                <button
                                    onClick={handleEndCall}
                                    className="w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                                    style={{ backgroundColor: '#ff3434' }}
                                >
                                    <PhoneOffIcon />
                                </button>

                                {/* Mute */}
                                <button
                                    onClick={() => setIsMuted(!isMuted)}
                                    className="w-[48px] h-[48px] rounded-full flex items-center justify-center transition-all cursor-pointer hover:opacity-80"
                                    style={{
                                        backgroundColor: callStatus === 'connected'
                                            ? (isMuted ? '#ff7622' : 'rgba(255,255,255,0.15)')
                                            : (isMuted ? '#ff7622' : '#ecf0f4'),
                                    }}
                                >
                                    <MuteIcon />
                                </button>
                            </div>

                            {/* ===== KONFIRMASI BUTTON (only in ringing) ===== */}
                            {callStatus === 'ringing' && (
                                <button
                                    onClick={handleBack}
                                    className="w-full h-[62px] rounded-[12px] flex items-center justify-center font-bold text-[16px] mt-[32px] cursor-pointer hover:opacity-80 transition"
                                    style={{
                                        backgroundColor: '#ff7622',
                                        color: 'white',
                                        maxWidth: '327px',
                                    }}
                                >
                                    Konfirmasi
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
