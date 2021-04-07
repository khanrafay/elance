import {VenueReservation} from "../venue-booking/venue.reservation";
import {CoachBooking} from "../coach-booking/coach.booking";

export interface WalletHistory {
  id: string;
  transferredBy: string;
  createdAt: string;
  amount: number;
  description: string;
  venueBooking: VenueReservation;
  coachBooking: CoachBooking;
}