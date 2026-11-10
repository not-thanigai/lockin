import { useCallback, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { Action, Card, Screen, Title, labelStyle } from '../../src/components';
import { goalProgressPercent } from '../../src/metrics';
import { addWater as addWaterEntry } from '../../src/repositories/activityRepository';
import {
  type DashboardSummary,
  getDashboardSummary,
} from '../../src/repositories/dashboardRepository';
import { COLORS } from '../../src/theme';

const QUICK_ACTIONS = [
  { label: 'Food', path: '/food' },
  { label: 'Water', path: '/activity' },
  { label: 'Weight', path: '/progress' },
  { label: 'Prep', path: '/prep' },
] as const;
const MACRO_TARGETS = [
  { label: 'Protein', key: 'protein', targetKey: 'protein_target' },
  { label: 'Carbs', key: 'carbs', targetKey: 'carbs_target' },
  { label: 'Fat', key: 'fat', targetKey: 'fat_target' },
] as const;

export default function Dashboard() {
  const router = useRouter();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loadError, setLoadError] = useState(false);

  useFocusEffect(useCallback(() => {
    let active = true;
    void getDashboardSummary().then(
      result => {
        if (active) {
          setSummary(result);
          setLoadError(false);
        }
      },
      error => {
        console.error('Could not load dashboard summary', error);
        if (active) setLoadError(true);
      },
    );
    return () => { active = false; };
  }, []));

  const profile = summary?.profile;
  const food = summary?.food ?? { kcal: 0, protein: 0, carbs: 0, fat: 0, count: 0 };
  const calorieTarget = profile?.calorie_target ?? 2300;
  const calorieRemaining = Math.max(0, calorieTarget - food.kcal);
  const weightProgress = profile && summary
    ? goalProgressPercent(profile.weight_kg, summary.currentWeightKg, profile.target_weight_kg)
    : 0;

  const refreshSummary = useCallback(async () => {
    const result = await getDashboardSummary();
    setSummary(result);
    setLoadError(false);
  }, []);

  async function handleAddWater() {
    try {
      await addWaterEntry(250);
    } catch (error) {
      console.error('Could not save water entry', error);
      Alert.alert('Water was not saved', 'Your entry is still available to retry.');
      return;
    }
    try {
      await refreshSummary();
    } catch (error) {
      console.error('Water was saved but dashboard refresh failed', error);
      setLoadError(true);
    }
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Title eyebrow="LOCKIN · DAILY OPERATING PLAN" title="Today"
            subtitle={new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} />
          <Pressable onPress={() => router.push('/settings')}>
            <Text style={{ color: COLORS.muted, fontSize: 24, padding: 8 }}>⚙</Text>
          </Pressable>
        </View>

        {loadError && <Card>
          <Text style={{ color: COLORS.text, fontWeight: '700' }}>Dashboard could not be refreshed</Text>
          <Text style={{ color: COLORS.muted, marginTop: 5, marginBottom: 12 }}>Your local records are preserved. Try loading them again.</Text>
          <Action label="Retry" secondary onPress={() => { void refreshSummary().catch(() => setLoadError(true)); }} />
        </Card>}

        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={labelStyle}>WEIGHT · GOAL {profile?.target_weight_kg ?? '—'} KG</Text>
              <Text style={{ color: COLORS.text, fontSize: 24, fontWeight: '700', marginTop: 5 }}>
                {summary ? summary.currentWeightKg.toFixed(1) : '—'} <Text style={{ fontSize: 13, color: COLORS.muted }}>kg</Text>
              </Text>
            </View>
            <View style={{ backgroundColor: COLORS.raised, borderRadius: 14, padding: 12, alignItems: 'center' }}>
              <Text style={{ color: COLORS.green, fontSize: 16, fontWeight: '700' }}>{profile ? `${Math.round(weightProgress)}%` : '—'}</Text>
              <Text style={{ color: COLORS.muted, fontSize: 10 }}>to goal</Text>
            </View>
          </View>
          <View style={{ height: 5, backgroundColor: COLORS.raised, borderRadius: 6, marginTop: 14 }}>
            <View style={{ height: 5, width: `${weightProgress}%`, backgroundColor: COLORS.green, borderRadius: 6 }} />
          </View>
        </Card>

        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: COLORS.text, fontSize: 14, fontWeight: '700' }}>Nutrition</Text>
            <Text style={{ color: COLORS.muted, fontSize: 12 }}>{Math.round(food.kcal)} / {calorieTarget} kcal</Text>
          </View>
          <View style={{ height: 7, backgroundColor: COLORS.raised, borderRadius: 6, marginTop: 11, marginBottom: 13 }}>
            <View style={{ height: 7, width: `${Math.min(100, 100 * food.kcal / calorieTarget)}%`, backgroundColor: COLORS.green, borderRadius: 6 }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {MACRO_TARGETS.map(macro => {
              const value = food[macro.key];
              const target = profile?.[macro.targetKey] ?? 0;
              return <View key={macro.key}>
                <Text style={labelStyle}>{macro.label}</Text>
                <Text style={{ color: COLORS.text, fontWeight: '700', marginTop: 4 }}>
                  {Math.round(value)}<Text style={{ fontSize: 10, color: COLORS.muted }}> / {target}g</Text>
                </Text>
              </View>;
            })}
          </View>
          <Text style={{ color: COLORS.green, fontSize: 12, marginTop: 12 }}>{calorieRemaining} kcal remaining today</Text>
        </Card>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Card style={{ flex: 1 }}>
            <Text style={labelStyle}>WATER</Text>
            <Text style={{ color: COLORS.text, fontSize: 20, fontWeight: '700', marginTop: 5 }}>
              {summary?.waterMl ?? 0}<Text style={{ fontSize: 12, color: COLORS.muted }}> / {profile?.water_target_ml ?? 3000} ml</Text>
            </Text>
            <Pressable onPress={() => { void handleAddWater(); }} style={{ marginTop: 12 }}>
              <Text style={{ color: COLORS.green, fontWeight: '700' }}>+ 250 ml</Text>
            </Pressable>
          </Card>
          <Card style={{ flex: 1 }}>
            <Text style={labelStyle}>WORKOUT</Text>
            <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '700', marginTop: 7 }}>
              {summary?.workoutCount ? 'Completed' : 'Not logged'}
            </Text>
            <Pressable onPress={() => router.push('/activity')} style={{ marginTop: 12 }}>
              <Text style={{ color: COLORS.green, fontWeight: '700' }}>Open activity →</Text>
            </Pressable>
          </Card>
        </View>

        <Card style={{ borderLeftWidth: 3, borderLeftColor: calorieRemaining > 0 ? COLORS.green : COLORS.amber }}>
          <Text style={{ color: COLORS.green, fontSize: 10, fontWeight: '700', letterSpacing: 1 }}>NEXT BEST ACTION</Text>
          <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '700', marginTop: 6 }}>
            {food.count === 0 ? 'Log your first meal' : 'Log your next meal'}
          </Text>
          <Text style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>
            {food.count === 0 ? 'A quick food log keeps today’s nutrition visible.' : `You have ${calorieRemaining} calories remaining toward today’s target.`}
          </Text>
          <View style={{ marginTop: 12 }}><Action label="Log food" onPress={() => router.push('/food')} /></View>
        </Card>

        <Text style={{ color: COLORS.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginTop: 4, marginBottom: 9 }}>QUICK ACTIONS</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 24 }}>
          {QUICK_ACTIONS.map(action => <Pressable key={action.path} onPress={() => router.push(action.path)}
            style={{ flex: 1, backgroundColor: COLORS.card, borderRadius: 12, paddingVertical: 14, alignItems: 'center' }}>
            <Text style={{ color: COLORS.text, fontSize: 11, fontWeight: '600' }}>+ {action.label}</Text>
          </Pressable>)}
        </View>
      </ScrollView>
    </Screen>
  );
}
