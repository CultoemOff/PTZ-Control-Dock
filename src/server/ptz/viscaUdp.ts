import dgram from 'node:dgram';
import type { Direction, PtzDriver } from './types.js';
export class ViscaUdpDriver implements PtzDriver {
  constructor(private host:string,private port=52381){}
  private send(bytes:number[]):Promise<void>{return new Promise((resolve,reject)=>{const s=dgram.createSocket('udp4');s.send(Buffer.from(bytes),this.port,this.host,e=>{s.close();e?reject(e):resolve()})})}
  async move(direction:Direction,panSpeed=8,tiltSpeed=8){const pan=Math.max(1,Math.min(24,panSpeed)),tilt=Math.max(1,Math.min(20,tiltSpeed));const map:Record<Direction,[number,number]>={up:[3,1],down:[3,2],left:[1,3],right:[2,3],'up-left':[1,1],'up-right':[2,1],'down-left':[1,2],'down-right':[2,2],stop:[3,3]};const[pd,td]=map[direction];await this.send([0x81,0x01,0x06,0x01,pan,tilt,pd,td,0xff])}
  async zoom(direction:'in'|'out'|'stop',speed=3){const n=Math.max(0,Math.min(7,speed));await this.send([0x81,0x01,0x04,0x07,direction==='in'?0x20+n:direction==='out'?0x30+n:0x00,0xff])}
  async home(){await this.send([0x81,0x01,0x06,0x04,0xff])}
  async recallPreset(p:number){await this.send([0x81,0x01,0x04,0x3f,0x02,Math.max(0,Math.min(127,p)),0xff])}
  async savePreset(p:number){await this.send([0x81,0x01,0x04,0x3f,0x01,Math.max(0,Math.min(127,p)),0xff])}
}
