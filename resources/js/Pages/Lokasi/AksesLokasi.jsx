import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AksesLokasi() {
    const [locationGranted, setLocationGranted] = useState(false);
    const [geoError, setGeoError] = useState(null);

    useEffect(() => {
        // Check if geolocation permission was already granted
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then(result => {
                if (result.state === 'granted') {
                    setLocationGranted(true);
                }
            }).catch(() => {});
        }
    }, []);

    const handleRequestLocation = () => {
        if (!navigator.geolocation) {
            setGeoError('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocationGranted(true);
                // Navigate to location selection page with coordinates
                router.get(route('location.select'), {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    city: 'Yogyakarta',
                });
            },
            (error) => {
                setGeoError(error.message);
                // Still navigate to select page even on error
                router.get(route('location.select'));
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
    };

    const handleGoToLocation = () => {
        router.get(route('location.select'));
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center" style={{ fontFamily: 'Sen, sans-serif' }}>
            <Head title="Akses Lokasi" />

            {/* Map Illustration */}
            <div className="mt-[176px] mb-8">
                <div
                    className="w-[206px] h-[250px] rounded-[90px] overflow-hidden bg-gray-100"
                    style={{
                        backgroundImage: 'url(/images/figma-map-illustration.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </div>

            {/* Description Text */}
            <p
                className="text-center px-6 mb-4"
                style={{
                    fontFamily: 'Sen, sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#646982',
                    lineHeight: '24px',
                    maxWidth: '323px',
                }}
            >
                DFOOD WILL ACCESS YOUR LOCATION ONLY WHILE USING THE APP
            </p>

            {/* Geolocation Error */}
            {geoError && (
                <p className="text-red-500 text-xs mb-2 px-6 text-center">{geoError}</p>
            )}

            {/* Button */}
            {!locationGranted ? (
                <button
                    onClick={handleRequestLocation}
                    className="flex items-center justify-center"
                    style={{
                        width: '327px',
                        height: '62px',
                        backgroundColor: '#ff7622',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        gap: '8px',
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'Sen, sans-serif',
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#ffffff',
                        }}
                    >
                        Access LOCATION
                    </span>

                    {/* Map Pin Icon */}
                    <div className="relative" style={{ width: 32, height: 32 }}>
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                width: 32,
                                height: 32,
                                backgroundColor: '#ffffff',
                                opacity: 0.2,
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.6783 5.382C13.6783 9.382 8.67834 14.382 8.67834 14.382C8.67834 14.382 3.67834 9.382 3.67834 5.382C3.67834 4.056 4.20515 2.78447 5.1427 1.84692C6.08026 0.909367 7.35179 0.382553 8.67834 0.382553C10.0049 0.382553 11.2764 0.909367 12.214 1.84692C13.1515 2.78447 13.6783 4.056 13.6783 5.382Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.67834 7.382C9.78291 7.382 10.6783 6.48657 10.6783 5.382C10.6783 4.27743 9.78291 3.382 8.67834 3.382C7.57377 3.382 6.67834 4.27743 6.67834 5.382C6.67834 6.48657 7.57377 7.382 8.67834 7.382Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </button>
            ) : (
                <button
                    onClick={handleGoToLocation}
                    className="flex items-center justify-center"
                    style={{
                        width: '327px',
                        height: '62px',
                        backgroundColor: '#ff7622',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        gap: '8px',
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'Sen, sans-serif',
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#ffffff',
                        }}
                    >
                        LOKASI ANDA
                    </span>

                    {/* Map Pin Icon */}
                    <div className="relative" style={{ width: 32, height: 32 }}>
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                width: 32,
                                height: 32,
                                backgroundColor: '#ffffff',
                                opacity: 0.2,
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.6783 5.382C13.6783 9.382 8.67834 14.382 8.67834 14.382C8.67834 14.382 3.67834 9.382 3.67834 5.382C3.67834 4.056 4.20515 2.78447 5.1427 1.84692C6.08026 0.909367 7.35179 0.382553 8.67834 0.382553C10.0049 0.382553 11.2764 0.909367 12.214 1.84692C13.1515 2.78447 13.6783 4.056 13.6783 5.382Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.67834 7.382C9.78291 7.382 10.6783 6.48657 10.6783 5.382C10.6783 4.27743 9.78291 3.382 8.67834 3.382C7.57377 3.382 6.67834 4.27743 6.67834 5.382C6.67834 6.48657 7.57377 7.382 8.67834 7.382Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </button>
            )}
        </div>
    );
}
