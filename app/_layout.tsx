import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { initializeDatabase } from '../src/database';
import { COLORS } from '../src/theme';
export default function RootLayout() { useEffect(() => { initializeDatabase().catch(console.error); }, []); return <><StatusBar style="light"/><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.bg } }}/></>; }
