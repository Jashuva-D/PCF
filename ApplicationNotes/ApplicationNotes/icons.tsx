import * as React from "react";

export const ClockIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "black" }) => (
  <svg width={size} height={size} color={color} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8.25" stroke="currentColor" strokeOpacity="0.9"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"/>
    <path d="M11 6.41699V11.0003L13.75 13.7503"  stroke="currentColor"   strokeOpacity="0.9"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SearchIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "black" }) => (
    <svg width="24" height={size} viewBox="0 0 24 24" fill="none" color={color} xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7" stroke="white" stroke-opacity="0.9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 21L15 15" stroke="white" stroke-opacity="0.9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)

export const TickIcon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "black" }) => (
    <svg width="32" height={size} color={color} viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M30.3909 5.97651C29.3179 4.13808 27.8623 2.68246 26.0239 1.60944C24.1851 0.536415 22.1777 0 20.0004 0C17.8233 0 15.8153 0.536415 13.9769 1.60944C12.1383 2.68227 10.6826 4.13789 9.60963 5.97651C8.53641 7.81512 8 9.82308 8 12C8 14.1771 8.53661 16.1847 9.60944 18.0235C10.6825 19.8617 12.1381 21.3175 13.9767 22.3906C15.8153 23.4636 17.8231 24 20.0002 24C22.1773 24 24.1853 23.4636 26.0237 22.3906C27.8621 21.3177 29.3177 19.8619 30.3908 18.0235C31.4636 16.1849 32 14.1769 32 12C32 9.82289 31.4636 7.81493 30.3909 5.97651ZM27.7812 10.1719L19.2969 18.6562C19.099 18.8541 18.8595 18.9533 18.5781 18.9533C18.3073 18.9533 18.073 18.8541 17.8751 18.6562L12.2186 13.0001C12.0313 12.8124 11.9375 12.5784 11.9375 12.2971C11.9375 12.0054 12.0311 11.7656 12.2186 11.5781L13.6405 10.1719C13.8386 9.97401 14.0728 9.87505 14.3438 9.87505C14.6148 9.87505 14.8491 9.97401 15.047 10.1719L18.5783 13.7032L24.9534 7.34372C25.1513 7.1458 25.3856 7.04684 25.6564 7.04684C25.927 7.04684 26.1618 7.1458 26.3595 7.34372L27.7814 8.75006C27.9691 8.93743 28.0627 9.17697 28.0627 9.46867C28.0627 9.75001 27.9691 9.98437 27.7812 10.1719Z" fill={color}/>
    </svg>

);

export const TestICon: React.FC<{ size?: number, color?: string }> = ({ size = 22, color = "black" }) => (
    <svg width="16" height={size} viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3.33325" y="4" width="9.33333" height="12" rx="2" stroke="white" stroke-opacity="0.9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 6.66634H10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 9.33333H10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 12.0003H8.66667" stroke="white" stroke-opacity="0.9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
);