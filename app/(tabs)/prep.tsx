import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Action, Card, Screen, Title } from '../../src/components';
import { addInventoryItem, addPrepTask, completePrepTask, listInventory, listOpenTasks } from '../../src/repositories/prepRepository';
import type { InventoryItem, PrepTask } from '../../src/models';
import { COLORS } from '../../src/theme';

export default function Prep() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('g');
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [tasks, setTasks] = useState<PrepTask[]>([]);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    const [inventory, openTasks] = await Promise.all([listInventory(), listOpenTasks()]);
    setItems(inventory);
    setTasks(openTasks);
  }, []);
  useFocusEffect(useCallback(() => {
    let active = true;
    void Promise.all([listInventory(), listOpenTasks()]).then(
      ([inventory, openTasks]) => { if (active) { setItems(inventory); setTasks(openTasks); setError(''); } },
      () => { if (active) setError('Could not load prep and inventory data.'); },
    );
    return () => { active = false; };
  }, []));

  async function addItem() {
    try {
      await addInventoryItem(name, Number(amount), unit);
      setName('');
      setAmount('');
      setError('');
      await refresh();
    } catch {
      setError('Add an item name and amount greater than zero. Your input is still available to retry.');
    }
  }

  async function addTask() {
    try {
      await addPrepTask(name);
      setName('');
      setError('');
      await refresh();
    } catch {
      setError('Enter a task name. Your input is still available to retry.');
    }
  }

  async function completeTask(id: string) {
    try {
      await completePrepTask(id);
      setError('');
      await refresh();
    } catch {
      setError('The task could not be updated. Retry when local storage is available.');
    }
  }

  return <Screen><Title eyebrow="Plan & prep" title="Prep" subtitle="A small local inventory and task list." />
    <ScrollView showsVerticalScrollIndicator={false}>
      {error ? <Text accessibilityRole="alert" style={{ color: COLORS.red, marginBottom: 10 }}>{error}</Text> : null}
      <Card><Text style={{ color: COLORS.text, fontWeight: '700', fontSize: 15, marginBottom: 10 }}>Add inventory</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Ingredient or grocery item" placeholderTextColor={COLORS.muted} style={{ color: COLORS.text, backgroundColor: COLORS.raised, padding: 12, borderRadius: 10, marginBottom: 8 }} />
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
          <TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="Amount" placeholderTextColor={COLORS.muted} style={{ flex: 1, color: COLORS.text, backgroundColor: COLORS.raised, padding: 12, borderRadius: 10 }} />
          <Pressable onPress={() => setUnit(current => current === 'g' ? 'pcs' : 'g')} style={{ backgroundColor: COLORS.raised, padding: 12, borderRadius: 10, justifyContent: 'center' }}><Text style={{ color: COLORS.green }}>{unit} · change</Text></Pressable>
        </View>
        <Action label="Add inventory item" onPress={addItem} />
      </Card>
      <Text style={{ color: COLORS.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginVertical: 8 }}>INVENTORY · {items.length} ITEMS</Text>
      {items.length === 0 ? <Text style={{ color: COLORS.muted, marginBottom: 12 }}>Nothing listed yet.</Text> : items.map(item => <Card key={item.id} style={{ paddingVertical: 10 }}><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={{ color: COLORS.text, fontWeight: '600' }}>{item.name}</Text><Text style={{ color: COLORS.muted }}>{item.amount} {item.unit}</Text></View></Card>)}
      <Card><Text style={{ color: COLORS.text, fontWeight: '700', fontSize: 15, marginBottom: 10 }}>Add a prep task</Text>
        <TextInput value={name} onChangeText={setName} placeholder="e.g. Prepare meals for tomorrow" placeholderTextColor={COLORS.muted} style={{ color: COLORS.text, backgroundColor: COLORS.raised, padding: 12, borderRadius: 10, marginBottom: 10 }} />
        <Action label="Add task" onPress={addTask} />
      </Card>
      <Text style={{ color: COLORS.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginVertical: 8 }}>OPEN TASKS</Text>
      {tasks.length === 0 ? <Text style={{ color: COLORS.muted, marginBottom: 20 }}>No open prep tasks.</Text> : tasks.map(task => <Card key={task.id} style={{ paddingVertical: 10 }}><View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><Text style={{ color: COLORS.text, flex: 1, fontWeight: '600' }}>{task.title}</Text><Pressable onPress={() => void completeTask(task.id)}><Text style={{ color: COLORS.green, fontWeight: '700' }}>Done</Text></Pressable></View></Card>)}
    </ScrollView>
  </Screen>;
}
