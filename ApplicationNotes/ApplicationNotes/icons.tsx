import * as React from "react";

export const ClockIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "black" }) => (
  <svg
    width={size}
    height={size}
    color={color}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="11"
      cy="11"
      r="8.25"
      stroke="currentColor"
      strokeOpacity="0.9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 6.41699V11.0003L13.75 13.7503"
      stroke="currentColor"
      strokeOpacity="0.9"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

