import { Head, Link, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function MessageScreen({ order, courier, messages }) {
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);

    const chatMessages = messages || [];

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || sending) return;

        setSending(true);
        router.post(route('tracking.chat.send', order.id), {
            message: newMessage.trim(),
        }, {
            onFinish: () => {
                setNewMessage('');
                setSending(false);
            },
            preserveScroll: true,
        });
    };

    // Close icon
    const CloseIcon = () => (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="#181c2e" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );

    // Double-check icon
    const DoubleCheckIcon = ({ color = '#a0a5ba' }) => (
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M1 5L3.5 7.5L8 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 5L8.5 7.5L13 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    // Send arrow icon
    const SendIcon = () => (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 9L17 1L11 17L8 10L1 9Z" fill="#ff7622" stroke="#ff7622" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    // Smile/Emoji icon
    const SmileIcon = () => (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="9" stroke="#a0a5ba" strokeWidth="2"/>
            <circle cx="8" cy="9" r="1" fill="#a0a5ba"/>
            <circle cx="14" cy="9" r="1" fill="#a0a5ba"/>
            <path d="M7 13C7 13 8.5 15 11 15C13.5 15 15 13 15 13" stroke="#a0a5ba" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    );

    // Format time
    const formatTime = (date) => {
        const d = new Date(date);
        const hours = d.getHours().toString().padStart(2, '0');
        const mins = d.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
        const h12 = hours % 12 || 12;
        return `${h12}:${mins} ${ampm}`;
    };

    return (
        <>
            <Head title="Chat - CateringHub" />

            <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* ===== TOP BAR ===== */}
                <div className="px-6 pt-[50px] pb-[16px] flex items-center justify-between">
                    {/* Close button */}
                    <Link
                        href={route('tracking.show', order.id)}
                        className="w-[45px] h-[45px] rounded-full flex items-center justify-center shrink-0 cursor-pointer hover:opacity-80 transition"
                        style={{ backgroundColor: '#ecf0f4' }}
                    >
                        <CloseIcon />
                    </Link>

                    {/* Title */}
                    <span className="text-[#181c2e] text-[17px]" style={{ lineHeight: '22px' }}>
                        {courier?.name || 'Chat'}
                    </span>

                    {/* Spacer */}
                    <div className="w-[45px]" />
                </div>

                {/* ===== CHAT MESSAGES ===== */}
                <div className="flex-1 px-6 overflow-y-auto pb-[20px]">
                    {chatMessages.length === 0 ? (
                        /* Empty state */
                        <div className="flex flex-col items-center justify-center mt-[80px] text-center">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                <path d="M21 11.5C21 16 17 19 12 19C10.5 19 9.1 18.7 7.8 18.2L3 20L4.8 15.3C4.8 15.3 3 13.5 3 11.5C3 7 7 4 12 4C17 4 21 7 21 11.5Z" stroke="#a0a5ba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="text-[#a0a5ba] text-[16px] mt-[16px]">
                                Belum ada pesan
                            </p>
                            <p className="text-[#a0a5ba] text-[13px] mt-[4px]">
                                Mulai percakapan dengan kurir
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col mt-[8px]">
                            {chatMessages.map((msg, index) => {
                                const isUser = msg.sender_type === 'user';
                                const isLastFromCourier = !isUser && (
                                    index === chatMessages.length - 1 ||
                                    chatMessages[index + 1]?.sender_type !== 'courier'
                                );

                                return (
                                    <div key={msg.id} className={`mb-[16px] flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex items-end ${isUser ? 'flex-row-reverse' : ''}`} style={{ gap: '8px', maxWidth: '75%' }}>
                                            {/* Courier avatar (only for courier messages, last in sequence) */}
                                            {!isUser && isLastFromCourier && (
                                                <div className="w-[40px] h-[40px] rounded-full shrink-0 overflow-hidden mb-[4px]"
                                                    style={{ backgroundColor: '#c4c4c4' }}
                                                >
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/>
                                                            <path d="M4 20C4 17 8 15 12 15C16 15 20 17 20 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                            {!isUser && !isLastFromCourier && <div className="w-[40px] shrink-0" />}

                                            {/* Bubble + timestamp */}
                                            <div>
                                                {/* Bubble */}
                                                <div className="px-[14px] py-[10px]"
                                                    style={{
                                                        backgroundColor: isUser ? '#fc6e2a' : '#f0f5fa',
                                                        borderRadius: isUser
                                                            ? '16px 16px 4px 16px'
                                                            : '16px 16px 16px 4px',
                                                        borderBottomRightRadius: isUser ? '4px' : '16px',
                                                        borderBottomLeftRadius: isUser ? '16px' : '4px',
                                                    }}
                                                >
                                                    <p className="text-[14px] leading-[20px] whitespace-pre-wrap"
                                                        style={{ color: isUser ? 'white' : '#181c2e' }}
                                                    >
                                                        {msg.message}
                                                    </p>
                                                </div>

                                                {/* Timestamp + read receipt */}
                                                <div className={`flex items-center mt-[4px] ${isUser ? 'justify-end' : 'justify-start'}`} style={{ gap: '4px' }}>
                                                    <span className="text-[11px]" style={{ color: '#a0a5ba' }}>
                                                        {formatTime(msg.created_at)}
                                                    </span>
                                                    {isUser && (
                                                        <DoubleCheckIcon
                                                            color={msg.is_read ? '#fc6e2a' : '#a0a5ba'}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* ===== INPUT BAR ===== */}
                <div className="px-6 pb-[32px] pt-[12px]">
                    <form onSubmit={handleSend} className="flex items-center"
                        style={{
                            backgroundColor: '#f0f5fa',
                            borderRadius: '12px',
                            padding: '0 16px',
                            height: '55px',
                            border: 'none',
                        }}
                    >
                        {/* Smile icon */}
                        <button type="button" className="shrink-0 cursor-pointer">
                            <SmileIcon />
                        </button>

                        {/* Input */}
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Ketikan pesan"
                            className="flex-1 bg-transparent text-[16px] px-[12px]"
                            style={{
                                color: '#181c2e',
                                fontFamily: 'Sen, sans-serif',
                                outline: 'none',
                                border: 'none',
                                boxShadow: 'none',
                            }}
                        />

                        {/* Send button */}
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || sending}
                            className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 cursor-pointer hover:opacity-80 transition disabled:opacity-40"
                            style={{ backgroundColor: 'white' }}
                        >
                            <SendIcon />
                        </button>
                    </form>
                </div>

                {/* Debug: simulate courier message */}
                <div className="px-6 pb-[8px] flex justify-center">
                    <button
                        onClick={() => router.post(route('tracking.chat.courier-say', order.id), { message: 'Halo kak, pesanan sudah dalam perjalanan nih' })}
                        className="text-[11px] px-[12px] py-[6px] rounded-[8px] cursor-pointer hover:opacity-80 transition"
                        style={{ backgroundColor: '#ecf0f4', color: '#747783' }}
                    >
                        🔔 Simulate Courier Message
                    </button>
                </div>
            </div>
        </>
    );
}
