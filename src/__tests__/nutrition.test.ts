import { describe, expect, test } from '@jest/globals';
import { averageLoggedDays, completeness, remaining, scaleNutrition } from '../nutrition';
describe('nutrition helpers',()=>{
 test('scales macro values from a 100 g basis',()=>expect(scaleNutrition({kcal:200,protein:20,carbs:10,fat:5},150)).toEqual({kcal:300,protein:30,carbs:15,fat:7.5,fibre:0}));
 test('averages only logged values and reports contributing days',()=>expect(averageLoggedDays([2000,null,1800,null])).toEqual({average:1900,days:2}));
 test('does not turn missing days into zero intake',()=>expect(averageLoggedDays([null,null])).toEqual({average:null,days:0}));
 test('classifies missing and partial logs',()=>{expect(completeness(0)).toBe('untracked');expect(completeness(1)).toBe('partial');expect(completeness(3)).toBe('logged');});
 test('remaining calories never go below zero',()=>{expect(remaining(2300,1200)).toBe(1100);expect(remaining(2300,2500)).toBe(0);});
});
