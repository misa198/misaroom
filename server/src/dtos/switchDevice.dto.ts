export interface SwitchDeviceDto {
  enabled: boolean;
  type: 'mic' | 'camera';
  roomId: string;
}
