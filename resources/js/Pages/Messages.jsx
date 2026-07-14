import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const BackIcon = () => (
    <svg width="5" height="10" viewBox="0 0 5 10" fill="none">
        <path d="M4 1L1 5L4 9" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

function formatTime(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export default function Messages({ threads }) {
    const [tab, setTab] = useState('messages');

    const unreadCount = threads.reduce((sum, t) => sum + t.unread_count, 0);

    return (
        <>
            <Head title="Messages" />
            <div className="min-h-screen bg-white" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* Top Bar */}
                <div className="flex items-center px-6 pt-[50px] pb-4" style={{ gap: '16px' }}>
                    <button
                        onClick={() => router.visit('/home')}
                        className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0"
                    >
                        <BackIcon />
                    </button>
                    <span className="text-[#181c2e] text-[17px] font-sen">Messages</span>
                </div>

                {/* Tab Bar */}
                <div className="px-6 relative mb-2">
                    <div className="flex" style={{ gap: '0px' }}>
                        <button
                            onClick={() => setTab('notifications')}
                            className={`text-[14px] font-sen pb-3 px-4 ${
                                tab === 'notifications' ? 'text-[#ff7622] font-bold' : 'text-[#a5a7b9]'
                            }`}
                        >
                            Notifications
                        </button>
                        <button
                            onClick={() => setTab('messages')}
                            className={`text-[14px] font-sen pb-3 px-4 ${
                                tab === 'messages' ? 'text-[#ff7622] font-bold' : 'text-[#a5a7b9]'
                            }`}
                        >
                            Messages{unreadCount > 0 ? ` (${unreadCount})` : ''}
                        </button>
                    </div>
                    {/* Underline */}
                    <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-[#ced7df] opacity-50" />
                    <div
                        className="absolute bottom-0 h-[2px] bg-[#ff7622] transition-all duration-200"
                        style={{
                            left: tab === 'notifications' ? '24px' : '158px',
                            width: tab === 'notifications' ? '120px' : '146px',
                        }}
                    />
                </div>

                {/* Content */}
                <div className="px-6 pb-8">
                    {tab === 'notifications' ? (
                        <div className="text-center py-20">
                            <p className="text-[#a0a5ba] text-[14px]">Belum ada notifikasi</p>
                        </div>
                    ) : threads.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-[#a0a5ba] text-[14px]">Belum ada percakapan</p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {threads.map((thread, idx) => (
                                <div key={thread.order_id}>
                                    <button
                                        onClick={() => router.visit(route('tracking.chat', thread.order_id))}
                                        className="flex items-center w-full text-left py-3"
                                        style={{ gap: '12px' }}
                                    >
                                        {/* Avatar */}
                                        <div className="relative shrink-0">
                                            <div className="w-[32px] h-[32px] rounded-full bg-[#98a8b8] flex items-center justify-center text-white text-[12px] font-bold">
                                                {thread.catering?.name?.charAt(0) || 'C'}
                                            </div>
                                            <div className="absolute -bottom-[1px] -right-[1px] w-[8px] h-[8px] rounded-full bg-[#1ad52b] border-[1.5px] border-white" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[#32343e] text-[15px] font-sen truncate">
                                                    {thread.catering?.name || 'Catering'}
                                                </span>
                                                {thread.last_message && (
                                                    <span className="text-[9px] font-sen text-[#373738] shrink-0 ml-2">
                                                        {formatTime(thread.last_message.created_at)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between mt-[2px]">
                                                <span className={`text-[12px] font-sen truncate ${thread.unread_count > 0 ? 'text-[#373738]' : 'text-[#afafaf]'}`}>
                                                    {thread.last_message?.message || '...'}
                                                </span>
                                                {thread.unread_count > 0 && (
                                                    <div className="w-[22px] h-[22px] rounded-full bg-[#ff7622] flex items-center justify-center shrink-0 ml-2">
                                                        <span className="text-white text-[10px] font-bold">
                                                            {thread.unread_count > 9 ? '9+' : thread.unread_count}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                    {idx < threads.length - 1 && (
                                        <div className="h-[1px] bg-[#f0f4f9]" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
