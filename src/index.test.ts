import { describe, expect, it } from 'vitest';
import { BreakPointer } from './index';
import type { BreakPointerProps, Position } from './index';

describe('Package exports', () => {
  it('should export BreakPointer component', () => {
    expect(BreakPointer).toBeDefined();
    expect(typeof BreakPointer).toBe('function');
  });

  it('should export TypeScript types', () => {
    // Type-only test - if this compiles, types are exported correctly
    const props: BreakPointerProps = {
      initiallyVisible: true,
      toggleKey: 't',
      position: 'bottom-center',
      zIndex: 9999,
      hideInProduction: true,
      showDimensions: true,
      className: 'test',
      style: { color: 'red' },
      fontFamily: 'Arial',
    };

    const position: Position = 'top-left';

    expect(props).toBeDefined();
    expect(position).toBeDefined();
  });

  it('should have correct Position type values', () => {
    const positions: Position[] = [
      'bottom-center',
      'top-center',
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ];

    expect(positions).toHaveLength(6);
    expect(positions).toContain('bottom-center');
    expect(positions).toContain('top-right');
  });
});
