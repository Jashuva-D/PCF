export const CMSInfo: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#0D2499" }) => (
    <svg width={size} height={size} viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="25" fill="#E6ECFF"/>
        <circle cx="25" cy="25" r="13" fill={color}/>
        <rect x="24" y="23" width="3" height="8" fill="white"/>
        <rect x="24" y="17" width="3" height="2" fill="white"/>
    </svg>
);
