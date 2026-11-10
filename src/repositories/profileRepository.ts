import { database } from '../database';
import type { Profile } from '../models';

export async function getProfile(): Promise<Profile> {
  const db = await database();
  const profile = await db.getFirstAsync<Profile>('SELECT * FROM profile WHERE id=1');
  if (!profile) throw new Error('Profile record is missing.');
  return profile;
}

export type EditableTargets = Pick<Profile, 'age' | 'height_cm' | 'weight_kg' | 'target_weight_kg' | 'calorie_target' | 'protein_target' | 'carbs_target' | 'fat_target' | 'steps_target' | 'water_target_ml'>;

export async function updateTargets(values: EditableTargets): Promise<void> {
  const db = await database();
  await db.runAsync(
    'UPDATE profile SET age=?,height_cm=?,weight_kg=?,target_weight_kg=?,calorie_target=?,protein_target=?,carbs_target=?,fat_target=?,steps_target=?,water_target_ml=? WHERE id=1',
    [values.age, values.height_cm, values.weight_kg, values.target_weight_kg, values.calorie_target, values.protein_target, values.carbs_target, values.fat_target, values.steps_target, values.water_target_ml],
  );
}
