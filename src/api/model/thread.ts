import {Message} from "./message";
import {User} from "./user";

export interface Thread {
  id: number;
  message: Message;
  createdAt: string;
  updatedAt: string;
  recipient: User;
}