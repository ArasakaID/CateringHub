import { router } from '@inertiajs/react';

const activeColor = '#ff7622';
const inactiveColor = '#afafaf';
const strokeWidth = 1.5;

const GridIcon = ({ color = activeColor }) => (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
        <rect x="3.125" y="3" width="7.292" height="7" rx="1" stroke={color} strokeWidth={strokeWidth} />
        <rect x="14.583" y="3" width="7.292" height="7" rx="1" stroke={color} strokeWidth={strokeWidth} />
        <rect x="3.125" y="14" width="7.292" height="7" rx="1" stroke={color} strokeWidth={strokeWidth} />
        <rect x="14.583" y="14" width="7.292" height="7" rx="1" stroke={color} strokeWidth={strokeWidth} />
    </svg>
);

const ListIcon = ({ color = inactiveColor }) => (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
        <line x1="3.125" y1="6" x2="21.875" y2="6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <line x1="3.125" y1="12" x2="21.875" y2="12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <line x1="3.125" y1="18" x2="21.875" y2="18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
);

const BellIcon = ({ color = inactiveColor }) => (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M18.875 8A6 6 0 0 0 6.875 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M10.698 21a2 2 0 0 0 3.604 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
);

const UserIcon = ({ color = inactiveColor }) => (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M4.167 21v-2a4 4 0 0 1 4-4h8.333a4 4 0 0 1 4 4v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <circle cx="12.333" cy="7" r="4" stroke={color} strokeWidth={strokeWidth} />
    </svg>
);

const tabs = [
    { path: '/seller/dashboard', icon: GridIcon, label: 'Home', activePattern: '/seller/dashboard' },
    { path: '/seller/my-food', icon: ListIcon, label: 'Menu', activePattern: '/seller/my-food' },
    { path: '/seller/add-menu', icon: () => null, label: 'Add', isCenter: true },
    { path: '/seller/running-orders', icon: BellIcon, label: 'Orders', activePattern: '/seller/running-orders' },
    { path: '/seller/menu', icon: UserIcon, label: 'Profile', activePattern: '/seller/menu' },
];

export default function SellerTabBar({ currentPath = '/seller/dashboard' }) {
    return (
        <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: 430,
            margin: '0 auto', height: 89, background: '#ffffff',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around',
            paddingTop: 12, zIndex: 50,
        }}>
            {tabs.map((tab, idx) => {
                if (tab.isCenter) {
                    return (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <button
                                onClick={() => router.visit(tab.path)}
                                style={{
                                    width: 57, height: 57, borderRadius: '50%',
                                    background: '#fff1f2', border: '1px solid #ff7622',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginTop: -8,
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <line x1="12" y1="5" x2="12" y2="19" stroke="#ff7622" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="5" y1="12" x2="19" y2="12" stroke="#ff7622" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    );
                }

                const isActive = currentPath === tab.activePattern;
                const Icon = tab.icon;
                const color = isActive ? activeColor : inactiveColor;

                return (
                    <button
                        key={idx}
                        onClick={() => router.visit(tab.path)}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                        <Icon color={color} />
                        <span style={{ fontSize: 10, fontFamily: 'Sen, sans-serif', color }}>{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
