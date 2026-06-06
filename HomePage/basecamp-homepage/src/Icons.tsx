export const CMSInfo: React.FC<{ size?: number, color?: string }> = ({ size = 30, color = "#0D2499" }) => (
    <svg width={size} height={size} viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="25" fill="#E6ECFF"/>
        <circle cx="25" cy="25" r="13" fill={color}/>
        <rect x="24" y="23" width="3" height="8" fill="white"/>
        <rect x="24" y="17" width="3" height="2" fill="white"/>
    </svg>
);

export const CMSAlertIcon: React.FC<{ size?: number, color?: string }> = ({ size = 64, color = "#0D2499" }) => (
    <svg width={size} height={size} viewBox={`0 0 64 64`} xmlns="http://www.w3.org/2000/svg">
        <circle cx={32} cy={32} r={32} fill="#E6ECFF" />
        <g fill="none" stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 13.5C9.8 17.9 7 24.1 7 30.8" />
            <path d="M19.5 18.5C16.5 21.6 14.8 25.9 14.8 30.8" />
            <path d="M49.5 13.5C54.2 17.9 57 24.1 57 30.8" />
            <path d="M44.5 18.5C47.5 21.6 49.2 25.9 49.2 30.8" />
            <path d="M28 11.5C28 9.3 29.8 7.5 32 7.5C34.2 7.5 36 9.3 36 11.5" />
            <path d="M20.5 49V29.5C20.5 23.1 25.6 18 32 18C38.4 18 43.5 23.1 43.5 29.5V49" />
            <path d="M15 52H49" />
            <path d="M15 52C18.4 49.7 20.5 45.8 20.5 41.5" />
            <path d="M49 52C45.6 49.7 43.5 45.8 43.5 41.5" />
            <path d="M27.5 56C29 58.2 35 58.2 36.5 56" />
        </g>

    </svg>
);

export const CMSNotifications: React.FC<{ size?: number, color?: string }> = ({ size = 64, color = "#0D2499" }) => (
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="bellBg" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stop-color="#F5FAFF" />
                <stop offset="100%" stop-color="#DDEBFF" />
            </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#bellBg)" />
        <g fill="none" stroke="#0D6EFD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M24 21.5L21.8 23.7" />
            <path d="M27 19.2L26.2 21.2" />
            <path d="M29.5 22.2C29.5 20.6 30.8 19.3 32.4 19.3C34 19.3 35.3 20.6 35.3 22.2" />
            <path d="M32.4 22.2V24" />
            <path d="M25 39.5V30C25 25.2 28.1 22 32 22C35.9 22 39 25.2 39 30V39.5" />
            <path d="M22 39.5H42" />
            <path d="M22 39.5C24 37.5 25 35.2 25 31.5" />
            <path d="M42 39.5C40 37.5 39 35.2 39 31.5" />
            <path d="M29.5 27.8C30.1 26.4 31 25.5 32.5 25" />
            <path d="M29 44C30.4 45.6 33.6 45.6 35 44" />
        </g>
    </svg>
);


// export const CMSMyAppsIcon: React.FC<{ size?: number, color?: string }> = ({ size = 64, color = "#0D2499" }) => (
//     <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="32" cy="32" r="32" fill="#E6F0FF" />
//         <g stroke="#0D2499" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
//             <rect x="18" y="20" width="28" height="24" rx="3" />
//             <circle cx="38" cy="24" r="1.5" fill="#0D2499" stroke="none" />
//             <circle cx="42" cy="24" r="1.5" fill="#0D2499" stroke="none" />
//             <circle cx="46" cy="24" r="1.5" fill="#0D2499" stroke="none" />
//             <line x1="22" y1="30" x2="42" y2="30" />
//             <line x1="22" y1="35" x2="38" y2="35" />
//             <line x1="22" y1="40" x2="40" y2="40" />
//         </g>
//     </svg>
// );

export const CMSMyAppsIcon2: React.FC<{ size?: number, color?: string }> = ({ size = 64, color = "#0D2499" }) => (
    <svg width="64" height="64" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#F5FAFF" />
            <stop offset="100%" stop-color="#DDEEFF" />
        </radialGradient>
    </defs>

    <circle cx="24" cy="24" r="23.4" fill="url(#bg)" />

    <rect x="8.9" y="12.2" width="30.2" height="26.3" rx="2.2"
        fill="none" stroke="#0D6EFD" stroke-width="2.25" />

    <line x1="8.9" y1="17.3" x2="39.1" y2="17.3"
        stroke="#0D6EFD" stroke-width="2.25" />

    <circle cx="31.4" cy="14.5" r="0.7" fill="#0D6EFD" />
    <circle cx="34.0" cy="14.5" r="0.7" fill="#0D6EFD" />
    <circle cx="36.6" cy="14.5" r="0.7" fill="#0D6EFD" />

    <circle cx="17.1" cy="23.4" r="3.4"
        fill="none" stroke="#0D6EFD" stroke-width="2.25" />

    <path d="M11.3 34.7
       V31.9
       C11.3 28.9 13.8 27.4 17.1 27.4
       C20.4 27.4 22.9 28.9 22.9 31.9
       V34.7 Z"
        fill="none" stroke="#0D6EFD" stroke-width="2.25"
        stroke-linejoin="round" />

    <line x1="24.6" y1="21.6" x2="37.0" y2="21.6"
        stroke="#0D6EFD" stroke-width="2.25" stroke-linecap="round" />
    <line x1="24.6" y1="24.8" x2="37.0" y2="24.8"
        stroke="#0D6EFD" stroke-width="2.25" stroke-linecap="round" />
    <line x1="24.6" y1="28.1" x2="37.0" y2="28.1"
        stroke="#0D6EFD" stroke-width="2.25" stroke-linecap="round" />
    <line x1="24.6" y1="31.4" x2="34.9" y2="31.4"
        stroke="#0D6EFD" stroke-width="2.25" stroke-linecap="round" />
    <line x1="24.6" y1="34.2" x2="32.3" y2="34.2"
        stroke="#0D6EFD" stroke-width="2.25" stroke-linecap="round" />
</svg>
);

export const CMSMApplicationsByPlatFormIcon: React.FC<{ size?: number, color?: string }> = ({ size = 64, color = "#0D2499" }) => (
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="#E6F0FF" />
        <g fill="#0D6EFD">
            <path d="M32 17L47 25L32 33L17 25L32 17Z" />
            <path d="M17 32L21 29.9L32 35.7L43 29.9L47 32L32 40L17 32Z" />
            <path d="M17 39L21 36.9L32 42.7L43 36.9L47 39L32 47L17 39Z" />
        </g>
    </svg>
);

export const CMSMyAppsIcon: React.FC<{ size?: number }> = ({ size = 64 }) => (
    <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="28" fill="#E6F0FF"/>
    <g transform="translate(10,10)">
        <svg width="36" height="36" viewBox="0 0 24 24">
            <path d="M16.25 2a.75.75 0 0 1 .742.648L17 2.75v.749h.749a2.25 2.25 0 0 1 2.25 2.25v4.328A3.752 3.752 0 0 0 14.463 12H7.248l-.102.007a.75.75 0 0 0 0 1.486l.102.007h7.01A3.74 3.74 0 0 0 15.45 16h-.951a2.5 2.5 0 0 0-2.5 2.5v.5c0 1.1.422 2.152 1.173 3.005h-7.42a2.25 2.25 0 0 1-2.25-2.25L3.5 5.75A2.25 2.25 0 0 1 5.75 3.5l.747-.001V2.75a.75.75 0 0 1 1.494-.102l.007.102v.749H11V2.75a.75.75 0 0 1 1.494-.102l.007.102v.749h2.998V2.75a.75.75 0 0 1 .75-.75Zm-5.003 14H7.248l-.102.007a.75.75 0 0 0 0 1.486l.102.007h3.999l.102-.007a.75.75 0 0 0 0-1.486L11.247 16Zm5-8H7.249l-.102.007a.75.75 0 0 0 0 1.486l.102.007h9l.101-.007a.75.75 0 0 0 0-1.486L16.248 8ZM18 10.5c.788 0 1.498.331 2 .861a2.74 2.74 0 0 1 .75 1.889 2.74 2.74 0 0 1-.75 1.888 2.75 2.75 0 1 1-2-4.638Zm-5 8a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 23 18.5v.5c0 1.971-1.86 4-5 4-1.784 0-3.154-.654-4.006-1.58C13.346 20.715 13 19.852 13 19v-.5Z"
                  fill="#0D6EFD"/>
        </svg>
    </g>
</svg>
);




//Stay organized with your applications and their important details.


