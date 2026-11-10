import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Action, Card, Screen, Title } from '../src/components';
import { createCustomFood } from '../src/repositories/foodRepository';
import { COLORS } from '../src/theme';

const numericFields = ['kcal', 'protein', 'carbs', 'fat', 'fibre'] as const;
const fields = [
  ['name', 'Food name'], ['state', 'Preparation state (raw / cooked / as sold)'],
  ['kcal', 'Calories per 100 g'], ['protein', 'Protein per 100 g'],
  ['carbs', 'Carbohydrates per 100 g'], ['fat', 'Fat per 100 g'], ['fibre', 'Fibre per 100 g'],
] as const;

type FormValues = Record<(typeof fields)[number][0], string>;

export default function CustomFood() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>({ name: '', state: 'as sold', kcal: '', protein: '', carbs: '', fat: '', fibre: '0' });
  const [error, setError] = useState('');

  async function save() {
    if (!values.name.trim()) { setError('Add a name for this food.'); return; }
    const nutrition = Object.fromEntries(numericFields.map(key => [key, Number(values[key])])) as Record<(typeof numericFields)[number], number>;
    if (numericFields.some(key => !Number.isFinite(nutrition[key]) || nutrition[key] < 0)) { setError('Enter valid nonnegative nutrition values per 100 g.'); return; }
    try {
      await createCustomFood({ name: values.name, state: values.state || 'as sold', ...nutrition });
      setError('');
      router.back();
    } catch {
      setError('The food could not be saved. Your values are still available to retry.');
    }
  }

  return <Screen><Title eyebrow="Food database" title="Custom food" subtitle="Enter nutrition per 100 g. Values stay on this device." />
    <ScrollView keyboardShouldPersistTaps="handled">{fields.map(([key, label]) => <Card key={key} style={{ paddingVertical: 10, marginBottom: 8 }}>
      <Text style={{ color: COLORS.muted, fontSize: 12, marginBottom: 6 }}>{label}</Text>
      <TextInput value={values[key]} onChangeText={value => setValues(current => ({ ...current, [key]: value }))} keyboardType={key === 'name' || key === 'state' ? 'default' : 'decimal-pad'} style={{ color: COLORS.text, fontSize: 16, paddingVertical: 3 }} />
    </Card>)}
    {error ? <Text accessibilityRole="alert" style={{ color: COLORS.red, marginBottom: 10 }}>{error}</Text> : null}
    <View style={{ marginTop: 5, marginBottom: 24 }}><Action label="Save custom food" onPress={save} /></View>
  </ScrollView></Screen>;
}
