/// <reference path="./global.d.ts" />
import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BreakPointer } from './BreakPointer';

describe('BreakPointer - Core functionality', () => {
  beforeEach(() => {
    mockEnvironment('development');
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    const { container } = render(<BreakPointer />);
    expect(container).toBeInTheDocument();
  });

  // Production gating removed; component renders regardless of NODE_ENV

  it('should apply custom className', () => {
    const { container } = render(<BreakPointer className="custom-test-class" />);
    const element = container.querySelector('.custom-test-class');
    expect(element).toBeInTheDocument();
  });

  it('should apply custom zIndex style', () => {
    const { container } = render(<BreakPointer zIndex={12345} />);
    const element = container.firstChild as HTMLElement;
    expect(element?.style.zIndex).toBe('12345');
  });

  it('should apply custom fontFamily style', () => {
    const { container } = render(<BreakPointer fontFamily="Arial, sans-serif" />);
    const element = container.firstChild as HTMLElement;
    expect(element?.style.fontFamily).toBe('Arial, sans-serif');
  });

  it('should have aria-hidden attribute', () => {
    const { container } = render(<BreakPointer />);
    const element = container.firstChild as HTMLElement;
    expect(element?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should render all breakpoint spans', () => {
    const { container } = render(<BreakPointer />);
    const spans = container.querySelectorAll('span');
    // Should have 6 main breakpoint spans + various nested spans
    expect(spans.length).toBeGreaterThan(6);
  });

  it('should contain breakpoint labels', () => {
    const { container } = render(<BreakPointer />);
    const text = container.textContent;
    expect(text).toContain('xs');
    expect(text).toContain('sm');
    expect(text).toContain('md');
    expect(text).toContain('lg');
    expect(text).toContain('xl');
    expect(text).toContain('2xl');
  });

  it('should apply different position classes', () => {
    const { container: container1 } = render(<BreakPointer position="top-left" />);
    const element1 = container1.firstChild as HTMLElement;
    expect(element1?.className).toContain('rtwbp-top-left');

    const { container: container2 } = render(<BreakPointer position="bottom-right" />);
    const element2 = container2.firstChild as HTMLElement;
    expect(element2?.className).toContain('rtwbp-bottom-right');
  });
});
