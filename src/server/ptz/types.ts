export type Direction='up'|'down'|'left'|'right'|'up-left'|'up-right'|'down-left'|'down-right'|'stop';
export type FocusMode='auto'|'near'|'far'|'stop';
export type CameraProtocol='visca-udp'|'visca-tcp'|'visca-serial'|'onvif';
export interface Camera{
 id:string;name:string;host?:string;port?:number;protocol:CameraProtocol;online:boolean;
 maxSpeed?:number;presetCount?:number;invertPan?:boolean;invertTilt?:boolean;username?:string;password?:string;
 serialPort?:string;baudRate?:number;viscaIpFraming?:boolean;useSequenceNumbers?:boolean
}
export interface PtzDriver{
 move(direction:Direction,panSpeed:number,tiltSpeed:number):Promise<void>;
 zoom(direction:'in'|'out'|'stop',speed:number):Promise<void>;
 focus(mode:FocusMode):Promise<void>;home():Promise<void>;
 recallPreset(preset:number):Promise<void>;savePreset(preset:number):Promise<void>;
 close?():Promise<void>
}