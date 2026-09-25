import{spawn}from'node:child_process';import{join}from'node:path';import type{Direction,FocusMode,PtzDriver}from'./types.js';
const bridge=()=>process.env.NDI_PTZ_BRIDGE||join(process.cwd(),'native','ndi-ptz-bridge','bin','ndi-ptz-bridge.exe');
function run(args:string[]):Promise<string>{return new Promise((resolve,reject)=>{const p=spawn(bridge(),args,{windowsHide:true});let out='',err='';p.stdout.on('data',d=>out+=d);p.stderr.on('data',d=>err+=d);p.once('error',e=>reject(new Error('NDI bridge unavailable. Install the NDI Runtime and build ndi-ptz-bridge. '+e.message)));p.once('close',c=>c===0?resolve(out.trim()):reject(new Error(err.trim()||'NDI bridge failed ('+c+')')))})}
export async function listNdiSources(){const s=await run(['list']);return s?JSON.parse(s):[]}
export class NdiDriver implements PtzDriver{
 constructor(private source:string){}
 private cmd(...a:string[]){return run(['control',this.source,...a]).then(()=>{})}
 async move(d:Direction,p=8,t=8){const v:Record<Direction,[number,number]>={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0],'up-left':[-1,-1],'up-right':[1,-1],'down-left':[-1,1],'down-right':[1,1],stop:[0,0]};const[x,y]=v[d],ps=Math.min(1,p/24),ts=Math.min(1,t/20);await this.cmd('move',String(x*ps),String(y*ts))}
 async zoom(d:'in'|'out'|'stop',s=3){await this.cmd('zoom',String(d==='in'?Math.min(1,s/7):d==='out'?-Math.min(1,s/7):0))}
 async focus(m:FocusMode){if(m==='auto')await this.cmd('autofocus');else await this.cmd('focus',String(m==='near'?-0.5:m==='far'?0.5:0))}
 async home(){await this.cmd('home')}
 async recallPreset(p:number){await this.cmd('recall',String(Math.max(0,Math.min(99,p))))}
 async savePreset(p:number){await this.cmd('save',String(Math.max(0,Math.min(99,p))))}
}