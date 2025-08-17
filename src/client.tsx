'use client';

import type React from 'react';
import { useEffect, useMemo, useState } from 'react';

export type Position =
  | 'bottom-center'
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface BreakPointerProps {
  initiallyVisible?: boolean;
  /** Deprecated: use toggleOnKey/toggleOffKey. If provided, on=toggleKey, off=toggleKey.toUpperCase() */
  toggleKey?: string;
  /** Key to turn the overlay ON. Defaults to 't'. */
  toggleOnKey?: string;
  /** Key to turn the overlay OFF. Defaults to 'T' (Shift+T). */
  toggleOffKey?: string;
  position?: Position;
  zIndex?: number;
  showDimensions?: boolean;
  className?: string;
  style?: React.CSSProperties;
  fontFamily?: string;
  /** Optional override for Tailwind-like breakpoints (in px). */
  screens?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
}

const DEFAULT_FONT_FAMILY =
  'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace';

function ensureStylesInjected(cssText: string) {
  if (typeof document === 'undefined') {
    return;
  }
  const id = 'rtwbp-styles';
  const existing = document.getElementById(id) as HTMLStyleElement | null;
  if (existing) {
    if (existing.textContent !== cssText) {
      existing.textContent = cssText;
    }
    return;
  }
  const style = document.createElement('style');
  style.id = id;
  style.textContent = cssText;
  document.head.appendChild(style);
}

function generateCss(params: {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  x2l: number;
}) {
  const { sm, md, lg, xl, x2l } = params;
  const toMax = (n: number) => `${Math.max(0, n - 0.02)}px`;
  return `
.rtwbp-container{position:fixed;border:2px solid #000;border-radius:4px;font-size:12px;line-height:1.1;background:transparent}
.rtwbp-bottom-center{bottom:8px;left:50%;transform:translateX(-50%)}
.rtwbp-top-center{top:8px;left:50%;transform:translateX(-50%)}
.rtwbp-top-left{top:8px;left:8px}
.rtwbp-top-right{top:8px;right:8px}
.rtwbp-bottom-left{bottom:8px;left:8px}
.rtwbp-bottom-right{bottom:8px;right:8px}
.rtwbp-badge{display:none;padding:4px 8px;font-family:inherit;font-weight:600;letter-spacing:-0.01em}
.rtwbp-xs{background:#ec2427;color:#fff}
.rtwbp-sm{background:#f36525;color:#fff}
.rtwbp-md{background:#edb41f;color:#fff}
.rtwbp-lg{background:#f7ee49;color:#000}
.rtwbp-xl{background:#4686c5;color:#fff}
.rtwbp-2xl{background:#45b64a;color:#fff}
@media (max-width:${toMax(sm)}){.rtwbp-xs{display:block}}
@media (min-width:${sm}px) and (max-width:${toMax(md)}){.rtwbp-sm{display:block}}
@media (min-width:${md}px) and (max-width:${toMax(lg)}){.rtwbp-md{display:block}}
@media (min-width:${lg}px) and (max-width:${toMax(xl)}){.rtwbp-lg{display:block}}
@media (min-width:${xl}px) and (max-width:${toMax(x2l)}){.rtwbp-xl{display:block}}
@media (min-width:${x2l}px){.rtwbp-2xl{display:block}}
`;
}

export const BreakPointer: React.FC<BreakPointerProps> = ({
  initiallyVisible = true,
  toggleKey,
  toggleOnKey,
  toggleOffKey,
  position = 'bottom-center',
  zIndex = 9999,
  showDimensions = true,
  className = '',
  style = {},
  fontFamily = DEFAULT_FONT_FAMILY,
  screens,
}) => {
  const [isVisible, setIsVisible] = useState(initiallyVisible);
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  // Resolve explicit on/off keys with backward-compat for toggleKey
  const resolvedToggleOnKey = toggleOnKey ?? (toggleKey ? toggleKey : 't');
  const resolvedToggleOffKey = toggleOffKey ?? (toggleKey ? toggleKey.toUpperCase() : 'T');

  useEffect(() => {
    setIsMounted(true);

    const updateViewport = () => {
      if (typeof window !== 'undefined') {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === resolvedToggleOnKey) {
        setIsVisible(true);
        return;
      }
      if (event.key === resolvedToggleOffKey) {
        setIsVisible(false);
        return;
      }
    };

    // Throttle resize events
    let resizeTimeout: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateViewport, 16);
    };

    updateViewport();

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.addEventListener('keydown', handleKeyPress);
      window.addEventListener('resize', throttledResize);
    }

    return () => {
      clearTimeout(resizeTimeout);
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        document.removeEventListener('keydown', handleKeyPress);
        window.removeEventListener('resize', throttledResize);
      }
    };
  }, [resolvedToggleOnKey, resolvedToggleOffKey]);

  const resolvedScreens = useMemo(() => {
    return {
      sm: screens?.sm ?? 640,
      md: screens?.md ?? 768,
      lg: screens?.lg ?? 1024,
      xl: screens?.xl ?? 1280,
      x2l: screens?.['2xl'] ?? 1536,
    } as const;
  }, [screens?.sm, screens?.md, screens?.lg, screens?.xl, screens?.['2xl']]);

  useEffect(() => {
    const css = generateCss(resolvedScreens);
    ensureStylesInjected(css);
  }, [resolvedScreens]);

  if (!isMounted) {
    return null;
  }
  if (!isVisible) {
    return null;
  }

  const positionClass =
    position === 'top-center'
      ? 'rtwbp-top-center'
      : position === 'top-left'
        ? 'rtwbp-top-left'
        : position === 'top-right'
          ? 'rtwbp-top-right'
          : position === 'bottom-left'
            ? 'rtwbp-bottom-left'
            : position === 'bottom-right'
              ? 'rtwbp-bottom-right'
              : 'rtwbp-bottom-center';

  const containerStyles: React.CSSProperties = {
    zIndex,
    fontFamily,
    ...style,
  };

  return (
    <div
      className={`rtwbp-container ${positionClass} ${className}`}
      style={containerStyles}
      aria-hidden="true"
    >
      <span className="rtwbp-badge rtwbp-xs">
        1/6 <span>•</span> xs <span>•</span>{' '}
        {showDimensions && (
          <span>
            {viewport.width}px <span>&lt;</span> {resolvedScreens.sm}px
          </span>
        )}
      </span>

      <span className="rtwbp-badge rtwbp-sm">
        2/6 <span>•</span> sm <span>•</span>{' '}
        {showDimensions && (
          <span>
            {viewport.width}px <span>&lt;</span> {resolvedScreens.md}px
          </span>
        )}
      </span>

      <span className="rtwbp-badge rtwbp-md">
        3/6 <span>•</span> md <span>•</span>{' '}
        {showDimensions && (
          <span>
            {viewport.width}px <span>&lt;</span> {resolvedScreens.lg}px
          </span>
        )}
      </span>

      <span className="rtwbp-badge rtwbp-lg">
        4/6 <span>•</span> lg <span>•</span>{' '}
        {showDimensions && (
          <span>
            {viewport.width}px <span>&lt;</span> {resolvedScreens.xl}px
          </span>
        )}
      </span>

      <span className="rtwbp-badge rtwbp-xl">
        5/6 <span>•</span> xl <span>•</span>{' '}
        {showDimensions && (
          <span>
            {viewport.width}px <span>&lt;</span> {resolvedScreens.x2l}px
          </span>
        )}
      </span>

      <span className="rtwbp-badge rtwbp-2xl">
        6/6 <span>•</span> 2xl <span>•</span>{' '}
        {showDimensions && (
          <span>
            {viewport.width}px <span>≥</span> {resolvedScreens.x2l}px
          </span>
        )}
      </span>
    </div>
  );
};
