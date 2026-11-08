import React from "react";

type P = { size?: number; color?: string; strokeWidth?: number; style?: React.CSSProperties };
const base = (size: number, style?: React.CSSProperties) => ({ width: size, height: size, display: "block", flex: "none", ...style });
const S: React.FC<P & { children: React.ReactNode }> = ({ size = 24, color = "#fff", strokeWidth = 1.8, style, children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={base(size, style)}>
    {children}
  </svg>
);

export const IconHome: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M3 11 12 4l9 7v9H3z" fill={p.color ?? "#fff"} stroke="none" />
    <path d="M9 20v-5h6v5" stroke="#1f2660" strokeWidth={2} />
  </S>
);
export const IconBars: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M5 20V10M10 20V4M15 20v-8M20 20v-4" strokeWidth={2.6} />
  </S>
);
export const IconBell: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </S>
);
export const IconChat: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" />
  </S>
);
export const IconCalendar: React.FC<P> = (p) => (
  <S {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </S>
);
export const IconPie: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M12 3v9h9" />
    <path d="M21 12a9 9 0 1 1-9-9" />
  </S>
);
export const IconGear: React.FC<P> = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
  </S>
);
export const IconHelp: React.FC<P> = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01" />
  </S>
);
export const IconSearch: React.FC<P> = (p) => (
  <S {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4 4" />
  </S>
);
export const IconArrowUpRight: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </S>
);
export const IconChevronDown: React.FC<P> = (p) => (
  <S {...p}>
    <path d="m6 9 6 6 6-6" />
  </S>
);
export const IconCheckCircle: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M21 12a9 9 0 1 1-4-7.5" />
    <path d="m9 12 2.5 2.5L20 6" />
  </S>
);
export const IconCheckSquare: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M4 5a1 1 0 0 1 1-1h11" />
    <path d="M4 5v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
    <path d="m8 12 3 3 9-9" strokeWidth={2.2} />
  </S>
);
export const IconClock: React.FC<P> = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </S>
);
export const IconClip: React.FC<P> = (p) => (
  <S {...p}>
    <path d="m20 11-8.5 8.5a5 5 0 0 1-7-7L13 4a3.3 3.3 0 0 1 4.7 4.7L9.5 17a1.6 1.6 0 0 1-2.3-2.3L15 7" />
  </S>
);
export const IconEdit: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M4 20h4l10-10-4-4L4 16z" />
    <path d="m12.5 7.5 4 4" />
  </S>
);
export const IconDoc: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M6 3h8l5 5v13H6z" fill={p.color ?? "#fff"} stroke="none" />
    <path d="M14 3v5h5" stroke="#1f2660" strokeWidth={1.6} />
  </S>
);
export const IconDocPlus: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M6 3h8l5 5v13H6z" />
    <path d="M14 3v5h5M12 11v6M9 14h6" />
  </S>
);
export const IconFolder: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M3 6h6l2 2h10v11H3z" fill={p.color ?? "#fff"} stroke="none" />
  </S>
);
export const IconUser: React.FC<P> = (p) => (
  <S {...p}>
    <circle cx="12" cy="9" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </S>
);
export const IconPlus: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M12 5v14M5 12h14" strokeWidth={2.2} />
  </S>
);
export const IconPlay: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M8 5v14l11-7z" fill={p.color ?? "#fff"} stroke="none" />
  </S>
);
export const IconMore: React.FC<P> = (p) => (
  <S {...p}>
    <circle cx="12" cy="5" r="1.6" fill={p.color ?? "#fff"} stroke="none" />
    <circle cx="12" cy="12" r="1.6" fill={p.color ?? "#fff"} stroke="none" />
    <circle cx="12" cy="19" r="1.6" fill={p.color ?? "#fff"} stroke="none" />
  </S>
);
export const IconCheck: React.FC<P> = (p) => (
  <S {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" strokeWidth={2.2} />
  </S>
);
export const IconArrowDownRight: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M7 7l10 10M17 9v8H9" />
  </S>
);
