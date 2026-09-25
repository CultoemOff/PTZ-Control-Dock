export type Direction = 'up'|'down'|'left'|'right'|'up-left'|'up-right'|'down-left'|'down-right'|'stop';

export interface Camera {
  id: string;
  name: string;
  host: string;
  port: number;
  protocol: 'visca-udp'|'visca-tcp'|'ndi'|'onvif';
  online: boolean;
}

export interface PtzDriver {
  move(direction: Direction, panSpeed: number, tiltSpeed: number): Promise<void>;
  zoom(direction: 'in'|'out'|'stop', speed: number): Promise<void>;
  home(): Promise<void>;
  recallPreset(preset: number): Promise<void>;
}
