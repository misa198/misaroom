export interface Message {
  sender: string;
  avatar: string;
  time: string;
  content: string;
  type: "text" | "image";
}
