import { PropsWithChildren } from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';
import { COLORS } from './theme';
export function Screen({children}:PropsWithChildren){return <View style={{flex:1,backgroundColor:COLORS.bg,paddingHorizontal:20,paddingTop:16}}>{children}</View>}
export function Title({eyebrow,title,subtitle}:{eyebrow?:string;title:string;subtitle?:string}){return <View style={{marginBottom:20}}>{eyebrow?<Text style={{color:COLORS.green,fontWeight:'700',fontSize:11,letterSpacing:1.2,marginBottom:7}}>{eyebrow.toUpperCase()}</Text>:null}<Text style={{color:COLORS.text,fontSize:28,fontWeight:'700'}}>{title}</Text>{subtitle?<Text style={{color:COLORS.muted,fontSize:13,marginTop:5}}>{subtitle}</Text>:null}</View>}
export function Card({children,style}:{children:React.ReactNode;style?:ViewStyle}){return <View style={[{backgroundColor:COLORS.card,borderRadius:16,padding:16,marginBottom:12,borderWidth:1,borderColor:'#252830'},style]}>{children}</View>}
export function Action({label,onPress,secondary=false}:{label:string;onPress:()=>void;secondary?:boolean}){return <Pressable onPress={onPress} style={({pressed})=>({backgroundColor:secondary?COLORS.raised:COLORS.green,borderRadius:12,paddingVertical:13,paddingHorizontal:16,alignItems:'center',opacity:pressed?.75:1})}><Text style={{color:secondary?COLORS.text:'#101114',fontWeight:'700',fontSize:14}}>{label}</Text></Pressable>}
export const labelStyle={color:COLORS.muted,fontSize:12} as const;
