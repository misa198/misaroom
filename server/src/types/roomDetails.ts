export interface User {
  name: string;
  avatar: string;
  id: string;
}

export interface RoomDetails {
  password?: string;
  creator: string;
  users: User[];
}
