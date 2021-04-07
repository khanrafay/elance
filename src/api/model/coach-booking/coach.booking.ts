import { Entity, EntityId } from '../entity/entity';
import { Player } from '../player/player';
import { CalendarEntry } from '../calendar/calendar.entry';
import { Coach } from "../coach/coach";
import {Booking, BookingId} from "../booking/booking";
import {Timer} from "../timer/timer";
import {Taxonomy} from "../taxonomy/taxonomy";

export enum CoachBookingStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  SCHEDULED = 'SCHEDULED',
  NO_SHOW = 'NO_SHOW',
  CANCELLED = 'CANCELLED',
  FINISHED = 'FINISHED'
}

export interface CoachBookingItem {
  id: EntityId;
  quantity: number;
  price: number;
  bookedEntity: Entity;
}

export interface CoachBooking {
  id: EntityId;
  bookingId: BookingId;
  coach: Coach;
  player: Pick<Player, 'id' | 'firstName' | 'lastName' | 'profilePicture'>
  calendarEntry: CalendarEntry;
  price?: number;
  createdBy: string;
  cancelledAt?: string;
  cancelledBy?: string;
  cancellationMessage?: string;
  status: CoachBookingStatus[];
  isScheduled?: boolean;
  isActive?: boolean;
  isFinished?: boolean;
  isCancelled?: boolean;
  isPending?: boolean;
  isRejected?: boolean;
  itemList: CoachBookingItem[];
  timer?: Timer;
  paymentMethod?: string;
  sport?: Taxonomy
}