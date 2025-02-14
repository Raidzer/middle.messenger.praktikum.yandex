export interface IMessagesData {
  chat_id: number;
  content: string;
  file: string;
  id: number;
  is_read: boolean;
  time: string;
  type: "message";
  user_id: number;
}
