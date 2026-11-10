import { useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Action, Card, Screen, Title, labelStyle } from '../../src/components';
import { formatDate } from '../../src/dates';
import { getProfile } from '../../src/repositories/profileRepository';
import { addWeightEntry, listWeightEntries } from '../../src/repositories/progressRepository';
import type { Profile, WeightEntry } from '../../src/models';
import { COLORS } from '../../src/theme';

export default function Progress() {
  const [weightInput, setWeightInput] = useState('');
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    const [history, currentProfile] = await Promise.all([listWeightEntries(), getProfile()]);
    setEntries(history);
    setProfile(currentProfile);
  }, []);
  useFocusEffect(useCallback(() => {
    let active = true;
    void Promise.all([listWeightEntries(), getProfile()]).then(
      ([history, currentProfile]) => { if (active) { setEntries(history); setProfile(currentProfile); setError(''); } },
      () => { if (active) setError('Could not load weight history.'); },
    );
    return () => { active = false; };
  }, []));

  const current = entries[0]?.weight_kg ?? profile?.weight_kg ?? 113;
  const baseline = entries.at(-1)?.weight_kg ?? profile?.weight_kg ?? 113;
  const goal = profile?.target_weight_kg ?? 90;
  const progress = useMemo(() => {
    const range = baseline - goal;
    if (range <= 0) return 0;
    return Math.min(100, Math.max(0, 100 * (baseline - current) / range));
  }, [baseline, current, goal]);

  async function saveWeight() {
    const weightKg = Number(weightInput);
    if (!Number.isFinite(weightKg) || weightKg < 20 || weightKg > 400) { setError('Enter a weight between 20 and 400 kg.'); return; }
    try {
      await addWeightEntry(weightKg);
      setWeightInput('');
      setError('');
      await refresh();
    } catch {
      setError('The weight could not be saved. Your value is still available to retry.');
    }
  }

  return <Screen><Title eyebrow="Trends" title="Progress" subtitle="Weight history and consistency, with dates kept local." />
    <ScrollView showsVerticalScrollIndicator={false}>
      <Card><Text style={labelStyle}>LATEST WEIGHT</Text><Text style={{ color: COLORS.text, fontSize: 28, fontWeight: '700', marginTop: 4 }}>{current.toFixed(1)} kg</Text>
        <Text style={{ color: COLORS.muted, fontSize: 12, marginTop: 6 }}>{Math.abs(baseline - current).toFixed(1)} kg {current <= baseline ? 'down' : 'up'} from first recorded value · goal {goal} kg</Text>
        <View style={{ height: 6, backgroundColor: COLORS.raised, borderRadius: 5, marginTop: 14 }}><View style={{ height: 6, width: `${progress}%`, backgroundColor: COLORS.green, borderRadius: 5 }} /></View>
      </Card>
      <Card><Text style={{ color: COLORS.text, fontWeight: '700', marginBottom: 10 }}>Add weight</Text><View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <TextInput value={weightInput} onChangeText={setWeightInput} keyboardType="decimal-pad" placeholder="kg" placeholderTextColor={COLORS.muted} style={{ flex: 1, color: COLORS.text, backgroundColor: COLORS.raised, padding: 12, borderRadius: 10 }} />
        <View style={{ flex: 1 }}><Action label="Save weight" onPress={saveWeight} /></View>
      </View></Card>
      {error ? <Text accessibilityRole="alert" style={{ color: COLORS.red, marginBottom: 10 }}>{error}</Text> : null}
      <Text style={{ color: COLORS.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginVertical: 8 }}>RECENT ENTRIES</Text>
      {entries.length === 0 ? <Text style={{ color: COLORS.muted }}>No measurements yet. Add the first one above.</Text> : entries.map(entry => <Card key={entry.id} style={{ paddingVertical: 11 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={{ color: COLORS.text, fontWeight: '600' }}>{entry.weight_kg} kg</Text><Text style={labelStyle}>{formatDate(entry.local_date)}</Text></View>
      </Card>)}
      <Card><Text style={{ color: COLORS.muted, fontSize: 12 }}>Progress photos and body measurements are not enabled in this build. This screen uses only locally stored weight entries.</Text></Card>
    </ScrollView>
  </Screen>;
}
