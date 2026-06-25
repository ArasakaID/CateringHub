import { Head, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function MemilihLokasi({ latitude = null, longitude = null, city = 'Yogyakarta' }) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markerRef = useRef(null);
    const [position, setPosition] = useState({
        lat: latitude || -7.7956,
        lng: longitude || 110.3695,
    });
    const [L, setL] = useState(null);

    useEffect(() => {
        import('leaflet').then((leaflet) => {
            setL(() => leaflet.default || leaflet);

            // Fix default icon path issue with webpack/vite
            delete (leaflet.default || leaflet).Icon.Default.prototype._getIconUrl;
            (leaflet.default || leaflet).Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            });
        });
    }, []);

    useEffect(() => {
        if (!L || mapInstance.current) return;

        import('leaflet/dist/leaflet.css').then(() => {
            const map = L.map(mapRef.current, {
                center: [position.lat, position.lng],
                zoom: 14,
                zoomControl: false,
                attributionControl: false,
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);

            // Custom red pin marker
            const redIcon = L.divIcon({
                className: 'custom-pin-marker',
                html: `
                    <div style="position:relative;width:36px;height:36px;">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="18" cy="17.5" rx="18" ry="17.5" fill="#f14237"/>
                            <path d="M18 8C13.58 8 10 11.47 10 15.75C10 21.33 16.16 27.38 17.28 28.47C17.68 28.86 18.32 28.86 18.72 28.47C19.84 27.38 26 21.33 26 15.75C26 11.47 22.42 8 18 8Z" fill="#f14237"/>
                            <path d="M18 19C20.2091 19 22 17.2091 22 15C22 12.7909 20.2091 11 18 11C15.7909 11 14 12.7909 14 15C14 17.2091 15.7909 19 18 19Z" fill="white"/>
                            <path d="M18 11C15.79 11 14 12.79 14 15C14 17.21 15.79 19 18 19C20.21 19 22 17.21 22 15C22 12.79 20.21 11 18 11Z" stroke="white" stroke-width="1.5"/>
                            <path d="M18 8C13.58 8 10 11.47 10 15.75C10 21.33 16.16 27.38 17.28 28.47C17.68 28.86 18.32 28.86 18.72 28.47C19.84 27.38 26 21.33 26 15.75C26 11.47 22.42 8 18 8Z" stroke="white" stroke-width="1.5"/>
                        </svg>
                    </div>
                `,
                iconSize: [36, 36],
                iconAnchor: [18, 35],
            });

            const marker = L.marker([position.lat, position.lng], { icon: redIcon, draggable: true }).addTo(map);

            marker.on('dragend', function (e) {
                const latlng = e.target.getLatLng();
                setPosition({ lat: latlng.lat, lng: latlng.lng });
            });

            markerRef.current = marker;
            mapInstance.current = map;

            // Invalidate after a short delay to handle container size
            setTimeout(() => map.invalidateSize(), 100);
        });

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [L]);

    const handleSave = () => {
        router.post(route('location.save-from-map'), {
            latitude: position.lat,
            longitude: position.lng,
            city: city,
        });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Sen, sans-serif' }}>
            <Head title="Pilih Lokasi" />

            {/* Top Bar */}
            <div className="flex items-center px-4 py-3 z-10 bg-white">
                <button
                    onClick={() => window.history.length > 1 ? window.history.back() : router.get(route('location.access'))}
                    className="flex items-center justify-center"
                    style={{
                        width: '45px',
                        height: '45px',
                        backgroundColor: '#212029',
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L1.70711 8.29289C1.31658 8.68342 1.31658 9.31658 1.70711 9.70711L9 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <span
                    className="ml-4"
                    style={{
                        fontFamily: 'Sen, sans-serif',
                        fontSize: '17px',
                        fontWeight: 400,
                        color: '#181c2e',
                    }}
                >
                    {city}
                </span>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative overflow-hidden">
                <div ref={mapRef} className="absolute inset-0 w-full h-full" style={{ minHeight: '400px' }} />

                {/* Tooltip */}
                <div
                    className="absolute z-[1000]"
                    style={{
                        top: 'calc(50% - 120px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    <div
                        className="relative flex flex-col items-center"
                    >
                        <div
                            style={{
                                backgroundColor: '#32343e',
                                borderRadius: '3px',
                                padding: '4px 8px',
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '9px',
                                color: '#ffffff',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Move to edit location
                        </div>
                        {/* Arrow */}
                        <div
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: '5px solid transparent',
                                borderRight: '5px solid transparent',
                                borderTop: '6px solid #32343e',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Button */}
            <div className="flex justify-center pb-4" style={{ marginTop: '-20px' }}>
                <button
                    onClick={handleSave}
                    className="flex items-center justify-center"
                    style={{
                        width: '421px',
                        height: '75px',
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
                        simpan LOkasi
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
            </div>
        </div>
    );
}
