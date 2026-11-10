import * as SQLite from 'expo-sqlite';
let db: SQLite.SQLiteDatabase | null = null;
let dbInitialization: Promise<SQLite.SQLiteDatabase> | null = null;
export function initializeDatabase(): Promise<SQLite.SQLiteDatabase> {
 if(db)return Promise.resolve(db);
 if(dbInitialization)return dbInitialization;
 dbInitialization=(async()=>{
  const opened=await SQLite.openDatabaseAsync('lockin.db');
  try {
   await opened.execAsync(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
 CREATE TABLE IF NOT EXISTS profile(id INTEGER PRIMARY KEY CHECK(id=1),name TEXT NOT NULL DEFAULT 'You',age INTEGER NOT NULL DEFAULT 21,sex TEXT NOT NULL DEFAULT 'Male',height_cm REAL NOT NULL DEFAULT 180,weight_kg REAL NOT NULL DEFAULT 113,target_weight_kg REAL NOT NULL DEFAULT 90,calorie_target INTEGER NOT NULL DEFAULT 2300,protein_target REAL NOT NULL DEFAULT 190,carbs_target REAL NOT NULL DEFAULT 228,fat_target REAL NOT NULL DEFAULT 70,steps_target INTEGER NOT NULL DEFAULT 8000,water_target_ml INTEGER NOT NULL DEFAULT 3000);
 INSERT OR IGNORE INTO profile(id) VALUES(1);
 CREATE TABLE IF NOT EXISTS foods(id TEXT PRIMARY KEY,name TEXT NOT NULL,state TEXT NOT NULL DEFAULT 'as sold',unit TEXT NOT NULL DEFAULT 'g',kcal REAL NOT NULL,protein REAL NOT NULL,carbs REAL NOT NULL,fat REAL NOT NULL,fibre REAL NOT NULL DEFAULT 0,source TEXT NOT NULL DEFAULT 'User entered',verified INTEGER NOT NULL DEFAULT 0,archived INTEGER NOT NULL DEFAULT 0,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
 CREATE INDEX IF NOT EXISTS foods_name_idx ON foods(name);
 CREATE TABLE IF NOT EXISTS food_logs(id TEXT PRIMARY KEY,food_id TEXT,food_name TEXT NOT NULL,prep_state TEXT NOT NULL,amount REAL NOT NULL,unit TEXT NOT NULL,kcal REAL NOT NULL,protein REAL NOT NULL,carbs REAL NOT NULL,fat REAL NOT NULL,fibre REAL NOT NULL DEFAULT 0,meal TEXT NOT NULL,consumed_at TEXT NOT NULL,local_date TEXT NOT NULL,estimated INTEGER NOT NULL DEFAULT 0,notes TEXT NOT NULL DEFAULT '',FOREIGN KEY(food_id) REFERENCES foods(id) ON DELETE SET NULL);
 CREATE INDEX IF NOT EXISTS food_logs_date_idx ON food_logs(local_date,consumed_at);
 CREATE TABLE IF NOT EXISTS water_logs(id TEXT PRIMARY KEY,amount_ml INTEGER NOT NULL,consumed_at TEXT NOT NULL,local_date TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS weight_logs(id TEXT PRIMARY KEY,weight_kg REAL NOT NULL,measured_at TEXT NOT NULL,local_date TEXT NOT NULL,note TEXT NOT NULL DEFAULT '');
 CREATE TABLE IF NOT EXISTS workouts(id TEXT PRIMARY KEY,name TEXT NOT NULL,duration_min INTEGER NOT NULL DEFAULT 0,completed_at TEXT NOT NULL,local_date TEXT NOT NULL,notes TEXT NOT NULL DEFAULT '');
 CREATE TABLE IF NOT EXISTS activity_logs(id TEXT PRIMARY KEY,steps INTEGER NOT NULL DEFAULT 0,active_minutes INTEGER NOT NULL DEFAULT 0,logged_at TEXT NOT NULL,local_date TEXT NOT NULL);
 CREATE INDEX IF NOT EXISTS activity_logs_date_idx ON activity_logs(local_date,logged_at);
 CREATE TABLE IF NOT EXISTS tasks(id TEXT PRIMARY KEY,title TEXT NOT NULL,detail TEXT NOT NULL DEFAULT '',due_at TEXT,status TEXT NOT NULL DEFAULT 'open',priority TEXT NOT NULL DEFAULT 'normal',source TEXT NOT NULL DEFAULT 'user',local_date TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS inventory(id TEXT PRIMARY KEY,name TEXT NOT NULL,amount REAL NOT NULL DEFAULT 0,unit TEXT NOT NULL DEFAULT 'g',expires_on TEXT,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
 CREATE TABLE IF NOT EXISTS schema_migrations(version INTEGER PRIMARY KEY,applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
 INSERT OR IGNORE INTO schema_migrations(version) VALUES(1);`);
   await seedFoods(opened);
   db=opened;
   return opened;
  } catch(error) {
   await opened.closeAsync().catch(()=>undefined);
   throw error;
  }
 })().finally(()=>{if(!db)dbInitialization=null;});
 return dbInitialization;
}
export function database(): Promise<SQLite.SQLiteDatabase>{return db?Promise.resolve(db):initializeDatabase();}
async function seedFoods(d:SQLite.SQLiteDatabase){const rows=[['egg','Egg, whole','raw',143,12.6,.7,9.5],['chicken_raw','Chicken breast','raw',120,22.5,0,2.6],['chicken_cooked','Chicken breast','cooked, skinless',165,31,0,3.6],['rice_raw','White rice','raw, uncooked',365,7.1,80,.7],['rice_cooked','White rice','cooked',130,2.7,28.2,.3],['curd','Curd, plain','as sold',61,3.5,4.7,3.3],['oats','Oats, rolled','dry',389,16.9,66.3,6.9],['banana','Banana','raw',89,1.1,22.8,.3],['milk','Milk, 2%','as sold',50,3.3,4.8,2],['roti','Roti, whole wheat','cooked',297,9.6,46,7.4],['whey','Whey protein powder','dry',400,80,8,6],['almonds','Almonds','raw',579,21.2,21.6,49.9],['dal','Toor dal','cooked',121,6.8,20,1.5],['salmon','Salmon','cooked',206,22.1,0,12.4],['spinach','Spinach','raw',23,2.9,3.6,.4],['oil','Olive oil','as sold',884,0,0,100]] as const; await d.withTransactionAsync(async()=>{for(const [id,name,state,kcal,protein,carbs,fat] of rows) await d.runAsync('INSERT OR IGNORE INTO foods(id,name,state,kcal,protein,carbs,fat,source,verified) VALUES(?,?,?,?,?,?,?,?,0)',[id,name,state,kcal,protein,carbs,fat,'USDA FDC reference estimate']);});}
