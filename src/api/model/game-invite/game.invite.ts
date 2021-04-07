import { VenueReservation } from './../venue-booking/venue.reservation';
import { Entity, EntityId } from '../entity/entity';
import { File } from "../file/file";
import { Facility } from '../facility/facility';
import { Player } from '../player/player';

export interface GameInvite {
  id: EntityId;
  facility: Facility;
  childPlayer: Player;
  cancelledBy: string;
  cancellationMessage: string | null;
  createdAt: string;
  cancelledAt: null | string;
  seenAt: string;
  parentPlayer: Player;
  status: string[];
  venueReservation: VenueReservation;
}