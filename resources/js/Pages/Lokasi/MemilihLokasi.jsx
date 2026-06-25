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
            const L = leaflet.default || leaflet;
            setL(() => L);

            // Fix default icon path issue with webpack/vite
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
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

            // Custom red pin marker using divIcon
            const redIcon = L.divIcon({
                className: '',
                html: `
                    <div style="position:relative;width:40px;height:50px;">
                        <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
                            <path d="M20 0C8.96 0 0 9.12 0 20.36C0 33.88 17.2 48.12 18.56 49.28C19.12 49.76 19.56 50 20 50C20.44 50 20.88 49.76 21.44 49.28C22.8 48.12 40 33.88 40 20.36C40 9.12 31.04 0 20 0Z" fill="#f14237"/>
                            <circle cx="20" cy="19" r="9" fill="white"/>
                            <circle cx="20" cy="19" r="5.5" fill="#f14237"/>
                            <circle cx="20" cy="19" r="9" stroke="white" stroke-width="2"/>
                            <path d="M20 2C10.63 2 3 9.82 3 19.48C3 29.15 15.5 40.08 18.56 42.84C19.04 43.28 19.52 43.48 20 43.48C20.48 43.48 20.96 43.28 21.44 42.84C24.5 40.08 37 29.15 37 19.48C37 9.82 29.37 2 20 2Z" stroke="white" stroke-width="1.5"/>
                        </svg>
                    </div>
                `,
                iconSize: [40, 50],
                iconAnchor: [20, 50],
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

            {/* Top Bar — floating over map, no background */}
            <div className="absolute top-0 left-0 right-0 z-[1000] flex items-center px-4 pt-12">
                <button
                    onClick={() => window.history.length > 1 ? window.history.back() : router.get(route('location.access'))}
                    className="flex items-center justify-center flex-shrink-0"
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
                <div ref={mapRef} className="absolute inset-0 w-full h-full" style={{ minHeight: '100%' }} />

                {/* Tooltip above pin */}
                <div
                    className="absolute z-[1000]"
                    style={{
                        top: 'calc(50% - 85px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    <div className="flex flex-col items-center">
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
            <div className="flex justify-center" style={{ marginTop: '-2px' }}>
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
                            lineHeight: '75px',
                        }}
                    >
                        Simpan Lokasi
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
