import { EntityId } from '../entity/entity';
import { CalendarEntry } from '../calendar/calendar.entry';

export interface TimeSlot {
  id?: EntityId;
  uid: string;
  calendarEntry: CalendarEntry;
  price?: number;
  isDisabled?: boolean;
  isBooked?: boolean;
}