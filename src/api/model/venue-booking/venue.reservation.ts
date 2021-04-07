import { Entity, EntityId } from "../entity/entity";
import { Venue } from "../venue/venue";
import { Player } from "../player/player";
import { CalendarEntry } from "../calendar/calendar.entry";
import { Facility } from "../facility/facility";
import { BookingId } from "../booking/booking";
import { Timer } from "../timer/timer";
import {FacilityProvider} from "../facility-provider/facility.provider";
import {Taxonomy} from "../taxonomy/taxonomy";

export enum VenueReservationStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  SCHEDULED = "CONFIRMED",
  NO_SHOW = "NO_SHOW",
  CANCELLED = "CANCELLED",
}

export interface VenueReservationCalendarEntry extends CalendarEntry {
  participantList: Player[];
}

export interface VenueReservationItem {
  id: EntityId;
  quantity: number;
  price: number;
  bookedEntity: Entity;
  bookedEntityType: string;
  name: string;
}

export interface VenueReservation {
  id: EntityId;
  bookingId: BookingId;
  venue: Pick<Venue, "id" | "name" | "profilePicture">;
  facility: Pick<Facility, "id" | "name" | "profilePicture" | "taxonomyList">;
  player: Pick<Player, "id" | "firstName" | "lastName" | "profilePicture" | "displayName">;
  calendarEntry: VenueReservationCalendarEntry;
  price?: number;
  createdAt: string;
  createdBy: string;
  cancelledAt?: string;
  cancelledBy?: string;
  cancellationMessage?: string;
  status: VenueReservationStatus[];
  isScheduled?: boolean;
  isActive?: boolean;
  isFinished?: boolean;
  isCancelled?: boolean;
  isPending?: boolean;
  isRejected?: boolean;
  timer?: Timer;
  venueLong: Venue;
  facilityProvider: FacilityProvider;
  paymentMethod?:string;
  sport?: Taxonomy;
}
