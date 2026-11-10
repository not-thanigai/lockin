import { database } from '../database';
import { localDate } from '../dates';
import type { Profile } from '../models';

export interface NutritionTotals {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  count: number;
}

export interface DashboardSummary {
  profile: Profile;
  food: NutritionTotals;
  waterMl: number;
  workoutCount: number;
  currentWeightKg: number;
}

interface WeightRow {
  weight_kg: number;
}

export async function getDashboardSummary(date: string = localDate()): Promise<DashboardSummary> {
  const db = await database();
  const [profile, food, hydration, workouts, latestWeight] = await Promise.all([
    db.getFirstAsync<Profile>('SELECT * FROM profile WHERE id=1'),
    db.getFirstAsync<NutritionTotals>(
      'SELECT COALESCE(SUM(kcal),0) kcal,COALESCE(SUM(protein),0) protein,COALESCE(SUM(carbs),0) carbs,COALESCE(SUM(fat),0) fat,COUNT(*) count FROM food_logs WHERE local_date=?', [date],
    ),
    db.getFirstAsync<{ amount: number }>(
      'SELECT COALESCE(SUM(amount_ml),0) amount FROM water_logs WHERE local_date=?', [date],
    ),
    db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) count FROM workouts WHERE local_date=?', [date],
    ),
    db.getFirstAsync<WeightRow>('SELECT weight_kg FROM weight_logs ORDER BY measured_at DESC LIMIT 1'),
  ]);
  if (!profile) throw new Error('Your profile could not be loaded.');
  return {
    profile,
    food: food ?? { kcal: 0, protein: 0, carbs: 0, fat: 0, count: 0 },
    waterMl: hydration?.amount ?? 0,
    workoutCount: workouts?.count ?? 0,
    currentWeightKg: latestWeight?.weight_kg ?? profile.weight_kg,
  };
}
