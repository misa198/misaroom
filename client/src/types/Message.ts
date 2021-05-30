export type MessageType = "text" | "image";

export interface Message {
  id: string;
  senderId: string;
  sender: string;
  avatar: string;
  time: string;
  content: string;
  type: MessageType;
}
