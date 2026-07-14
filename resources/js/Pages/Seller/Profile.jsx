import { Head, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import SellerTabBar from '@/Components/SellerTabBar';

const backArrow = (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
        <path d="M6 11L1 6L6 1" stroke="#181C2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const UserIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#FB6F3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#FB6F3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SettingsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#413DFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31073 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81311 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80617 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31073 4.6 9C4.73311 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.3357 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81311 8.92 4.68H8.95C9.24577 4.55324 9.49802 4.34276 9.67572 4.07447C9.85342 3.80617 9.94869 3.49179 9.95 3.17V3C9.95 2.46957 10.1607 1.96086 10.5358 1.58579C10.9109 1.21071 11.4196 1 11.95 1C12.4804 1 12.9891 1.21071 13.3642 1.58579C13.7393 1.96086 13.95 2.46957 13.95 3V3.09C13.9577 3.42099 14.0649 3.742 14.2575 4.0113C14.4501 4.28059 14.7193 4.48572 15.03 4.6C15.3316 4.73311 15.6662 4.77282 15.9906 4.714C16.315 4.65519 16.6143 4.50054 16.85 4.27L16.91 4.21C17.0957 4.02405 17.3163 3.87653 17.5591 3.77588C17.8019 3.67523 18.0622 3.62343 18.325 3.62343C18.5878 3.62343 18.8481 3.67523 19.0909 3.77588C19.3337 3.87653 19.5543 4.02405 19.74 4.21C19.926 4.39575 20.0735 4.61632 20.1741 4.85912C20.2748 5.10192 20.3266 5.36217 20.3266 5.625C20.3266 5.88783 20.2748 6.14808 20.1741 6.39088C20.0735 6.63368 19.926 6.85425 19.74 7.04L19.68 7.1C19.4495 7.3357 19.2948 7.63502 19.236 7.95941C19.1772 8.28381 19.2169 8.61838 19.35 8.92C19.4768 9.21577 19.6872 9.46802 19.9555 9.64572C20.2238 9.82342 20.5382 9.91869 20.86 9.92H21C21.5304 9.92 22.0391 10.1307 22.4142 10.5058C22.7893 10.8809 23 11.3896 23 11.92C23 12.4504 22.7893 12.9591 22.4142 13.3342C22.0391 13.7093 21.5304 13.92 21 13.92H20.91C20.579 13.9277 20.258 14.0349 19.9887 14.2275C19.7194 14.4201 19.5143 14.6893 19.4 15Z" stroke="#413DFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const WithdrawalIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22.8811 0.253662H1.11894C0.500974 0.253662 0 0.754636 0 1.3726V4.67969C0 5.29765 0.500974 5.79863 1.11894 5.79863H4.44592V10.2744C3.8591 10.9457 1.39246 13.86 1.09407 15.7895C1.09221 15.8143 1.09221 15.8393 1.09407 15.8641V23.2491C1.09407 23.5237 1.31674 23.7464 1.59138 23.7464H7.61873C7.78148 23.7462 7.93378 23.6663 8.02652 23.5326L10.5727 19.8674C10.6046 19.8204 10.6281 19.7683 10.6424 19.7133C10.6424 19.6337 10.9059 18.7485 11.1993 17.5351H19.0568C19.3314 17.5351 19.5541 17.3124 19.5541 17.0377V5.79863H22.8811C23.499 5.79863 24 5.29765 24 4.67969V1.3726C24 0.754636 23.499 0.253662 22.8811 0.253662ZM11.2242 12.2487C10.8576 14.6483 10.3511 17.0246 9.70742 19.3651L7.35516 22.7468H2.08371V15.9238C2.27766 14.7899 3.49109 13.0494 4.44592 11.8508V17.0377C4.44592 17.3124 4.66859 17.5351 4.94322 17.5351H6.7385C6.79979 17.5346 6.86053 17.5228 6.91753 17.5002L6.97223 17.4704C7.00785 17.4529 7.04124 17.4312 7.0717 17.4058L7.11645 17.356C7.13952 17.3284 7.15953 17.2984 7.17613 17.2665L7.20597 17.2019C7.20597 17.2019 7.20597 17.2019 7.20597 17.167C7.70327 15.327 8.7874 12.1492 9.60796 11.4431C10.1649 10.9457 10.4882 10.891 10.6274 10.891C10.7325 10.8887 10.8323 10.9367 10.896 11.0203C11.1396 11.3816 11.2552 11.814 11.2242 12.2487ZM18.5595 16.5404H11.438C11.7464 15.1927 12.0597 13.6411 12.2138 12.368C12.2745 11.6587 12.0747 10.9516 11.6519 10.3788C11.4029 10.088 11.0401 9.91931 10.6573 9.91632C10.0238 9.97215 9.43116 10.2526 8.98632 10.707C7.83257 11.7017 6.72855 15.327 6.37547 16.5603H5.44053V3.54583H18.5595V16.5404ZM23.0054 4.67471C23.0054 4.7434 22.9498 4.79904 22.8811 4.79904H19.5541V3.54583H20.4542C20.7288 3.54583 20.9515 3.32316 20.9515 3.04852C20.9515 2.77389 20.7288 2.55122 20.4542 2.55122H3.54579C3.27116 2.55122 3.04849 2.77389 3.04849 3.04852C3.04849 3.32316 3.27116 3.54583 3.54579 3.54583H4.45089V4.82391H1.11894C1.05025 4.82391 0.994613 4.76827 0.994613 4.69958V1.3726C0.994613 1.30391 1.05025 1.24827 1.11894 1.24827H22.8811C22.9498 1.24827 23.0054 1.30391 23.0054 1.3726V4.67471Z" fill="#FF7622" />
    </svg>
);

const ReceiptIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8.22949 15.1419V3.83081L9.48628 4.4592L10.7431 3.83081L11.9975 4.4592L13.2688 3.83081L14.5134 4.4592L15.762 3.83081L17.016 4.4592L18.2838 3.83081L19.541 4.4592L20.7974 3.83081V12.6283" stroke="#18CFE8" strokeWidth="1.25679" strokeLinejoin="round" />
        <path d="M20.7972 12.6284V17.0272C20.7972 17.8605 20.4662 18.6597 19.8769 19.2489C19.2877 19.8381 18.4885 20.1691 17.6552 20.1691V20.1691C16.8219 20.1691 16.0228 19.8381 15.4335 19.2489C14.8443 18.6597 14.5133 17.8605 14.5133 17.0272V15.142H3.83057C3.74784 15.1413 3.6658 15.157 3.58923 15.1883C3.51265 15.2197 3.44309 15.2659 3.38459 15.3244C3.32609 15.3829 3.27983 15.4525 3.24851 15.529C3.21719 15.6056 3.20144 15.6877 3.20217 15.7704C3.20217 18.284 3.46688 20.1691 6.34414 20.1691H17.6552" stroke="#18CFE8" strokeWidth="1.25679" strokeLinejoin="round" />
        <path d="M13.2567 10.7433H18.2839M10.7432 7.60132H18.2839" stroke="#18CFE8" strokeWidth="1.25679" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CommandIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M18 3C17.2044 3 16.4413 3.31607 15.8787 3.87868C15.3161 4.44129 15 5.20435 15 6V18C15 18.7956 15.3161 19.5587 15.8787 20.1213C16.4413 20.6839 17.2044 21 18 21C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 17.2044 20.6839 16.4413 20.1213 15.8787C19.5587 15.3161 18.7956 15 18 15H6C5.20435 15 4.44129 15.3161 3.87868 15.8787C3.31607 16.4413 3 17.2044 3 18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21C6.79565 21 7.55871 20.6839 8.12132 20.1213C8.68393 19.5587 9 18.7956 9 18V6C9 5.20435 8.68393 4.44129 8.12132 3.87868C7.55871 3.31607 6.79565 3 6 3C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6C3 6.79565 3.31607 7.55871 3.87868 8.12132C4.44129 8.68393 5.20435 9 6 9H18C18.7956 9 19.5587 8.68393 20.1213 8.12132C20.6839 7.55871 21 6.79565 21 6C21 5.20435 20.6839 4.44129 20.1213 3.87868C19.5587 3.31607 18.7956 3 18 3Z" stroke="#2AE1E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const LogoutIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#D20F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 10L12 15L17 10" stroke="#D20F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 15V3" stroke="#D20F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronRight = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M13.75 20L18.75 15L13.75 10" stroke="#747783" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const iconCircleStyle = {
    width: 48, height: 48, borderRadius: '50%', background: '#ffffff', display: 'flex',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
};

function MenuRow({ icon, label, value, right, onClick, style }) {
    return (
        <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', padding: '16px 16px', cursor: onClick ? 'pointer' : 'default', ...style }}>
            <div style={iconCircleStyle}>{icon}</div>
            <span style={{ flex: 1, marginLeft: 14, fontSize: 15, fontFamily: 'Sen, sans-serif', color: '#333333' }}>{label}</span>
            {value && <span style={{ fontSize: 17, fontWeight: 700, fontFamily: 'Sen, sans-serif', color: '#9c9ba6', marginRight: 12 }}>{value}</span>}
            {right}
        </div>
    );
}

const dividerStyle = { height: 1, background: '#e8e8e8', marginLeft: 78, marginRight: 16 };

export default function Profile({ user, orderCount }) {
    return (
        <>
            <Head title="My Profile" />
            <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: 'Sen, sans-serif', paddingBottom: 100, position: 'relative' }}>
                {/* Orange Header */}
                <div style={{ background: '#ff7622', height: 271, borderRadius: '0 0 25px 25px', position: 'relative' }}>
                    {/* Top Bar */}
                    <div style={{ position: 'absolute', top: 50, left: 24, width: 45, height: 45, borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => router.visit('/seller/dashboard')}>
                        {backArrow}
                    </div>
                    <div style={{ position: 'absolute', top: 62, left: 85, fontSize: 17, fontFamily: 'Sen, sans-serif', color: '#ffffff' }}>My Profile</div>

                    {/* Balance */}
                    <div style={{ position: 'absolute', top: 119, left: 0, right: 0, textAlign: 'center' }}>
                        <div style={{ fontSize: 16, fontFamily: 'Sen, sans-serif', color: '#ffffff' }}>Available Balance</div>
                        <div style={{ fontSize: 40, fontWeight: 700, fontFamily: 'Sen, sans-serif', color: '#ffffff' }}>${user.balance.toFixed(2)}</div>
                    </div>

                    {/* Withdraw Button */}
                    <div style={{ position: 'absolute', top: 204, left: '50%', transform: 'translateX(-50%)' }}>
                        <button onClick={() => router.visit('/seller/withdraw/success')} style={{ width: 100, height: 37, borderRadius: 10, border: '1px solid #ffffff', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                            <span style={{ fontSize: 14, fontFamily: 'Sen, sans-serif', color: '#ffffff' }}>Withdraw</span>
                        </button>
                    </div>
                </div>

                {/* Menu Cards */}
                <div style={{ padding: '0 24px', marginTop: 25 }}>
                    {/* Card 1: Personal Info + Settings */}
                    <div style={{ background: '#f6f6f6', borderRadius: 15, marginBottom: 15 }}>
                        <MenuRow
                            icon={<UserIcon />}
                            label="Personal Info"
                            right={<ChevronRight />}
                            onClick={() => router.visit('/seller/personal-info')}
                        />
                        <div style={dividerStyle} />
                        <MenuRow
                            icon={<SettingsIcon />}
                            label="Settings"
                            right={<ChevronRight />}
                            onClick={() => router.visit('/seller/settings')}
                        />
                    </div>

                    {/* Card 2: Withdrawal History + Orders */}
                    <div style={{ background: '#f6f6f6', borderRadius: 15, marginBottom: 15 }}>
                        <MenuRow
                            icon={<WithdrawalIcon />}
                            label="Withdrawal History"
                            right={<ChevronRight />}
                            onClick={() => router.visit('/seller/withdrawal-history')}
                        />
                        <div style={dividerStyle} />
                        <MenuRow
                            icon={<ReceiptIcon />}
                            label="Number of Orders"
                            value={orderCount > 999 ? (orderCount / 1000).toFixed(0) + 'K' : String(orderCount)}
                        />
                    </div>

                    {/* Card 3: User Reviews */}
                    <div style={{ background: '#f6f6f6', borderRadius: 15, marginBottom: 15 }}>
                        <MenuRow
                            icon={<CommandIcon />}
                            label="User Reviews"
                            right={<ChevronRight />}
                            onClick={() => router.visit('/seller/reviews')}
                        />
                    </div>

                    {/* Card 4: Log Out */}
                    <div style={{ background: '#f6f6f6', borderRadius: 15 }}>
                        <MenuRow
                            icon={<LogoutIcon />}
                            label="Log Out"
                            right={<ChevronRight />}
                            onClick={async () => {
                                const result = await Swal.fire({
                                    title: 'Log Out',
                                    text: 'Are you sure you want to log out?',
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#fc6e2a',
                                    cancelButtonColor: '#a0a5ba',
                                    confirmButtonText: 'Yes',
                                    cancelButtonText: 'Cancel',
                                });
                                if (result.isConfirmed) {
                                    router.post('/logout');
                                }
                            }}
                        />
                    </div>
                </div>
                <SellerTabBar currentPath="/seller/menu" />
            </div>
        </>
    );
}