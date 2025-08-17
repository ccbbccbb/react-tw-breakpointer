'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

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
  hideInProduction?: boolean;
  showDimensions?: boolean;
  className?: string;
  style?: React.CSSProperties;
  fontFamily?: string;
}

const DEFAULT_FONT_FAMILY =
  'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace';

const positionClasses: Record<Position, string> = {
  'bottom-center': 'fixed bottom-2 left-1/2 -translate-x-1/2',
  'top-center': 'fixed top-2 left-1/2 -translate-x-1/2',
  'top-left': 'fixed top-2 left-2',
  'top-right': 'fixed top-2 right-2',
  'bottom-left': 'fixed bottom-2 left-2',
  'bottom-right': 'fixed bottom-2 right-2',
};

export const BreakPointer: React.FC<BreakPointerProps> = ({
  initiallyVisible = true,
  toggleKey,
  toggleOnKey,
  toggleOffKey,
  position = 'bottom-center',
  zIndex = 9999,
  hideInProduction = true,
  showDimensions = true,
  className = '',
  style = {},
  fontFamily = DEFAULT_FONT_FAMILY,
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

  // Production auto-hide
  if (
    hideInProduction &&
    typeof process !== 'undefined' &&
    process.env?.NODE_ENV === 'production'
  ) {
    return null;
  }

  if (!isMounted) {
    return null;
  }
  if (!isVisible) {
    return null;
  }

  const positionClass = positionClasses[position] || positionClasses['bottom-center'];

  const containerStyles: React.CSSProperties = {
    zIndex,
    fontFamily,
    ...style,
  };

  return (
    <div
      className={`${positionClass} rounded border-2 border-black text-xs ${className}`}
      style={containerStyles}
      aria-hidden="true"
    >
      <span className="block items-center bg-[#ec2427] px-2 py-1 font-mono font-semibold tracking-tighter text-white sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
        1/6 <span className="text-black">•</span> xs <span className="text-black">•</span>{' '}
        {showDimensions && (
          <span className="text-gray-100">
            {viewport.width}px <span className="text-black">&lt;</span> 640px
          </span>
        )}
      </span>

      <span className="hidden items-center bg-[#f36525] px-2 py-1 font-mono font-semibold tracking-tighter text-white sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        2/6 <span className="text-black">•</span> sm <span className="text-black">•</span>{' '}
        {showDimensions && (
          <span className="text-gray-100">
            {viewport.width}px <span className="text-black">&lt;</span> 768px
          </span>
        )}
      </span>

      <span className="hidden items-center bg-[#edb41f] px-2 py-1 font-mono font-semibold tracking-tighter text-white md:block lg:hidden xl:hidden 2xl:hidden">
        3/6 <span className="text-black">•</span> md <span className="text-black">•</span>{' '}
        {showDimensions && (
          <span className="text-gray-100">
            {viewport.width}px <span className="text-black">&lt;</span> 1024px
          </span>
        )}
      </span>

      <span className="hidden items-center bg-[#f7ee49] px-2 py-1 font-mono font-semibold tracking-tighter text-black lg:block xl:hidden 2xl:hidden">
        4/6 <span className="text-black">•</span> lg <span className="text-black">•</span>{' '}
        {showDimensions && (
          <span className="text-black">
            {viewport.width}px <span className="text-black">&lt;</span> 1280px
          </span>
        )}
      </span>

      <span className="hidden items-center bg-[#4686c5] px-2 py-1 font-mono font-semibold tracking-tighter text-white xl:block 2xl:hidden">
        5/6 <span className="text-black">•</span> xl <span className="text-black">•</span>{' '}
        {showDimensions && (
          <span className="text-gray-100">
            {viewport.width}px <span className="text-black">&lt;</span> 1536px
          </span>
        )}
      </span>

      <span className="hidden items-center bg-[#45b64a] px-2 py-1 font-mono font-semibold tracking-tighter text-white 2xl:block">
        6/6 <span className="text-black">•</span> 2xl <span className="text-black">•</span>{' '}
        {showDimensions && (
          <span className="text-gray-100">
            {viewport.width}px <span className="text-black">≥</span> 1536px
          </span>
        )}
      </span>
    </div>
  );
};
