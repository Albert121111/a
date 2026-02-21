import { describe, it, expect } from 'vitest';
import { canCancel } from '@/lib/booking/rules';

describe('canCancel', () => {
  it('allows cancellation when before threshold', () => {
    const now = new Date('2025-01-01T08:00:00Z');
    const start = new Date('2025-01-01T12:30:00Z');
    expect(canCancel(start, 2, now)).toBe(true);
  });

  it('blocks cancellation too close to class', () => {
    const now = new Date('2025-01-01T10:45:00Z');
    const start = new Date('2025-01-01T12:00:00Z');
    expect(canCancel(start, 2, now)).toBe(false);
  });
});
