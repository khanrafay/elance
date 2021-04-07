import { EntityId } from '../entity/entity';
import { BookablePrice } from '../booking/bookable.price';
import { CalendarEntry } from '../calendar/calendar.entry';
import { Venue } from '../venue/venue';
import { Taxonomy } from '../taxonomy/taxonomy';
import { File } from "../file/file";

export enum FacilityStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface FacilitySportList {
  sport: Taxonomy;
  fieldTypes: Taxonomy[];
  allFieldTypes: Taxonomy[];
}

export interface Facility {
  autoNumber: number|null;
  id: EntityId;
  venue: Pick<Venue, 'id' | 'name'>
  venueId?: EntityId;
  name: string;
  description: string;
  sportId: EntityId;
  bookingCount?: number;
  taxonomyIdList: EntityId[];
  taxonomyList: Taxonomy[];
  priceList: FacilityPrice[];
  facilityType?: Taxonomy;
  facilityTypeId?: string;
  sportIdList: EntityId[];
  sportList: FacilitySportList[];
  pictureList: File[] | undefined;

  maxNumberOfPlayers?: number;
  autoAcceptReservation: boolean;

  profilePicture?: File;

  active: boolean;
  createdAt: string;

  facilityProviderName: string;
}

export interface FacilityPrice extends BookablePrice {
  calendarEntry?: CalendarEntry;
}
