export const CMSInfo: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#0D2499" }) => (
    <svg width="40" height={size} viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="20" fill="#E6ECFF"/>
        <circle cx="20" cy="20" r="12" fill={color}/>
        <rect x="19" y="17" width="2" height="8" fill="white"/>
        <rect x="19" y="12" width="2" height="2" fill="white"/>
    </svg>
);
