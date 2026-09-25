import type{Direction,FocusMode,PtzDriver}from'./types.js';import{focusCommands,homeCommand,moveCommand,presetCommand,zoomCommand}from'./viscaCommands.js';
export abstract class ViscaDriverBase implements PtzDriver{
 protected abstract send(bytes:number[]):Promise<void>;
 async move(d:Direction,p=8,t=8){await this.send(moveCommand(d,p,t))}
 async zoom(d:'in'|'out'|'stop',s=3){await this.send(zoomCommand(d,s))}
 async focus(m:FocusMode){for(const c of focusCommands(m))await this.send(c)}
 async home(){await this.send(homeCommand())}
 async recallPreset(p:number){await this.send(presetCommand(p,false))}
 async savePreset(p:number){await this.send(presetCommand(p,true))}
}