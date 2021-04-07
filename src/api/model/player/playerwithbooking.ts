import { Location } from '../location/location';
import { File } from '../file/file';
import { EntityId } from '../entity/entity';
import { CalendarEntry } from '../calendar/calendar.entry';
import { GameInvite } from '../game-invite/game.invite';

export interface Playerwithbooking {
  id: EntityId;
  firstName: string;
  lastName: string;
  nickname?: string;
  displayName?: string;
  email?: string;
  personalId?: string;
  description?: string;
  dateOfBirth?: string;
  mobilePhoneNumber?: {
    value: string;
  }
  location?: Location;
  profilePicture?: File;
  sportSkillList?: { sportId: EntityId, skillLevel: number, name?: string }[]
  favoriteVenueIdList?: EntityId[];
  bookingdetails?: {
    bookingId: String;
    createdAt: string;
    price: String;
    status: [];
    calendarEntry: CalendarEntry;
    venue: {
      name: String
    }
    facility: {
      name: String
    }
  }
}