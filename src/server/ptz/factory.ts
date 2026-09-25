import type{Camera,PtzDriver}from'./types.js';import{ViscaUdpDriver}from'./viscaUdp.js';import{ViscaTcpDriver}from'./viscaTcp.js';import{ViscaSerialDriver}from'./viscaSerial.js';
export function createDriver(c:Camera):PtzDriver{
 switch(c.protocol){
  case'visca-udp':if(!c.host)throw new Error('Host is required');return new ViscaUdpDriver(c.host,c.port??52381,c.viscaIpFraming!==false,c.useSequenceNumbers!==false);
  case'visca-tcp':if(!c.host)throw new Error('Host is required');return new ViscaTcpDriver(c.host,c.port??5678);
  case'visca-serial':if(!c.serialPort)throw new Error('Serial port is required');return new ViscaSerialDriver(c.serialPort,c.baudRate??9600);
  case'onvif':throw new Error('ONVIF driver is not available yet');
 }
}