import React from 'react';

interface MakeBrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'badge' | 'lockup' | 'clean';
  className?: string;
  theme?: 'dark' | 'light';
}

export const MakeBrandLogo: React.FC<MakeBrandLogoProps> = ({
  size = 'md',
  variant = 'badge',
  className = '',
  theme = 'dark',
}) => {
  const sizeMap = {
    xs: { dim: 28, text: 'text-xs', sub: 'text-[8px]' },
    sm: { dim: 36, text: 'text-sm', sub: 'text-[9px]' },
    md: { dim: 44, text: 'text-base', sub: 'text-[10px]' },
    lg: { dim: 64, text: 'text-xl', sub: 'text-xs' },
    xl: { dim: 96, text: 'text-3xl', sub: 'text-sm' },
  };

  const { dim } = sizeMap[size];

  // SVG badge matching user's uploaded IMG_5353.jpeg exactly
  const BadgeSvg = () => (
    <svg
      viewBox="0 0 500 500"
      width={dim}
      height={dim}
      className="shrink-0 transition-transform duration-200"
      aria-label="Make Brand Shymkent Logo"
    >
      {/* Circle */}
      <circle cx="250" cy="250" r="240" fill={theme === 'dark' ? '#000000' : '#09090b'} />

      {/* Dynamic Sneaker Graphic in White */}
      <g fill="#FFFFFF">
        {/* Shoe Upper Contour */}
        <path d="M285,142 C295,147 312,172 325,185 C310,195 292,208 280,225 C255,258 220,298 185,308 C176,311 168,309 173,300 C182,284 212,242 226,220 C234,207 248,175 285,142 Z" />
        
        {/* Sole & Curve */}
        <path d="M172,302 C190,300 230,285 270,250 C295,228 322,198 325,185 C328,188 320,210 295,238 C265,272 225,296 178,304 C173,305 170,304 172,302 Z" opacity="0.95" />

        {/* Tongue */}
        <path d="M280,140 C286,138 296,155 304,166 C293,172 284,183 277,192 C273,180 273,165 280,140 Z" />

        {/* Laces */}
        <path d="M242,205 L254,198 C256,197 258,199 257,201 L246,210 C244,212 241,210 242,205 Z" />
        <path d="M232,220 L244,213 C246,212 248,214 247,216 L236,225 C234,227 231,225 232,220 Z" />
        <path d="M222,235 L234,228 C236,227 238,229 237,231 L226,240 C224,242 221,240 222,235 Z" />
        <path d="M212,250 L224,243 C226,242 228,244 227,246 L216,255 C214,257 211,255 212,250 Z" />
        <path d="M202,265 L214,258 C216,257 218,259 217,261 L206,270 C204,272 201,270 202,265 Z" />

        {/* Motion lines under sole */}
        <rect x="228" y="303" width="95" height="3.5" rx="1.75" />
        <rect x="245" y="309" width="75" height="2.8" rx="1.4" />
        <rect x="260" y="314" width="55" height="2" rx="1" />
      </g>

      {/* MAKE_BRAND Wordmark */}
      <text
        x="250"
        y="375"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="'Outfit', system-ui, sans-serif"
        fontWeight="900"
        fontSize="44"
        letterSpacing="2"
      >
        MAKE_BRAND
      </text>

      {/* SHYMKENT Subtitle */}
      <text
        x="250"
        y="415"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="'Outfit', system-ui, sans-serif"
        fontWeight="600"
        fontSize="16"
        letterSpacing="12"
      >
        SHYMKENT
      </text>
    </svg>
  );

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <BadgeSvg />
      </div>
    );
  }

  // Lockup: Circular Logo + Text wordmark
  return (
    <div className={`inline-flex items-center gap-2.5 shrink-0 ${className}`}>
      <BadgeSvg />
      <div className="flex flex-col leading-none">
        <span className="font-extrabold tracking-tight text-stone-900 font-display uppercase text-sm sm:text-base">
          MAKE_BRAND
        </span>
        <span className="text-[10px] sm:text-[11px] font-semibold text-stone-500 tracking-[0.25em] uppercase">
          SHYMKENT
        </span>
      </div>
    </div>
  );
};
