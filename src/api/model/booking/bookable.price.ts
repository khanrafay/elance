import { CalendarEntry } from '../calendar/calendar.entry';

export interface BookablePrice {
  calendarEntry?: CalendarEntry;
  price: number;
}