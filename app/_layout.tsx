import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { initializeDatabase } from '../src/database';
import { COLORS } from '../src/theme';
type StartupState = 'loading' | 'ready' | 'error';

export default function RootLayout() {
  const [startupState, setStartupState] = useState<StartupState>('loading');
  const retryDatabase = useCallback(() => {
    setStartupState('loading');
    initializeDatabase().then(
      () => setStartupState('ready'),
      (error: unknown) => {
        console.error('LOCKIN local database could not be initialized', error);
        setStartupState('error');
      },
    );
  }, []);

  useEffect(() => {
    let active = true;
    initializeDatabase().then(
      () => { if (active) setStartupState('ready'); },
      (error: unknown) => {
        console.error('LOCKIN local database could not be initialized', error);
        if (active) setStartupState('error');
      },
    );
    return () => { active = false; };
  }, []);

  return <>
    <StatusBar style="light"/>
    {startupState === 'ready' ? (
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.bg } }}/>
    ) : (
      <View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', padding: 28 }}>
        <Text style={{ color: COLORS.text, fontSize: 22, fontWeight: '700' }}>
          {startupState === 'error' ? 'Your local data could not be opened' : 'Opening LOCKIN'}
        </Text>
        <Text style={{ color: COLORS.muted, fontSize: 14, lineHeight: 21, marginTop: 10 }}>
          {startupState === 'error'
            ? 'Your data has not been changed. Check available device storage, then retry.'
            : 'Getting your on-device data ready…'}
        </Text>
        {startupState === 'error' && (
          <Pressable onPress={retryDatabase} style={{ backgroundColor: COLORS.green, padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: COLORS.bg, fontWeight: '700' }}>Retry</Text>
          </Pressable>
        )}
      </View>
    )}
  </>;
}
