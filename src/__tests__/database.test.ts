import { describe, expect, jest, test } from '@jest/globals';
import * as SQLite from 'expo-sqlite';
import { initializeDatabase } from '../database';

jest.mock('expo-sqlite', () => ({ openDatabaseAsync: jest.fn() }));

const openDatabase = jest.mocked(SQLite.openDatabaseAsync);
const fakeDatabase = {
  execAsync: jest.fn(async () => undefined),
  withTransactionAsync: jest.fn(async (work: () => Promise<void>) => work()),
  runAsync: jest.fn(async () => ({ lastInsertRowId: 1, changes: 1 })),
  closeAsync: jest.fn(async () => undefined),
} as unknown as SQLite.SQLiteDatabase;
const execAsync = jest.mocked(fakeDatabase.execAsync);

describe('database initialization', () => {
  test('allows retry after an open failure and shares concurrent initialization', async () => {
    openDatabase.mockRejectedValueOnce(new Error('temporary open failure'));
    await expect(initializeDatabase()).rejects.toThrow('temporary open failure');

    openDatabase.mockResolvedValueOnce(fakeDatabase);
    execAsync.mockRejectedValueOnce(new Error('temporary schema failure'));
    await expect(initializeDatabase()).rejects.toThrow('temporary schema failure');
    expect(fakeDatabase.closeAsync).toHaveBeenCalledTimes(1);

    openDatabase.mockResolvedValueOnce(fakeDatabase);
    const first = initializeDatabase();
    const concurrent = initializeDatabase();
    expect(concurrent).toBe(first);
    await Promise.all([first, concurrent]);

    expect(openDatabase).toHaveBeenCalledTimes(3);
    expect(execAsync).toHaveBeenCalledTimes(2);
    expect(fakeDatabase.withTransactionAsync).toHaveBeenCalledTimes(1);
  });
});
