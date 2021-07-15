import {User} from "./user";
import {Thread} from "./thread";
import {Offer} from "./offer";
import {Service} from "./service";
import {OrderHistory} from "./order.history";

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
  history: OrderHistory[];
}

export enum OrderStates {
  PENDING = 'pending',
  PROGRESS = 'progress',
  CANCELLED = 'cancelled',
  DELIVERED = 'delivered',
  COMPLETED = 'completed'
}