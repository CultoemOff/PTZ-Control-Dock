import dgram from'node:dgram';import{ViscaDriverBase}from'./viscaBase.js';
export class ViscaUdpDriver extends ViscaDriverBase{
 private sequence=1;
 constructor(private host:string,private port=52381,private framing=true,private useSequence=true){super()}
 private packet(bytes:number[]){if(!this.framing)return Buffer.from(bytes);const h=Buffer.alloc(8);h.writeUInt16BE(0x0100,0);h.writeUInt16BE(bytes.length,2);h.writeUInt32BE(this.useSequence?this.sequence++>>>0:0,4);return Buffer.concat([h,Buffer.from(bytes)])}
 protected send(bytes:number[]):Promise<void>{return new Promise((resolve,reject)=>{const s=dgram.createSocket('udp4');s.send(this.packet(bytes),this.port,this.host,e=>{s.close();e?reject(e):resolve()})})}
}