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

export const CMSMyAppsIcon: React.FC<{ size?: number, color?: string }> = ({ size = 64, color = "#0D2499" }) => (
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="#E6F0FF" />
        <g stroke="#0D2499" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <rect x="18" y="20" width="28" height="24" rx="3" />
            <circle cx="38" cy="24" r="1.5" fill="#0D2499" stroke="none" />
            <circle cx="42" cy="24" r="1.5" fill="#0D2499" stroke="none" />
            <circle cx="46" cy="24" r="1.5" fill="#0D2499" stroke="none" />
            <line x1="22" y1="30" x2="42" y2="30" />
            <line x1="22" y1="35" x2="38" y2="35" />
            <line x1="22" y1="40" x2="40" y2="40" />
        </g>
    </svg>
);


//Stay organized with your applications and their important details.


