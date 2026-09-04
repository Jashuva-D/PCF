import { sizeBoolean } from "@fluentui/react";
import * as React from "react";

export const ClockIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "black" }) => (
  <svg width={size} height={size} color={color} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8.25" stroke="currentColor" strokeOpacity="0.9"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"/>
    <path d="M11 6.41699V11.0003L13.75 13.7503"  stroke="currentColor"   strokeOpacity="0.9"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DataverseIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "black" }) => (
  <svg width={size} height={size} viewBox="0 0 340 261" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dataverseGreen1" x1="125" y1="36" x2="154" y2="304" gradientUnits="userSpaceOnUse">
        <stop stopColor="#096738"/>
        <stop offset="1" stopColor="#0A4C2D"/>
      </linearGradient>
      <linearGradient id="dataverseGreen2" x1="246" y1="33" x2="301" y2="298" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4ED062"/>
        <stop offset="1" stopColor="#209B4E"/>
      </linearGradient>
      <linearGradient id="dataverseHighlight" x1="230" y1="230" x2="186" y2="96" gradientUnits="userSpaceOnUse">
        <stop stopColor="#66EB6E"/>
        <stop offset="1" stopColor="#9FE0A2"/>
      </linearGradient>
      <filter id="dataverseShadow" x="106" y="107" width="128" height="128" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.32"/>
      </filter>
      <mask id="dataverseMask">
        <path d="M325.674 76.303C321.127 65.766 313.279 56.548 302.581 50.372C276.186 35.133 242.436 44.175 227.196 70.568C176.198 28.989 103.074 28.818 49.15 77.292C0.71 120.834-14.444 197.552 14.03 264.032C18.586 274.434 26.383 283.526 36.971 289.64C63.357 304.873 97.094 295.842 112.341 269.47C158.675 307.463 231.799 307.633 285.623 259.16C333.985 215.687 349.168 139.145 325.674 76.303Z" fill="white"/>
      </mask>
    </defs>
    <g mask="url(#dataverseMask)">
      <path d="M139.902 221.798C186.038 248.434 227.492 238.158 250.934 197.556C274.376 156.953 265.562 101.588 222.968 66.985C176.2 28.992 103.076 28.822 49.151 77.295C0.712 120.838-14.442 197.556 14.032 264.036C18.588 274.437 26.385 283.53 36.973 289.643C63.359 304.877 97.095 295.846 112.343 269.473H112.361Z" fill="url(#dataverseGreen1)"/>
      <path d="M325.662 76.303C353.964 142.71 338.781 219.252 290.419 262.725C236.494 311.198 163.371 311.028 116.603 273.035C74.009 238.432 65.195 183.067 88.637 142.465C112.079 101.862 153.532 91.587 199.668 118.223L227.182 70.568C242.423 44.176 276.172 35.134 302.566 50.373C313.263 56.55 321.111 65.767 325.662 76.303Z" fill="url(#dataverseGreen2)"/>
      <path d="M199.669 118.226C153.533 91.589 112.079 101.865 88.637 142.467C65.989 181.695 73.448 234.702 112.39 269.452L139.903 221.799C186.039 248.436 227.493 238.16 250.935 197.558C273.583 158.33 266.123 105.323 227.181 70.573L199.669 118.226Z" fill="#088142"/>
      <g filter="url(#dataverseShadow)">
        <path d="M221.587 199.911C205.075 228.51 168.505 238.309 139.906 221.797C111.306 205.285 101.507 168.715 118.019 140.115C134.531 111.516 171.101 101.717 199.701 118.229C228.3 134.741 238.099 171.311 221.587 199.911Z" fill="url(#dataverseHighlight)"/>
      </g>
    </g>
  </svg>
);

export const SharePointIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "black" }) => (
  <svg width={size} height={size} viewBox="0 0 512 506" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="262" cy="148.8" r="142.9" fill="#036C70"/>
    <circle cx="381" cy="279.8" r="131" fill="#1A9BA1"/>
    <circle cx="279.8" cy="404.8" r="101.2" fill="#37C6D0"/>
    <path
      d="M252.1 125H121.1C108.6 198.4 154.6 269 226.7 287.3C199.4 318.5 182.6 357.5 178.8 398.8H240.1C252.1 398.8 261.8 389 261.9 377V146.8C261.9 134.8 252.2 125 240.2 125H252.1Z"
      fill="#036C70"
      fillOpacity="0.2"
    />
    <linearGradient id="sharePointGradient" x1="45.507" y1="107.969" x2="216.447" y2="404.03" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#058F92"/>
      <stop offset="0.5" stopColor="#038489"/>
      <stop offset="1" stopColor="#026D71"/>
    </linearGradient>
    <path    d="M21.8 125H240.1C252.2 125 262 134.8 262 146.8V365.1C262 377.2 252.2 387 240.2 387H21.8C9.8 387 0 377.2 0 365.2V146.8C0 134.8 9.8 125 21.8 125Z" fill="url(#sharePointGradient)" />
    <path
      d="M97.5 253.3C92.4 249.9 88.1 245.4 85 240.1C82 234.6 80.5 228.3 80.7 222C80.4 213.5 83.3 205.1 88.8 198.6C94.6 192 102 187.2 110.3 184.6C119.8 181.5 129.7 179.9 139.7 180.1C152.8 179.6 165.9 181.5 178.4 185.5V212.9C173 209.6 167.1 207.2 160.9 205.8C154.2 204.2 147.3 203.3 140.4 203.3C133.1 203 125.9 204.6 119.4 207.8C114.4 210 111.1 214.9 111.1 220.4C111.1 223.7 112.4 226.9 114.7 229.4C117.4 232.2 120.7 234.5 124.2 236.2C128.2 238.2 134.1 240.8 142.1 244.1C143 244.4 143.8 244.7 144.6 245.1C152.4 248.2 159.9 251.9 166.9 256.2C172.3 259.6 176.9 264.1 180.2 269.6C183.6 275.8 185.2 282.8 185 289.8C185.4 298.6 182.7 307.2 177.4 314.2C172.1 320.6 165.1 325.4 157.2 327.8C147.9 330.7 138.1 332.1 128.3 332C119.5 332 110.8 331.3 102.1 329.9C94.8 328.7 87.7 326.6 80.9 323.7V294.8C87.4 299.4 94.6 302.9 102.3 305C110 307.4 117.9 308.7 125.9 308.8C133.3 309.3 140.7 307.7 147.3 304.3C151.9 301.7 154.7 296.8 154.6 291.5C154.6 287.8 153.2 284.3 150.6 281.7C147.3 278.5 143.6 275.9 139.4 273.9C134.6 271.5 127.6 268.4 118.4 264.5C111 261.4 103.9 257.7 97.5 253.3Z"
      fill="white"
    />
  </svg>
);

export const ConfluenceIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="jiraGradient1" x1="486.536" y1="-19.126" x2="166.129" y2="164.988" gradientTransform="matrix(1 0 0 -1 0 514.17)" gradientUnits="userSpaceOnUse">
        <stop offset="0.18" stopColor="#0052CC"/>
        <stop offset="1" stopColor="#2684FF"/>
      </linearGradient>
      <linearGradient id="jiraGradient2" x1="159.132" y1="2387.814" x2="-161.357" y2="2572.01" gradientTransform="matrix(-1 0 0 1 184.52 -2408.71)" gradientUnits="userSpaceOnUse">
        <stop offset="0.18" stopColor="#0052CC"/>
        <stop offset="1" stopColor="#2684FF"/>
      </linearGradient>
    </defs>
    <path d="M18.6 385.6C13.3 394.2 7.4 404.3 2.3 412.2C-2.2 419.8.2 429.7 7.8 434.4L113.7 499.6C121.4 504.3 131.4 502 136.1 494.3C136.1 494.2 136.2 494.1 136.2 494.1C140.4 487 145.9 477.8 151.8 467.9C193.8 398.7 236 407.1 312 443.5L417 493.4C425.1 497.3 434.8 493.8 438.7 485.7C438.8 485.6 438.8 485.4 438.9 485.3L489.3 371.2C492.9 363.1 489.2 353.6 481.2 349.9C459 339.5 415 318.7 375.3 299.6C232.7 230.1 111.4 234.6 18.6 385.6Z" fill="url(#jiraGradient1)"/>
    <path d="M493.4 126.8C498.7 118.2 504.6 108.1 509.7 100.2C514.2 92.6 511.8 82.7 504.2 78L398.4 12.8C390.9 7.8 381 9.7 376 17.2C375.8 17.5 375.6 17.8 375.4 18.2C371.2 25.3 365.7 34.5 359.8 44.4C317.8 113.6 275.6 105.2 199.6 68.8L94.6 19.1C86.5 15.2 76.8 18.7 72.9 26.8C72.8 26.9 72.8 27.1 72.7 27.2L22.2 141.3C18.6 149.4 22.3 158.9 30.3 162.6C52.5 173 96.6 193.8 136.3 212.9C279.3 282.1 400.6 277.5 493.4 126.8Z" fill="url(#jiraGradient2)"/>
  </svg>
);

export const JIRAIcon: React.FC<{ size?: number }> = ({ size = 22 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: size, height: size, flexShrink: 0 }}
    >
        <defs>
            <linearGradient id="jira-gradient-a" x1="380.896" x2="279.145" y1="390.609" y2="282.574" gradientTransform="matrix(1 0 0 -1 0 514)" gradientUnits="userSpaceOnUse">
                <stop offset=".176" stopColor="#0052cc"/>
                <stop offset="1" stopColor="#2684ff"/>
            </linearGradient>
            <linearGradient id="jira-gradient-b" x1="265.965" x2="148.117" y1="270.661" y2="152.607" gradientTransform="matrix(1 0 0 -1 0 514)" gradientUnits="userSpaceOnUse">
                <stop offset=".176" stopColor="#0052cc"/>
                <stop offset="1" stopColor="#2684ff"/>
            </linearGradient>
        </defs>
        <path fill="#2684ff" d="M490.6 7.4H243.9c0 59.6 49.9 108 111.2 108h45.6v42.2c0 59.6 49.9 108 111.2 108V28.1c.1-11.7-9.2-20.7-21.3-20.7"/>
        <path fill="url(#jira-gradient-a)" d="M368.7 126.5H121.9c0 59.6 49.9 108 111.2 108h45.6v42.9c0 59.6 49.9 108 111.2 108V147.3c.2-11.1-9.1-20.8-21.2-20.8"/>
        <path fill="url(#jira-gradient-b)" d="M246.7 246.3H0c0 59.6 49.9 108 111.2 108h45.6v42.2c0 59.6 49.9 108 111.2 108V267.1c.1-11.8-9.9-20.8-21.3-20.8"/>
    </svg>
);

export const PowerAutomateIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="-5 10.4 102 77.6">
    <defs>
        <filter id="filter0_f">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="0.4" result="effect1_foregroundBlur"/>
        </filter>
        <filter id="filter1_f">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur"/>
        </filter>
        <linearGradient id="paint0_linear" x1="43" y1="55" x2="29" y2="10" gradientUnits="userSpaceOnUse">
            <stop stop-color="#0D36A5"/>
            <stop offset="1" stop-color="#1152D4"/>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="46" y1="10" x2="46" y2="86" gradientUnits="userSpaceOnUse">
            <stop stop-color="#84CAFF"/>
            <stop offset="1" stop-color="#61B1FB"/>
        </linearGradient>
        <linearGradient id="paint2_linear" x1="37.5" y1="10" x2="37.5" y2="86" gradientUnits="userSpaceOnUse">
            <stop stop-color="#3B90F5"/>
            <stop offset="1" stop-color="#2A78EE"/>
        </linearGradient>
        <clipPath id="clip0">
            <rect width="96" height="96"/>
        </clipPath>
        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="-1" y="10" width="97" height="76">
            <path d="M61.2116 10C62.3496 10 63.4337 10.4847 64.1925 11.3328L94.6136 45.3328C95.9723 46.8514 95.9723 49.1486 94.6136 50.6672L64.1925 84.6672C63.4337 85.5153 62.3496 86 61.2116 86H3.94634C0.488777 86 -1.34012 81.9095 0.965366 79.3328L29 48L0.965366 16.6672C-1.34012 14.0905 0.488777 10 3.94634 10H61.2116Z"/>
        </mask>
    </defs>
    <g clip-path="url(#clip0)">
        <g mask="url(#mask0)">
            <path d="M63 10L29 48L-5 10H63Z" fill="url(#paint0_linear)"/>
            <g filter="url(#filter0_f)">
                <path d="M63 10.4L-5 86.4H63L97 48.4L63 10.4Z" fill="#000" fill-opacity="0.24"/>
            </g>
            <g filter="url(#filter1_f)">
                <path d="M63 12L-5 88H63L97 50L63 12Z" fill="#000" fill-opacity="0.32"/>
            </g>
            <path d="M-5 86L63 10L97 48L63 86H-5Z" fill="url(#paint1_linear)"/>
            <path d="M-5 86L63 10L80 29L29 86H-5Z" fill="url(#paint2_linear)"/>
        </g>
    </g>
</svg>
);

export const PowerBIIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 96 96">
    <defs>
        <linearGradient id="c" x1="46.667" x2="88.865" y1="0" y2="89.447" gradientUnits="userSpaceOnUse">
            <stop stop-color="#E6AD10"/>
            <stop offset="1" stop-color="#C87E0E"/>
        </linearGradient>
        <linearGradient id="f" x1="31.997" x2="67.486" y1="24" y2="92.826" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F6D751"/>
            <stop offset="1" stop-color="#E6AD10"/>
        </linearGradient>
        <linearGradient id="g" x1="11.997" x2="31.608" y1="48" y2="94.478" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F9E589"/>
            <stop offset="1" stop-color="#F6D751"/>
        </linearGradient>
        <filter id="d">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation=".4" result="effect1_foregroundBlur"/>
        </filter>
        <filter id="e">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur"/>
        </filter>
        <clipPath id="a">
            <rect width="96" height="96"/>
        </clipPath>
        <mask id="b" width="72" height="96" x="12" y="0" mask-type="alpha" maskUnits="userSpaceOnUse">
            <path d="M52 4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v88a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V52a4 4 0 0 1 4-4h16V28a4 4 0 0 1 4-4h16z"/>
        </mask>
    </defs>
    <g clip-path="url(#a)">
        <g mask="url(#b)">
            <path fill="url(#c)" d="M84 0v96H52V0z"/>
            <g filter="url(#d)">
                <path fill="#000" fill-opacity=".2" d="M64 28.4v68H32v-72h28a4 4 0 0 1 4 4"/>
            </g>
            <g filter="url(#e)">
                <path fill="#000" fill-opacity=".18" d="M64 30v68H32V26h28a4 4 0 0 1 4 4"/>
            </g>
            <path fill="url(#f)" d="M64 28v68H32V24h28a4 4 0 0 1 4 4"/>
            <path fill="url(#g)" d="M12 48v48h32V52a4 4 0 0 0-4-4z"/>
        </g>
    </g>
</svg>
);

export const CopilotIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <defs>
        <radialGradient id="gradient0" cx="85.44%" cy="100.653%" fx="85.44%" fy="100.653%" gradientTransform="scale(-.8553 -1) rotate(50.927 2.041 -1.946)" r="105.116%">
            <stop offset="9.6%" stop-color="#00AEFF"/>
            <stop offset="77.3%" stop-color="#2253CE"/>
            <stop offset="100%" stop-color="#0736C4"/>
        </radialGradient>
        <radialGradient id="gradient1" cx="18.143%" cy="32.928%" fx="18.143%" fy="32.928%" gradientTransform="scale(.8897 1) rotate(52.069 .193 .352)" r="95.612%">
            <stop offset="0%" stop-color="#FFB657"/>
            <stop offset="63.4%" stop-color="#FF5F3D"/>
            <stop offset="92.3%" stop-color="#C02B3C"/>
        </radialGradient>
        <radialGradient id="gradient2" cx="82.987%" cy="-9.792%" fx="82.987%" fy="-9.792%" gradientTransform="scale(-1 -.9441) rotate(-70.872 .142 1.17)" r="140.622%">
            <stop offset="6.6%" stop-color="#8C48FF"/>
            <stop offset="50%" stop-color="#F2598A"/>
            <stop offset="89.6%" stop-color="#FFB152"/>
        </radialGradient>
        <linearGradient id="gradient3" x1="39.465%" x2="46.884%" y1="12.117%" y2="103.774%">
            <stop offset="15.6%" stop-color="#0D91E1"/>
            <stop offset="48.7%" stop-color="#52B471"/>
            <stop offset="65.2%" stop-color="#98BD42"/>
            <stop offset="93.7%" stop-color="#FFC800"/>
        </linearGradient>
        <linearGradient id="gradient4" x1="45.949%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stop-color="#3DCBFF"/>
            <stop offset="24.7%" stop-color="#0588F7" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="gradient5" x1="83.507%" x2="83.453%" y1="-6.106%" y2="21.131%">
            <stop offset="5.8%" stop-color="#F8ADFA"/>
            <stop offset="70.8%" stop-color="#A86EDD" stop-opacity="0"/>
        </linearGradient>
    </defs>
    <path fill="url(#gradient0)" d="M17.533 2.829A2.528 2.528 0 0015.11 1h-.737a2.531 2.531 0 00-2.484 2.087l-1.263 6.937.314-1.08a2.528 2.528 0 012.424-1.833h4.284l1.797.706 1.731-.706h-.505a2.528 2.528 0 01-2.423-1.829l-.715-2.453z"/>
    <path fill="url(#gradient1)" d="M6.726 21.16A2.528 2.528 0 009.152 23h1.566c1.37 0 2.49-1.1 2.525-2.48l.17-6.69-.357 1.228a2.528 2.528 0 01-2.423 1.83h-4.32l-1.54-.842-1.667.843h.497c1.124 0 2.113.75 2.426 1.84l.697 2.432z"/>
    <path fill="url(#gradient3)" d="M15 1H6.252c-2.5 0-4 3.331-5 6.662-1.184 3.947-2.734 9.225 1.75 9.225H6.78c1.13 0 2.12-.753 2.43-1.847.657-2.317 1.809-6.359 2.713-9.436.46-1.563.842-2.906 1.43-3.742A1.97 1.97 0 0115 1"/>
    <path fill="url(#gradient4)" d="M15 1H6.252c-2.5 0-4 3.331-5 6.662-1.184 3.947-2.734 9.225 1.75 9.225H6.78c1.13 0 2.12-.753 2.43-1.847.657-2.317 1.809-6.359 2.713-9.436.46-1.563.842-2.906 1.43-3.742A1.97 1.97 0 0115 1"/>
    <path fill="url(#gradient2)" d="M9 23h8.749c2.5 0 4-3.332 5-6.663 1.184-3.948 2.734-9.227-1.75-9.227H17.22c-1.129 0-2.12.754-2.43 1.848a1149.2 1149.2 0 01-2.713 9.437c-.46 1.564-.842 2.907-1.43 3.743A1.97 1.97 0 019 23"/>
    <path fill="url(#gradient5)" d="M9 23h8.749c2.5 0 4-3.332 5-6.663 1.184-3.948 2.734-9.227-1.75-9.227H17.22c-1.129 0-2.12.754-2.43 1.848a1149.2 1149.2 0 01-2.713 9.437c-.46 1.564-.842 2.907-1.43 3.743A1.97 1.97 0 019 23"/>
</svg>
);

export const TeamsIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="4 4 36 38">
    <defs>
        <radialGradient id="a" cx="0" cy="0" r="1" gradientTransform="matrix(13.4784 0 0 33.2694 39.7967 22.1739)" gradientUnits="userSpaceOnUse">
            <stop stop-color="#a98aff"/>
            <stop offset=".14" stop-color="#8c75ff"/>
            <stop offset=".565" stop-color="#5f50e2"/>
            <stop offset=".9" stop-color="#3c2cb8"/>
        </radialGradient>
        <radialGradient id="b" cx="0" cy="0" r="1" gradientTransform="rotate(68.1539 -7.71566095 14.71355834)scale(32.752 33.1231)" gradientUnits="userSpaceOnUse">
            <stop stop-color="#85c2ff"/>
            <stop offset=".69" stop-color="#7588ff"/>
            <stop offset="1" stop-color="#6459fe"/>
        </radialGradient>
        <linearGradient id="c" x1="20.5936" x2="20.5936" y1="18" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset=".801159" stop-color="#6864f6" stop-opacity="0"/>
            <stop offset="1" stop-color="#5149de"/>
        </linearGradient>
        <radialGradient id="d" cx="0" cy="0" r="1" gradientTransform="rotate(113.326 8.09285255 17.64474501)scale(19.2186 15.4273)" gradientUnits="userSpaceOnUse">
            <stop stop-color="#bd96ff"/>
            <stop offset=".686685" stop-color="#bd96ff" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="e" cx="0" cy="0" r="1" gradientTransform="matrix(0 -10 12.6216 0 32.9999 11.5714)" gradientUnits="userSpaceOnUse">
            <stop offset=".268201" stop-color="#6868f7"/>
            <stop offset="1" stop-color="#3923b1"/>
        </radialGradient>
        <radialGradient id="f" cx="0" cy="0" r="1" gradientTransform="rotate(40.0516 -.03068196 44.8729095)scale(7.14629 10.3363)" gradientUnits="userSpaceOnUse">
            <stop offset=".270711" stop-color="#a1d3ff"/>
            <stop offset=".813393" stop-color="#a1d3ff" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="g" cx="0" cy="0" r="1" gradientTransform="rotate(-41.6581 32.11799918 -43.41948423)scale(8.51275 20.8824)" gradientUnits="userSpaceOnUse">
            <stop stop-color="#e3acfd"/>
            <stop offset=".816041" stop-color="#9fa2ff" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="h" cx="0" cy="0" r="1" gradientTransform="matrix(0 -12 15.146 0 17.9999 8.28571)" gradientUnits="userSpaceOnUse">
            <stop offset=".268201" stop-color="#8282ff"/>
            <stop offset="1" stop-color="#3923b1"/>
        </radialGradient>
        <radialGradient id="i" cx="0" cy="0" r="1" gradientTransform="rotate(40.0516 -3.15465147 21.41641466)scale(8.57554 12.4035)" gradientUnits="userSpaceOnUse">
            <stop offset=".270711" stop-color="#a1d3ff"/>
            <stop offset=".813393" stop-color="#a1d3ff" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="j" cx="0" cy="0" r="1" gradientTransform="rotate(-41.6581 20.38180375 -26.51566158)scale(10.2153 25.0589)" gradientUnits="userSpaceOnUse">
            <stop stop-color="#e3acfd"/>
            <stop offset=".816041" stop-color="#9fa2ff" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="k" cx="0" cy="0" r="1" gradientTransform="rotate(45 -25.76345597 16.32842712)scale(22.6274)" gradientUnits="userSpaceOnUse">
            <stop offset=".046875" stop-color="#688eff"/>
            <stop offset=".946875" stop-color="#230f94"/>
        </radialGradient>
        <radialGradient id="l" cx="0" cy="0" r="1" gradientTransform="matrix(0 11.2 -13.0702 0 12 32.6)" gradientUnits="userSpaceOnUse">
            <stop offset=".570647" stop-color="#6965f6" stop-opacity="0"/>
            <stop offset="1" stop-color="#8f8fff"/>
        </radialGradient>
    </defs>
    <path fill="url(#a)" d="M22 20h12c3.314 0 6 2.686 6 6v10c0 3.314-2.686 6-6 6s-6-2.686-6-6V26c0-3.314-2.686-6-6-6"/>
    <path fill="url(#b)" d="M8 24c0-3.314 2.686-6 6-6h8c3.314 0 6 2.686 6 6v12c0 3.314 2.686 6 6 6L18 42c-5.523 0-10-4.477-10-10z"/>
    <path fill="url(#c)" d="M8 24c0-3.314 2.686-6 6-6h8c3.314 0 6 2.686 6 6v12c0 3.314 2.686 6 6 6L18 42c-5.523 0-10-4.477-10-10z"/>
    <path fill="url(#d)" d="M8 24c0-3.314 2.686-6 6-6h8c3.314 0 6 2.686 6 6v12c0 3.314 2.686 6 6 6L18 42c-5.523 0-10-4.477-10-10z"/>
    <path fill="url(#e)" d="M33 18c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5"/>
    <path fill="url(#f)" fill-opacity=".46" d="M33 18c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5"/>
    <path fill="url(#g)" fill-opacity=".4" d="M33 18c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5"/>
    <path fill="url(#h)" d="M18 16c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6"/>
    <path fill="url(#i)" fill-opacity=".6" d="M18 16c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6"/>
    <path fill="url(#j)" fill-opacity=".5" d="M18 16c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6"/>
    <rect width="16" height="16" x="4" y="23" fill="url(#k)" rx="3.25"/>
    <rect width="16" height="16" x="4" y="23" fill="url(#l)" fill-opacity=".7" rx="3.25"/>
    <path fill="#fff" d="M15.479 28.105h-2.447v7.466h-2.065v-7.466H8.52v-1.677h6.959z"/>
</svg>
);

export const OutlookIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 17.9 512.1 476.2">
    <defs>
        <linearGradient id="gradient1" x1="315.534" x2="315.534" y1="-645.427" y2="-419.194" gradientTransform="translate(0 913.333)" gradientUnits="userSpaceOnUse">
            <stop stop-color="#35b8f1"/>
            <stop offset="1" stop-color="#28a8ea"/>
        </linearGradient>
        <linearGradient id="gradient2" x1="45.507" x2="216.447" y1="-805.364" y2="-509.303" gradientTransform="translate(0 913.333)" gradientUnits="userSpaceOnUse">
            <stop stop-color="#1784d9"/>
            <stop offset=".5" stop-color="#107ad5"/>
            <stop offset="1" stop-color="#0a63c9"/>
        </linearGradient>
    </defs>
    <path fill="#0a2767" d="M512 267.9c0-4-2-7.7-5.5-9.8h-.1l-.2-.1-177.4-105c-.8-.5-1.6-1-2.4-1.4-6.9-3.5-15-3.5-21.8 0-.8.4-1.6.9-2.4 1.4L124.8 258l-.2.1c-5.4 3.4-7.1 10.5-3.7 15.9 1 1.6 2.4 2.9 4 3.9l177.4 105c.8.5 1.6 1 2.4 1.4 6.9 3.5 15 3.5 21.8 0 .8-.4 1.6-.9 2.4-1.4l177.4-105c3.6-2.1 5.7-5.9 5.7-10"/>
    <path fill="#0364b8" d="M145.5 197.8H262v106.7H145.5z"/>
    <path fill="#0364b8" d="M488.2 89.3V40.5c.3-12.2-9.4-22.3-21.6-22.6H164.5c-12.2.3-21.9 10.4-21.6 22.6v48.8l178.6 47.6z"/>
    <path fill="#0078d4" d="M142.9 89.3H262v107.2H142.9z"/>
    <path fill="#28a8ea" d="M381 89.3H262v107.2l119 107.1h107.2V196.5z"/>
    <path fill="#0078d4" d="M262 196.5h119v107.2H262z"/>
    <path fill="#0364b8" d="M262 303.6h119v107.2H262z"/>
    <path fill="#14447d" d="M145.5 304.5H262v97H145.5z"/>
    <path fill="#0078d4" d="M381 303.6h107.2v107.2H381z"/>
    <path fill="url(#gradient1)" d="m506.5 277.2-.2.1-177.4 99.8c-.8.5-1.6.9-2.4 1.3-3 1.4-6.3 2.2-9.6 2.4l-9.7-5.7c-.8-.4-1.6-.9-2.4-1.4L125 271.2l-5.9-3.3v202c.1 13.5 11.1 24.3 24.6 24.2h344.2c.2 0 .4-.1.6-.1 2.8-.2 5.7-.8 8.3-1.7 1.2-.5 2.3-1.1 3.3-1.7.8-.5 2.2-1.4 2.2-1.4 6.1-4.5 9.7-11.6 9.7-19.2V268c0 3.8-2.1 7.3-5.5 9.2"/>
    <path fill="#0a2767" fill-opacity=".5" d="M502.5 267.1v12.4L317 407.2 124.9 271.3c0-.1-.1-.1-.1-.1l-17.6-10.6v-8.9l7.3-.1 15.4 8.8.4.1 1.3.8s180.5 103 181 103.2l6.9 4c.6-.2 1.2-.5 1.9-.7.4-.2 179.2-100.9 179.2-100.9z"/>
    <path fill="#1490df" d="m506.5 277.2-.2.1-177.4 99.8c-.8.5-1.6.9-2.4 1.3-6.9 3.4-14.9 3.4-21.8 0-.8-.4-1.6-.8-2.4-1.3l-177.4-99.8-.2-.1c-3.4-1.9-5.6-5.4-5.6-9.3v202c.1 13.5 11.1 24.3 24.6 24.2h343.8c13.5.1 24.5-10.8 24.6-24.2v-202c-.1 3.9-2.2 7.4-5.6 9.3"/>
    <path fill="#000" fill-opacity=".1" d="m331.5 375.7-2.7 1.5c-.8.5-1.6.9-2.4 1.3-2.9 1.4-6.1 2.3-9.4 2.5l67.5 79.8 117.7 28.4c3.2-2.4 5.8-5.6 7.5-9.3z"/>
    <path fill="#000" fill-opacity=".05" d="m343.5 368.9-14.7 8.3c-.8.5-1.6.9-2.4 1.3-2.9 1.4-6.1 2.3-9.4 2.5l31.6 87.2 153.7 21c6.1-4.5 9.6-11.7 9.6-19.2v-2.6z"/>
    <path fill="#28a8ea" d="M144 494.1h343.5c5.3 0 10.4-1.6 14.7-4.8l-195-114.1c-.8-.4-1.6-.9-2.4-1.4L125 271.2h-.1l-5.9-3.3v201.3c.1 13.8 11.2 24.9 25 24.9"/>
    <path fill="#000" fill-opacity=".1" d="M285.8 134.9v254c0 8.9-5.4 16.9-13.7 20.2-2.6 1.1-5.3 1.7-8.1 1.7H119.1V125h23.8v-11.9H264c12 .1 21.7 9.8 21.8 21.8"/>
    <path fill="#000" fill-opacity=".2" d="M273.9 146.8v254c0 2.9-.6 5.7-1.8 8.3-3.3 8.2-11.2 13.5-20 13.5h-133V125h133c3.5 0 6.9.8 9.9 2.5 7.3 3.7 11.9 11.2 11.9 19.3"/>
    <path fill="#000" fill-opacity=".2" d="M273.9 146.8V377c-.1 12-9.8 21.8-21.8 21.9h-133V125h133c3.5 0 6.9.8 9.9 2.5 7.3 3.7 11.9 11.2 11.9 19.3"/>
    <path fill="#000" fill-opacity=".2" d="M262 146.8V377c0 12-9.7 21.8-21.8 21.9H119.1V125h121.1c12 0 21.8 9.8 21.8 21.8"/>
    <path fill="url(#gradient2)" d="M21.8 125h218.3c12.1 0 21.8 9.8 21.8 21.8v218.3c0 12.1-9.8 21.8-21.8 21.8H21.8C9.8 387 0 377.2 0 365.2V146.8c0-12 9.8-21.8 21.8-21.8"/>
    <path fill="#fff" d="M68.2 216.6c5.4-11.5 14.1-21.1 24.9-27.5 12-6.9 25.7-10.3 39.6-9.9 12.9-.3 25.5 3 36.7 9.4 10.5 6.2 18.9 15.4 24.3 26.3 5.8 12 8.8 25.3 8.5 38.7.3 14-2.7 27.9-8.8 40.5-5.5 11.3-14.2 20.8-25 27.2-11.6 6.6-24.7 10-38 9.7-13.1.3-26.1-3-37.5-9.5-10.5-6.4-19.1-15.5-24.6-26.5-5.9-11.9-8.8-25-8.6-38.2-.2-13.9 2.7-27.6 8.5-40.2m26.6 64.6c2.9 7.2 7.7 13.5 14 18.1 6.4 4.5 14.1 6.8 21.9 6.6 8.3.3 16.5-2.1 23.4-6.8 6.2-4.6 11-10.9 13.6-18.1 3-8.1 4.5-16.7 4.3-25.3.1-8.7-1.3-17.4-4.1-25.6-2.5-7.4-7.1-14-13.2-18.9-6.7-5-14.9-7.5-23.2-7.1-8-.2-15.8 2.1-22.4 6.7-6.4 4.6-11.4 11-14.3 18.3-6.4 16.7-6.4 35.3 0 52.1"/>
    <path fill="#50d9ff" d="M381 89.3h107.2v107.2H381z"/>
</svg>
);

export const OneDriveIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="35.98 139.2 648.03 430.85" width={size} height={size}>
        <defs>
            <radialGradient id="radial0" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="matrix(130.864814,156.804864,-260.089994,217.063603,48.669602,228.766494)">
                <stop offset="0" stopColor="rgb(28.235294%,58.039216%,99.607843%)" stopOpacity="1" />
                <stop offset="0.695072" stopColor="rgb(3.529412%,20.392157%,70.196078%)" stopOpacity="1" />
            </radialGradient>
            <radialGradient id="radial1" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="matrix(-575.289668,663.594003,-491.728488,-426.294267,596.956501,-6.380235)">
                <stop offset="0.165327" stopColor="rgb(13.72549%,75.294118%,99.607843%)" stopOpacity="1" />
                <stop offset="0.534" stopColor="rgb(10.980392%,56.862745%,100%)" stopOpacity="1" />
            </radialGradient>
            <radialGradient id="radial2" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="matrix(-136.753383,-114.806698,262.816935,-313.057562,181.196995,240.395994)">
                <stop offset="0" stopColor="rgb(100%,100%,100%)" stopOpacity="0.4" />
                <stop offset="0.660528" stopColor="rgb(67.843137%,75.294118%,100%)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="radial3" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="matrix(-153.638428,-130.000063,197.433014,-233.332948,375.353994,451.43549)">
                <stop offset="0" stopColor="rgb(1.176471%,22.745098%,80%)" stopOpacity="1" />
                <stop offset="1" stopColor="rgb(21.176471%,55.686275%,100%)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="radial4" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="matrix(175.585899,405.198026,-437.434522,189.555055,169.378495,125.589294)">
                <stop offset="0.592618" stopColor="rgb(20.392157%,39.215686%,89.019608%)" stopOpacity="0" />
                <stop offset="1" stopColor="rgb(1.176471%,22.745098%,80%)" stopOpacity="0.6" />
            </radialGradient>
            <radialGradient id="radial5" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="matrix(-459.329491,459.329491,-719.614455,-719.614455,589.876499,39.484649)">
                <stop offset="0" stopColor="rgb(29.411765%,99.215686%,90.980392%)" stopOpacity="0.898039" />
                <stop offset="0.543937" stopColor="rgb(29.411765%,99.215686%,90.980392%)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="linear0" gradientUnits="userSpaceOnUse" x1="29.999701" y1="37.9823" x2="29.999701" y2="18.398199" gradientTransform="matrix(15,0,0,15,0,0)">
                <stop offset="0" stopColor="rgb(0%,52.54902%,100%)" stopOpacity="1" />
                <stop offset="0.49" stopColor="rgb(0%,73.333333%,100%)" stopOpacity="1" />
            </linearGradient>
            <radialGradient id="radial6" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="matrix(273.622108,108.513684,-205.488428,518.148261,296.488495,307.441492)">
                <stop offset="0" stopColor="rgb(100%,100%,100%)" stopOpacity="0.4" />
                <stop offset="0.785262" stopColor="rgb(100%,100%,100%)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="radial7" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="matrix(-305.683909,263.459223,-264.352324,-306.720147,674.845505,249.378004)">
                <stop offset="0" stopColor="rgb(29.411765%,99.215686%,90.980392%)" stopOpacity="0.898039" />
                <stop offset="0.584724" stopColor="rgb(29.411765%,99.215686%,90.980392%)" stopOpacity="0" />
            </radialGradient>
        </defs>
        <path fillRule="nonzero" fill="url(#radial0)" d="M215.078125 205.089844C116.011719 205.09375 41.957031 286.1875 36.382812 376.527344C39.835938 395.992188 51.175781 434.429688 68.941406 432.457031C91.144531 429.988281 147.066406 432.457031 194.765625 346.105469C229.609375 283.027344 301.285156 205.085938 215.078125 205.089844Z" />
        <path fillRule="nonzero" fill="url(#radial1)" d="M192.171875 238.8125C158.871094 291.535156 114.042969 367.085938 98.914062 390.859375C80.929688 419.121094 33.304688 407.113281 37.25 366.609375C36.863281 369.894531 36.5625 373.210938 36.355469 376.546875C29.84375 481.933594 113.398438 569.453125 217.375 569.453125C331.96875 569.453125 605.269531 426.671875 577.609375 283.609375C548.457031 199.519531 466.523438 139.203125 373.664062 139.203125C280.808594 139.203125 221.296875 192.699219 192.171875 238.8125Z" />
        <path fillRule="nonzero" fill="url(#radial2)" d="M192.171875 238.8125C158.871094 291.535156 114.042969 367.085938 98.914062 390.859375C80.929688 419.121094 33.304688 407.113281 37.25 366.609375C36.863281 369.894531 36.5625 373.210938 36.355469 376.546875C29.84375 481.933594 113.398438 569.453125 217.375 569.453125C331.96875 569.453125 605.269531 426.671875 577.609375 283.609375C548.457031 199.519531 466.523438 139.203125 373.664062 139.203125C280.808594 139.203125 221.296875 192.699219 192.171875 238.8125Z" />
        <path fillRule="nonzero" fill="url(#radial3)" d="M192.171875 238.8125C158.871094 291.535156 114.042969 367.085938 98.914062 390.859375C80.929688 419.121094 33.304688 407.113281 37.25 366.609375C36.863281 369.894531 36.5625 373.210938 36.355469 376.546875C29.84375 481.933594 113.398438 569.453125 217.375 569.453125C331.96875 569.453125 605.269531 426.671875 577.609375 283.609375C548.457031 199.519531 466.523438 139.203125 373.664062 139.203125C280.808594 139.203125 221.296875 192.699219 192.171875 238.8125Z" />
        <path fillRule="nonzero" fill="url(#radial4)" d="M192.171875 238.8125C158.871094 291.535156 114.042969 367.085938 98.914062 390.859375C80.929688 419.121094 33.304688 407.113281 37.25 366.609375C36.863281 369.894531 36.5625 373.210938 36.355469 376.546875C29.84375 481.933594 113.398438 569.453125 217.375 569.453125C331.96875 569.453125 605.269531 426.671875 577.609375 283.609375C548.457031 199.519531 466.523438 139.203125 373.664062 139.203125C280.808594 139.203125 221.296875 192.699219 192.171875 238.8125Z" />
        <path fillRule="nonzero" fill="url(#radial5)" d="M192.171875 238.8125C158.871094 291.535156 114.042969 367.085938 98.914062 390.859375C80.929688 419.121094 33.304688 407.113281 37.25 366.609375C36.863281 369.894531 36.5625 373.210938 36.355469 376.546875C29.84375 481.933594 113.398438 569.453125 217.375 569.453125C331.96875 569.453125 605.269531 426.671875 577.609375 283.609375C548.457031 199.519531 466.523438 139.203125 373.664062 139.203125C280.808594 139.203125 221.296875 192.699219 192.171875 238.8125Z" />
        <path fillRule="nonzero" fill="url(#linear0)" d="M215.699219 569.496094C215.699219 569.496094 489.320312 570.035156 535.734375 570.035156C619.960938 570.035156 684 501.273438 684 421.03125C684 340.789062 618.671875 272.445312 535.734375 272.445312C452.792969 272.445312 405.027344 334.492188 369.152344 402.226562C327.117188 481.59375 273.488281 568.546875 215.699219 569.496094Z" />
        <path fillRule="nonzero" fill="url(#radial6)" d="M215.699219 569.496094C215.699219 569.496094 489.320312 570.035156 535.734375 570.035156C619.960938 570.035156 684 501.273438 684 421.03125C684 340.789062 618.671875 272.445312 535.734375 272.445312C452.792969 272.445312 405.027344 334.492188 369.152344 402.226562C327.117188 481.59375 273.488281 568.546875 215.699219 569.496094Z" />
        <path fillRule="nonzero" fill="url(#radial7)" d="M215.699219 569.496094C215.699219 569.496094 489.320312 570.035156 535.734375 570.035156C619.960938 570.035156 684 501.273438 684 421.03125C684 340.789062 618.671875 272.445312 535.734375 272.445312C452.792969 272.445312 405.027344 334.492188 369.152344 402.226562C327.117188 481.59375 273.488281 568.546875 215.699219 569.496094Z" />
    </svg>
);

export const MSFormsIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <defs> <radialGradient id="microsoftFormsA" cx="-636.407" cy="-241.425" r="14.223" gradientTransform="matrix(-18.3292 -29.852 26.9769 -16.5711 -4739.679 -22434.014)" gradientUnits="userSpaceOnUse"> <stop offset="0" stopColor="#1a7f7c" /> <stop offset=".45" stopColor="#14717c" /> <stop offset=".8" stopColor="#08567b" /> </radialGradient> <radialGradient id="microsoftFormsB" cx="-659.117" cy="-242.353" r="14.223" gradientTransform="matrix(-11.9752 -11.2928 8.7268 -9.2542 -5570.842 -9435.164)" gradientUnits="userSpaceOnUse"> <stop offset="0" stopColor="#06517b" /> <stop offset=".99" stopColor="#06517b" stopOpacity="0" /> </radialGradient> <linearGradient id="microsoftFormsC" x1="107.943" x2="511.707" y1="300.296" y2="67.172" gradientTransform="translate(0 -58)" gradientUnits="userSpaceOnUse"> <stop offset=".23" stopColor="#15b4d5" /> <stop offset="1" stopColor="#43e5ca" /> </linearGradient> <linearGradient id="microsoftFormsD" x1="195.774" x2="78.259" y1="229.049" y2="229.049" gradientTransform="translate(0 -58)" gradientUnits="userSpaceOnUse"> <stop offset=".18" stopColor="#29cbdc" stopOpacity="0" /> <stop offset="1" stopColor="#36dff1" /> </linearGradient> <linearGradient id="microsoftFormsE" x1="320.274" x2="420.841" y1="107.416" y2="252.681" gradientTransform="translate(0 -58)" gradientUnits="userSpaceOnUse"> <stop offset="0" stopColor="#119fc5" /> <stop offset="1" stopColor="#22918b" /> </linearGradient> <linearGradient id="microsoftFormsF" x1="342.764" x2="397.619" y1="139.906" y2="219.133" gradientTransform="translate(0 -58)" gradientUnits="userSpaceOnUse"> <stop offset="0" stopColor="#06517b" /> <stop offset="1" stopColor="#1a7f7c" /> </linearGradient> <linearGradient id="microsoftFormsG" x1="329.267" x2="411.546" y1="376.409" y2="495.255" gradientTransform="translate(0 -58)" gradientUnits="userSpaceOnUse"> <stop offset="0" stopColor="#119fc5" /> <stop offset="1" stopColor="#20ac9d" /> </linearGradient> <radialGradient id="microsoftFormsH" cx="-566.015" cy="-256.303" r="14.223" gradientTransform="matrix(15.992 15.9975 -15.9948 15.9948 4961.083 13402.07)" gradientUnits="userSpaceOnUse"> <stop offset=".06" stopColor="#009bbc" /> <stop offset=".59" stopColor="#01657d" /> <stop offset=".94" stopColor="#014354" /> </radialGradient> <radialGradient id="microsoftFormsI" cx="-542.775" cy="-309.721" r="14.223" gradientTransform="matrix(0 11.2 -12.75 0 -3825.51 6457.4)" gradientUnits="userSpaceOnUse"> <stop offset=".57" stopColor="#1e8581" stopOpacity="0" /> <stop offset=".97" stopColor="#1ecbe6" /> </radialGradient> </defs> <path d="M78.3 312.9c0-62.8 50.9-113.8 113.8-113.8h312.8v270.2c0 23.6-19.1 42.7-42.7 42.7H164.1c-47.4 0-85.8-38.4-85.8-85.8z" fill="url(#microsoftFormsA)" /> <path d="M78.3 312.9c0-62.8 50.9-113.8 113.8-113.8h312.8v270.2c0 23.6-19.1 42.7-42.7 42.7H164.1c-47.4 0-85.8-38.4-85.8-85.8z" fill="url(#microsoftFormsB)" fillOpacity=".8" /> <path d="M78.3 85.8C78.3 38.4 116.7 0 164.1 0h294.2c25.7 0 46.5 20.8 46.5 46.5v162.9c0 25.7-20.8 46.5-46.5 46.5H164.1c-47.4 0-85.8 38.7-85.8 86.1z" fill="url(#microsoftFormsC)" /> <path d="M78.3 85.8C78.3 38.4 116.7 0 164.1 0h294.2c25.7 0 46.5 20.8 46.5 46.5v162.9c0 25.7-20.8 46.5-46.5 46.5H164.1c-47.4 0-85.8 38.7-85.8 86.1z" fill="url(#microsoftFormsD)" /> <path d="M369.8 199.1c43.2 0 78.2-35 78.2-78.2s-35-78.2-78.2-78.2-78.2 35-78.2 78.2 35 78.2 78.2 78.2" fill="url(#microsoftFormsE)" /> <path d="M369.8 163.6c23.6 0 42.7-19.1 42.7-42.7s-19.1-42.7-42.7-42.7-42.7 19.1-42.7 42.7 19.1 42.7 42.7 42.7" fill="url(#microsoftFormsF)" /> <path d="M422.1 312.9H317.4c-6.4 0-11.6 5.2-11.6 11.6v104.7c0 6.4 5.2 11.6 11.6 11.6h104.7c6.4 0 11.6-5.2 11.6-11.6V324.5c0-6.4-5.2-11.6-11.6-11.6" fill="url(#microsoftFormsG)" /> <path d="M53.4 241.8h135.1c25.5 0 46.2 20.7 46.2 46.2v135.1c0 25.5-20.7 46.2-46.2 46.2H53.4c-25.5 0-46.2-20.7-46.2-46.2V288c0-25.5 20.7-46.2 46.2-46.2" fill="url(#microsoftFormsH)" /> <path d="M53.4 241.8h135.1c25.5 0 46.2 20.7 46.2 46.2v135.1c0 25.5-20.7 46.2-46.2 46.2H53.4c-25.5 0-46.2-20.7-46.2-46.2V288c0-25.5 20.7-46.2 46.2-46.2" fill="url(#microsoftFormsI)" fillOpacity=".6" /> <path d="M158.5 314.8h-45.9v31.3h42.2v24.1h-42.2v50.3H83.3v-130h75.2z" fill="#fff" /> </svg>
);

export const AzureAIIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="azureAi0" gradientUnits="userSpaceOnUse" x1="18.242" x2="14.191" y1="16.837" y2=".616">
                <stop stopColor="#712575" />
                <stop offset=".09" stopColor="#9A2884" />
                <stop offset=".18" stopColor="#BF2C92" />
                <stop offset=".27" stopColor="#DA2E9C" />
                <stop offset=".34" stopColor="#EB30A2" />
                <stop offset=".4" stopColor="#F131A5" />
                <stop offset=".5" stopColor="#EC30A3" />
                <stop offset=".61" stopColor="#DF2F9E" />
                <stop offset=".72" stopColor="#C92D96" />
                <stop offset=".83" stopColor="#AA2A8A" />
                <stop offset=".95" stopColor="#83267C" />
                <stop offset="1" stopColor="#712575" />
            </linearGradient>
            <linearGradient id="azureAi1" gradientUnits="userSpaceOnUse" x1="19.782" x2="19.782" y1=".34" y2="23.222">
                <stop stopColor="#DA7ED0" />
                <stop offset=".08" stopColor="#B17BD5" />
                <stop offset=".19" stopColor="#8778DB" />
                <stop offset=".3" stopColor="#6276E1" />
                <stop offset=".41" stopColor="#4574E5" />
                <stop offset=".54" stopColor="#2E72E8" />
                <stop offset=".67" stopColor="#1D71EB" />
                <stop offset=".81" stopColor="#1471EC" />
                <stop offset="1" stopColor="#1171ED" />
            </linearGradient>
            <linearGradient id="azureAi2" gradientUnits="userSpaceOnUse" x1="18.404" x2="3.236" y1=".859" y2="25.183">
                <stop stopColor="#DA7ED0" />
                <stop offset=".05" stopColor="#B77BD4" />
                <stop offset=".11" stopColor="#9079DA" />
                <stop offset=".18" stopColor="#6E77DF" />
                <stop offset=".25" stopColor="#5175E3" />
                <stop offset=".33" stopColor="#3973E7" />
                <stop offset=".42" stopColor="#2772E9" />
                <stop offset=".54" stopColor="#1A71EB" />
                <stop offset=".68" stopColor="#1371EC" />
                <stop offset="1" stopColor="#1171ED" />
            </linearGradient>
        </defs>
        <path clipRule="evenodd" d="M16.233 0c.713 0 1.345.551 1.572 1.329.227.778 1.555 5.59 1.555 5.59v9.562h-4.813L14.645 0h1.588z" fill="url(#azureAi0)" fillRule="evenodd" />
        <path d="M23.298 7.47c0-.34-.275-.6-.6-.6h-2.835a3.617 3.617 0 0 0-3.614 3.615v5.996h3.436a3.617 3.617 0 0 0 3.613-3.614V7.47z" fill="url(#azureAi1)" />
        <path clipRule="evenodd" d="M16.233 0a.982.982 0 0 0-.989.989l-.097 18.198A4.814 4.814 0 0 1 10.334 24H1.6a.597.597 0 0 1-.567-.794l7-19.981A4.819 4.819 0 0 1 12.57 0h3.679-.016z" fill="url(#azureAi2)" fillRule="evenodd" />
    </svg>
);

export const MSEntraIDIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"> <path d="M108.1 399.1c11 6.9 29.4 14.5 48.8 14.5 17.7 0 34.1-5.1 47.7-13.9h.1l51.3-32.1v115.9c-8.1 0-16.3-2.2-23.4-6.7 0 .1-124.5-77.7-124.5-77.7" fill="#225086" /> <path d="M223.4 42.9 10 283.5c-16.5 18.6-12.2 46.7 9.2 60 0 0 79 49.4 88.9 55.6 11 6.9 29.4 14.5 48.8 14.5 17.7 0 34.1-5.1 47.7-13.9h.1l51.3-32.1L131.9 290 256 150V28.4c-12 0-24.1 4.9-32.6 14.5" fill="#6df" /> <path d="m131.9 290.1 1.4.9L256 367.7V150z" fill="#cbf8ff" /> <path d="M492.8 343.6c21.4-13.3 25.7-41.4 9.2-60l-140-158c-11.3-5.3-24-8.3-37.3-8.3-26.3 0-49.8 11.3-65.5 29.2l-3.1 3.5 124.1 140.1L256 367.7v115.9c8.2 0 16.3-2.2 23.4-6.7z" fill="#074793" /> <path d="M256 28.4V150l3.1-3.5c15.6-17.8 39.2-29.2 65.5-29.2 13.4 0 26.1 3 37.3 8.3l-73.4-82.7c-8.4-9.6-20.5-14.4-32.5-14.5" fill="#0294e4" /> <path d="M380.2 290.1 256 150.1v217.6z" fill="#96bcc2" /> </svg>
);

export const MicrosoftFoundryIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"> <defs> <linearGradient id="microsoftFoundryA" x1="-642.424" x2="-642.424" y1="761.406" y2="779.484" gradientTransform="matrix(17.5556 0 0 -17.5556 11638.556 13708.777)" gradientUnits="userSpaceOnUse"> <stop offset=".02" stopColor="#201ba6" /> <stop offset=".64" stopColor="#2d29c7" /> <stop offset="1" stopColor="#201ba6" /> </linearGradient> <linearGradient id="microsoftFoundryB" x1="-638.919" x2="-638.919" y1="761.321" y2="772.631" gradientTransform="matrix(17.5556 0 0 -17.5556 11638.556 13708.777)" gradientUnits="userSpaceOnUse"> <stop offset="0" stopColor="#3530c3" /> <stop offset=".5" stopColor="#6d71d1" /> <stop offset=".967" stopColor="#c0bff5" /> <stop offset="1" stopColor="#e3e4ff" /> </linearGradient> <linearGradient id="microsoftFoundryC" x1="-652.912" x2="-652.912" y1="751.715" y2="781.161" gradientTransform="matrix(17.5556 0 0 -17.5556 11638.556 13708.777)" gradientUnits="userSpaceOnUse"> <stop offset="0" stopColor="#302ec9" /> <stop offset=".446" stopColor="#302ec9" /> <stop offset=".949" stopColor="#cacafb" /> <stop offset="1" stopColor="#7f7eaf" /> </linearGradient> </defs> <path d="M350.7 341.9c1.2 0 2.4-3.2 2.4-7.6V210.5c0-27.3 21.1-56.3 50.7-65.1-1.8-6-20.6-67.6-26-84.7-5.6-18-21.5-60.7-41.1-60.7h-.4c-1.5.3-2.9 1.7-4.3 4.1-10.2 18.7-14.8 96.5-14.8 154.8v72.4c8.8 31.1 29.2 102.9 30.8 107.3-.1.1 1.5 3.3 2.7 3.3" fill="url(#microsoftFoundryA)" /> <path d="M480.5 142.6h-57.8c-38.8 0-69.6 34.7-69.6 67.5v123.8c0 4.4-1.2 7.6-2.4 7.6s-2.8-3.2-2.8-3.2 2.4 6.8 5.6 6.8h63.4c19.7 0 79.2-19.6 79.2-80.7V160.2c0-13.2-7.6-17.6-15.6-17.6" fill="url(#microsoftFoundryB)" /> <path d="M42.8 512h172.1c75.1 0 102.2-65.1 102.2-121.8V159c0-66.7 6-159 19.6-159H233.5c-24.6 0-45.7 26.4-69.7 79.5S24.4 459.4 19.2 474.9C10.8 500 18.4 512 42.8 512" fill="url(#microsoftFoundryC)" /> </svg>
);

export const AzureIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"> <defs> <linearGradient id="microsoftAzureA" x1="-1083.782" x2="-1184.48" y1="596.622" y2="894.112" gradientTransform="translate(1919.313 -881.688)scale(1.5625)" gradientUnits="userSpaceOnUse"> <stop offset="0" stopColor="#114a8b" /> <stop offset="1" stopColor="#0669bc" /> </linearGradient> <linearGradient id="microsoftAzureB" x1="-1052.326" x2="-1075.619" y1="735.256" y2="743.132" gradientTransform="translate(1919.313 -881.688)scale(1.5625)" gradientUnits="userSpaceOnUse"> <stop offset="0" stopColor="#000" stopOpacity=".3" /> <stop offset=".071" stopColor="#000" stopOpacity=".2" /> <stop offset=".321" stopColor="#000" stopOpacity=".1" /> <stop offset=".623" stopColor="#000" stopOpacity=".05" /> <stop offset="1" stopColor="#000" stopOpacity="0" /> </linearGradient> <linearGradient id="microsoftAzureC" x1="-1064.412" x2="-953.874" y1="587.674" y2="882.166" gradientTransform="translate(1919.313 -881.688)scale(1.5625)" gradientUnits="userSpaceOnUse"> <stop offset="0" stopColor="#3ccbf4" /> <stop offset="1" stopColor="#2892df" /> </linearGradient> </defs> <path d="M170.7 14.8h151.5l-157.3 466c-3.3 9.8-12.5 16.4-22.9 16.4H24.1C10.8 497.2 0 486.4 0 473.1c0-2.6.4-5.2 1.3-7.7L147.8 31.2c3.3-9.8 12.5-16.4 22.9-16.4" fill="url(#microsoftAzureA)" /> <path d="M390.8 327.3H150.6c-6.1 0-11.1 5-11.1 11.1 0 3.1 1.3 6 3.5 8.1l154.4 144.1c4.5 4.2 10.4 6.5 16.6 6.5h136z" fill="#0078d4" /> <path d="M170.7 14.8c-10.5 0-19.8 6.7-22.9 16.8L1.4 465c-4.5 12.5 2 26.3 14.5 30.8 2.6.9 5.4 1.4 8.2 1.4h121c9.2-1.6 16.8-8.1 19.8-16.9l29.2-86 104.2 97.2c4.4 3.6 9.8 5.6 15.5 5.7h135.5L390 327.3H216.7l106-312.5z" fill="url(#microsoftAzureB)" /> <path d="M364.2 31.2c-3.3-9.8-12.5-16.4-22.9-16.4H172.5c10.3 0 19.5 6.6 22.9 16.4l146.5 434.2c4.3 12.6-2.5 26.3-15.1 30.6-2.5.8-5.1 1.3-7.7 1.3H488c13.3 0 24.1-10.8 24.1-24.1 0-2.6-.4-5.2-1.3-7.7z" fill="url(#microsoftAzureC)" /> </svg>
);

export const SlackIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"> <path d="M107.9 323.6c0 29.7-24 53.8-53.8 53.8S.3 353.4.3 323.6c0-29.7 24-53.8 53.8-53.8h53.8zm26.9 0c0-29.7 24-53.8 53.8-53.8s53.8 24 53.8 53.8V458c0 29.7-24 53.8-53.8 53.8s-53.8-24-53.8-53.8z" fill="#e01e5a" /> <path d="M188.6 107.7c-29.7 0-53.8-24-53.8-53.8S158.8.1 188.6.1s53.8 24 53.8 53.8v53.8zm0 27.3c29.7 0 53.8 24 53.8 53.8s-24 53.8-53.8 53.8H53.8C24 242.6 0 218.5 0 188.8S24 135 53.8 135z" fill="#36c5f0" /> <path d="M404.1 188.8c0-29.7 24-53.8 53.8-53.8s53.8 24 53.8 53.8-24 53.8-53.8 53.8h-53.8zm-26.9 0c0 29.7-24 53.8-53.8 53.8-29.7 0-53.8-24-53.8-53.8V54c0-29.7 24-53.8 53.8-53.8s53.8 24 53.8 53.8z" fill="#2eb67d" /> <path d="M323.4 404.3c29.7 0 53.8 24 53.8 53.8 0 29.7-24 53.8-53.8 53.8-29.7 0-53.8-24-53.8-53.8v-53.8zm0-26.9c-29.7 0-53.8-24-53.8-53.8s24-53.8 53.8-53.8h134.8c29.7 0 53.8 24 53.8 53.8 0 29.7-24 53.8-53.8 53.8z" fill="#ecb22e" /> </svg>
);

export const PostmanIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#FF6C37"> <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0-.751-.033z" /> </svg>
);

export const NoIntegrationsIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width="120" height="86" viewBox="0 0 120 86" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="#01395E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="54" y1="38" x2="40" y2="25"/>
        <line x1="66" y1="38" x2="81" y2="25"/>
        <line x1="54" y1="49" x2="40" y2="63"/>
        <line x1="66" y1="49" x2="81" y2="63"/>
        <circle cx="60" cy="43" r="9"/>
        <circle cx="34" cy="19" r="6"/>
        <circle cx="87" cy="19" r="6"/>
        <circle cx="34" cy="69" r="6"/>
        <circle cx="87" cy="69" r="6"/>
        </g>
    </svg>
);

export const DataFlowIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="#9C27A8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="23" y1="22" x2="23" y2="11"/>
        <line x1="27" y1="25" x2="43" y2="14"/>
        <line x1="23" y1="31" x2="23" y2="47"/>
        </g>
        <g fill="#9C27A8">
        <circle cx="23" cy="8" r="5"/>
        <circle cx="23" cy="27" r="6"/>
        <circle cx="47" cy="11" r="5"/>
        <circle cx="23" cy="52" r="5"/>
        </g>
    </svg>
)

export const PowerAppsIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size}  viewBox='0 0 2048 2048' xmlns='http://www.w3.org/2000/svg'><path d='M1355 1121q31 0 53 22l159 160q22 22 22 53 0 30-22 52l-159 160q-22 22-53 22t-53-22l-159-160q-22-22-22-52 0-31 22-53l159-160q22-22 53-22zm331-331q31 0 53 22l159 159q22 22 22 53t-22 53l-159 159q-22 22-53 22t-53-22l-159-159q-22-22-22-53t22-53l159-159q22-22 53-22zm-428 234q0 17-7 31t-19 27-23 24-24 22l-439 439q-22 22-53 22t-53-22l-438-439q-11-11-24-22t-24-23-18-27-8-32q0-17 7-31t19-28 24-24 24-22l438-438q22-22 53-22t53 22l439 438q11 11 23 22t24 24 18 27 8 32zm-565 234q31 0 53-22l118-119q10-10 21-20t21-21 15-23 6-29q0-31-22-53L746 812q-22-22-53-22t-53 22L481 971q-22 22-22 53 0 16 6 28t15 24 20 21 22 20l118 119q22 22 53 22zm662-331q-31 0-53-22l-159-160q-22-22-22-52 0-31 22-53l159-159q22-22 53-22t53 22l159 159q22 22 22 53 0 30-22 52l-159 160q-22 22-53 22z' fill='#000000'></path></svg>
);

export const RestAPIIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size} viewBox='0 0 2048 2048' xmlns='http://www.w3.org/2000/svg'><path d='M1661 640q80 0 150 30t123 81 83 122 31 151q0 80-30 149t-82 122-123 83-149 30h-128v-128h128q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20h-128v-64q0-93-35-174t-96-142-142-96-175-36q-63 0-121 17t-109 48-93 76-72 99l-25 46q-38-13-76-21t-80-9q-80 0-149 30t-122 82-83 123-30 149q0 80 30 149t82 122 122 83 150 30h105q11-36 32-65t49-51 63-32 71-12q46 0 87 17t71 48 48 72 18 87q0 47-17 87t-48 71-72 48-87 18q-37 0-71-11t-62-33-50-50-32-66H512q-106 0-199-40t-162-110-110-163T0 896q0-106 40-199t110-162 163-110 199-41q46 0 93 9 39-61 92-110t116-83 132-53 143-19q110 0 208 39t176 108 127 162 62 203zM832 832q106 0 199 40t163 109 110 163 40 200q0 106-40 199t-109 163-163 110-200 40q-103 0-196-38t-166-112l91-91q54 55 124 84t147 29q79 0 149-30t122-83 82-122 31-149q0-79-30-149t-83-122-122-82-149-31q-77 0-147 29t-124 84l-91-91q73-73 166-111t196-39z' fill='#000000'></path></svg>
);

export const ServiceNowIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size} viewBox="0 -.038 130.3 19.5" xmlns="http://www.w3.org/2000/svg"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m31.7 5.862c-1.4 0-2.6.5-3.6 1.3v-1.1h-3.4v12.9h3.5v-8.2c.5-.7 1.7-1.6 3.2-1.6.5 0 1 .1 1.4.2v-3.3c-.4-.1-.8-.2-1.1-.2m-30.1 9.098c.9.8 2.3 1.3 3.5 1.3.9 0 1.7-.5 1.7-1.1 0-2-6.3-1.3-6.3-5.4 0-2.5 2.4-4 4.9-4 1.7 0 3.5.6 4.4 1.3l-1.6 2.5c-.7-.4-1.5-.9-2.5-.9s-1.7.4-1.7 1.1c0 1.7 6.3 1 6.3 5.5 0 2.5-2.4 4-5.1 4-1.8 0-3.7-.6-5.2-1.7zm21.6-2.6c0-3.6-2.5-6.6-6.1-6.6-3.8 0-6.3 3.2-6.3 6.7 0 4.1 2.9 6.7 6.7 6.7 2 0 4-.8 5.3-2.3l-2-2c-.6.7-1.8 1.5-3.2 1.5-1.8 0-3.3-1.3-3.5-3.1h8.9c.2-.2.2-.5.2-.9zm-8.8-1.5c.2-1.2 1.4-2.3 2.8-2.3s2.4 1.1 2.6 2.3zm33.6-4.798-5.9 12.9h-2.4l-5.9-12.9h3.5l3.6 7.9 3.5-7.9zm2.9-6.1c1.3 0 2.3 1 2.3 2.2 0 1.3-1 2.2-2.3 2.2s-2.2-1-2.2-2.2c0-1.3.9-2.2 2.2-2.2m-1.7 6.1h3.5v12.9h-3.5zm17.7 10.198c-1.5 2-3.4 2.9-5.8 2.9-4 0-6.9-3-6.9-6.7 0-3.8 3-6.7 6.9-6.7 2.3 0 4.2 1.1 5.4 2.6l-2.3 2.1c-.7-.9-1.7-1.5-2.9-1.5-2 0-3.5 1.6-3.5 3.5 0 2 1.4 3.5 3.5 3.5 1.4 0 2.5-.8 3.1-1.7zm12.5.6c-1.3 1.5-3.3 2.3-5.3 2.3-3.8 0-6.7-2.6-6.7-6.7 0-3.6 2.4-6.7 6.3-6.7 3.5 0 6.1 3 6.1 6.6 0 .4 0 .7-.1 1h-9c.2 1.8 1.7 3.1 3.5 3.1 1.4 0 2.6-.8 3.2-1.5zm-3.2-6c-.1-1.1-1.1-2.3-2.6-2.3-1.4 0-2.6 1.1-2.8 2.3zm4.9 8.1v-12.9h3.3v1.1c1-.8 2.2-1.3 3.6-1.3 1.8 0 3.4.8 4.5 2.1.8 1 1.4 2.3 1.4 4.5v6.6h-3.5v-6.9c0-1.3-.3-2-.8-2.4-.5-.5-1.1-.8-2-.8-1.4 0-2.6.9-3.2 1.6v8.4z" fill="#293e40"/><path d="m102.8 5.762c-4.2 0-7.5 3.3-7.5 7.5 0 2.2.9 4.2 2.3 5.6.5.5 1.4.5 2 .1.8-.7 2-1.1 3.2-1.1 1.3 0 2.3.4 3.2 1.1.6.5 1.4.4 2-.2 1.4-1.4 2.3-3.3 2.3-5.5-.1-4.1-3.4-7.5-7.5-7.5m-.1 11.4c-2.3 0-3.8-1.7-3.8-3.8s1.5-3.8 3.8-3.8 3.8 1.7 3.8 3.8-1.5 3.8-3.8 3.8" fill="#81b5a1"/><path d="m109.4 6.062h3.4l2.8 7.4 2.8-7.4h2.9l2.7 7.4 2.8-7.4h3.5l-5.1 12.9h-2.6l-2.8-7.3-2.7 7.3h-2.6z" fill="#293e40"/></g></svg>
)

export const MSPowerPagesIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size} viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_18_9995)">
<mask id="mask2_18_9995" maskUnits="userSpaceOnUse" x="3" y="3" width="994" height="994">
<path d="M531.265 13.4474C512.746 -0.441466 487.283 -0.441453 468.765 13.4475L24.3255 346.777C-3.45227 367.61 -3.45227 409.277 24.3255 430.11L245.008 595.622L151.808 665.523C124.03 686.356 124.03 728.023 151.808 748.856L468.749 986.561C487.266 1000.45 512.73 1000.45 531.249 986.561L975.687 653.232C1003.47 632.399 1003.47 590.732 975.687 569.899L755.005 404.386L848.206 334.486C875.983 313.653 875.983 271.986 848.206 251.153L531.265 13.4474Z" fill="white"/>
</mask>
<g mask="url(#mask2_18_9995)">
<path d="M96.252 707.189L627.496 308.756L1031.24 611.565L499.999 1010L96.252 707.189Z" fill="url(#paint0_linear_18_9995)"/>
<path d="M244.994 595.628L627.491 308.756L1031.24 611.565L679.991 875C661.472 888.888 636.009 888.889 617.491 875L244.994 595.628Z" fill="url(#paint1_linear_18_9995)"/>
<g filter="url(#filter0_f_18_9995)">
<path d="M-31.2305 392.61L500.015 -5.82324L903.761 296.986L403.766 671.982C385.247 685.872 359.785 685.872 341.266 671.982L-31.2305 392.61Z" fill="black" fill-opacity="0.24"/>
</g>
<g filter="url(#filter1_f_18_9995)">
<path d="M-31.2305 409.277L500.015 10.8433L903.761 313.653L403.766 688.649C385.247 702.538 359.785 702.538 341.266 688.649L-31.2305 409.277Z" fill="black" fill-opacity="0.32"/>
</g>
<path d="M-31.2305 388.444L500.015 -9.99023L903.761 292.82L403.766 667.815C385.247 681.704 359.785 681.704 341.266 667.815L-31.2305 388.444Z" fill="url(#paint2_linear_18_9995)"/>
<path d="M-31.2305 388.434L320.016 124.999C338.535 111.11 363.997 111.11 382.516 124.999L755.012 404.372L403.766 667.806C385.247 681.695 359.785 681.695 341.266 667.806L-31.2305 388.434Z" fill="url(#paint3_linear_18_9995)"/>
</g>
</g>
<defs>
<filter id="filter0_f_18_9995" x="-32.0305" y="-6.62324" width="936.591" height="689.823" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="0.4" result="effect1_foregroundBlur_18_9995"/>
</filter>
<filter id="filter1_f_18_9995" x="-39.2305" y="2.84326" width="950.991" height="704.222" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur_18_9995"/>
</filter>
<linearGradient id="paint0_linear_18_9995" x1="181.246" y1="21.8833" x2="448.748" y2="979.315" gradientUnits="userSpaceOnUse">
<stop stop-color="#A391E8"/>
<stop offset="1" stop-color="#685CD0"/>
</linearGradient>
<linearGradient id="paint1_linear_18_9995" x1="979.166" y1="895.838" x2="796.874" y2="369.798" gradientUnits="userSpaceOnUse">
<stop stop-color="#38389F"/>
<stop offset="1" stop-color="#4B44C0"/>
</linearGradient>
<linearGradient id="paint2_linear_18_9995" x1="366.772" y1="-130.023" x2="625.79" y2="628.078" gradientUnits="userSpaceOnUse">
<stop stop-color="#DBCEF8"/>
<stop offset="1" stop-color="#C0AFF1"/>
</linearGradient>
<linearGradient id="paint3_linear_18_9995" x1="229.074" y1="-33.9057" x2="507.978" y2="962.178" gradientUnits="userSpaceOnUse">
<stop stop-color="#C0AFF1"/>
<stop offset="1" stop-color="#8675DD"/>
</linearGradient>
<clipPath id="clip0_18_9995">
<rect width="1000" height="1000" fill="white"/>
</clipPath>
</defs>
</svg>
);

export const MSCustomConnectorsIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size} id="f7bf0037-9a5e-4bb7-8b50-ac71cb035d97" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><defs><linearGradient id="acc4deac-96b1-4d46-9a2c-4b829b24be19" x1="4.76" y1="9.66" x2="4.76" y2="17.06" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#008bf1"/><stop offset="1" stop-color="#004dae"/></linearGradient><linearGradient id="a6951013-a0d6-4369-a16b-d4a62b78c934" x1="4.83" y1="1.06" x2="4.83" y2="6.38" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#76bc2d"/><stop offset="1" stop-color="#5e9624"/></linearGradient><linearGradient id="b9ef11bd-7128-47a8-8cf1-427a2a8cc53d" x1="14.4" y1="10.64" x2="14.4" y2="15.95" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#76bc2d"/><stop offset="1" stop-color="#5e9624"/></linearGradient></defs><title>Icon-integration-210</title><polygon points="5.36 12.77 5.36 6.38 4.31 6.38 4.31 12.77 4.31 13.36 4.31 13.82 12.65 13.82 12.65 12.77 5.36 12.77" fill="#949494"/><path id="bcfff480-0908-4673-8dd3-211accb6f5e9" d="M4.38,9.82,1.22,13a.55.55,0,0,0,0,.77L4.38,16.9a.55.55,0,0,0,.77,0l3.16-3.16a.55.55,0,0,0,0-.77L5.15,9.82A.55.55,0,0,0,4.38,9.82Z" fill="url(#acc4deac-96b1-4d46-9a2c-4b829b24be19)"/><path id="a2e9ce98-ac6d-463e-9773-5eed323da406" d="M7.49,5.84V1.6A.54.54,0,0,0,7,1.06H2.71a.54.54,0,0,0-.54.54V5.84a.54.54,0,0,0,.54.54H7A.54.54,0,0,0,7.49,5.84Z" fill="url(#a6951013-a0d6-4369-a16b-d4a62b78c934)"/><path id="abb7af69-4e26-4379-92b2-a9feddec43db" d="M11.74,11.18v4.23a.54.54,0,0,0,.54.54h4.24a.54.54,0,0,0,.54-.54V11.18a.54.54,0,0,0-.54-.54H12.28A.54.54,0,0,0,11.74,11.18Z" fill="url(#b9ef11bd-7128-47a8-8cf1-427a2a8cc53d)"/></svg>
);

export const AIBuilderIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 192.756 192.756"><g fill-rule="evenodd" clip-rule="evenodd"><path fill="#fff" d="M0 0h192.756v192.756H0V0z"/><path d="M137.568 16.693h33.057v30.84h-33.057v-30.84zM137.568 54.287h33.057v114.545h-33.057V54.287zM96.155 121.236c.508 4.475.125 5.541.125 7.967 0 12.85-11.319 16.52-15.909 17.438-5.532 1.105-6.433 1.256-12.85.918-5.812-.305-13.955-5.557-13.955-13.105 0-6.549 5.669-11.748 13.511-11.748H90.28c2.363-.001 5.875-1.47 5.875-1.47zM80.668 50.529c7.117.404 18.039.661 28.296 6.99 12.766 7.875 19.133 20.27 19.133 31.707 0 27.299.072 70 .072 70l4.598 9.59H96.743v-6.947c-3.012 0-11.132 4.92-17.125 6.15-7.632 1.568-11.083 1.914-18.868 1.914-20.564 0-37.846-15.709-38.61-32.861 0-.088.02-1.021 0-1.641-.807-24.627 21.357-36.121 42.538-36.121h16.09c12.313 0 16.268-6.752 16.268-12.335 0-4.229-1.985-12.336-16.925-12.336h-3.94c-11.822 0-16.602 5.103-17.022 15.273v3.231H28.014v-7.342c0-15.774 16.995-37.301 52.654-35.272z"/></g></svg>
);