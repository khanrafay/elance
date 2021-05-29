import {User} from "./user";
import {Service} from "./service";

export interface Offer {
  id: number;
  price: number;
  isExpired: boolean|null;
  isAccepted: boolean|null;
  isCancelled: boolean|null;
  expiredAt: string|null;
  acceptedAt: string|null;
  cancelledAt: string|null;
  cancelledBy: User|null;
  service: Service|null;
  description: string|null;
  duration: string|null;
  durationUnit: string|null;
}