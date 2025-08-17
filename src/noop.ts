import type React from 'react';

export type Position =
  | 'bottom-center'
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface BreakPointerProps {
  initiallyVisible?: boolean;
  toggleKey?: string;
  toggleOnKey?: string;
  toggleOffKey?: string;
  position?: Position;
  zIndex?: number;
  showDimensions?: boolean;
  className?: string;
  style?: React.CSSProperties;
  fontFamily?: string;
}

export const BreakPointer: React.FC<BreakPointerProps> = () => null;
