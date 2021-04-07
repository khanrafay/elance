import { EntityId } from '../entity/entity';
import { CalendarEntry } from '../calendar/calendar.entry';

export interface VenueItemPrice {
  id?: EntityId;
  calendarEntry: CalendarEntry;
  price: number;
}

