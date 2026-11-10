import { database } from '../database';
import { localDate, uid } from '../dates';
import type { InventoryItem, PrepTask } from '../models';

export async function listInventory(): Promise<InventoryItem[]> {
  const db = await database();
  return db.getAllAsync<InventoryItem>('SELECT * FROM inventory ORDER BY name');
}

export async function listOpenTasks(): Promise<PrepTask[]> {
  const db = await database();
  return db.getAllAsync<PrepTask>('SELECT * FROM tasks WHERE status=? ORDER BY CASE priority WHEN ? THEN 0 ELSE 1 END, due_at', ['open', 'high']);
}

export async function addInventoryItem(name: string, amount: number, unit: string): Promise<void> {
  if (!name.trim() || !Number.isFinite(amount) || amount <= 0) throw new Error('Enter an item name and an amount greater than zero.');
  const db = await database();
  await db.runAsync('INSERT INTO inventory(id,name,amount,unit) VALUES(?,?,?,?)', [uid(), name.trim(), amount, unit]);
}

export async function addPrepTask(title: string): Promise<void> {
  if (!title.trim()) throw new Error('Enter a task name.');
  const db = await database();
  await db.runAsync('INSERT INTO tasks(id,title,local_date) VALUES(?,?,?)', [uid(), title.trim(), localDate()]);
}

export async function completePrepTask(id: string): Promise<void> {
  const db = await database();
  await db.runAsync('UPDATE tasks SET status=? WHERE id=?', ['completed', id]);
}
