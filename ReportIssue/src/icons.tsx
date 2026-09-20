export const FlagIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#262626" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="97" height="91" viewBox="0 0 97 91" fill="none">
        <path d="M35.6 26.1 C33.9 27.1 34.1 30.1 34.3 33.0 L35.1 76.8 C35.2 80.1 35.8 82.0 37.1 82.2 C38.5 82.3 39.5 80.1 39.6 76.7 L38.9 33.0 C38.8 29.8 38.0 27.2 36.9 26.3 C36.5 25.9 36.0 25.8 35.6 26.1Z" fill="#C56528" stroke="#000000" stroke-width="1.8" stroke-linejoin="round" />
        <path d="M36.0 29.3 C35.8 35.9 36.0 43.5 36.3 50.5" stroke="#E58B4D" stroke-width="0.8" stroke-linecap="round" opacity="0.9" />
        <path d="M38.7 31.8 C44.2 29.3 49.9 26.4 55.8 25.3 C57.6 25.0 59.0 25.6 59.5 27.2 C60.0 28.9 59.3 30.4 57.9 31.7 C55.7 33.9 54.7 37.0 54.6 40.8 C54.4 46.0 55.0 52.5 55.7 59.2 C49.5 57.1 44.1 57.8 39.1 61.0Z" fill="#D32F2F" stroke="#000000" stroke-width="1.8" stroke-linejoin="round" />
        <path d="M57.8 31.8 C64.0 31.0 71.4 28.7 79.4 26.8 L84.4 57.0 C77.0 58.4 69.2 61.0 61.4 63.3 C58.7 64.1 56.7 63.7 55.8 62.1 C54.8 60.3 55.3 57.9 55.5 55.8 C55.9 49.4 55.3 44.3 55.4 40.1 C55.4 36.6 56.1 33.7 57.8 31.8Z" fill="#D32F2F" stroke="#000000" stroke-width="1.8" stroke-linejoin="round" />
        <path d="M56.0 36.4 C54.9 42.0 54.6 48.0 55.3 54.0 C55.6 56.8 55.9 59.0 55.8 61.4" stroke="#000000" stroke-width="1.6" stroke-linecap="round" />
    </svg>
);

export const InfoIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#1F3AA8" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle
            cx="12"
            cy="12"
            r="11"
            fill={color}
        />
        <path
            d="M12 10.5V17"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
        <circle
            cx="12"
            cy="7"
            r="1.3"
            fill="white"
        />
    </svg>
);

export const SendForReviewICon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#7028E8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 512 512">
        <circle cx="135" cy="135" r="55" fill={color} />
        <circle cx="377" cy="135" r="55" fill={color} />
        <path d="M135 205 C76 205 28 253 28 312 V350 C28 362 38 372 50 372 H145 C149 332 166 297 193 270 C183 232 160 205 135 205Z" fill={color} />
        <path d="M377 205 C436 205 484 253 484 312 V350 C484 362 474 372 462 372 H367 C363 332 346 297 319 270 C329 232 352 205 377 205Z" fill={color} />
        <circle cx="256" cy="185" r="70" fill={color} />
        <path d="M256 270 C174 270 108 336 108 418 V438 C108 454 121 467 137 467 H375 C391 467 404 454 404 438 V418 C404 336 338 270 256 270Z" fill={color} />
    </svg>
);