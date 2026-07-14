import { Head, router } from '@inertiajs/react';

function StarRating({ rating }) {
    return (
        <div className="flex gap-[2px]">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 1L8.3 4.6L12.5 5.2L9.5 8.1L10.2 12.3L6.5 10.3L2.8 12.3L3.5 8.1L0.5 5.2L4.7 4.6L6.5 1Z"
                        fill={star <= rating ? '#ff7622' : '#e0e0e0'}
                        stroke={star <= rating ? '#ff7622' : '#d0d0d0'}
                        strokeWidth="0.5"
                    />
                </svg>
            ))}
        </div>
    );
}

function ThreeDots() {
    return (
        <div className="flex gap-[5px] items-center">
            <div className="w-[4px] h-[4px] rounded-full bg-[#9c9ba6]" />
            <div className="w-[4px] h-[4px] rounded-full bg-[#9c9ba6]" />
            <div className="w-[4px] h-[4px] rounded-full bg-[#9c9ba6]" />
        </div>
    );
}

const BackIcon = () => (
    <svg width="5" height="10" viewBox="0 0 5 10" fill="none">
        <path d="M4 1L1 5L4 9" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

function getAvatarInitials(name) {
    return name ? name.charAt(0).toUpperCase() : '?';
}

export default function ReviewScreen({ catering, reviews }) {
    const reviewList = reviews?.data || [];

    return (
        <>
            <Head title="Reviews" />
            <div className="min-h-screen bg-white" style={{ fontFamily: 'Sen, sans-serif' }}>
                {/* Top Bar */}
                <div className="flex items-center px-6 pt-[50px] pb-4" style={{ gap: '16px' }}>
                    <button
                        onClick={() => router.visit(route('catering.show', catering.slug))}
                        className="w-[45px] h-[45px] rounded-full bg-[#ecf0f4] flex items-center justify-center shrink-0"
                    >
                        <BackIcon />
                    </button>
                    <span className="text-[#181c2e] text-[17px] font-sen">Reviews</span>
                </div>

                {/* Content */}
                <div className="px-6 pb-8 space-y-4">
                    {reviewList.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-[#a0a5ba] text-[14px]">Belum ada review</p>
                        </div>
                    ) : (
                        reviewList.map((review) => (
                            <div
                                key={review.id}
                                className="bg-[#f6f8fa] rounded-[15px] p-4"
                                style={{ minHeight: '115px' }}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-[43px] h-[43px] rounded-full bg-[#98a8b8] flex items-center justify-center text-white text-[18px] font-bold shrink-0">
                                            {review.user?.avatar ? (
                                                <img src={`/storage/${review.user.avatar}`} alt="" className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                getAvatarInitials(review.user?.name)
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-[#32343e] text-[14px] font-bold">{review.user?.name || 'Anonymous'}</p>
                                            <p className="text-[#9c9ba6] text-[12px]">
                                                {new Date(review.created_at).toLocaleDateString('id-ID', {
                                                    day: '2-digit', month: '2-digit', year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <ThreeDots />
                                </div>

                                <div className="mt-3">
                                    <StarRating rating={review.rating} />
                                </div>

                                {review.comment && (
                                    <p className="text-[#747783] text-[12px] mt-2 leading-relaxed line-clamp-3">
                                        {review.comment}
                                    </p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
