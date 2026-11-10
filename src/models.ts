export interface Profile {
  id: number;
  name: string;
  age: number;
  sex: string;
  height_cm: number;
  weight_kg: number;
  target_weight_kg: number;
  calorie_target: number;
  protein_target: number;
  carbs_target: number;
  fat_target: number;
  steps_target: number;
  water_target_ml: number;
}

export interface Food {
  id: string;
  name: string;
  state: string;
  unit: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
  source: string;
  verified: number;
}

export interface FoodLog {
  id: string;
  food_id: string | null;
  food_name: string;
  prep_state: string;
  amount: number;
  unit: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
  meal: string;
  consumed_at: string;
  local_date: string;
  estimated: number;
  notes: string;
}

export interface WeightEntry {
  id: string;
  weight_kg: number;
  measured_at: string;
  local_date: string;
  note: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  expires_on: string | null;
  updated_at: string;
}

export interface PrepTask {
  id: string;
  title: string;
  detail: string;
  due_at: string | null;
  status: string;
  priority: string;
  source: string;
  local_date: string;
}
