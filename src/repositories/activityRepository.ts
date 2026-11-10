import { database } from '../database';
import { localDate, uid } from '../dates';
import { latestStepReading } from '../metrics';
import type { StepReading } from '../metrics';

export interface WorkoutSummary {
  id: string;
  name: string;
  duration_min: number;
}

export interface ActivitySummary {
  stepTarget: number;
  currentSteps: number;
  workouts: WorkoutSummary[];
  waterMl: number;
}

export async function getActivitySummary(date: string = localDate()): Promise<ActivitySummary> {
  const db = await database();
  const [profile, readings, workouts, hydration] = await Promise.all([
    db.getFirstAsync<{ steps_target: number }>('SELECT steps_target FROM profile WHERE id=1'),
    db.getAllAsync<StepReading>(
      'SELECT steps,logged_at FROM activity_logs WHERE local_date=? ORDER BY logged_at DESC', [date],
    ),
    db.getAllAsync<WorkoutSummary>(
      'SELECT id,name,duration_min FROM workouts WHERE local_date=? ORDER BY completed_at DESC', [date],
    ),
    db.getFirstAsync<{ amount: number }>(
      'SELECT COALESCE(SUM(amount_ml),0) amount FROM water_logs WHERE local_date=?', [date],
    ),
  ]);
  return {
    stepTarget: profile?.steps_target ?? 8000,
    currentSteps: latestStepReading(readings),
    workouts,
    waterMl: hydration?.amount ?? 0,
  };
}

export async function addWater(amountMl: number, date: string = localDate()): Promise<void> {
  if (!Number.isFinite(amountMl) || amountMl <= 0) throw new Error('Water amount must be greater than zero.');
  const db = await database();
  await db.runAsync(
    'INSERT INTO water_logs(id,amount_ml,consumed_at,local_date) VALUES(?,?,?,?)',
    [uid(), amountMl, new Date().toISOString(), date],
  );
}

export async function saveStepReading(steps: number, date: string = localDate()): Promise<void> {
  if (!Number.isInteger(steps) || steps < 0) throw new Error('Enter a whole, nonnegative step count.');
  const db = await database();
  await db.runAsync(
    'INSERT INTO activity_logs(id,steps,logged_at,local_date) VALUES(?,?,?,?)',
    [uid(), steps, new Date().toISOString(), date],
  );
}

export async function saveWorkout(name: string, durationMinutes: number, date: string = localDate()): Promise<void> {
  if (!name.trim()) throw new Error('Enter a workout name.');
  if (!Number.isInteger(durationMinutes) || durationMinutes < 1) throw new Error('Enter a workout duration of at least one minute.');
  const db = await database();
  await db.runAsync(
    'INSERT INTO workouts(id,name,duration_min,completed_at,local_date) VALUES(?,?,?,?,?)',
    [uid(), name.trim(), durationMinutes, new Date().toISOString(), date],
  );
}
