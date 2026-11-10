import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { COLORS } from '../../src/theme';
const icons: Record<string,string> = { index:'⌂', food:'◉', activity:'↗', prep:'▣', progress:'⌁' };
export default function TabLayout() { return <Tabs screenOptions={({route})=>({headerShown:false,tabBarActiveTintColor:COLORS.green,tabBarInactiveTintColor:COLORS.muted,tabBarStyle:{backgroundColor:COLORS.card,borderTopColor:COLORS.line,height:72,paddingTop:9,paddingBottom:10},tabBarLabelStyle:{fontSize:10,fontWeight:'600'},tabBarIcon:({color})=><Text style={{fontSize:21,color}}>{icons[route.name]??'•'}</Text>})}><Tabs.Screen name="index" options={{title:'Today'}}/><Tabs.Screen name="food" options={{title:'Food'}}/><Tabs.Screen name="activity" options={{title:'Activity'}}/><Tabs.Screen name="prep" options={{title:'Prep'}}/><Tabs.Screen name="progress" options={{title:'Progress'}}/></Tabs>; }
