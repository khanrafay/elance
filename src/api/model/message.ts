import {Media} from "./media";
import {User} from "./user";
import {Offer} from "./offer";

export interface Message {
  id: number;
  me: boolean;
  media: Media[];
  message: string|null;
  offer: Offer|null;
  recepient: User;
  sender: User;
  threadId: number;
  createdAt: string;
}