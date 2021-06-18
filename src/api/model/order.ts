import {User} from "./user";
import {Thread} from "./thread";
import {Offer} from "./offer";
import {Service} from "./service";

export interface Order{
  id: string;
  createdAt: string;
  completeAt: string;
  orderId: string;
  buyer: User;
  seller: User;
  thread: Thread|null;
  offer: Offer|null;
  service: Service|null;
  reason: string|null;
  state: string;
  deadline: string|null;
  price: string;
  description: string;
}