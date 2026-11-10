export type Nutrients={kcal:number;protein:number;carbs:number;fat:number;fibre?:number};
export function scaleNutrition(per100g:Nutrients,amount:number){const f=amount/100;return {kcal:per100g.kcal*f,protein:per100g.protein*f,carbs:per100g.carbs*f,fat:per100g.fat*f,fibre:(per100g.fibre??0)*f};}
export function averageLoggedDays(values:(number|null)[]){const valid=values.filter((v):v is number=>v!==null&&Number.isFinite(v));return {average:valid.length?valid.reduce((a,b)=>a+b,0)/valid.length:null,days:valid.length};}
export function completeness(logCount:number){return logCount===0?'untracked':logCount>=3?'logged':'partial';}
export function remaining(target:number,consumed:number){return Math.max(0,target-consumed);}
