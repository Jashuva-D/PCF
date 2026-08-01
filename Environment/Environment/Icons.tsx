import * as React from "react";

export const EnvironmentIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64" fill="none">
        <title>Development Environment Cube Icon</title>
        <circle cx="32" cy="32" r="23" stroke={color} stroke-width="1.6" />
        <path d="M32 19L43 25.25V38.75L32 45L21 38.75V25.25L32 19Z" stroke={color} stroke-width="1.8" stroke-linejoin="round" />
        <path d="M21 25.25L32 31.5L43 25.25" stroke={color} stroke-width="1.8" stroke-linejoin="round" />
        <path d="M32 31.5V45" stroke={color} stroke-width="1.8" stroke-linecap="round" />
    </svg>
);

export const OpenInNewWindowIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 3h7v7"/>
        <path d="M10 14L21 3"/>
        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>
    </svg>
);