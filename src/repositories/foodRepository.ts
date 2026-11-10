import { database } from '../database';
import { localDate, uid } from '../dates';
import type { Food, FoodLog } from '../models';

export async function listFoods(search = ''): Promise<Food[]> {
  const db = await database();
  const term = `%${search.trim()}%`;
  return db.getAllAsync<Food>(
    'SELECT * FROM foods WHERE archived=0 AND name LIKE ? ORDER BY name LIMIT 100',
    [term],
  );
}

export async function listFoodLogs(date: string): Promise<FoodLog[]> {
  const db = await database();
  return db.getAllAsync<FoodLog>(
    'SELECT * FROM food_logs WHERE local_date=? ORDER BY consumed_at',
    [date],
  );
}

export async function createCustomFood(food: Omit<Food, 'id' | 'unit' | 'source' | 'verified'>): Promise<void> {
  const db = await database();
  await db.runAsync(
    'INSERT INTO foods(id,name,state,kcal,protein,carbs,fat,fibre,source,verified) VALUES(?,?,?,?,?,?,?,?,?,0)',
    [uid(), food.name.trim(), food.state, food.kcal, food.protein, food.carbs, food.fat, food.fibre, 'User entered'],
  );
}

export async function logFood(food: Food, amount: number, meal: string, date = localDate(), estimated = false): Promise<void> {
  if (!Number.isFinite(amount) || amount <= 0) throw new Error('Amount must be greater than zero.');
  const db = await database();
  const factor = amount / 100;
  await db.runAsync(
    'INSERT INTO food_logs(id,food_id,food_name,prep_state,amount,unit,kcal,protein,carbs,fat,fibre,meal,consumed_at,local_date,estimated) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [uid(), food.id, food.name, food.state, amount, food.unit, food.kcal * factor, food.protein * factor, food.carbs * factor, food.fat * factor, food.fibre * factor, meal, new Date().toISOString(), date, estimated ? 1 : 0],
  );
}
