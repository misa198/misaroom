export interface User {
  name: string;
  avatar: string;
  id: string;
  mic: boolean;
  camera: boolean;
  shareScreen: boolean;
}

export interface RoomDetails {
  password?: string;
  creator: string;
  users: User[];
}
