export interface Message {
  id: string;
  sender: string;
  avatar: string;
  time: string;
  content: string;
  type: "text" | "image";
}
