export type StepReading = { steps: number; logged_at: string };

/** Progress is measured from the starting value toward the chosen target. */
export function goalProgressPercent(start: number, current: number, target: number): number {
  const distance = target - start;
  if (distance === 0) return current === target ? 100 : 0;
  return Math.min(100, Math.max(0, ((current - start) / distance) * 100));
}

/** Manual step entries are daily counter readings; the newest reading is authoritative. */
export function latestStepReading(readings: StepReading[]): number {
  if (readings.length === 0) return 0;
  return readings.reduce((latest, reading) => reading.logged_at > latest.logged_at ? reading : latest).steps;
}
