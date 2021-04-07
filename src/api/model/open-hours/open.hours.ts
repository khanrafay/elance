import { CalendarEntry } from '../calendar/calendar.entry';
import { EntityId } from '../entity/entity';

export interface OpenHoursCalendarEntry extends CalendarEntry {
}

export interface OpenHours {
  id: EntityId;
  calendarEntry: OpenHoursCalendarEntry;
  open: boolean;
}