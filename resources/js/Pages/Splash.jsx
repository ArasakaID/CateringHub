import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Splash() {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.visit('/home');
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head title="CateringHub" />
            <div
                className="min-h-screen bg-white flex items-center justify-center"
                style={{ fontFamily: 'Sen, sans-serif' }}
            >
                <img
                    src="/images/logo-signup.png"
                    alt="CateringHub"
                    className="w-[184px] h-[77px]"
                />
            </div>
        </>
    );
}
