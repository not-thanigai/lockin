import { describe, expect, test } from '@jest/globals';
import { goalProgressPercent, latestStepReading } from '../metrics';

describe('progress metrics', () => {
  test('uses the editable starting weight rather than a fixed default', () => {
    expect(goalProgressPercent(100, 95, 80)).toBeCloseTo(25);
  });

  test('clamps progress and handles an already reached or unchanged goal', () => {
    expect(goalProgressPercent(100, 70, 80)).toBe(100);
    expect(goalProgressPercent(100, 100, 80)).toBe(0);
    expect(goalProgressPercent(80, 80, 80)).toBe(100);
  });

  test('supports goals in either direction', () => {
    expect(goalProgressPercent(80, 90, 100)).toBe(50);
  });

  test('uses the latest cumulative step reading, not the sum of readings', () => {
    expect(latestStepReading([
      { steps: 1200, logged_at: '2026-11-10T10:00:00.000Z' },
      { steps: 4300, logged_at: '2026-11-10T14:00:00.000Z' },
    ])).toBe(4300);
  });

  test('returns zero when there are no step readings', () => {
    expect(latestStepReading([])).toBe(0);
  });
});
