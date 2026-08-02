import * as React from "react";

export const DetailsIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64" fill="none">
        <g stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 7h23l8 8v42H17z"/>
            <path d="M40 7v10h8"/>
            <rect x="23" y="20" width="13" height="7" rx="1" fill={color} stroke="none"/>
            <path d="M23 35h19M23 43h19M23 51h14"/>
        </g>
    </svg>
);

export const HostingDetailsIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64" fill="none">
        <g stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <rect x="12" y="9" width="40" height="12" rx="3"/>
            <rect x="12" y="26" width="40" height="12" rx="3"/>
            <rect x="12" y="43" width="40" height="12" rx="3"/>
        </g>
        <g fill={color}>
            <circle cx="19" cy="15" r="1.7"/>
            <circle cx="25" cy="15" r="1.7"/>
            <circle cx="46" cy="15" r="1.7"/>
            <circle cx="19" cy="32" r="1.7"/>
            <circle cx="25" cy="32" r="1.7"/>
            <circle cx="46" cy="32" r="1.7"/>
            <circle cx="19" cy="49" r="1.7"/>
            <circle cx="25" cy="49" r="1.7"/>
            <circle cx="46" cy="49" r="1.7"/>
        </g>
    </svg>
);

export const BusinessSystemOwnersIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64" fill="none">
        <g stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="25" cy="21" r="9"/>
            <path d="M10 50v-4c0-9 6-15 15-15s15 6 15 15v4z"/>
            <path d="M42 17a8 8 0 1 1 0 16"/>
            <path d="M43 36h2c7 0 11 5 11 12v2H44"/>
        </g>
    </svg>
);

export const ADOIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64" fill="none">
        <g stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 19l20-8 17 7v29l-18 7-19-9z"/><path d="M14 19l19 7 18-8"/>
            <path d="M33 26v28"/>
            <path d="M8 25l12-4v22L8 39z" fill={color} stroke="none"/>
        </g>
    </svg>
);

export const FundingIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64" fill="none">
        <g stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="32" cy="32" r="24"/>
            <path d="M39 22c-2-3-5-4-8-4-5 0-9 3-9 7 0 5 4 7 10 8 6 1 10 3 10 8 0 5-4 8-10 8-4 0-8-2-10-5"/><path d="M32 14v36"/>
        </g>
    </svg>
);

export const FISMAIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64" fill="none">
        <g stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M32 7c7 5 14 7 21 8v14c0 13-8 23-21 28C19 52 11 42 11 29V15c7-1 14-3 21-8z"/>
            <path d="M21 32l7 7 15-16"/>
        </g>
    </svg>
);

export const DatesIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64" fill="none">
        <g stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <rect x="10" y="13" width="44" height="42" rx="5"/><path d="M10 24h44M21 8v10M43 8v10"/>
        </g>
        <g fill={color}><rect x="18" y="31" width="6" height="6" rx="1"/>
            <rect x="29" y="31" width="6" height="6" rx="1"/>
            <rect x="40" y="31" width="6" height="6" rx="1"/>
            <rect x="18" y="42" width="6" height="6" rx="1"/>
            <rect x="29" y="42" width="6" height="6" rx="1"/>
            <rect x="40" y="42" width="6" height="6" rx="1"/>
        </g>
    </svg>
);

export const CommunicationIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64" fill="none">
        <g stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 28h9l25-13v34L19 36h-9z"/>
            <path d="M19 36l4 17h8l-3-13"/>
            <path d="M44 26c5 0 8 3 8 7s-3 7-8 7"/>
            <path d="M55 20l5-4M57 33h6M55 46l5 4"/>
        </g>
    </svg>
);

export const MarketPlaceIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64" fill="none">
        <g stroke={color} stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 24h36l-3-11H17z"/>
            <path d="M12 24h40v6c0 4-3 7-7 7s-7-3-7-7c0 4-3 7-7 7s-7-3-7-7c0 4-3 7-7 7s-7-3-7-7z"/>
            <path d="M15 37v19h34V37"/>
            <path d="M28 56V43h9v13"/>
        </g>
    </svg>
)