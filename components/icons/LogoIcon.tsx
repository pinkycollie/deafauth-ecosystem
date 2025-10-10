
import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12L12 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l6.82 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l-6.82 4.5" />
    </svg>
);
