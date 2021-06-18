import {Message} from "./message";
import {User} from "./user";

export interface Thread {
  id: string;
  message: Message;
  createdAt: string;
  updatedAt: string;
  recipient: User;
  participants: User[];
}