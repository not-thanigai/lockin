import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Action, Card, Screen, Title } from '../src/components';
import { getProfile, updateTargets } from '../src/repositories/profileRepository';
import type { EditableTargets } from '../src/repositories/profileRepository';
import type { Profile } from '../src/models';
import { COLORS } from '../src/theme';

const fields: { key: keyof EditableTargets; label: string }[] = [
  { key: 'age', label: 'Age' }, { key: 'height_cm', label: 'Height (cm)' },
  { key: 'weight_kg', label: 'Starting weight (kg)' }, { key: 'target_weight_kg', label: 'Target weight (kg)' },
  { key: 'calorie_target', label: 'Daily calories' }, { key: 'protein_target', label: 'Protein target (g)' },
  { key: 'carbs_target', label: 'Carbohydrate target (g)' }, { key: 'fat_target', label: 'Fat target (g)' },
  { key: 'steps_target', label: 'Daily steps' }, { key: 'water_target_ml', label: 'Daily water (ml)' },
];

type TargetInputs = Record<keyof EditableTargets, string>;

function toInputs(profile: Profile): TargetInputs {
  return Object.fromEntries(fields.map(({ key }) => [key, String(profile[key])])) as TargetInputs;
}

export default function Settings() {
  const router = useRouter();
  const [inputs, setInputs] = useState<TargetInputs | null>(null);
  const [error, setError] = useState('');

  useEffect(() => { void getProfile().then(profile => setInputs(toInputs(profile))).catch(() => setError('Could not load your profile.')); }, []);

  async function save() {
    if (!inputs) return;
    const values = Object.fromEntries(fields.map(({ key }) => [key, Number(inputs[key])])) as EditableTargets;
    if (fields.some(({ key }) => !Number.isFinite(values[key]) || values[key] <= 0)) { setError('Every value must be greater than zero.'); return; }
    try {
      await updateTargets(values);
      setError('');
      router.back();
    } catch {
      setError('Your profile could not be saved. Your values are still available to retry.');
    }
  }

  return <Screen><Pressable onPress={() => router.back()}><Text style={{ color: COLORS.green, marginBottom: 12 }}>‹ Back</Text></Pressable>
    <Title eyebrow="Preferences" title="Profile & targets" subtitle="Personal starting values and daily goals. Stored on this device." />
    <ScrollView keyboardShouldPersistTaps="handled">{fields.map(({ key, label }) => <Card key={key} style={{ paddingVertical: 11, marginBottom: 8 }}>
      <Text style={{ color: COLORS.muted, fontSize: 12, marginBottom: 7 }}>{label}</Text>
      <TextInput value={inputs?.[key] ?? ''} onChangeText={value => setInputs(current => current ? ({ ...current, [key]: value }) : current)} keyboardType="decimal-pad" style={{ color: COLORS.text, fontSize: 16, paddingVertical: 4 }} />
    </Card>)}
    {error ? <Text accessibilityRole="alert" style={{ color: COLORS.red, marginBottom: 10 }}>{error}</Text> : null}
    <View style={{ marginTop: 4, marginBottom: 24 }}><Action label="Save profile and targets" onPress={save} /></View>
  </ScrollView></Screen>;
}
