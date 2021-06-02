export interface SwitchDeviceDto {
  enabled: boolean;
  type: 'mic' | 'camera' | 'shareScreen';
  roomId: string;
}
