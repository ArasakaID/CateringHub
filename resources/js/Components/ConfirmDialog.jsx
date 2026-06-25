export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={onCancel}
        >
            <div
                className="bg-white rounded-[16px] p-[24px] w-full max-w-[327px] shadow-xl"
                onClick={(e) => e.stopPropagation()}
                style={{ fontFamily: 'Sen, sans-serif' }}
            >
                {/* Title */}
                <h3 className="text-[#181c2e] text-[17px] font-bold text-center mb-[8px]">
                    {title || 'Konfirmasi'}
                </h3>

                {/* Message */}
                <p className="text-[#6b6e82] text-[14px] text-center mb-[24px] leading-[20px]">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex gap-[10px]">
                    <button
                        onClick={onCancel}
                        className="flex-1 h-[44px] rounded-[10px] text-[14px] font-bold cursor-pointer hover:opacity-80 transition"
                        style={{
                            border: '1px solid #ff7622',
                            color: '#ff7622',
                            backgroundColor: 'transparent',
                        }}
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 h-[44px] rounded-[10px] text-[14px] font-bold text-white cursor-pointer hover:opacity-80 transition"
                        style={{ backgroundColor: '#ff0000' }}
                    >
                        Ya, batalkan
                    </button>
                </div>
            </div>
        </div>
    );
}
