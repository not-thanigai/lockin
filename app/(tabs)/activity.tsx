import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import { Action, Card, Screen, Title, labelStyle } from '../../src/components';
import {
  addWater as addWaterEntry,
  getActivitySummary,
  saveStepReading,
  saveWorkout as createWorkout,
  type ActivitySummary,
} from '../../src/repositories/activityRepository';
import { COLORS } from '../../src/theme';

const INITIAL_SUMMARY: ActivitySummary = { stepTarget: 8000, currentSteps: 0, workouts: [], waterMl: 0 };
const WATER_QUICK_AMOUNTS = [150, 250, 500];

export default function Activity() {
  const [steps, setSteps] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [minutes, setMinutes] = useState('45');
  const [summary, setSummary] = useState<ActivitySummary>(INITIAL_SUMMARY);
  const [loadError, setLoadError] = useState(false);

  useFocusEffect(useCallback(() => {
    let active = true;
    void getActivitySummary().then(
      result => {
        if (active) {
          setSummary(result);
          setLoadError(false);
        }
      },
      error => {
        console.error('Could not load activity summary', error);
        if (active) setLoadError(true);
      },
    );
    return () => { active = false; };
  }, []));

  const refreshSummary = useCallback(async () => {
    const result = await getActivitySummary();
    setSummary(result);
    setLoadError(false);
  }, []);

  async function handleWater(amountMl: number) {
    try {
      await addWaterEntry(amountMl);
    } catch (error) {
      console.error('Could not save water entry', error);
      Alert.alert('Water was not saved', 'Your entry is still available to retry.');
      return;
    }
    try {
      await refreshSummary();
    } catch (error) {
      console.error('Water was saved but activity refresh failed', error);
      setLoadError(true);
    }
  }

  async function handleStepReading() {
    const currentReading = Number(steps);
    if (!Number.isInteger(currentReading) || currentReading < 0) {
      Alert.alert('Invalid steps', 'Enter a whole, nonnegative current step-counter reading.');
      return;
    }
    try {
      await saveStepReading(currentReading);
      setSteps('');
      await refreshSummary();
    } catch (error) {
      console.error('Could not save step reading', error);
      Alert.alert('Steps were not saved', 'Your reading is still available to retry.');
    }
  }

  async function handleWorkout() {
    const duration = Number(minutes);
    if (!Number.isInteger(duration) || duration < 1) {
      Alert.alert('Invalid duration', 'Enter a workout duration of at least one minute.');
      return;
    }
    try {
      await createWorkout(workoutName, duration);
      setWorkoutName('');
      await refreshSummary();
    } catch (error) {
      console.error('Could not save workout', error);
      Alert.alert('Workout was not saved', 'Check the details and try again.');
    }
  }

  return (
    <Screen>
      <Title eyebrow="MOVEMENT" title="Activity" subtitle="Record steps, training and hydration." />
      {loadError && <Card>
        <Text style={{ color: COLORS.text, fontWeight: '700' }}>Activity could not be refreshed</Text>
        <Text style={{ color: COLORS.muted, marginTop: 5, marginBottom: 12 }}>Your local entries are preserved. Try loading them again.</Text>
        <Action label="Retry" secondary onPress={() => { void refreshSummary().catch(() => setLoadError(true)); }} />
      </Card>}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card>
          <Text style={labelStyle}>TODAY'S STEPS</Text>
          <Text style={{ color: COLORS.text, fontSize: 26, fontWeight: '700', marginTop: 5 }}>
            {summary.currentSteps}<Text style={{ fontSize: 13, color: COLORS.muted }}> / {summary.stepTarget}</Text>
          </Text>
          <View style={{ height: 6, backgroundColor: COLORS.raised, borderRadius: 5, marginVertical: 12 }}>
            <View style={{ height: 6, width: `${Math.min(100, 100 * summary.currentSteps / (summary.stepTarget || 8000))}%`, backgroundColor: COLORS.green, borderRadius: 5 }} />
          </View>
          <TextInput value={steps} onChangeText={setSteps} keyboardType="number-pad"
            placeholder="Today's current step count" placeholderTextColor={COLORS.muted}
            style={{ color: COLORS.text, backgroundColor: COLORS.raised, padding: 12, borderRadius: 10, marginBottom: 10 }} />
          <Action label="Save current reading" onPress={handleStepReading} />
          <Text style={{ color: COLORS.muted, fontSize: 11, marginTop: 8 }}>
            Each reading replaces the previous total for today. Health Connect is not connected.
          </Text>
        </Card>
        <Card>
          <Text style={{ color: COLORS.text, fontWeight: '700', fontSize: 15, marginBottom: 12 }}>
            Hydration · {summary.waterMl} ml today
          </Text>
          <View style={{ flexDirection: 'row', gap: 9 }}>
            {WATER_QUICK_AMOUNTS.map(amount => <View key={amount} style={{ flex: 1 }}>
              <Action label={`+${amount} ml`} secondary onPress={() => { void handleWater(amount); }} />
            </View>)}
          </View>
        </Card>
        <Card>
          <Text style={{ color: COLORS.text, fontWeight: '700', fontSize: 15, marginBottom: 10 }}>Log a workout</Text>
          <TextInput value={workoutName} onChangeText={setWorkoutName} placeholder="Workout name (e.g. Upper body)"
            placeholderTextColor={COLORS.muted} style={{ color: COLORS.text, backgroundColor: COLORS.raised, padding: 12, borderRadius: 10, marginBottom: 9 }} />
          <TextInput value={minutes} onChangeText={setMinutes} keyboardType="number-pad" placeholder="Minutes"
            placeholderTextColor={COLORS.muted} style={{ color: COLORS.text, backgroundColor: COLORS.raised, padding: 12, borderRadius: 10, marginBottom: 10 }} />
          <Action label="Save completed workout" onPress={handleWorkout} />
        </Card>
        <Text style={{ color: COLORS.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginVertical: 8 }}>TODAY'S TRAINING</Text>
        {summary.workouts.length === 0
          ? <Text style={{ color: COLORS.muted, marginBottom: 16 }}>No workout logged today.</Text>
          : summary.workouts.map(item => <Card key={item.id}>
            <Text style={{ color: COLORS.text, fontWeight: '700' }}>{item.name}</Text>
            <Text style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>{item.duration_min} min · completed</Text>
          </Card>)}
      </ScrollView>
    </Screen>
  );
}
