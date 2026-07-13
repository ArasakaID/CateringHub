import { Head, router } from '@inertiajs/react';

export default function WithdrawSuccess() {
    return (
        <>
            <Head title="Withdraw Successful" />
            <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: 'Sen, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 93, position: 'relative' }}>
                {/* Confetti + Checkmark group (matching Figma y:219 position) */}
                <div style={{ position: 'relative', width: 260, height: 181 }}>
                    {/* Small star — top right */}
                    <svg style={{ position: 'absolute', top: 32, left: 231, width: 16, height: 16 }} viewBox="0 0 16 16" fill="none">
                        <path d="M8.688 0.3L9.413 4.78C9.53 5.46 10.06 5.99 10.74 6.2L15.22 7.59C15.62 7.715 15.62 8.28 15.22 8.405L10.74 9.795C10.06 10.005 9.53 10.54 9.413 11.22L8.688 15.7C8.625 16.1 8.06 16.1 7.985 15.7L7.26 11.22C7.143 10.54 6.613 10.005 5.933 9.795L1.45 8.405C1.05 8.28 1.05 7.715 1.45 7.59L5.933 6.2C6.613 5.99 7.143 5.46 7.26 4.78L7.985 0.3C8.06 -0.1 8.625 -0.1 8.688 0.3Z" fill="#fb6d3a" />
                    </svg>

                    {/* Small star — left */}
                    <svg style={{ position: 'absolute', top: 66, left: 60, width: 16, height: 16 }} viewBox="0 0 16 16" fill="none">
                        <path d="M8.688 0.3L9.413 4.78C9.53 5.46 10.06 5.99 10.74 6.2L15.22 7.59C15.62 7.715 15.62 8.28 15.22 8.405L10.74 9.795C10.06 10.005 9.53 10.54 9.413 11.22L8.688 15.7C8.625 16.1 8.06 16.1 7.985 15.7L7.26 11.22C7.143 10.54 6.613 10.005 5.933 9.795L1.45 8.405C1.05 8.28 1.05 7.715 1.45 7.59L5.933 6.2C6.613 5.99 7.143 5.46 7.26 4.78L7.985 0.3C8.06 -0.1 8.625 -0.1 8.688 0.3Z" fill="#fb6d3a" />
                    </svg>

                    {/* Rotated star */}
                    <svg style={{ position: 'absolute', top: 80, left: 195, width: 16, height: 16, transform: 'rotate(-8.2deg)' }} viewBox="0 0 16 16" fill="none">
                        <path d="M8.688 0.3L9.413 4.78C9.53 5.46 10.06 5.99 10.74 6.2L15.22 7.59C15.62 7.715 15.62 8.28 15.22 8.405L10.74 9.795C10.06 10.005 9.53 10.54 9.413 11.22L8.688 15.7C8.625 16.1 8.06 16.1 7.985 15.7L7.26 11.22C7.143 10.54 6.613 10.005 5.933 9.795L1.45 8.405C1.05 8.28 1.05 7.715 1.45 7.59L5.933 6.2C6.613 5.99 7.143 5.46 7.26 4.78L7.985 0.3C8.06 -0.1 8.625 -0.1 8.688 0.3Z" fill="#fb6d3a" />
                    </svg>

                    {/* Very small star — far left */}
                    <svg style={{ position: 'absolute', top: 128, left: 0, width: 9, height: 9 }} viewBox="0 0 9 9" fill="none">
                        <path d="M4.688 0.3L5.413 4.78C5.53 5.46 6.06 5.99 6.74 6.2L11.22 7.59C11.62 7.715 11.62 8.28 11.22 8.405L6.74 9.795C6.06 10.005 5.53 10.54 5.413 11.22L4.688 15.7C4.625 16.1 4.06 16.1 3.985 15.7L3.26 11.22C3.143 10.54 2.613 10.005 1.933 9.795L-2.55 8.405C-2.95 8.28 -2.95 7.715 -2.55 7.59L1.933 6.2C2.613 5.99 3.143 5.46 3.26 4.78L3.985 0.3C4.06 -0.1 4.625 -0.1 4.688 0.3Z" fill="#fb6d3a" />
                    </svg>

                    {/* Large star 1 — opacity 0.4 */}
                    <svg style={{ position: 'absolute', top: 102, left: 231, width: 30, height: 30, opacity: 0.4 }} viewBox="0 0 30 30" fill="none">
                        <path d="M16.688 0.3L17.413 4.78C17.53 5.46 18.06 5.99 18.74 6.2L23.22 7.59C23.62 7.715 23.62 8.28 23.22 8.405L18.74 9.795C18.06 10.005 17.53 10.54 17.413 11.22L16.688 15.7C16.625 16.1 16.06 16.1 15.985 15.7L15.26 11.22C15.143 10.54 14.613 10.005 13.933 9.795L9.45 8.405C9.05 8.28 9.05 7.715 9.45 7.59L13.933 6.2C14.613 5.99 15.143 5.46 15.26 4.78L15.985 0.3C16.06 -0.1 16.625 -0.1 16.688 0.3Z" fill="#fb6d3a" />
                    </svg>

                    {/* Large star 2 — opacity 0.4 */}
                    <svg style={{ position: 'absolute', top: 0, left: 68, width: 30, height: 30, opacity: 0.4 }} viewBox="0 0 30 30" fill="none">
                        <path d="M16.688 0.3L17.413 4.78C17.53 5.46 18.06 5.99 18.74 6.2L23.22 7.59C23.62 7.715 23.62 8.28 23.22 8.405L18.74 9.795C18.06 10.005 17.53 10.54 17.413 11.22L16.688 15.7C16.625 16.1 16.06 16.1 15.985 15.7L15.26 11.22C15.143 10.54 14.613 10.005 13.933 9.795L9.45 8.405C9.05 8.28 9.05 7.715 9.45 7.59L13.933 6.2C14.613 5.99 15.143 5.46 15.26 4.78L15.985 0.3C16.06 -0.1 16.625 -0.1 16.688 0.3Z" fill="#fb6d3a" />
                    </svg>

                    {/* Dot 1 — opacity 0.3 */}
                    <div style={{ position: 'absolute', top: 56, left: 151, width: 10, height: 10, borderRadius: '50%', background: '#fb6d3a', opacity: 0.3 }} />

                    {/* Dot 2 — opacity 0.3 */}
                    <div style={{ position: 'absolute', top: 112, left: 2, width: 10, height: 10, borderRadius: '50%', background: '#fb6d3a', opacity: 0.3 }} />

                    {/* Checkmark circle */}
                    <div style={{ position: 'absolute', top: 82, left: 74, width: 99, height: 99 }}>
                        <svg width="99" height="99" viewBox="0 0 99 99" fill="none">
                            <path d="M49.5 99C76.8381 99 99 76.8381 99 49.5C99 22.1619 76.8381 0 49.5 0C22.1619 0 0 22.1619 0 49.5C0 76.8381 22.1619 99 49.5 99Z" fill="#FB6D3A" />
                            <path d="M41.2375 69.1646L25 52.581L29.8757 47.6013L41.2375 59.2053L69.8332 30L74.7089 34.9797L41.2375 69.1646Z" fill="white" />
                        </svg>
                    </div>
                </div>

                {/* Text — Figma y:480 */}
                <div style={{ marginTop: 80, fontSize: 22, fontWeight: 500, fontFamily: 'Poppins, sans-serif', color: '#333333' }}>
                    Withdraw Successful
                </div>

                {/* OK Button — Figma y:533 */}
                <button
                    onClick={() => router.visit('/seller/menu')}
                    style={{
                        width: 327, height: 60, background: '#ff7622', borderRadius: 10,
                        border: 'none', cursor: 'pointer', fontSize: 18, fontFamily: 'Sen, sans-serif', color: '#ffffff',
                        marginTop: 20, flexShrink: 0,
                    }}
                >
                    OK
                </button>
            </div>
        </>
    );
}