import { database } from '../database';
import { localDate, uid } from '../dates';
import type { WeightEntry } from '../models';

export async function listWeightEntries(limit = 30): Promise<WeightEntry[]> {
  const db = await database();
  return db.getAllAsync<WeightEntry>('SELECT * FROM weight_logs ORDER BY measured_at DESC LIMIT ?', [limit]);
}

export async function addWeightEntry(weightKg: number): Promise<void> {
  if (!Number.isFinite(weightKg) || weightKg < 20 || weightKg > 400) throw new Error('Enter a weight between 20 and 400 kg.');
  const db = await database();
  await db.runAsync('INSERT INTO weight_logs(id,weight_kg,measured_at,local_date) VALUES(?,?,?,?)', [uid(), weightKg, new Date().toISOString(), localDate()]);
}
