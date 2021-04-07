import {Player} from "./player";
import {Role} from "../user-account/user.account";

export interface AdminTablePlayer {
  autoNumber: number|null;
  player: Player;
  venueReservationsCount: string;
  coachBookingsAsCoachCount: string;
  coachBookingsCount: string;
  roles: Role[];
  coachId?: string;
  email?: string;
}