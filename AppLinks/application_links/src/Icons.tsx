import * as React from "react";

export const EnvironmentIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64" fill="none">
        <title>Development Environment Cube Icon</title>
        <circle cx="32" cy="32" r="23" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1.6" />
        <path d="M32 19L43 25.25V38.75L32 45L21 38.75V25.25L32 19Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M21 25.25L32 31.5L43 25.25" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M32 31.5V45" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

export const OpenInNewWindowIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 3h7v7"/>
        <path d="M10 14L21 3"/>
        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>
    </svg>
);

export const ApplicationIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 72 72" fill="none">
        <defs>
            <mask id="windowCutout">
                <rect width="72" height="72" fill="white" />
                <circle cx="52" cy="52" r="13.5" fill="black" />
            </mask>
        </defs>
        <g mask="url(#windowCutout)" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="8" width="48" height="48" rx="5" />
            <path d="M6 20H54" />
            <circle cx="12" cy="14" r="1.4" fill={color} />
            <circle cx="18" cy="14" r="1.4" fill={color} />
            <circle cx="24" cy="14" r="1.4" fill={color} />
            <rect x="12" y="26" width="13" height="13" rx="2" />
            <path d="M30 28H48" />
            <path d="M30 33H48" />
            <path d="M30 38H40" />
            <rect x="12" y="45" width="8" height="8" rx="1.5" />
            <rect x="23" y="45" width="8" height="8" rx="1.5" />
            <rect x="34" y="45" width="8" height="8" rx="1.5" />
        </g>
        <g stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="52" cy="52" r="12" />
            <path d="M52 45L58 48.5L52 52L46 48.5Z" />
            <path d="M46 48.5V56L52 59.5V52" />
            <path d="M58 48.5V56L52 59.5V52" />
        </g>
    </svg>
);
export const SearchIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "black" }) => (
    <svg width="24" height={size} viewBox="0 0 24 24" fill="none" color={color} xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7" stroke="white" stroke-opacity="0.9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 21L15 15" stroke="white" stroke-opacity="0.9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)