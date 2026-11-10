import { useCallback, useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Action, Card, Screen, Title, labelStyle } from '../../src/components';
import { formatDate, localDate, shiftDate } from '../../src/dates';
import { listFoodLogs, listFoods, logFood } from '../../src/repositories/foodRepository';
import type { Food, FoodLog } from '../../src/models';
import { COLORS } from '../../src/theme';

const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

export default function FoodScreen() {
  const router = useRouter();
  const [date, setDate] = useState(localDate());
  const [foods, setFoods] = useState<Food[]>([]);
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Food | null>(null);
  const [amount, setAmount] = useState('100');
  const [meal, setMeal] = useState('Lunch');
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    const [availableFoods, dayLogs] = await Promise.all([listFoods(query), listFoodLogs(date)]);
    setFoods(availableFoods);
    setLogs(dayLogs);
  }, [date, query]);

  useFocusEffect(useCallback(() => {
    let active = true;
    void Promise.all([listFoods(query), listFoodLogs(date)]).then(
      ([availableFoods, dayLogs]) => { if (active) { setFoods(availableFoods); setLogs(dayLogs); setError(''); } },
      () => { if (active) setError('Could not load food data. Your local entries are unchanged.'); },
    );
    return () => { active = false; };
  }, [date, query]));

  const totals = useMemo(() => logs.reduce((sum, log) => ({
    kcal: sum.kcal + log.kcal,
    protein: sum.protein + log.protein,
    carbs: sum.carbs + log.carbs,
    fat: sum.fat + log.fat,
  }), { kcal: 0, protein: 0, carbs: 0, fat: 0 }), [logs]);

  async function saveLog() {
    if (!selected || !Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      setError('Enter an amount greater than zero.');
      return;
    }
    try {
      await logFood(selected, Number(amount), meal, date);
      setSelected(null);
      setAmount('100');
      setError('');
      await refresh();
    } catch {
      setError('The food entry could not be saved. Your entry is still available to retry.');
    }
  }

  return <Screen>
    <Title eyebrow="Nutrition" title="Food log" subtitle="Track today or fill in any day from this week." />
    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable onPress={() => setDate(shiftDate(date, -1))}><Text style={{ color: COLORS.green, fontSize: 20, padding: 8 }}>‹</Text></Pressable>
          <View style={{ alignItems: 'center' }}><Text style={{ color: COLORS.text, fontWeight: '700' }}>{formatDate(date)}</Text><Text style={labelStyle}>{date === localDate() ? 'Today' : 'Historical entry'}</Text></View>
          <Pressable onPress={() => setDate(shiftDate(date, 1))}><Text style={{ color: COLORS.green, fontSize: 20, padding: 8 }}>›</Text></Pressable>
        </View>
        <Text style={{ color: COLORS.text, fontSize: 22, fontWeight: '700', marginTop: 12 }}>{Math.round(totals.kcal)} <Text style={{ color: COLORS.muted, fontSize: 13, fontWeight: '400' }}>/ 2,300 kcal</Text></Text>
        <Text style={{ color: COLORS.muted, fontSize: 12, marginTop: 5 }}>P {Math.round(totals.protein)} g · C {Math.round(totals.carbs)} g · F {Math.round(totals.fat)} g</Text>
      </Card>
      {error ? <Text accessibilityRole="alert" style={{ color: COLORS.red, marginBottom: 10 }}>{error}</Text> : null}
      <TextInput value={query} onChangeText={setQuery} placeholder="Search foods" placeholderTextColor={COLORS.muted} style={{ backgroundColor: COLORS.card, color: COLORS.text, padding: 14, borderRadius: 12, marginBottom: 12 }} />
      <Text style={{ color: COLORS.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginVertical: 7 }}>COMMON FOODS · VALUES PER 100 G</Text>
      {foods.map(food => <Pressable key={food.id} onPress={() => { setSelected(food); setAmount('100'); }}>
        <Card style={{ paddingVertical: 12, marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}><Text style={{ color: COLORS.text, fontWeight: '600' }}>{food.name}</Text><Text style={{ color: COLORS.muted, fontSize: 11, marginTop: 3 }}>{food.state} · P {food.protein} g · C {food.carbs} g · F {food.fat} g</Text></View>
            <Text style={{ color: COLORS.green, fontWeight: '700' }}>{Math.round(food.kcal)} kcal</Text>
          </View>
        </Card>
      </Pressable>)}
      <Text style={{ color: COLORS.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginTop: 8, marginBottom: 8 }}>LOGGED MEALS</Text>
      {logs.length === 0 ? <Text style={{ color: COLORS.muted, marginBottom: 20 }}>No entries. This day is untracked, not zero intake.</Text> : logs.map(log => <Card key={log.id} style={{ paddingVertical: 11, marginBottom: 7 }}>
        <Text style={{ color: COLORS.text, fontWeight: '600' }}>{log.food_name} · {log.amount} {log.unit}</Text>
        <Text style={{ color: COLORS.muted, fontSize: 11, marginTop: 4 }}>{log.meal} · {log.prep_state} · {Math.round(log.kcal)} kcal {log.estimated ? '· estimate' : ''}</Text>
      </Card>)}
      <Action label="Create custom food" secondary onPress={() => router.push('/custom-food')} />
    </ScrollView>
    <Modal visible={selected !== null} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
      <View style={{ flex: 1, backgroundColor: '#0009', justifyContent: 'center', padding: 24 }}>
        <Card>
          <Text style={{ color: COLORS.text, fontSize: 19, fontWeight: '700' }}>{selected?.name}</Text>
          <Text style={{ color: COLORS.muted, marginTop: 3, marginBottom: 14 }}>{selected?.state} · nutrition scales from 100 g</Text>
          <Text style={labelStyle}>AMOUNT (GRAMS)</Text>
          <TextInput keyboardType="decimal-pad" value={amount} onChangeText={setAmount} style={{ color: COLORS.text, backgroundColor: COLORS.raised, padding: 13, borderRadius: 10, marginTop: 6, marginBottom: 13 }} />
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 15 }}>{mealTypes.map(type => <Pressable key={type} onPress={() => setMeal(type)} style={{ backgroundColor: meal === type ? COLORS.green : COLORS.raised, padding: 8, borderRadius: 8 }}><Text style={{ fontSize: 11, color: meal === type ? COLORS.bg : COLORS.text }}>{type}</Text></Pressable>)}</View>
          <Action label={`Add ${Math.round((selected?.kcal ?? 0) * Number(amount || 0) / 100)} kcal`} onPress={saveLog} />
          <Pressable onPress={() => setSelected(null)} style={{ padding: 13, alignItems: 'center' }}><Text style={{ color: COLORS.muted }}>Cancel</Text></Pressable>
        </Card>
      </View>
    </Modal>
  </Screen>;
}
