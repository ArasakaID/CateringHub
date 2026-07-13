import { Head, router } from '@inertiajs/react';
import SellerTabBar from '@/Components/SellerTabBar';

const ingredientIcons = {
    salt: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="8" y="3" width="8" height="18" rx="2" stroke="#fb6d3a" strokeWidth="1.5"/><line x1="10" y1="8" x2="14" y2="8" stroke="#fb6d3a" strokeWidth="1.5"/><line x1="10" y1="12" x2="14" y2="12" stroke="#fb6d3a" strokeWidth="1.5"/><line x1="10" y1="16" x2="12" y2="16" stroke="#fb6d3a" strokeWidth="1.5"/></svg>),
    chicken: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3C12 3 7 5 5 10C3 15 5 20 5 20L9 18L12 21L15 18L19 20C19 20 21 15 19 10C17 5 12 3 12 3Z" stroke="#fb6d3a" strokeWidth="1.5" fill="none"/><circle cx="12" cy="11" r="2" stroke="#fb6d3a" strokeWidth="1.5"/></svg>),
    onion: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="14" rx="6" ry="7" stroke="#fb6d3a" strokeWidth="1.5"/><circle cx="12" cy="12" r="2" stroke="#fb6d3a" strokeWidth="1.5"/><line x1="12" y1="7" x2="12" y2="4" stroke="#fb6d3a" strokeWidth="1.5"/></svg>),
    garlic: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="13" rx="5" ry="8" stroke="#fb6d3a" strokeWidth="1.5"/><circle cx="12" cy="11" r="2" stroke="#fb6d3a" strokeWidth="1.5"/><line x1="12" y1="5" x2="12" y2="2" stroke="#fb6d3a" strokeWidth="1.5"/></svg>),
    peppers: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4C12 4 17 7 17 14C17 17 15 20 12 22C9 20 7 17 7 14C7 7 12 4 12 4Z" stroke="#fb6d3a" strokeWidth="1.5" fill="none"/><line x1="12" y1="4" x2="12" y2="2" stroke="#fb6d3a" strokeWidth="1.5"/></svg>),
    ginger: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3C12 3 8 7 8 12C8 16 10 20 12 22C14 20 16 16 16 12C16 7 12 3 12 3Z" stroke="#fb6d3a" strokeWidth="1.5" fill="none"/><circle cx="12" cy="12" r="2" stroke="#fb6d3a" strokeWidth="1.5"/></svg>),
    broccoli: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 8 6 8 12C8 16 10 20 12 22C14 20 16 16 16 12C16 6 12 2 12 2Z" stroke="#fb6d3a" strokeWidth="1.5" fill="none"/><circle cx="12" cy="10" r="3" stroke="#fb6d3a" strokeWidth="1.5"/></svg>),
    orange: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="#fb6d3a" strokeWidth="1.5" fill="none"/><circle cx="12" cy="12" r="4" stroke="#fb6d3a" strokeWidth="1.5" fill="none"/><line x1="12" y1="4" x2="13" y2="8" stroke="#fb6d3a" strokeWidth="1.5"/></svg>),
    walnut: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><ellipse cx="14" cy="12" rx="7" ry="8" stroke="#fb6d3a" strokeWidth="1.5" transform="rotate(-20 14 12)"/><ellipse cx="10" cy="12" rx="7" ry="8" stroke="#fb6d3a" strokeWidth="1.5" transform="rotate(20 10 12)"/><circle cx="12" cy="12" r="2" stroke="#fb6d3a" strokeWidth="1.5"/></svg>),
};

const StarIcon = () => (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M8.5 1.5L10.6 6.1L15.5 6.8L11.9 10.3L12.8 15.2L8.5 12.9L4.2 15.2L5.1 10.3L1.5 6.8L6.4 6.1L8.5 1.5Z" stroke="#fb6d3a" strokeWidth="1" fill="#fb6d3a" />
    </svg>
);

const LocationIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="5" r="2" stroke="#afafaf" strokeWidth="1" fill="none"/>
        <path d="M10 5C10 7.5 6 11 6 11C6 11 2 7.5 2 5C2 2.79 3.79 1 6 1C8.21 1 10 2.79 10 5Z" stroke="#afafaf" strokeWidth="1" fill="none"/>
    </svg>
);

function IngredientCircle({ icon, name, allergy }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 60 }}>
            <div style={{
                width: 50, height: 50, borderRadius: '50%',
                background: '#ffebe4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                {ingredientIcons[icon] || ingredientIcons.salt}
            </div>
            <span style={{ fontSize: 12, color: '#747783', textAlign: 'center', lineHeight: '14px' }}>
                {name}{allergy ? <span style={{ color: '#fb6d3a', fontSize: 10 }}> (Alergy)</span> : ''}
            </span>
        </div>
    );
}

export default function FoodDetails({ menu }) {
    if (!menu) {
        return <div style={{ fontFamily: 'Sen, sans-serif', padding: 40, textAlign: 'center', color: '#9c9ba6' }}>Menu tidak ditemukan</div>;
    }

    const menuData = menu;
    const { ingredients = [], badges = [], location = '', description = '', rating = 0, review_count = 0 } = menuData;

    return (
        <>
            <Head title={menuData.name + ' - Food Details'} />
            <div style={{ fontFamily: 'Sen, sans-serif', background: '#ffffff', minHeight: '100vh', position: 'relative' }}>
                {/* Top Bar */}
                <div style={{ display: 'flex', alignItems: 'center', padding: '24px 24px 0', gap: 16 }}>
                    <button
                        onClick={() => router.get('/seller/my-food')}
                        style={{
                            width: 45, height: 45, borderRadius: '50%', background: '#ecf0f4',
                            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0
                        }}
                    >
                        <svg width="5" height="10" viewBox="0 0 5 10" fill="none">
                            <path d="M4 1L1 5L4 9" stroke="#181c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <span style={{ fontSize: 17, color: '#181c2e', lineHeight: '22px', flex: 1 }}>Food Details</span>
                    <button
                        onClick={() => router.get('/seller/food/' + menuData.id + '/edit')}
                        style={{
                            fontSize: 14, fontWeight: 500, color: '#fb6d3a',
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontFamily: 'Poppins, sans-serif', padding: 0,
                        }}
                    >
                        Edit
                    </button>
                </div>

                {/* Food Image */}
                <div style={{ margin: '24px 24px 0', position: 'relative' }}>
                    <img
                        src={menuData.image ? (menuData.image.startsWith('http') ? menuData.image : '/storage/' + menuData.image) : ''}
                        alt={menuData.name}
                        style={{
                            width: '100%', height: 210, borderRadius: 20,
                            objectFit: 'cover', background: '#98a8b8', display: 'block',
                        }}
                        onError={(e) => { e.target.style.background = '#98a8b8'; }}
                    />
                    {/* Badges */}
                    {badges.length > 0 && (
                        <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', gap: 8 }}>
                            {badges.map((badge, i) => (
                                <span key={i} style={{
                                    background: 'rgba(255,255,255,0.8)',
                                    borderRadius: 61, padding: '4px 16px',
                                    fontSize: 14, color: '#32343e',
                                }}>
                                    {badge}
                                </span>
                            ))}
                        </div>
                    )}
                    {/* Carousel dots */}
                    <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 4 }}>
                        <div style={{ width: 21, height: 10, borderRadius: 22, background: '#ffffff' }} />
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffffff' }} />
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffffff' }} />
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffffff' }} />
                    </div>
                </div>

                {/* Food Info */}
                <div style={{ padding: '16px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#32343e', lineHeight: '20px' }}>{menuData.name}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <LocationIcon />
                            <span style={{ fontSize: 13, color: '#afafaf' }}>{location}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                            <StarIcon />
                            <span style={{ fontSize: 14, fontWeight: 700, color: '#fb6d3a' }}>{rating}</span>
                            <span style={{ fontSize: 14, color: '#afafaf' }}>({review_count} Reviews)</span>
                        </div>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#32343e', whiteSpace: 'nowrap' }}>
                        Rp{parseInt(menuData.price).toLocaleString('en-US')}
                    </span>
                </div>

                {/* Divider */}
                <div style={{ margin: '20px 24px 0', height: 1, background: '#f0f4f9' }} />

                {/* Ingredients */}
                {ingredients.length > 0 && (
                    <div style={{ padding: '20px 24px 0' }}>
                        <span style={{ fontSize: 14, color: '#32343e', marginBottom: 16, display: 'block' }}>ingridents</span>
                        {/* Row 1 */}
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {ingredients.slice(0, 5).map((ing, i) => (
                                <IngredientCircle key={i} icon={ing.icon} name={ing.name} allergy={ing.allergy} />
                            ))}
                        </div>
                        {/* Row 2 */}
                        {ingredients.length > 5 && (
                            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
                                {ingredients.slice(5).map((ing, i) => (
                                    <IngredientCircle key={i} icon={ing.icon} name={ing.name} allergy={ing.allergy} />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Divider */}
                <div style={{ margin: '24px 24px 0', height: 1, background: '#f0f4f9' }} />

                {/* Description */}
                <div style={{ padding: '20px 24px 0' }}>
                    <span style={{ fontSize: 14, color: '#32343e', display: 'block' }}>Description</span>
                    <p style={{ fontSize: 13, color: '#747783', lineHeight: '18px', marginTop: 8, marginBottom: 0 }}>
                        {description || 'Tidak ada deskripsi'}
                    </p>
                </div>

                {/* Bottom padding */}
                <div style={{ height: 120 }} />

                {/* Bottom Tab Bar */}
                <SellerTabBar currentPath="/seller/my-food" />
            </div>
        </>
    );
}
