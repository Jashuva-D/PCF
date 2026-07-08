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
    <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="28" fill="#E6F0FF"/>
    <g transform="translate(9,9) scale(1.55)">
        <path d="M15.25 7h-2.5l-.101.007A.75.75 0 0 0 12.75 8.5h1.043l-1.653 2.314-.055.09A.75.75 0 0 0 12.75 12h2.5l.102-.007a.75.75 0 0 0-.102-1.493h-1.042l1.653-2.314.055-.09A.75.75 0 0 0 15.25 7ZM21.25 2h-3.5l-.101.007A.75.75 0 0 0 17.75 3.5h2.134l-2.766 4.347-.05.09A.75.75 0 0 0 17.75 9h3.5l.102-.007A.75.75 0 0 0 21.25 7.5h-2.133l2.766-4.347.05-.09A.75.75 0 0 0 21.25 2Z"
              fill="#0D6EFD"/>
        <path d="M12.7 5.5h2.55c.508 0 .956.158 1.316.42l.629-.989a2.251 2.251 0 0 1-1.692-2.06A7.5 7.5 0 0 0 4.505 9.24l-.005.25v4.012l-1.415 3.16a.95.95 0 0 0 .867 1.338h16.1a.95.95 0 0 0 .866-1.338l-1.418-3.16V10.5h-1.75c-.134 0-.265-.011-.39-.032a2.25 2.25 0 0 1-1.807 3.012l-.05.006-.203.014h-2.55c-1.73 0-2.765-1.835-1.992-3.297l.024-.045.108-.175.382-.536a2.25 2.25 0 0 1 1.174-3.927l.05-.006.203-.014ZM14.958 19.003a3 3 0 0 1-5.916 0h5.916Z"
              fill="#0D6EFD"/>
    </g>
</svg>
);

export const CMSExecutiveDashboardIcon: React.FC<{ size?: number, color?: string }> = ({ size = 64, color = "#0D2499" }) => (
    <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="28" fill="#E6F0FF"/>
    <g transform="translate(7,7) scale(1.75)">
        <path d="M18.832 3.445A1 1 0 0 0 18 3H6l-.125.008a1 1 0 0 0-.77.545l-3 6-.052.125a1 1 0 0 0 .204.991l8.982 9.983a.976.976 0 0 0 .532.322l.112.02a1.009 1.009 0 0 0 .556-.093A4.376 4.376 0 0 1 12 19v-.5a2.5 2.5 0 0 1 2.5-2.5h.95a3.75 3.75 0 1 1 5.742-4.719l.551-.612.084-.107a1 1 0 0 0 .067-1.01l-3-6-.062-.107ZM9.423 11h5.153L12 17.342 9.423 11Zm-4.177 0h2.018l1.66 4.087L5.246 11Zm1.372-6h2.004l-1.3 4H4.618l2-4Zm4.108 0h2.547l1.299 4H9.427l1.299-4Zm4.651 0h2.004l2 4h-2.704l-1.3-4ZM21.5 17a1.5 1.5 0 0 1 1.5 1.5v.5c0 1.971-1.86 4-5 4-3.14 0-5-2.029-5-4v-.5a1.5 1.5 0 0 1 1.5-1.5h7ZM18 10.5a2.75 2.75 0 1 1 0 5.5 2.75 2.75 0 0 1 0-5.5Z"
              fill="#0D6EFD"/>
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

export const CMSHCTADDashBoardIcon: React.FC<{size?: number}> = ({ size = 64}) => (
    <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="28" fill="#E6F0FF"/>
    <g transform="translate(7,7) scale(1.75)">
        <path d="M6.25 3A3.25 3.25 0 0 0 3 6.25v8.5A3.25 3.25 0 0 0 6.25 18h8.5A3.25 3.25 0 0 0 18 14.75v-8.5A3.25 3.25 0 0 0 14.75 3h-8.5Zm6.5 4.5a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm.75 3.25a1.5 1.5 0 0 1 1.5 1.5v.5c0 .496-.086.86-.254 1.16-.168.303-.43.562-.818.83-.733.503-1.858.76-3.428.76-1.32 0-2.445-.257-3.24-.76-.419-.266-.73-.524-.938-.83-.205-.3-.322-.664-.322-1.16v-.5a1.5 1.5 0 0 1 1.5-1.5h6Z" fill="#0D6EFD"/>
        <path d="M6.01 19a3.248 3.248 0 0 0 2.74 1.5h6.5c2.9 0 5.25-2.35 5.25-5.25v-6.5c0-1.15-.598-2.162-1.5-2.74v9.24A3.75 3.75 0 0 1 15.25 19H6.01Z" fill="#0D6EFD"/>
    </g>
</svg>
)


export const CMSAuditingDashboardIcon: React.FC<{ size?: number }> = ({ size = 64 }) => (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="28" fill="#E8F0FE" />

        <g transform="translate(4,4) scale(0.88)">
            <rect x="17" y="14" width="24" height="34" rx="4" stroke="#1A73E8" strokeWidth="2.8" />

            <rect x="24" y="10" width="10" height="6" rx="3" fill="#E8F0FE" stroke="#1A73E8" strokeWidth="2.8" />

            <path d="M22 23L24 25L28 21" stroke="#1A73E8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

            <path d="M22 30L24 32L28 28" stroke="#1A73E8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

            <path d="M22 37L24 39L28 35" stroke="#1A73E8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

            <line x1="31" y1="23" x2="36" y2="23" stroke="#1A73E8" strokeWidth="2.4" strokeLinecap="round" />

            <line x1="31" y1="30" x2="36" y2="30" stroke="#1A73E8" strokeWidth="2.4" strokeLinecap="round" />

            <line x1="31" y1="37" x2="34" y2="37" stroke="#1A73E8" strokeWidth="2.4" strokeLinecap="round" />

            <circle cx="42" cy="40" r="6.5" fill="white" stroke="#1A73E8" strokeWidth="2.8" />

            <line x1="46.5" y1="44.5" x2="51.5" y2="49.5" stroke="#1A73E8" strokeWidth="3" strokeLinecap="round" />
        </g>
    </svg>
);




//Stay organized with your applications and their important details.


