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

export const JIRAIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "#106EBE" }) => (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <defs>
        <linearGradient id="a" x1="380.896" x2="279.145" y1="390.609" y2="282.574" gradientTransform="matrix(1 0 0 -1 0 514)" gradientUnits="userSpaceOnUse">
            <stop offset=".176" stop-color="#0052cc"/>
            <stop offset="1" stop-color="#2684ff"/>
        </linearGradient>
        <linearGradient id="b" x1="265.965" x2="148.117" y1="270.661" y2="152.607" gradientTransform="matrix(1 0 0 -1 0 514)" gradientUnits="userSpaceOnUse">
            <stop offset=".176" stop-color="#0052cc"/>
            <stop offset="1" stop-color="#2684ff"/>
        </linearGradient>
    </defs>
    <path fill="#2684ff" d="M490.6 7.4H243.9c0 59.6 49.9 108 111.2 108h45.6v42.2c0 59.6 49.9 108 111.2 108V28.1c.1-11.7-9.2-20.7-21.3-20.7"/>
    <path fill="url(#a)" d="M368.7 126.5H121.9c0 59.6 49.9 108 111.2 108h45.6v42.9c0 59.6 49.9 108 111.2 108V147.3c.2-11.1-9.1-20.8-21.2-20.8"/>
    <path fill="url(#b)" d="M246.7 246.3H0c0 59.6 49.9 108 111.2 108h45.6v42.2c0 59.6 49.9 108 111.2 108V267.1c.1-11.8-9.9-20.8-21.3-20.8"/>
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