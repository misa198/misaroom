export interface User {
  name: string;
  avatar: string;
  id: string;
  mic: boolean;
  camera: boolean;
}

export interface RoomDetails {
  password?: string;
  creator: string;
  users: User[];
  sharingScreen?: {
    status: boolean;
    user: User;
  };
}
